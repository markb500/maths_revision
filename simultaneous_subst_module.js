var xcf1, xcf2, x, y, c1, c2, ltr1, ltr2;
function simultaneoussubst() {
//Creates 2 equations in form y = ax + b to be solved by substitution
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/20200505-MathsBook10GraphsSimEquv1_5-APO.pdf#page=18", "_blank")
    }
    switch(rndgen(1, 4, 0, 1, -1)) {
        case 1:
            ltr1 = "x";
            ltr2 = "y";
            break;
        case 2:
            ltr1 = "s";
            ltr2 = "t";
            break;
        case 3:
            ltr1 = "a";
            ltr2 = "b";
            break;
        case 4:
            ltr1 = "&#969"; //omega
            ltr2 = "&#0949"; //epsilon
            break;
    }

    do {
        do {
        xcf1 = rndgen(-9, 9, 0, 1, -1); //-9 to 9 not 0
        } while(xcf1 === 0)
        do {
            x = rndgen(-9, 9, 0, 1, -1); //-9 to 9 not 0 or 1
        } while(x === 0 || Math.abs(x) ===1)
        do {
            c1 = rndgen(-5, 25, 0, 1, -1); //-5 to 25 not 0
        } while(c1 === 0)
        y = xcf1 * x + c1;
        do {
            xcf2 = rndgen(-9, 9, 0, 1, -1); //-9 to 9 not 0
        } while(xcf2 === 0 || xcf2 === xcf1)
        c2 = y - xcf2 * x;
    } while(c2 !== Math.round(c2) || c2 < -5 || c2 > 25 || c2 === 0 || y < -50 || y > 50 +
            Math.abs(y) === 1)
                //Checks c2 is int, between -5 & 25 not 0 and y between -30 & 30
                //Also prevents 'x =' step being same numerator and denominator (too easy)

    sumq += "Solve the simultaneous equations.";
    sumq += "$$\\begin{aligned}" + ltr2 + "&=" + cfchk(xcf1, ltr1, 1, 1) + cfchk(c1, "", 0, 0) + "\\\\" + 
                ltr2 + "&=" + cfchk(xcf2, ltr1, 1, 1) + cfchk(c2, "", 0, 0) + "\\end{aligned}$$<br />";

    suma += "$$\\begin{aligned}" + cfchk(xcf1, ltr1, 1, 1) + cfchk(c1, "", 0, 0) + "&=" +
                cfchk(xcf2, ltr1, 1, 1) + cfchk(c2, "", 0, 0) + "\\\\[5pt]";
        
    if((xcf1 + (-1 * xcf2)) > 0) {  //Gather x's on left
        if(xcf2 < 0) {   //So xcf2 +ve when moved left
            suma += cfchk(xcf1, ltr1, 1, 1) + cfchk(-1 * xcf2, ltr1, 1, 0) + "&=" + 
                    c2 + cfchk(-1 * c1, "", 0, 0) + "\\\\[5pt]";
            suma += cfchk(xcf1 + (-1 * xcf2), ltr1, 1, 1) + "&=" + (c2 + (-1 * c1)) + "\\\\[5pt]";
            if(xcf1 + (-1 * xcf2) !== 1) {
                suma += ltr1 + "&=\\frac{" + (c2 + (-1 * c1)) + "}{" + (xcf1 + (-1 * xcf2)) + "}\\\\[5pt]";
                suma += ltr1 + "&=" + x + "\\\\[5pt]";
            }
        } else {    //So xcf2 -ve when moved left
            suma += cfchk(xcf1, ltr1, 1, 1) + cfchk(-1 * xcf2, ltr1, 1, 0) + "&=" + 
                    c2 + cfchk(-1 * c1, "", 0, 0) + "\\\\[5pt]";
            suma += cfchk(xcf1 + (-1 * xcf2), ltr1, 1, 1) + "&=" + (c2 + (-1 * c1)) + "\\\\[5pt]";
            if(xcf1 + (-1 * xcf2) !== 1) {
                suma += ltr1 + "&=\\frac{" + (c2 - c1) + "}{" + (xcf1 + (-1 * xcf2)) + "}\\\\[5pt]";
                suma += ltr1 + "&=" + x + "\\\\[5pt]";
            }
        }
    } else {    //Gather x's on right
        if(xcf1 < 0) {   //So xcf1 +ve when moved right
            suma += c1 + cfchk(-1 * c2, "", 0, 0) + "&=" + 
                    cfchk(xcf2, ltr1, 1, 1) + "+" + cfchk(-1 * xcf1, ltr1, 1, 0) + "\\\\[5pt]";
            suma += (c1 + (-1 * c2)) + "&=" + cfchk(xcf2 + (-1 * xcf1), ltr1, 1, 1) + "\\\\[5pt]";
            if(xcf2 + (-1 * xcf1) !== 1) {
                suma += "\\frac{" + (c1 - c2) + "}{" + (xcf2 + (-1 * xcf1)) + "}&=" + ltr1 + "\\\\[5pt]";
                suma += x + "&=" + ltr1 + "\\\\[5pt]";
            }
        } else {    //So xcf1 -ve when moved right
            suma += c1 + cfchk(-1 * c2, "", 0, 0) + "&=" + 
                    cfchk(xcf2, ltr1, 1, 1) + cfchk(-1 * xcf1, ltr1, 1, 0) + "\\\\[5pt]";
            suma += (c1 + (-1 * c2)) + "&=" + cfchk(xcf2 + (-1 * xcf1), ltr1, 1, 1) + "\\\\[5pt]";
            if(xcf2 + (-1 * xcf1) !== 1) {
                suma += "\\frac{" + (c1 - c2) + "}{" + (xcf2 + (-1 * xcf1)) + "}&=" + ltr1 + "\\\\[5pt]";
                suma += x + "&=" + ltr1 + "\\\\[5pt]";
            }
        }
    }
    suma += "\\\\";
    if(Math.abs(xcf1) < Math.abs(xcf2)) {   //Choose easiest route to calc y
        suma += ltr2 + "&=" + xcf1 + "\\times" + x + cfchk(c1, "", 0, 0) + "\\\\[5pt]";
    } else {
        suma += ltr2 + "&=" + xcf2 + "\\times" + x + cfchk(c2, "", 0, 0) + "\\\\[5pt]";
    }
    suma += ltr2 + "&=" + y + "\\end{aligned}$$";

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";    
}