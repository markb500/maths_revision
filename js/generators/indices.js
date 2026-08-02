// js/generators/indices.js
// Clean ES module
import { rndgen, gcd2 } from '../utils.js';

function indchk(ltr, r, n, d, type) {
  if (type === 1) {
    if (r === 1) {
      if (d === 1) return ltr + "^{" + n + "}";
      return ltr + "^{\\frac{" + n + "}{" + d + "}}";
    } else if (r === 2) {
      if (d === 1) return "\\sqrt{" + ltr + "^{" + n + "}}";
      return "\\sqrt{" + ltr + "^{\\frac{" + n + "}{" + d + "}}}";
    } else {
      if (d === 1) return "\\sqrt[" + r + "]{" + ltr + "^{" + n + "}}";
      return "\\sqrt[" + r + "]{" + ltr + "^{\\frac{" + n + "}{" + d + "}}}";
    }
  } else if (type === 2) {
    if (d > 1) {
      if (r > 1) return ltr + "^{\\frac{" + n + "}{" + d + "\\times" + r + "}}";
      return ltr + "^{\\frac{" + n + "}{" + d + "}}";
    } else {
      if (r > 1) return ltr + "^{\\frac{" + n + "}{" + r + "}}";
      return ltr + "^{" + n + "}";
    }
  } else {
    if (d > 1) {
      if (r > 1) d = d * r;
    } else {
      if (r > 1) d = r;
    }
    if (d > 1) return "\\frac{" + n + "}{" + d + "}";
    return n;
  }
}

export function generate() {
  let sumq = "", suma = "";
  let ltr, r1, n1, d1, r2, n2, d2, r3, n3, d3, nsoln, dsoln, comfac;

  switch (rndgen(1, 4, 0, 1, -1)) {
    case 1: ltr = "x"; break;
    case 2: ltr = "m"; break;
    case 3: ltr = "a"; break;
    case 4: ltr = "\\omega"; break;
  }

  const sumtype = rndgen(1, 2, 0, 1, -1); // 1 = (a×b)/c   2 = a/(b×c)

  do {
    r1 = rndgen(1, 9, 0, 1, -1);
    do {
      n1 = rndgen(-9, 9, 0, 1, -1);
      d1 = rndgen(1, 9, 0, 1, -1);
    } while (n1 === 0 || Math.abs(n1) === 1 || Math.abs(n1) === Math.abs(r1 * d1));

    r2 = rndgen(1, 9, 0, 1, -1);
    do {
      n2 = rndgen(-9, 9, 0, 1, -1);
      d2 = rndgen(1, 9, 0, 1, -1);
    } while (n2 === 0 || Math.abs(n2) === 1 || Math.abs(n2) === Math.abs(r2 * d2));

    r3 = rndgen(1, 9, 0, 1, -1);
    do {
      n3 = rndgen(-9, 9, 0, 1, -1);
      d3 = rndgen(1, 9, 0, 1, -1);
    } while (n3 === 0 || Math.abs(n3) === 1 || Math.abs(n3) === Math.abs(r3 * d3));

    if (sumtype === 1) {
      nsoln = n1 * (d2 * r2 * d3 * r3) + n2 * (d1 * r1 * d3 * r3) - n3 * (d1 * r1 * d2 * r2);
      dsoln = d1 * r1 * d2 * r2 * d3 * r3;
    } else {
      nsoln = (n1 * d2 * r2 * d3 * r3) - (n2 * d1 * r1 * d3 * r3 + n3 * d1 * r1 * d2 * r2);
      dsoln = d1 * r1 * d2 * r2 * d3 * r3;
    }
  } while (
    Math.abs(nsoln) > 35 || Math.abs(dsoln) > 10 || Math.abs(nsoln) === Math.abs(dsoln) ||
    nsoln === 0 || dsoln === 0 ||
    (d1 * r1) === (d2 * r2) ||
    (Math.abs(n1) === Math.abs(n2) && d1 === d2) ||
    (Math.abs(n1) === Math.abs(n3) && d1 === d3) ||
    (Math.abs(n2) === Math.abs(n3) && d2 === d3)
  );

  // Simplify the solution fraction
  comfac = gcd2(Math.abs(nsoln), Math.abs(dsoln));
  while (comfac !== 1) {
    nsoln = nsoln / comfac;
    dsoln = dsoln / comfac;
    comfac = gcd2(Math.abs(nsoln), Math.abs(dsoln));
  }
  if (nsoln > 0 && dsoln < 0) {
    nsoln = -nsoln;
    dsoln = -dsoln;
  }

  if (sumtype === 1) {
    sumq = "Simplify the following expression.";
    sumq += "$$\\frac{" + indchk(ltr, r1, n1, d1, 1) + "\\times " + indchk(ltr, r2, n2, d2, 1) + "}{" + indchk(ltr, r3, n3, d3, 1) + "}$$";

    if (r1 > 1 || r2 > 1 || r3 > 1) {
      suma = "$$\\begin{aligned}&=\\frac{" + indchk(ltr, r1, n1, d1, 2) + "\\times " + indchk(ltr, r2, n2, d2, 2) + "}{" + indchk(ltr, r3, n3, d3, 2) + "}\\\\[5pt]";
    } else {
      suma = "$$\\begin{aligned}";
    }
    suma += "&=" + ltr + "^{" + indchk(ltr, r1, n1, d1, 3) + "+" + indchk(ltr, r2, n2, d2, 3) + "-" + indchk(ltr, r3, n3, d3, 3) + "}\\\\[5pt]";
  } else {
    sumq = "Simplify the following expression.";
    sumq += "$$\\frac{" + indchk(ltr, r1, n1, d1, 1) + "}{" + indchk(ltr, r2, n2, d2, 1) + "\\times " + indchk(ltr, r3, n3, d3, 1) + "}$$";

    if (r1 > 1 || r2 > 1 || r3 > 1) {
      suma = "$$\\begin{aligned}&=\\frac{" + indchk(ltr, r1, n1, d1, 2) + "}{" + indchk(ltr, r2, n2, d2, 2) + "\\times " + indchk(ltr, r3, n3, d3, 2) + "}\\\\[5pt]";
    } else {
      suma = "$$\\begin{aligned}";
    }
    suma += "&=" + ltr + "^{" + indchk(ltr, r1, n1, d1, 3) + "-(" + indchk(ltr, r2, n2, d2, 3) + "+" + indchk(ltr, r3, n3, d3, 3) + ")}\\\\[5pt]";
  }

  if (dsoln === 1) {
    suma += "&=" + ltr + "^{" + nsoln + "}\\end{aligned}$$";
  } else {
    suma += "&=" + ltr + "^{\\frac{" + nsoln + "}{" + dsoln + "}}\\end{aligned}$$";
  }

  const notesLink = "images/20200504-MathsBook3Indicesv1_3-APO.pdf#page=4";

  return { question: sumq, solution: suma, notesLink };
}