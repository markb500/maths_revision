#!/usr/bin/env node
/**
 * Minimal fixture runner for fracs.js
 * Usage (from Maths Revision folder):
 *   node js/test/runFracsFixtures.mjs
 * 
 * To run in UI, add below to console:
 * const r = fracs.generate({ fixture: 'mul-mul' })
document.getElementById('q').innerHTML = r.question
document.getElementById('a').innerHTML = r.solution
document.getElementById('btnSoln').style.visibility = 'visible'
MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'q'])
MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'a'])
r.meta
 */
import { generate, FIXTURES } from '../generators/fracs.js';

/**
 * Optional expectations per fixture:
 *   final: [whole, num, den]
 *   solutionIncludes: string[]  — each must appear in r.solution
 */
const EXPECT = {
  'add-add': {
    final: [5, 0, 1],
    solutionIncludes: ['\\frac{3+2+1}{6}'],
  },
  'mul-mul': {
    final: [4, 3, 8],
  },
  'div-mul': {
    final: [3, 1, 2],
    // reciprocal step after turning ÷ into ×
    solutionIncludes: ['\\times'],
  },
  'sub-then-mul': {
    final: [1, 5, 6],
  },
  'sub-mul-borrow': {
    final: [1, 5, 18],
    // steps to simplify
    solutionIncludes: ['4-\\frac{49}{18}'],
    solutionIncludes: ['2-\\frac{13}{18}'],
  },
  'sub-sub-borrow': {
    // smoke + any stable fragment you care about; add more as you confirm
    // solutionIncludes: ['\\\\frac'],
  },
};

function sameFinal(a, b) {
  if (!a || !b || a.length !== 3 || b.length !== 3) return false;
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

let failed = 0;
const names = Object.keys(FIXTURES);

console.log('fracs fixtures:', names.length);
console.log('---');

for (const name of names) {
  try {
    const r = generate({ fixture: name });
    if (!r.question || !r.solution) {
      console.error('FAIL', name, '— empty question or solution');
      failed++;
      continue;
    }
    if (!r.meta || !r.meta.final) {
      console.error('FAIL', name, '— missing meta.final');
      failed++;
      continue;
    }

    const exp = EXPECT[name] || {};

    if (exp.final) {
      if (!sameFinal(r.meta.final, exp.final)) {
        console.error('FAIL', name, '— final', r.meta.final, 'expected', exp.final);
        failed++;
        continue;
      }
    }

    if (exp.solutionIncludes) {
      let missing = false;
      for (const fragment of exp.solutionIncludes) {
        if (!r.solution.includes(fragment)) {
          console.error('FAIL', name, '— solution missing:', fragment);
          missing = true;
        }
      }
      if (missing) {
        failed++;
        continue;
      }
    }

    console.log('OK  ', name, 'final =', r.meta.final);
  } catch (err) {
    console.error('FAIL', name, '—', err.message);
    failed++;
  }
}

console.log('---');
if (failed) {
  console.error(failed + ' fixture(s) failed');
  process.exit(1);
}
console.log('All fixtures passed');
