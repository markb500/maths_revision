// js/generators/numform.js
// Clean ES module
import { rndgen, dp } from '../utils.js';

function sciengnot(num, pwr) {
  const logten = Math.floor(Math.log10(Math.abs(num)));
  const scinum = dp(num / Math.pow(10, logten), 5, -1);
  const scipwr = pwr + logten;
  const scimod = scipwr - 3 * Math.floor(scipwr / 3);
  const engnum = dp(scinum * Math.pow(10, scimod), 5, -1);
  const engpwr = scipwr - scimod;
  return [scinum, scipwr, engnum, engpwr];
}

function pwrzero(num, pwr) {
  if (pwr === 0) return num;
  return num + "\\times 10^{" + pwr + "}";
}

export function generate() {
  let sumq = "", suma = "";
  const tmp = rndgen(1, 2, 0, 1, -1);

  if (tmp === 1) { // multiply
    let num1, num2;
    do {
      num1 = rndgen(10.5, 500, 1, 0.1, -1);
      num2 = rndgen(0.5, 4.5, 1, 0.1, -1);
    } while (num1 === 1 || num2 - dp(num2, 0, -1) === 0);

    const pwr1 = rndgen(-5, 5, 0, 1, -1);
    const pwr2 = rndgen(-5, 5, 0, 1, -1);
    const num = dp(num1 * num2, 2, -1);
    const pwr = pwr1 + pwr2;
    const results = sciengnot(num, pwr);

    sumq = "Without using a calculator, calculate the following, giving your answer in both Standard Form (Scientific Notation) and Preferred Standard Form (Engineering Notation). Show all your working<br>";
    sumq += "$$" + pwrzero(num1, pwr1) + "\\ \\ \\times\\ \\ " + pwrzero(num2, pwr2) + "$$<br>";

    suma = "$$\\begin{aligned}&=" + num1 + "\\times" + num2 + "\\times 10^{" + pwr1 + "\\ +\\ " + pwr2 + "}\\\\[5pt]";
    suma += "&=" + num + "\\times 10^{" + pwr + "}\\\\[5pt]";
    suma += "In\\ Scientific\\ Notation &=\\underline{\\mathbf{" + results[0] + "\\times 10^{" + results[1] + "}}}\\\\[5pt]";
    suma += "In\\ Engineering\\ Notation &=\\underline{\\mathbf{" + results[2] + "\\times 10^{" + results[3] + "}}}\\\\[5pt]";
    suma += "\\end{aligned}$$";
  } else { // divide
    let num1, num2;
    do {
      num1 = rndgen(10.5, 500, 1, 0.1, -1);
      num2 = rndgen(0.5, 4.5, 1, 0.1, -1);
    } while (
      num1 === 1 ||
      num2 - dp(num2, 0, -1) === 0 ||
      (num1 / num2) - dp(num1 / num2, 0, -1) === 0 ||
      (num1 / num2) - dp(num1 / num2, 2, -1) !== 0
    );

    const pwr1 = rndgen(-5, 5, 0, 1, -1);
    const pwr2 = rndgen(-5, 5, 0, 1, -1);
    const num = dp(num1 / num2, 2, -1);
    const pwr = pwr1 - pwr2;
    const results = sciengnot(num, pwr);

    sumq = "Without using a calculator, calculate the following, giving your answer in both Standard Form (Scientific Notation) and Preferred Standard Form (Engineering Notation). Show all your working<br>";
    sumq += "$$\\frac{" + pwrzero(num1, pwr1) + "}{" + pwrzero(num2, pwr2) + "}$$<br>";

    suma = "$$\\begin{aligned}&=\\frac{" + num1 + "}{" + num2 + "}\\times 10^{" + pwr1 + "\\ -\\ " + pwr2 + "}\\\\[5pt]";
    suma += "&=" + num + "\\times 10^{" + pwr + "}\\\\[5pt]";
    suma += "In\\ Scientific\\ Notation &=\\underline{\\mathbf{" + results[0] + "\\times 10^{" + results[1] + "}}}\\\\[5pt]";
    suma += "In\\ Engineering\\ Notation &=\\underline{\\mathbf{" + results[2] + "\\times 10^{" + results[3] + "}}}\\\\[5pt]";
    suma += "\\end{aligned}$$";
  }

  const notesLink = "images/20200504-MathsBook3Indicesv1_3-APO.pdf#page=10";

  return { question: sumq, solution: suma, notesLink };
}