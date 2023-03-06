var ltr, r1, n1, d1, r2, n2, d2, r3, n3, d3, nsoln, dsoln, comfac;
function indices() {
//Creates expression with 3 terms, 2 on top over the 3rd underneath. Each term can have radical
//from 1 (no radical) up to 9, index numerator from -9 to 9 (not 0 or 1) and index denominator from 1 to 9.
//Expression simplifies to ltr with index. Index may be frac, which will be in simplest form.
    document.getElementById("myCanvas");
    myCanvas.height = "0.5";
    myCanvas.width = "0.5";
    myCanvas.style = "border: none;";
    document.getElementById("myCanvas2");
    myCanvas2.height = "0.5";
    myCanvas2.width = "0.5";
    myCanvas2.style.visibility = "hidden";
    if (SolnWin) {      //Prior to 1st open of SolnWin, the .closed test is null
        if (!SolnWin.closed) {  //Once SolnWin has been opened, SolnWin is true whether open or closed so need this extra test
            SolnWin.document.getElementById("myCanvas3");
            SolnWin.myCanvas3.height = "0.5";
            SolnWin.myCanvas3.width = "0.5";
        }
    }
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
    var sumtype = rndgen(1, 2, 0, 1, -1);   //1 = (a x b) / c   2 = a / (b x c)
    do {
        r1 = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        do {
            n1 = rndgen(-9, 9, 0, 1, -1);   //int 9 to -9 not 0 or 1;
            d1 = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        } while(n1 === 0 || Math.abs(n1) === 1 || Math.abs(n1) === Math.abs(r1 * d1))
        r2 = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        do {
            n2 = rndgen(-9, 9, 0, 1, -1);   //int 9 to -9 not 0 or 1;
            d2 = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        } while(n2 === 0 || Math.abs(n2) === 1 || Math.abs(n2) === Math.abs(r2 * d2))
        r3 = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        do {
            n3 = rndgen(-9, 9, 0, 1, -1);   //int 9 to -9 not 0 or 1;
            d3 = rndgen(1, 9, 0, 1, -1);   //int 1 to 9;
        } while(n3 === 0 || Math.abs(n3) === 1 || Math.abs(n3) === Math.abs(r3 * d3))
        if (sumtype === 1) {
            nsoln = n1 * (d2 * r2 * d3 * r3) + n2 * (d1 * r1 * d3 * r3) - n3 * (d1 * r1 * d2 * r2);
            dsoln = d1 * r1 * d2 * r2 * d3 * r3;
        } else {
            nsoln = (n1 * d2 * r2 * d3 * r3) - (n2 * d1 * r1 * d3 * r3 + n3 * d1 * r1 * d2 * r2);
            dsoln = (d1 * r1 * d2 * r2 * d3 * r3);
        }
    } while(Math.abs(nsoln) > 35 || Math.abs(dsoln) > 10 || Math.abs(nsoln) === Math.abs(dsoln) || nsoln === 0 || dsoln === 0 || 
            (d1 * r1) === (d2 * r2))  //Sets difficulty level (max numerator & max denominator),
                                        //avoids same numerator & denominator or either being 0 and
                                        //avoids term1 & term2 denoms being same.
    
    comfac = gcd2(nsoln, dsoln);      //Ensures the solution index fraction is in the simplest form
    while(comfac !== 1) {
        nsoln = nsoln / comfac;
        dsoln = dsoln / comfac;
        comfac = gcd2(nsoln, dsoln);
    }
    if(nsoln > 0 && dsoln < 0) {      //If numerator +ve but denominator -ve, swap both signs
        nsoln = nsoln * -1;
        dsoln = dsoln * -1;
    }
    if (sumtype === 1) {    //(a x b) / c
        sumq += "Simplify the following expression.";
        sumq += "$$\\frac{" + indchk(ltr, r1, n1, d1, 1) + "\\times " + indchk(ltr, r2, n2, d2, 1) + "}{" + indchk(ltr, r3, n3, d3, 1) + "}$$";
        if(r1 > 1 || r2 > 1 || r3 > 1) {    //If any radicals convert to fractional powers, build them into the fraction
            suma += "$$\\begin{aligned}&=\\frac{" + indchk(ltr, r1, n1, d1, 2) + "\\times " + indchk(ltr, r2, n2, d2, 2) + "}{" + indchk(ltr, r3, n3, d3, 2) + "}\\\\[5pt]";
        } else {
            suma += "$$\\begin{aligned}";
        }
        suma += "&=" + ltr + "^{" + indchk(ltr, r1, n1, d1, 3) + "+" + indchk(ltr, r2, n2, d2, 3) + "-" + indchk(ltr, r3, n3, d3, 3) + "}\\\\[5pt]";
    } else {    //a / (b x c)
        sumq += "Simplify the following expression.";
        sumq += "$$\\frac{" + indchk(ltr, r1, n1, d1, 1) + "}{" + indchk(ltr, r2, n2, d2, 1) + "\\times " + indchk(ltr, r3, n3, d3, 1) + "}$$";
        if(r1 > 1 || r2 > 1 || r3 > 1) {    //If any radicals convert to fractional powers, build them into the fraction
            suma += "$$\\begin{aligned}&=\\frac{" + indchk(ltr, r1, n1, d1, 2) + "}{" + indchk(ltr, r2, n2, d2, 2) + "\\times " + indchk(ltr, r3, n3, d3, 2) + "}\\\\[5pt]";
        } else {
            suma += "$$\\begin{aligned}";
        }
        suma += "&=" + ltr + "^{" + indchk(ltr, r1, n1, d1, 3) + "-(" + indchk(ltr, r2, n2, d2, 3) + "+" + indchk(ltr, r3, n3, d3, 3) + ")}\\\\[5pt]";
    }
    if(dsoln === 1) {
        suma += "&=" + ltr + "^{" + nsoln + "}\\end{aligned}$$";
    } else {
        suma += "&=" + ltr + "^{\\frac{" + nsoln + "}{" + dsoln + "}}\\end{aligned}$$";
    }
    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}