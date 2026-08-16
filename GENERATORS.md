# Maths Revision — Generator reference

Per-topic notes for maintainers. Each file lives under `js/generators/` and exports `generate()` as described in the main [README](README.md).

**Common return shape**

```js
{
  question: string,
  solution: string,
  notesLink: string,
  canvas?: { width, height, withSolution, draw, questionDraw? },
  meta?: object   // only when generate({ fixture }) is used
}
```

**Repeat limiting:** where listed, `QLimitRepeats(recentIds, n)` avoids immediate repeats of the same case id (pool size `n`).

**Fixture tests:** `fracs.js` and `noncalc.js` export `FIXTURES` and accept `generate({ fixture: 'name' })`. Node runners live under `js/test/` — see the main [README](README.md#fixture-tests-maintainers).

---

## noncalc.js — Non-Calculator Maths

| | |
|--|--|
| **Registry key** | `noncalc` |
| **Notes PDF** | Maths Book 1 Basic Numeracy (varies by case, ~p.7+) |
| **Cases** | 5 (`QLimitRepeats` 5) |
| **Canvas** | No |
| **Fixtures** | Yes — `FIXTURES` + `generate({ fixture })` |

**Behaviour:** Random expression to evaluate without a calculator (decimals, directed numbers, combinations of × ÷ + −). Solution shows ordered working. Uses `cfchk` / `dp` for tidy MathJax.

**Fixtures (maintainers):** Named sets force a case and fixed `a`…`e` (no `rndgen`).

| Fixture name | Case | Intent |
|--------------|------|--------|
| `case-1` | 1 | `a × (b + c) / d` |
| `case-2` | 2 | `(a + b) / c × d` |
| `case-3` | 3 | `a / (b + c) × d` |
| `case-4` | 4 | `a + b(c + d) / e` |
| `case-5` | 5 | `a / b + c(d + e)` |

```bash
node js/test/runNoncalcFixtures.mjs
```

`meta` on fixture runs: `{ fixture, caseId, a, b, c, d, e }`. Runner asserts final values via `solutionIncludes` (e.g. `\mathbf{4}`).

---

## fracs.js — Fractions

| | |
|--|--|
| **Registry key** | `fracs` |
| **Notes PDF** | Book 1 Basic Numeracy `#page=22` |
| **Cases** | Continuous random (no numbered switch); operators constrained |
| **Canvas** | No |
| **Fixtures** | Yes — `FIXTURES` + `generate({ fixture })` |

**Behaviour:** Three **mixed numbers**, two operators.

- Operators: `+ − × ÷` (`OP` codes 1–4).
- If the first operator is × or ÷, the second is also × or ÷.
- Fractions in lowest terms; improper values of the three mixed numbers are not equal; adjacent +/− pairs avoid equal denominators.
- Outer retry if intermediate answer parts exceed 75 in absolute value, or if a mixed ± with ×/÷ would use a trivial common denominator.
- When a **fixture** is active, validation/size retry loops are skipped (`!fx` guards) so bad fixture data cannot hang.

**Solution paths**

1. Both ± — common denominator expansion, then simplify.
2. Both ×/÷ — improper fractions, ÷ → × reciprocal, cancel, multiply, simplify.
3. ± then ×/÷ — multiply/divide the last pair first, then ± with the first mixed number.

**Internal structure (refactored):** `OP` / `OP_TEX` constants; `randomMixed`, `fractionsValid`, `cancelSelf` / `cancelAcross` / `cancelInPlace`, `flipForDivide`, `formatMixedTex`, `finalSimplify` (optional intermediate tidy steps). Outer retry limits and solution wording match the original training app.

**Fixtures (maintainers):** Fixed mixed numbers + operators for each solution path.

| Fixture name | Path exercised |
|--------------|----------------|
| `add-add` | Both + |
| `sub-sub-borrow` | Both − (tidy / borrow style intermediates) |
| `mul-mul` | Both × (cancel) |
| `div-mul` | ÷ then × (reciprocal) |
| `sub-then-mul` | − then × (mixed operators) |

```bash
node js/test/runFracsFixtures.mjs
```

`meta` on fixture runs: `{ fixture, f1, f2, f3, sign1, sign2, ans1, final }`. Runner can assert `meta.final` and/or `solutionIncludes` substrings.

---

## percentratio.js — Percentages & Ratios

| | |
|--|--|
| **Registry key** | `percentratio` |
| **Notes PDF** | Book 1 `#page=50` (per case may differ slightly) |
| **Cases** | 6 (`QLimitRepeats` 6) |
| **Canvas** | No |

**Behaviour:** Mix of percentage increase/decrease, “express as %”, reverse percentage, and ratio problems. Answers in simplest form where relevant (`gcd2`).

---

## indices.js — Indices

| | |
|--|--|
| **Registry key** | `indices` |
| **Notes PDF** | Book 3 Indices `#page=4` |
| **Cases** | 4 sub-types |
| **Canvas** | No |

**Behaviour:** Simplify expressions with integer/fractional indices and radicals. Solution emphasises step-by-step index laws. Uses `gcd2` where fractions under roots are simplified.

---

## numform.js — Number Form

| | |
|--|--|
| **Registry key** | `numform` |
| **Notes PDF** | Book 3 Indices `#page=10` |
| **Cases** | Random standard-form style prompts |
| **Canvas** | No |

**Behaviour:** Convert to/from standard form and related decimal placements; `dp` / `rndgen` for clean figures.

---

## hcflcm.js — HCF / LCM

| | |
|--|--|
| **Registry key** | `hcflcm` |
| **Notes PDF** | Book 4 HCF/LCM `#page=3` |
| **Cases** | Single template with random three-term algebraic product |
| **Canvas** | Yes — prime factor trees on solution |

**Behaviour:** Three algebraic terms; find HCF and LCM; factorise the expression using the HCF. Local array for LCM parts is named `lcmArr` so it does not clash with imported `lcm()`. Prime trees drawn in `draw` when the solution is shown (`withSolution: true`).

---

## solve1.js — Algebra: Solve Equation

| | |
|--|--|
| **Registry key** | `solve1` |
| **Notes PDF** | Book 5 Algebraic Ops `#page=24` |
| **Cases** | Several equation shapes (`type` 1–4) with random letters (`x`, `m`, `a`, `ω`) |
| **Canvas** | No |

**Behaviour:** Linear equations in one unknown; calculator allowed in the course sense but solution shows full algebraic steps. Uses `cfchk` / `op` for signed terms.

---

## quadratics.js — Quadratics

| | |
|--|--|
| **Registry key** | `quadratics` |
| **Notes PDF** | Book 5 `#page=15` |
| **Cases** | Factorisable monic/simple quadratics |
| **Canvas** | No |

**Behaviour:** Factorise and state roots. Solution shows factor pairs and null-factor conclusion.

---

## transposeI.js — Transposition I

| | |
|--|--|
| **Registry key** | `transposeI` |
| **Notes PDF** | Book 5 `#page=29` |
| **Cases** | 33 formula templates (`QLimitRepeats` 33) |
| **Canvas** | No |

**Behaviour:** Make a stated variable the subject; easier set matching the notes. Mostly fixed algebraic patterns with light randomisation where present.

---

## transposeII.js — Transposition II

| | |
|--|--|
| **Registry key** | `transposeII` |
| **Notes PDF** | Book 5 `#page=33` |
| **Cases** | 20 templates (`QLimitRepeats` 20) |
| **Canvas** | No |

**Behaviour:** Harder rearrangements (more nested operations / roots / products) aligned with the second level in the notes.

---

## conv.js — Errors & Conversions

| | |
|--|--|
| **Registry key** | `conv` |
| **Notes PDF** | Book 6 Errors & Conversions `#page=3` |
| **Cases** | 7 (`QLimitRepeats` 7) |
| **Canvas** | No |

**Behaviour:** Unit conversions, tolerance/error style numerical questions; `thouSep` for large figures.

---

## trig.js — RA Triangle Trigonometry

| | |
|--|--|
| **Registry key** | `trig` |
| **Notes PDF** | Book 8 Trig `#page=3` |
| **Cases** | 6 (which sides/angle are given vs find) |
| **Canvas** | Yes — labelled right triangle |

**Behaviour:** Right-angled triangle; two quantities given, others required. Solution prefers using **given** data rather than cascading calculated values. `draw` renders the triangle and labels; dimensions come from the random case.

---

## prop.js — Proportionality

| | |
|--|--|
| **Registry key** | `prop` |
| **Notes PDF** | Book 08 Proportion `#page=4` |
| **Cases** | 12 (`QLimitRepeats` 12) |
| **Canvas** | No |

**Behaviour:** Direct and inverse proportion (including square laws). Typical pattern: (a) find `k`, (b) use `k` for a second value. Solutions use `$$\begin{aligned} a.\\ … \\ b.\\ …\end{aligned}$$` so parts stack correctly.

---

## sincosgraph.js — Sin/Cos Graphs

| | |
|--|--|
| **Registry key** | `sincosgraph` |
| **Notes PDF** | Book 9 Sin/Cos Graphs `#page=3` |
| **Cases** | Up to 32 graph image variants (`QLimitRepeats` 32) |
| **Canvas** | Yes — pre-rendered PNG via `images[imgName]` |

**Behaviour:** Identify or interpret sine/cosine graphs (amplitude, phase, reflection). Diagrams are static assets listed in `utils.js` `imageSources` (`ysinx`, `y2cosx`, …).

---

## simultaneous.js — Simultaneous Equations

| | |
|--|--|
| **Registry key** | `simultaneous` |
| **Notes PDF** | Book 10 Graphs & Simultaneous Eq. `#page=20` |
| **Cases** | Elimination and substitution variants (including graphing) |
| **Canvas** | Yes — quadrant graph, grid, both lines, solution point; coordinate tables in HTML |

**Behaviour:**

- **Elimination** path: integer coefficients; algebraic elimination in the solution text.
- **Substitution** path: often \(y = ax + b\) forms.
- **Graph:** scale chosen so the intersection and two further points per line stay in range; heavy/light grid pattern; axis labels; tables under the graph colour-matched to each line.

Do not casually change scale/grid logic — it was tuned to match the original paper-style grids.

**Internal structure (refactored):**

| Area | Functions |
|------|-----------|
| Scale / coords | `scaleSet`, `coordTab`, `coordCalc`, `tablePointsOutside` |
| Drawing | `scaleDraw`, `getBoundaryPoints`, `drawSolutionLine`, `drawTableDots` |
| Problem pick | `generateEliminationProblem`, `generateSubstitutionProblem` |
| Algebra text | `eliminationAlgebra`, `substitutionAlgebra` |
| UI fragments | `pickLetters`, `coordTablesHtml` |

`METHOD.ELIMINATION` / `METHOD.SUBSTITUTION` select the path; `generate()` only orchestrates.

---

## areavol.js — Surface Area & Volume

| | |
|--|--|
| **Registry key** | `areavol` |
| **Notes PDF** | Book 12 Area & Volume `#page=3` |
| **Cases** | 6 shapes (`QLimitRepeats` 6) |
| **Canvas** | Yes — solid diagram with dimension labels |

**Shapes (typical):** cube+triangle prism style composites, tube-in-cube, two cylinders, triangular tube, rivet (hemisphere+shaft), dome+cone. Units m / cm / mm randomised where appropriate. Working to 2 d.p. intermediate, 1 d.p. final where specified. Images: `cubtri`, `cubtritube`, `twocyl`, `tritube`, `rivet`, `domecone`.

---

## Canvas checklist

| Topic | When drawn | Notes |
|-------|------------|--------|
| `hcflcm` | With solution | Prime trees |
| `trig` | With question (and solution context) | Triangle + labels |
| `sincosgraph` | With question | PNG from `images` |
| `simultaneous` | With solution (graph + tables in solution HTML) | Custom grid/lines |
| `areavol` | With question | PNG + overlaid dimensions |

`app.js` sizes `#myCanvas` / `#myCanvas2` from the returned `canvas` object and calls `draw` / `questionDraw` as appropriate.

---

## Editing tips

1. **Preserve pedagogy** — step order and rounding notes match the course books; change maths carefully.
2. **Test extremes** — after changing random ranges, click the topic many times and watch the console.
3. **MathJax** — prefer `aligned` for multi-step algebra; use `<br>` after standalone known-value `\(...\)` lines.
4. **Imports** — avoid naming locals `lcm`, `gcd`, etc. the same as imports (`lcmArr` pattern in `hcflcm.js`).
5. **Images** — new PNGs need an entry in `utils.js` `imageSources` and a matching file under `images/`.
6. **Fixtures** — when adding `FIXTURES`, guard retry `while` loops with `!fx` so fixed inputs cannot loop forever; document names in this file and add a runner under `js/test/`.

---

## File ↔ registry map

```
noncalc.js        → noncalc
fracs.js          → fracs
percentratio.js   → percentratio
indices.js        → indices
numform.js        → numform
hcflcm.js         → hcflcm
solve1.js         → solve1
quadratics.js     → quadratics
transposeI.js     → transposeI
transposeII.js    → transposeII
conv.js           → conv
trig.js           → trig
prop.js           → prop
sincosgraph.js    → sincosgraph
simultaneous.js   → simultaneous
areavol.js        → areavol
```

Display names for buttons and Test Designer are listed in the main README (`topicMap` in `app.js`).
