#!/usr/bin/env node
/**
 * What does abstraction cost an AI coding agent?
 *
 * Four calculators, arranged as a 2x2 over code *shape* (depth of indirection) and
 * code *size*, each given the same change request:
 *
 *   abstracted-big    layered, full scientific calculator
 *   abstracted-small  layered, basic four-function calculator
 *   collocated-small  flat, full scientific calculator  (same features as abstracted-big)
 *   collocated-big    flat, plus unit converters
 *
 * Phase 1 (offline) — count files, lines and tokens of each tree.
 * Phase 2 (live)    — hand each task to `claude -p` against each app, timed, then
 *                     verify the change actually landed before counting the run.
 *
 * Runs rotate through tasks and apps so that consecutive invocations differ in both,
 * spreading cache and API-load drift evenly instead of concentrating it on one cell.
 *
 * Usage:
 *   node benchmark.mjs --tasks local,add --runs 3   # tasks x apps x runs
 *   node benchmark.mjs --task crosscut --runs 5
 *   node benchmark.mjs --model opus                 # default: sonnet
 *   node benchmark.mjs --offline                    # counts only, no API calls
 *   node benchmark.mjs --keep-changes               # leave the last run's edits on disk
 */

import { countTokens } from '@anthropic-ai/tokenizer';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { verifyRun } from './verify.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_DIR = path.join(ROOT, '.snapshot');
const RESULTS_DIR = path.join(ROOT, 'results');

/** What an agent would actually read as source. */
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.css', '.html', '.json']);
/** Never walked, never snapshotted. */
const IGNORED_DIRECTORIES = new Set(['node_modules', 'dist', '.vite', '.snapshot', '.playwright-mcp']);

const OFFLINE_ONLY = process.argv.includes('--offline');
const KEEP_CHANGES = process.argv.includes('--keep-changes');
const RUNS = readRunCount();

/**
 * Withhold Bash, so a change that lands in N files costs N edits.
 *
 * `crosscut` is the task this exists for. With Bash available both shapes reached for
 * `sed`: the collocated apps rewrote their twelve key files in bulk and called `Edit`
 * zero times. That turns the comparison into "one token edit versus a dozen scripted
 * substitutions" — batchability — rather than "one place versus twelve", which is what
 * the task was built to measure. Results are written under a `-nobash` suffix so the
 * two conditions sit side by side instead of overwriting each other.
 */
const NO_BASH = process.argv.includes('--no-bash');

/**
 * Ask the agent to typecheck before it finishes.
 *
 * Without this a run can end on code that does not compile, and the harness drops it —
 * which biases the medians towards whichever app failed, because the surviving runs are
 * the ones that happened to go smoothly. `located` on the collocated apps failed four
 * times in twelve, every time on the same mistake: `formatNumber` takes a string and
 * `state.memory` is a number.
 *
 * The instruction is identical for every app and hints at nothing, so a shape that
 * invites more mistakes pays for them in turns and tokens instead of disappearing from
 * the sample. That is the honest accounting: fixing your own compile errors is work.
 */
const SELF_CHECK = process.argv.includes('--verify-build');

if (SELF_CHECK && NO_BASH) {
  console.error('--verify-build needs Bash to run the typechecker; drop --no-bash.');
  process.exit(1);
}

const RESULT_SUFFIX = `${NO_BASH ? '-nobash' : ''}${SELF_CHECK ? '-selfcheck' : ''}`;

/**
 * Pinned so the figures mean something to someone else running this — without it
 * `claude -p` silently uses whatever the local CLI default happens to be.
 */
const MODEL = readFlag('--model') ?? 'sonnet';

/**
 * The change requests, keyed by name. An entry is either one string used for every
 * app, or one keyed by version when the wording has to differ per app.
 *
 * Six main tasks, chosen to span the kinds of change an agent is actually asked for;
 * plus two controls, `shallow` and `located`, that vary the task rather than the code.
 */
const TASKS = {
  /** Pure leaf edit: one colour, at the end of whatever path leads to it. */
  local:
    'Task: change the "=" key accent colour to purple.',

  /*
   * `local` again, worded so that no word in the prompt appears in any file name or
   * token name it has to reach.
   *
   * `local` says `"="` and `accent`. The flat apps have a file called
   * `EqualsButton.tsx`; the layered apps have a token called `--calc-key-accent-bg`.
   * Either wording hands one shape a free text search, so the measured gap mixes two
   * effects: how deep the indirection is, and how well the prompt happens to match the
   * names. This wording describes what the key does instead, so the gap that remains
   * is indirection alone. Same edit, same assertion.
   */
  localalt:
    'Task: the key that finishes a calculation and shows the answer should be purple ' +
    'instead of the colour it is now. Change only that one key; leave every other key ' +
    'as it is.',

  /** Crosses layers: the value has to travel from state to the display. */
  ripple:
    'Task: make the memory indicator in the display show the stored value next to the M, ' +
    'e.g. "M 50" instead of just "M".',

  /*
   * Comprehension rather than editing — the agent has to find it first. The wording
   * describes the symptom in plain terms; the defect itself is a deleted guard, so it
   * cannot be found by searching the source for words that aren't there.
   */
  bugfix:
    'Bug: once a calculation has finished, the ⌫ key should leave the answer alone — the ' +
    'number on screen is a result, not something the user is typing. Instead it deletes a ' +
    'character from it: entering 100 + 23 and pressing = shows 123, and pressing ⌫ then ' +
    'turns that into 12. It should do nothing until the user starts entering a new number. ' +
    'Find and fix it.',

  /** Adding to a registry versus adding a leaf. */
  add:
    'Task: add an integer-division key labelled "÷ᶦ" next to the existing ÷ key. It is a ' +
    'binary operator that divides and then discards any remainder. Give it the same styling ' +
    'as the other operator keys.',

  /** Unpicking versus deleting. */
  remove:
    'Task: remove the memory feature completely — the MC, MR, M+ and M− keys, the M ' +
    'indicator in the display, and any state, types or handlers that exist only to support ' +
    'it. Leave no dead code behind. Everything else must keep working.',

  /** Where abstraction should win: one schema versus sixty leaves. */
  crosscut:
    'Task: the number keys — 0 to 9, the decimal point and the sign toggle — currently use a ' +
    'slate background. Give them a violet background instead. Leave every other key exactly ' +
    'as it is, including the function, operator, accent and danger keys. Keep the existing ' +
    'light and dark behaviour.',

  /*
   * One string, one file, in every app. `abstracted-small` has no history panel, so it
   * renames a keypad section heading instead — same shape of change, different string.
   */
  shallow: {
    abstractedBig: 'Task: rename the history panel heading from "History" to "Log".',
    abstractedSmall: 'Task: rename the "Memory" keypad section heading to "Store".',
    collocatedSmall: 'Task: rename the history panel heading from "History" to "Log".',
    collocatedBig: 'Task: rename the history panel heading from "History" to "Log".',
  },

  /** The `local`+`ripple` pair with the target files named, to remove discovery. */
  located: {
    abstractedBig:
      'Task: (1) In src/styles/tokens.css, change the "=" key accent colour to purple. ' +
      '(2) In src/components/display/Display.tsx, src/hooks/useFormattedDisplay.ts and ' +
      'src/types/state.types.ts, make the memory indicator show the stored value next to ' +
      'the M, e.g. "M 50" instead of just "M".',
    abstractedSmall:
      'Task: (1) In src/styles/tokens.css, change the "=" key accent colour to purple. ' +
      '(2) In src/components/display/Display.tsx, src/hooks/useFormattedDisplay.ts and ' +
      'src/types/state.types.ts, make the memory indicator show the stored value next to ' +
      'the M, e.g. "M 50" instead of just "M".',
    collocatedSmall:
      'Task: (1) In src/buttons/EqualsButton.tsx, change the "=" key accent colour to purple. ' +
      '(2) In src/Display.tsx, make the memory indicator show the stored value next to ' +
      'the M, e.g. "M 50" instead of just "M".',
    collocatedBig:
      'Task: (1) In src/buttons/EqualsButton.tsx, change the "=" key accent colour to purple. ' +
      '(2) In src/Display.tsx, make the memory indicator show the stored value next to ' +
      'the M, e.g. "M 50" instead of just "M".',
  },
};

/**
 * One or more tasks per invocation: `--tasks default,shallow` or `--task default`.
 * Every task runs against every app, `--runs` times each.
 */
const TASK_NAMES = readTaskNames();

function readTaskNames() {
  const raw = readFlag('--tasks') ?? readFlag('--task') ?? 'local';
  const names = raw
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);

  const unknown = names.filter((name) => !TASKS[name]);
  if (unknown.length > 0) {
    console.error(
      `Unknown task(s) ${unknown.join(', ')}. Options: ${Object.keys(TASKS).join(', ')}`,
    );
    process.exit(1);
  }
  return names;
}

function taskFor(taskName, versionKey) {
  const task = TASKS[taskName];
  const text = typeof task === 'string' ? task : task[versionKey];
  if (!text) {
    console.error(`Task "${taskName}" has no wording for version "${versionKey}".`);
    process.exit(1);
  }
  return text;
}

const VERSIONS = [
  { key: 'abstractedBig', dir: 'abstracted-big', label: 'Over-abstracted (big)' },
  { key: 'abstractedSmall', dir: 'abstracted-small', label: 'Over-abstracted (small)' },
  { key: 'collocatedSmall', dir: 'collocated-small', label: 'Collocated (small)' },
  { key: 'collocatedBig', dir: 'collocated-big', label: 'Collocated (big)' },
];

/**
 * The 2x2. Each pair varies exactly one axis, so a ratio here is attributable to
 * that axis alone — which the original two-app comparison could never establish.
 */
const COMPARISONS = [
  { label: 'Shape, at big size', numerator: 'abstractedBig', denominator: 'collocatedBig' },
  { label: 'Shape, at small size', numerator: 'abstractedSmall', denominator: 'collocatedSmall' },
  { label: 'Size, collocated', numerator: 'collocatedBig', denominator: 'collocatedSmall' },
  { label: 'Size, over-abstracted', numerator: 'abstractedBig', denominator: 'abstractedSmall' },
];

function readFlag(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function readRunCount() {
  const parsed = Number.parseInt(readFlag('--runs') ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

/* ------------------------------------------------------------------ helpers */

function collectSourceFiles(directory) {
  const found = [];

  const walk = (current) => {
    const entries = fs
      .readdirSync(current, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!IGNORED_DIRECTORIES.has(entry.name)) walk(full);
      } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
        // Lockfiles are machine-generated context an agent never reads.
        if (entry.name !== 'package-lock.json') found.push(full);
      }
    }
  };

  walk(directory);
  return found;
}

/** Concatenate a tree the way an agent effectively sees it: path header + contents. */
function analyseVersion(versionDir) {
  const absolute = path.join(ROOT, versionDir);

  const files = collectSourceFiles(absolute).map((file) => {
    const relative = path.relative(ROOT, file);
    const code = fs.readFileSync(file, 'utf8');
    return {
      relative,
      /** Top-level grouping under the app dir, e.g. `src/types`. */
      group: path.dirname(path.relative(absolute, file)).split(path.sep).slice(0, 2).join('/') || '.',
      tokens: countTokens(code),
      bytes: Buffer.byteLength(code, 'utf8'),
      lines: code.split('\n').length,
    };
  });

  const context = files
    .map((file) => `// FILE: ${file.relative}\n${fs.readFileSync(path.join(ROOT, file.relative), 'utf8')}`)
    .join('\n\n');

  const groups = new Map();
  for (const file of files) {
    const existing = groups.get(file.group) ?? { files: 0, tokens: 0, lines: 0 };
    groups.set(file.group, {
      files: existing.files + 1,
      tokens: existing.tokens + file.tokens,
      lines: existing.lines + file.lines,
    });
  }

  return {
    files,
    groups,
    contextTokens: countTokens(context),
    totalTokens: files.reduce((sum, file) => sum + file.tokens, 0),
    totalLines: files.reduce((sum, file) => sum + file.lines, 0),
    totalBytes: files.reduce((sum, file) => sum + file.bytes, 0),
  };
}

function fmt(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString('en-US') : 'n/a';
}

function pct(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || !b) return 'n/a';
  const delta = ((a - b) / b) * 100;
  return `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`;
}

function median(values) {
  const usable = values.filter((value) => typeof value === 'number' && Number.isFinite(value));
  if (usable.length === 0) return undefined;
  const sorted = [...usable].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function markdownTable(headers, rows) {
  const widths = headers.map((header, index) =>
    Math.max(header.length, ...rows.map((row) => String(row[index]).length)),
  );
  const line = (cells) =>
    `| ${cells.map((cell, index) => String(cell).padEnd(widths[index])).join(' | ')} |`;
  const separator = `| ${widths.map((width) => '-'.repeat(width)).join(' | ')} |`;
  return [line(headers), separator, ...rows.map(line)].join('\n');
}

/* --------------------------------------------------- snapshot / restore ---- */

const snapshotFilter = (source) => !IGNORED_DIRECTORIES.has(path.basename(source));

function snapshotSources() {
  fs.rmSync(SNAPSHOT_DIR, { recursive: true, force: true });
  for (const { dir } of VERSIONS) {
    fs.cpSync(path.join(ROOT, dir), path.join(SNAPSHOT_DIR, dir), {
      recursive: true,
      filter: snapshotFilter,
    });
  }
}

/**
 * Restore the tracked source back to its pristine state.
 *
 * Only files that exist in the snapshot are replaced, and node_modules is never
 * touched — so a restore never forces a reinstall.
 */
function restoreSources() {
  for (const { dir } of VERSIONS) {
    const snapshot = path.join(SNAPSHOT_DIR, dir);
    if (!fs.existsSync(snapshot)) continue;

    // Drop the source tree the agent may have added files to, then copy back.
    fs.rmSync(path.join(ROOT, dir, 'src'), { recursive: true, force: true });
    fs.cpSync(snapshot, path.join(ROOT, dir), { recursive: true, filter: snapshotFilter });
  }
}

/* ------------------------------------------------------ transcript reader --- */

const TRANSCRIPT_ROOT = path.join(os.homedir(), '.claude', 'projects');

/** Claude Code names a session directory after its cwd, with `/` and `.` as `-`. */
function transcriptPath(sessionId) {
  const direct = path.join(TRANSCRIPT_ROOT, ROOT.replaceAll(/[/.]/g, '-'), `${sessionId}.jsonl`);
  if (fs.existsSync(direct)) return direct;

  // Fall back to a scan, in case the naming scheme differs on this machine.
  if (!fs.existsSync(TRANSCRIPT_ROOT)) return undefined;
  for (const dir of fs.readdirSync(TRANSCRIPT_ROOT)) {
    const candidate = path.join(TRANSCRIPT_ROOT, dir, `${sessionId}.jsonl`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return undefined;
}

/**
 * Which files the agent actually opened and changed.
 *
 * This is the only metric here that measures traversal directly rather than
 * inferring it from totals: `filesEdited` is a property of the code's shape, not
 * of its size, because a larger flat tree still needs the same edits.
 */
function analyseTranscript(sessionId) {
  const file = sessionId ? transcriptPath(sessionId) : undefined;
  if (!file) return undefined;

  const read = new Set();
  const edited = new Set();
  let searches = 0;
  /*
   * Which tools, and how often. Bash is allowed, so a change landing in twelve files
   * might be twelve Edit calls or a single `sed` — different things to measure.
   * Recording the mix keeps that visible instead of hiding it inside a total.
   */
  const toolUse = {};

  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      continue;
    }
    for (const block of record.message?.content ?? []) {
      if (block?.type !== 'tool_use') continue;
      toolUse[block.name] = (toolUse[block.name] ?? 0) + 1;
      const target = block.input?.file_path;
      if (block.name === 'Read' && target) read.add(target);
      else if (block.name === 'Edit' && target) edited.add(target);
      else if (block.name === 'Grep' || block.name === 'Glob') searches += 1;
    }
  }

  return { filesRead: read.size, filesEdited: edited.size, searches, toolUse };
}

/* ----------------------------------------------------------- live runner --- */

/** Every model id seen in a payload, so the report names what actually ran. */
const modelsSeen = new Set();

const commandsShown = new Set();

/**
 * A run can fail for two completely different reasons, and they must not be counted
 * the same way.
 *
 * If the agent tried and got it wrong, that is a result: a shape that invites mistakes
 * should pay for them. If the network dropped, that is not a result — it is noise about
 * the machine the benchmark ran on. Scoring the second as the first quietly biases every
 * median, because outages do not fall evenly across a schedule that takes hours.
 *
 * A live round of this suite is ~160 invocations over about two hours. One DNS blip
 * during it cost two runs on one app in an early round, both scored as agent failures.
 */
const INFRASTRUCTURE_ERROR =
  /API Error|ENOTFOUND|ECONNRESET|ETIMEDOUT|EAI_AGAIN|can't reach|cannot reach|overloaded|rate.?limit|502|503|529/i;

function isInfrastructureError(payload) {
  return Boolean(payload?.is_error) && INFRASTRUCTURE_ERROR.test(String(payload.result ?? ''));
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/**
 * Retry infrastructure failures only. A verified-or-not agent result is kept as it is;
 * a network failure is thrown away and the run repeated from pristine sources.
 */
function runLiveWithRetry(version, taskName, runIndex, restore, attempts = 3) {
  for (let attempt = 1; ; attempt += 1) {
    const run = runLive(version, taskName, runIndex);
    if (!run.apiError || attempt >= attempts) {
      if (run.apiError) console.log(`    ! infrastructure error, ${attempts} attempts used`);
      return { ...run, attempts: attempt };
    }
    const backoffMs = 30_000 * attempt;
    console.log(`    ! infrastructure error, not the agent — retrying in ${backoffMs / 1000}s`);
    restore();
    sleep(backoffMs);
  }
}

function runLive({ key, dir }, taskName, runIndex) {
  /*
   * Scope the agent to one app, without telling it how to work. The old wording,
   * "Look at all files in …", instructed exploration — and its cost scales with tree
   * size, which is one of the variables under measurement.
   */
  const prompt =
    `In the ${dir}/src/ directory of this repository: ${taskFor(taskName, key)} ` +
    `Work from the source files only — do not start a dev server, open a browser, ` +
    `or otherwise run the app.` +
    (SELF_CHECK
      ? ` When you are done, run \`npx tsc --noEmit\` in ${dir}/ and fix anything it reports.`
      : '');
  /*
   * Three things matter here, each learned the hard way:
   *
   * `--tools` restricts the built-in toolset. `--allowedTools` does not — it only
   * pre-approves permission prompts and leaves everything else reachable, so an
   * earlier round had agents quietly reaching for a browser.
   *
   * `--strict-mcp-config` keeps MCP servers out, which is what removes the browser.
   * The agent works from the source, not from the running app.
   *
   * `--safe-mode` disables the developer's own CLAUDE.md, skills, plugins and output
   * styles. Without it the measured agent inherits local customisation — an output
   * style alone changes how verbosely it writes, and therefore its token count.
   */
  const command =
    `claude -p ${JSON.stringify(prompt)} --output-format json ` +
    `--model ${MODEL} --safe-mode --strict-mcp-config ` +
    (NO_BASH
      ? `--tools Edit,Glob,Grep,Read,Write`
      : `--tools Bash,Edit,Glob,Grep,Read,Write ` +
        `--disallowedTools "Bash(npm run dev*)" "Bash(npx playwright*)" "Bash(vite*)"`);

  if (!commandsShown.has(`${taskName}:${key}`)) {
    commandsShown.add(`${taskName}:${key}`);
    console.log(`> ${command}\n`);
  }
  process.stdout.write(`  [${taskName}] ${dir} run ${runIndex + 1}/${RUNS} … `);

  const started = process.hrtime.bigint();
  let stdout = '';
  let failure = null;

  try {
    stdout = execSync(command, {
      cwd: ROOT,
      encoding: 'utf8',
      maxBuffer: 128 * 1024 * 1024,
      timeout: 30 * 60 * 1000,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (error) {
    failure = error;
    stdout = error.stdout ?? '';
  }

  const latencyMs = Number(process.hrtime.bigint() - started) / 1e6;

  let payload = null;
  try {
    payload = JSON.parse(stdout);
  } catch {
    /* left null — reported as a failed run below */
  }

  if (!payload) {
    console.log('failed');
    if (failure?.stderr) {
      console.error(`    ! ${String(failure.stderr).trim().split('\n').at(-1)}`);
    }
    return { key, taskName, runIndex, ok: false, apiError: true, latencyMs };
  }

  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(RESULTS_DIR, `${dir}-${taskName}${RESULT_SUFFIX}-run${runIndex + 1}.json`),
    JSON.stringify(payload, null, 2),
  );

  for (const model of Object.keys(payload.modelUsage ?? {})) modelsSeen.add(model);

  const verification = verifyRun(ROOT, dir, taskName);

  const usage = payload.usage ?? {};
  const inputTokens = usage.input_tokens ?? 0;
  const cacheCreate = usage.cache_creation_input_tokens ?? 0;
  const cacheRead = usage.cache_read_input_tokens ?? 0;
  const outputTokens = usage.output_tokens ?? 0;
  const touched = analyseTranscript(payload.session_id);

  console.log(
    `${(latencyMs / 1000).toFixed(1)}s, ${payload.num_turns} turns, ${fmt(outputTokens)} out` +
      (touched ? `, ${touched.filesRead} read, ${touched.filesEdited} edited` : '') +
      (verification.ok ? ', verified' : `, UNVERIFIED (${verification.build.ok ? verification.assertion.detail : verification.build.detail})`),
  );

  return {
    key,
    taskName,
    runIndex,
    ok: !payload.is_error,
    apiError: isInfrastructureError(payload),
    verified: verification.ok,
    verification,
    latencyMs,
    turns: payload.num_turns,
    costUsd: payload.total_cost_usd,
    inputTokens,
    effectiveInput: inputTokens + cacheCreate + cacheRead,
    outputTokens,
    filesRead: touched?.filesRead,
    filesEdited: touched?.filesEdited,
    searches: touched?.searches,
    toolUse: touched?.toolUse,
  };
}

function range(values) {
  const usable = values.filter((value) => typeof value === 'number' && Number.isFinite(value));
  if (usable.length === 0) return undefined;
  return { min: Math.min(...usable), max: Math.max(...usable) };
}

/** Median across runs, per metric, plus the spread the median hides. */
/**
 * Medians are taken over *verified* runs only. A run that errored, failed to build or
 * did not make the change is excluded — otherwise "gave up early" would read as "cheap".
 */
function summarise(runs) {
  const successful = runs.filter((run) => run.ok && run.verified);
  if (successful.length === 0) return undefined;

  const of = (metric) => successful.map((run) => run[metric]);

  return {
    runs: successful.length,
    attempted: runs.length,
    unverified: runs.filter((run) => !(run.ok && run.verified)).length,
    all: successful,
    inputTokens: median(of('inputTokens')),
    effectiveInput: median(of('effectiveInput')),
    outputTokens: median(of('outputTokens')),
    latencyMs: median(of('latencyMs')),
    turns: median(of('turns')),
    costUsd: median(of('costUsd')),
    filesRead: median(of('filesRead')),
    filesEdited: median(of('filesEdited')),
    spread: {
      effectiveInput: range(of('effectiveInput')),
      outputTokens: range(of('outputTokens')),
      latencyMs: range(of('latencyMs')),
      turns: range(of('turns')),
      costUsd: range(of('costUsd')),
      filesRead: range(of('filesRead')),
      filesEdited: range(of('filesEdited')),
    },
  };
}

/* ------------------------------------------------------------------- main -- */

console.log('# Token Cost of Abstraction — Scientific Calculator Benchmark\n');

/* Phase 1: offline token footprint ----------------------------------------- */

const offline = Object.fromEntries(
  VERSIONS.map((version) => [version.key, analyseVersion(version.dir)]),
);

console.log('## 1. Offline source footprint (@anthropic-ai/tokenizer)\n');
console.log(
  markdownTable(
    ['Version', 'Files', 'Lines', 'Bytes', 'Tokens', 'Concatenated context'],
    VERSIONS.map((version) => {
      const analysis = offline[version.key];
      return [
        version.label,
        fmt(analysis.files.length),
        fmt(analysis.totalLines),
        fmt(analysis.totalBytes),
        fmt(analysis.totalTokens),
        fmt(analysis.contextTokens),
      ];
    }),
  ),
);
console.log('');

for (const version of VERSIONS) {
  const analysis = offline[version.key];
  console.log(`### ${version.label} — tokens by directory\n`);
  console.log(
    markdownTable(
      ['Directory', 'Files', 'Lines', 'Tokens'],
      [...analysis.groups.entries()]
        .sort((a, b) => b[1].tokens - a[1].tokens)
        .map(([group, stats]) => [group, fmt(stats.files), fmt(stats.lines), fmt(stats.tokens)]),
    ),
  );
  console.log('');
}

/* Phase 2: live runs ------------------------------------------------------- */

/**
 * Order the (task, app, run) triples so that consecutive invocations differ in both
 * the app *and* the task wherever possible.
 *
 * Each `claude -p` is its own session, but the provider still caches aggressively
 * across identical prefixes. Running the same app twice in a row, or the same task
 * twice in a row, hands one variant a warm cache the others did not get. Rotating
 * both axes spreads that advantage evenly instead of concentrating it.
 *
 * Every (task, app) pair still appears exactly `runs` times.
 */
function buildSchedule(taskNames, versions, runs) {
  const schedule = [];
  const taskCount = taskNames.length;
  const versionCount = versions.length;

  for (let cycle = 0; cycle < runs; cycle += 1) {
    for (let slot = 0; slot < taskCount; slot += 1) {
      for (let offset = 0; offset < versionCount; offset += 1) {
        schedule.push({
          version: versions[(offset + cycle) % versionCount],
          taskName: taskNames[(slot + offset + cycle) % taskCount],
          runIndex: cycle,
        });
      }
    }
  }

  return schedule;
}

let live = null;

if (OFFLINE_ONLY) {
  console.log('## 2. Live agent runs\n\nSkipped (--offline).\n');
} else {
  console.log(
    `## 2. Live agent runs (\`claude -p --model ${MODEL}\`, ` +
      `${TASK_NAMES.length} task(s) × ${VERSIONS.length} apps × ${RUNS} runs = ` +
      `${TASK_NAMES.length * VERSIONS.length * RUNS} invocations)\n`,
  );

  if (NO_BASH) {
    console.log(
      'Bash withheld: every changed file costs an `Edit` call, so the metric is how many ' +
        'places the change lands rather than how well it batches.\n',
    );
  }

  if (SELF_CHECK) {
    console.log(
      'Self-check on: the prompt asks the agent to run `npx tsc --noEmit` and fix what it ' +
        'reports, so a compile error costs turns instead of dropping the run.\n',
    );
  }

  for (const taskName of TASK_NAMES) {
    const task = TASKS[taskName];
    const wording =
      typeof task === 'string' ? task : `per app — ${Object.keys(task).length} variants`;
    console.log(`- \`${taskName}\`: ${wording}`);
  }
  console.log('');

  const schedule = buildSchedule(TASK_NAMES, VERSIONS, RUNS);
  console.log(
    `Interleaved so consecutive runs differ in app and task; ${schedule.length} invocations.\n`,
  );

  snapshotSources();
  try {
    const collected = {};
    for (const taskName of TASK_NAMES) {
      collected[taskName] = Object.fromEntries(VERSIONS.map((version) => [version.key, []]));
    }

    schedule.forEach((entry, index) => {
      collected[entry.taskName][entry.version.key].push(
        runLiveWithRetry(entry.version, entry.taskName, entry.runIndex, restoreSources),
      );
      // Every run must start from identical sources.
      const isLastOverall = index === schedule.length - 1;
      if (!(isLastOverall && KEEP_CHANGES)) restoreSources();
    });

    live = {};
    for (const taskName of TASK_NAMES) {
      live[taskName] = Object.fromEntries(
        VERSIONS.map((version) => [version.key, summarise(collected[taskName][version.key])]),
      );
    }
  } finally {
    if (KEEP_CHANGES) {
      console.log(
        `\nAgent edits from the final run left on disk. Pristine copies in ${path.relative(ROOT, SNAPSHOT_DIR)}/\n`,
      );
    } else {
      restoreSources();
      fs.rmSync(SNAPSHOT_DIR, { recursive: true, force: true });
      console.log('\nSources restored to their pristine state.\n');
    }
  }
}

/* Phase 3: comparison ------------------------------------------------------ */

const seconds = (value) => (typeof value === 'number' ? (value / 1000).toFixed(2) : 'n/a');
const dollars = (value) => (typeof value === 'number' ? `$${value.toFixed(4)}` : 'n/a');
const labels = VERSIONS.map((version) => version.label);

/** Every reported metric, as a getter over the offline analysis and a live summary. */
const METRICS = [
  { label: 'Files in source tree', offline: (o) => o.files.length, format: fmt },
  { label: 'Lines of Source', offline: (o) => o.totalLines, format: fmt },
  { label: 'Raw Local Tokens', offline: (o) => o.contextTokens, format: fmt },
  { label: 'Agent Input Tokens (Read Context)', live: (s) => s?.inputTokens, format: fmt },
  { label: 'Agent Input Tokens incl. cache', live: (s) => s?.effectiveInput, format: fmt },
  { label: 'Agent Output Tokens (Code Generated)', live: (s) => s?.outputTokens, format: fmt },
  { label: 'Total Latency (Seconds)', live: (s) => s?.latencyMs, format: seconds },
  { label: 'Agent Turns', live: (s) => s?.turns, format: fmt },
  { label: 'Files Read', live: (s) => s?.filesRead, format: fmt },
  { label: 'Files Edited', live: (s) => s?.filesEdited, format: fmt },
  { label: 'Cost (USD)', live: (s) => s?.costUsd, format: dollars },
];

/** Shown alongside the metrics, so a thin median is never mistaken for a clean one. */
const VERIFIED_ROW = {
  label: 'Runs verified',
  live: (s) => s,
  format: (s) => (s ? `${s.runs}/${s.attempted}` : 'n/a'),
};

const metricBy = (needle) => METRICS.find((metric) => metric.label === needle);

function valueOf(metric, key, taskSummaries) {
  return metric.offline ? metric.offline(offline[key]) : metric.live(taskSummaries?.[key]);
}

function ratio(metric, numerator, denominator, taskSummaries) {
  const a = valueOf(metric, numerator, taskSummaries);
  const b = valueOf(metric, denominator, taskSummaries);
  return typeof a === 'number' && typeof b === 'number' && b ? a / b : undefined;
}

const showRatio = (value) => (value === undefined ? 'n/a' : `${value.toFixed(2)}×`);

function reportTask(taskName, taskSummaries) {
  const summaries = VERSIONS.map((version) => taskSummaries?.[version.key]);
  const allLive = summaries.every(Boolean);

  console.log(
    markdownTable(
      ['Metric', ...labels],
      [...METRICS, VERIFIED_ROW].map((metric) => [
        metric.label,
        ...VERSIONS.map((version) => metric.format(valueOf(metric, version.key, taskSummaries))),
      ]),
    ),
  );
  console.log('');

  const dropped = VERSIONS.map((version) => taskSummaries?.[version.key])
    .filter(Boolean)
    .reduce((sum, summary) => sum + summary.unverified, 0);
  if (dropped > 0) {
    console.log(
      `${dropped} run(s) excluded from these medians: the build failed or the change was ` +
        `not made. See the per-run lines above.\n`,
    );
  }

  console.log('#### One axis at a time\n');
  console.log(
    markdownTable(
      ['Varying', 'Lines', 'Raw Tokens', 'Turns', 'Files Edited', 'Output Tokens', 'Cost'],
      COMPARISONS.map(({ label, numerator, denominator }) => [
        label,
        ...[
          'Lines of Source',
          'Raw Local Tokens',
          'Agent Turns',
          'Files Edited',
          'Agent Output Tokens (Code Generated)',
          'Cost (USD)',
        ].map((name) => showRatio(ratio(metricBy(name), numerator, denominator, taskSummaries))),
      ]),
    ),
  );
  console.log('');

  if (!allLive || RUNS < 2) return;

  const spreadRow = (label, format, metric) => [
    label,
    ...summaries.map((s) => `${format(s.spread[metric]?.min)} – ${format(s.spread[metric]?.max)}`),
  ];

  console.log('#### Spread across runs (min – max)\n');
  console.log(
    markdownTable(
      ['Metric', ...labels],
      [
        spreadRow('Agent Turns', fmt, 'turns'),
        spreadRow('Latency (Seconds)', seconds, 'latencyMs'),
        spreadRow('Agent Input Tokens incl. cache', fmt, 'effectiveInput'),
        spreadRow('Agent Output Tokens', fmt, 'outputTokens'),
        spreadRow('Files Read', fmt, 'filesRead'),
        spreadRow('Files Edited', fmt, 'filesEdited'),
        spreadRow('Cost (USD)', dollars, 'costUsd'),
      ],
    ),
  );
  console.log('');

  console.log('#### Tools used (total calls across runs)\n');
  const toolNames = [
    ...new Set(summaries.flatMap((s) => s.all.flatMap((run) => Object.keys(run.toolUse ?? {})))),
  ].sort();
  console.log(
    markdownTable(
      ['Tool', ...labels],
      toolNames.map((name) => [
        name,
        ...summaries.map((s) =>
          fmt(s.all.reduce((sum, run) => sum + (run.toolUse?.[name] ?? 0), 0)),
        ),
      ]),
    ),
  );
  console.log('');

  console.log('#### Every run\n');
  console.log(
    markdownTable(
      ['Run', ...labels],
      Array.from({ length: RUNS }, (_, index) => [
        String(index + 1),
        ...summaries.map((summary) => {
          const run = summary.all.find((candidate) => candidate.runIndex === index);
          if (!run) return 'failed';
          return `${seconds(run.latencyMs)}s, ${run.turns} turns, ${fmt(run.outputTokens)} out, ${dollars(run.costUsd)}`;
        }),
      ]),
    ),
  );
  console.log('');
}

console.log('## 3. Comparison\n');
if (!OFFLINE_ONLY && RUNS > 1) console.log(`Live figures are medians of ${RUNS} runs.\n`);
if (modelsSeen.size > 0) console.log(`Model: ${[...modelsSeen].join(', ')}\n`);

for (const taskName of TASK_NAMES) {
  console.log(`### Task: \`${taskName}\`\n`);
  reportTask(taskName, live?.[taskName]);
}

/* Across tasks: one row per task, so a task that reverses the finding is obvious. */
if (live && TASK_NAMES.length > 1) {
  console.log('### Across tasks\n');
  console.log(
    markdownTable(
      ['Task', 'Shape @ big', 'Shape @ small', 'Size, collocated', 'Size, abstracted', 'Cost, feature-identical pair', 'Verified'],
      TASK_NAMES.map((taskName) => {
        const summaries = live[taskName];
        const cost = metricBy('Cost (USD)');
        return [
          taskName,
          showRatio(ratio(cost, 'abstractedBig', 'collocatedBig', summaries)),
          showRatio(ratio(cost, 'abstractedSmall', 'collocatedSmall', summaries)),
          showRatio(ratio(cost, 'collocatedBig', 'collocatedSmall', summaries)),
          showRatio(ratio(cost, 'abstractedBig', 'abstractedSmall', summaries)),
          showRatio(ratio(cost, 'abstractedBig', 'collocatedSmall', summaries)),
          VERSIONS.map((v) => summaries?.[v.key])
            .filter(Boolean)
            .reduce((sum, s) => sum + s.runs, 0) +
            '/' +
            VERSIONS.length * RUNS,
        ];
      }),
    ),
  );
  console.log('');
}

/* A machine-readable copy, so the docs can be regenerated without re-running. */
if (live) {
  const summaryPath = path.join(RESULTS_DIR, `summary${RESULT_SUFFIX}.json`);
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  fs.writeFileSync(
    summaryPath,
    JSON.stringify(
      {
        model: [...modelsSeen],
        runs: RUNS,
        tasks: TASK_NAMES,
        offline: Object.fromEntries(
          VERSIONS.map((version) => [
            version.key,
            {
              files: offline[version.key].files.length,
              lines: offline[version.key].totalLines,
              tokens: offline[version.key].contextTokens,
            },
          ]),
        ),
        live: Object.fromEntries(
          TASK_NAMES.map((taskName) => [
            taskName,
            Object.fromEntries(
              VERSIONS.map((version) => {
                const summary = live[taskName]?.[version.key];
                return [
                  version.key,
                  summary && {
                    runs: summary.runs,
                    turns: summary.turns,
                    latencyMs: summary.latencyMs,
                    effectiveInput: summary.effectiveInput,
                    outputTokens: summary.outputTokens,
                    filesRead: summary.filesRead,
                    filesEdited: summary.filesEdited,
                    costUsd: summary.costUsd,
                    spread: summary.spread,
                  },
                ];
              }),
            ),
          ]),
        ),
      },
      null,
      2,
    ),
  );
  console.log(`Machine-readable summary written to ${path.relative(ROOT, summaryPath)}\n`);
}

const anyMissing =
  live &&
  TASK_NAMES.some((taskName) => VERSIONS.some((version) => !live[taskName]?.[version.key]));

if (anyMissing) {
  console.error('One or more versions had no successful live run — see results/*.json.');
  process.exitCode = 1;
}
