// js/generators/sincosgraph.js
// Clean ES module
import { QLimitRepeats, images } from '../utils.js';

let recentIds = [];

// Map of case → image variable name (these are already pre-loaded in index.html)
const graphImages = {
  1:  'ysinx',
  2:  'yminussinx',
  3:  'y2sinx',
  4:  'yminus2sinx',
  5:  'y2sin1_5x',
  6:  'yminus2sin1_5x',
  7:  'y2sin2x',
  8:  'yminus2sin2x',
  9:  'ysin1_5x',
  10: 'yminussin1_5x',
  11: 'ysin2x',
  12: 'yminussin2x',
  13: 'y1_5sinx',
  14: 'yminus1_5sinx',
  15: 'y0_75sinx',
  16: 'yminus0_75sinx',
  17: 'ycosx',
  18: 'yminuscosx',
  19: 'y2cosx',
  20: 'yminus2cosx',
  21: 'y2cos1_5x',
  22: 'yminus2cos1_5x',
  23: 'y2cos2x',
  24: 'yminus2cos2x',
  25: 'ycos1_5x',
  26: 'yminuscos1_5x',
  27: 'ycos2x',
  28: 'yminuscos2x',
  29: 'y1_5cosx',
  30: 'yminus1_5cosx',
  31: 'y0_75cosx',
  32: 'yminus0_75cosx'
};

const graphTitles = {
  1:  "y = Sin(θ)",
  2:  "y = -Sin(θ)",
  3:  "y = 2Sin(θ)",
  4:  "y = -2Sin(θ)",
  5:  "y = 2Sin(1.5θ)",
  6:  "y = -2Sin(1.5θ)",
  7:  "y = 2Sin(2θ)",
  8:  "y = -2Sin(2θ)",
  9:  "y = Sin(1.5θ)",
  10: "y = -Sin(1.5θ)",
  11: "y = Sin(2θ)",
  12: "y = -Sin(2θ)",
  13: "y = 1.5Sin(θ)",
  14: "y = -1.5Sin(θ)",
  15: "y = 0.75Sin(θ)",
  16: "y = -0.75Sin(θ)",
  17: "y = Cos(θ)",
  18: "y = -Cos(θ)",
  19: "y = 2Cos(θ)",
  20: "y = -2Cos(θ)",
  21: "y = 2Cos(1.5θ)",
  22: "y = -2Cos(1.5θ)",
  23: "y = 2Cos(2θ)",
  24: "y = -2Cos(2θ)",
  25: "y = Cos(1.5θ)",
  26: "y = -Cos(1.5θ)",
  27: "y = Cos(2θ)",
  28: "y = -Cos(2θ)",
  29: "y = 1.5Cos(θ)",
  30: "y = -1.5Cos(θ)",
  31: "y = 0.75Cos(θ)",
  32: "y = -0.75Cos(θ)"
};

export function generate() {
  recentIds = QLimitRepeats(recentIds, 32);
  const sum = recentIds[recentIds.length - 1];

  const title = graphTitles[sum] || "y = Sin(θ)";
  const imgName = graphImages[sum] || 'ysinx';

  const sumq = `Sketch the graph of ${title} from 0° to 360°.`;
  const suma = "";

  const notesLink = "images/20200505-MathsBook9SinCosGraphsv1_3-APO.pdf#page=3";

  return {
    question: sumq,
    solution: suma,
    notesLink,
    canvas: {
      height: 600,
      width: 600,
      withSolution: true,          // show graph with the solution
      draw: (ctx) => {
        // The images are already loaded as global variables in index.html
        const img = images[imgName];
        if (img && img.complete) {
          ctx.drawImage(img, 0, 0, 600, 600);
        } else {
          ctx.font = "20px Arial";
          ctx.fillText("Graph image not loaded", 50, 50);
        }
      }
    }
  };
}