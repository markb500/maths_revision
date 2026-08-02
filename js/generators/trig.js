// js/generators/trig.js
// Clean ES module
import { rndgen, dp } from '../utils.js';

export function generate() {
  let sumq = "", suma = "";
  let ang, adj, opp, hyp, units, unitsmath;
  let left = 50, top = 25, right, bottom;

  // Units
  switch (rndgen(1, 3, 0, 1, -1)) {
    case 1: units = " m"; unitsmath = "\\ m"; break;
    case 2: units = " cm"; unitsmath = "\\ cm"; break;
    case 3: units = " mm"; unitsmath = "\\ mm"; break;
  }

  do {
    ang = rndgen(25, 70, 0, 1, -1);
  } while (ang === 45);

  adj = rndgen(5, 150, 2, 0.01, -1);
  opp = dp(adj * Math.tan(ang * Math.PI / 180), 2, -1);
  hyp = dp(adj / Math.cos(ang * Math.PI / 180), 2, -1);

  if (ang < 45) {
    right = left + 300;
    bottom = opp * 300 / adj + top;
  } else {
    bottom = top + 300;
    right = adj * 300 / opp + left;
  }

  const showType = rndgen(1, 6, 0, 1, -1);

  // Common drawing function
  const drawTriangle = (ctx, labels) => {
    ctx.clearRect(0, 0, 400, 450);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.lineTo(right, top);
    ctx.closePath();
    ctx.stroke();

    // Right-angle marker
    ctx.strokeRect(right - 15, bottom - 15, 15, 15);

    // Angle arc
    ctx.beginPath();
    ctx.arc(left, bottom, 40, 0, -(Math.PI / 180) * ang, true);
    ctx.stroke();

    // Labels
    ctx.font = "20px Comic Sans MS";
    labels.forEach(l => {
      ctx.textAlign = l.align || "left";
      ctx.fillText(l.text, l.x, l.y);
    });
  };

  let labels = [];
  let drawFn;

  switch (showType) {
    case 1: // adj + opp → find hyp + angle
      labels = [
        { text: "θ", x: left + 50, y: bottom - 20 },
        { text: adj + units, x: (right + left) / 2, y: bottom + 30, align: "center" },
        { text: opp + units, x: right + 10, y: (bottom + top) / 2 },
        { text: "Hyp", x: (right + left) / 2 - 5, y: (bottom + top) / 2 - 5, align: "right" }
      ];
      sumq = "For the right-angled triangle shown, find the missing side (rounded to 2 decimal places) and the indicated angle (rounded to 2 significant figures).<br><br>";
      suma = `$$\\begin{aligned}Hyp&=\\sqrt{Adj^2+Opp^2}=\\sqrt{${adj}^2+${opp}^2}=\\underline{\\mathbf{${dp(Math.sqrt(adj**2 + opp**2), 2, 2)}${unitsmath}\\ (2\\ dp)}}\\end{aligned}$$
             $$\\begin{aligned}\\theta&=\\tan^{-1}\\left(\\frac{Opp}{Adj}\\right)=\\tan^{-1}\\left(\\frac{${opp}}{${adj}}\\right)=\\underline{\\mathbf{${dp(Math.atan(opp / adj) * 180 / Math.PI, 0, -1)}^\\circ\\ (2\\ sf)}}\\end{aligned}$$`;
      break;

    case 2: // adj + hyp → find opp + angle
      labels = [
        { text: "θ", x: left + 50, y: bottom - 20 },
        { text: adj + units, x: (right + left) / 2, y: bottom + 30, align: "center" },
        { text: "Opp", x: right + 10, y: (bottom + top) / 2 },
        { text: hyp + units, x: (right + left) / 2 - 5, y: (bottom + top) / 2 - 5, align: "right" }
      ];
      sumq = "For the right-angled triangle shown, find the missing side (rounded to 2 decimal places) and the indicated angle (rounded to 2 significant figures).<br><br>";
      suma = `$$\\begin{aligned}Opp&=\\sqrt{Hyp^2-Adj^2}=\\sqrt{${hyp}^2-${adj}^2}=\\underline{\\mathbf{${dp(Math.sqrt(hyp**2 - adj**2), 2, 2)}${unitsmath}\\ (2\\ dp)}}\\end{aligned}$$
             $$\\begin{aligned}\\theta&=\\cos^{-1}\\left(\\frac{Adj}{Hyp}\\right)=\\cos^{-1}\\left(\\frac{${adj}}{${hyp}}\\right)=\\underline{\\mathbf{${dp(Math.acos(adj / hyp) * 180 / Math.PI, 0, -1)}^\\circ\\ (2\\ sf)}}\\end{aligned}$$`;
      break;
    case 3:     //3-opp hyp
            case 3: // opp + hyp → find adj + angle
      labels = [
        { text: "θ", x: left + 50, y: bottom - 20 },
        { text: "Adj", x: (right + left) / 2, y: bottom + 30, align: "center" },
        { text: opp + units, x: right + 10, y: (bottom + top) / 2 },
        { text: hyp + units, x: (right + left) / 2 - 5, y: (bottom + top) / 2 - 5, align: "right" }
      ];
      sumq = "For the right-angled triangle shown, find the missing side (rounded to 2 decimal places) and the indicated angle (rounded to 2 significant figures).<br><br>";
      suma = `$$\\begin{aligned}Adj&=\\sqrt{Hyp^2-Opp^2}=\\sqrt{${hyp}^2-${opp}^2}=\\underline{\\mathbf{${dp(Math.sqrt(hyp**2 - opp**2), 2, 2)}${unitsmath}\\ (2\\ dp)}}\\end{aligned}$$
            $$\\begin{aligned}\\theta&=\\sin^{-1}\\left(\\frac{Opp}{Hyp}\\right)=\\sin^{-1}\\left(\\frac{${opp}}{${hyp}}\\right)=\\underline{\\mathbf{${dp(Math.asin(opp / hyp) * 180 / Math.PI, 0, -1)}^\\circ\\ (2\\ sf)}}\\end{aligned}$$`;
      break;
    case 4:     //4-ang adj
            case 4: // ang + adj → find opp + hyp
      labels = [
        { text: ang + "°", x: left + 50, y: bottom - 20 },
        { text: adj + units, x: (right + left) / 2, y: bottom + 30, align: "center" },
        { text: "Opp", x: right + 10, y: (bottom + top) / 2 },
        { text: "Hyp", x: (right + left) / 2 - 5, y: (bottom + top) / 2 - 5, align: "right" }
      ];
      sumq = "For the right-angled triangle shown, find the length of the two missing sides, rounding your answers to 2 decimal places.<br><br>";
      suma = `$$\\begin{aligned}Opp&=Adj\\times\\tan(\\theta)=${adj}\\times\\tan(${ang})=\\underline{\\mathbf{${dp(adj * Math.tan(ang * Math.PI / 180), 2, 2)}${unitsmath}\\ (2\\ dp)}}\\end{aligned}$$
            $$\\begin{aligned}Hyp&=\\frac{Adj}{\\cos(\\theta)}=\\frac{${adj}}{\\cos(${ang})}=\\underline{\\mathbf{${dp(adj / Math.cos(ang * Math.PI / 180), 2, 2)}${unitsmath}\\ (2\\ dp)}}\\end{aligned}$$`;
      break;
    case 5:     //5-ang opp
            case 5: // ang + opp → find adj + hyp
      labels = [
        { text: ang + "°", x: left + 50, y: bottom - 20 },
        { text: "Adj", x: (right + left) / 2, y: bottom + 30, align: "center" },
        { text: opp + units, x: right + 10, y: (bottom + top) / 2 },
        { text: "Hyp", x: (right + left) / 2 - 5, y: (bottom + top) / 2 - 5, align: "right" }
      ];
      sumq = "For the right-angled triangle shown, find the length of the two missing sides, rounding your answers to 2 decimal places.<br><br>";
      suma = `$$\\begin{aligned}Adj&=\\frac{Opp}{\\tan(\\theta)}=\\frac{${opp}}{\\tan(${ang})}=\\underline{\\mathbf{${dp(opp / Math.tan(ang * Math.PI / 180), 2, 2)}${unitsmath}\\ (2\\ dp)}}\\end{aligned}$$
            $$\\begin{aligned}Hyp&=\\frac{Opp}{\\sin(\\theta)}=\\frac{${opp}}{\\sin(${ang})}=\\underline{\\mathbf{${dp(opp / Math.sin(ang * Math.PI / 180), 2, 2)}${unitsmath}\\ (2\\ dp)}}\\end{aligned}$$`;
      break;
    case 6:     //6-ang hyp
            case 6: // ang + hyp → find adj + opp
      labels = [
        { text: ang + "°", x: left + 50, y: bottom - 20 },
        { text: "Adj", x: (right + left) / 2, y: bottom + 30, align: "center" },
        { text: "Opp", x: right + 10, y: (bottom + top) / 2 },
        { text: hyp + units, x: (right + left) / 2 - 5, y: (bottom + top) / 2 - 5, align: "right" }
      ];
      sumq = "For the right-angled triangle shown, find the length of the two missing sides, rounding your answers to 2 decimal places.<br><br>";
      suma = `$$\\begin{aligned}Adj&=Hyp\\times\\cos(\\theta)=${hyp}\\times\\cos(${ang})=\\underline{\\mathbf{${dp(hyp * Math.cos(ang * Math.PI / 180), 2, 2)}${unitsmath}\\ (2\\ dp)}}\\end{aligned}$$
            $$\\begin{aligned}Opp&=Hyp\\times\\sin(\\theta)=${hyp}\\times\\sin(${ang})=\\underline{\\mathbf{${dp(hyp * Math.sin(ang * Math.PI / 180), 2, 2)}${unitsmath}\\ (2\\ dp)}}\\end{aligned}$$`;
      break;

    default:
      sumq = "Find the missing dimensions of the right-angled triangle.<br><br>";
      suma = "$$Solution coming$$";
      labels = [{ text: "θ", x: left + 50, y: bottom - 20 }];
  }

  const notesLink = "images/20200505-MathsBook8Trigv1_3-APO.pdf#page=3";

  return {
    question: sumq,
    solution: suma,
    notesLink,
    canvas: {
      height: 450,
      width: 400,
      withSolution: false,
      draw: (ctx) => drawTriangle(ctx, labels)
    }
  };
}