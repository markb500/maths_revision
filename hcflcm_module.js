var prevnum = 0, term1 = [], term2 = [], term3 = [], hcf = [], lcm = [];
function hcflcm(ctx2) {
//Creates an expression with 3 terms, each with up to 4 variables. Each variable has an index from 1 to 6
//Solution requires HCF (GCD) and LCM to be found without use of a calculator (primes tree shown in soln),
//followed by factorisation of the expression.
    var ltrsel, sign1, sign2, f01, f02, f03, f11, f12, f13, f21, f22, f23, f31, f32, f33;
    sumq = "";
    suma = "";
    do {    //Generates hcf, creates 3 random multiples of hcf and then gets lcm of those 3 terms
        hcf[0] = rndgen(2, 11, 0, 1, -1);  //int 2 to 11
        term1[0] = hcf[0] * rndgen(1, 8, 0, 1, -1);
        term2[0] = hcf[0] * rndgen(1, 8, 0, 1, -1);
        term3[0] = hcf[0] * rndgen(1, 8, 0, 1, -1);
        lcm[0] = lcm([term1[0], term2[0], term3[0]]);
        hcf[0] = gcd([term1[0], term2[0], term3[0]]);   //Ensures hcf is highest possible for the 3 terms
    } while(term1[0] === term2[0] || term1[0] === term3[0] || term2[0] === term3[0] ||
            hcf[0] === term1[0] || hcf[0] === term2[0] || hcf[0] === term3[0] ||
            hcf[0] === 10)  //Ensures 3 different terms, none equal to hcf and hcf not 10 (far too easy)
    
    var primeFacs1 = primeFactors(term1[0]);
    var primeFacs2 = primeFactors(term2[0]);
    var primeFacs3 = primeFactors(term3[0]);
    var primesExp1 = primeExponents(primeFacs1);
    var primesExp2 = primeExponents(primeFacs2);
    var primesExp3 = primeExponents(primeFacs3);
    
    ctx2.fillText(primeTree(ctx2, term1, primeFacs1, primesExp1, 75, 50), x - 50, 330);
    ctx2.fillText(primeTree(ctx2, term2, primeFacs2, primesExp2, 250, 50), x - 50, 330);
    ctx2.fillText(primeTree(ctx2, term3, primeFacs3, primesExp3, 425, 50), x - 50, 330);

    for(var i = 2; i < 9; i += 2) { //Generates the powers for each variable in each term, 0 to 6
        term1[i] = rndgen(0, 6, 0, 1, -1);
        term2[i] = rndgen(0, 6, 0, 1, -1);
        term3[i] = rndgen(0, 6, 0, 1, -1);
    }
        //random choose + or - for signs in expression
    if(rndgen(1, 2, 0, 1, -1) === 1) {
        sign1 = "+";
    } else {
        sign1 = "-";
    }
    
    if(rndgen(1, 2, 0, 1, -1) === 1) {
        sign2 = "+";
    } else {
        sign2 = "-";
    }
        //Choose group of symbols for use as variables
    do {
        ltrsel = rndgen(1, 3, 0, 1, -1);
    } while (prevnum = ltrsel)
    prevnum = ltrsel;

    switch (ltrsel) {
        case 1:
            term1[1] = "a";
            term1[3] = "b";
            term1[5] = "c";
            term1[7] = "d";
            term2[1] = "a";
            term2[3] = "b";
            term2[5] = "c";
            term2[7] = "d";
            term3[1] = "a";
            term3[3] = "b";
            term3[5] = "c";
            term3[7] = "d";
            break;
        case 2:
            term1[1] = "w";
            term1[3] = "x";
            term1[5] = "y";
            term1[7] = "z";
            term2[1] = "w";
            term2[3] = "x";
            term2[5] = "y";
            term2[7] = "z";
            term3[1] = "w";
            term3[3] = "x";
            term3[5] = "y";
            term3[7] = "z";
            break;
        case 3:
            term1[1] = "&#945"; //alpha
            term1[3] = "&#956"; //mu
            term1[5] = "&#961"; //rho
            term1[7] = "&#969"; //omega
            term2[1] = "&#945";
            term2[3] = "&#956";
            term2[5] = "&#961";
            term2[7] = "&#969";
            term3[1] = "&#945";
            term3[3] = "&#956";
            term3[5] = "&#961";
            term3[7] = "&#969";
            break;
    }

    for (var j = 2; j < 9; j += 2) {    //Get hcf and lcm of variables
        hcf[j - 1] = term1[j - 1];
        hcf[j] = Math.min(term1[j], term2[j], term3[j]);
        lcm[j - 1] = term1[j - 1];
        lcm[j] = Math.max(term1[j], term2[j], term3[j]);
    }
    f01 = "";
    f02 = "";
    f03 = "";
    f11 = "";
    f21 = "";
    f31 = "";
    f12 = "";
    f22 = "";
    f32 = "";
    f13 = "";
    f23 = "";
    f33 = "";
    if(rndgen(1, 5, 0, 1, -1) === 5 && hcf[8] !== 0 && hcf[8] < 6 &&
        hcf[2] + hcf[4] + hcf[6] !== 0 &&
        term1[2] - hcf[2] + term1[4] - hcf[4] + term1[6] - hcf[6] !== 0 &&
        term2[2] - hcf[2] + term2[4] - hcf[4] + term2[6] - hcf[6] !== 0 &&
        term3[2] - hcf[2] + term3[4] - hcf[4] + term3[6] - hcf[6] !== 0) {
        f01 = "\\frac{";
        f02 = "}{";
        f03 = "}";
        if(term1[8] !== hcf[8]) {   //check for denominator in factorised term1
            f11 = "\\frac{";
            f12 = "}{";
            f13 = "}";
        }
        if(term2[8] !== hcf[8]) {   //check for denominator in factorised term2
            f21 = "\\frac{";
            f22 = "}{";
            f23 = "}";
        }
        if(term3[8] !== hcf[8]) {   //check for denominator in factorised term3
            f31 = "\\frac{";
            f32 = "}{";
            f33 = "}";
        }
    }
    
    sumq += "Find the HCF & LCM, without using a calculator, and factorise the expression."
    sumq += "$$" + term1[0] + f01 + chkpwr(term1[1], term1[2]) + chkpwr(term1[3], term1[4]) + 
                    chkpwr(term1[5], term1[6]) + f02 + chkpwr(term1[7], term1[8]) + f03 + sign1 + 
                    term2[0] + f01 + chkpwr(term2[1], term2[2]) + chkpwr(term2[3], term2[4]) + 
                    chkpwr(term2[5], term2[6]) + f02 + chkpwr(term2[7], term2[8]) + f03 + sign2 + 
                    term3[0] + f01 + chkpwr(term3[1], term3[2]) + chkpwr(term3[3], term3[4]) + 
                    chkpwr(term3[5], term3[6]) + f02 + chkpwr(term3[7], term3[8]) + f03 + "$$<br />";
    
    suma += "<br>".repeat(12);
    suma += "$$\\begin{aligned}HCF&=" + hcf[0] + f01 + chkpwr(hcf[1], hcf[2]) + chkpwr(hcf[3], hcf[4]) + 
                chkpwr(hcf[5], hcf[6]) + f02 + chkpwr(hcf[7], hcf[8]) + f03 + "\\\\" + "\\\\" +

                "LCM&=" + lcm[0] + f01 + chkpwr(lcm[1], lcm[2]) + chkpwr(lcm[3], lcm[4]) + 
                chkpwr(lcm[5], lcm[6]) + f02 + chkpwr(lcm[7], lcm[8]) + f03 + "\\\\" + "\\\\" +

                "&" + hcf[0] + f01 + chkpwr(hcf[1], hcf[2]) + chkpwr(hcf[3], hcf[4]) + 
                chkpwr(hcf[5], hcf[6]) + f02 + chkpwr(hcf[7], hcf[8]) + f03 + "\\left(" + 
                (term1[0] / hcf[0]) + f11 + chkpwr(term1[1], term1[2] - hcf[2]) + 
                chkpwr(term1[3], term1[4] - hcf[4]) + chkpwr(term1[5], term1[6] - hcf[6]) + 
                f12 + chkpwr(term1[7], term1[8] - hcf[8]) + f13 + sign1 + 
                (term2[0] / hcf[0]) + f21 + chkpwr(term2[1], term2[2] - hcf[2]) + 
                chkpwr(term2[3], term2[4] - hcf[4]) + chkpwr(term2[5], term2[6] - hcf[6]) + 
                f22 + chkpwr(term2[7], term2[8] - hcf[8]) + f23 + sign2 + 
                (term3[0] / hcf[0]) + f31 + chkpwr(term3[1], term3[2] - hcf[2]) + 
                chkpwr(term3[3], term3[4] - hcf[4]) + chkpwr(term3[5], term3[6] - hcf[6]) + 
                f32 + chkpwr(term3[7], term3[8] - hcf[8]) + f33 + "\\right)\\end{aligned}$$"

  var notesLink = "images/20200504-MathsBook4HCFLCMFactv1_5-APO.pdf#page=3"
  var sumArray = [sumq, suma, notesLink];
  return sumArray;
}