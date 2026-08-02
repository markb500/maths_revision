// js/generators/percentratio.js
// Clean ES module
import { rndgen, dp, gcd2, QLimitRepeats } from '../utils.js';

let recentIds = [];
const ratunits = ["&nbsp;m", "&nbsp;N", "&nbsp;kg", "£", "\\ m", "\\ N", "\\ kg", "£"];

export function generate() {
  let sumq = "", suma = "", notesLink;
  let num1, num2, pct, rat1, rat2, rat3, iratunit, comdenom;

  recentIds = QLimitRepeats(recentIds, 6);
  const sum = recentIds[recentIds.length - 1];

  switch (sum) {
    case 1: // express num1 as % of num2
      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=50";
      num1 = rndgen(1, 5, 1, 0.1, -1);
      num2 = rndgen(num1 + 0.4, 8, 1, 0.1, -1);
      sumq = `Without using a calculator, express ${num1} as a percentage of ${num2}, giving your answer rounded to 1 decimal place.`;
      suma = `$$\\frac{${num1}}{${num2}}\\times 100=${dp((num1 / num2) * 100, 1, 1)}\\ \\%\\ (1\\ dp)$$`;
      break;

    case 2: // p % of num1
      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=50";
      do {
        pct = rndgen(3, 99, 0, 1, -1);
      } while (pct === 10 || pct === 25 || pct === 50 || pct === 75);
      num1 = rndgen(16, 51, 0, 1, -1);
      sumq = `Calculate, without using a calculator, ${pct}&nbsp;% of ${num1}, rounding your answer to 1 decimal place.`;
      suma = `$$\\frac{${pct}}{100}\\times${num1}=${dp((pct / 100) * num1, 1, 1)}\\ (1\\ dp)$$`;
      break;

    case 3: // % as fraction
      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=50";
      pct = rndgen(3, 99, 0, 1, -1);
      comdenom = gcd2(pct, 100);
      sumq = `Without using a calculator, express ${pct}&nbsp;% as a proper fraction in its simplest form.`;
      suma = `$$\\frac{${pct}}{100}=\\frac{${pct / comdenom}}{${100 / comdenom}}$$`;
      break;

    case 4: // increase by %
      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=50";
      num1 = rndgen(20, 80, 0, 1, -1);
      pct = rndgen(5, 40, 0, 5, -1);
      sumq = `Without using a calculator, increase ${num1} by ${pct}&nbsp;% and give your answer to 1 decimal place.`;
      suma = `$$${num1}\\times\\left(1+\\frac{${pct}}{100}\\right)=${dp(num1 * (1 + pct / 100), 1, 1)}\\ (1\\ dp)$$`;
      break;

    case 5: // decrease by %
      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=50";
      num1 = rndgen(30, 90, 0, 1, -1);
      pct = rndgen(5, 35, 0, 5, -1);
      sumq = `Without using a calculator, decrease ${num1} by ${pct}&nbsp;% and give your answer to 1 decimal place.`;
      suma = `$$${num1}\\times\\left(1-\\frac{${pct}}{100}\\right)=${dp(num1 * (1 - pct / 100), 1, 1)}\\ (1\\ dp)$$`;
      break;

    case 6: // ratio division
      notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=52";
      do {
        num1 = rndgen(48, 91, 0, 1, -1);
        rat1 = rndgen(1, 10, 0, 1, -1);
        rat2 = rndgen(1, 10, 0, 1, -1);
        rat3 = rndgen(1, 10, 0, 1, -1);
      } while (num1 % (rat1 + rat2 + rat3) !== 0 || num1 === (rat1 + rat2 + rat3) ||
               rat1 === rat2 || rat1 === rat3 || rat2 === rat3);

      iratunit = rndgen(0, 3, 0, 1, -1);
      const total = rat1 + rat2 + rat3;

      if (iratunit < 3) {
        sumq = `Without using a calculator, divide ${num1}${ratunits[iratunit]} in the ratio ${rat1}:${rat2}:${rat3}.`;
        suma = `$$${rat1}+${rat2}+${rat3}=${total}$$`;
        suma += `$$ \\frac{${num1}}{${total}} \\times${rat1}=${dp(num1 * (rat1 / total), 0, -1)}${ratunits[iratunit + 4]}$$`;
        suma += `$$ \\frac{${num1}}{${total}} \\times${rat2}=${dp(num1 * (rat2 / total), 0, -1)}${ratunits[iratunit + 4]}$$`;
        suma += `$$ \\frac{${num1}}{${total}} \\times${rat3}=${dp(num1 * (rat3 / total), 0, -1)}${ratunits[iratunit + 4]}$$`;
      } else {
        sumq = `Without using a calculator, divide ${ratunits[iratunit]}${num1.toFixed(2)} in the ratio ${rat1}:${rat2}:${rat3}.`;
        suma = `$$${rat1}+${rat2}+${rat3}=${total}$$`;
        suma += `$$ \\frac{${num1}}{${total}} \\times${rat1}=${ratunits[iratunit + 4]}${dp(num1 * (rat1 / total), 2, 2)}$$`;
        suma += `$$ \\frac{${num1}}{${total}} \\times${rat2}=${ratunits[iratunit + 4]}${dp(num1 * (rat2 / total), 2, 2)}$$`;
        suma += `$$ \\frac{${num1}}{${total}} \\times${rat3}=${ratunits[iratunit + 4]}${dp(num1 * (rat3 / total), 2, 2)}$$`;
      }
      break;
  }

  return { question: sumq, solution: suma, notesLink };
}