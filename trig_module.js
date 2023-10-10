var ang, adj, opp, hyp, units, unitsmath;
function trig(ctx) {
    //Draws a right angled triangle in approx correct scale for randomly generated dimensions (3 sides & angles).
    //2 dimensions randomly selected to be calculated. Dimensions randomly changed too.
    var left, right, top, bottom;
    sumq = "";
    suma = "";
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
    do {
        ang = rndgen(25, 70, 0, 1, -1);   //int 25 to 70 not 45;
    } while(ang === 45)
    adj = rndgen(5, 150, 2, 0.01, -1);      //5 to 150 in 0.01's
    opp = dp(adj * Math.tan(ang * Math.PI / 180), 2, -1);      //adj * tan(ang) 2dp
    hyp = dp(adj / Math.cos(ang * Math.PI / 180), 2, -1);      //adj / tan(ang) 2dp
    
    left = 50;
    top = 25;
    if(ang < 45) {  //Scale tri so adj = 300
        right = left + 300;
        bottom = opp * 300 / adj + top;
    } else {        //Scale tri so opp = 300
        bottom = top + 300;
        right = adj * 300 / opp + left;
    }

            //Draw triangle
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.lineTo(right, top);
    ctx.lineTo(left, bottom);
    ctx.stroke();

            //'Right Angled' box
    ctx.strokeRect(right - 15, bottom - 15, 15, 15);        //strokeRect(x, y, width, height)

            //Angle arc
    ctx.arc(left, bottom, 40, 0, -(Math.PI/180) * ang, true);
                                    //arc(x, y, radius, startAngle, endAngle, counterclockwise)
    ctx.stroke();
    suma += "<br>".repeat(16);
    switch(rndgen(1, 6, 0, 1, -1)) {      //Select which 2 params to show on tri
        case 1:     //1-adj opp
            ctx.font = "20px Comic Sans MS";
            ctx.textAlign = "left";
            ctx.fillText("\u03B8", left + 70 - ang / 2, bottom - ang * 0.3);
            ctx.textAlign = "center";
            ctx.fillText(adj + units, (right - left) / 2 + left, bottom + 30);
            ctx.textAlign = "left";
            ctx.fillText(opp + units, right + 10, (bottom - top) / 2 + top + 10);
            ctx.textAlign = "right";
            ctx.fillText("Hyp", (right - left) / 2 + left - 5, (bottom - top) / 2 + top - 5);
            sumq += "For the right-angled triangle shown, find the missing side (rounded to 2 decimal places) " + 
                        "and the indicated angle (rounded to 2 significant figures). <br><br>";
            suma += "$$\\begin{aligned}Hyp^2&=Adj^2+Opp^2\\\\[5pt]";
            suma += "Hyp&=\\sqrt{Adj^2+Opp^2}\\\\[5pt]";
            suma += "&=\\sqrt{" + adj + "^2+" + opp + "^2}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(Math.sqrt(Math.pow(adj, 2) + Math.pow(opp, 2)), 2, 2)  + 
                            unitsmath + "\\ (2\\ dp)}}\\end{aligned}$$";
            suma += "$$\\begin{aligned}\\\\[5pt]";
            suma += "Tan(\\theta)&=\\frac{Opp}{Adj}\\\\[5pt]";
            suma += "\\theta&=Tan^{-1}\\left(\\frac{Opp}{Adj}\\right)\\\\[5pt]";
            suma += "\\theta&=Tan^{-1}\\left(\\frac{" + opp + "}{" + adj + "}\\right)\\\\[5pt]";
            suma += "\\theta&=\\underline{\\mathbf{" + dp(Math.atan(opp / adj) * (180 / Math.PI), 0, -1) + 
                        "^{\\circ}\\ (2\\ sf)}}\\end{aligned}$$";
            break;
        case 2:     //2-adj hyp
            ctx.font = "20px Comic Sans MS";
            ctx.textAlign = "left";
            ctx.fillText("\u03B8", left + 70 - ang / 2, bottom - ang * 0.3);
            ctx.textAlign = "center";
            ctx.fillText(adj + units, (right - left) / 2 + left, bottom + 30);
            ctx.textAlign = "left";
            ctx.fillText("Opp", right + 10, (bottom - top) / 2 + top + 10);
            ctx.textAlign = "right";
            ctx.fillText(hyp + units, (right - left) / 2 + left - 5, (bottom - top) / 2 + top - 5);
            sumq += "For the right-angled triangle shown, find the missing side (rounded to 2 decimal places) " + 
                        "and the indicated angle (rounded to 2 significant figures). <br><br>";
            suma += "$$\\begin{aligned}Hyp^2&=Adj^2+Opp^2\\\\[5pt]";
            suma += "Hyp^2-Adj^2&=Opp^2\\\\[5pt]";
            suma += "\\sqrt{Hyp^2-Adj^2}&=Opp\\\\[5pt]";
            suma += "\\sqrt{" + hyp + "^2-" + adj + "^2}&=Opp\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + dp(Math.sqrt(Math.pow(hyp, 2) - Math.pow(adj, 2)), 2, 2)  + 
                        unitsmath + "\\ (2\\ dp)}}&=Opp\\end{aligned}$$";
            suma += "$$\\begin{aligned}\\\\[10pt]";
            suma += "Cos(\\theta)&=\\frac{Adj}{Hyp}\\\\[5pt]";
            suma += "\\theta&=Cos^{-1}\\left(\\frac{Adj}{Hyp}\\right)\\\\[5pt]";
            suma += "\\theta&=Cos^{-1}\\left(\\frac{" + adj + "}{" + hyp + "}\\right)\\\\[5pt]";
            suma += "\\theta&=\\underline{\\mathbf{" + dp(Math.acos(adj / hyp) * (180 / Math.PI), 0, -1) + 
                        "^{\\circ}\\ (2\\ sf)}}\\end{aligned}$$";
            break;
        case 3:     //3-opp hyp
            ctx.font = "20px Comic Sans MS";
            ctx.textAlign = "left";
            ctx.fillText("\u03B8", left + 70 - ang / 2, bottom - ang * 0.3);
            ctx.textAlign = "center";
            ctx.fillText("Adj", (right - left) / 2 + left, bottom + 30);
            ctx.textAlign = "left";
            ctx.fillText(opp + units, right + 10, (bottom - top) / 2 + top + 10);
            ctx.textAlign = "right";
            ctx.fillText(hyp + units, (right - left) / 2 + left - 5, (bottom - top) / 2 + top - 5);
            sumq += "For the right-angled triangle shown, find the missing side (rounded to 2 decimal places) " + 
                        "and the indicated angle (rounded to 2 significant figures). <br><br>";
            suma += "$$\\begin{aligned}Hyp^2&=Adj^2+Opp^2\\\\[5pt]";
            suma += "Hyp^2-Opp^2&=Adj^2\\\\[5pt]";
            suma += "\\sqrt{Hyp^2-Opp^2}&=Adj\\\\[5pt]";
            suma += "\\sqrt{" + hyp + "^2-" + opp + "^2}&=Adj\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + dp(Math.sqrt(Math.pow(hyp, 2) - Math.pow(opp, 2)), 2, 2)  + 
                        unitsmath + "\\ (2\\ dp)}}&=Adj\\end{aligned}$$";
            suma += "$$\\begin{aligned}\\\\[10pt]";
            suma += "Sin(\\theta)&=\\frac{Opp}{Hyp}\\\\[5pt]";
            suma += "\\theta&=Sin^{-1}\\left(\\frac{Opp}{Hyp}\\right)\\\\[5pt]";
            suma += "\\theta&=Sin^{-1}\\left(\\frac{" + opp + "}{" + hyp + "}\\right)\\\\[5pt]";
            suma += "\\theta&=\\underline{\\mathbf{" + dp(Math.asin(opp / hyp) * (180 / Math.PI), 0, -1) + 
                        "^{\\circ}\\ (2\\ sf)}}\\end{aligned}$$";
            break;
        case 4:     //4-ang adj
            ctx.font = "20px Comic Sans MS";
            ctx.textAlign = "left";
            ctx.fillText(ang + "\xB0", left + 70 - ang / 2, bottom - ang * 0.3);
            ctx.textAlign = "center";
            ctx.fillText(adj + units, (right - left) / 2 + left, bottom + 30);
            ctx.textAlign = "left";
            ctx.fillText("Opp", right + 10, (bottom - top) / 2 + top + 10);
            ctx.textAlign = "right";
            ctx.fillText("Hyp", (right - left) / 2 + left - 5, (bottom - top) / 2 + top - 5);
            sumq += "For the right-angled triangle shown, find the length of the two missing sides, " + 
                        "rounding your answers to 2 decimal places.<br><br>";
            suma += "$$\\begin{aligned}Tan(\\theta)&=\\frac{Opp}{Adj}\\\\[5pt]";
            suma += "Adj\\times Tan(\\theta)&=Opp\\\\[5pt]";
            suma += adj + "\\times Tan(" + ang + ")&=Opp\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + dp(adj * Math.tan(ang * Math.PI / 180), 2, 2) + 
                        unitsmath + "\\ (2\\ dp)}}&=Opp\\end{aligned}$$";
            suma += "$$\\begin{aligned}\\\\[5pt]";
            suma += "Cos(\\theta)&=\\frac{Adj}{Hyp}\\\\[5pt]";
            suma += "Hyp&=\\frac{Adj}{Cos(\\theta)}\\\\[5pt]";
            suma += "&=\\frac{" + adj + "}{Cos(" + ang + ")}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(adj / Math.cos(ang * Math.PI / 180), 2, 2) + 
                        unitsmath + "\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 5:     //5-ang opp
            ctx.font = "20px Comic Sans MS";
            ctx.textAlign = "left";
            ctx.fillText(ang + "\xB0", left + 70 - ang / 2, bottom - ang * 0.3);
            ctx.textAlign = "center";
            ctx.fillText("Adj", (right - left) / 2 + left, bottom + 30);
            ctx.textAlign = "left";
            ctx.fillText(opp + units, right + 10, (bottom - top) / 2 + top + 10);
            ctx.textAlign = "right";
            ctx.fillText("Hyp", (right - left) / 2 + left - 5, (bottom - top) / 2 + top - 5);
            sumq += "For the right-angled triangle shown, find the length of the two missing sides, " + 
                        "rounding your answers to 2 decimal places.<br><br>";
            suma += "$$\\begin{aligned}Tan(\\theta)&=\\frac{Opp}{Adj}\\\\[5pt]";
            suma += "Adj&=\\frac{Opp}{Tan(\\theta)}\\\\[5pt]";
            suma += "&=\\frac{" + opp + "}{Tan(" + ang + ")}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(opp / Math.tan(ang * Math.PI / 180), 2, 2) + 
                        unitsmath + "\\ (2\\ dp)}}\\end{aligned}$$";
            suma += "$$\\begin{aligned}\\\\[5pt]";
            suma += "Sin(\\theta)&=\\frac{Opp}{Hyp}\\\\[5pt]";
            suma += "Hyp&=\\frac{Opp}{Sin(\\theta)}\\\\[5pt]";
            suma += "&=\\frac{" + opp + "}{Sin(" + ang + ")}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(opp / Math.sin(ang * Math.PI / 180), 2, 2) + 
                        unitsmath + "\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 6:     //6-ang hyp
            ctx.font = "20px Comic Sans MS";
            ctx.textAlign = "left";
            ctx.fillText(ang + "\xB0", left + 70 - ang / 2, bottom - ang * 0.3);
            ctx.textAlign = "center";
            ctx.fillText("Adj", (right - left) / 2 + left, bottom + 30);
            ctx.textAlign = "left";
            ctx.fillText("Opp", right + 10, (bottom - top) / 2 + top + 10);
            ctx.textAlign = "right";
            ctx.fillText(hyp + units, (right - left) / 2 + left - 5, (bottom - top) / 2 + top - 5);
            sumq += "For the right-angled triangle shown, find the length of the two missing sides, " + 
                        "rounding your answers to 2 decimal places.<br><br>";
            suma += "$$\\begin{aligned}Cos(\\theta)&=\\frac{Adj}{Hyp}\\\\[5pt]";
            suma += "Hyp\\times Cos(\\theta)&=Adj\\\\[5pt]";
            suma += hyp + "\\times Cos(" + ang + ")&=Adj\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + dp(hyp * Math.cos(ang * Math.PI / 180), 2, 2) + 
                        unitsmath + "\\ (2\\ dp)}}&=Adj\\end{aligned}$$";
            suma += "$$\\begin{aligned}\\\\[5pt]";
            suma += "Sin(\\theta)&=\\frac{Opp}{Hyp}\\\\[5pt]";
            suma += "Hyp\\times Sin(\\theta)&=Opp\\\\[5pt]";
            suma += hyp + "\\times Sin(" + ang + ")&=Opp\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + dp(hyp * Math.sin(ang * Math.PI / 180), 2, 2) + 
                        unitsmath + "\\ (2\\ dp)}}&=Opp\\end{aligned}$$";
            break;
    }
    var notesLink = "images/20200504-MathsBook7Pythagv1_3-APO.pdf#page=5";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}