# Maths Revision App (refactored)

Modular ES6 rewrite of the Maths Revision Questions app for the RAF Aerospace Eng Tech course.

## Structure

```
index.html              Main UI
testCreate.html         Test Designer (drag-and-drop order)
SolnWin.html            Teacher solution window (secret code)
css/main.css            App + print styles
js/
  app.js                UI orchestration, single-question + test mode
  registry.js           Topic → generator registry
  utils.js              Shared helpers (rndgen, dp, MathJax, images)
  generators/
    noncalc.js
    fracs.js
    percentratio.js
    indices.js
    numform.js
    hcflcm.js
    solve1.js
    quadratics.js
    transposeI.js
    transposeII.js
    conv.js
    trig.js
    prop.js
    sincosgraph.js
    simultaneous.js
    areavol.js
images/                 Diagrams, training notes PDFs
MathsHelp/              User help
```

## Features

- ES modules with a central registry
- Consistent `generate()` return shape: `{ question, solution, notesLink, canvas? }`
- Test Designer with drag-reorder
- Multi-question test mode with Show/Hide solution, Change question, and print layout
- Background colour selector
- Training notes links per topic
- **Teacher solution window**: type `chpz` to open a separate window that shows the full solution (and diagram) as soon as each question is generated, without using the student Show/Hide Solution button

## Running

Serve the folder over HTTP (modules require a server, not `file://`):

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or the port you used).

## Notes

- Open the app via a local web server so ES module imports work.
- Print styles hide interactive controls and start the Solutions section on a new page.
