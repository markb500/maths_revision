// js/generators/simultaneous.js
import * as utils from '../utils.js';

// ---------- helpers ----------
function scaleSet(x, y) {
  //For each scale, determines if +ve or -ve and sets scale steps
  const xpositive = x > 0;
  const ypositive = y > 0;
  let xscale, yscale;

  const ax = Math.abs(x);
  if (ax < 4) xscale = 1;
  else if (ax < 9) xscale = 2;
  else if (ax < 21) xscale = 5;
  else if (ax < 41) xscale = 10;
  else xscale = 20;

  const ay = Math.abs(y);
  if (ay < 4) yscale = 1;
  else if (ay < 9) yscale = 2;
  else if (ay < 21) yscale = 5;
  else if (ay < 41) yscale = 10;
  else yscale = 20;

  return { xptve: xpositive, yptve: ypositive, x: xscale, y: yscale };
}

function coordTab(x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, xscale, xpositive, sumType) {
  //Determines coords either side of solution coords for use on graph and in coord tables
  let xtab11, xtab12, xtab13, ytab11, ytab12, ytab13;
  let xtab21, xtab22, xtab23, ytab21, ytab22, ytab23;

  if (xpositive) {
    xtab11 = x - xscale; xtab12 = x; xtab13 = x + xscale;
    xtab21 = x - xscale; xtab22 = x; xtab23 = x + xscale;
  } else {
    xtab11 = x + xscale; xtab12 = x; xtab13 = x - xscale;
    xtab21 = x + xscale; xtab22 = x; xtab23 = x - xscale;
  }

  if (sumType === 1) {
    ytab11 = utils.dp((c1 - xcf1 * xtab11) / ycf1, 1, -1);
    ytab12 = y;
    ytab13 = utils.dp((c1 - xcf1 * xtab13) / ycf1, 1, -1);
    ytab21 = utils.dp((c2 - xcf2 * xtab21) / ycf2, 1, -1);
    ytab22 = y;
    ytab23 = utils.dp((c2 - xcf2 * xtab23) / ycf2, 1, -1);
  } else {
    ytab11 = utils.dp(xcf1 * xtab11 + c1, 1, -1);
    ytab12 = y;
    ytab13 = utils.dp(xcf1 * xtab13 + c1, 1, -1);
    ytab21 = utils.dp(xcf2 * xtab21 + c2, 1, -1);
    ytab22 = y;
    ytab23 = utils.dp(xcf2 * xtab23 + c2, 1, -1);
  }

  return {
    x11: xtab11, x12: xtab12, x13: xtab13,
    y11: ytab11, y12: ytab12, y13: ytab13,
    x21: xtab21, x22: xtab22, x23: xtab23,
    y21: ytab21, y22: ytab22, y23: ytab23
  };
}

function coordCalc(x, y, xscale, yscale, xpositive, ypositive) {
  //Determines coordinate on canvas from graphical coordinate
  let xcoord, ycoord;
  if (xpositive && ypositive) {
    xcoord = 50 * ((x / xscale) + 1);
    ycoord = 400 - 50 * ((y / yscale) + 1);
  } else if (xpositive && !ypositive) {
    xcoord = 50 * ((x / xscale) + 1);
    ycoord = 50 * ((y / -yscale) + 1);
  } else if (!xpositive && ypositive) {
    xcoord = 400 - 50 * ((x / -xscale) + 1);
    ycoord = 400 - 50 * ((y / yscale) + 1);
  } else {
    xcoord = 400 - 50 * ((x / -xscale) + 1);
    ycoord = 50 * ((y / -yscale) + 1);
  }
  return { x: xcoord, y: ycoord };
}

function scaleDraw(ctx, xpositive, ypositive, xscale, yscale, ltr1txt, ltr2txt, solX, solY) {
  //Draws the graph scales and grid lines, showing just the relevent quadrant
  ctx.font = "15px Comic Sans MS";
  ctx.lineWidth = 3;
  ctx.beginPath();

  let xposn, yposn, xoffset, yoffset, xtxtalign, ytxtalign, xscaleposn, yscaleposn, xfigs, yfigs;

  if (xpositive && ypositive) {
    xposn = 350; yposn = 50; xoffset = 10; yoffset = -10;
    xtxtalign = "top"; ytxtalign = "right";
    xscaleposn = [100,150,200,250,300,350];
    yscaleposn = [300,250,200,150,100,50];
    xfigs = [1,2,3,4,5].map(i => i * xscale);
    yfigs = [1,2,3,4,5].map(i => i * yscale);
    ctx.moveTo(40, xposn); ctx.lineTo(350, xposn);
    ctx.moveTo(yposn, 360); ctx.lineTo(yposn, 50);
  } else if (!xpositive && ypositive) {
    xposn = 350; yposn = 350; xoffset = 10; yoffset = 10;
    xtxtalign = "top"; ytxtalign = "left";
    xscaleposn = [300,250,200,150,100,50];
    yscaleposn = [300,250,200,150,100,50];
    xfigs = [1,2,3,4,5].map(i => i * -xscale);
    yfigs = [1,2,3,4,5].map(i => i * yscale);
    ctx.moveTo(50, xposn); ctx.lineTo(360, xposn);
    ctx.moveTo(yposn, 360); ctx.lineTo(yposn, 50);
  } else if (xpositive && !ypositive) {
    xposn = 50; yposn = 50; xoffset = -10; yoffset = -10;
    xtxtalign = "bottom"; ytxtalign = "right";
    xscaleposn = [100,150,200,250,300,350];
    yscaleposn = [100,150,200,250,300,350];
    xfigs = [1,2,3,4,5].map(i => i * xscale);
    yfigs = [1,2,3,4,5].map(i => i * -yscale);
    ctx.moveTo(40, xposn); ctx.lineTo(350, xposn);
    ctx.moveTo(yposn, 350); ctx.lineTo(yposn, 40);
  } else {
    xposn = 50; yposn = 350; xoffset = -10; yoffset = 10;
    xtxtalign = "bottom"; ytxtalign = "left";
    xscaleposn = [300,250,200,150,100,50];
    yscaleposn = [100,150,200,250,300,350];
    xfigs = [1,2,3,4,5].map(i => i * -xscale);
    yfigs = [1,2,3,4,5].map(i => i * -yscale);
    ctx.moveTo(50, xposn); ctx.lineTo(360, xposn);
    ctx.moveTo(yposn, 350); ctx.lineTo(yposn, 40);
  }

  for (let i = 0; i < 5; i++) {
    ctx.moveTo(xscaleposn[i], xposn);
    ctx.lineTo(xscaleposn[i], xposn + xoffset);
    ctx.textAlign = "center";
    ctx.fillText(xfigs[i], xscaleposn[i], xposn + 3 * xoffset);

    ctx.moveTo(yposn, yscaleposn[i]);
    ctx.lineTo(yposn + yoffset, yscaleposn[i]);
    ctx.textAlign = ytxtalign;
    ctx.fillText(yfigs[i], yposn + 1.5 * yoffset, yscaleposn[i] + 5);
  }
  ctx.fillText("0", yposn + 1.5 * yoffset, xposn + 3 * xoffset);

  ctx.font = "30px Comic Sans MS";
  ctx.fillText(ltr1txt, xscaleposn[5], xposn + 3 * xoffset);
  ctx.fillText(ltr2txt, yposn + 1.5 * yoffset, yscaleposn[5]);

  ctx.font = "20px Comic Sans MS";
  ctx.fillText(`Solution: (${solX}, ${solY})`, xscaleposn[3], yscaleposn[5]);
  ctx.stroke();

  // ===== GRID LINES (5 heavy + 4 light between) =====

  // Heavy grid lines
  ctx.lineWidth = 0.6;
  ctx.strokeStyle = "#555555"
  for (let i = 0; i < 5; i++) {
    // vertical
    ctx.beginPath();
    ctx.moveTo(xscaleposn[i], xposn);
    ctx.lineTo(xscaleposn[i], yscaleposn[5]);
    ctx.stroke();
    // horizontal
    ctx.beginPath();
    ctx.moveTo(yposn, yscaleposn[i]);
    ctx.lineTo(xscaleposn[5], yscaleposn[i]);
    ctx.stroke();
  }

  // Light grid lines
  ctx.lineWidth = 0.3;
  ctx.strokeStyle = "#888888";
  const step = 10;               // 10 px between light lines
  const numLight = 4;            // 4 light lines per section
  const numSections = 5;         // 5 heavy-line sections

  // Vertical light lines
  const lightStep = 10;
  let majorX = [yposn, ...xscaleposn];

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

  //Horizontal light lines
  let majorY = [xposn, ...yscaleposn];

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

// ---------- main generator ----------
export function generate() {
  let sumq = "", suma = "";
  let x, y, xcf1, xcf2, ycf1, ycf2, c1, c2;
  let ltr1, ltr2, ltr1txt, ltr2txt;
  let scale, tab;

  switch (utils.rndgen(1, 4, 0, 1, -1)) {
    case 1: ltr1 = "x"; ltr2 = "y"; ltr1txt = "x"; ltr2txt = "y"; break;
    case 2: ltr1 = "s"; ltr2 = "t"; ltr1txt = "s"; ltr2txt = "t"; break;
    case 3: ltr1 = "a"; ltr2 = "b"; ltr1txt = "a"; ltr2txt = "b"; break;
    case 4: ltr1 = "\\omega"; ltr2 = "\\varepsilon"; ltr1txt = "ω"; ltr2txt = "ε"; break;
  }

  const method = utils.rndgen(1, 2, 0, 1, -1); // 1 = elimination, 2 = substitution

  // Generation with constraints + outside-point rejection
  if (method === 1) {
    let valid = false;
    do {
      do {
        do {
          y = utils.rndgen(-6, 6, 0, 1, -1);
        } while (y === 0 || Math.abs(y) === 1);

        do { xcf1 = utils.rndgen(-9, 9, 0, 1, -1); } while (xcf1 === 0);
        do { ycf1 = utils.rndgen(-9, 9, 0, 1, -1); } while (ycf1 === 0);
        do { c1  = utils.rndgen(-5, 25, 0, 1, -1); } while (c1 === 0);

        x = (c1 - ycf1 * y) / xcf1;
      } while (!Number.isInteger(x) || x === 0 || Math.abs(x) === 1);

      do {
        xcf2 = utils.rndgen(-9, 9, 0, 1, -1);
      } while (xcf2 === 0 || Math.abs(xcf2) === Math.abs(xcf1));

      do {
        ycf2 = utils.rndgen(-9, 9, 0, 1, -1);
      } while (ycf2 === 0 || Math.abs(ycf2) === Math.abs(ycf1));

      c2 = xcf2 * x + ycf2 * y;

      scale = scaleSet(x, y);

      // Keep coords in graph area by avoiding steep gradients and checking coord position
      const gradOk = Math.abs((scale.x * (xcf1 / ycf1)) / scale.y) < 2 &&
                    Math.abs((scale.x * (xcf2 / ycf2)) / scale.y) < 2;

      tab = coordTab(x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, scale.x, scale.xptve, 1);

      const limitX = 6 * scale.x;
      const limitY = 6 * scale.y;

      const outside = (
        Math.abs(tab.x11) > limitX || Math.abs(tab.y11) > limitY ||
        Math.abs(tab.x13) > limitX || Math.abs(tab.y13) > limitY ||
        Math.abs(tab.x21) > limitX || Math.abs(tab.y21) > limitY ||
        Math.abs(tab.x23) > limitX || Math.abs(tab.y23) > limitY
      );

      valid = gradOk && !outside;

    } while (!valid);

    // Question
    sumq = "Solve the simultaneous equations, using graphical and algebraic methods.";
    sumq += `$$\\begin{alignat}{2}
              ${utils.cfchk(xcf1, ltr1, 1, 1)}${utils.cfchk(ycf1, ltr2, 1, 0)}&=${c1}\\qquad\\qquad &&eqn\\ 1\\\\[5pt]
              ${utils.cfchk(xcf2, ltr1, 1, 1)}${utils.cfchk(ycf2, ltr2, 1, 0)}&=${c2}&&eqn\\ 2
              \\end{alignat}$$`;

    // Tables
    suma = `<div class="row" style="margin-bottom:15px;">
              <table style="display:inline-block; margin-right:40px; border-collapse:collapse;">
                <tr><td colspan="4" style="color:#0000ff; font-weight:bold;">
                  ${utils.cfchk(xcf1, ltr1txt, 1, 1)}${utils.cfchk(ycf1, ltr2txt, 1, 0)}=${c1}
                </td></tr>
                <tr><td>${ltr1txt}</td><td>${tab.x11}</td><td>${tab.x12}</td><td>${tab.x13}</td></tr>
                <tr><th>${ltr2txt}</th><td>${tab.y11}</td><td>${tab.y12}</td><td>${tab.y13}</td></tr>
              </table>
              <table style="display:inline-block; border-collapse:collapse;">
                <tr><td colspan="4" style="color:#00aa00; font-weight:bold;">
                  ${utils.cfchk(xcf2, ltr1txt, 1, 1)}${utils.cfchk(ycf2, ltr2txt, 1, 0)}=${c2}
                </td></tr>
                <tr><td>${ltr1txt}</td><td>${tab.x21}</td><td>${tab.x22}</td><td>${tab.x23}</td></tr>
                <tr><th>${ltr2txt}</th><td>${tab.y21}</td><td>${tab.y22}</td><td>${tab.y23}</td></tr>
              </table>
            </div>`;

    // ---------- Algebraic solution (elimination) ----------
    let h;
    if (Math.abs(xcf1) * Math.abs(xcf2) <= Math.abs(ycf1) * Math.abs(ycf2)) {
      // Eliminate x
      h = utils.gcd2(Math.abs(xcf1), Math.abs(xcf2));
      const m1 = Math.abs(xcf2) / h;
      const m2 = Math.abs(xcf1) / h;

      suma += `$$\\begin{alignat}{2}
                ${utils.cfchk(xcf1 * m1, ltr1, 1, 1)}${utils.cfchk(ycf1 * m1, ltr2, 1, 0)}&=${c1 * m1}
                  &&\\quad\\text{eqn 1}\\times ${m1}\\\\[5pt]
                ${utils.cfchk(xcf2 * m2, ltr1, 1, 1)}${utils.cfchk(ycf2 * m2, ltr2, 1, 0)}&=${c2 * m2}
                  &&\\quad\\text{eqn 2}\\times ${m2}\\\\[5pt]`;

      if ((xcf1 > 0 && xcf2 > 0) || (xcf1 < 0 && xcf2 < 0)) {
        // same signs → subtract
        const yCoeff = ycf1 * m1 - ycf2 * m2;
        const cDiff  = c1 * m1 - c2 * m2;
        suma += `${utils.cfchk(yCoeff, ltr2, 1, 1)}&=${cDiff}
                  &&\\quad\\text{eqn 1 - eqn 2}\\\\[5pt]`;
        if (Math.abs(yCoeff) !== 1) {
          suma += `${ltr2}&=\\dfrac{${cDiff}}{${yCoeff}}\\\\[5pt]`;
        }
        suma += `${ltr2}&=${y}\\\\[15pt]`;
      } else {
        // opposite signs → add
        const yCoeff = ycf1 * m1 + ycf2 * m2;
        const cSum   = c1 * m1 + c2 * m2;
        suma += `${utils.cfchk(yCoeff, ltr2, 1, 1)}&=${cSum}
                  &&\\quad\\text{eqn 1 + eqn 2}\\\\[5pt]`;
        if (Math.abs(yCoeff) !== 1) {
          suma += `${ltr2}&=\\dfrac{${cSum}}{${yCoeff}}\\\\[5pt]`;
        }
        suma += `${ltr2}&=${y}\\\\[15pt]`;
      }

      // Substitute back
      suma += `${utils.cfchk(xcf1, ltr1, 1, 1)}${utils.cfchk(ycf1, "", 0, 0)}\\times${y}&=${c1}
                &&\\quad\\text{substitute ${ltr2} into eqn 1}\\\\[5pt]
              ${utils.cfchk(xcf1, ltr1, 1, 1)}${utils.cfchk(ycf1 * y, "", 0, 0)}&=${c1}\\\\[5pt]`;
      if (Math.abs(xcf1) === 1) {
        suma += `${ltr1}&=${x}\\end{alignat}$$`;
      } else {
        suma += `${ltr1}&=\\dfrac{${c1 - ycf1 * y}}{${xcf1}}\\\\[5pt]
                ${ltr1}&=${x}\\end{alignat}$$`;
      }

    } else {
      // Eliminate y (mirror of the above)
      h = utils.gcd2(Math.abs(ycf1), Math.abs(ycf2));
      const m1 = Math.abs(ycf2) / h;
      const m2 = Math.abs(ycf1) / h;

      suma += `$$\\begin{alignat}{2}
                ${utils.cfchk(xcf1 * m1, ltr1, 1, 1)}${utils.cfchk(ycf1 * m1, ltr2, 1, 0)}&=${c1 * m1}
                  &&\\quad\\text{eqn 1}\\times ${m1}\\\\[5pt]
                ${utils.cfchk(xcf2 * m2, ltr1, 1, 1)}${utils.cfchk(ycf2 * m2, ltr2, 1, 0)}&=${c2 * m2}
                  &&\\quad\\text{eqn 2}\\times ${m2}\\\\[5pt]`;

      if ((ycf1 > 0 && ycf2 > 0) || (ycf1 < 0 && ycf2 < 0)) {
        const xCoeff = xcf1 * m1 - xcf2 * m2;
        const cDiff  = c1 * m1 - c2 * m2;
        suma += `${utils.cfchk(xCoeff, ltr1, 1, 1)}&=${cDiff}
                  &&\\quad\\text{eqn 1 - eqn 2}\\\\[5pt]`;
        if (Math.abs(xCoeff) !== 1) {
          suma += `${ltr1}&=\\dfrac{${cDiff}}{${xCoeff}}\\\\[5pt]`;
        }
        suma += `${ltr1}&=${x}\\\\[15pt]`;
      } else {
        const xCoeff = xcf1 * m1 + xcf2 * m2;
        const cSum   = c1 * m1 + c2 * m2;
        suma += `${utils.cfchk(xCoeff, ltr1, 1, 1)}&=${cSum}
                  &&\\quad\\text{eqn 1 + eqn 2}\\\\[5pt]`;
        if (Math.abs(xCoeff) !== 1) {
          suma += `${ltr1}&=\\dfrac{${cSum}}{${xCoeff}}\\\\[5pt]`;
        }
        suma += `${ltr1}&=${x}\\\\[15pt]`;
      }

      // Substitute back
      suma += `${utils.cfchk(xcf1, "", 0, 0)}\\times${x}${utils.cfchk(ycf1, ltr2, 1, 0)}&=${c1}
                &&\\quad\\text{substitute ${ltr1} into eqn 1}\\\\[5pt]
              ${xcf1 * x}${utils.cfchk(ycf1, ltr2, 1, 0)}&=${c1}\\\\[5pt]`;
      if (Math.abs(ycf1) === 1) {
        suma += `${ltr2}&=${y}\\end{alignat}$$`;
      } else {
        suma += `${ltr2}&=\\dfrac{${c1 - xcf1 * x}}{${ycf1}}\\\\[5pt]
                ${ltr2}&=${y}\\end{alignat}$$`;
      }
    }
  } else {
    // ---------- Substitution path (y = ax + b) ----------
    let valid = false;
    do {
      do {
        xcf1 = utils.rndgen(-9, 9, 0, 1, -1);
      } while (xcf1 === 0);

      do {
        x = utils.rndgen(-9, 9, 0, 1, -1);
      } while (x === 0 || Math.abs(x) === 1);

      do {
        c1 = utils.rndgen(-5, 25, 0, 1, -1);
      } while (c1 === 0);

      y = xcf1 * x + c1;

      do {
        xcf2 = utils.rndgen(-9, 9, 0, 1, -1);
      } while (xcf2 === 0 || xcf2 === xcf1);

      c2 = y - xcf2 * x;

      // Basic range checks
      if (!Number.isInteger(c2) || c2 < -5 || c2 > 25 || c2 === 0 ||
        y < -50 || y > 50 || y === 0 || Math.abs(y) === 1 ||
        Math.abs(xcf1 - xcf2) < 3)
      {
        continue;
      }

      scale = scaleSet(x, y);
      tab = coordTab(x, y, xcf1, -1, c1, xcf2, -1, c2, scale.x, scale.xptve, 2);

      const limitX = 6 * scale.x;
      const limitY = 6 * scale.y;

      const outside = (
        Math.abs(tab.x11) > limitX || Math.abs(tab.y11) > limitY ||
        Math.abs(tab.x13) > limitX || Math.abs(tab.y13) > limitY ||
        Math.abs(tab.x21) > limitX || Math.abs(tab.y21) > limitY ||
        Math.abs(tab.x23) > limitX || Math.abs(tab.y23) > limitY
      );

      const gradOk = Math.abs((scale.x * xcf1) / scale.y) < 2.5 &&
                    Math.abs((scale.x * xcf2) / scale.y) < 2.5;

      valid = !outside && gradOk;

    } while (!valid);

    ycf1 = -1;
    ycf2 = -1;

    // ----- Question -----
    sumq = "Solve the simultaneous equations, using graphical and algebraic methods.";
    sumq += `$$\\begin{aligned}
              ${ltr2}&=${utils.cfchk(xcf1, ltr1, 1, 1)}${utils.cfchk(c1, "", 0, 0)}\\\\
              ${ltr2}&=${utils.cfchk(xcf2, ltr1, 1, 1)}${utils.cfchk(c2, "", 0, 0)}
              \\end{aligned}$$`;

    // ----- Colour-matched tables -----
    suma = `<div class="row" style="margin-bottom:15px;">
              <table style="display:inline-block; margin-right:40px; border-collapse:collapse;">
                <tr><td colspan="4" style="color:#0000ff; font-weight:bold;">
                  ${ltr2txt}=${utils.cfchk(xcf1, ltr1txt, 1, 1)}${utils.cfchk(c1, "", 0, 0)}
                </td></tr>
                <tr><td>${ltr1txt}</td><td>${tab.x11}</td><td>${tab.x12}</td><td>${tab.x13}</td></tr>
                <tr><th>${ltr2txt}</th><td>${tab.y11}</td><td>${tab.y12}</td><td>${tab.y13}</td></tr>
              </table>
              <table style="display:inline-block; border-collapse:collapse;">
                <tr><td colspan="4" style="color:#00aa00; font-weight:bold;">
                  ${ltr2txt}=${utils.cfchk(xcf2, ltr1txt, 1, 1)}${utils.cfchk(c2, "", 0, 0)}
                </td></tr>
                <tr><td>${ltr1txt}</td><td>${tab.x21}</td><td>${tab.x22}</td><td>${tab.x23}</td></tr>
                <tr><th>${ltr2txt}</th><td>${tab.y21}</td><td>${tab.y22}</td><td>${tab.y23}</td></tr>
              </table>
            </div>`;

    // ----- Algebraic solution (substitution) -----
    suma += `$$\\begin{aligned}
              ${utils.cfchk(xcf1, ltr1, 1, 1)}${utils.cfchk(c1, "", 0, 0)}
              &=${utils.cfchk(xcf2, ltr1, 1, 1)}${utils.cfchk(c2, "", 0, 0)}\\\\[5pt]`;

    if (xcf1 - xcf2 !== 0) {
      suma += `${utils.cfchk(xcf1 - xcf2, ltr1, 1, 1)}&=${c2 - c1}\\\\[5pt]`;
      if (Math.abs(xcf1 - xcf2) !== 1) {
        suma += `${ltr1}&=\\dfrac{${c2 - c1}}{${xcf1 - xcf2}}\\\\[5pt]`;
      }
      suma += `${ltr1}&=${x}\\\\[10pt]`;
    }

    suma += `${ltr2}&=${xcf1}\\times${x}${utils.cfchk(c1, "", 0, 0)}\\\\[5pt]
            ${ltr2}&=${y}
            \\end{aligned}$$`;
  }

  return {
    question: sumq,
    solution: suma,
    notesLink: "images/20200505-MathsBook10GraphsSimEquv1_5-APO.pdf#page=20",
    canvas: {
      height: 400,
      width: 400,
      withSolution: true,
      draw: (ctx) => {
        scaleDraw(ctx, scale.xptve, scale.yptve, scale.x, scale.y, ltr1txt, ltr2txt, x, y);

        // ===== Robust edge-to-edge line drawing =====
        function getBoundaryPoints(xcf, ycf, c, scale) {
          const limitX = 6 * scale.x;
          const limitY = 6 * scale.y;
          const pts = [];

          function inQuadrant(xx, yy) {
            const xOk = scale.xptve ? xx >= 0 : xx <= 0;
            const yOk = scale.yptve ? yy >= 0 : yy <= 0;
            return xOk && yOk && Math.abs(xx) <= limitX + 0.001 && Math.abs(yy) <= limitY + 0.001;
          }

          [-limitX, limitX].forEach(xx => {
            const yy = (c - xcf * xx) / ycf;
            if (inQuadrant(xx, yy)) pts.push({ x: xx, y: yy });
          });

          [-limitY, limitY].forEach(yy => {
            const xx = (c - ycf * yy) / xcf;
            if (inQuadrant(xx, yy)) pts.push({ x: xx, y: yy });
          });

          if (inQuadrant(0, c / ycf)) pts.push({ x: 0, y: c / ycf });
          if (inQuadrant(c / xcf, 0)) pts.push({ x: c / xcf, y: 0 });

          const unique = [];
          pts.forEach(p => {
            if (!unique.some(u => Math.abs(u.x - p.x) < 0.01 && Math.abs(u.y - p.y) < 0.01)) {
              unique.push(p);
            }
          });

          return unique.length >= 2 ? unique.slice(0, 2) : unique;
        }

        // Get the correct endpoints according to the method
        let edge1, edge2;
        if (method === 1) {
          edge1 = getBoundaryPoints(xcf1, ycf1, c1, scale);
          edge2 = getBoundaryPoints(xcf2, ycf2, c2, scale);
        } else {
          // substitution form: y = ax + b  →  a x - y = -b
          edge1 = getBoundaryPoints(xcf1, -1, -c1, scale);
          edge2 = getBoundaryPoints(xcf2, -1, -c2, scale);
        }

        // Draw line 1
        if (edge1.length >= 2) {
          const p1 = coordCalc(edge1[0].x, edge1[0].y, scale.x, scale.y, scale.xptve, scale.yptve);
          const p2 = coordCalc(edge1[1].x, edge1[1].y, scale.x, scale.y, scale.xptve, scale.yptve);
          ctx.strokeStyle = "#0000ff";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }

        // Draw line 2
        if (edge2.length >= 2) {
          const p1 = coordCalc(edge2[0].x, edge2[0].y, scale.x, scale.y, scale.xptve, scale.yptve);
          const p2 = coordCalc(edge2[1].x, edge2[1].y, scale.x, scale.y, scale.xptve, scale.yptve);
          ctx.strokeStyle = "#00aa00";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }

        // Mark the three table points
        ctx.fillStyle = "#0000ff";
        [tab.x11, tab.x12, tab.x13].forEach((xx, i) => {
          const yy = [tab.y11, tab.y12, tab.y13][i];
          const p = coordCalc(xx, yy, scale.x, scale.y, scale.xptve, scale.yptve);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
          ctx.fill();
        });
        ctx.fillStyle = "#00aa00";
        [tab.x21, tab.x22, tab.x23].forEach((xx, i) => {
          const yy = [tab.y21, tab.y22, tab.y23][i];
          const p = coordCalc(xx, yy, scale.x, scale.y, scale.xptve, scale.yptve);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    }
  };
}