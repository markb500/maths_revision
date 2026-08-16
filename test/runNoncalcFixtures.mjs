#!/usr/bin/env node
/**
 * Fixture runner for noncalc.js
 * Usage (from Maths Revision folder):
 *   node js/test/runNoncalcFixtures.mjs
 */
import { generate, FIXTURES } from '../generators/noncalc.js';

/** Expected final numeric answers (from fixed fixture values). */
const EXPECT = {
  'case-1': {
    // 2 × (0.5+0.5)/0.5 = 4
    solutionIncludes: ['\\mathbf{4}'],
  },
  'case-2': {
    // (1.2+0.3)/0.5 × 2 = 6
    solutionIncludes: ['\\mathbf{6}'],
  },
  'case-3': {
    // 1.5/(1+0.5) × 2 = 2
    solutionIncludes: ['\\mathbf{2}'],
  },
  'case-4': {
    // 5 + 2×(1.5+0.5)/0.5 = 13
    solutionIncludes: ['\\mathbf{13}'],
  },
  'case-5': {
    // 3/0.5 + 2×(1.5+0.5) = 10
    solutionIncludes: ['\\mathbf{10}'],
  },
};

let failed = 0;
const names = Object.keys(FIXTURES);

console.log('noncalc fixtures:', names.length);
console.log('---');

for (const name of names) {
  try {
    const r = generate({ fixture: name });
    if (!r.question || !r.solution) {
      console.error('FAIL', name, '— empty question or solution');
      failed++;
      continue;
    }
    if (!r.meta || r.meta.caseId == null) {
      console.error('FAIL', name, '— missing meta.caseId');
      failed++;
      continue;
    }

    const exp = EXPECT[name] || {};
    if (exp.solutionIncludes) {
      let missing = false;
      for (const fragment of exp.solutionIncludes) {
        if (!r.solution.includes(fragment)) {
          console.error('FAIL', name, '— solution missing:', fragment);
          console.error('  solution:', r.solution);
          missing = true;
        }
      }
      if (missing) {
        failed++;
        continue;
      }
    }

    console.log('OK  ', name, ' caseId=', r.meta.caseId, ' values=', {
      a: r.meta.a,
      b: r.meta.b,
      c: r.meta.c,
      d: r.meta.d,
      e: r.meta.e,
    });
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
