var sumarrareavol = [], sumq, suma, a, b, c, d, e, f, g;
var units, unitsmath, sacub, satri, satube, saend, salgcyl, sasmcyl, sahd, sacone, vcub, vtri, vtube, vlgcyl, vsmcyl, vhd, vcone;
function areavol(ctx) {
    //Uses 1 of 5 shapes with random dimensions added. Surface area & volume to be calculated.
    var sum, left = 75, top = 25, right = left + 350, bottom = top + 200;
    sumq = "";
    suma = "";
    suma+= "<br>".repeat(13);
    switch(rndgen(1, 3, 0, 1, -1)) {      //1=m 2=cm 3=mm
        case 1:
            units = " m";
            unitsmath = "\\ m";
            break;
        case 2:
            units = " cm";
            unitsmath = "\\ cm";
            break;
        case 3:
            units = " mm";
            unitsmath = "\\ mm";
            break;
    }
    ctx.font = "20px Comic Sans MS";
    sumq += "Find the surface area and volume of the object shown, " + 
                "rounding your answers to 1 decimal place. Drawing is not to scale. <br><br>";
    
    sumarrareavol = QLimitRepeats(sumarrareavol, 6);   //Ensures no repeat question until at least 50% of questions shown
    sum = sumarrareavol[sumarrareavol.length - 1];
    switch(sum) {
        case 1:     //cubtri 
            do {
                a = rndgen(8, 21, 0, 1, -1);   //a int 8 to 21                                              base long side
                e = rndgen(4, a - 3, 2, 0.25, -1); //e 4 to (a - 3) in 0.25's                               base top length
                d = rndgen(5, 15, 0, 1, -1);   //d int 5 to 15                                              base tri height
                c = rndgen(3, d - 2, 2, 0.25, -1); //c 3 to (d - 2) in 0.25's                               base height
                b = rndgen(4, 12, 0, 1, -1);   //b int 4 to 12                                              base width
                f = (Math.floor(Math.sqrt((Math.pow((a - e), 2) + 
                            Math.pow((d - c), 2))) * 2) * 5) / 10;//f sqrt((a - e)^2 + (d - c)^2) in 0.5's  tri slope
            } while(a === b || a === d || b === d || e === d || f === d)
            sacub = dp(2 * a * c + 2 * b * c + a * b + e * b, 3, 2);
            satri = dp((a - e) * (d - c) + b * f + b * (d - c), 3, 2);
            vcub = dp(a * b * c, 3, 2);
            vtri = dp(0.5 * (a - e) * (d - c) * b, 3, 2);
            ctx.drawImage(cubtri, left, top, 350, 200);
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
            suma += "$$\\begin{aligned}SA\\ of\\ Cuboid&=2\\times side+2\\times end+base+top\\\\[5pt]";
            suma += "&=2\\times" + a + "\\times" + c + "+2\\times" + b + "\\times" + c + "+" + a + 
                        "\\times" + b + "+" + e + "\\times" + b + "\\\\[5pt]";
            suma += "&=" + thouSep(sacub, "\\ ") + unitsmath + "^2\\\\[5pt]";
            suma += "SA\\ of\\ triangular\\ prism&=2\\times triangular\\ ends+slope+side\\\\[5pt]";
            suma += "&=2\\times \\frac{1}{2}\\times" + (a - e) + "\\times" + (d - c) + "+" + 
                            b + "\\times" + f + "+" + b + "\\times" + (d - c) + "\\\\[5pt]";
            suma += "&=" + thouSep(satri, "\\ ") + unitsmath + "^2\\\\[5pt]";
            suma += "SA\\ total&=" + thouSep(sacub, "\\ ") + "+" + thouSep(satri, "\\ ") + "=\\underline{\\mathbf{" + 
                    thouSep(dp(Number(sacub) + Number(satri), 3, 1), "\\ ") + unitsmath + "^2 \\ (1\\ dp)}}\\\\[20pt]"; 
            suma += "V\\ of\\ cuboid&=length\\times width\\times height\\\\[5pt]";
            suma += "&=" + a + "\\times" + b + "\\times" + c + "\\\\[5pt]";
            suma += "&=" + thouSep(vcub, "\\ ") + unitsmath + "^3\\\\[5pt]";
            suma += "V\\ of\\ triangular\\ prism&=area\\ of\\ triangle\\times length\\ of\\ prism\\\\[5pt]";
            suma += "&=\\frac{1}{2}\\times" + (a - e) + "\\times" + (d - c) + "\\times" + b + "\\\\[5pt]";
            suma += "&=" + thouSep(vtri, "\\ ") + unitsmath + "^3\\\\[5pt]";
            suma += "V\\ total&=" + thouSep(vcub, "\\ ") + "+" + thouSep(vtri, "\\ ") + "=\\underline{\\mathbf{" + 
                    thouSep(dp(Number(vcub) +  Number(vtri), 3, 1), "\\ ") + unitsmath + "^3 \\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 2:     //cubtritube
            do {
                a = rndgen(8, 21, 0, 1, -1);   //a int 8 to 21                                              base long side
                e = rndgen(4, a - 3, 2, 0.25, -1); //e 4 to (a - 3) in 0.25's                               base top length
                d = rndgen(5, 15, 0, 1, -1);   //d int 5 to 15                                              base tri height
                c = rndgen(3, d - 2, 2, 0.25, -1); //c 3 to (d - 2) in 0.25's                               base height
                b = rndgen(4, 12, 0, 1, -1);   //b int 4 to 12                                              base width
                f = (Math.floor(Math.sqrt((Math.pow((a - e), 2) + 
                            Math.pow((d - c), 2))) * 2) * 5) / 10;//f sqrt((a - e)^2 + (d - c)^2) in 0.5's  tri slope
                g = rndgen(2, c - 1, 1, 0.5, -1);//g (2 to (c - 1) in 0.5's)                                tube dia
            } while(a === b || a === d || b === d || e === d || f === d)
            sacub = dp(2 * a * c + 2 * b * c + a * b + e * b, 3, 2);
            satri = dp((a - e) * (d - c) + b * f + b * (d - c), 3, 2);
            satube = dp(Math.PI * g * a, 3, 2);
            saend = dp(2 * Math.PI * Math.pow(g / 2, 2), 3, 2);
            vcub = dp(a * b * c, 3, 2);
            vtri = dp(0.5 * (a - e) * (d - c) * b, 3, 2);
            vtube = dp(Math.PI * Math.pow((g / 2), 2) * a, 3, 2);
            ctx.drawImage(cubtritube, left, top, 350, 200);
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
            suma += "$$\\begin{aligned}SA\\ of\\ Cuboid&=2\\times side+2\\times end+base+top\\\\[5pt]";
            suma += "&=2\\times" + a + "\\times" + c + "+2\\times" + b + "\\times" + c + "+" + a + 
                        "\\times" + b + "+" + e + "\\times" + b + "\\\\[5pt]";
            suma += "&=" + thouSep(sacub, "\\ ") + unitsmath + "^2\\\\[5pt]";
            suma += "SA\\ of\\ triangular\\ prism&=2\\times triangular\\ ends+slope+side\\\\[5pt]";
            suma += "&=2\\times \\frac{1}{2}\\times" + (a - e) + "\\times" + (d - c) + "+" + 
                            b + "\\times" + f + "+" + b + "\\times" + (d - c) + "\\\\[5pt]";
            suma += "&=" + thouSep(satri, "\\ ") + unitsmath + "^2\\\\[5pt]";
            suma += "SA\\ of\\ tube&=\\pi \\times diameter\\times length\\\\[5pt]";
            suma += "&=\\pi \\times" + g + "\\times" + a + "\\\\[5pt]";
            suma += "&=" + thouSep(satube, "\\ ") + unitsmath + "^2\\\\[5pt]";
            suma += "SA\\ of\\ end\\ caps&=2\\times \\pi \\times radius^2\\\\[5pt]";
            suma += "&=2\\times \\pi \\times" + (g / 2) + "^2\\\\[5pt]";
            suma += "&=" + thouSep(saend, "\\ ") + unitsmath + "^2\\\\[5pt]";
            suma += "SA\\ total&=" + thouSep(sacub, "\\ ") + "+" + satri + "+" + satube + "-" + saend + "=\\underline{\\mathbf{" + 
                        thouSep(dp(Number(sacub) + Number(satri) + Number(satube) - Number(saend), 3, 1), "\\ ") + 
                        unitsmath + "^2 \\ (1\\ dp)}}\\\\[20pt]"; 
            suma += "V\\ of\\ cuboid&=length\\times width\\times height\\\\[5pt]";
            suma += "&=" + a + "\\times" + b + "\\times" + c + "\\\\[5pt]";
            suma += "&=" + thouSep(vcub, "\\ ") + unitsmath + "^3\\\\[5pt]";
            suma += "V\\ of\\ triangular\\ prism&=area\\ of\\ triangle\\times length\\ of\\ prism\\\\[5pt]";
            suma += "&=\\frac{1}{2}\\times" + (a - e) + "\\times" + (d - c) + "\\times" + b + "\\\\[5pt]";
            suma += "&=" + thouSep(vtri, "\\ ") + unitsmath + "^3\\\\[5pt]";
            suma += "V\\ of\\ tube&=\\pi \\times radius^2\\times length\\\\[5pt]";
            suma += "&=\\pi\\times" + (g / 2) + "^2\\times" + a + "\\\\[5pt]";
            suma += "&=" + thouSep(vtube, "\\ ") + unitsmath + "^3\\\\[5pt]";
            suma += "V\\ total&=" + thouSep(vcub, "\\ ") + "+" + thouSep(vtri, "\\ ") + "-" + thouSep(vtube, "\\ ") + 
                        "=\\underline{\\mathbf{" + thouSep(dp(Number(vcub) + Number(vtri) - Number(vtube), 3, 1), "\\ ") + 
                        unitsmath + "^3 \\ (1\\ dp)}}\\end{aligned}$$";
            break;
        case 3:     //2cyl
            do {
                a = rndgen(7, 25, 1, 0.5, -1);//7 to 25 in 0.5's            lg cyl length
                b = rndgen(3, 15, 1, 0.5, -1);//3 to 15 in 0.5's            sm cyl length
                c = rndgen(2, 7, 1, 0.5, -1);//2 to 7 in 0.5's              sm cyl dia
                d = rndgen(c + 3, 12, 1, 0.5, -1);//(c+3) to 12 in 0.5's    lg cyl dia
            } while(a === b || a === d || b === c || b === d)
            salgcyl = dp(2 * Math.PI * Math.pow((d / 2), 2) + Math.PI * d * a, 3, 2);
            sasmcyl = dp(Math.PI * c * b, 3, 2);
            vlgcyl = dp(Math.PI * Math.pow((d / 2), 2) * a, 3, 2);
            vsmcyl = dp(Math.PI * Math.pow((c / 2), 2) * b, 3, 2);
            ctx.drawImage(twocyl, 75, 25, 350, 200);
            ctx.textAlign = "center";
            ctx.fillText(a + units, left + 120, bottom + 15);   //a
            ctx.fillText(b + units, left + 260, bottom + 15);   //b
            ctx.textAlign = "left";
            ctx.fillText(c + units, right, top + 105);   //c
            ctx.textAlign = "right";
            ctx.fillText(d + units, left - 2, top + 105);  //d
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
        case 4:     //tritube
            do {
                a = rndgen(14, 30, 0, 1, -1);   //14 to 30 int                                                length
                b = rndgen(9, 23, 0, 1, -1);   //13 to 23 int                                              width
                c = rndgen(9, 23, 0, 1, -1);   //13 to 23 int not = b                                      height
                d = rndgen(2, b - 3, 0, 1, -1);   //2 to (b - 3) int                                        tube dia
                e = dp(Math.sqrt(Math.pow(b / 2, 2) + Math.pow(c, 2)), 1, 0);   //pythag b/2 & c (0 dp)     slope
            } while(a === b || a === c || b === c || a === e || b >= a || c >= a || e >= a || d > (b / 3) || d > (e / 3))
            satri = dp(b * c + 2 * a * e + a * b, 3, 2);
            satube = dp(Math.PI * d * a, 3, 2);
            saend = dp(2 * Math.PI * Math.pow((d / 2), 2), 3, 2);
            vtri = dp(0.5 * b * c * a, 3, 2);
            vtube = dp(Math.PI * Math.pow((d / 2), 2) * a, 3, 2);
            ctx.drawImage(tritube, 75, 25, 350, 200);
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
        case 5:     //rivet
            sumq = "Find the surface area and volume of the object shown, rounding your answers to 1 decimal place. " + 
                    "The head of the rivet is hemispherical. The drawing is not to scale";
            units = " mm";      //only mm makes sense for rivet dimensions
            unitsmath = "\\ mm";
            a = rndgen(8, 15, 0, 1, -1);   //a int 8 to 15 head diameter
            b = a / 2 + rndgen(-1, 1, 0, 1, -1);   //Shaft diameter = head diameter / 2 + rnd int -1 to 1
            c = Math.ceil(a * 0.6 + rndgen(2, 6, 0, 1, -1));    //Shaft length = head diameter *  0.6 + rnd int 2 to 6
            sahd = dp(3 * Math.PI * Math.pow(a / 2, 2), 3, 2);  //SA head
            satube = dp(Math.PI * b * c, 3, 2);     //Shaft SA (- ends)
            vhd = dp(2 / 3 * Math.PI * Math.pow(a / 2, 3), 3, 2);   //V head
            vtube = dp(Math.PI * Math.pow(b / 2, 2) * c, 3, 2);     //V shaft
            ctx.drawImage(rivet, left, top, 350, 200);
            ctx.textAlign = "center";
            ctx.fillText(a + units, left + 170, top);
            ctx.fillText(b + units, left + 170, bottom + 15);
            ctx.textAlign = "left";
            ctx.fillText((c + a/2) + units, right - 80, bottom - 90);   //Full length of rivet
            suma += "$$\\begin{aligned}SA\\ of\\ rivet\\ head&=hemisphere\\ plus\\ circle\\\\[5pt]";
            suma += "&=3\\pi r^2\\\\[5pt]";
            suma += "&=3\\times \\pi \\times" + (a/2) + "^2 \\\\[5pt]";
            suma += "&=" + thouSep(sahd, "\\ ") + unitsmath + "^2\\\\[5pt]";
            suma += "SA\\ of\\ shaft&=tube\\ (area\\ of\\ 2\\ ends\\ hidden\\ in\\ joint) \\\\[5pt]";
            suma += "&=\\pi Dl\\\\[5pt]";
            suma += "&=\\pi \\times" + b + "\\times" + c + "\\\\[5pt]";
            suma += "&=" + thouSep(satube, "\\ ") + unitsmath + "^2\\\\[5pt]";
            suma += "SA\\ total&=" + thouSep(sahd, "\\ ") + "+" + thouSep(satube, "\\ ") + "=\\underline{\\mathbf{" + 
                    thouSep(dp(Number(sahd) + Number(satube), 3, 1), "\\ ") + unitsmath + "^2 \\ (1\\ dp)}}\\\\[20pt]"; 
            suma += "V\\ of\\ rivet\\ head&=\\frac{2}{3}\\pi r^3 \\\\[5pt]";
            suma += "&=\\frac{2}{3}\\pi \\times" + (a/2) + "^3 \\\\[5pt]";
            suma += "&=" + thouSep(vhd, "\\ ") + unitsmath + "^3\\\\[5pt]";
            suma += "V\\ of\\ shaft&=area\\ of\\ circle\\times length\\\\[5pt]";
            suma += "&=\\pi r^2 l \\\\[5pt]";
            suma += "&=\\pi \\times" + (b/2) + "^2 \\times" + c + "\\\\[5pt]";
            suma += "&=" + thouSep(vtube, "\\ ") + unitsmath + "^3\\\\[5pt]";
            suma += "V\\ total&=" + thouSep(vhd, "\\ ") + "+" + thouSep(vtube, "\\ ") + "=\\underline{\\mathbf{" + 
                    thouSep(dp(Number(vhd) +  Number(vtube), 3, 1), "\\ ") + unitsmath + "^3 \\ (1\\ dp)}}\\end{aligned}$$"; 
            break;
        case 6:     //domecone
            sumq = "Find the surface area and volume of the object shown, rounding your answers to 1 decimal place. " + 
                    "The head of the dome is hemispherical. The drawing is not to scale";
            units = " mm";      //only mm makes sense for dimensions
            unitsmath = "\\ mm";
            a = rndgen(8, 15, 0, 1, -1);   //a int 8 to 15 head diameter
            b = Math.ceil(a * 0.6 + rndgen(2, 6, 0, 1, -1));    //Cone height = head diameter *  0.6 + rnd int 2 to 6
            c = (Math.floor(Math.sqrt((Math.pow((a / 2), 2) + Math.pow(b, 2))) * 2) * 5) / 10;//slant height sqrt(radius^2 + cone height^2) in 0.5's
            sahd = dp(2 * Math.PI * Math.pow(a / 2, 2), 3, 2);  //SA dome (without base)
            sacone = dp(Math.PI * (a / 2) * c, 3, 2);     //SA cone (without base)
            vhd = dp(2 / 3 * Math.PI * Math.pow(a / 2, 3), 3, 2);   //V dome
            vcone = dp(1 / 3 * Math.PI * Math.pow(a / 2, 2) * b, 3, 2);     //V cone
            ctx.drawImage(domecone, left, top, 350, 200);
            ctx.textAlign = "center";
            ctx.fillText(a + units, left + 170, top);   //Diameter
            ctx.fillText(c + units, left + 70, bottom - 35);    //Slant ht cone
            ctx.textAlign = "left";
            ctx.fillText((b + a / 2) + units, right - 70, bottom - 90);   //Full length of dome & cone
            suma += "$$\\begin{aligned}SA\\ of\\ dome&=hemisphere\\ (without\\ base\\ hidden\\ in\\ joint)\\\\[5pt]";
            suma += "&=2\\pi r^2\\\\[5pt]";
            suma += "&=2\\times \\pi \\times" + (a/2) + "^2 \\\\[5pt]";
            suma += "&=" + thouSep(sahd, "\\ ") + unitsmath + "^2\\\\[5pt]";
            suma += "SA\\ of\\ cone&=cone\\ (without\\ base\\ hidden\\ in\\ joint) \\\\[5pt]";
            suma += "&=\\pi rl\\\\[5pt]";
            suma += "&=\\pi \\times" + (a / 2) + "\\times" + c + "\\\\[5pt]";
            suma += "&=" + thouSep(sacone, "\\ ") + unitsmath + "^2\\\\[5pt]";
            suma += "SA\\ total&=" + thouSep(sahd, "\\ ") + "+" + thouSep(sacone, "\\ ") + "=\\underline{\\mathbf{" + 
                    thouSep(dp(Number(sahd) + Number(sacone), 3, 1), "\\ ") + unitsmath + "^2 \\ (1\\ dp)}}\\\\[20pt]"; 
            suma += "V\\ of\\ dome&=\\frac{2}{3}\\pi r^3 \\\\[5pt]";
            suma += "&=\\frac{2}{3}\\pi \\times" + (a / 2) + "^3 \\\\[5pt]";
            suma += "&=" + thouSep(vhd, "\\ ") + unitsmath + "^3\\\\[5pt]";
            suma += "V\\ of\\ cone&=\\frac{1}{3}\\pi r^2 h\\\\[5pt]";
            suma += "&=\\frac{1}{3}\\pi \\times" + (a / 2) + "^2 \\times" + b + "\\\\[5pt]";
            suma += "&=" + thouSep(vcone, "\\ ") + unitsmath + "^3\\\\[5pt]";
            suma += "V\\ total&=" + thouSep(vhd, "\\ ") + "+" + thouSep(vcone, "\\ ") + "=\\underline{\\mathbf{" + 
                    thouSep(dp(Number(vhd) +  Number(vcone), 3, 1), "\\ ") + unitsmath + "^3 \\ (1\\ dp)}}\\end{aligned}$$"; 
            break;
    }
    var notesLink = "images/20200505-MathsBook12AreaVolv1_3-APO.pdf#page=3";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}