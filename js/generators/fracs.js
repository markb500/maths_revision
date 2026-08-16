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
 * Format a mixed number for MathJax solution lines.
 * Negative fractional part shown as whole-frac{num}{den} (e.g. 3-frac{17}{42}).
 */
function formatMixedTex(a) {
  const [w, n, d] = a;
  const FR = '\\frac{';
  if (d === 0 || n === 0) return String(w);
  if (w === 0) {
    if (n < 0) return '-' + FR + Math.abs(n) + '}{' + d + '}';
    return FR + n + '}{' + d + '}';
  }
  if (n < 0 && w > 0) return w + '-' + FR + Math.abs(n) + '}{' + d + '}';
  if (n < 0 && w < 0) return w + FR + Math.abs(n) + '}{' + d + '}';
  return w + FR + n + '}{' + d + '}';
}

/**
 * Final mixed-number tidy (improper, sign, cancel).
 * Returns intermediate display steps so e.g. 4 - 59/42 → 3 - 17/42 → 2 25/42.
 * Only records a step when the MathJax string actually changes (avoids duplicates).
 * @returns {{ ans: number[], changed: boolean, steps: string[] }}
 */
function finalSimplify(ans1) {
  let anscx = false;
  const steps = [];
  const ans = [ans1[0], ans1[1], ans1[2]];
  let prevTex = formatMixedTex(ans);

  function record(a) {
    const tex = formatMixedTex(a);
    if (tex !== prevTex) {
      steps.push(tex);
      prevTex = tex;
      return true;
    }
    return false;
  }

  // Extract whole units when |numerator| >= |denominator|
  if (ans[2] !== 0 && Math.abs(ans[1]) >= Math.abs(ans[2])) {
    ans[0] += (ans[1] - (ans[1] % ans[2])) / ans[2];
    ans[1] = ans[1] % ans[2];
    if (record(ans)) anscx = true;
  }

  let anstot;
  if (ans[1] < 0 && ans[0] > 0) {
    // Borrow: 3 - 17/42 → 2 + 25/42
    anstot = [ans[0] - 1, ans[2] + ans[1], ans[2]];
    if (record(anstot)) anscx = true;
  } else if (ans[1] < 0 && ans[0] < 0) {
    // Normalise sign of fractional part; often same on-screen as previous line
    anstot = [ans[0], Math.abs(ans[1]), ans[2]];
    if (record(anstot)) anscx = true;
  } else if (ans[0] < 0 && ans[1] > 0) {
    // -1 + 5/12 → 0 - 7/12 (value -7/12), not the ambiguous "-1 5/12"
    anstot = [ans[0] + 1, ans[1] - ans[2], ans[2]];
    if (record(anstot)) anscx = true;
  } else if (ans[1] === ans[2] && ans[2] !== 0) {
    anstot = [ans[0] + 1, 0, 0];
    if (record(anstot)) anscx = true;
  } else if (ans[2] === 1) {
    anstot = [ans[0] + ans[1], 0, 0];
    if (record(anstot)) anscx = true;
  } else {
    anstot = [ans[0], ans[1], ans[2]];
  }

  if (anstot[2] !== 0 && Math.abs(anstot[1]) > Math.abs(anstot[2])) {
    anstot[0] += (anstot[1] - (anstot[1] % anstot[2])) / anstot[2];
    anstot[1] = anstot[1] % anstot[2];
    if (record(anstot)) anscx = true;
  }

  if (anstot[2] !== 0) {
    let g = gcd2(Math.abs(anstot[1]), Math.abs(anstot[2]));
    let cancelled = false;
    while (g > 1) {
      anstot[1] /= g;
      anstot[2] /= g;
      g = gcd2(Math.abs(anstot[1]), Math.abs(anstot[2]));
      cancelled = true;
    }
    if (cancelled) {
      anscx = true;
      record(anstot);
    }
  }

  return { ans: anstot, changed: anscx || steps.length > 0, steps };
}


/**
 * Named input sets for deterministic checks (no random).
 * Use: generate({ fixture: 'add-add' })
 * Mixed numbers are [whole, numerator, denominator].
 */
export const FIXTURES = {
  // Both addition — common denominator path
  'add-add': {
    f1: [1, 1, 2],
    f2: [2, 1, 3],
    f3: [1, 1, 6],
    sign1: OP.ADD,
    sign2: OP.ADD,
  },
  // Both subtraction — improper/borrow tidy path (4 - 59/42 style intermediate)
  'sub-sub-borrow': {
    f1: [4, 1, 2],
    f2: [1, 2, 3],
    f3: [1, 5, 6],
    sign1: OP.SUB,
    sign2: OP.SUB,
  },
  // Both multiply — cancel path
  'mul-mul': {
    f1: [1, 1, 2],
    f2: [2, 1, 3],
    f3: [1, 1, 4],
    sign1: OP.MUL,
    sign2: OP.MUL,
  },
  // Divide then multiply — reciprocal path
  'div-mul': {
    f1: [2, 1, 4],
    f2: [1, 1, 2],
    f3: [2, 1, 3],
    sign1: OP.DIV,
    sign2: OP.MUL,
  },
  // First +/−, second ×/÷ — mixed operator path
  'sub-then-mul': {
    f1: [3, 1, 2],
    f2: [1, 1, 3],
    f3: [1, 1, 4],
    sign1: OP.SUB,
    sign2: OP.MUL,
  },
  // First +/−, second ×/÷ — mixed operator path
  'sub-mul-borrow': {
    f1: [4, 7, 9],
    f2: [0, 3, 2],
    f3: [0, 7, 3],
    sign1: OP.SUB,
    sign2: OP.MUL,
  },
};

export function generate(options = {}) {
  const fx = typeof options.fixture === 'string'
    ? FIXTURES[options.fixture]
    : options.fixture || null;
  if (typeof options.fixture === 'string' && !fx) {
    throw new Error('Unknown fracs fixture: ' + options.fixture);
  }

  let sign1, sign2, op1, op2;
  if (fx) {
    sign1 = fx.sign1;
    sign2 = fx.sign2;
    op1 = OP_TEX[sign1];
    op2 = OP_TEX[sign2];
  } else {
    ({ sign1, sign2, op1, op2 } = pickOperators());
  }
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

      if (fx) {
        f1 = fx.f1.slice();
        f2 = fx.f2.slice();
        f3 = fx.f3.slice();
      } else {
        f1 = randomMixed();
        f2 = randomMixed();
        f3 = randomMixed();
      }
    } while (!fx && !fractionsValid(f1, f2, f3, sign1, sign2));

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
    !fx && (
      Math.abs(ans1[0]) > 75 ||
      Math.abs(ans1[1]) > 75 ||
      Math.abs(ans1[2]) > 75 ||
      (sign1 < 3 && sign2 > 2 && (comdenom === f1[2] || comdenom === ans2[2]))
    )
  );
  // Keeps figures manageable; mixed +/− with ×/÷ avoids trivial common denominators

  // Combined result, then only *changing* tidy steps
  const startTex = formatMixedTex(ans1);
  suma += '&=' + startTex + '\\\\[5pt]';

  const { ans: anstot, changed: anscx, steps } = finalSimplify(ans1);

  if (anscx && steps.length) {
    const toShow = steps.filter((s) => s !== startTex);
    if (toShow.length) {
      for (let i = 0; i < toShow.length; i++) {
        const isLast = i === toShow.length - 1;
        suma += '&=' + toShow[i] + (isLast ? '\\end{aligned}$$' : '\\\\[5pt]');
      }
    } else {
      suma += '\\end{aligned}$$';
    }
  } else {
    suma += '\\end{aligned}$$';
  }

  const result = {
    question: sumq,
    solution: suma,
    notesLink: NOTES
  };
  if (fx) {
    result.meta = {
      fixture: typeof options.fixture === 'string' ? options.fixture : '(custom)',
      f1: f1.slice(),
      f2: f2.slice(),
      f3: f3.slice(),
      sign1,
      sign2,
      ans1: ans1.slice(),
      final: anstot.slice()
    };
  }
  return result;
}
