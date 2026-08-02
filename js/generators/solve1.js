// js/generators/solve1.js
// Clean ES module
import { rndgen, dp, cfchk, op } from '../utils.js';

export function generate() {
  let sumq = "", suma = "";
  let a, b, c, d, e, f, x, s1, type, ltr;

  do {
    sumq = "";
    suma = "";

    // Choose variable letter
    switch (rndgen(1, 4, 0, 1, -1)) {
      case 1: ltr = "x"; break;
      case 2: ltr = "m"; break;
      case 3: ltr = "a"; break;
      case 4: ltr = "\\omega"; break;
    }

    do {
      do {
        a = rndgen(-9, 9, 0, 1, -1);
        b = rndgen(-9, 9, 0, 1, -1);
        d = rndgen(-9, 9, 0, 1, -1);
        e = rndgen(-9, 9, 0, 1, -1);
      } while (a * b * d * e === 0);

      c = rndgen(2, 9, 0, 1, -1);
      f = rndgen(2, 9, 0, 1, -1);
      s1 = rndgen(0, 1, 0, 1, -1);
      type = rndgen(1, 4, 0, 1, -1);
    } while (c === f || Math.abs(b * f) === Math.abs(c * d));

    sumq += "Find the value of \\(" + ltr + "\\) in the following equation.";

    if (type === 1 || type === 2) {
      // Variable expressions on top
      if (type === 1) {
        sumq += "$$\\frac{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + "}{" + c + "}" +
                op(s1) +
                "\\frac{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}{" + f + "}=0$$";

        if (!s1) {
          d = -d;
          e = -e;
        }

        suma += "$$\\begin{aligned}\\frac{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + "}{" + c +
                "}&=\\frac{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}{" + f + "}\\\\[5pt]";
        suma += f + "(" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + ")&=" +
                c + "(" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + ")\\\\[5pt]";
      } else {
        if (!s1) {
          d = -d;
          e = -e;
        }
        sumq += "$$\\frac{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + "}{" + c +
                "}=\\frac{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}{" + f + "}$$";

        suma += "$$\\begin{aligned}" + f + "(" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + ")&=" +
                c + "(" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + ")\\\\[5pt]";
      }

      suma += cfchk(a * f, ltr, 1, 1) + cfchk(b * f, "", 0, 0) + "&=" +
              cfchk(c * d, "", 0, 1) + cfchk(c * e, ltr, 1, 0) + "\\\\[5pt]";

      b = -b;
      e = -e;

      suma += cfchk(a * f, ltr, 1, 1) + cfchk(c * e, ltr, 1, 0) + "&=" +
              cfchk(c * d, "", 0, 1) + cfchk(b * f, "", 0, 0) + "\\\\[5pt]";

      if (a * f + c * e === 1) {
        suma += cfchk(a * f + c * e, ltr, 1, 1) + "&=\\underline{\\mathbf{" +
                cfchk(c * d + b * f, "", 0, 1) + "}}\\end{aligned}$$";
      } else {
        suma += cfchk(a * f + c * e, ltr, 1, 1) + "&=" +
                cfchk(c * d + b * f, "", 0, 1) + "\\\\[5pt]";
        suma += ltr + "&=\\frac{" + cfchk(c * d + b * f, "", 0, 1) + "}{" +
                cfchk(a * f + c * e, "", 0, 1) + "}\\\\[5pt]";
        suma += ltr + "&=\\underline{\\mathbf{" +
                cfchk((c * d + b * f) / (a * f + c * e), "", 0, 1) + "}}\\end{aligned}$$";
      }
      x = (c * d + b * f) / (a * f + c * e);
    } else {
      // Variable expressions on bottom (types 3 & 4)
      if (type === 3) {
        sumq += "$$\\frac{" + c + "}{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + "}" +
                op(s1) +
                "\\frac{" + f + "}{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}=0$$";
        if (!s1) f = -f;

        suma += "$$\\begin{aligned}\\frac{" + c + "}{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) +
                "}&=\\frac{" + f + "}{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}\\\\[5pt]";
        suma += c + "(" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) +
                ")&=" + f + "(" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + ")\\\\[5pt]";
      } else {
        sumq += "$$\\frac{" + c + "}{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) +
                "}=\\frac{" + f + "}{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}$$";

        suma += "$$\\begin{aligned}" + c + "(" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) +
                ")&=" + f + "(" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + ")\\\\[5pt]";
      }

      suma += cfchk(c * d, "", 0, 1) + cfchk(c * e, ltr, 1, 0) +
              "&=" + cfchk(a * f, ltr, 1, 1) + cfchk(b * f, "", 0, 0) + "\\\\[5pt]";

      d = -d;
      a = -a;

      suma += cfchk(c * e, ltr, 1, 1) + cfchk(a * f, ltr, 1, 0) +
              "&=" + cfchk(b * f, "", 0, 1) + cfchk(c * d, "", 0, 0) + "\\\\[5pt]";

      suma += cfchk(c * e + a * f, ltr, 1, 1) + "&=" + cfchk(b * f + c * d, "", 0, 1) + "\\\\[5pt]";
      suma += ltr + "&=\\frac{" + cfchk(b * f + c * d, "", 0, 1) + "}{" +
              cfchk(c * e + a * f, "", 0, 1) + "}\\\\[5pt]";
      suma += ltr + "&=\\underline{\\mathbf{" + ((b * f + c * d) / (c * e + a * f)) + "}}\\end{aligned}$$";
      x = (b * f + c * d) / (c * e + a * f);
    }
  } while (
    (x - dp(x, 3, -1) !== 0) ||
    ((c * d + b * f) === (a * f + c * e))
  );

  const notesLink = "images/20200504-MathsBook5AlgebraicOpsv1_3-APO.pdf#page=24";

  return {
    question: sumq,
    solution: suma,
    notesLink
  };
}