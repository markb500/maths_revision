// js/generators/simultaneous.js
import * as utils from '../utils.js';

// ---------- original helpers ----------
function scaleSet(x, y) {
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

// Original scaleDraw – kept as close as possible to the source you supplied
function scaleDraw(ctx, xpositive, ypositive, xscale, yscale, ltr1txt, ltr2txt, solX, solY) {
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

  // Heavy grid
  ctx.lineWidth = 0.4;
  for (let i = 0; i < 5; i++) {
    ctx.moveTo(xscaleposn[i], xposn);
    ctx.lineTo(xscaleposn[i], yscaleposn[5]);
    ctx.moveTo(yposn, yscaleposn[i]);
    ctx.lineTo(xscaleposn[5], yscaleposn[i]);
  }
  ctx.stroke();

  // Light intermediate lines – full coverage including outer strips
  ctx.lineWidth = 0.15;
  ctx.strokeStyle = "#dddddd";

  for (let i = 0; i < 5; i++) {
    for (let j = 1; j < 5; j++) {
      // vertical
      const xv = xpositive
        ? xscaleposn[i] - 10 * j
        : xscaleposn[i] + 10 * j;
      ctx.beginPath();
      ctx.moveTo(xv, xposn);
      ctx.lineTo(xv, yscaleposn[5]);
      ctx.stroke();

      // horizontal
      const yv = ypositive
        ? yscaleposn[i] - 10 * j
        : yscaleposn[i] + 10 * j;
      ctx.beginPath();
      ctx.moveTo(yposn, yv);
      ctx.lineTo(xscaleposn[5], yv);
      ctx.stroke();
    }
  }

  // Outer strip (the part the loop above misses)
  for (let j = 1; j < 5; j++) {
    const xvOuter = xpositive
      ? xscaleposn[5] - 10 * j
      : xscaleposn[5] + 10 * j;
    ctx.beginPath();
    ctx.moveTo(xvOuter, xposn);
    ctx.lineTo(xvOuter, yscaleposn[5]);
    ctx.stroke();

    const yvOuter = ypositive
      ? yscaleposn[5] - 10 * j
      : yscaleposn[5] + 10 * j;
    ctx.beginPath();
    ctx.moveTo(yposn, yvOuter);
    ctx.lineTo(xscaleposn[5], yvOuter);
    ctx.stroke();
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

  // Original generation constraints
  // ---------- generation (with outside-point rejection) ----------
let valid = false;
let scale, tab;

do {
  // generate x, y, coefficients and c1
  do {
    do {
      y = utils.rndgen(-6, 6, 0, 1, -1);
    } while (y === 0 || Math.abs(y) === 1);

    do { xcf1 = utils.rndgen(-9, 9, 0, 1, -1); } while (xcf1 === 0);
    do { ycf1 = utils.rndgen(-9, 9, 0, 1, -1); } while (ycf1 === 0);
    do { c1  = utils.rndgen(-5, 25, 0, 1, -1); } while (c1 === 0);

    x = (c1 - ycf1 * y) / xcf1;
  } while (!Number.isInteger(x) || x === 0 || Math.abs(x) === 1);

  // second equation
  do {
    xcf2 = utils.rndgen(-9, 9, 0, 1, -1);
  } while (xcf2 === 0 || Math.abs(xcf2) === Math.abs(xcf1));

  do {
    ycf2 = utils.rndgen(-9, 9, 0, 1, -1);
  } while (ycf2 === 0 || Math.abs(ycf2) === Math.abs(ycf1));

  c2 = xcf2 * x + ycf2 * y;

  // now test whether the three points stay inside the graph
  scale = scaleSet(x, y);
  tab = coordTab(x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, scale.x, scale.xptve, 1);

  const limitX = 6 * scale.x;
  const limitY = 6 * scale.y;

  const outside = (
    Math.abs(tab.x11) > limitX || Math.abs(tab.y11) > limitY ||
    Math.abs(tab.x13) > limitX || Math.abs(tab.y13) > limitY ||
    Math.abs(tab.x21) > limitX || Math.abs(tab.y21) > limitY ||
    Math.abs(tab.x23) > limitX || Math.abs(tab.y23) > limitY
  );

  valid = !outside;

} while (!valid);

  scale = scaleSet(x, y);
  tab = coordTab(x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, scale.x, scale.xptve, 1);

  sumq = "Solve the simultaneous equations, using graphical and algebraic methods.";
  sumq += `$$\\begin{alignat}{2}
            ${utils.cfchk(xcf1, ltr1, 1, 1)}${utils.cfchk(ycf1, ltr2, 1, 0)}&=${c1}\\qquad\\qquad &&eqn\\ 1\\\\[5pt]
            ${utils.cfchk(xcf2, ltr1, 1, 1)}${utils.cfchk(ycf2, ltr2, 1, 0)}&=${c2}&&eqn\\ 2
            \\end{alignat}$$`;

  // Tables with plain-text labels
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

  suma += `$$\\begin{aligned}${ltr1}=${x}\\\\${ltr2}=${y}\\end{aligned}$$`;

  return {
    question: sumq,
    solution: suma,
    notesLink: "images/20200505-MathsBook10GraphsSimEquv1_5-APO.pdf#page=20",
    canvas: {
      height: 400,
      width: 400,
      withSolution: true,
      draw: (ctx) => {
        // Original axes + grid
        scaleDraw(ctx, scale.xptve, scale.yptve, scale.x, scale.y, ltr1txt, ltr2txt, x, y);

        // ===== ORIGINAL endpoint selection (copied as closely as possible) =====
        let xcross1 = c1 / xcf1;
        let xcross2 = c2 / xcf2;
        let ycross1 = c1 / ycf1;
        let ycross2 = c2 / ycf2;

        let xouter1, xouter2, youter1, youter2;
        if (scale.yptve) {
          xouter1 = (c1 - ycf1 * 6 * scale.y) / xcf1;
          xouter2 = (c2 - ycf2 * 6 * scale.y) / xcf2;
        } else {
          xouter1 = (c1 - ycf1 * -6 * scale.y) / xcf1;
          xouter2 = (c2 - ycf2 * -6 * scale.y) / xcf2;
        }
        if (scale.xptve) {
          youter1 = (c1 - xcf1 * 6 * scale.x) / ycf1;
          youter2 = (c2 - xcf2 * 6 * scale.x) / ycf2;
        } else {
          youter1 = (c1 - xcf1 * -6 * scale.x) / ycf1;
          youter2 = (c2 - xcf2 * -6 * scale.x) / ycf2;
        }

        // The original status flags and selection of the two endpoints
        // (simplified to the essential path that the original used)
        let x11coord, y11coord, x12coord, y12coord;
        let x21coord, y21coord, x22coord, y22coord;

        // Line 1
        if (((xcross1 >= 0 && scale.xptve) || (xcross1 <= 0 && !scale.xptve)) && Math.abs(xcross1) < (6 * scale.x)) {
          x11coord = xcross1; y11coord = 0;
          if (((ycross1 > 0 && scale.yptve) || (ycross1 < 0 && !scale.yptve)) && Math.abs(ycross1) < (6 * scale.y)) {
            x12coord = 0; y12coord = ycross1;
          } else {
            x12coord = xouter1;
            y12coord = scale.yptve ? 6 * scale.y : -6 * scale.y;
          }
        } else if (((ycross1 > 0 && scale.yptve) || (ycross1 < 0 && !scale.yptve)) && Math.abs(ycross1) < (6 * scale.y)) {
          x11coord = 0; y11coord = ycross1;
          x12coord = xouter1;
          y12coord = scale.yptve ? 6 * scale.y : -6 * scale.y;
        } else {
          x11coord = xouter1;
          y11coord = scale.yptve ? 6 * scale.y : -6 * scale.y;
          x12coord = scale.xptve ? 6 * scale.x : -6 * scale.x;
          y12coord = youter1;
        }

        // Line 2 (identical logic)
        if (((xcross2 >= 0 && scale.xptve) || (xcross2 <= 0 && !scale.xptve)) && Math.abs(xcross2) < (6 * scale.x)) {
          x21coord = xcross2; y21coord = 0;
          if (((ycross2 > 0 && scale.yptve) || (ycross2 < 0 && !scale.yptve)) && Math.abs(ycross2) < (6 * scale.y)) {
            x22coord = 0; y22coord = ycross2;
          } else {
            x22coord = xouter2;
            y22coord = scale.yptve ? 6 * scale.y : -6 * scale.y;
          }
        } else if (((ycross2 > 0 && scale.yptve) || (ycross2 < 0 && !scale.yptve)) && Math.abs(ycross2) < (6 * scale.y)) {
          x21coord = 0; y21coord = ycross2;
          x22coord = xouter2;
          y22coord = scale.yptve ? 6 * scale.y : -6 * scale.y;
        } else {
          x21coord = xouter2;
          y21coord = scale.yptve ? 6 * scale.y : -6 * scale.y;
          x22coord = scale.xptve ? 6 * scale.x : -6 * scale.x;
          y22coord = youter2;
        }

        // Draw the lines
        const p11 = coordCalc(x11coord, y11coord, scale.x, scale.y, scale.xptve, scale.yptve);
        const p12 = coordCalc(x12coord, y12coord, scale.x, scale.y, scale.xptve, scale.yptve);
        const p21 = coordCalc(x21coord, y21coord, scale.x, scale.y, scale.xptve, scale.yptve);
        const p22 = coordCalc(x22coord, y22coord, scale.x, scale.y, scale.xptve, scale.yptve);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#0000ff";
        ctx.beginPath();
        ctx.moveTo(p11.x, p11.y);
        ctx.lineTo(p12.x, p12.y);
        ctx.stroke();

        ctx.strokeStyle = "#00aa00";
        ctx.beginPath();
        ctx.moveTo(p21.x, p21.y);
        ctx.lineTo(p22.x, p22.y);
        ctx.stroke();

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