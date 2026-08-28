#!/usr/bin/env node
/**
 * Re-analysis of runs already on disk. Reads `results/`, writes `RESULTS.md`. Calls no
 * API, so it can be re-run as often as you like.
 *
 * `benchmark.mjs` prints one median per cell and stops. Four things it cannot say, and
 * that this file exists to say:
 *
 *   1. **Is a difference bigger than the noise?** A ratio of medians over three runs
 *      looks as confident as one over ten. Every ratio here carries an exact permutation
 *      p-value and a bootstrap interval.
 *   2. **Which cells are trustworthy?** A run that did not land the change must not be
 *      averaged in as a cheap one. Payload counts are checked against the verified counts
 *      the harness recorded, and short cells are marked.
 *   3. **What did the agent actually touch?** Files read and edited come from the session
 *      transcripts, not from token totals.
 *   4. **Do the published tables still match the payloads?** They stopped matching once,
 *      when a task was re-run and the write-up was not. Generating the file removes the
 *      chance of it happening again.
 *
 * There is no interpretation in the output. That belongs in CONCLUSION.md.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const RESULTS_DIR = path.join(ROOT, 'results');
const TRANSCRIPT_ROOT = path.join(os.homedir(), '.claude', 'projects');
const CACHE_FILE = path.join(RESULTS_DIR, 'transcript-cache.json');

const APPS = ['abstracted-big', 'abstracted-small', 'collocated-small', 'collocated-big'];
const LABEL = {
  'abstracted-big': 'Layered, big',
  'abstracted-small': 'Layered, small',
  'collocated-small': 'Flat, small',
  'collocated-big': 'Flat, big',
};
const APP_KEYS = {
  abstractedBig: 'abstracted-big',
  abstractedSmall: 'abstracted-small',
  collocatedSmall: 'collocated-small',
  collocatedBig: 'collocated-big',
};

/** Order tasks by how they are meant to be read, not alphabetically. */
const TASK_ORDER = [
  'local',
  'localalt',
  'ripple',
  'bugfix',
  'add',
  'remove',
  'crosscut',
  'crosscut-nobash',
  'shallow',
  'located',
  'local-selfcheck',
  'ripple-selfcheck',
  'located-selfcheck',
];

/**
 * A run that died on a network or server error says nothing about the code shape, and
 * outages do not fall evenly across a schedule that takes hours.
 */
const INFRASTRUCTURE_ERROR =
  /API Error|ENOTFOUND|ECONNRESET|ETIMEDOUT|EAI_AGAIN|can't reach|cannot reach|overloaded|rate.?limit|502|503|529/i;

/* ------------------------------------------------------------------ loading ---- */

function loadRuns() {
  const runs = [];
  for (const file of fs.readdirSync(RESULTS_DIR)) {
    const match = /^(.+)-run(\d+)\.json$/.exec(file);
    if (!match) continue;
    const app = APPS.find((candidate) => match[1].startsWith(`${candidate}-`));
    if (!app) continue;

    const payload = JSON.parse(fs.readFileSync(path.join(RESULTS_DIR, file), 'utf8'));
    const usage = payload.usage ?? {};
    runs.push({
      file,
      app,
      task: match[1].slice(app.length + 1),
      run: Number(match[2]),
      infrastructureError:
        Boolean(payload.is_error) && INFRASTRUCTURE_ERROR.test(String(payload.result ?? '')),
      reconstructed: Boolean(payload._provenance),
      costUsd: payload.total_cost_usd,
      latencyMs: payload.duration_ms,
      apiMs: payload.duration_api_ms,
      turns: payload.num_turns,
      outputTokens: usage.output_tokens ?? 0,
      cacheCreate: usage.cache_creation_input_tokens ?? 0,
      cacheRead: usage.cache_read_input_tokens ?? 0,
      effectiveInput:
        (usage.input_tokens ?? 0) +
        (usage.cache_creation_input_tokens ?? 0) +
        (usage.cache_read_input_tokens ?? 0),
      models: Object.keys(payload.modelUsage ?? {}),
      sessionId: payload.session_id,
    });
  }
  return runs;
}

/**
 * Files read and edited cannot be recovered from token totals. Each run's transcript is
 * found by session id and its tool calls counted. Transcripts are pruned eventually, so
 * results are cached next to the payloads and a missing transcript reports as unknown.
 */
function loadTranscriptFacts(runs) {
  const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) : {};
  const missing = runs.filter((run) => run.sessionId && !cache[run.sessionId]);

  if (missing.length && fs.existsSync(TRANSCRIPT_ROOT)) {
    const index = new Map();
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name.endsWith('.jsonl')) index.set(entry.name.slice(0, -6), full);
      }
    };
    walk(TRANSCRIPT_ROOT);

    for (const run of missing) {
      const file = index.get(run.sessionId);
      if (!file) continue;
      const read = new Set();
      const edited = new Set();
      const tools = {};
      for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
        if (!line.trim()) continue;
        let record;
        try {
          record = JSON.parse(line);
        } catch {
          continue;
        }
        const content = record.message?.content;
        if (!Array.isArray(content)) continue;
        for (const block of content) {
          if (block?.type !== 'tool_use') continue;
          tools[block.name] = (tools[block.name] ?? 0) + 1;
          const target = block.input?.file_path;
          if (block.name === 'Read' && target) read.add(target);
          if ((block.name === 'Edit' || block.name === 'Write') && target) edited.add(target);
        }
      }
      cache[run.sessionId] = { filesRead: read.size, filesEdited: edited.size, tools };
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  }

  for (const run of runs) {
    const facts = cache[run.sessionId];
    run.filesRead = facts?.filesRead;
    run.filesEdited = facts?.filesEdited;
    run.tools = facts?.tools;
  }
}

/**
 * Whether a run landed the change is only in the console log, never in the payload.
 *
 * The log prints the bare task name, but payloads for the extra tool and prompt
 * conditions are filed under a suffix — `crosscut-nobash`, `located-selfcheck`. Keying
 * verdicts on the bare name therefore misses every suffixed task, and silently drops
 * back to the summary counts, which is how a fully verified cell came to read
 * `8 (unchecked)`. The condition is recovered from the log's own copy of the command
 * line and prompt, so it cannot drift from the file name.
 */
function loadVerdicts() {
  const verdicts = new Map();
  for (const file of fs.readdirSync(RESULTS_DIR)) {
    if (!/^run-log-.*\.md$/.test(file)) continue;
    const text = fs.readFileSync(path.join(RESULTS_DIR, file), 'utf8');
    const suffix =
      (/--tools\s+Edit,/.test(text) ? '-nobash' : '') +
      (/npx tsc --noEmit/.test(text) ? '-selfcheck' : '');

    for (const line of text.split('\n')) {
      const match = /\[([\w-]+)\]\s+([\w-]+)\s+run\s+(\d+)\/\d+.*?,\s*(verified|UNVERIFIED)/.exec(line);
      if (match) {
        verdicts.set(`${match[2]}|${match[1]}${suffix}|${match[3]}`, match[4] === 'verified');
      }
    }
  }
  return verdicts;
}

/**
 * How many runs in a cell landed the change, from the `runs` count in every summary the
 * harness has written. Where a payload count exceeds it, unidentifiable failures are
 * still mixed in and the cell is marked.
 */
function loadVerifiedCounts() {
  const counts = new Map();
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(path.join(dir, entry.name));
      else if (/^summary.*\.json$/.test(entry.name)) files.push(path.join(dir, entry.name));
    }
  };
  walk(RESULTS_DIR);

  for (const file of files) {
    const name = path.basename(file);
    const suffix = name.includes('-nobash')
      ? '-nobash'
      : name.includes('-selfcheck')
        ? '-selfcheck'
        : '';
    const summary = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const [task, apps] of Object.entries(summary.live ?? {})) {
      for (const [appKey, metrics] of Object.entries(apps)) {
        const key = `${APP_KEYS[appKey]}|${task}${suffix}`;
        counts.set(key, Math.max(counts.get(key) ?? 0, metrics.runs ?? 0));
      }
    }
  }
  return counts;
}

/** Source size per app, from the most complete offline phase on disk. */
function loadFootprint() {
  const footprint = {};
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(path.join(dir, entry.name));
      else if (/^summary.*\.json$/.test(entry.name)) {
        const summary = JSON.parse(fs.readFileSync(path.join(dir, entry.name), 'utf8'));
        for (const [appKey, sizes] of Object.entries(summary.offline ?? {})) {
          footprint[APP_KEYS[appKey]] = sizes;
        }
      }
    }
  };
  walk(RESULTS_DIR);
  return footprint;
}

/* ----------------------------------------------------------------- statistics ---- */

const median = (values) => {
  const usable = values.filter((value) => typeof value === 'number' && Number.isFinite(value));
  if (!usable.length) return undefined;
  const sorted = [...usable].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

/** Deterministic, so a bootstrap interval is identical every time it is printed. */
function makeRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

function combinations(n, k) {
  let result = 1;
  for (let i = 0; i < k; i += 1) result = (result * (n - i)) / (i + 1);
  return Math.round(result);
}

/**
 * Exact two-sided permutation test on |log(median A / median B)|.
 *
 * The logarithm matters. On a plain ratio the statistic is asymmetric — 0.5 and 2.0 are
 * the same size of effect but score 0.5 and 1.0 — which understates significance whenever
 * the first group is the cheaper one, and makes a clean two-fold separation look like
 * noise.
 *
 * Note the floor: with three runs against three the smallest reachable p is 2/20 = 0.10,
 * so no three-run comparison can ever reach p < 0.05.
 */
function permutationTest(a, b) {
  if (!a?.length || !b?.length) return { p: undefined };
  const observed = Math.abs(Math.log(median(a) / median(b)));
  const pool = [...a, ...b];
  const pick = a.length;
  const total = combinations(pool.length, pick);
  if (!Number.isFinite(observed)) return { p: undefined, total };

  /*
   * Exact enumeration is only affordable up to a few hundred thousand splits. Above that,
   * sample them instead, with a fixed seed so the printed p-value is reproducible. The
   * verdict is unchanged in practice; only the last decimal moves.
   */
  if (total > 400_000) {
    const random = makeRandom(20260825);
    const draws = 200_000;
    let hits = 0;
    for (let i = 0; i < draws; i += 1) {
      const shuffled = [...pool];
      for (let j = shuffled.length - 1; j > 0; j -= 1) {
        const k = Math.floor(random() * (j + 1));
        [shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]];
      }
      const left = shuffled.slice(0, pick);
      const right = shuffled.slice(pick);
      if (Math.abs(Math.log(median(left) / median(right))) >= observed - 1e-12) hits += 1;
    }
    return { p: hits / draws, total, sampled: true };
  }

  let extreme = 0;
  const indices = Array.from({ length: pick }, (_, i) => i);
  for (;;) {
    const chosen = new Set(indices);
    const left = indices.map((i) => pool[i]);
    const right = pool.filter((_, i) => !chosen.has(i));
    if (Math.abs(Math.log(median(left) / median(right))) >= observed - 1e-12) extreme += 1;

    let cursor = pick - 1;
    while (cursor >= 0 && indices[cursor] === pool.length - pick + cursor) cursor -= 1;
    if (cursor < 0) break;
    indices[cursor] += 1;
    for (let i = cursor + 1; i < pick; i += 1) indices[i] = indices[i - 1] + 1;
  }
  return { p: extreme / total, total, floor: 2 / total };
}

/** Percentile bootstrap on the ratio of medians. */
function bootstrapRatio(a, b, samples = 20_000, seed = 20260825) {
  if (!a?.length || !b?.length) return undefined;
  const random = makeRandom(seed);
  const draw = (values) => values[Math.floor(random() * values.length)];
  const ratios = [];
  for (let i = 0; i < samples; i += 1) {
    const left = median(Array.from({ length: a.length }, () => draw(a)));
    const right = median(Array.from({ length: b.length }, () => draw(b)));
    if (right > 0) ratios.push(left / right);
  }
  ratios.sort((x, y) => x - y);
  return [ratios[Math.floor(0.025 * ratios.length)], ratios[Math.floor(0.975 * ratios.length)]];
}

function pearson(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((sum, value) => sum + value, 0) / n;
  const my = ys.reduce((sum, value) => sum + value, 0) / n;
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < n; i += 1) {
    num += (xs[i] - mx) * (ys[i] - my);
    dx += (xs[i] - mx) ** 2;
    dy += (ys[i] - my) ** 2;
  }
  return num / Math.sqrt(dx * dy);
}

/* -------------------------------------------------------------------- output ---- */

function markdownTable(headers, rows) {
  const widths = headers.map((header, index) =>
    Math.max(header.length, ...rows.map((row) => String(row[index]).length)),
  );
  const line = (cells) =>
    `| ${cells.map((cell, index) => String(cell).padEnd(widths[index])).join(' | ')} |`;
  return [
    line(headers),
    `| ${widths.map((width) => '-'.repeat(width)).join(' | ')} |`,
    ...rows.map(line),
  ].join('\n');
}

const num = (value, digits = 0) =>
  typeof value === 'number' && Number.isFinite(value)
    ? value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
    : '—';
const money = (value) => (typeof value === 'number' ? `$${value.toFixed(4)}` : '—');
const secs = (value) => (typeof value === 'number' ? (value / 1000).toFixed(1) : '—');
const times = (value) => (typeof value === 'number' && Number.isFinite(value) ? `${value.toFixed(2)}x` : '—');
const pval = (test) => {
  if (test?.p === undefined) return '—';
  const marked = test.p < 0.05 ? `**${test.p.toFixed(3)}**` : test.p.toFixed(3);
  return test.floor > 0.05 ? `${marked} (floor ${test.floor.toFixed(2)})` : marked;
};

function main() {
  const all = loadRuns();
  loadTranscriptFacts(all);
  const verdicts = loadVerdicts();
  const verifiedCounts = loadVerifiedCounts();
  const footprint = loadFootprint();

  const infrastructure = all.filter((run) => run.infrastructureError);
  const runs = all.filter((run) => !run.infrastructureError);
  const usable = runs.filter((run) => verdicts.get(`${run.app}|${run.task}|${run.run}`) !== false);
  const cell = (task, app) => usable.filter((run) => run.task === task && run.app === app);

  const presentTasks = [...new Set(usable.map((run) => run.task))];
  const tasks = [
    ...TASK_ORDER.filter((task) => presentTasks.includes(task)),
    ...presentTasks.filter((task) => !TASK_ORDER.includes(task)).sort(),
  ];

  /*
   * `4/5` means one payload in the cell is a failure nobody can now identify.
   *
   * Per-run verdicts from the run logs are authoritative and are applied before this
   * point, so a cell they fully cover is clean by construction. The summary counts are
   * only a fallback for old rounds whose log is gone — and they must not be consulted
   * otherwise, because summaries from earlier rounds are keyed the same way and would
   * report a smaller round's count against a larger round's payloads.
   */
  const coverage = (task, app) => {
    const found = cell(task, app).length;
    const logged = runs.filter(
      (run) =>
        run.task === task &&
        run.app === app &&
        verdicts.has(`${run.app}|${run.task}|${run.run}`),
    ).length;
    const total = runs.filter((run) => run.task === task && run.app === app).length;
    if (logged === total && total > 0) return { found, clean: true, note: `${found}/${found}` };

    const claimed = verifiedCounts.get(`${app}|${task}`);
    if (claimed === undefined) return { found, clean: true, note: `${found} (unchecked)` };
    return { found, clean: claimed >= found, note: `${Math.min(claimed, found)}/${found}` };
  };

  const out = [];
  out.push('# Measured results');
  out.push('');
  out.push('<!-- Generated by `node analyse.mjs`. Do not edit by hand: edit the script. -->');
  out.push('');
  out.push('Numbers only, with no interpretation. What they mean is in');
  out.push('[CONCLUSION.md](CONCLUSION.md). Why the experiment is built this way is in');
  out.push('[METHODOLOGY.md](METHODOLOGY.md). How to reproduce it is in [README.md](README.md).');
  out.push('');

  /* ---------------------------------------------------------- provenance ---- */
  const models = [...new Set(usable.flatMap((run) => run.models))].sort();
  const dates = fs
    .readdirSync(RESULTS_DIR)
    .filter((file) => /-run\d+\.json$/.test(file))
    .map((file) => fs.statSync(path.join(RESULTS_DIR, file)).mtime.toISOString().slice(0, 10))
    .sort();

  out.push('## Provenance');
  out.push('');
  out.push(
    markdownTable(
      ['', ''],
      [
        ['Dates', `${dates[0]} to ${dates.at(-1)}`],
        ['Models seen in payloads', models.map((model) => `\`${model}\``).join(', ')],
        ['Agent', 'Claude Code CLI, `claude -p`'],
        ['Payloads on disk', String(all.length)],
        ['Excluded: network or server error', String(infrastructure.length)],
        ['Excluded: change did not land', String(runs.length - usable.length)],
        ['Analysed', String(usable.length)],
      ],
    ),
  );
  out.push('');
  out.push('Every run is checked twice before it counts: the app must still build, and a');
  out.push('task-specific assertion on the source must pass. Haiku appears in every payload because');
  out.push('the CLI uses it for internal work; it is about 1% of the spend.');
  out.push('');
  out.push('Column meanings, once, for every table below:');
  out.push('');
  out.push(
    markdownTable(
      ['Column', 'Meaning'],
      [
        ['Runs', 'Runs that landed the change, out of payloads present. `(unchecked)` means no log recorded a verdict'],
        ['Cost', 'Median `total_cost_usd`, then the min and max across runs'],
        ['Time', 'Median wall clock in seconds, then min and max'],
        ['Turns', 'Median round trips to the model'],
        ['Read / Edit', 'Distinct files opened and written, counted from the session transcript'],
        ['Out', 'Median output tokens'],
        ['In', 'Median input tokens including cache creation and cache reads'],
        ['New / Replay', 'Median cache-creation and cache-read tokens. New tokens bill about 12x replayed ones'],
      ],
    ),
  );
  out.push('');

  /* ------------------------------------------------------ source footprint ---- */
  out.push('## Source size of each app');
  out.push('');
  out.push(
    markdownTable(
      ['App', 'Directory', 'Files', 'Lines', 'Tokens'],
      APPS.filter((app) => footprint[app]).map((app) => [
        LABEL[app],
        `\`${app}\``,
        num(footprint[app].files),
        num(footprint[app].lines),
        num(footprint[app].tokens),
      ]),
    ),
  );
  out.push('');

  /* -------------------------------------------------------- raw, per app ---- */
  out.push('## Raw data, one table per app');
  out.push('');
  for (const app of APPS) {
    const rows = [];
    for (const task of tasks) {
      const group = cell(task, app);
      if (!group.length) continue;
      const cost = group.map((run) => run.costUsd);
      const time = group.map((run) => run.latencyMs);
      const turns = group.map((run) => run.turns);
      rows.push([
        `\`${task}\``,
        coverage(task, app).note,
        money(median(cost)),
        `${money(Math.min(...cost))}–${money(Math.max(...cost))}`,
        secs(median(time)),
        `${secs(Math.min(...time))}–${secs(Math.max(...time))}`,
        num(median(turns)),
        `${Math.min(...turns)}–${Math.max(...turns)}`,
        num(median(group.map((run) => run.filesRead))),
        num(median(group.map((run) => run.filesEdited))),
        num(median(group.map((run) => run.outputTokens))),
        num(median(group.map((run) => run.effectiveInput))),
        num(median(group.map((run) => run.cacheCreate))),
        num(median(group.map((run) => run.cacheRead))),
      ]);
    }
    if (!rows.length) continue;
    out.push(`### ${LABEL[app]} — \`${app}\``);
    out.push('');
    out.push(
      markdownTable(
        ['Task', 'Runs', 'Cost', 'Cost min–max', 'Time', 'Time min–max', 'Turns', 'Turns min–max', 'Read', 'Edit', 'Out', 'In', 'New', 'Replay'],
        rows,
      ),
    );
    out.push('');
  }

  /* ------------------------------------------------------- comparisons ---- */
  const comparisons = [
    {
      title: 'Same features, opposite structure',
      layered: 'abstracted-big',
      flat: 'collocated-small',
      note: 'Identical behaviour and identical feature set. The layered tree is 1.69x the tokens, so this ratio contains both shape and size.',
    },
    {
      title: 'Shape at the big size',
      layered: 'abstracted-big',
      flat: 'collocated-big',
      note: 'Size matched within 10%. The flat app carries more features.',
    },
    {
      title: 'Shape at the small size',
      layered: 'abstracted-small',
      flat: 'collocated-small',
      note: 'Size matched within 10%. The layered app carries far fewer features.',
    },
  ];

  out.push('## Comparisons');
  out.push('');
  out.push('All ratios are layered divided by flat. Above 1 means the layered app cost more.');
  out.push('`p` values below 0.05 are bold. `floor` marks a comparison whose sample is too small');
  out.push('to ever reach 0.05.');
  out.push('');
  out.push('Three metrics are tested per task, on three comparisons. At that count a few results');
  out.push('below 0.05 are expected by chance, so a lone borderline p is weak on its own; a large');
  out.push('effect repeated across all three comparisons is not.');
  out.push('');

  for (const comparison of comparisons) {
    const rows = [];
    for (const task of tasks) {
      const a = cell(task, comparison.layered);
      const b = cell(task, comparison.flat);
      if (!a.length || !b.length) continue;

      const cost = [a.map((r) => r.costUsd), b.map((r) => r.costUsd)];
      const time = [a.map((r) => r.latencyMs), b.map((r) => r.latencyMs)];
      const turns = [a.map((r) => r.turns), b.map((r) => r.turns)];
      const ci = bootstrapRatio(cost[0], cost[1]);
      const clean = [coverage(task, comparison.layered), coverage(task, comparison.flat)];
      const costTest = permutationTest(cost[0], cost[1]);

      rows.push([
        `\`${task}\``,
        `${a.length} v ${b.length}`,
        times(median(cost[0]) / median(cost[1])),
        ci ? `${ci[0].toFixed(2)}–${ci[1].toFixed(2)}` : '—',
        pval(costTest),
        times(median(time[0]) / median(time[1])),
        pval(permutationTest(time[0], time[1])),
        times(median(turns[0]) / median(turns[1])),
        pval(permutationTest(turns[0], turns[1])),
        `${num(median(turns[0]))} / ${num(median(turns[1]))}`,
        `${num(median(a.map((r) => r.filesRead)))} / ${num(median(b.map((r) => r.filesRead)))}`,
        `${num(median(a.map((r) => r.filesEdited)))} / ${num(median(b.map((r) => r.filesEdited)))}`,
        times(median(a.map((r) => r.outputTokens)) / median(b.map((r) => r.outputTokens))),
        times(median(a.map((r) => r.effectiveInput)) / median(b.map((r) => r.effectiveInput))),
        clean.every((entry) => entry.clean)
          ? ''
          : `unverified runs mixed in (${clean[0].note} vs ${clean[1].note})`,
      ]);
    }
    out.push(`### ${comparison.title} — \`${comparison.layered}\` ÷ \`${comparison.flat}\``);
    out.push('');
    out.push(comparison.note);
    out.push('');
    out.push(
      markdownTable(
        ['Task', 'Runs', 'Cost', '95% CI', 'p', 'Time', 'p', 'Turns', 'p', 'Turns L/F', 'Read L/F', 'Edit L/F', 'Out', 'In', 'Note'],
        rows,
      ),
    );
    out.push('');
  }

  /* ------------------------------------------------------- the size axis ---- */
  out.push('### The size axis — same shape, bigger tree');
  out.push('');
  out.push('`collocated-big` ÷ `collocated-small`, and `abstracted-big` ÷ `abstracted-small`. The');
  out.push('big trees are about 1.6x the lines of the small ones.');
  out.push('');
  const sizeRows = [];
  for (const task of tasks) {
    const pairs = [
      ['collocated-big', 'collocated-small'],
      ['abstracted-big', 'abstracted-small'],
    ].map(([big, small]) => {
      const a = cell(task, big);
      const b = cell(task, small);
      if (!a.length || !b.length) return ['—', '—'];
      const cost = [a.map((r) => r.costUsd), b.map((r) => r.costUsd)];
      return [times(median(cost[0]) / median(cost[1])), pval(permutationTest(cost[0], cost[1]))];
    });
    if (pairs[0][0] === '—' && pairs[1][0] === '—') continue;
    sizeRows.push([`\`${task}\``, ...pairs[0], ...pairs[1]]);
  }
  out.push(markdownTable(['Task', 'Flat big/small', 'p', 'Layered big/small', 'p'], sizeRows));
  out.push('');

  /* --------------------------------------------------- measured relations ---- */
  out.push('## Measured relationships');
  out.push('');
  const scored = usable.filter((run) => run.turns && run.costUsd);
  const sizeOf = (run) => footprint[run.app]?.tokens ?? 0;
  out.push(
    markdownTable(
      ['Relationship', 'r', 'Over'],
      [
        ['Agent turns vs cost', pearson(scored.map((r) => r.turns), scored.map((r) => r.costUsd)).toFixed(3), `${scored.length} runs`],
        ['Agent turns vs wall clock', pearson(scored.map((r) => r.turns), scored.map((r) => r.latencyMs)).toFixed(3), `${scored.length} runs`],
        ['Output tokens vs cost', pearson(scored.map((r) => r.outputTokens), scored.map((r) => r.costUsd)).toFixed(3), `${scored.length} runs`],
        ['Input incl. cache vs cost', pearson(scored.map((r) => r.effectiveInput), scored.map((r) => r.costUsd)).toFixed(3), `${scored.length} runs`],
        ['Source tree size vs cost', pearson(scored.map(sizeOf), scored.map((r) => r.costUsd)).toFixed(3), `${scored.length} runs`],
      ],
    ),
  );
  out.push('');
  out.push(
    `Median cost per turn ${money(median(scored.map((r) => r.costUsd / r.turns)))}. ` +
      `Median seconds per turn ${median(scored.map((r) => r.latencyMs / r.turns / 1000)).toFixed(1)}.`,
  );
  out.push('');

  const report = out.join('\n');
  fs.writeFileSync(path.join(ROOT, 'RESULTS.md'), `${report}\n`);
  console.log(`RESULTS.md written: ${usable.length} runs, ${tasks.length} tasks.`);
}

main();
