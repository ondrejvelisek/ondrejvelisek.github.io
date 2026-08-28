# Methodology

Why the experiment is built this way. The numbers are in [RESULTS.md](RESULTS.md). How to run
it is in [README.md](README.md). What it all means is in
[CONCLUSION.md](CONCLUSION.md).

## The question

Abstraction has a price. For people, we pay it in attention, and we have decades of intuition
about the trade. An AI agent pays a different price, in tokens, in seconds and in money, on
every single run.

> When an agent is asked to change a codebase, how much does the **structure** of that codebase
> change the price — and does the answer depend on **what kind of change** it is?

The second half matters more than the first. One task gives one number, and that number is
about the task as much as the code.

## Two things that make this hard to measure

**Abstraction makes code bigger.** A branded type, a factory, a barrel file: each is code the
flat version does not have. So a layered app is not only deeper, it is also larger. If it costs
more, either explanation fits. Two apps cannot tell them apart.

**The task decides the answer.** A change that lands in one place suits a flat app. A change
that lands in sixty places suits a registry. Measure one task and you measure the task.

The first problem needs four apps. The second needs several tasks.

## The four apps

All four are calculators built with React 19, TypeScript, Tailwind 4 and Vite 8. All four
typecheck and build. Two axes: **shape** is how deep the indirection is, **size** is how much
source code there is.

|            | small                                 | big                                |
| ---------- | ------------------------------------- | ---------------------------------- |
| **flat**   | `collocated-small` — 73 files, 2,013 lines | `collocated-big` — 89 files, 3,282 lines |
| **layered** | `abstracted-small` — 67 files, 2,159 lines | `abstracted-big` — 84 files, 3,571 lines |

Each row is matched for size within 10% on files, lines and tokens. The match is tested in both
directions (`max(a/b, b/a) ≤ 1.10`); the worst gap is 1.090×. A one-way check once hid an 11%
gap, because 0.901 looks like a pass.

What each app is for:

- **`collocated-small`** — a full scientific calculator, written flat. Every key is one file
  that owns everything about itself. `SinButton.tsx` holds the label `sin`, its colours, its
  degrees-to-radians conversion and its keyboard shortcut. There is no keypad table, no colour
  map, no operator registry and no `utils` folder.
- **`abstracted-big`** — **the same calculator**, same 61 buttons, same behaviour, written in
  twelve layers (listed below).
- **`collocated-big`** — `collocated-small` plus 15 unit converters, one file each. It is larger
  than `abstracted-big` on every measure and still flat. It answers the question "is this just
  a bigger project?"
- **`abstracted-small`** — only a four-function calculator with a memory register, but with all
  twelve layers. It has **fewer** features than the flat app it is compared against.

That last point is worth stating plainly: a layered app cannot be made as small as a flat one.
The scaffolding alone is about 1,650 lines before the first feature exists. So the flat app had
to be given more features to reach the same size, not fewer. This works **against** the
hypothesis, because the layered app has less work to do.

### The twelve layers

Present in both layered apps:

1. Type-level helpers (`Brand`, `Prettify`, `DeepReadonly`, `ValueOf`).
2. Branded primitives — the entry buffer is a `NumericString`.
3. An action union computed from a payload map by a mapped type.
4. Generic factories (`createReducerFromHandlers`, `createVariantResolver`).
5. Registries built by those factories, made exhaustive by mapped types.
6. A reducer split into one handler slice per concern.
7. The keypad as data — every key is a descriptor.
8. A store context with selectors; nothing reads state directly.
9. Higher-order components (`withDisplayFormatting`, `withThemeTokens`).
10. A primitive stack: `Box` → `Stack` → `BaseButton` → feature components.
11. Compound components with slots.
12. Theme indirection: components only ever write `var(--calc-*)`.

Plus one function per file in `utils/`, and barrel files for `types/` and `constants/`.

Neither design is wrong. The flat app repeats colour classes across sixty keys. The layered app
guarantees that no component hard-codes a colour. They simply cost different amounts to change.

## The tasks

Each task is one sentence of plain English, the same for every app, describing a change a real
person might ask for.

| Task       | Kind of change                    | What it isolates                       |
| ---------- | --------------------------------- | -------------------------------------- |
| `local`    | change one value at one leaf      | finding the place; both apps edit one file |
| `localalt` | the same change, worded differently | see below                            |
| `ripple`   | send a value through the view model | crossing layer boundaries            |
| `bugfix`   | find and repair a defect          | finding, rather than specifying        |
| `add`      | add a key                         | growing a registry vs adding a leaf    |
| `remove`   | delete a feature                  | unpicking vs deleting                  |
| `crosscut` | restyle twelve keys at once       | the case abstraction is built for      |

Two controls change the **task** instead of the code:

- **`shallow`** — rename one heading. One string, one file, one edit, in every app. This is the
  smallest change that exists, so it shows the smallest possible gap.
- **`located`** — `local` and `ripple` in one prompt, with the target file paths given. This
  removes the need to search, so what is left is the cost of editing several files. It answers
  the obvious objection to `local`: "just give the agent better context."

### Why the same change is asked twice

`local` says: *change the "=" key accent colour to purple.*

Both words in that sentence are unfair. The flat apps contain a file called
`EqualsButton.tsx`, so `=` is a free text search. The layered apps contain a token called
`--calc-key-accent-bg`, so `accent` is a free text search for them.

That means `local` measures two things mixed together: how deep the indirection is, and how well
the words of the request happen to match the names in the tree.

`localalt` asks for the identical change, checked by the identical assertion, in words that
match no file name and no token name:

> the key that finishes a calculation and shows the answer should be purple instead of the
> colour it is now.

The gap that survives that rewording is indirection alone. This is the single most important
control in the suite, because "your file names gave the flat app the answer" is the strongest
objection to the whole experiment.

### Why `bugfix` describes a missing guard

The defect is a guard removed from all four apps: `if (!state.isEntering) return state;`. The
report describes only what the user sees. No word in it appears in the source. That rules out
searching the bug report's own wording straight to the fix.

The defect ships in the repository, in all four apps, identically. All four still build and
still pass their behaviour suites, because every app is wrong in the same way. Leave it alone,
or the task has nothing to find.

### Why `crosscut` is run without a shell

`crosscut` exists to measure how many places a change lands. Given a shell, the flat apps
rewrote all twelve key files with `sed` and never called `Edit`. That turns the task into a
measure of how well a change can be batched.

Run with `--no-bash`, every changed file costs one edit. Both conditions are reported. The
no-shell one is the primary number, because that is the question the task was built to ask.

## What is kept the same

| Kept the same     | How                                                                     |
| ----------------- | ----------------------------------------------------------------------- |
| Behaviour         | `collocated-small`, `collocated-big` and `abstracted-big` pass the same 26-case suite. `abstracted-small` passes a 12-case reduced suite, because it has no scientific functions. |
| Features          | `abstracted-big` and `collocated-small` render the same 61 buttons, with the same tooltips, hints, theme, settings and history. |
| The planted bug   | Deleted from all four apps identically.                                  |
| Wording           | One sentence per task, identical for every app. Two tasks must differ per app, and say so. |
| Starting state    | Every run starts from a byte-identical snapshot, restored after each run. |
| Model             | Pinned with `--model`. The harness reads the model back out of each payload and prints it. |
| Tools             | `--tools Bash,Edit,Glob,Grep,Read,Write`, plus `--strict-mcp-config` and `--safe-mode`. |
| Order             | Runs rotate through apps and tasks, so drift in API load lands on every cell equally. |
| Comments          | Doc comments were stripped from both apps. Only comments stating a constraint remain. |
| Author            | All four apps written by one author in one sitting.                     |

Three flags are needed, not one. `--tools` is the only one that restricts the toolset;
`--allowedTools` merely pre-approves prompts. `--strict-mcp-config` removes MCP servers, which is
what removes the browser. `--safe-mode` stops the agent inheriting the developer's own
`CLAUDE.md`, skills and output styles — an output style alone changes how much it writes, and
therefore its token count.

## How a run is checked

A run counts only if the change actually happened. Otherwise an agent that gave up early looks
like an agent that finished cheaply, and pulls the median down. Every run is checked twice,
before the sources are restored:

1. **The app still typechecks and builds.** This catches half-applied edits.
2. **A task-specific assertion on the source passes.** This catches "did nothing" and "did the
   wrong thing".

These are necessary, not sufficient. They cannot prove the change is correct, only that
something of the right shape happened and the code still compiles. Behaviour is checked
separately by the parity suites.

The assertions are themselves tested. Four were wrong at one point and had already accepted
runs: one passed on untouched code because `aria-label={ARIA_LABELS.memoryIndicator}` contains
the word "memory", another anchored on a name that also appears in an action union at the top of
the same file. Each assertion now runs against a control matrix on real sources: the unfixed tree
must fail, several reasonable spellings of the fix must pass, and an unrelated edit **to the same
file** must still fail. That last case is what catches a check pointed at the wrong place.

### A failed agent and a failed network are not the same thing

If the agent tried and got it wrong, that is a result: a shape that invites mistakes should pay
for them. If the network dropped, that is not a result.

An early round lost two runs on one app to a DNS failure, and recorded both as agent failures.
Outages do not fall evenly across a schedule that takes hours, so this quietly biases medians.
A run whose payload reports an API or network error is now thrown away and repeated from pristine
sources, up to three attempts, with a growing pause between them.

### Making the agent fix its own compile errors

Four of twelve `located` runs failed to build, all on the flat apps, all on the same mistake:
`formatNumber` takes a string and `state.memory` is a number. Dropping them biases the result
towards whichever app failed, because the survivors are the runs that happened to go smoothly.

The fix is one extra sentence, identical for every app, enabled by `--verify-build`:

> When you are done, run `npx tsc --noEmit` in `<app>/` and fix anything it reports.

It hints at nothing and applies everywhere, so a shape that invites more mistakes pays for them
in turns instead of vanishing from the sample. Two things were deliberately **not** done: naming
the type mismatch would hand the flat apps a hint the layered apps do not need, and widening
`formatNumber`'s signature would edit the thing being measured.

## How to read the numbers

Run-to-run variance is large. The same bytes and the same prompt produced 19 to 26 turns on one
app. So a ratio of two medians, on its own, says very little.

`node analyse.mjs` regenerates every table from the raw payloads and attaches:

- **An exact permutation test** on the size of the difference, measured as
  `|log(median A / median B)|`. The logarithm matters: on a plain ratio, 0.5× and 2.0× are the
  same size of effect but score differently, which makes a clean two-fold separation look like
  noise.
- **A bootstrap interval** for the ratio, so the width of the uncertainty is visible.
- **A smallest possible p-value.** With three runs against three, the smallest value the test can
  ever return is 2/20 = 0.10. **No three-run comparison can reach p < 0.05, however clean it
  looks.** Tables mark those comparisons rather than letting a reader treat them as findings.

Every table in [RESULTS.md](RESULTS.md) is generated by that script. Nothing is copied by hand.
An earlier round of this experiment re-ran one task and did not update the write-up, so the
published figure and the stored payloads disagreed for weeks.

### What each metric captures

| Metric                   | What it captures                     | Weakness                                           |
| ------------------------ | ------------------------------------ | -------------------------------------------------- |
| **Agent turns**          | Round trips to the model             | Varies run to run; needs medians                    |
| **Files edited**         | How many places the change lands     | Useless when the agent uses `sed`; see `--no-bash`  |
| **Files read**           | How much of the tree was opened      | Includes exploratory reads                          |
| **Input incl. cache**    | The real read cost                   | The noisiest number here                            |
| **Output tokens**        | How much writing the change needed   | About a quarter of the bill                         |
| **Cost (USD)**           | What it billed                       | Depends on model and price tier; compare ratios     |
| **Wall clock**           | What a developer waits for           | Depends on API load at the time                     |

Two traps. Raw `input_tokens` reads as a couple of dozen tokens, because almost everything is
prompt-cached; always use the figure including cache. And prices move, so compare ratios, never
absolutes.

### What the bill is actually made of

Cost is a deterministic function of three token counts: output, tokens read for the first time,
and tokens replayed from cache. Fitting those three rates against the stored payloads reproduces
the billed figure to 0.23% median error, so the rates can be recovered from the data rather than
assumed.

Doing that shows how uneven they are. A replayed token costs about a twentieth of a newly read
one and about a fortieth of an output token. The median run spends roughly a quarter of its bill
on output, 38% on first reads and 36% on replay. This is why turns are a good proxy for cost only
when the extra turns bring new files with them: a turn that merely re-sends what the model has
already seen is nearly free.

**And prices move more than expected.** Runs on 2026-08-23 were billed at about 1.5 times the
rates of runs on 2026-08-25, uniformly across all three token classes. Token counts for identical
work were stable across those dates; only the rate changed. So an absolute dollar figure from one
date cannot be compared with one from another, while token counts can. Where costs from different
dates have to be compared, recompute them from the token counts at one fixed schedule.

Files read and edited do not come from token totals. The harness finds each run's transcript
under `~/.claude/projects/`, using the session id in the payload, and counts distinct `Read` and
`Edit` calls plus the full tool mix. This is the only metric that watches the agent move through
the tree instead of inferring it from a total.

## What would prove this wrong

Stated in advance, so the result can fail. Three of these have already fired, and the
conclusions were narrowed.

1. **If `collocated-big` cost as much as `abstracted-big`**, size would be the cause, not shape.
2. **If the shape effect appeared at one size and not the other**, it would be an artifact of one
   app.
3. **If files edited were equal across shapes on every task**, the explanation would have no
   mechanism.
4. ~~**If any task showed abstraction cheaper**, the general claim would be dead.~~ **Fired.**
   The general claim is dead. What survives is a claim about which kinds of change cost more.
5. ~~**If naming the target files closed the gap**, the cost would be discovery alone, and better
   context would fix it.~~ **Tested, did not fire.** Compared within one prompt condition at eight
   runs each, naming the paths moves the gap from 2.02x to 1.79x, and the intervals overlap. It
   saves both shapes 32-53%, in no consistent direction.
6. ~~**If rewording the request closed the gap**, the cost would be name matching, not
   structure.~~ **Tested, fired only partly.** Rewording closed about 15% of the gap. Name
   matching is real and small; the rest is structure.
7. **If `abstracted-small` were cheaper than `collocated-small` everywhere**, the effect would be
   about feature count rather than structure.

## Known limits

- **The apps are synthetic.** Four apps, one author, one sitting. Real code has inconsistent
  names, dead code and history, all of which add noise.
- **The apps are small.** 2,000 to 3,600 lines. At this size nearly everything is within two
  hops of everything else, which is exactly why navigating by directory name works so well. The
  results where abstraction does well are therefore a best case for it.
- **The layered apps are deliberately extreme.** Twelve layers in a calculator is a caricature,
  chosen to make the effect measurable. It is an upper bound, not a typical codebase. The flat
  apps are unusual too: one file per key is not a common way to write React.
- **`files edited` is unreliable wherever a shell is used.** The tool mix is printed alongside so
  this is visible.
- **Small samples.** Main tasks use ten runs. Older conditions use three or five, and three can
  never reach significance.
- **Two prompt conditions are in play.** Some tasks are quoted with the self-check sentence and
  some without. Each table says which.
- **One model family.** Sonnet throughout. This is not a survey across vendors.
- **Parity is behavioural, not exhaustive.** 26 cases is strong evidence the apps match, not
  proof.
- **One latent bug, found and kept.** `abstracted-big`'s "exhaustive by construction" claim has a
  hole: `mergeHandlerSlices` casts, so a missing handler compiles and silently does nothing. It
  bit during construction, where `±` did nothing and the typechecker was happy. Worth knowing
  when judging what the type machinery actually buys.
