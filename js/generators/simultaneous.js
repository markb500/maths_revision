// js/generators/simultaneous.js
// Simultaneous equations: elimination or substitution + quadrant graph.
// Same constraints, scale/grid, coord tables, and algebraic steps as the
// tuned original — organised for readability.
import { rndgen, dp, gcd2, cfchk } from '../utils.js';

const NOTES = 'images/20200505-MathsBook10GraphsSimEquv1_5-APO.pdf#page=20';
const METHOD = { ELIMINATION: 1, SUBSTITUTION: 2 };
const COLOUR = { LINE1: '#0000ff', LINE2: '#00aa00' };

// ---------------------------------------------------------------------------
// Scale & coordinates (graph area is 6 major steps each axis from origin)
// ---------------------------------------------------------------------------

/** Step size on each axis from solution magnitude; quadrant signs from (x, y). */
function scaleSet(x, y) {
  const xptve = x > 0;
  const yptve = y > 0;

  function stepFor(abs) {
    if (abs < 4) return 1;
    if (abs < 9) return 2;
    if (abs < 21) return 5;
    if (abs < 41) return 10;
    return 20;
  }

  return {
    xptve,
    yptve,
    x: stepFor(Math.abs(x)),
    y: stepFor(Math.abs(y))
  };
}

/**
 * Three table x-values around the solution, and matching y on each line.
 * sumType 1 = standard form ax + by = c; 2 = y = ax + b (ycf treated as -1).
 */
function coordTab(x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, xscale, xpositive, sumType) {
  let xtab11, xtab12, xtab13, xtab21, xtab22, xtab23;

  if (xpositive) {
    xtab11 = x - xscale;
    xtab12 = x;
    xtab13 = x + xscale;
    xtab21 = x - xscale;
    xtab22 = x;
    xtab23 = x + xscale;
  } else {
    xtab11 = x + xscale;
    xtab12 = x;
    xtab13 = x - xscale;
    xtab21 = x + xscale;
    xtab22 = x;
    xtab23 = x - xscale;
  }

  let ytab11, ytab12, ytab13, ytab21, ytab22, ytab23;

  if (sumType === METHOD.ELIMINATION) {
    ytab11 = dp((c1 - xcf1 * xtab11) / ycf1, 1, -1);
    ytab12 = y;
    ytab13 = dp((c1 - xcf1 * xtab13) / ycf1, 1, -1);
    ytab21 = dp((c2 - xcf2 * xtab21) / ycf2, 1, -1);
    ytab22 = y;
    ytab23 = dp((c2 - xcf2 * xtab23) / ycf2, 1, -1);
  } else {
    ytab11 = dp(xcf1 * xtab11 + c1, 1, -1);
    ytab12 = y;
    ytab13 = dp(xcf1 * xtab13 + c1, 1, -1);
    ytab21 = dp(xcf2 * xtab21 + c2, 1, -1);
    ytab22 = y;
    ytab23 = dp(xcf2 * xtab23 + c2, 1, -1);
  }

  return {
    x11: xtab11, x12: xtab12, x13: xtab13,
    y11: ytab11, y12: ytab12, y13: ytab13,
    x21: xtab21, x22: xtab22, x23: xtab23,
    y21: ytab21, y22: ytab22, y23: ytab23
  };
}

/** Map graph (math) coords → canvas pixels for the active quadrant. */
function coordCalc(x, y, xscale, yscale, xpositive, ypositive) {
  let xcoord, ycoord;
  if (xpositive && ypositive) {
    xcoord = 50 * (x / xscale + 1);
    ycoord = 400 - 50 * (y / yscale + 1);
  } else if (xpositive && !ypositive) {
    xcoord = 50 * (x / xscale + 1);
    ycoord = 50 * (y / -yscale + 1);
  } else if (!xpositive && ypositive) {
    xcoord = 400 - 50 * (x / -xscale + 1);
    ycoord = 400 - 50 * (y / yscale + 1);
  } else {
    xcoord = 400 - 50 * (x / -xscale + 1);
    ycoord = 50 * (y / -yscale + 1);
  }
  return { x: xcoord, y: ycoord };
}

function tablePointsOutside(tab, scale) {
  const limitX = 6 * scale.x;
  const limitY = 6 * scale.y;
  return (
    Math.abs(tab.x11) > limitX || Math.abs(tab.y11) > limitY ||
    Math.abs(tab.x13) > limitX || Math.abs(tab.y13) > limitY ||
    Math.abs(tab.x21) > limitX || Math.abs(tab.y21) > limitY ||
    Math.abs(tab.x23) > limitX || Math.abs(tab.y23) > limitY
  );
}

// ---------------------------------------------------------------------------
// Axes, labels, heavy + light grid (5 majors, 4 lights between each)
// ---------------------------------------------------------------------------

function scaleDraw(ctx, xpositive, ypositive, xscale, yscale, ltr1txt, ltr2txt, solX, solY) {
  ctx.font = '15px Comic Sans MS';
  ctx.lineWidth = 3;
  ctx.beginPath();

  let xposn, yposn, xoffset, yoffset, ytxtalign, xscaleposn, yscaleposn, xfigs, yfigs;

  if (xpositive && ypositive) {
    xposn = 350; yposn = 50; xoffset = 10; yoffset = -10;
    ytxtalign = 'right';
    xscaleposn = [100, 150, 200, 250, 300, 350];
    yscaleposn = [300, 250, 200, 150, 100, 50];
    xfigs = [1, 2, 3, 4, 5].map((i) => i * xscale);
    yfigs = [1, 2, 3, 4, 5].map((i) => i * yscale);
    ctx.moveTo(40, xposn); ctx.lineTo(350, xposn);
    ctx.moveTo(yposn, 360); ctx.lineTo(yposn, 50);
  } else if (!xpositive && ypositive) {
    xposn = 350; yposn = 350; xoffset = 10; yoffset = 10;
    ytxtalign = 'left';
    xscaleposn = [300, 250, 200, 150, 100, 50];
    yscaleposn = [300, 250, 200, 150, 100, 50];
    xfigs = [1, 2, 3, 4, 5].map((i) => i * -xscale);
    yfigs = [1, 2, 3, 4, 5].map((i) => i * yscale);
    ctx.moveTo(50, xposn); ctx.lineTo(360, xposn);
    ctx.moveTo(yposn, 360); ctx.lineTo(yposn, 50);
  } else if (xpositive && !ypositive) {
    xposn = 50; yposn = 50; xoffset = -10; yoffset = -10;
    ytxtalign = 'right';
    xscaleposn = [100, 150, 200, 250, 300, 350];
    yscaleposn = [100, 150, 200, 250, 300, 350];
    xfigs = [1, 2, 3, 4, 5].map((i) => i * xscale);
    yfigs = [1, 2, 3, 4, 5].map((i) => i * -yscale);
    ctx.moveTo(40, xposn); ctx.lineTo(350, xposn);
    ctx.moveTo(yposn, 350); ctx.lineTo(yposn, 40);
  } else {
    xposn = 50; yposn = 350; xoffset = -10; yoffset = 10;
    ytxtalign = 'left';
    xscaleposn = [300, 250, 200, 150, 100, 50];
    yscaleposn = [100, 150, 200, 250, 300, 350];
    xfigs = [1, 2, 3, 4, 5].map((i) => i * -xscale);
    yfigs = [1, 2, 3, 4, 5].map((i) => i * -yscale);
    ctx.moveTo(50, xposn); ctx.lineTo(360, xposn);
    ctx.moveTo(yposn, 350); ctx.lineTo(yposn, 40);
  }

  for (let i = 0; i < 5; i++) {
    ctx.moveTo(xscaleposn[i], xposn);
    ctx.lineTo(xscaleposn[i], xposn + xoffset);
    ctx.textAlign = 'center';
    ctx.fillText(xfigs[i], xscaleposn[i], xposn + 3 * xoffset);

    ctx.moveTo(yposn, yscaleposn[i]);
    ctx.lineTo(yposn + yoffset, yscaleposn[i]);
    ctx.textAlign = ytxtalign;
    ctx.fillText(yfigs[i], yposn + 1.5 * yoffset, yscaleposn[i] + 5);
  }
  ctx.fillText('0', yposn + 1.5 * yoffset, xposn + 3 * xoffset);

  ctx.font = '30px Comic Sans MS';
  ctx.fillText(ltr1txt, xscaleposn[5], xposn + 3 * xoffset);
  ctx.fillText(ltr2txt, yposn + 1.5 * yoffset, yscaleposn[5]);

  ctx.font = '20px Comic Sans MS';
  ctx.fillText(`Solution: (${solX}, ${solY})`, xscaleposn[3], yscaleposn[5]);
  ctx.stroke();

  // Heavy grid
  ctx.lineWidth = 0.6;
  ctx.strokeStyle = '#555555';
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(xscaleposn[i], xposn);
    ctx.lineTo(xscaleposn[i], yscaleposn[5]);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(yposn, yscaleposn[i]);
    ctx.lineTo(xscaleposn[5], yscaleposn[i]);
    ctx.stroke();
  }

  // Light grid: 4 lines between successive major lines (incl. origin)
  ctx.lineWidth = 0.3;
  ctx.strokeStyle = '#888888';
  const lightStep = 10;
  const majorX = [yposn, ...xscaleposn];
  const majorY = [xposn, ...yscaleposn];

  for (let i = 0; i < majorX.length - 1; i++) {
    const x1 = majorX[i];
    const x2 = majorX[i + 1];
    const dir = x2 > x1 ? 1 : -1;
    for (let j = 1; j <= 4; j++) {
      const xv = x1 + dir * lightStep * j;
      ctx.beginPath();
      ctx.moveTo(xv, xposn);
      ctx.lineTo(xv, yscaleposn[5]);
      ctx.stroke();
    }
  }

  for (let i = 0; i < majorY.length - 1; i++) {
    const y1 = majorY[i];
    const y2 = majorY[i + 1];
    const dir = y2 > y1 ? 1 : -1;
    for (let j = 1; j <= 4; j++) {
      const yv = y1 + dir * lightStep * j;
      ctx.beginPath();
      ctx.moveTo(yposn, yv);
      ctx.lineTo(xscaleposn[5], yv);
      ctx.stroke();
    }
  }
}

/**
 * Intersections of ax + by = c with the graph rectangle edges (in the
 * active quadrant only). Used to draw lines edge-to-edge.
 */
function getBoundaryPoints(xcf, ycf, c, scale) {
  const limitX = 6 * scale.x;
  const limitY = 6 * scale.y;
  const pts = [];

  function inQuadrant(xx, yy) {
    const xOk = scale.xptve ? xx >= 0 : xx <= 0;
    const yOk = scale.yptve ? yy >= 0 : yy <= 0;
    return xOk && yOk && Math.abs(xx) <= limitX + 0.001 && Math.abs(yy) <= limitY + 0.001;
  }

  [-limitX, limitX].forEach((xx) => {
    const yy = (c - xcf * xx) / ycf;
    if (inQuadrant(xx, yy)) pts.push({ x: xx, y: yy });
  });

  [-limitY, limitY].forEach((yy) => {
    const xx = (c - ycf * yy) / xcf;
    if (inQuadrant(xx, yy)) pts.push({ x: xx, y: yy });
  });

  if (inQuadrant(0, c / ycf)) pts.push({ x: 0, y: c / ycf });
  if (inQuadrant(c / xcf, 0)) pts.push({ x: c / xcf, y: 0 });

  const unique = [];
  pts.forEach((p) => {
    if (!unique.some((u) => Math.abs(u.x - p.x) < 0.01 && Math.abs(u.y - p.y) < 0.01)) {
      unique.push(p);
    }
  });

  return unique.length >= 2 ? unique.slice(0, 2) : unique;
}

function drawSolutionLine(ctx, edge, scale, colour) {
  if (edge.length < 2) return;
  const p1 = coordCalc(edge[0].x, edge[0].y, scale.x, scale.y, scale.xptve, scale.yptve);
  const p2 = coordCalc(edge[1].x, edge[1].y, scale.x, scale.y, scale.xptve, scale.yptve);
  ctx.strokeStyle = colour;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function drawTableDots(ctx, xs, ys, scale, colour) {
  ctx.fillStyle = colour;
  xs.forEach((xx, i) => {
    const p = coordCalc(xx, ys[i], scale.x, scale.y, scale.xptve, scale.yptve);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
    ctx.fill();
  });
}

// ---------------------------------------------------------------------------
// UI fragments
// ---------------------------------------------------------------------------

function pickLetters() {
  switch (rndgen(1, 4, 0, 1, -1)) {
    case 1: return { ltr1: 'x', ltr2: 'y', ltr1txt: 'x', ltr2txt: 'y' };
    case 2: return { ltr1: 's', ltr2: 't', ltr1txt: 's', ltr2txt: 't' };
    case 3: return { ltr1: 'a', ltr2: 'b', ltr1txt: 'a', ltr2txt: 'b' };
    default: return { ltr1: '\\omega', ltr2: '\\varepsilon', ltr1txt: 'ω', ltr2txt: 'ε' };
  }
}

function coordTablesHtml(tab, title1, title2, ltr1txt, ltr2txt) {
  return `<div class="row" style="margin-bottom:15px;">
              <table style="display:inline-block; margin-right:40px; border-collapse:collapse;">
                <tr><td colspan="4" style="color:${COLOUR.LINE1}; font-weight:bold;">
                  ${title1}
                </td></tr>
                <tr><td>${ltr1txt}</td><td>${tab.x11}</td><td>${tab.x12}</td><td>${tab.x13}</td></tr>
                <tr><th>${ltr2txt}</th><td>${tab.y11}</td><td>${tab.y12}</td><td>${tab.y13}</td></tr>
              </table>
              <table style="display:inline-block; border-collapse:collapse;">
                <tr><td colspan="4" style="color:${COLOUR.LINE2}; font-weight:bold;">
                  ${title2}
                </td></tr>
                <tr><td>${ltr1txt}</td><td>${tab.x21}</td><td>${tab.x22}</td><td>${tab.x23}</td></tr>
                <tr><th>${ltr2txt}</th><td>${tab.y21}</td><td>${tab.y22}</td><td>${tab.y23}</td></tr>
              </table>
            </div>`;
}

// ---------------------------------------------------------------------------
// Algebraic solutions (text matches original training steps)
// ---------------------------------------------------------------------------

function eliminationAlgebra(x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, ltr1, ltr2) {
  let suma = '';
  const eliminateX =
    Math.abs(xcf1) * Math.abs(xcf2) <= Math.abs(ycf1) * Math.abs(ycf2);

  if (eliminateX) {
    const h = gcd2(Math.abs(xcf1), Math.abs(xcf2));
    const m1 = Math.abs(xcf2) / h;
    const m2 = Math.abs(xcf1) / h;

    suma += `$$\\begin{alignat}{2}
                ${cfchk(xcf1 * m1, ltr1, 1, 1)}${cfchk(ycf1 * m1, ltr2, 1, 0)}&=${c1 * m1}
                  &&\\quad\\text{eqn 1}\\times ${m1}\\\\[5pt]
                ${cfchk(xcf2 * m2, ltr1, 1, 1)}${cfchk(ycf2 * m2, ltr2, 1, 0)}&=${c2 * m2}
                  &&\\quad\\text{eqn 2}\\times ${m2}\\\\[5pt]`;

    if ((xcf1 > 0 && xcf2 > 0) || (xcf1 < 0 && xcf2 < 0)) {
      const yCoeff = ycf1 * m1 - ycf2 * m2;
      const cDiff = c1 * m1 - c2 * m2;
      suma += `${cfchk(yCoeff, ltr2, 1, 1)}&=${cDiff}
                  &&\\quad\\text{eqn 1 - eqn 2}\\\\[5pt]`;
      if (Math.abs(yCoeff) !== 1) {
        suma += `${ltr2}&=\\dfrac{${cDiff}}{${yCoeff}}\\\\[5pt]`;
      }
      suma += `${ltr2}&=${y}\\\\[15pt]`;
    } else {
      const yCoeff = ycf1 * m1 + ycf2 * m2;
      const cSum = c1 * m1 + c2 * m2;
      suma += `${cfchk(yCoeff, ltr2, 1, 1)}&=${cSum}
                  &&\\quad\\text{eqn 1 + eqn 2}\\\\[5pt]`;
      if (Math.abs(yCoeff) !== 1) {
        suma += `${ltr2}&=\\dfrac{${cSum}}{${yCoeff}}\\\\[5pt]`;
      }
      suma += `${ltr2}&=${y}\\\\[15pt]`;
    }

    suma += `${cfchk(xcf1, ltr1, 1, 1)}${cfchk(ycf1, '', 0, 0)}\\times${y}&=${c1}
                &&\\quad\\text{substitute ${ltr2} into eqn 1}\\\\[5pt]
              ${cfchk(xcf1, ltr1, 1, 1)}${cfchk(ycf1 * y, '', 0, 0)}&=${c1}\\\\[5pt]`;
    if (Math.abs(xcf1) === 1) {
      suma += `${ltr1}&=${x}\\end{alignat}$$`;
    } else {
      suma += `${ltr1}&=\\dfrac{${c1 - ycf1 * y}}{${xcf1}}\\\\[5pt]
                ${ltr1}&=${x}\\end{alignat}$$`;
    }
  } else {
    const h = gcd2(Math.abs(ycf1), Math.abs(ycf2));
    const m1 = Math.abs(ycf2) / h;
    const m2 = Math.abs(ycf1) / h;

    suma += `$$\\begin{alignat}{2}
                ${cfchk(xcf1 * m1, ltr1, 1, 1)}${cfchk(ycf1 * m1, ltr2, 1, 0)}&=${c1 * m1}
                  &&\\quad\\text{eqn 1}\\times ${m1}\\\\[5pt]
                ${cfchk(xcf2 * m2, ltr1, 1, 1)}${cfchk(ycf2 * m2, ltr2, 1, 0)}&=${c2 * m2}
                  &&\\quad\\text{eqn 2}\\times ${m2}\\\\[5pt]`;

    if ((ycf1 > 0 && ycf2 > 0) || (ycf1 < 0 && ycf2 < 0)) {
      const xCoeff = xcf1 * m1 - xcf2 * m2;
      const cDiff = c1 * m1 - c2 * m2;
      suma += `${cfchk(xCoeff, ltr1, 1, 1)}&=${cDiff}
                  &&\\quad\\text{eqn 1 - eqn 2}\\\\[5pt]`;
      if (Math.abs(xCoeff) !== 1) {
        suma += `${ltr1}&=\\dfrac{${cDiff}}{${xCoeff}}\\\\[5pt]`;
      }
      suma += `${ltr1}&=${x}\\\\[15pt]`;
    } else {
      const xCoeff = xcf1 * m1 + xcf2 * m2;
      const cSum = c1 * m1 + c2 * m2;
      suma += `${cfchk(xCoeff, ltr1, 1, 1)}&=${cSum}
                  &&\\quad\\text{eqn 1 + eqn 2}\\\\[5pt]`;
      if (Math.abs(xCoeff) !== 1) {
        suma += `${ltr1}&=\\dfrac{${cSum}}{${xCoeff}}\\\\[5pt]`;
      }
      suma += `${ltr1}&=${x}\\\\[15pt]`;
    }

    suma += `${cfchk(xcf1, '', 0, 0)}\\times${x}${cfchk(ycf1, ltr2, 1, 0)}&=${c1}
                &&\\quad\\text{substitute ${ltr1} into eqn 1}\\\\[5pt]
              ${xcf1 * x}${cfchk(ycf1, ltr2, 1, 0)}&=${c1}\\\\[5pt]`;
    if (Math.abs(ycf1) === 1) {
      suma += `${ltr2}&=${y}\\end{alignat}$$`;
    } else {
      suma += `${ltr2}&=\\dfrac{${c1 - xcf1 * x}}{${ycf1}}\\\\[5pt]
                ${ltr2}&=${y}\\end{alignat}$$`;
    }
  }

  return suma;
}

function substitutionAlgebra(x, y, xcf1, c1, xcf2, c2, ltr1, ltr2) {
  let suma = `$$\\begin{aligned}
              ${cfchk(xcf1, ltr1, 1, 1)}${cfchk(c1, '', 0, 0)}
              &=${cfchk(xcf2, ltr1, 1, 1)}${cfchk(c2, '', 0, 0)}\\\\[5pt]`;

  if (xcf1 - xcf2 !== 0) {
    suma += `${cfchk(xcf1 - xcf2, ltr1, 1, 1)}&=${c2 - c1}\\\\[5pt]`;
    if (Math.abs(xcf1 - xcf2) !== 1) {
      suma += `${ltr1}&=\\dfrac{${c2 - c1}}{${xcf1 - xcf2}}\\\\[5pt]`;
    }
    suma += `${ltr1}&=${x}\\\\[10pt]`;
  }

  suma += `${ltr2}&=${xcf1}\\times${x}${cfchk(c1, '', 0, 0)}\\\\[5pt]
            ${ltr2}&=${y}
            \\end{aligned}$$`;
  return suma;
}

// ---------------------------------------------------------------------------
// Random problem generation (constraints unchanged)
// ---------------------------------------------------------------------------

function generateEliminationProblem() {
  let x, y, xcf1, xcf2, ycf1, ycf2, c1, c2, scale, tab;
  let valid = false;

  do {
    do {
      do {
        y = rndgen(-6, 6, 0, 1, -1);
      } while (y === 0 || Math.abs(y) === 1);

      do { xcf1 = rndgen(-9, 9, 0, 1, -1); } while (xcf1 === 0);
      do { ycf1 = rndgen(-9, 9, 0, 1, -1); } while (ycf1 === 0);
      do { c1 = rndgen(-5, 25, 0, 1, -1); } while (c1 === 0);

      x = (c1 - ycf1 * y) / xcf1;
    } while (!Number.isInteger(x) || x === 0 || Math.abs(x) === 1);

    do {
      xcf2 = rndgen(-9, 9, 0, 1, -1);
    } while (xcf2 === 0 || Math.abs(xcf2) === Math.abs(xcf1));

    do {
      ycf2 = rndgen(-9, 9, 0, 1, -1);
    } while (ycf2 === 0 || Math.abs(ycf2) === Math.abs(ycf1));

    c2 = xcf2 * x + ycf2 * y;
    scale = scaleSet(x, y);

    const gradOk =
      Math.abs((scale.x * (xcf1 / ycf1)) / scale.y) < 2 &&
      Math.abs((scale.x * (xcf2 / ycf2)) / scale.y) < 2;

    tab = coordTab(x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, scale.x, scale.xptve, METHOD.ELIMINATION);
    valid = gradOk && !tablePointsOutside(tab, scale);
  } while (!valid);

  return { x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, scale, tab };
}

function generateSubstitutionProblem() {
  let x, y, xcf1, xcf2, c1, c2, scale, tab;
  let valid = false;

  do {
    do {
      xcf1 = rndgen(-9, 9, 0, 1, -1);
    } while (xcf1 === 0);

    do {
      x = rndgen(-9, 9, 0, 1, -1);
    } while (x === 0 || Math.abs(x) === 1);

    do {
      c1 = rndgen(-5, 25, 0, 1, -1);
    } while (c1 === 0);

    y = xcf1 * x + c1;

    do {
      xcf2 = rndgen(-9, 9, 0, 1, -1);
    } while (xcf2 === 0 || xcf2 === xcf1);

    c2 = y - xcf2 * x;

    if (
      !Number.isInteger(c2) || c2 < -5 || c2 > 25 || c2 === 0 ||
      y < -50 || y > 50 || y === 0 || Math.abs(y) === 1 ||
      Math.abs(xcf1 - xcf2) < 3
    ) {
      continue;
    }

    scale = scaleSet(x, y);
    tab = coordTab(x, y, xcf1, -1, c1, xcf2, -1, c2, scale.x, scale.xptve, METHOD.SUBSTITUTION);

    const gradOk =
      Math.abs((scale.x * xcf1) / scale.y) < 2.5 &&
      Math.abs((scale.x * xcf2) / scale.y) < 2.5;

    valid = !tablePointsOutside(tab, scale) && gradOk;
  } while (!valid);

  return {
    x,
    y,
    xcf1,
    ycf1: -1,
    c1,
    xcf2,
    ycf2: -1,
    c2,
    scale,
    tab
  };
}

// ---------------------------------------------------------------------------
// Public entry
// ---------------------------------------------------------------------------

export function generate() {
  const { ltr1, ltr2, ltr1txt, ltr2txt } = pickLetters();
  const method = rndgen(1, 2, 0, 1, -1);

  let problem;
  let sumq;
  let suma;

  if (method === METHOD.ELIMINATION) {
    problem = generateEliminationProblem();
    const { xcf1, ycf1, c1, xcf2, ycf2, c2, tab } = problem;

    sumq =
      'Solve the simultaneous equations, using graphical and algebraic methods.';
    sumq += `$$\\begin{alignat}{2}
              ${cfchk(xcf1, ltr1, 1, 1)}${cfchk(ycf1, ltr2, 1, 0)}&=${c1}\\qquad\\qquad &&eqn\\ 1\\\\[5pt]
              ${cfchk(xcf2, ltr1, 1, 1)}${cfchk(ycf2, ltr2, 1, 0)}&=${c2}&&eqn\\ 2
              \\end{alignat}$$`;

    const title1 = `${cfchk(xcf1, ltr1txt, 1, 1)}${cfchk(ycf1, ltr2txt, 1, 0)}=${c1}`;
    const title2 = `${cfchk(xcf2, ltr1txt, 1, 1)}${cfchk(ycf2, ltr2txt, 1, 0)}=${c2}`;
    suma = coordTablesHtml(tab, title1, title2, ltr1txt, ltr2txt);
    suma += eliminationAlgebra(
      problem.x, problem.y, xcf1, ycf1, c1, xcf2, ycf2, c2, ltr1, ltr2
    );
  } else {
    problem = generateSubstitutionProblem();
    const { xcf1, c1, xcf2, c2, tab } = problem;

    sumq =
      'Solve the simultaneous equations, using graphical and algebraic methods.';
    sumq += `$$\\begin{aligned}
              ${ltr2}&=${cfchk(xcf1, ltr1, 1, 1)}${cfchk(c1, '', 0, 0)}\\\\
              ${ltr2}&=${cfchk(xcf2, ltr1, 1, 1)}${cfchk(c2, '', 0, 0)}
              \\end{aligned}$$`;

    const title1 = `${ltr2txt}=${cfchk(xcf1, ltr1txt, 1, 1)}${cfchk(c1, '', 0, 0)}`;
    const title2 = `${ltr2txt}=${cfchk(xcf2, ltr1txt, 1, 1)}${cfchk(c2, '', 0, 0)}`;
    suma = coordTablesHtml(tab, title1, title2, ltr1txt, ltr2txt);
    suma += substitutionAlgebra(problem.x, problem.y, xcf1, c1, xcf2, c2, ltr1, ltr2);
  }

  const { x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, scale, tab } = problem;

  return {
    question: sumq,
    solution: suma,
    notesLink: NOTES,
    canvas: {
      height: 400,
      width: 400,
      withSolution: true,
      draw: (ctx) => {
        scaleDraw(ctx, scale.xptve, scale.yptve, scale.x, scale.y, ltr1txt, ltr2txt, x, y);

        let edge1;
        let edge2;
        if (method === METHOD.ELIMINATION) {
          edge1 = getBoundaryPoints(xcf1, ycf1, c1, scale);
          edge2 = getBoundaryPoints(xcf2, ycf2, c2, scale);
        } else {
          // y = ax + b  →  a x - y = -b
          edge1 = getBoundaryPoints(xcf1, -1, -c1, scale);
          edge2 = getBoundaryPoints(xcf2, -1, -c2, scale);
        }

        drawSolutionLine(ctx, edge1, scale, COLOUR.LINE1);
        drawSolutionLine(ctx, edge2, scale, COLOUR.LINE2);

        drawTableDots(
          ctx,
          [tab.x11, tab.x12, tab.x13],
          [tab.y11, tab.y12, tab.y13],
          scale,
          COLOUR.LINE1
        );
        drawTableDots(
          ctx,
          [tab.x21, tab.x22, tab.x23],
          [tab.y21, tab.y22, tab.y23],
          scale,
          COLOUR.LINE2
        );
      }
    }
  };
}
