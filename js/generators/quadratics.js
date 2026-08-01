// js/generators/quadratics.js
import * as utils from '../utils.js';

export function generate() {
  let sumq = "", suma = "";
  let a, b, c, x1, x2;

  do {
    a = 1;
    b = utils.rndgen(-30, 30, 0, 1, -1);
    c = utils.rndgen(-30, 30, 0, 1, -1);

    if (b ** 2 - 4 * a * c >= 0) {
      x1 = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
      x2 = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
    } else {
      x1 = 0;
      x2 = 0;
    }
  } while (
    !Number.isInteger(x1) ||
    !Number.isInteger(x2) ||
    x1 * x2 === 0 ||
    Math.abs(x1) === 1 ||
    Math.abs(x2) === 1
  );

  sumq = "Factorise the following and find the values of x.<br />";
  if (b === 0) {
    sumq += "$$x^2" + utils.cfchk(c, "", 1, 0) + "=0$$";
  } else {
    sumq += "$$x^2" + utils.cfchk(b, "x", 1, 0) + utils.cfchk(c, "", 1, 0) + "=0$$<br />";
  }

  suma = "$$\\begin{aligned}(x" + utils.cfchk(-1 * x1, "", 1, 0) + ")(x" + utils.cfchk(-1 * x2, "", 1, 0) +
         ")&=0 \\\\[15pt] (x" + utils.cfchk(-1 * x1, "", 1, 0) + ")&=0 \\ \\ \\ \\ so\\  x=" + x1;

  if (x1 !== x2) {
    suma += "  \\\\[5pt] or\\ (x" + utils.cfchk(-1 * x2, "", 1, 0) + ")&=0 \\ \\ \\ \\ so\\  x=" + x2 + "\\end{aligned}$$";
  } else {
    suma += "\\end{aligned}$$";
  }

  const notesLink = "images/20200504-MathsBook5AlgebraicOpsv1_3-APO.pdf#page=15";

  return {
    question: sumq,
    solution: suma,
    notesLink
  };
}