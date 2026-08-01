// js/registry.js - All topics registered

import * as noncalc from './generators/noncalc.js';
import * as fracs from './generators/fracs.js';
import * as percentratio from './generators/percentratio.js';
import * as indices from './generators/indices.js';
import * as numform from './generators/numform.js';
import * as hcflcm from './generators/hcflcm.js';
import * as solve1 from './generators/solve1.js';
import * as quadratics from './generators/quadratics.js';
import * as transposeI from './generators/transposeI.js';
import * as transposeII from './generators/transposeII.js';
import * as conv from './generators/conv.js';
import * as trig from './generators/trig.js';
import * as prop from './generators/prop.js';
import * as sincosgraph from './generators/sincosgraph.js';
import * as simultaneous from './generators/simultaneous.js';
import * as areavol from './generators/areavol.js';

export const registry = {
  noncalc: noncalc,
  fracs: fracs,
  percentratio: percentratio,
  indices: indices,
  numform: numform,
  hcflcm: hcflcm,
  solve1: solve1,
  quadratics: quadratics,
  transposeI: transposeI,
  transposeII: transposeII,
  conv: conv,
  trig: trig,
  prop: prop,
  sincosgraph: sincosgraph,
  simultaneous: simultaneous,
  areavol: areavol,

  get(topic) {
    const gen = this[topic];
    if (!gen) throw new Error(`No generator for: ${topic}`);
    return gen;
  }
};

window.registry = registry;