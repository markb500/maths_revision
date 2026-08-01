// js/utils.js - Shared utilities (proper ES module exports)

export function rndgen(lower, upper, dp, step, fix) {
  step = step * Math.pow(10, dp);
  if (fix === -1) {
    let tmp;
    do {
      tmp = Math.floor(Math.random() * ((upper * Math.pow(10, dp) / step) -
            (lower * Math.pow(10, dp) / step) + 1) +
            (lower * Math.pow(10, dp) / step)) / Math.pow(10, dp) * step;
    } while (countDecimals(tmp) > dp);
    return tmp;
  }
  return (Math.floor(Math.random() * (upper * Math.pow(10, dp) / step -
        lower * Math.pow(10, dp) / step + 1) +
        lower * Math.pow(10, dp) / step) / Math.pow(10, dp) * step).toFixed(fix);
}

export function countDecimals(value) {
  if (Math.floor(value) !== value) {
    return value.toString().split(".")[1].length || 0;
  }
  return 0;
}

export function dp(num, scale, fix) {
  if (!("" + num).includes("e")) {
    const rounded = +(Math.round(num + "e+" + scale) + "e-" + scale);
    return fix === -1 ? rounded : rounded.toFixed(fix);
  }
  const arr = ("" + num).split("e");
  const sig = (+arr[1] + scale > 0) ? "+" : "";
  const rounded = +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  return fix === -1 ? rounded : rounded.toFixed(fix);
}

export function thouSep(value, sep) {
  return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, sep);
}

export function gcd2(a, b) {
  return b === 0 ? a : gcd2(b, a % b);
}

export function gcd(array) {
  return array.reduce((a, b) => gcd2(a, b), 0);
}

export function lcm2(a, b) {
  return a * b / gcd2(a, b);
}

export function lcm(array) {
  return array.reduce((a, b) => lcm2(a, b), 1);
}

export function chkpwr(ltr, pwr) {
  if (pwr === 0) return "";
  if (pwr === 1) return ltr;
  return ltr + "^" + pwr;
}

export function eqnformat(id) {
  if (window.MathJax && MathJax.Hub) {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, id]);
  }
}

export function cfchk(num, ltr, not1, notplus) {
  if (num > 0) {
    if (num === 1 && not1 && notplus) return ltr;
    if (num === 1 && not1) return "+" + ltr;
    if (notplus) return num + ltr;
    return "+" + num + ltr;
  } else {
    if (num === -1 && not1) return "-" + ltr;
    return num + ltr;
  }
}

export function op(sign) {
  return sign ? "-" : "+";
}

export function QLimitRepeats(arr, x) {
  let sum;
  do {
    sum = rndgen(1, x, 0, 1, -1);
  } while (arr.includes(sum));
  arr.push(sum);
  if (arr.length > Math.ceil(x / 2)) {
    arr.shift();
  }
  return arr;
}

// ---------- Image preloading ----------
const imageSources = [
  "images/cubtri.png",
  "images/cubtritube.png",
  "images/twocyl.png",
  "images/tritube.png",
  "images/rivet.png",
  "images/domecone.png",
  "images/ysinx.png",
  "images/yminussinx.png",
  "images/y2sinx.png",
  "images/yminus2sinx.png",
  "images/y2sin1_5x.png",
  "images/yminus2sin1_5x.png",
  "images/y2sin2x.png",
  "images/yminus2sin2x.png",
  "images/ysin1_5x.png",
  "images/yminussin1_5x.png",
  "images/ysin2x.png",
  "images/yminussin2x.png",
  "images/y1_5sinx.png",
  "images/yminus1_5sinx.png",
  "images/y0_75sinx.png",
  "images/yminus0_75sinx.png",
  "images/ycosx.png",
  "images/yminuscosx.png",
  "images/y2cosx.png",
  "images/yminus2cosx.png",
  "images/y2cos1_5x.png",
  "images/yminus2cos1_5x.png",
  "images/y2cos2x.png",
  "images/yminus2cos2x.png",
  "images/ycos1_5x.png",
  "images/yminuscos1_5x.png",
  "images/ycos2x.png",
  "images/yminuscos2x.png",
  "images/y1_5cosx.png",
  "images/yminus1_5cosx.png",
  "images/y0_75cosx.png",
  "images/yminus0_75cosx.png"
];

// Keep references so the images stay in memory and can be used by generators
export const images = {};

export function loadImages() {
  imageSources.forEach(src => {
    const name = src.split('/').pop().replace('.png', ''); // e.g. "ysinx"
    const img = new Image();
    img.src = src;
    images[name] = img;

    // Also expose on window for any legacy code that still expects global variables
    window[name] = img;
  });
}

// Also attach to window for any remaining global needs
window.utils = {
  rndgen, dp, thouSep, gcd2, gcd, lcm2, lcm, chkpwr, eqnformat, cfchk, op, QLimitRepeats, loadImages
};
window.eqnformat = eqnformat;
window.QLimitRepeats = QLimitRepeats;
window.cfchk = cfchk;
window.op = op;
window.loadImages = loadImages;