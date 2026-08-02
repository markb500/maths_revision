// js/generators/noncalc.js
// Clean ES module
import { rndgen, dp, cfchk, QLimitRepeats } from '../utils.js';

let recentIds = [];

export function generate() {
  let sumq = "", suma = "", notesLink;
      let a, b, c, d, e;
  recentIds = QLimitRepeats(recentIds, 5);

  const sum = recentIds[recentIds.length - 1];

  switch (sum) {
    case 1:
      do {
        a = rndgen(-10, 10, 2, 0.01, -1);
        b = rndgen(0.1, 9.9, 2, 0.01, -1);
        c = rndgen(-10, 10, 2, 0.01, -1);
        d = rndgen(-0.9, 0.9, 1, 0.1, -1);
      } while (a * b * c * d === 0 || a === 1 || Math.abs(d) === 0.1 || Math.abs(b + c) === Math.abs(d) ||
               (b + c) / d - dp((b + c) / d, 3, -1) !== 0 || (b + c) / d === 0 ||
               (a * (b + c) / d) - dp(a * (b + c) / d, 2, -1) !== 0);

      sumq = `Calculate the following, without using a calculator. Show all your working.<br />
              $$ ${a} \\times \\frac{${b} ${cfchk(c, "", 0, 0)}}{${d}} $$`;

      suma = `$$\\begin{aligned} &= ${a} \\times \\frac{${dp(b + c, 2, -1)}}{${d}} \\\\[5pt]
             &= ${a} \\times ${dp((b + c) / d, 3, -1)} \\\\[5pt]
             &= \\underline{\\mathbf{${dp(a * (b + c) / d, 2, -1)}}} \\end{aligned}$$`;

      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=7";
      break;
    case 2:
      //a + b / c x d
      do {
          a = rndgen(0.1, 9.9, 2, 0.01, -1);
          b = rndgen(-10, 10, 2, 0.01, -1);
          c = rndgen(-0.9, 0.9, 1, 0.1, -1);
          d = rndgen(-10, 10, 2, 0.01, -1);
      }while (a * b * c * d === 0 ||
          Math.abs(c) === 0.1 ||
          d === 1 ||
          Math.abs(a + b) === Math.abs(c) ||
          (a + b) / c - dp((a + b) / c, 3, -1) !== 0 ||
          (a + b) / c === 0 ||
          (a + b) / c * d - dp((a + b) / c * d, 2, -1) !== 0)
  
      sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
      sumq += "$$\\frac {" + a + cfchk(b, "", 0, 0) + "}{" + c + "}\\times" + d + "$$<br />";            
  
      suma += "$$\\begin{aligned}&=\\frac {" + dp(a + b, 2, -1) + "}{" + c + "}\\times" + d + " \\\\[5pt]";
      suma += "&=" + dp((a + b) / c, 3, -1) + "\\times" + d + " \\\\[5pt]";
      suma += "&=\\underline{\\mathbf{" + dp((a + b) / c * d, 2, -1) + "}}\\end{aligned}$$";
      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=7";
      break;
    case 3:
      //a / b + c x d
      do {
          a = rndgen(0.1, 9.9, 2, 0.01, -1);
          b = rndgen(-10, 10, 1, 0.1, -1);
          c = rndgen(-0.9, 0.9, 1, 0.1, -1);
          d = rndgen(-10, 10, 2, 0.01, -1);
      }while (a * b * c * d === 0 ||
          d === 1 ||
          Math.abs(b + c) === 0.1 ||
          Math.abs(b + c) === 1 ||
          Math.abs(a) === Math.abs(b + c) ||
          a / (b + c) - dp(a / (b + c), 3, -1) !== 0 ||
          a / (b + c) === 0 ||
          a / (b + c) * d - dp(a / (b + c) * d, 2, -1) !== 0)
  
      sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
      sumq += "$$\\frac {" + a + "}{" + b + cfchk(c, "", 0, 0) + "}\\times" + d + "$$<br />";            
  
      suma += "$$\\begin{aligned}&=\\frac {" + a + "}{" + dp(b + c, 2, -1) + "}\\times" + d + " \\\\[5pt]";
      suma += "&=" + dp(a / (b + c), 3, -1) + "\\times" + d + " \\\\[5pt]";
      suma += "&=\\underline{\\mathbf{" + dp(a / (b + c) * d, 2, -1) + "}}\\end{aligned}$$";
      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=7";
      break;
    case 4:
      //a + b(c + d) / e
      do {
          a = rndgen(1, 20, 0, 1, -1);
          b = rndgen(-10, 10, 0, 1, -1);
          c = rndgen(1, 10, 2, 0.01, -1);
          d = rndgen(-10, 10, 2, 0.01, -1);
          e = rndgen(-0.99, 0.99, 2, 0.01, -1);
      }while (a * b * c * d * e === 0 ||
              b === 1 ||
              c + d === 0 ||
              b * (c + d) === 0 ||
              b * (c + d) / e === 0 ||
              b * (c + d) - dp(b *(c + d), 2, -1) !== 0 ||
              b * (c + d) / e - dp(b *(c + d) / e, 2, -1) !== 0 ||
              (c + d) / e - dp((c + d) / e, 2, -1) !== 0 ||
              (c + d) / e - dp((c + d) / e, 0, -1) !== 0 ||
              Math.abs((c + d)) === Math.abs(e))
  
      sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
      sumq += "$$" + a + cfchk(b, "", 0, 0) + "(" + c + cfchk(d, "", 0, 0) + ")\\div" + e + "$$<br />";
  
      suma += "$$\\begin{aligned}&=" + a + cfchk(b, "", 0, 0) + "\\times" + 
                  dp(c + d, 2, -1) + "\\div" + e + "\\\\[5pt]";
      suma += "&=" + a + cfchk(b * (c + d), "", 0, 0) + "\\div" + e + "\\\\[5pt]";
      suma += "&=" + a + cfchk(b * (c + d) / e, "", 0, 0) + "\\\\[5pt]";
      suma += "&=\\underline{\\mathbf{" + dp(a + b * (c + d) / e, 2, -1) + "}}\\end{aligned}$$"
      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=54";
      break;
    case 5:
      //a / b + c(d + e)
      do {
          a = rndgen(1, 20, 0, 1, -1);
          b = rndgen(-0.99, 0.99, 2, 0.01, -1);
          c = rndgen(-10, 10, 0, 1, -1);
          d = rndgen(1, 10, 2, 0.01, -1);
          e = rndgen(-10, 10, 2, 0.01, -1);
      }while (a * b * c * d * e === 0 ||
              Math.abs(b) === 0.1 ||
              Math.abs(b) === 0.01 ||
              d + e === 0 ||
              Math.abs(d + e) === 1 ||
              Math.abs(a) === Math.abs(b) ||
              a / b - dp(a / b, 3, -1) !== 0 ||
              c / (d + e) - dp(c / (d + e), 3, -1) !== 0 ||
              a / b + c * (d + e) - dp(a / b + c * (d + e), 2, -1) !== 0)
  
      sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
      sumq += "$$" + a + "\\div" + b + cfchk(c, "", 0, 0) + "(" + d + cfchk(e, "", 0, 0) + ")$$<br />";
  
      suma += "$$\\begin{aligned}&=" + a + "\\div" + b + cfchk(c, "", 0, 0) + "\\times" + dp(d + e, 2, -1) + "\\\\[5pt]";
      suma += "&=" + dp(a/b, 3, -1) + cfchk(c, "", 0, 0) + "\\times" + dp(d + e, 2, -1) + "\\\\[5pt]";
      suma += "&=" + dp(a/b, 3, -1) + cfchk(dp(c * (d + e), 3, -1), "", 0, 0) + "\\\\[5pt]";
      suma += "&=\\underline{\\mathbf{" + dp(a / b + c * (d + e), 2, -1) + "}}\\end{aligned}$$"
      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=54";
      break;

    default:
      sumq = "Non-calculator question (other cases coming)";
      suma = "$$Solution coming soon$$";
      notesLink = "#";
  }

  return { question: sumq, solution: suma, notesLink };
}