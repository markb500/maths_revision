var ltr, r1, p1n, p1d, r2, p2n, p2d, r3, p3n, p3d, xn, xd, comfac, t1, t2, t3;
function indices() {
//Creates expression with 3 terms, 2 on top over the 3rd underneath. Each term can have radical
//from 1 (no radical) up to 9th root, index numerator from -9 to 9 (not 0) and index denominator from 1 to 9.
//Expression simplifies to ltr with index. Index may be frac, which will be in simplest form.
    var t1tmp = "z", t2tmp = "z", t3tmp = "z";
    document.getElementById("myCanvas");
    myCanvas.height = "0.5";
    myCanvas.width = "0.5";
    myCanvas.style = "border: none;";
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/20200504-MathsBook3Indicesv1_3-APO.pdf#page=4", "_blank")
    }
    
    switch(rndgen(1, 4, 0, 1, -1)) {
        case 1:
            ltr = "x";
            break;
        case 2:
            ltr = "m";
            break;
        case 3:
            ltr = "a";
            break;
        case 4:
            ltr = "&#969";  //omega
            break;
    }

    do {
        r1 = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        do {
            p1n = rndgen(-9, 9, 0, 1, -1);   //int 9 to -9 not 0;
        } while(p1n === 0 || Math.abs(p1n) === 1)
        p1d = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        r2 = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        do {
            p2n = rndgen(-9, 9, 0, 1, -1);   //int 9 to -9 not 0;
        } while(p2n === 0 || Math.abs(p1n) === 1)
        p2d = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        r3 = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        do {
            p3n = rndgen(-9, 9, 0, 1, -1);   //int 9 to -9 not 0;
        } while(p3n === 0 || Math.abs(p1n) === 1)
        p3d = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;

        xn = p3d * r3 * (p1n * p2d * r2 + p2n * p1d * r1) - p3n * p1d * r1 * p2d * r2;
        xd = p1d * r1 * p2d * r2 * p3d * r3;
    }while(Math.abs(xn) > 35 || Math.abs(xd) > 10 || Math.abs(xn) === Math.abs(xd) || xn === 0 || xd === 0 || 
            (p1d * r1) === (p2d * r2))  //Sets difficulty level (max numerator & max denominator),
                                        //avoids same numerator & denominator or either being 0 and
                                        //avoids term1 & term2 denoms being same.

    comfac = gcd2(xn, xd);      //Ensures the solution index fraction is in the simplest form
    while(comfac !== 1) {
        xn = xn / comfac;
        xd = xd / comfac;
        comfac = gcd2(xn, xd);
    }
    if(xn > 0 && xd < 0) {      //If numerator +ve but denominator -ve, swap both signs
        xn = xn * -1;
        xd = xd * -1;
    }
    t1 = indchk(ltr, r1, p1n, p1d);
    t2 = indchk(ltr, r2, p2n, p2d);
    t3 = indchk(ltr, r3, p3n, p3d);
    sumq += "Simplify the following expression.";
    sumq += "$$\\frac{" + t1 + "\\times " + t2 + "}{" + t3 + "}$$";
    if(r1 > 1 || r2 > 1 || r3 > 1) {    //If any radicals convert to fractional powers
        if(r1 > 1 && p1d > 1) {
            t1 = indchk(ltr, 1, p1n, p1d + "\\times " + r1);    //shows the sum
            t1tmp = indchk(ltr, 1, p1n, (p1d * r1));            //and the resulting power
        } else if(r1 > 1 && p1d === 1) {
            t1 = indchk(ltr, 1, p1n, r1);
        }
        if(r2 > 1 && p2d > 1) {
            t2 = indchk(ltr, 1, p2n, p2d + "\\times " + r2);
            t2tmp = indchk(ltr, 1, p2n, (p2d * r2));
        } else if(r2 > 1 && p2d === 1) {
            t2 = indchk(ltr, 1, p2n, r2);
        }
        if(r3 > 1 && p3d > 1) {
            t3 = indchk(ltr, 1, p3n, p3d + "\\times " + r3);
            t3tmp = indchk(ltr, 1, p3n, (p3d * r3));
        } else if(r3 > 1 && p3d === 1) {
            t3 = indchk(ltr, 1, p3n, r3);
        }
        suma += "$$\\begin{aligned}&=\\frac{" + t1 + "\\times " + t2 + "}{" + t3 + "}\\\\[5pt]";
        if(t1tmp !== "z" || t2tmp !== "z" || t3tmp !== "z") {    //If any denominators have mult. sum, do it
            if(t1tmp !== "z") {
                t1 = t1tmp;
            }
            if(t2tmp !== "z") {
                t2 = t2tmp;
            }
            if(t3tmp !== "z") {
                t3 = t3tmp;
            }
            suma += "&=\\frac{" + t1 + "\\times " + t2 + "}{" + t3 + "}\\\\[5pt]";
        }
        suma += "&=\\frac{" + indchk(ltr, 1, sumpwrs(p1n, p1d, r1, p2n, p2d, r2, "+"), 1) + 
                    "}{" + t3 + "}\\\\[5pt]";
    } else {
        suma += "$$\\begin{aligned}&=\\frac{" + 
                indchk(ltr, 1, sumpwrs(p1n, p1d, r1, p2n, p2d, r2, "+"), 1) + "}{" + t3 + "}\\\\[5pt]";
    }
    suma += "&=\\frac{" + indchk(ltr, 1, (p1n * p2d * r2 + p2n * p1d * r1), (p1d * r1 * p2d * r2)) + "}{" 
                    + t3 + "}\\\\[5pt]";
    suma += "&=" + indchk(ltr, 1, sumpwrs((p1n * p2d * r2 + p2n * p1d * r1), 
                        (p1d * r1 * p2d * r2), 1, p3n, p3d, r3, "-"), 1) + "\\\\[5pt]";
    
    if(xd === 1) {
        suma += "&=" + ltr + "^{" + xn + "}\\end{aligned}$$";
    } else {
        suma += "&=" + ltr + "^{\\frac{" + xn + "}{" + xd + "}}\\end{aligned}$$";
    }
    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}