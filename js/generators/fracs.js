// js/generators/fracs.js
// Three mixed numbers with two operators (+ − × ÷).
import { rndgen, gcd2, lcm2, lcm } from '../utils.js';

const NOTES = 'images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=22';

const OP = { ADD: 1, SUB: 2, MUL: 3, DIV: 4 };
const OP_TEX = { 1: '+', 2: '-', 3: '\\times', 4: '\\div' };

/** Mixed number as [whole, numerator, denominator] — same layout as original arrays. */
function randomMixed() {
  const den = rndgen(2, 9, 0, 1, -1);
  const num = rndgen(1, den - 1, 0, 1, -1);
  const whole = rndgen(1, 4, 0, 1, -1);
  return [whole, num, den];
}

function improperValue(f) {
  return f[0] * f[2] + f[1];
}

function toImproperInPlace(f) {
  f[1] = f[0] * f[2] + f[1];
  f[0] = 0;
}

/** Reduce fraction components in place by gcd; returns true if anything changed. */
function cancelInPlace(a, b, getA, setA, getB, setB) {
  let g = gcd2(Math.abs(getA()), Math.abs(getB()));
  let changed = false;
  while (g > 1) {
    setA(getA() / g);
    setB(getB() / g);
    g = gcd2(Math.abs(getA()), Math.abs(getB()));
    changed = true;
  }
  return changed;
}

function cancelSelf(f) {
  return cancelInPlace(
    f, f,
    () => f[1], (v) => { f[1] = v; },
    () => f[2], (v) => { f[2] = v; }
  );
}

function cancelAcross(fA, fB) {
  // num of A with den of B
  const c1 = cancelInPlace(
    fA, fB,
    () => fA[1], (v) => { fA[1] = v; },
    () => fB[2], (v) => { fB[2] = v; }
  );
  // num of B with den of A
  const c2 = cancelInPlace(
    fB, fA,
    () => fB[1], (v) => { fB[1] = v; },
    () => fA[2], (v) => { fA[2] = v; }
  );
  return c1 || c2;
}

function flipForDivide(f) {
  const tmp = f[1];
  f[1] = f[2];
  f[2] = tmp;
}

function pickOperators() {
  const sign1 = rndgen(1, 4, 0, 1, -1);
  const sign2 = sign1 < 3 ? rndgen(1, 4, 0, 1, -1) : rndgen(3, 4, 0, 1, -1);
  return { sign1, sign2, op1: OP_TEX[sign1], op2: OP_TEX[sign2] };
}

function fractionsValid(f1, f2, f3, sign1, sign2) {
  if (gcd2(f1[1], f1[2]) !== 1) return false;
  if (gcd2(f2[1], f2[2]) !== 1) return false;
  if (gcd2(f3[1], f3[2]) !== 1) return false;
  if (improperValue(f1) - improperValue(f2) === 0) return false;
  if (improperValue(f1) - improperValue(f3) === 0) return false;
  if (improperValue(f2) - improperValue(f3) === 0) return false;
  if (sign1 < 3 && f1[2] === f2[2]) return false;
  if (sign2 < 3 && f2[2] === f3[2]) return false;
  return true;
}

/**
 * Final mixed-number tidy (improper, sign, cancel) — same rules as original.
 * @returns {{ ans: number[], changed: boolean }}
 */
function finalSimplify(ans1) {
  let anscx = false;
  const ans = [ans1[0], ans1[1], ans1[2]];

  if (Math.abs(ans[1]) > Math.abs(ans[2])) {
    ans[0] += (ans[1] - (ans[1] % ans[2])) / ans[2];
    ans[1] = ans[1] % ans[2];
    anscx = true;
  }

  let anstot;
  if (ans[1] < 0 && ans[0] > 0) {
    anstot = [ans[0] - 1, ans[2] + ans[1], ans[2]];
    anscx = true;
  } else if (ans[1] < 0 && ans[0] < 0) {
    anstot = [ans[0], Math.abs(ans[1]), ans[2]];
    anscx = true;
  } else if (ans[0] < 0 && ans[1] > 0) {
    anstot = [ans[0] + 1, ans[1] - ans[2], ans[2]];
    anscx = true;
  } else if (ans[1] === ans[2]) {
    anstot = [ans[0] + 1, 0, 0];
    anscx = true;
  } else if (ans[2] === 1) {
    anstot = [ans[0] + ans[1], 0, 0];
    anscx = true;
  } else {
    anstot = [ans[0], ans[1], ans[2]];
  }

  if (anstot[1] > anstot[2] && anstot[2] !== 0) {
    anstot[0] += (anstot[1] - (anstot[1] % anstot[2])) / anstot[2];
    anstot[1] = anstot[1] % anstot[2];
    anscx = true;
  }

  if (anstot[2] !== 0) {
    let g = gcd2(Math.abs(anstot[1]), Math.abs(anstot[2]));
    while (g > 1) {
      anstot[1] /= g;
      anstot[2] /= g;
      g = gcd2(Math.abs(anstot[1]), Math.abs(anstot[2]));
      anscx = true;
    }
  }

  return { ans: anstot, changed: anscx };
}

export function generate() {
  let { sign1, sign2, op1, op2 } = pickOperators();
  let sign1cx = false;
  let sign2cx = false;

  let f1, f2, f3;
  let sumq = '';
  let suma = '';
  let ans1 = [0, 0, 1];
  let ans2 = [0, 0, 1];
  let comdenom = 1;

  // Retry until answer size is manageable (and mixed +/− with ×/÷ avoids trivial common denoms)
  do {
    sumq = '';
    suma = '';

    do {
      if (sign1cx) {
        sign1 = OP.DIV;
        op1 = OP_TEX[OP.DIV];
        sign1cx = false;
      }
      if (sign2cx) {
        sign2 = OP.DIV;
        op2 = OP_TEX[OP.DIV];
        sign2cx = false;
      }

      f1 = randomMixed();
      f2 = randomMixed();
      f3 = randomMixed();
    } while (!fractionsValid(f1, f2, f3, sign1, sign2));

    sumq +=
      'Calculate, without using a calculator, giving your answer in its simplest form. Show all your working.';
    sumq +=
      '$$' +
      f1[0] +
      '\\frac{' +
      f1[1] +
      '}{' +
      f1[2] +
      '}' +
      op1 +
      f2[0] +
      '\\frac{' +
      f2[1] +
      '}{' +
      f2[2] +
      '}' +
      op2 +
      f3[0] +
      '\\frac{' +
      f3[1] +
      '}{' +
      f3[2] +
      '}$$';

    comdenom = lcm([f1[2], f2[2], f3[2]]);
    let anscx = false;

    // ——— Both + or − ———
    if (sign1 < 3 && sign2 < 3) {
      const n1 = (comdenom / f1[2]) * f1[1];
      const n2 = (comdenom / f2[2]) * f2[1];
      const n3 = (comdenom / f3[2]) * f3[1];

      if (sign1 === OP.ADD) {
        if (sign2 === OP.ADD) {
          ans1 = [f1[0] + f2[0] + f3[0], n1 + n2 + n3, comdenom];
        } else {
          ans1 = [f1[0] + f2[0] - f3[0], n1 + n2 - n3, comdenom];
        }
      } else if (sign2 === OP.ADD) {
        ans1 = [f1[0] - f2[0] + f3[0], n1 - n2 + n3, comdenom];
      } else {
        ans1 = [f1[0] - f2[0] - f3[0], n1 - n2 - n3, comdenom];
      }

      const wholeDisp = ans1[0] === 0 ? '' : ans1[0];

      suma +=
        '$$\\begin{aligned}&=' +
        f1[0] +
        op1 +
        f2[0] +
        op2 +
        f3[0] +
        '+\\frac{(\\frac{' +
        comdenom +
        '}{' +
        f1[2] +
        '}\\times' +
        f1[1] +
        ')' +
        op1 +
        '(\\frac{' +
        comdenom +
        '}{' +
        f2[2] +
        '}\\times' +
        f2[1] +
        ')' +
        op2 +
        '(\\frac{' +
        comdenom +
        '}{' +
        f3[2] +
        '}\\times' +
        f3[1] +
        ')}{' +
        comdenom +
        '}\\\\[5pt]';
      suma +=
        '&=' +
        wholeDisp +
        '\\frac{' +
        n1 +
        op1 +
        n2 +
        op2 +
        n3 +
        '}{' +
        comdenom +
        '}\\\\[5pt]';
    }

    // ——— Both × or ÷ ———
    else if (sign1 > 2 && sign2 > 2) {
      toImproperInPlace(f1);
      toImproperInPlace(f2);
      toImproperInPlace(f3);

      suma +=
        '$$\\begin{aligned}&=\\frac{' +
        f1[1] +
        '}{' +
        f1[2] +
        '}' +
        op1 +
        '\\frac{' +
        f2[1] +
        '}{' +
        f2[2] +
        '}' +
        op2 +
        '\\frac{' +
        f3[1] +
        '}{' +
        f3[2] +
        '}\\\\[5pt]';

      if (sign1 === OP.DIV) {
        flipForDivide(f2);
        sign1 = OP.MUL;
        op1 = OP_TEX[OP.MUL];
        sign1cx = true;
      }
      if (sign2 === OP.DIV) {
        flipForDivide(f3);
        sign2 = OP.MUL;
        op2 = OP_TEX[OP.MUL];
        sign2cx = true;
      }
      if (sign1cx || sign2cx) {
        suma +=
          '&=\\frac{' +
          f1[1] +
          '}{' +
          f1[2] +
          '}' +
          op1 +
          '\\frac{' +
          f2[1] +
          '}{' +
          f2[2] +
          '}' +
          op2 +
          '\\frac{' +
          f3[1] +
          '}{' +
          f3[2] +
          '}\\\\[5pt]';
      }

      anscx = false;
      if (cancelSelf(f1)) anscx = true;
      if (cancelSelf(f2)) anscx = true;
      if (cancelSelf(f3)) anscx = true;
      if (cancelAcross(f1, f2)) anscx = true;
      if (cancelAcross(f1, f3)) anscx = true;
      if (cancelAcross(f2, f3)) anscx = true;

      ans1 = [0, f1[1] * f2[1] * f3[1], f1[2] * f2[2] * f3[2]];

      if (anscx) {
        suma +=
          '&=\\frac{' +
          f1[1] +
          '}{' +
          f1[2] +
          '}' +
          op1 +
          '\\frac{' +
          f2[1] +
          '}{' +
          f2[2] +
          '}' +
          op2 +
          '\\frac{' +
          f3[1] +
          '}{' +
          f3[2] +
          '}\\\\[5pt]';
        anscx = false;
      }
    }

    // ——— First +/−, second ×/÷ ———
    else if (sign1 < 3 && sign2 > 2) {
      toImproperInPlace(f2);
      toImproperInPlace(f3);

      suma +=
        '$$\\begin{aligned}&=' +
        f1[0] +
        '\\frac{' +
        f1[1] +
        '}{' +
        f1[2] +
        '}' +
        op1 +
        '\\frac{' +
        f2[1] +
        '}{' +
        f2[2] +
        '}' +
        op2 +
        '\\frac{' +
        f3[1] +
        '}{' +
        f3[2] +
        '}\\\\[5pt]';

      if (sign2 === OP.DIV) {
        flipForDivide(f3);
        sign2 = OP.MUL;
        op2 = OP_TEX[OP.MUL];
        sign2cx = true;
        suma +=
          '&=' +
          f1[0] +
          '\\frac{' +
          f1[1] +
          '}{' +
          f1[2] +
          '}' +
          op1 +
          '\\frac{' +
          f2[1] +
          '}{' +
          f2[2] +
          '}' +
          op2 +
          '\\frac{' +
          f3[1] +
          '}{' +
          f3[2] +
          '}\\\\[5pt]';
      }

      anscx = false;
      if (cancelSelf(f2)) anscx = true;
      if (cancelSelf(f3)) anscx = true;
      if (cancelAcross(f2, f3)) anscx = true;

      if (anscx) {
        suma +=
          '&=' +
          f1[0] +
          '\\frac{' +
          f1[1] +
          '}{' +
          f1[2] +
          '}' +
          op1 +
          '\\frac{' +
          f2[1] +
          '}{' +
          f2[2] +
          '}' +
          op2 +
          '\\frac{' +
          f3[1] +
          '}{' +
          f3[2] +
          '}\\\\[5pt]';
        anscx = false;
      }

      ans2 = [0, f2[1] * f3[1], f2[2] * f3[2]];

      suma +=
        '&=' +
        f1[0] +
        '\\frac{' +
        f1[1] +
        '}{' +
        f1[2] +
        '}' +
        op1 +
        '\\frac{' +
        ans2[1] +
        '}{' +
        ans2[2] +
        '}\\\\[5pt]';

      comdenom = lcm2(f1[2], ans2[2]);
      suma +=
        '&=' +
        f1[0] +
        '+\\frac{(\\frac{' +
        comdenom +
        '}{' +
        f1[2] +
        '}\\times' +
        f1[1] +
        ')' +
        op1 +
        '(\\frac{' +
        comdenom +
        '}{' +
        ans2[2] +
        '}\\times' +
        ans2[1] +
        ')}{' +
        comdenom +
        '}\\\\[5pt]';
      suma +=
        '&=' +
        f1[0] +
        '\\frac{' +
        (comdenom / f1[2]) * f1[1] +
        op1 +
        (comdenom / ans2[2]) * ans2[1] +
        '}{' +
        comdenom +
        '}\\\\[5pt]';

      if (sign1 === OP.ADD) {
        ans1 = [
          f1[0] + ans2[0],
          (comdenom / f1[2]) * f1[1] + (comdenom / ans2[2]) * ans2[1],
          comdenom
        ];
      } else {
        ans1 = [
          f1[0] - ans2[0],
          (comdenom / f1[2]) * f1[1] - (comdenom / ans2[2]) * ans2[1],
          comdenom
        ];
      }
    }
  } while (
    Math.abs(ans1[0]) > 75 ||
    Math.abs(ans1[1]) > 75 ||
    Math.abs(ans1[2]) > 75 ||
    (sign1 < 3 && sign2 > 2 && (comdenom === f1[2] || comdenom === ans2[2]))
  );
  // Keeps figures manageable; mixed +/− with ×/÷ avoids trivial common denominators

  if (ans1[0] === 0) {
    suma += '&=\\frac{' + ans1[1] + '}{' + ans1[2] + '}\\\\[5pt]';
  } else {
    suma += '&=' + ans1[0] + '\\frac{' + ans1[1] + '}{' + ans1[2] + '}\\\\[5pt]';
  }

  const { ans: anstot, changed: anscx } = finalSimplify(ans1);

  if (anscx) {
    if (anstot[0] === 0 && anstot[1] !== 0 && anstot[2] !== 0) {
      suma += '&=\\frac{' + anstot[1] + '}{' + anstot[2] + '}\\end{aligned}$$';
    } else if (anstot[1] === 0 || anstot[2] === 0) {
      suma += '&=' + anstot[0] + '\\end{aligned}$$';
    } else {
      suma +=
        '&=' +
        anstot[0] +
        '\\frac{' +
        anstot[1] +
        '}{' +
        anstot[2] +
        '}\\end{aligned}$$';
    }
  } else {
    suma += '\\end{aligned}$$';
  }

  return {
    question: sumq,
    solution: suma,
    notesLink: NOTES
  };
}
