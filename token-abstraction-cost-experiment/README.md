# What does abstraction cost an AI agent?

Four versions of the same calculator. Seven change requests. One agent. Every run measured and
verified.

The apps differ on two axes: **shape** (how deep the indirection is) and **size** (how much
source code there is). Holding one still while moving the other is what separates "this code is
layered" from "this code is bigger".

**The finding: there is no single number.** The layered app costs anywhere from **4.97× more**
than the flat one to **0.84×, meaning less**, depending on what you ask for.

Abstraction charges you for **telling the agent what to change**. It pays you back for
**finding a defect** and for **changing many places at once**.

Shape moves the bill by up to 5×. Making the tree 1.6× bigger moves it by at most 1.7×, and on
most tasks not at all. Depth is the expensive axis, not volume.

Every ratio in [RESULTS.md](RESULTS.md) carries a confidence interval and a significance test, so
you can see which ones are findings and which are noise.

| | Read this |
| --- | --- |
| Why it is built this way, and what would prove it wrong | [METHODOLOGY.md](METHODOLOGY.md) |
| Every measured number | [RESULTS.md](RESULTS.md) |
| What it means, in prose | [CONCLUSION.md](CONCLUSION.md) |
| How to run it yourself | this file |

## The four apps

|             | small                                | big                              |
| ----------- | ------------------------------------ | -------------------------------- |
| **flat**    | [`collocated-small/`](collocated-small/) | [`collocated-big/`](collocated-big/) |
| **layered** | [`abstracted-small/`](abstracted-small/) | [`abstracted-big/`](abstracted-big/) |

`abstracted-big` and `collocated-small` are the same calculator, feature for feature, written
two different ways. That pair is the main comparison. The other two apps exist to rule out size
as the explanation. [METHODOLOGY.md](METHODOLOGY.md#the-four-apps) describes each one.

A bug ships in all four apps on purpose: backspace edits a finished result instead of leaving it
alone. The `bugfix` task looks for it. Leave it in place, or that task has nothing to find.

## Before you start

- **Node 22+** and npm.
- **[Claude Code](https://claude.com/claude-code) CLI**, installed and signed in. Check with
  `claude --version`. The published numbers used 2.1.241.
- **Money.** The live phase makes real API calls. Start with `npm run bench:offline`, which is
  free.

## Run it

```bash
npm run setup          # install the harness and all four apps
npm run bench:offline  # count files, lines and tokens — free, no API calls
npm run bench:one      # one task, one run per app — cheapest end-to-end check
npm run bench          # the full suite
npm run analyse        # regenerate every table in RESULTS.md from results/
```

`npm run bench` writes one JSON payload per run into `results/`, named
`<app>-<task>[-<condition>]-run<n>.json`.

| Command | What it does |
| --- | --- |
| `npm run setup` | Install the harness, then all four apps |
| `npm run bench:offline` | Count source size only. Free |
| `npm run bench:one` | One task, one run per app |
| `npm run bench` | Seven tasks, ten runs each |
| `npm run bench:crosscut:nobash` | `crosscut` with the shell withheld ([why](METHODOLOGY.md#why-crosscut-is-run-without-a-shell)) |
| `npm run bench:controls` | The `shallow` and `located` control tasks |
| `npm run analyse` | Re-read `results/` and rewrite the tables. No API calls |
| `npm run build:all` | `tsc --noEmit && vite build` in all four apps |
| `npm run dev:all` | Start all four dev servers, for checking behaviour by hand |

`benchmark.mjs` also takes flags directly:

```bash
node benchmark.mjs --tasks local,ripple --runs 10   # pick tasks; use 10, never 3
node benchmark.mjs --model opus                     # pin a different model (default: sonnet)
node benchmark.mjs --no-bash                        # withhold the shell: every file costs an edit
node benchmark.mjs --verify-build                   # ask the agent to typecheck before finishing
node benchmark.mjs --offline                        # skip the live phase
node benchmark.mjs --keep-changes                   # leave the last run's edits on disk
```

`--no-bash` and `--verify-build` write their payloads with a `-nobash` or `-selfcheck` suffix,
so conditions sit side by side instead of overwriting each other.

## Check that the apps really match

The whole experiment rests on the apps behaving identically, so check it rather than trusting
it:

```bash
npm run build:all   # all four must typecheck and build
npm run dev:all     # starts ports 5173-5176
```

Open each app, paste [`parity/parity-suite.js`](parity/parity-suite.js) into the browser
console, and confirm `PARITY OK (26/26)`. The suite drives the app with keyboard events and
reads the single `<output>` element, so the same script runs unchanged everywhere.

That covers the three full calculators. `abstracted-small` has no scientific functions, so it
runs a 12-case reduced suite,
[`parity/parity-suite-basic.js`](parity/parity-suite-basic.js).

| App | Port |
| --- | --- |
| `abstracted-big` | http://localhost:5173 |
| `collocated-small` | http://localhost:5174 |
| `collocated-big` | http://localhost:5175 |
| `abstracted-small` | http://localhost:5176 |

## Your numbers will differ

Expect the same direction, not the same absolute values. Cost depends on your model and price
tier. Latency depends on how busy the API is. Turn counts vary run to run on identical bytes.

If your ratios look very different from [RESULTS.md](RESULTS.md), check that `--runs` is at
least 10 and that the model printed by the harness is the one you meant.

## Layout

```
abstracted-big/       layered, full scientific calculator
abstracted-small/     layered, basic four-function calculator
collocated-small/     flat, full scientific calculator
collocated-big/       flat, plus 15 unit converters

benchmark.mjs         the harness: runs the agent, verifies, measures
analyse.mjs           re-reads results/ and regenerates every table. No API calls
verify.mjs            per-task assertions: did the change actually land?
parity/               behavioural parity suites (paste into the browser console)
scripts/              helpers for running a command in all four apps
results/              one JSON payload per run, plus run logs and a transcript cache

METHODOLOGY.md        design, verification, statistics, limits
RESULTS.md            measured numbers, generated. Raw table per app, then comparisons
CONCLUSION.md         what the numbers mean
```

One note if you fork this: each app needs its own `.gitignore` listing `dist`. Tailwind 4 scans
the project and respects `.gitignore`; without one, the previous build's output feeds into the
next build's scan and inflates the emitted CSS. It affects build output only, never the token
counts, because `dist/` is excluded from the walk.
