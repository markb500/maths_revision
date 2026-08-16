# Maths Revision App

Modular ES6 revision tool for the RAF Aerospace Engineering Technician maths course. Students practice randomly generated questions with worked solutions; lecturers can design printable tests and use a private solution window.

Aligned in structure and conventions with the **Science Revision** and **Radar Revision** apps.

---

## Contents

1. [Quick start](#quick-start)
2. [Features](#features)
3. [Folder structure](#folder-structure)
4. [Architecture](#architecture)
5. [Generator interface](#generator-interface)
6. [Topics](#topics)
7. [Shared utilities (`utils.js`)](#shared-utilities-utilsjs)
8. [Test Designer](#test-designer)
9. [Teacher solution window](#teacher-solution-window)
10. [Print layout](#print-layout)
11. [Fixture tests (maintainers)](#fixture-tests-maintainers)
12. [Adding or changing a topic](#adding-or-changing-a-topic)
13. [Coding conventions](#coding-conventions)
14. [Troubleshooting](#troubleshooting)

---

## Quick start

ES modules **must** be loaded over HTTP (not `file://`).

```bash
cd "Maths Revision"
npx serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:3000` (or the port shown / `8080`).

Use the topic buttons on the left to generate questions. **Show/Hide Solution** reveals the worked answer (and any diagram). **Link to Training Notes** opens the relevant PDF page.

---

## Features

| Feature | Description |
|--------|-------------|
| Topic buttons | One click → new random question for that topic |
| Worked solutions | Step-by-step MathJax solutions; view counter on the solution button |
| Diagrams | Canvas drawings where needed (trig, area/volume, simultaneous graphs, HCF/LCM prime trees, sin/cos graphs) |
| Training notes | Per-question link into the course PDF |
| Formula sheet | Link from the main UI |
| Test Designer | Build a multi-question test, reorder by drag-and-drop, print |
| Change question | In test mode, regenerate one question without rebuilding the whole test |
| Teacher SolnWin | Secret code opens a window that always shows the current solution |
| Background colour | Optional page background via the colour selector |
| Print-friendly CSS | Hides controls; solutions section starts on a new page |

---

## Folder structure

```
Maths Revision/
├── index.html              Main student / instructor UI
├── testCreate.html         Test Designer (topic list + order)
├── SolnWin.html            Teacher-only solution window
├── README.md               This documentation
├── GENERATORS.md           Per-topic generator notes (maintainers)
├── css/
│   └── main.css            Layout, canvas, print rules
├── js/
│   ├── app.js              UI, single-question mode, test mode, SolnWin sync
│   ├── registry.js         Topic key → generator module
│   ├── utils.js            Shared maths/helpers + image preload
│   ├── generators/         One module per topic (see Topics)
│   └── test/               Node fixture runners (maintainers)
│       ├── runFracsFixtures.mjs
│       └── runNoncalcFixtures.mjs
├── images/                 PNG diagrams + training-notes PDFs
└── MathsHelp/
    └── userhelp.html       End-user help text
```

## Architecture

```
index.html
    │
    ├── app.js  ──imports──► registry.js ──imports──► generators/*.js
    │                │                                      │
    │                └────────── utils.js ◄─────────────────┘
    │
    └── MathJax (CDN) for equation rendering
```

1. **`app.js`** wires buttons, calls `registry.get(topic).generate()`, renders question/solution/canvas, handles test mode and SolnWin.
2. **`registry.js`** maps short keys (`fracs`, `trig`, …) to generator modules.
3. **Generators** only know about building one question; they import helpers from `utils.js`.
4. **`utils.js`** exports pure helpers and an `images` map; no `window.*` pollution for maths helpers.

Display names on buttons are mapped to registry keys in `app.js` (`topicMap`).

---

## Generator interface

Every generator is an ES module that exports:

```js
export function generate(options = {}) {
  return {
    question: string,      // HTML + optional \( \) / $$ $$ MathJax
    solution: string,      // HTML + MathJax worked solution
    notesLink: string,     // e.g. 'images/SomeBook.pdf#page=12'
    canvas?: {             // optional diagram
      width: number,
      height: number,
      withSolution: boolean,  // true → draw on solution reveal / overlay
      draw: (ctx) => void,
      questionDraw?: (ctx) => void   // optional separate question diagram
    },
    meta?: object          // only when options.fixture is set (see Fixture tests)
  };
}
```

Production UI always calls `generate()` with no arguments. Maintainers may pass `{ fixture: 'name' }` where a generator defines `FIXTURES` (see [Fixture tests](#fixture-tests-maintainers)).

### Conventions

- Use **named imports** from `utils.js` (only what you need).
- Keep repeat-limiting state in a module-level `recentIds` array and `QLimitRepeats(recentIds, n)`.
- Prefer `images[name]` for PNGs (after `loadImages()`), not `window[name]`.
- Known values in solutions: put each on its own line (e.g. `\(u=…\)<br>`) so they stack vertically.
- Multi-part solutions (a/b/c or i/ii): each part should start on a new line (`<br>` or `\\` inside `aligned`).

## Topics

| Button label | Registry key | File | Notes |
|--------------|--------------|------|--------|
| Non-Calculator Maths | `noncalc` | `noncalc.js` | Mental arithmetic expressions |
| Fractions | `fracs` | `fracs.js` | Three mixed numbers, two operators |
| Percentages & Ratios | `percentratio` | `percentratio.js` | % and ratio problems |
| Indices | `indices` | `indices.js` | Powers and roots simplification |
| Number Form | `numform` | `numform.js` | Standard form etc. |
| HCF/LCM | `hcflcm` | `hcflcm.js` | HCF, LCM, factorise; prime-tree canvas |
| Algebra: Solve Equation | `solve1` | `solve1.js` | Linear equations in one unknown |
| Quadratics | `quadratics` | `quadratics.js` | Factorise / solve |
| Transposition I | `transposeI` | `transposeI.js` | Formula rearrangement (easier) |
| Transposition II | `transposeII` | `transposeII.js` | Harder transposition |
| Errors & Conversions | `conv` | `conv.js` | Unit / error style questions |
| RA Triangle Trigonometry | `trig` | `trig.js` | Right-angled triangle; canvas diagram |
| Proportionality | `prop` | `prop.js` | Direct / inverse proportion |
| Sin/Cos Graphs | `sincosgraph` | `sincosgraph.js` | Graph recognition; pre-drawn PNGs |
| Simultaneous Equations | `simultaneous` | `simultaneous.js` | Elimination / substitution + graph |
| Surface Area & Volume | `areavol` | `areavol.js` | Composite solids; dimensioned diagrams |

Each generator chooses a random sub-type (where applicable) and builds matching question and solution text.

---

## Shared utilities (`utils.js`)

| Export | Purpose |
|--------|---------|
| `rndgen(lo, hi, dp, step, fix)` | Random number in range; `fix === -1` → number, else string with fixed decimals |
| `dp(num, scale, fix)` | Round to `scale` decimal places |
| `thouSep(value, sep)` | Thousands separators (e.g. thin space in MathJax) |
| `countDecimals(value)` | Decimal digit count (used by `rndgen`) |
| `gcd2` / `gcd` / `lcm2` / `lcm` | Integer GCD/LCM helpers |
| `chkpwr(ltr, pwr)` | Format letter powers for algebra display |
| `cfchk(num, ltr, not1, notplus)` | Coefficient formatting (`+2x`, `-x`, …) |
| `op(sign)` | `+` / `-` from a boolean |
| `QLimitRepeats(arr, x)` | Random id in `1…x` avoiding recent repeats |
| `eqnformat(id)` | Queue MathJax typeset for element `id` |
| `images` | Map of preloaded `Image` objects by basename |
| `loadImages()` | Preload diagram PNGs into `images` |

Call `utils.loadImages()` once on startup (already done in `app.js`).

---

## Test Designer

1. Open **Test Designer** from the main page (`testCreate.html`).
2. Click topics on the left to add them to **Test order**.
3. Drag items to reorder; click an item to remove it.
4. **Create Test** opens `index.html?test=1` with the chosen sequence.

In test mode:

- Each question has **Change question** (regenerate that slot only; hidden when printing).
- **Show/Hide solution** can reveal all solutions.
- Solutions are collected in a **Solutions** section for print (see below).

---

## Teacher solution window

1. Focus the main app window.
2. Type the secret sequence: **`chpz`** (no input field — key sequence).
3. `SolnWin.html` opens and tracks the **current** question’s solution (and diagram when present) as soon as a new question is generated — students only see the answer when they use Show/Hide Solution.

Close the window or refresh to dismiss. The sequence listener is registered in `app.js` (`initSecretCode`).

---

## Print layout

`css/main.css` `@media print`:

- Hides topic buttons, Test Designer, help, colour select, solution button, notes link, footer, and `.no-print`.
- Avoids breaking inside a question or solution block where possible.
- `.solutions-section` starts on a **new page**.
- Canvas diagrams scale to page width.

Use the browser Print dialog (or “Save as PDF”) from test mode for a paper test + answer pack.

---

## Fixture tests (maintainers)

Some generators support **deterministic fixtures**: fixed inputs that exercise particular branches without `rndgen`. This is for regression checks only — students still get random questions.

### Pattern

```js
export const FIXTURES = {
  'case-1': { /* fixed inputs */ },
};

export function generate(options = {}) {
  const fx = typeof options.fixture === 'string'
    ? FIXTURES[options.fixture]
    : options.fixture || null;
  // if fx: use fixed values; else existing random path
  // …
  const result = { question, solution, notesLink };
  if (fx) {
    result.meta = { /* caseId, numbers, final, … */ };
  }
  return result;
}
```

- **`generate()`** — production (random).
- **`generate({ fixture: 'name' })`** — one named scenario; no random (and retry loops that would hang on bad fixtures are skipped via `!fx` guards where needed).
- **`meta`** — plain data for assertions (not shown in the student UI).

Currently instrumented:

| Generator | Fixtures | Node runner |
|-----------|----------|-------------|
| `fracs.js` | Operator-path sets (`add-add`, `mul-mul`, …) | `js/test/runFracsFixtures.mjs` |
| `noncalc.js` | One set per case (`case-1` … `case-5`) | `js/test/runNoncalcFixtures.mjs` |

### Running the Node runners

Requires [Node.js](https://nodejs.org). From the **Maths Revision** folder (not inside the browser):

```bash
node js/test/runFracsFixtures.mjs
node js/test/runNoncalcFixtures.mjs
```

Each runner imports the generator, calls every fixture, and checks `meta` and/or substrings in `solution` (e.g. a final `\mathbf{…}` value). Exit code `0` = all passed; non-zero = failures listed in the terminal.

To see the exact solution string when writing new `solutionIncludes` checks, temporarily expose the module in `app.js` (`window.fracs = fracs`), hard-refresh, then in the browser console:

```js
const r = fracs.generate({ fixture: 'add-add' });
console.log(JSON.stringify(r.solution));
```

Remove the `window.*` line afterwards.

### Adding fixtures to another generator

1. Export `FIXTURES` and accept `options` in `generate()`.
2. When `fx` is set, force case id / numbers; keep the random path for normal use.
3. Attach `meta` only when `fx` is set.
4. Add `js/test/runYourTopicFixtures.mjs` mirroring the fracs/noncalc runners.
5. Document the fixture names in [GENERATORS.md](GENERATORS.md).

---

## Adding or changing a topic

1. **Create** `js/generators/mytopic.js` with `export function generate()` returning the standard object.
2. **Register** in `js/registry.js`:
   ```js
   import * as mytopic from './generators/mytopic.js';
   // …
   export const registry = {
     // …
     mytopic,
   };
   ```
3. **Wire the UI** in `index.html` (button with `data-topic="…"` matching the **display name** used in `topicMap`) and add the display name → key entry in `app.js` `topicMap`.
4. **Test Designer**: add the same label in `testCreate.html` if the topic should appear there.
5. If you need new PNGs, add them under `images/` and list them in `utils.js` `imageSources`.

---

## Coding conventions

- **ES modules only** — no concatenated scripts; serve over HTTP.
- **No `window` helpers** for maths functions; import from `utils.js`.
- **Generator purity**: avoid depending on DOM except when intentionally drawing to a canvas context passed by `app.js`.
- **MathJax**: use `\(...\)` inline and `$$...$$` or `$$\begin{aligned}...\end{aligned}$$` for display; call `utils.eqnformat('q'|'a')` after injecting HTML (`app.js` already does this).
- **Repeat limits**: keep student experience varied with `QLimitRepeats`.
- Prefer clarity over micro-optimisation; match existing solution *style* (step order, rounding notes) when editing pedagogy.

---

## Troubleshooting

| Symptom | Likely cause | What to try |
|--------|----------------|-------------|
| Blank page / module errors | Opened as `file://` | Use `npx serve` or similar |
| `X is not a function` | Missing import or typo in generator | Check named imports from `utils.js` |
| `Identifier already declared` | Import name clashes with local `let`/`const` | Rename local (e.g. `lcm` array → `lcmArr`) |
| Diagram missing | Image not preloaded or wrong key | Check `imageSources` and `images[name]` |
| MathJax not rendering | Typeset not queued | Ensure `eqnformat` runs after HTML insert |
| Solution values on one line | Inline `\(...\)` without breaks | Add `<br>` after each known-value line |
| Test won’t create | JS error in `app.js` test path | Check browser console; verify registry keys |
| Fixture runner fails | Wrong cwd or missing Node | Run from Maths Revision root; `node -v`; check `FIXTURES` names |
| Fixture hangs | Retry `while` without `!fx` guard | Skip validation/size loops when `fx` is set |

---

## Related projects

- **Science Revision** — same app shell (registry, test designer, SolnWin, print).
- **Radar Revision** — same shell; radar-theory generators and diagrams.

Keeping the three packages structurally consistent makes handover and cross-app fixes easier.

---

*Documentation matches the modular ES refactor of the Maths Revision app. For classroom use, distribute the folder and run it from a local static server.*
