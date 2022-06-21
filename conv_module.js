var prevsum = 0, prev2sum = 0, sumq, suma, m, v, merr, mmax, vmax, verr, ke, keerr, qdata, sel, qty, rd;
function conv() {
    //Produces randomly selected problems in either error calculation or conversion
    var sum;
    document.getElementById("myCanvas");
    myCanvas.height = "0.5";
    myCanvas.width = "0.5";
    myCanvas.style = "border: none;";
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/20200505-MathsBook8Proportionv1_3-APO.pdf#page=4", "_blank")
    }
    do {
        sum = rndgen(1, 6, 0, 1, -1);
    } while(sum === prevsum || sum === prev2sum)
    prev2sum = prevsum;
    prevsum = sum;
    switch(sum) {
        case 1:     //Absolute & relative error
            m = rndgen(10, 30, 0, 1, -1);
            v = rndgen(2, 8, 0, 1, -1);
            merr = rndgen(2, 8, 0, 1, -1);
            verr = rndgen(2, 10, 0, 1, -1);
            mmax = dp(m * (1 + merr / 100), 3, -1);
            vmax = dp(v * (1 + verr / 100), 3, -1);
            ke = dp(0.5 * m * Math.pow(v, 2), 3, -1);
            keerr = dp(0.5 * (m * (1 + merr / 100)) * Math.pow(v * (1 + verr / 100), 2), 3, -1);
            sumq += "Kinetic Energy can be calculated using the formula KE=&#189mv<sup>2</sup><br>";
            sumq += "where m&nbsp;=&nbsp;mass&nbsp;(kg) and v&nbsp;=&nbsp;velocity&nbsp;(m/s).<br>";
            sumq += "If the mass of " + m + "&nbsp;kg is known with an accuracy of &#177&nbsp;" + merr + 
                    "&nbsp;% and the velocity of " + v + "&nbsp;m/s is known with an accuracy of &#177&nbsp;" + verr + 
                    "&nbsp;%, calculate the maximum possible absolute error and the maximum possible relative error " + 
                    "percentage of the kinetic energy, rounding each to 2 decimal places.";
            
            suma += "$$\\begin{aligned}Expected\\ KE&=\\frac{1}{2}mv^2\\\\[5pt]";
            suma += "&=\\frac{1}{2}\\times" + m + "\\times" + v + "^2\\\\[5pt]";
            suma += "&=" + ke + "\\ J\\\\[25pt]";
            suma += "Max\\ value\\ mass&=" + m + "\\times\\left(1+\\frac{" + merr + "}{100}\\right)=" + 
                    mmax + "\\ kg\\\\[5pt]";
            suma += "Max\\ value\\ velocity&=" + v + "\\times\\left(1+\\frac{" + verr + "}{100}\\right)=" + 
                    vmax + "\\ m/s\\\\[5pt]";
            suma += "Max\\ possible\\ KE&=\\frac{1}{2}mv^2=\\frac{1}{2}\\times" + mmax + "\\times" + 
                    vmax + "^2=" + keerr + "\\ J\\\\[25pt]";
            suma += "Absolute\\ error&=Actual-Expected=" + keerr + "-" + ke + "=\\underline{\\mathbf{" + 
                    dp(keerr-ke, 2, -1) + "\\ J\\ (2\\ dp)}}\\\\[10pt]";
            suma += "Relative\\ error&=\\frac{Actual-Expected}{Expected}\\times100=\\frac{" + 
                    keerr + "-" + ke + "}{" + ke + "}\\times100=\\underline{\\mathbf{" + 
                    dp(((keerr-ke)/ke)*100, 3, 2) + "\\ \\%\\ (2\\ dp)}}\\end{aligned}$$";
            break;
        case 2:     //Conversion, quantity to mass, mass to quantity, mass to mass or quantity to quantity
        case 3:
        case 4:
        case 5:
        case 6:
            qdata = [   //Units convert from, units convert to, min qty, max qty, conversion factor, rd role in calc
                ["Gallons(UK)", "Pounds", 500, 1500, 10.02, "mult"],
                ["Pounds", "Gallons(UK)", 4000, 12000, 0.0998, "divide"],
                ["Gallons(UK)", "kg", 500, 1500, 4.545, "mult"],
                ["kg", "Gallons(UK)", 1800, 5500, 0.22, "divide"],
                ["Gallons(US)", "Pounds", 500, 1500, 8.345, "mult"],
                ["Pounds", "Gallons(US)", 3300, 10000, 0.1198, "divide"],
                ["Gallons(US)", "kg", 500, 1500, 3.785, "mult"],
                ["kg", "Gallons(US)", 1500, 4500, 0.2642, "divide"],
                ["Gallons(UK)", "Gallons(US)", 500, 1500, 1.2, "nil"],
                ["Gallons(US)", "Gallons(UK)", 600, 1800, 0.833, "nil"],
                ["Gallons(UK)", "Litres", 500, 1500, 4.545, "nil"],
                ["Litres", "Gallons(UK)", 2200, 6800, 0.22, "nil"],
                ["Gallons(US)", "Litres", 500, 1500, 3.785, "nil"],
                ["Litres", "Gallons(US)", 1900, 5700, 0.2642, "nil"],
                ["Pounds", "kg", 500, 1500, 0.4536, "nil"],
                ["kg", "Pounds", 200, 700, 2.205, "nil"]
            ];
            sel = rndgen(0, 15, 0, 1, -1);      //Selects row of qdata to use for question
            qty = rndgen(qdata[sel][2], qdata[sel][3], 0, 1, -1);
            rd = rndgen(0.78, 0.82, 2, 0.01, -1);
            sumq += "Convert " + thouSep(qty, " ") + "&nbsp;" + qdata[sel][0] + 
                    " of fuel with a specific gravity (relative density) of " + rd + " to " + qdata[sel][1] + 
                    " given that the conversion factor is " + qdata[sel][4] + " Round your answer to 1 decimal places.";

            if(qdata[sel][5] === "mult") {      //qty to mass
                suma += "$$\\begin{aligned}quantity\\times conversion\\ factor\\times relative\\ density&=\\\\[5pt]";
                suma += thouSep(qty, "\\ ") + "\\times" + qdata[sel][4] + "\\times" + rd + "&=\\\\[5pt]";
                suma += "\\underline{\\mathbf{" + thouSep(dp(qty * qdata[sel][4] * rd, 3, 1), "\\ ") + "\\ " + 
                        qdata[sel][1] + "\\ (1\\ dp)}}\\end{aligned}$$";
            } else if(qdata[sel][5] === "divide") {     //mass to qty
                suma += "$$\\begin{aligned}quantity\\times conversion\\ factor\\div relative\\ density&=\\\\[5pt]";
                suma += thouSep(qty, "\\ ") + "\\times" + qdata[sel][4] + "\\div" + rd + "&=\\\\[5pt]";
                suma += "\\underline{\\mathbf{" + thouSep(dp(qty * qdata[sel][4] / rd, 3, 1), "\\ ") + "\\ " + 
                        qdata[sel][1] + "\\ (1\\ dp)}}\\end{aligned}$$";
            } else if(qdata[sel][5] === "nil") {    //mass to mass or qty to qty
                suma += "$$\\begin{aligned}quantity\\times conversion\\ factor&=\\\\[5pt]";
                suma += thouSep(qty, "\\ ") + "\\times" + qdata[sel][4] + "&=\\\\[5pt]";
                suma += "\\underline{\\mathbf{" + thouSep(dp(qty * qdata[sel][4], 3, 1), "\\ ") + "\\ " + 
                        qdata[sel][1] + "\\ (1\\ dp)}}\\end{aligned}$$";
            }
            break;
    }
    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}