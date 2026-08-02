// js/generators/hcflcm.js
// Clean ES module
import { rndgen, gcd, lcm, chkpwr } from '../utils.js';

let prevnum = 0;
let term1 = [], term2 = [], term3 = [], hcf = [], lcmArr = [];

function primeFactors(n) {
  let arr = [];
  let i = 2;
  while (i <= n) {
    if (n % i === 0) {
      n = n / i;
      arr.push(i);
    } else {
      i++;
    }
  }
  return arr;
}

function primeExponents(arr) {
  const count = {};
  arr.forEach(i => { count[i] = (count[i] || 0) + 1; });
  return count;
}

function primeTree(ctx, term, primefacs, primesexp, x, y) {
  let num = term[0];
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  ctx.textAlign = "left";
  ctx.font = "bold 22px STIX Two Math";
  ctx.fillText(term[0], x, y);
  ctx.font = "20px STIX Two Math";

  for (let i = 0; i < primefacs.length - 1; i++) {
    y += 50;
    num /= primefacs[i];
    ctx.fillText(primefacs[i], x - 50, y);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - 47);
    ctx.lineTo(x - 35, y - 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 10, y - 47);
    ctx.lineTo(x + 10, y - 20);
    ctx.stroke();
    ctx.fillText(num, x, y);
  }

  let str = "";
  for (let j in primesexp) {
    if (primesexp[j] === 1) str += j + ", ";
    else if (primesexp[j] === 2) str += j + "², ";
    else if (primesexp[j] === 3) str += j + "³, ";
    else if (primesexp[j] === 4) str += j + "⁴, ";
    else if (primesexp[j] === 5) str += j + "⁵, ";
    else if (primesexp[j] === 6) str += j + "⁶, ";
    else if (primesexp[j] === 7) str += j + "⁷, ";
    else if (primesexp[j] === 8) str += j + "⁸, ";
    else if (primesexp[j] === 9) str += j + "⁹, ";
  }
  str = str.slice(0, -2);
  ctx.fillText(str, x - 50, 330);
  return str;
}

export function generate() {
  let sumq = "", suma = "";
  let ltrsel, sign1, sign2;

  do {
    hcf[0] = rndgen(2, 11, 0, 1, -1);
    term1[0] = hcf[0] * rndgen(1, 8, 0, 1, -1);
    term2[0] = hcf[0] * rndgen(1, 8, 0, 1, -1);
    term3[0] = hcf[0] * rndgen(1, 8, 0, 1, -1);
    lcmArr[0] = lcm([term1[0], term2[0], term3[0]]);
    hcf[0] = gcd([term1[0], term2[0], term3[0]]);
  } while (
    term1[0] === term2[0] || term1[0] === term3[0] || term2[0] === term3[0] ||
    hcf[0] === term1[0] || hcf[0] === term2[0] || hcf[0] === term3[0] ||
    hcf[0] === 10
  );

  const primeFacs1 = primeFactors(term1[0]);
  const primeFacs2 = primeFactors(term2[0]);
  const primeFacs3 = primeFactors(term3[0]);
  const primesExp1 = primeExponents(primeFacs1);
  const primesExp2 = primeExponents(primeFacs2);
  const primesExp3 = primeExponents(primeFacs3);

  for (let i = 2; i < 9; i += 2) {
    term1[i] = rndgen(0, 6, 0, 1, -1);
    term2[i] = rndgen(0, 6, 0, 1, -1);
    term3[i] = rndgen(0, 6, 0, 1, -1);
  }

  sign1 = rndgen(1, 2, 0, 1, -1) === 1 ? "+" : "-";
  sign2 = rndgen(1, 2, 0, 1, -1) === 1 ? "+" : "-";

  do {
    ltrsel = rndgen(1, 3, 0, 1, -1);
  } while (prevnum === ltrsel);
  prevnum = ltrsel;

  const letters = ltrsel === 1 ? ["a","b","c","d"] :
                  ltrsel === 2 ? ["w","x","y","z"] :
                                 ["α","μ","ρ","ω"];

  term1[1] = term2[1] = term3[1] = letters[0];
  term1[3] = term2[3] = term3[3] = letters[1];
  term1[5] = term2[5] = term3[5] = letters[2];
  term1[7] = term2[7] = term3[7] = letters[3];

  for (let j = 2; j < 9; j += 2) {
    hcf[j - 1] = term1[j - 1];
    hcf[j] = Math.min(term1[j], term2[j], term3[j]);
    lcmArr[j - 1] = term1[j - 1];
    lcmArr[j] = Math.max(term1[j], term2[j], term3[j]);
  }

  sumq = "Find the HCF & LCM, without using a calculator, and factorise the expression.";
  sumq += "$$" + term1[0] + chkpwr(term1[1], term1[2]) + chkpwr(term1[3], term1[4]) +
          chkpwr(term1[5], term1[6]) + chkpwr(term1[7], term1[8]) + sign1 +
          term2[0] + chkpwr(term2[1], term2[2]) + chkpwr(term2[3], term2[4]) +
          chkpwr(term2[5], term2[6]) + chkpwr(term2[7], term2[8]) + sign2 +
          term3[0] + chkpwr(term3[1], term3[2]) + chkpwr(term3[3], term3[4]) +
          chkpwr(term3[5], term3[6]) + chkpwr(term3[7], term3[8]) + "$$";

  suma = "$$\\begin{aligned}HCF&=" + hcf[0] + chkpwr(hcf[1], hcf[2]) + chkpwr(hcf[3], hcf[4]) +
         chkpwr(hcf[5], hcf[6]) + chkpwr(hcf[7], hcf[8]) + "\\\\" +
         "LCM&=" + lcmArr[0] + chkpwr(lcmArr[1], lcmArr[2]) + chkpwr(lcmArr[3], lcmArr[4]) +
         chkpwr(lcmArr[5], lcmArr[6]) + chkpwr(lcmArr[7], lcmArr[8]) + "\\\\" +
         "&" + hcf[0] + chkpwr(hcf[1], hcf[2]) + chkpwr(hcf[3], hcf[4]) +
         chkpwr(hcf[5], hcf[6]) + chkpwr(hcf[7], hcf[8]) +
         "\\left(" + (term1[0]/hcf[0]) + chkpwr(term1[1], term1[2]-hcf[2]) +
         chkpwr(term1[3], term1[4]-hcf[4]) + chkpwr(term1[5], term1[6]-hcf[6]) +
         chkpwr(term1[7], term1[8]-hcf[8]) + sign1 +
         (term2[0]/hcf[0]) + chkpwr(term2[1], term2[2]-hcf[2]) +
         chkpwr(term2[3], term2[4]-hcf[4]) + chkpwr(term2[5], term2[6]-hcf[6]) +
         chkpwr(term2[7], term2[8]-hcf[8]) + sign2 +
         (term3[0]/hcf[0]) + chkpwr(term3[1], term3[2]-hcf[2]) +
         chkpwr(term3[3], term3[4]-hcf[4]) + chkpwr(term3[5], term3[6]-hcf[6]) +
         chkpwr(term3[7], term3[8]-hcf[8]) + "\\right)\\end{aligned}$$";

  const notesLink = "images/20200504-MathsBook4HCFLCMFactv1_5-APO.pdf#page=3";

  return {
    question: sumq,
    solution: suma,
    notesLink,
    canvas: {
      height: 350,
      width: 500,
      withSolution: true,
      draw: (ctx) => {
        ctx.clearRect(0, 0, 500, 350);
        primeTree(ctx, term1, primeFacs1, primesExp1, 75, 50);
        primeTree(ctx, term2, primeFacs2, primesExp2, 250, 50);
        primeTree(ctx, term3, primeFacs3, primesExp3, 425, 50);
      }
    }
  };
}