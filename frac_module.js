var f1 = [], f2 = [], f3 = [], ans1 = [], ans2 = [], anstot = [], op1, op2;
function fracs() {
//Creates a sum with 3 mixed-number fractions, either '+ - with +, -, * or /' or '* / with * /'.
    var sign1, sign2, comdenom, gcd, tmp, sign1cx = false, sign2cx = false, anscx = false, anstot = [];
    sumq = "";
    suma = "";
    sign1 = rndgen(1, 4, 0, 1, -1);    //1 = +, 2 = -, 3 = *, 4 = /
    if(sign1 < 3) {     //If sign1 + or -, sign2 can be any
        sign2 = rndgen(1, 4, 0, 1, -1);
    } else {            //Both signs * or /
        sign2 = rndgen(3, 4, 0, 1, -1);
    }
    switch(sign1) {
        case 1:
            op1 = "+";
            break;
        case 2:
            op1 = "-";
            break;
        case 3:
            op1 = "\\times";
            break;
        case 4:
            op1 = "\\div";
            break;
    }
    switch(sign2) {
        case 1:
            op2 = "+";
            break;
        case 2:
            op2 = "-";
            break;
        case 3:
            op2 = "\\times";
            break;
        case 4:
            op2 = "\\div";
            break;
    }
    do {
        sumq = "";
        suma = "";
        do {
            if(sign1cx) {   //If signs were changed as part of div sum, change 'em back
                sign1 = 4;
                op1 = "\\div";
                sign1cx = false;
            }
            if(sign2cx) {
                sign2 = 4;
                op2 = "\\div";
                sign2cx = false;
            }
            anscx = false;
            f1[0] = rndgen(1, 4, 0, 1, -1);       //3 whole nums for mixed frac
            f2[0] = rndgen(1, 4, 0, 1, -1);
            f3[0] = rndgen(1, 4, 0, 1, -1);
            f1[2] = rndgen(2, 9, 0, 1, -1);       //3 denoms 2 to 9
            f2[2] = rndgen(2, 9, 0, 1, -1);
            f3[2] = rndgen(2, 9, 0, 1, -1);
            f1[1] = rndgen(1, f1[2] - 1, 0, 1, -1);   //3 numerators 1 to < denom
            f2[1] = rndgen(1, f2[2] - 1, 0, 1, -1);
            f3[1] = rndgen(1, f3[2] - 1, 0, 1, -1);
        } while(gcd2(f1[1], f1[2]) !== 1 ||
                gcd2(f2[1], f2[2]) !== 1 ||
                gcd2(f3[1], f3[2]) !== 1 ||
                (f1[0] * f1[2] + f1[1]) - (f2[0] * f2[2] + f2[1]) === 0 ||
                (f1[0] * f1[2] + f1[1]) - (f3[0] * f3[2] + f3[1]) === 0 ||
                (f2[0] * f2[2] + f2[1]) - (f3[0] * f3[2] + f3[1]) === 0 ||
                (sign1 < 3 && f1[2] === f2[2]) ||
                (sign2 < 3 && f2[2] === f3[2]) ||
                (sign1 === 3 && gcd2((f1[0] * f1[2] + f1[1]) * (f2[0] * f2[2] + f2[1], f1[2] * f2[2]) === 1)) ||
                (sign1 === 4 && gcd2(f1[0] * f1[2] + f1[1] * f2[2], f1[2] * (f2[0] * f2[2] + f2[1])) === 1) ||
                (sign2 === 3 && gcd2((f2[0] * f2[2] + f2[1]) * (f3[0] * f3[2] + f3[1], f2[2] * f3[2]) === 1)) ||
                (sign2 === 4 && gcd2(f2[0] * f2[2] + f2[1] * f3[2], f2[2] * (f3[0] * f3[2] + f3[1])) === 1))
                    //Checks fractions can't be cancelled, all fractions different,
                    //avoids same denominators in + & - calcs and
                    //ensures some cancelling possible in * & / calcs

        sumq += "Calculate, without using a calculator, giving your answer in its simplest form. " + 
                    "Show all your working.";
        sumq += "$$" + f1[0] + "\\frac{" + f1[1] + "}{" + f1[2] + "}" + op1 + 
        f2[0] + "\\frac{" + f2[1] + "}{" + f2[2] + "}" + op2 + 
        f3[0] + "\\frac{" + f3[1] + "}{" + f3[2] + "}$$";

        comdenom = lcm([f1[2], f2[2], f3[2]]);    //For use in + & - calcs
        if (sign1 < 3 && sign2 < 3) {       //Do + & - calcs
            if(sign1 === 1) {
                if(sign2 === 1) {
                    ans1[0] = f1[0] + f2[0] + f3[0];
                    ans1[1] = (comdenom / f1[2] * f1[1]) + (comdenom / f2[2] * f2[1]) + (comdenom / f3[2] * f3[1]);
                    ans1[2] = comdenom;
                } else if(sign2 === 2) {
                    ans1[0] = f1[0] + f2[0] - f3[0];
                    ans1[1] = (comdenom / f1[2] * f1[1]) + (comdenom / f2[2] * f2[1]) - (comdenom / f3[2] * f3[1]);
                    ans1[2] = comdenom;
                }
            } else if(sign1 === 2) {
                if(sign2 === 1) {
                    ans1[0] = f1[0] - f2[0] + f3[0];
                    ans1[1] = (comdenom / f1[2] * f1[1]) - (comdenom / f2[2] * f2[1]) + (comdenom / f3[2] * f3[1]);
                    ans1[2] = comdenom;
                } else if(sign2 === 2) {
                    ans1[0] = f1[0] - f2[0] - f3[0];
                    ans1[1] = (comdenom / f1[2] * f1[1]) - (comdenom / f2[2] * f2[1]) - (comdenom / f3[2] * f3[1]);
                    ans1[2] = comdenom;
                }
            }
            if(ans1[0] === 0) {
                ans1[0] = "";
            }
            suma += "$$\\begin{aligned}&=" + f1[0] + op1 + f2[0] + op2 + f3[0] + 
                    "+\\frac{(\\frac{" + comdenom + "}{" + f1[2] + "}\\times" + f1[1] + 
                    ")" + op1 + "(\\frac{" + comdenom + "}{" + f2[2] + "}\\times" + f2[1] + 
                    ")" + op2 + "(\\frac{" + comdenom + "}{" + f3[2] + "}\\times" + f3[1] + 
                    ")}{" + comdenom + "}\\\\[5pt]";

            suma += "&=" + ans1[0] + "\\frac{" + comdenom / f1[2] * f1[1] + op1 + 
                    comdenom / f2[2] * f2[1] + op2 + comdenom / f3[2] * f3[1] + "}{" + comdenom + "}\\\\[5pt]";
        } else if (sign1 > 2 && sign2 > 2) {     //Do * & / calcs
            if(sign1 > 2) {
                f1[1] = f1[0] * f1[2] + f1[1]
                f2[1] = f2[0] * f2[2] + f2[1];
                f3[1] = f3[0] * f3[2] + f3[1];
                suma += "$$\\begin{aligned}&=\\frac{" + f1[1] + "}{" + f1[2] + "}" + op1 + 
                        "\\frac{" + f2[1] + "}{" + f2[2] + "}" + op2 + 
                        "\\frac{" + f3[1] + "}{" + f3[2] + "}\\\\[5pt]"
                if(sign1 === 4) {   //Change / to x and flip frac
                    tmp = f2[1];
                    f2[1] = f2[2];
                    f2[2] = tmp;
                    sign1 = 3;
                    op1 = "\\times";
                    sign1cx = true;
                }
                if(sign2 === 4) {   //Change / to x and flip frac
                    tmp = f3[1];
                    f3[1] = f3[2];
                    f3[2] = tmp;
                    sign2 = 3;
                    op2 = "\\times";
                    sign2cx = true;
                }
                if(sign1cx || sign2cx) {    //If a div sum, show with 'times' & flipped frac
                    suma += "&=\\frac{" + f1[1] + "}{" + f1[2] + "}" + op1 + 
                    "\\frac{" + f2[1] + "}{" + f2[2] + "}" + op2 + 
                    "\\frac{" + f3[1] + "}{" + f3[2] + "}\\\\[5pt]"
                }

                gcd = gcd2(f1[1], f1[2]);   //Check all cancelling options
                while(gcd > 1) {
                    f1[1] = f1[1] / gcd;
                    f1[2] = f1[2] / gcd;
                    gcd = gcd2(f1[1], f1[2]);
                    anscx = true;
                }
                gcd = gcd2(f2[1], f2[2]);
                while(gcd > 1) {
                    f2[1] = f2[1] / gcd;
                    f2[2] = f2[2] / gcd;
                    gcd = gcd2(f2[1], f2[2]);
                    anscx = true;
                }
                gcd = gcd2(f3[1], f3[2]);
                while(gcd > 1) {
                    f3[1] = f3[1] / gcd;
                    f3[2] = f3[2] / gcd;
                    gcd = gcd2(f3[1], f3[2]);
                    anscx = true;
                }
                gcd = gcd2(f1[1], f2[2]);
                while(gcd > 1) {
                    f1[1] = f1[1] / gcd;
                    f2[2] = f2[2] / gcd;
                    gcd = gcd2(f1[1], f2[2]);
                    anscx = true;
                }
                gcd = gcd2(f1[1], f3[2]);
                while(gcd > 1) {
                    f1[1] = f1[1] / gcd;
                    f3[2] = f3[2] / gcd;
                    gcd = gcd2(f1[1], f3[2]);
                    anscx = true;
                }
                gcd = gcd2(f2[1], f3[2]);
                while(gcd > 1) {
                    f2[1] = f2[1] / gcd;
                    f3[2] = f3[2] / gcd;
                    gcd = gcd2(f2[1], f3[2]);
                    anscx = true;
                }
                gcd = gcd2(f3[1], f1[2]);
                while(gcd > 1) {
                    f3[1] = f3[1] / gcd;
                    f1[2] = f1[2] / gcd;
                    gcd = gcd2(f3[1], f1[2]);
                    anscx = true;
                }
                gcd = gcd2(f3[1], f2[2]);
                while(gcd > 1) {
                    f3[1] = f3[1] / gcd;
                    f2[2] = f2[2] / gcd;
                    gcd = gcd2(f3[1], f2[2]);
                    anscx = true;
                }
                gcd = gcd2(f2[1], f1[2]);
                while(gcd > 1) {
                    f2[1] = f2[1] / gcd;
                    f1[2] = f1[2] / gcd;
                    gcd = gcd2(f2[1], f1[2]);
                    anscx = true;
                }
                ans1[0] = 0;
                ans1[1] = f1[1] * f2[1] * f3[1];
                ans1[2] = f1[2] * f2[2] * f3[2];
                
                if(anscx) {     //For the rare 'no cancelling' case
                    suma += "&=\\frac{" + f1[1] + "}{" + f1[2] + "}" + op1 + 
                            "\\frac{" + f2[1] + "}{" + f2[2] + "}" + op2 + 
                            "\\frac{" + f3[1] + "}{" + f3[2] + "}\\\\[5pt]";
                            anscx = false;
                }
            }
        } else if (sign1 <3 && sign2 > 2) {     //Do mixed sum, + - with * /
            f2[1] = f2[0] * f2[2] + f2[1];      //Turn fracs 2 & 3 into improper fracs for * or / sum
            f3[1] = f3[0] * f3[2] + f3[1];
            suma += "$$\\begin{aligned}&=" + f1[0] + "\\frac{" + f1[1] + "}{" + f1[2] + "}" + op1 + 
                    "\\frac{" + f2[1] + "}{" + f2[2] + "}" + op2 + 
                    "\\frac{" + f3[1] + "}{" + f3[2] + "}\\\\[5pt]"
            if(sign2 === 4) {   //If div change sign, flip frac and show new sum
                tmp = f3[1];
                f3[1] = f3[2];
                f3[2] = tmp;
                sign2 = 3;
                op2 = "\\times";
                sign2cx = true;
                suma += "&=" + f1[0] + "\\frac{" + f1[1] + "}{" + f1[2] + "}" + op1 + 
                "\\frac{" + f2[1] + "}{" + f2[2] + "}" + op2 + 
                "\\frac{" + f3[1] + "}{" + f3[2] + "}\\\\[5pt]"
            }

            gcd = gcd2(f2[1], f2[2]);   //Check all cancelling options
            while(gcd > 1) {
                f2[1] = f2[1] / gcd;
                f2[2] = f2[2] / gcd;
                gcd = gcd2(f2[1], f2[2]);
                anscx = true;
            }
            gcd = gcd2(f3[1], f3[2]);
            while(gcd > 1) {
                f3[1] = f3[1] / gcd;
                f3[2] = f3[2] / gcd;
                gcd = gcd2(f3[1], f3[2]);
                anscx = true;
            }
            gcd = gcd2(f2[1], f3[2]);
            while(gcd > 1) {
                f2[1] = f2[1] / gcd;
                f3[2] = f3[2] / gcd;
                gcd = gcd2(f2[1], f3[2]);
                anscx = true;
            }
            gcd = gcd2(f3[1], f2[2]);
            while(gcd > 1) {
                f3[1] = f3[1] / gcd;
                f2[2] = f2[2] / gcd;
                gcd = gcd2(f3[1], f2[2]);
                anscx = true;
            }
            if(anscx) {     //For the rare 'no cancelling' case
                suma += "&=" + f1[0] + "\\frac{" + f1[1] + "}{" + f1[2] + "}" + op1 + 
                        "\\frac{" + f2[1] + "}{" + f2[2] + "}" + op2 + 
                        "\\frac{" + f3[1] + "}{" + f3[2] + "}\\\\[5pt]";
                        anscx = false;
            }
            ans2[0] = 0;
            ans2[1] = f2[1] * f3[1];
            ans2[2] = f2[2] * f3[2];
            
            suma += "&=" + f1[0] + "\\frac{" + f1[1] + "}{" + f1[2] + "}" + op1 + 
                    "\\frac{" + ans2[1] + "}{" + ans2[2] + "}\\\\[5pt]";

            comdenom = lcm2(f1[2], ans2[2]);    //Do + or - part of sum
            suma += "&=" + f1[0] + "+\\frac{(\\frac{" + comdenom + "}{" + f1[2] + "}\\times" + f1[1] + ")" + op1 + 
                    "(\\frac{" + comdenom + "}{" + ans2[2] + "}\\times" + ans2[1] + ")}{" + comdenom + "}\\\\[5pt]";

            suma += "&=" + f1[0] + "\\frac{" + comdenom / f1[2] * f1[1] + op1 + comdenom / ans2[2] * ans2[1] + "}{" + comdenom + "}\\\\[5pt]";
            if (sign1 === 1) {
                ans1[0] = f1[0] + ans2[0];
                ans1[1] = (comdenom / f1[2] * f1[1]) + (comdenom / ans2[2] * ans2[1]);
                ans1[2] = comdenom;
            } else if (sign1 === 2) {
                ans1[0] = f1[0] - ans2[0];
                ans1[1] = (comdenom / f1[2] * f1[1]) - (comdenom / ans2[2] * ans2[1]);
                ans1[2] = comdenom;
            }
        }
    } while(Math.abs(ans1[0]) > 75 || Math.abs(ans1[1]) > 75 || Math.abs(ans1[2]) > 75 || (sign1 < 3 && sign2 > 2 && (comdenom === f1[2] || comdenom === ans2[2])))
        //Keeps figures in solution manageable and, in mixed + - with * / sum, prevents common denominator being same as either denom in addition sum
    
    if(ans1[0] === 0) {
        suma += "&=\\frac{" + ans1[1] + "}{" + ans1[2] + "}\\\\[5pt]";
    } else {
        suma += "&=" + ans1[0] + "\\frac{" + ans1[1] + "}{" + ans1[2] + "}\\\\[5pt]"; 
    }

    if(Math.abs(ans1[1]) > Math.abs(ans1[2])) {     //Deal with improper frac
        ans1[0] += (ans1[1] - (ans1[1] % ans1[2])) / ans1[2];
        ans1[1] = ans1[1] % ans1[2];
        anscx = true;
    }
    if(ans1[1] < 0 && ans1[0] > 0) {    //-ve numerator & +ve whole number.
        anstot[0] = ans1[0] - 1;
        anstot[1] = ans1[2] + ans1[1];
        anstot[2] = ans1[2];
        anscx = true;
    } else if(ans1[1] < 0 && ans1[0] < 0) { //-ve numerator & -ve whole number
        anstot[0] = ans1[0];
        anstot[1] = Math.abs(ans1[1]);
        anstot[2] = ans1[2];
        anscx = true;
    } else if (ans1[0] < 0 && ans1[1] > 0) { //+ve numerator & -ve whole number
        anstot[0] = ans1[0] + 1;
        anstot[1] = ans1[1] - ans1[2];
        anstot[2] = ans1[2];
        anscx = true;
    } else if(ans1[1] === ans1[2]) {    //Frac = 1
        anstot[0] = ans1[0] + 1;
        anstot[1] = 0;
        anstot[2] = 0;
        anscx = true;
    } else if(ans1[2] === 1) {      //Denominator = 1
        anstot[0] = ans1[0] + ans1[1];
        anstot[1] = 0;
        anstot[2] = 0;
        anscx = true;
    } else {
        anstot[0] = ans1[0];
        anstot[1] = ans1[1];
        anstot[2] = ans1[2];
    }
    if (anstot[1] > anstot[2]) {    //Simplify improper frac
        anstot[0] += (anstot[1] - (anstot[1] % anstot[2])) / anstot[2];
        anstot[1] = anstot[1] % anstot[2];
        anscx = true;
    }
    gcd = gcd2(Math.abs(anstot[1]), Math.abs(anstot[2]))
    while(gcd > 1) {        //Check if frac cancels
        anstot[1] = anstot[1] / gcd;
        anstot[2] = anstot[2] / gcd;
        gcd = gcd2(Math.abs(anstot[1]), Math.abs(anstot[2]));
        anscx = true;
    }

    if(anscx) {     //If above section changed ans, show new
        if(anstot[0] === 0 && anstot[1] !== 0 && anstot[2] !== 0) {
            suma += "&=\\frac{" + anstot[1] + "}{" + anstot[2] + "}\\end{aligned}$$";
        } else if(anstot[1] === 0 || anstot[2] === 0) {
            suma += "&=" + anstot[0] + "\\end{aligned}$$";
        } else {
            suma += "&=" + anstot[0] + "\\frac{" + anstot[1] + "}{" + anstot[2] + "}\\end{aligned}$$";
        }
    } else {
        suma += "\\end{aligned}$$";
    }
    var notesLink = "images/20200427-MathsBook1BasicNumv1_3-APO.pdf#page=22";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}