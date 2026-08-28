/**
 * Did the agent actually do the job?
 *
 * Without this, a run that gave up early and a run that finished cheaply look
 * identical in the numbers — and the cheap-looking one would drag a median down.
 * Every run is checked twice:
 *
 *   1. the app still typechecks and builds  (catches broken or half-applied edits)
 *   2. a task-specific assertion on the source (catches "did nothing" and "did the
 *      wrong thing")
 *
 * These are necessary, not sufficient. They cannot prove the change is *correct* —
 * only that something of the right shape landed and the tree still compiles.
 * Behavioural equivalence is checked separately, by hand, with the parity suite.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/** Every source file in an app, as one string, with its path. */
function readSources(appDir) {
  const files = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(ts|tsx|css)$/.test(entry.name)) {
        files.push({ path: full, text: fs.readFileSync(full, 'utf8') });
      }
    }
  };
  walk(path.join(appDir, 'src'));
  return files;
}

const isCollocated = (dir) => dir.startsWith('collocated');

/** Key files whose colours the collocated apps keep in the leaves. */
function keyFiles(files) {
  return files.filter((file) => file.path.includes(`${path.sep}buttons${path.sep}`));
}

/**
 * Hue of every `--calc-key-*-bg` token, for the apps that centralise colour.
 * oklch hue: red ≈ 20, cyan ≈ 200, slate ≈ 260, purple/violet ≈ 280–330.
 */
function accentHues(files, tokenPattern) {
  const tokens = files.find((file) => file.path.endsWith('tokens.css'));
  if (!tokens) return [];
  const hues = [];
  for (const line of tokens.text.split('\n')) {
    if (!tokenPattern.test(line)) continue;
    const match = line.match(/oklch\(\s*[\d.]+\s+[\d.]+\s+([\d.]+)/);
    if (match) hues.push(Number(match[1]));
  }
  return hues;
}

/** Hue of one named token, or undefined if it is missing. */
function hueOfToken(files, tokenName) {
  const [hue] = accentHues(files, new RegExp(`${tokenName}\\s*:`));
  return hue;
}

/** Violet/purple in oklch. Deliberately excludes slate, which sits near 260. */
const inPurpleRange = (hue) => hue >= 270 && hue <= 345;

const PURPLE_WORDS = /(purple|violet|fuchsia|indigo)/i;

/**
 * An arbitrary colour value whose hue sits in the purple range, e.g.
 * `bg-[oklch(0.6_0.2_300)]`. Only oklch is recognised: it is what these apps use,
 * and guessing hue from hex would be more likely to mislead than to help.
 */
function hasPurpleArbitraryValue(text) {
  for (const match of text.matchAll(/oklch\(\s*[\d.%]+[\s_]+[\d.]+[\s_]+([\d.]+)/g)) {
    if (inPurpleRange(Number(match[1]))) return true;
  }
  return false;
}

/**
 * A key that is the same for a file and its snapshot copy.
 *
 * The snapshot lives at `.snapshot/<app>/src/…` and the live tree at `<app>/src/…`, so
 * the absolute paths never match. Everything after `src/` is unique within one app.
 */
const sourceKey = (file) => file.path.split(`${path.sep}src${path.sep}`).at(-1);

/** Files whose contents differ from the pristine snapshot. */
function changedFiles(files, pristine) {
  const before = new Map(pristine.map((file) => [sourceKey(file), file.text]));
  return files.filter((file) => file.text !== before.get(sourceKey(file)));
}

/**
 * The body of one function, so a check applies where the fix belongs rather than
 * anywhere in the file.
 *
 * This matters more than it looks. `entry.handlers.ts` already contains
 * `if (!base.isEntering)` twice, in the digit and decimal handlers — a file-wide search
 * for that guard passes on untouched code. Returns `{ text, scoped }` so a caller can
 * report when it fell back to the whole file.
 */
function functionBody(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  if (start === -1) return { text, scoped: false };
  const end = text.indexOf(endMarker, start + startMarker.length);
  return { text: end === -1 ? text.slice(start) : text.slice(start, end), scoped: true };
}

/** A guard on "is the user still typing?", in any of the shapes a fix might take. */
const ENTERING_GUARD =
  /(!\s*[\w.]*\b(isEntering|typing)\b)|(\b(isEntering|typing)\s*[!=]==?\s*(false|true))|(if\s*\(\s*[\w.]*\b(isEntering|typing)\b\s*\))/;

/**
 * One assertion per task. Each returns { ok, detail }.
 * `dir` is the app directory name, `files` its sources after the agent ran.
 */
export const TASK_ASSERTIONS = {
  local: (dir, files, pristine) => {
    if (isCollocated(dir)) {
      const equals = files.find((file) => file.path.endsWith('EqualsButton.tsx'));
      const ok = Boolean(
        equals && (PURPLE_WORDS.test(equals.text) || hasPurpleArbitraryValue(equals.text)),
      );
      return { ok, detail: ok ? 'EqualsButton uses a purple family' : 'EqualsButton still not purple' };
    }
    const now = hueOfToken(files, '--calc-key-accent-bg');
    const before = hueOfToken(pristine, '--calc-key-accent-bg');
    const ok = now !== undefined && now !== before && inPurpleRange(now);
    return { ok, detail: `accent hue ${before ?? '?'} → ${now ?? '?'}` };
  },

  /*
   * `localalt` asks for the same edit as `local`, in words that match no file name and
   * no token name, so it is checked in exactly the same way. Sharing the assertion is
   * the point: if the two wordings were scored differently, comparing them would mean
   * nothing.
   */
  localalt: (dir, files, pristine) => TASK_ASSERTIONS.local(dir, files, pristine),

  ripple: (dir, files, pristine) => {
    /*
     * The memory value has to reach the display, not just a boolean "has memory".
     *
     * Strip three things that mention memory without rendering it: the boolean flags,
     * and aria-label attributes — the layered apps carry
     * `aria-label={ARIA_LABELS.memoryIndicator}`, which is inside JSX braces and would
     * otherwise read as a pass on untouched code. Then require the file to have
     * actually changed, and to render a memory-ish value.
     */
    const strip = (text) =>
      text
        .replace(/aria-label=\{[^}]*\}/g, '')
        .replace(/aria-label="[^"]*"/g, '')
        .replace(/hasMemory/g, '')
        .replace(/memory\s*!==\s*0/g, '');

    const displays = changedFiles(files, pristine).filter((file) =>
      file.path.endsWith('Display.tsx'),
    );

    const rendersValue = displays.some((file) => /\{[^}]*memory[^}]*\}/i.test(strip(file.text)));

    return {
      ok: rendersValue,
      detail: rendersValue ? 'display renders a memory value' : 'display still shows only the flag',
    };
  },

  bugfix: (dir, files, pristine) => {
    /*
     * The guard has to come back, and it has to come back inside the code that trims
     * the entry — not merely somewhere in a file that already contains a similar test.
     * Where the agent puts it is its own business, so any changed file that deals with
     * backspace counts, but the check is scoped to the function that does the trimming.
     */
    // `removeLastCharacter: (` and not just the name: the name also appears in the
    // action-type union at the top of the file, and anchoring there would scope the
    // check to the digit handler instead — which carries a matching guard already.
    const [startMarker, endMarker] = isCollocated(dir)
      ? ['const press', '\n  };']
      : ['removeLastCharacter: (', '\n  },'];

    const candidates = changedFiles(files, pristine).filter((file) =>
      /backspace|removeLastCharacter|slice\(0,\s*-1\)/i.test(file.text),
    );
    if (candidates.length === 0) return { ok: false, detail: 'nothing changed near backspace' };

    let fellBack = false;
    const ok = candidates.some((file) => {
      const body = functionBody(file.text, startMarker, endMarker);
      if (!body.scoped) fellBack = true;
      return ENTERING_GUARD.test(body.text);
    });

    return {
      ok,
      detail: ok
        ? `backspace guarded again${fellBack ? ' (whole-file match — restructured, worth a look)' : ''}`
        : 'backspace still trims a settled result',
    };
  },

  add: (dir, files) => {
    // The task names the label, so the check is exact.
    const ok = files.some((file) => file.text.includes('÷ᶦ'));
    return { ok, detail: ok ? 'integer-division key present' : 'no key labelled ÷ᶦ' };
  },

  remove: (dir, files) => {
    const survivors = files.filter((file) => /\bmemory\b/i.test(file.text));
    const ok = survivors.length === 0;
    return {
      ok,
      detail: ok
        ? 'no memory references remain'
        : `memory still referenced in ${survivors.length} file(s)`,
    };
  },

  /*
   * The controls. These vary the *task* rather than the code, so they need assertions
   * as much as the rest: without one, "the agent did nothing" and "the agent renamed a
   * heading" are the same verified run, and the floor they establish would be a floor
   * under nothing.
   */
  shallow: (dir, files, pristine) => {
    // `abstracted-small` has no history panel, so it renames a keypad section instead.
    const [before, after] =
      dir === 'abstracted-small' ? ['Memory', 'Store'] : ['History', 'Log'];

    const changed = changedFiles(files, pristine);
    if (changed.length === 0) return { ok: false, detail: 'nothing changed' };

    /*
     * Heading text only. `History` is also a type name, a state field and a directory
     * in the layered apps, so a bare substring search would pass on an untouched tree —
     * the string has to be matched where it is rendered or declared as a label.
     */
    const asLabel = (text, word) =>
      new RegExp(`>\\s*${word}\\s*<|['"\`]${word}['"\`]`).test(text);

    const renamed = changed.some((file) => asLabel(file.text, after));
    const oldGone = !files.some((file) => asLabel(file.text, before));

    return {
      ok: renamed && oldGone,
      detail: renamed
        ? oldGone
          ? `heading reads "${after}"`
          : `"${after}" added but "${before}" still shown somewhere`
        : `no heading reads "${after}"`,
    };
  },

  /** `local` and `ripple` in one prompt, with the target files named. Both must land. */
  located: (dir, files, pristine) => {
    const colour = TASK_ASSERTIONS.local(dir, files, pristine);
    const indicator = TASK_ASSERTIONS.ripple(dir, files, pristine);
    return {
      ok: colour.ok && indicator.ok,
      detail: `colour: ${colour.detail}; indicator: ${indicator.detail}`,
    };
  },

  crosscut: (dir, files, pristine) => {
    /*
     * The task asks for one tone group only, so a pass means two things: the digit
     * keys moved to violet, and the other groups did not. An agent that recolours
     * the whole keypad has done a different, larger job and should not pass.
     */
    if (isCollocated(dir)) {
      /*
       * The full background+text pair, not just `bg-slate-200`: the function keys
       * carry `hover:bg-slate-200`, so a bare substring matches 52 files instead of
       * the 12 digit keys.
       */
      const DIGIT_TONE = 'bg-slate-200 text-slate-900';
      const wasDigit = new Set(
        keyFiles(pristine)
          .filter((file) => file.text.includes(DIGIT_TONE))
          .map((file) => path.basename(file.path)),
      );
      if (wasDigit.size === 0) return { ok: false, detail: 'could not identify the digit keys' };

      const isViolet = (file) =>
        /bg-(violet|purple|fuchsia|indigo)-/.test(file.text) || hasPurpleArbitraryValue(file.text);

      const keys = keyFiles(files);
      const digitsMoved = keys.filter(
        (file) => wasDigit.has(path.basename(file.path)) && isViolet(file),
      ).length;
      const othersMoved = keys.filter(
        (file) => !wasDigit.has(path.basename(file.path)) && isViolet(file),
      ).length;

      const ok = digitsMoved === wasDigit.size && othersMoved === 0;
      return {
        ok,
        detail: `${digitsMoved}/${wasDigit.size} digit keys violet, ${othersMoved} other keys also changed`,
      };
    }

    const digitNow = hueOfToken(files, '--calc-key-digit-bg');
    const digitWas = hueOfToken(pristine, '--calc-key-digit-bg');
    const untouched = ['function', 'operator'].every(
      (name) =>
        hueOfToken(files, `--calc-key-${name}-bg`) === hueOfToken(pristine, `--calc-key-${name}-bg`),
    );
    const ok = digitNow !== undefined && digitNow !== digitWas && inPurpleRange(digitNow) && untouched;
    return {
      ok,
      detail: `digit hue ${digitWas ?? '?'} → ${digitNow ?? '?'}, other groups ${untouched ? 'untouched' : 'also changed'}`,
    };
  },
};

/** Does the app still typecheck and build? */
function buildsCleanly(root, dir) {
  try {
    execFileSync('npm', ['run', 'build'], {
      cwd: path.join(root, dir),
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 5 * 60 * 1000,
    });
    return { ok: true, detail: 'builds' };
  } catch (error) {
    const output = `${error.stdout ?? ''}${error.stderr ?? ''}`.trim().split('\n').at(-1) ?? '';
    return { ok: false, detail: `build failed: ${output.slice(0, 120)}` };
  }
}

/**
 * Verify one run, in place, before the harness restores the sources.
 * Returns { ok, build, assertion } — `ok` only when both pass.
 */
export function verifyRun(root, dir, taskName) {
  const build = buildsCleanly(root, dir);
  const assertion = TASK_ASSERTIONS[taskName];

  if (!assertion) return { ok: build.ok, build, assertion: { ok: true, detail: 'no assertion' } };

  // The snapshot the harness took before this run: the ground truth for "did it change?".
  const snapshot = path.join(root, '.snapshot', dir);
  const pristine = fs.existsSync(path.join(snapshot, 'src')) ? readSources(snapshot) : [];

  let checked;
  try {
    checked = assertion(dir, readSources(path.join(root, dir)), pristine);
  } catch (error) {
    checked = { ok: false, detail: `assertion threw: ${error.message}` };
  }

  return { ok: build.ok && checked.ok, build, assertion: checked };
}
