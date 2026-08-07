// js/generators/areavol.js
// Clean ES module
import { rndgen, dp, thouSep, QLimitRepeats, images } from '../utils.js';

let recentIds = [];

export function generate() {
  let sumq = "", suma = "";
  let units = "", unitsmath = "";
  let a, b, c, d, e, f, g;
  let left = 75, top = 25, right = left + 350, bottom = top + 200;
  let imgName;
  let satri, sacub, satube, saend, sacub2, satri2, salgcyl, sasmcyl, sahd, sacone;
  let vtri, vcub, vtube, vcub2, vtri2, vlgcyl, vsmcyl, vhd, vcone;

  // Units
  switch (rndgen(1, 3, 0, 1, -1)) {
    case 1: units = " m"; unitsmath = "\\ m"; break;
    case 2: units = " cm"; unitsmath = "\\ cm"; break;
    case 3: units = " mm"; unitsmath = "\\ mm"; break;
  }

  sumq = "Find the surface area and volume of the object shown, rounding your answers to 1 decimal place. Drawing is not to scale.<br><br>";

  recentIds = QLimitRepeats(recentIds, 6);
  const sum = recentIds[recentIds.length - 1];

  switch (sum) {
    case 1: // cubtri
      do {
        a = rndgen(8, 21, 0, 1, -1);
        e = rndgen(4, a - 3, 2, 0.25, -1);
        d = rndgen(5, 15, 0, 1, -1);
        c = rndgen(3, d - 2, 2, 0.25, -1);
        b = rndgen(4, 12, 0, 1, -1);
        f = (Math.floor(Math.sqrt(Math.pow(a - e, 2) + Math.pow(d - c, 2)) * 2) * 5) / 10;
      } while (a === b || a === d || b === d || e === d || f === d);

      sacub = dp(2 * a * c + 2 * b * c + a * b + e * b, 3, 2);
      satri = dp((a - e) * (d - c) + b * f + b * (d - c), 3, 2);
      vcub = dp(a * b * c, 3, 2);
      vtri = dp(0.5 * (a - e) * (d - c) * b, 3, 2);

      imgName = "cubtri";

      suma = `$$\\begin{aligned}SA\\ of\\ Cuboid&=2\\times side+2\\times end+base+top\\\\[5pt]
        &=2\\times${a}\\times${c}+2\\times${b}\\times${c}+${a}\\times${b}+${e}\\times${b}\\\\[5pt]
        &=${thouSep(sacub, "\\ ")}${unitsmath}^2\\\\[5pt]
        SA\\ of\\ triangular\\ prism&=2\\times triangular\\ ends+slope+side\\\\[5pt]
        &=2\\times \\frac{1}{2}\\times${a - e}\\times${d - c}+${b}\\times${f}+${b}\\times${d - c}\\\\[5pt]
        &=${thouSep(satri, "\\ ")}${unitsmath}^2\\\\[5pt]
        SA\\ total&=${thouSep(dp(Number(sacub) + Number(satri), 3, 1), "\\ ")}${unitsmath}^2\\ (1\\ dp)\\\\[20pt]
        V\\ of\\ cuboid&=${a}\\times${b}\\times${c}=${thouSep(vcub, "\\ ")}${unitsmath}^3\\\\[5pt]
        V\\ of\\ triangular\\ prism&=\\frac{1}{2}\\times${a - e}\\times${d - c}\\times${b}=${thouSep(vtri, "\\ ")}${unitsmath}^3\\\\[5pt]
        V\\ total&=${thouSep(dp(Number(vcub) + Number(vtri), 3, 1), "\\ ")}${unitsmath}^3\\ (1\\ dp)\\end{aligned}$$`;
      break;

    case 2: // cubtritube
      do {
        a = rndgen(8, 21, 0, 1, -1);
        e = rndgen(4, a - 3, 2, 0.25, -1);
        d = rndgen(5, 15, 0, 1, -1);
        c = rndgen(3, d - 2, 2, 0.25, -1);
        b = rndgen(4, 12, 0, 1, -1);
        f = (Math.floor(Math.sqrt(Math.pow(a - e, 2) + Math.pow(d - c, 2)) * 2) * 5) / 10;
        g = rndgen(2, c - 1, 1, 0.5, -1);
      } while (a === b || a === d || b === d || e === d || f === d);

      sacub2 = dp(2 * a * c + 2 * b * c + a * b + e * b, 3, 2);
      satri2 = dp((a - e) * (d - c) + b * f + b * (d - c), 3, 2);
      satube = dp(Math.PI * g * a, 3, 2);
      saend = dp(2 * Math.PI * Math.pow(g / 2, 2), 3, 2);
      vcub2 = dp(a * b * c, 3, 2);
      vtri2 = dp(0.5 * (a - e) * (d - c) * b, 3, 2);
      vtube = dp(Math.PI * Math.pow(g / 2, 2) * a, 3, 2);

      imgName = "cubtritube";

      suma += "$$\\begin{aligned}SA\\ of\\ Cuboid&=2\\times side+2\\times end+base+top\\\\[5pt]";
      suma += "&=2\\times" + a + "\\times" + c + "+2\\times" + b + "\\times" + c + "+" + a + 
                "\\times" + b + "+" + e + "\\times" + b + "\\\\[5pt]";
      suma += "&=" +  thouSep(sacub2, "\\ ") + unitsmath + "^2\\\\[5pt]";
      suma += "SA\\ of\\ triangular\\ prism&=2\\times triangular\\ ends+slope+side\\\\[5pt]";
      suma += "&=2\\times \\frac{1}{2}\\times" + (a - e) + "\\times" + (d - c) + "+" + 
                b + "\\times" + f + "+" + b + "\\times" + (d - c) + "\\\\[5pt]";
      suma += "&=" +  thouSep(satri2, "\\ ") + unitsmath + "^2\\\\[5pt]";
      suma += "SA\\ of\\ tube&=\\pi \\times diameter\\times length\\\\[5pt]";
      suma += "&=\\pi \\times" + g + "\\times" + a + "\\\\[5pt]";
      suma += "&=" +  thouSep(satube, "\\ ") + unitsmath + "^2\\\\[5pt]";
      suma += "SA\\ of\\ end\\ caps&=2\\times \\pi \\times radius^2\\\\[5pt]";
      suma += "&=2\\times \\pi \\times" + (g / 2) + "^2\\\\[5pt]";
      suma += "&=" +  thouSep(saend, "\\ ") + unitsmath + "^2\\\\[5pt]";
      suma += "SA\\ total&=" +  thouSep(sacub2, "\\ ") + "+" + satri2 + "+" + satube + "-" + saend + "=\\underline{\\mathbf{" + 
                thouSep( dp(Number(sacub2) + Number(satri2) + Number(satube) - Number(saend), 3, 1), "\\ ") + 
                unitsmath + "^2 \\ (1\\ dp)}}\\\\[20pt]"; 
      suma += "V\\ of\\ cuboid&=length\\times width\\times height\\\\[5pt]";
      suma += "&=" + a + "\\times" + b + "\\times" + c + "\\\\[5pt]";
      suma += "&=" +  thouSep(vcub2, "\\ ") + unitsmath + "^3\\\\[5pt]";
      suma += "V\\ of\\ triangular\\ prism&=area\\ of\\ triangle\\times length\\ of\\ prism\\\\[5pt]";
      suma += "&=\\frac{1}{2}\\times" + (a - e) + "\\times" + (d - c) + "\\times" + b + "\\\\[5pt]";
      suma += "&=" +  thouSep(vtri2, "\\ ") + unitsmath + "^3\\\\[5pt]";
      suma += "V\\ of\\ tube&=\\pi \\times radius^2\\times length\\\\[5pt]";
      suma += "&=\\pi\\times" + (g / 2) + "^2\\times" + a + "\\\\[5pt]";
      suma += "&=" +  thouSep(vtube, "\\ ") + unitsmath + "^3\\\\[5pt]";
      suma += "V\\ total&=" +  thouSep(vcub2, "\\ ") + "+" +  thouSep(vtri2, "\\ ") + "-" +  thouSep(vtube, "\\ ") + 
                "=\\underline{\\mathbf{" +  thouSep( dp(Number(vcub2) + Number(vtri2) - Number(vtube), 3, 1), "\\ ") + 
                unitsmath + "^3 \\ (1\\ dp)}}\\end{aligned}$$";
      break;

    case 3: // two cylinders
      do {
        a = rndgen(7, 25, 1, 0.5, -1);
        b = rndgen(3, 15, 1, 0.5, -1);
        c = rndgen(2, 7, 1, 0.5, -1);
        d = rndgen(c + 3, 12, 1, 0.5, -1);
      } while (a === b || a === d || b === c || b === d);

      salgcyl = dp(2 * Math.PI * Math.pow(d / 2, 2) + Math.PI * d * a, 3, 2);
      sasmcyl = dp(Math.PI * c * b, 3, 2);
      vlgcyl = dp(Math.PI * Math.pow(d / 2, 2) * a, 3, 2);
      vsmcyl = dp(Math.PI * Math.pow(c / 2, 2) * b, 3, 2);

      imgName = "twocyl";

      suma += "$$\\begin{aligned}SA\\ of\\ large\\ cylinder&=2\\times end\\ caps+tube\\\\[5pt]";
      suma += "&=2\\times \\pi \\times" + (d / 2) + "^2+\\pi \\times" + d + "\\times" + a + "\\\\[5pt]";
      suma += "&=" + thouSep(salgcyl, "\\ ") + unitsmath + "^2\\\\[5pt]";
      suma += "SA\\ of\\ small\\ cyclinder&=small\\ tube\\ (area\\ of\\ 2\\ small\\ end\\ caps\\ " + 
                "hidden\\ in\\ joint)\\\\[5pt]";
      suma += "&=\\pi \\times" + c + "\\times" + b + "\\\\[5pt]";
      suma += "&=" + thouSep(sasmcyl, "\\ ") + unitsmath + "^2\\\\[5pt]";
      suma += "SA\\ total&=" + thouSep(salgcyl, "\\ ") + "+" + sasmcyl + "=\\underline{\\mathbf{" + 
                thouSep(dp(Number(salgcyl) + Number(sasmcyl), 3, 1), "\\ ") + unitsmath + "^2 \\ (1\\ dp)}}\\\\[20pt]";
      suma += "V\\ of\\ large\\ cyclinder&=area\\ of\\ large\\ circle\\times length\\\\[5pt]";
      suma += "&=\\pi \\times" + (d / 2) + "^2\\times" + a + "\\\\[5pt]";
      suma += "&=" + thouSep(vlgcyl, "\\ ") + unitsmath + "^3\\\\[5pt]";
      suma += "V\\ of\\ small\\ cyclinder&=area\\ of\\ small\\ circle\\times length\\\\[5pt]";
      suma += "&=\\pi \\times" + (c / 2) + "^2\\times" + b + "\\\\[5pt]";
      suma += "&=" + thouSep(vsmcyl, "\\ ") + unitsmath + "^3\\\\[5pt]";
      suma += "V\\ total&=" + thouSep(vlgcyl, "\\ ") + "+" + thouSep(vsmcyl, "\\ ") + "=\\underline{\\mathbf{" + 
                thouSep(dp(Number(vlgcyl) + Number(vsmcyl), 3, 1), "\\ ") + unitsmath + "^3 \\ (1\\ dp)}}\\end{aligned}$$";
      break;

    case 4: // tri + tube
      do {
        a = rndgen(14, 30, 0, 1, -1);
        b = rndgen(9, 23, 0, 1, -1);
        c = rndgen(9, 23, 0, 1, -1);
        d = rndgen(2, b - 3, 0, 1, -1);
        e = dp(Math.sqrt(Math.pow(b / 2, 2) + Math.pow(c, 2)), 1, 0);
      } while (a === b || a === c || b === c || a === e || b >= a || c >= a || e >= a || d > (b / 3) || d > (e / 3));

      satri = dp(b * c + 2 * a * e + a * b, 3, 2);
      satube = dp(Math.PI * d * a, 3, 2);
      saend = dp(2 * Math.PI * Math.pow(d / 2, 2), 3, 2);
      vtri = dp(0.5 * b * c * a, 3, 2);
      vtube = dp(Math.PI * Math.pow(d / 2, 2) * a, 3, 2);

      imgName = "tritube";

      suma += "$$\\begin{aligned}SA\\ of\\ triangular\\ prism&=2\\times triangular\\ end+2\\times " +  
                "sloping\\ sides+base\\\\[5pt]";
      suma += "&=2\\times \\frac{1}{2}\\times" + b + "\\times" + c + "+2\\times" + a + "\\times" + e + 
                "+" + a + "\\times" + b + "\\\\[5pt]";
      suma += "&=" + thouSep(satri, "\\ ") + unitsmath + "^2\\\\[5pt]";
      suma += "SA\\ of\\ tube&=\\pi \\times diameter\\times length\\\\[5pt]";
      suma += "&=\\pi \\times" + d + "\\times" + a + "\\\\[5pt]";
      suma += "&=" + thouSep(satube, "\\ ") + unitsmath + "^2\\\\[5pt]";
      suma += "SA\\ of\\ end\\ caps&=2\\times \\pi \\times radius^2\\\\[5pt]";
      suma += "&=2\\times \\pi \\times" + (d / 2) + "^2\\\\[5pt]";
      suma += "&=" + thouSep(saend, "\\ ") + unitsmath + "^2\\\\[5pt]";
      suma += "SA\\ total&=" + thouSep(satri, "\\ ") + "+" + thouSep(satube, "\\ ") + "-" + thouSep(saend, "\\ ") + "=\\underline{\\mathbf{" + 
                thouSep(dp(Number(satri) + Number(satube) - Number(saend), 3, 1), "\\ ") + unitsmath + "^2\\ (1\\ dp)}}\\\\[20pt]";
      suma += "V\\ of\\ triangular\\ prism&=area\\ of\\ trangular\\ end\\times length\\\\[5pt]";
      suma += "&=\\frac{1}{2}\\times" + b + "\\times" + c + "\\times" + a + "\\\\[5pt]";
      suma += "&=" + thouSep(vtri, "\\ ") + unitsmath + "^3\\\\[5pt]";
      suma += "V\\ of\\ tube&=\\pi \\times radius^2\\times length\\\\[5pt]";
      suma += "&=\\pi \\times" + (d / 2) + "^2\\times" + a + "\\\\[5pt]";
      suma += "&=" + thouSep(vtube, "\\ ") + unitsmath + "^3\\\\[5pt]";
      suma += "V\\ total&=" + thouSep(vtri, "\\ ") + "-" + thouSep(vtube, "\\ ") + "=\\underline{\\mathbf{" + 
                thouSep(dp(Number(vtri) - Number(vtube), 3, 1), "\\ ") + unitsmath + "^3\\ (1\\ dp)}}\\end{aligned}$$";
      break;

    case 5: // rivet
      units = " mm";
      unitsmath = "\\ mm";
      a = rndgen(8, 15, 0, 1, -1);
      b = a / 2 + rndgen(-1, 1, 0, 1, -1);
      c = Math.ceil(a * 0.6 + rndgen(2, 6, 0, 1, -1));
      sahd = dp(3 * Math.PI * Math.pow(a / 2, 2), 3, 2);
      satube = dp(Math.PI * b * c, 3, 2);
      vhd = dp(2 / 3 * Math.PI * Math.pow(a / 2, 3), 3, 2);
      vtube = dp(Math.PI * Math.pow(b / 2, 2) * c, 3, 2);

      imgName = "rivet";

      suma = `$$\\begin{aligned}SA\\ of\\ rivet\\ head&=3\\pi r^2=3\\times \\pi \\times${a/2}^2=${thouSep(sahd, "\\ ")}${unitsmath}^2\\\\[5pt]
                SA\\ of\\ shaft&=\\pi \\times${b}\\times${c}=${thouSep(satube, "\\ ")}${unitsmath}^2\\\\[5pt]
                SA\\ total&=${thouSep(dp(Number(sahd) + Number(satube), 3, 1), "\\ ")}${unitsmath}^2\\ (1\\ dp)\\\\[20pt]
                V\\ of\\ rivet\\ head&=\\frac{2}{3}\\pi r^3=\\frac{2}{3}\\pi \\times${a/2}^3=${thouSep(vhd, "\\ ")}${unitsmath}^3\\\\[5pt]
                V\\ of\\ shaft&=\\pi \\times${b/2}^2 \\times${c}=${thouSep(vtube, "\\ ")}${unitsmath}^3\\\\[5pt]
                V\\ total&=${thouSep(dp(Number(vhd) + Number(vtube), 3, 1), "\\ ")}${unitsmath}^3\\ (1\\ dp)\\end{aligned}$$`;
      break;

    case 6: // dome + cone
      units = " mm";
      unitsmath = "\\ mm";
      a = rndgen(8, 15, 0, 1, -1);
      b = Math.ceil(a * 0.6 + rndgen(2, 6, 0, 1, -1));
      c = (Math.floor(Math.sqrt(Math.pow(a / 2, 2) + Math.pow(b, 2)) * 2) * 5) / 10;
      sahd = dp(2 * Math.PI * Math.pow(a / 2, 2), 3, 2);
      sacone = dp(Math.PI * (a / 2) * c, 3, 2);
      vhd = dp(2 / 3 * Math.PI * Math.pow(a / 2, 3), 3, 2);
      vcone = dp(1 / 3 * Math.PI * Math.pow(a / 2, 2) * b, 3, 2);

      imgName = "domecone";

      suma = `$$\\begin{aligned}SA\\ of\\ dome&=2\\pi r^2=2\\times \\pi \\times${a/2}^2=${thouSep(sahd, "\\ ")}${unitsmath}^2\\\\[5pt]
                SA\\ of\\ cone&=\\pi \\times${a/2}\\times${c}=${thouSep(sacone, "\\ ")}${unitsmath}^2\\\\[5pt]
                SA\\ total&=${thouSep(dp(Number(sahd) + Number(sacone), 3, 1), "\\ ")}${unitsmath}^2\\ (1\\ dp)\\\\[20pt]
                V\\ of\\ dome&=\\frac{2}{3}\\pi r^3=\\frac{2}{3}\\pi \\times${a/2}^3=${thouSep(vhd, "\\ ")}${unitsmath}^3\\\\[5pt]
                V\\ of\\ cone&=\\frac{1}{3}\\pi r^2 h=\\frac{1}{3}\\pi \\times${a/2}^2 \\times${b}=${thouSep(vcone, "\\ ")}${unitsmath}^3\\\\[5pt]
                V\\ total&=${thouSep(dp(Number(vhd) + Number(vcone), 3, 1), "\\ ")}${unitsmath}^3\\ (1\\ dp)\\end{aligned}$$`;
      break;
  }

  return {
    question: sumq,
    solution: suma,
    notesLink: "images/20200505-MathsBook12AreaVolv1_3-APO.pdf#page=3",
    canvas: {
      height: 300,
      width: 500,
      withSolution: false,
      draw: (ctx) => {
        const img = images[imgName];
        if (img && img.complete) {
          ctx.drawImage(img, left, top, 350, 200);
          ctx.font = "20px Comic Sans MS";
          if (sum === 1) {
            ctx.textAlign = "center";
            ctx.fillText(a + units, left + 145, bottom + 15);
            ctx.textAlign = "right";
            ctx.fillText(d + units, left - 2, (bottom - top) / 2 + 60);
            ctx.textAlign = "left";
            ctx.fillText(b + units, right - 40, bottom - 25);
            ctx.fillText(c + units, right - 10, bottom - 90);
            ctx.textAlign = "center";
            ctx.fillText(e + units, left + 265, top + 65);
            ctx.textAlign = "left";
            ctx.fillText(f + units, left + 135, top + 30);
          }
          if (sum === 2) {
            ctx.textAlign = "center";
            ctx.fillText(a + units, left + 145, bottom + 15);   //a
            ctx.textAlign = "right";
            ctx.fillText(d + units, left - 2, (bottom - top) / 2 + 60);  //d
            ctx.textAlign = "left";
            ctx.fillText(b + units, right - 40, bottom - 25);   //b
            ctx.textAlign = "left";
            ctx.fillText(c + units, right - 10, bottom - 90);   //c
            ctx.textAlign = "center";
            ctx.fillText(e + units, left + 265, top + 65);   //e
            ctx.textAlign = "left";
            ctx.fillText(f + units, left + 135, top + 30);   //f
            ctx.textAlign = "right";
            ctx.fillText("Diameter " + g + units, right + 40, top + 30);   //g
          }
          if (sum === 3) {
            ctx.textAlign = "center";
            ctx.fillText(a + units, left + 120, bottom + 15);   //a
            ctx.fillText(b + units, left + 260, bottom + 15);   //b
            ctx.textAlign = "left";
            ctx.fillText(c + units, right, top + 105);   //c
            ctx.textAlign = "right";
            ctx.fillText(d + units, left - 2, top + 105);  //d
          }
          if (sum === 4) {
            ctx.textAlign = "right";
            ctx.fillText(a + units, left + 60, bottom - 30);  //a
            ctx.textAlign = "center";
            ctx.fillText(b + units, right - 115, bottom + 20);   //b
            ctx.textAlign = "left";
            ctx.fillText(c + units, right, top + 150);   //c
            ctx.textAlign = "center";
            ctx.fillText("Diameter", right - 60, top + 80);
            ctx.fillText(d + units, right - 60, top + 105);   //d
            ctx.textAlign = "right";
            ctx.fillText(e + units, left + 50, top + 50);  //e
          }
          if (sum === 5) {
            ctx.textAlign = "center";
            ctx.fillText(a + units, left + 170, top);
            ctx.fillText(b + units, left + 170, bottom + 15);
            ctx.textAlign = "left";
            ctx.fillText((c + a / 2) + units, right - 80, bottom - 90);
          }
          if (sum === 6) {
            ctx.textAlign = "center";
            ctx.fillText(a + units, left + 170, top);
            ctx.fillText(c + units, left + 70, bottom - 35);
            ctx.textAlign = "left";
            ctx.fillText((b + a / 2) + units, right - 70, bottom - 90);
          }
        }
      }
    }
  };
}
