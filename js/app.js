// js/app.js
import { registry } from './registry.js';
import * as utils from './utils.js';

// Display name → registry key
const topicMap = {
  "Non-Calculator Maths": "noncalc",
  "Fractions": "fracs",
  "Percentages & Ratios": "percentratio",
  "Indices": "indices",
  "Number Form": "numform",
  "HCF/LCM": "hcflcm",
  "Algebra: Solve Equation": "solve1",
  "Quadratics": "quadratics",
  "Transposition I": "transposeI",
  "Transposition II": "transposeII",
  "Errors & Conversions": "conv",
  "RA Triangle Trigonometry": "trig",
  "Proportionality": "prop",
  "Sin/Cos Graphs": "sincosgraph",
  "Simultaneous Equations": "simultaneous",
  "Surface Area & Volume": "areavol"
};

let currentSumData = null;
let views = 0;
let SolnWin = null;

// document.addEventListener('DOMContentLoaded', () => {
//   // your code for attaching listeners
//   document.querySelectorAll('.topic-btn').forEach(btn => {
//     btn.addEventListener('click', () => generateQuestion(btn.dataset.topic));
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  utils.loadImages();
  initSecretCode();

  // Normal single-question mode
  document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => generateQuestion(btn.dataset.topic));
  });

  // in DOMContentLoaded, only when not in test mode
  if (!new URLSearchParams(window.location.search).get('test')) {
    document.getElementById('q').innerHTML =
      "Click a button to select the type of sum. " +
      "Each click will generate a new sum.<br>" +
      "Clicking 'solution' will reveal a step-by-step solution.";
  }

  const solnBtn = document.getElementById('btnSoln');
  if (solnBtn) {
    solnBtn.addEventListener('click', toggleSolution);
  }

  // ----- Test mode -----
  const params = new URLSearchParams(window.location.search);
  if (params.get('test') === '1') {
    runTestMode();
  }

  const colourSelect = document.getElementById('colourSelect');
  if (colourSelect) {
    colourSelect.addEventListener('change', () => {
      document.querySelector(':root')
        .style.setProperty('--bgcolour', colourSelect.value);
    });
  }
});


function updateSolnWin() {
  // Push current solution into the teacher solution window, if open
  if (!SolnWin || SolnWin.closed || !currentSumData) return;
  try {
    const a2 = SolnWin.document.getElementById('a2');
    const c3 = SolnWin.document.getElementById('myCanvas3');
    if (!a2) return;

    a2.innerHTML = currentSumData.solution || '';

    if (c3) {
      if (currentSumData.canvas) {
        const w = currentSumData.canvas.width || 400;
        const h = currentSumData.canvas.height || 400;
        c3.width = w;
        c3.height = h;
        const ctx3 = c3.getContext('2d');
        ctx3.clearRect(0, 0, w, h);
        if (typeof currentSumData.canvas.draw === 'function') {
          currentSumData.canvas.draw(ctx3);
        }
      } else {
        c3.width = 0.5;
        c3.height = 0.5;
      }
    }

    if (SolnWin.MathJax && SolnWin.MathJax.Hub) {
      SolnWin.MathJax.Hub.Queue(['Typeset', SolnWin.MathJax.Hub, 'a2']);
    }
  } catch (err) {
    console.warn('Could not update SolnWin:', err);
  }
}

function generateQuestion(topic) {
  currentSumData = registry.get(topic).generate();

  document.getElementById('q').innerHTML = currentSumData.question;
  document.getElementById('a').innerHTML = '';
  document.getElementById('noteslink').href = currentSumData.notesLink;
  document.getElementById('noteslink').style.visibility = 'visible';

  const canvas = document.getElementById('myCanvas');

  if (currentSumData.canvas && !currentSumData.canvas.withSolution) {
    // Draw immediately (question canvas)
    canvas.height = currentSumData.canvas.height;
    canvas.width = currentSumData.canvas.width;
    const ctx = canvas.getContext('2d');
    currentSumData.canvas.draw(ctx);
  } else {
    // Clear canvas (will be drawn later if needed)
    canvas.height = 0.5;
    canvas.width = 0.5;
  }

  utils.eqnformat('q');
  views = 0;
  updateViewCount();
  document.getElementById('btnSoln').style.visibility = 'visible';

  // Teacher solution window (opened with secret code chpz)
  updateSolnWin();
}

function toggleSolution() {
  const aDiv = document.getElementById('a');
  const canvas = document.getElementById('myCanvas');   // ← add this line

  if (aDiv.innerHTML === '') {
    // Show solution
    aDiv.innerHTML = currentSumData.solution;
    utils.eqnformat('a');
    views++;
    updateViewCount();

    // Draw canvas if it belongs to the solution
    if (currentSumData.canvas && currentSumData.canvas.withSolution) {
      canvas.height = currentSumData.canvas.height;
      canvas.width = currentSumData.canvas.width;
      const ctx = canvas.getContext('2d');
      currentSumData.canvas.draw(ctx);
    }
  } else {
    // Hide solution
    aDiv.innerHTML = '';
    if (currentSumData.canvas && currentSumData.canvas.withSolution) {
      canvas.height = 0.5;
      canvas.width = 0.5;
    }
  }
}

function updateViewCount() {
  document.getElementById('viewCount').textContent = views;
}

function initSecretCode() {
  const pressed = [];
  const secretCode = 'chpz';
  window.addEventListener('keyup', (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) {
      SolnWin = window.open('SolnWin.html', 'SolnWin', 'resizable=yes,scrollbars=yes');
      if (SolnWin) {
        SolnWin.addEventListener('load', () => updateSolnWin());
        setTimeout(() => updateSolnWin(), 500);
      }
    }
  });
}

function runTestMode() {
  // ----- Hide normal single-question UI -----
  document.querySelectorAll('.topic-btn').forEach(btn => btn.style.display = 'none');
  ['testdesign', 'userhelp', 'topicInstruction'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const colourSelect = document.getElementById('colourSelect');
  if (colourSelect) {
    colourSelect.style.display = 'none';
    const label = colourSelect.previousElementSibling;
    if (label) label.style.display = 'none';
  }
  const solnBtn = document.getElementById('btnSoln');
  if (solnBtn) solnBtn.style.visibility = 'hidden';
  const notes = document.getElementById('noteslink');
  if (notes) notes.style.visibility = 'hidden';
  const mainCanvas = document.getElementById('myCanvas');
  if (mainCanvas) {
    mainCanvas.height = 0.5;
    mainCanvas.width = 0.5;
  }

  // ----- Load test design -----
  const raw = sessionStorage.getItem('testArr');
  if (!raw) {
    document.getElementById('q').innerHTML =
      '<p class="text-danger">No test design found. Please use the Test Designer first.</p>';
    return;
  }

  let testOrder;
  try {
    testOrder = JSON.parse(raw);
  } catch (e) {
    document.getElementById('q').innerHTML =
      '<p class="text-danger">Invalid test data.</p>';
    return;
  }

  const qContainer = document.getElementById('q');
  const aContainer = document.getElementById('a');
  qContainer.innerHTML = '';
  aContainer.innerHTML = '';

  // ---------- QUESTIONS ----------
  const qHeading = document.createElement('h2');
  qHeading.textContent = 'Questions';
  qHeading.className = 'mb-4';
  qContainer.appendChild(qHeading);

  const solutionsData = [];

  testOrder.forEach((displayName, index) => {
    const key = topicMap[displayName];
    if (!key || !registry[key]) {
      console.warn('Unknown topic:', displayName);
      return;
    }

    const data = registry.get(key).generate();
    const qnum = index + 1;

    // Question block
    const qBlock = document.createElement('div');
    qBlock.className = 'test-question mb-4';
    qBlock.dataset.topicKey = key;
    qBlock.dataset.qnum = qnum;

    qBlock.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <h5 class="mb-2">Question ${qnum}</h5>
        <button class="btn btn-sm btn-outline-warning change-q no-print">
          Change question
        </button>
      </div>
      <div class="question-body">${data.question}</div>
    `;

    // Question canvas (if any)
    if (data.canvas && !data.canvas.withSolution) {
      const c = document.createElement('canvas');
      c.width = data.canvas.width || 400;
      c.height = data.canvas.height || 400;
      c.className = 'mb-2 d-block question-canvas';
      qBlock.appendChild(c);
      try {
        data.canvas.draw(c.getContext('2d'));
      } catch (err) {
        console.error('Question canvas draw failed:', err);
      }
    }

    qContainer.appendChild(qBlock);
    solutionsData.push({ qnum, data, qBlock });
  });

  // ---------- SOLUTIONS ----------
  const solSection = document.createElement('div');
  solSection.className = 'solutions-section mt-5';
  solSection.innerHTML = '<h2 class="mb-4">Solutions</h2>';

  solutionsData.forEach(({ qnum, data }) => {
    const sBlock = document.createElement('div');
    sBlock.className = 'test-solution-block mb-4';

    // Toggle button (screen only)
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'btn btn-sm btn-outline-secondary mb-2 toggle-soln no-print';
    toggleBtn.textContent = `Show/Hide Solution ${qnum}`;
    sBlock.appendChild(toggleBtn);

    const body = document.createElement('div');
    body.className = 'solution-body';
    body.style.display = 'none';

    // Visible heading for print (and when expanded on screen)
    const heading = document.createElement('h5');
    heading.className = 'solution-heading mb-2';
    heading.textContent = `Solution ${qnum}`;
    body.appendChild(heading);

    // Solution canvas
    if (data.canvas && data.canvas.withSolution) {
      const c = document.createElement('canvas');
      c.width = data.canvas.width || 400;
      c.height = data.canvas.height || 400;
      c.className = 'mb-3 d-block';
      body.appendChild(c);
      try {
        data.canvas.draw(c.getContext('2d'));
      } catch (err) {
        console.error('Solution canvas draw failed:', err);
      }
    }

    const solnDiv = document.createElement('div');
    solnDiv.innerHTML = data.solution;
    body.appendChild(solnDiv);

    sBlock.appendChild(body);
    solSection.appendChild(sBlock);

    toggleBtn.addEventListener('click', () => {
      body.style.display = body.style.display === 'none' ? 'block' : 'none';
    });
  });

  aContainer.appendChild(solSection);

  // ---------- Change-question handlers ----------
  solutionsData.forEach((item, idx) => {
    const { qBlock } = item;
    const changeBtn = qBlock.querySelector('.change-q');
    if (!changeBtn) return;

    changeBtn.addEventListener('click', () => {
      const key = qBlock.dataset.topicKey;
      const newData = registry.get(key).generate();

      // Update question text
      qBlock.querySelector('.question-body').innerHTML = newData.question;

      // Replace question canvas
      const oldQCanvas = qBlock.querySelector('.question-canvas');
      if (oldQCanvas) oldQCanvas.remove();

      if (newData.canvas && !newData.canvas.withSolution) {
        const c = document.createElement('canvas');
        c.width = newData.canvas.width || 400;
        c.height = newData.canvas.height || 400;
        c.className = 'mb-2 d-block question-canvas';
        qBlock.appendChild(c);
        newData.canvas.draw(c.getContext('2d'));
      }

      // Update matching solution block
      const solBlock = document.querySelectorAll('.test-solution-block')[idx];
      if (solBlock) {
        const solBody = solBlock.querySelector('.solution-body');
        solBody.innerHTML = '';

        if (newData.canvas && newData.canvas.withSolution) {
          const c = document.createElement('canvas');
          c.width = newData.canvas.width || 400;
          c.height = newData.canvas.height || 400;
          c.className = 'mb-3 d-block';
          solBody.appendChild(c);
          newData.canvas.draw(c.getContext('2d'));
        }

        const solnDiv = document.createElement('div');
        solnDiv.innerHTML = newData.solution;
        solBody.appendChild(solnDiv);
      }

      // Re-typeset
      if (utils.eqnformat) {
        utils.eqnformat('q');
        utils.eqnformat('a');
      } else if (window.MathJax) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
      }

      item.data = newData;
    });
  });

  // Final MathJax pass
  if (utils.eqnformat) {
    utils.eqnformat('q');
    utils.eqnformat('a');
  } else if (window.MathJax) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }
}