var x, y, xcf1, xcf2, ycf1, ycf2, c1, c2, ltr1, ltr2;
function simultaneous() {
    switch (rndgen(1, 2, 0, 1, -1)) {
        case 1:
            //Creates 2 equations in the form ax + by = c to be solved by the elimination method
            var h;
            sumq = "";
            suma = "";
            var notesLink = "images/20200505-MathsBook10GraphsSimEquv1_5-APO.pdf#page=20";
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
                    do {
                        y = rndgen(-6, 6, 0, 1, -1);   //-6 to 6 not 0, 1 or -1
                    } while(y === 0 || Math.abs(y) === 1)
                    do {
                        xcf1 = rndgen(-9, 9, 0, 1, -1);     //-9 to 9 not 0
                    } while(xcf1 === 0)
                    do {
                        ycf1 = rndgen(-9, 9, 0, 1, -1);    //-9 to 9 not 0
                    } while(ycf1 === 0)
                    do {
                        c1 = rndgen(-5, 25, 0, 1, -1);      //-5 to 25 not 0
                    } while(c1 === 0)
                    x = (c1 - (ycf1 * y)) / xcf1; 
                } while(!Number.isInteger(x) || (x) === 0)     //Checks x is none 0 int
        
                do {
                    xcf2 = rndgen(-9, 9, 0, 1, -1);    //-9 to 9 not 0
                } while(xcf2 === 0)
                do {
                    ycf2 = rndgen(-9, 9, 0, 1, -1);    //-9 to 9 not 0
                } while(ycf2 === 0)
            } while(!Number.isInteger((xcf2 * x) + (ycf2 * y)) ||
                    (xcf2 * x) + (ycf2 * y) === 0 ||
                    (xcf2 * x) + (ycf2 * y) > 25 ||
                    (xcf2 * x) + (ycf2 * y) < -5 ||
                    Math.abs(xcf1) === Math.abs(xcf2) ||
                    Math.abs(ycf1) === Math.abs(ycf2) ||
                    (Math.abs(xcf1) === Math.abs(ycf1) && Math.abs(xcf2) === Math.abs(ycf2)) ||
                    (Math.abs(ycf1) * Math.abs(xcf2) === Math.abs(ycf2) * Math.abs(xcf1)) ||
                    Math.abs(x) === 1)
        
            c2 = (xcf2 * x) + (ycf2 * y);
        
            sumq += "Solve the simultaneous equations.";
            sumq += "$$\\begin{alignat}{2}" + 
                        cfchk(xcf1, ltr1, 1, 1) + cfchk(ycf1, ltr2, 1, 0) + "&=" + c1 + "\\qquad\\qquad &&eqn 1\\\\[5pt]" + 
                        cfchk(xcf2, ltr1, 1, 1) + cfchk(ycf2, ltr2, 1, 0) + "&=" + c2 + "&&eqn 2" + 
                        "\\end{alignat}$$";
            
            if((Math.abs(xcf1) * Math.abs(xcf2)) < (Math.abs(ycf1) * Math.abs(ycf2))) {     //x's easiest to eliminate
                h = gcd2(Math.abs(xcf1), Math.abs(xcf2));       //Used to create lowest multipliers for equations
                suma += "$$\\begin{alignat}{2}\\qquad\\qquad\\qquad\\qquad" + cfchk(xcf1 * Math.abs(xcf2) / h, ltr1, 1, 1) + 
                                cfchk(ycf1 * Math.abs(xcf2) / h, ltr2, 1, 0) + "&=" + c1 * Math.abs(xcf2) / h + 
                                "\\qquad\\qquad\\qquad &&eqn 1 \\times" + Math.abs(xcf2) / h + "\\\\[5pt]";
                suma += cfchk(xcf2 * Math.abs(xcf1) / h, ltr1, 1, 1) + cfchk(ycf2 * Math.abs(xcf1) / h, ltr2, 1, 0) + "&=" + 
                            c2 * Math.abs(xcf1) / h + "&&eqn 2 \\times" + Math.abs(xcf1) / h + "\\\\[5pt]";
                if((xcf1 > 0 && xcf2 > 0) || (xcf1 < 0 && xcf2 < 0)) {      //Signs same so subtract to eliminate x's
                    if((ycf1 * Math.abs(xcf2) / h - ycf2 * Math.abs(xcf1) / h) > 0) {       //eqn1 - eqn2
                        if((ycf1 * Math.abs(xcf2) / h - ycf2 * Math.abs(xcf1) / h) === 1) {
                            suma += cfchk((ycf1 * Math.abs(xcf2) / h - ycf2 * Math.abs(xcf1) / h), ltr2, 1, 1) + "&=" + 
                                    (c1 * Math.abs(xcf2) / h - c2 * Math.abs(xcf1) / h) + "&&eqn 1 - eqn 2\\\\[20pt]";
                        } else {
                            suma += cfchk((ycf1 * Math.abs(xcf2) / h - ycf2 * Math.abs(xcf1) / h), ltr2, 1, 1) + "&=" + 
                                            (c1 * Math.abs(xcf2) / h - c2 * Math.abs(xcf1) / h) + "&&eqn 1 - eqn 2\\\\[5pt]";
                            suma += ltr2 + "&=\\frac{" + (c1 * Math.abs(xcf2) / h - c2 * Math.abs(xcf1) / h) + "}{" + 
                                            (ycf1 * Math.abs(xcf2) / h - ycf2 * Math.abs(xcf1) / h) + "}\\\\[5pt]";
                            suma += ltr2 + "&=" + y + "\\\\[20pt]";
                        }
                    } else {                                    //eqn2 - eqn1
                        if((ycf2 * Math.abs(xcf1) / h - ycf1 * Math.abs(xcf2) / h) === 1) {
                            suma += cfchk((ycf2 * Math.abs(xcf1) / h - ycf1 * Math.abs(xcf2) / h), ltr2, 1, 1) + "&=" + 
                                    (c2 * Math.abs(xcf1) / h - c1 * Math.abs(xcf2) / h) + "&&eqn 2 - eqn 1\\\\[20pt]";
                        } else {
                            suma += cfchk((ycf2 * Math.abs(xcf1) / h - ycf1 * Math.abs(xcf2) / h), ltr2, 1, 1) + "&=" + 
                                            (c2 * Math.abs(xcf1) / h - c1 * Math.abs(xcf2) / h) + "&&eqn 2 - eqn 1\\\\[5pt]";
                            suma += ltr2 + "&=\\frac{" + (c2 * Math.abs(xcf1) / h - c1 * Math.abs(xcf2) / h) + "}{" + 
                                            (ycf2 * Math.abs(xcf1) / h - ycf1 * Math.abs(xcf2) / h) + "}\\\\[5pt]";
                            suma += ltr2 + "&=" + y + "\\\\[20pt]";
                        }
                    }
                } else {
                    if((ycf1 * Math.abs(xcf2) / h + ycf2 * Math.abs(xcf1) / h) === 1) {
                        suma += cfchk((ycf1 * Math.abs(xcf2) / h + ycf2 * Math.abs(xcf1) / h), ltr2, 1, 1) + "&=" + 
                                    (c1 * Math.abs(xcf2) / h + c2 * Math.abs(xcf1) / h) + "&&eqn 1 + eqn 2\\\\[20pt]";
                    } else {
                        suma += cfchk((ycf1 * Math.abs(xcf2) / h + ycf2 * Math.abs(xcf1) / h), ltr2, 1, 1) + "&=" + 
                                        (c1 * Math.abs(xcf2) / h + c2 * Math.abs(xcf1) / h) + "&&eqn 1 + eqn 2\\\\[5pt]";
                        suma += ltr2 + "&=\\frac{" + (c1 * Math.abs(xcf2) / h + c2 * Math.abs(xcf1) / h) + "}{" + 
                                        (ycf1 * Math.abs(xcf2) / h + ycf2 * Math.abs(xcf1) / h) + "}\\\\[5pt]";
                        suma += ltr2 + "&=" + y + "\\\\[20pt]";
                    }
                }
                if(Math.abs(ycf1) < Math.abs(ycf2)) {   //Sub y in eqn1
                    suma += cfchk(xcf1, ltr1, 1, 1) + cfchk(ycf1, "", 0, 0) + "\\times" + y + "&=" + 
                                c1 + "&&Substitute\\ " + ltr2 + "\\ in\\ eqn 1\\\\[5pt]";
                    suma += cfchk(xcf1, ltr1, 1, 1) + cfchk(ycf1 * y, "", 0, 0) + "&=" + c1 + "\\\\[5pt]";
                    if(xcf1 === 1) {
                        suma += ltr1 + "&=" + c1 + cfchk(-1 * ycf1 * y, "", 0, 0) + "\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\end{alignat}$$";
                    } else {
                        suma += ltr1 + "&=\\frac{" + c1 + cfchk(-1 * ycf1 * y, "", 0, 0) + "}{" + xcf1 + "}\\\\[5pt]";
                        suma += ltr1 + "&=\\frac{" + (c1 + -1 * ycf1 * y) + "}{" + xcf1 + "}\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\end{alignat}$$";
                    }
                } else {        //Sub y in eqn2
                    suma += cfchk(xcf2, ltr1, 1, 1) + cfchk(ycf2, "", 0, 0) + "\\times" + y + "&=" + 
                                c2 + "&&Substitute\\ " + ltr2 + "\\ in\\ eqn 2\\\\[5pt]";
                    suma += cfchk(xcf2, ltr1, 1, 1) + cfchk(ycf2 * y, "", 0, 0) + "&=" + c2 + "\\\\[5pt]";
                    if(xcf2 === 1) {
                        suma += ltr1 + "&=" + c2 + cfchk(-1 * ycf2 * y, "", 0, 0) + "\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\end{alignat}$$";
                    } else {
                        suma += ltr1 + "&=\\frac{" + c2 + cfchk(-1 * ycf2 * y, "", 0, 0) + "}{" + xcf2 + "}\\\\[5pt]";
                        suma += ltr1 + "&=\\frac{" + (c2 + -1 * ycf2 * y) + "}{" + xcf2 + "}\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\end{alignat}$$";
                    }
                }
            } else {        //y's easiest to eliminate
                h = gcd2(Math.abs(ycf1), Math.abs(ycf2));       //Used to create lowest multipliers for equations
                suma += "$$\\begin{alignat}{2}\\qquad\\qquad\\qquad\\qquad" + 
                        cfchk(xcf1 * Math.abs(ycf2) / h, ltr1, 1, 1) + cfchk(ycf1 * Math.abs(ycf2) / h, ltr2, 1, 0) + "&=" + 
                        c1 * Math.abs(ycf2) / h + "\\qquad\\qquad\\qquad &&eqn 1 \\times" + Math.abs(ycf2) / h + "\\\\[5pt]";
                suma += cfchk(xcf2 * Math.abs(ycf1) / h, ltr1, 1, 1) + cfchk(ycf2 * Math.abs(ycf1) / h, ltr2, 1, 0) + "&=" + 
                                c2 * Math.abs(ycf1) / h + "&&eqn 2 \\times" + Math.abs(ycf1) / h + "\\\\[5pt]";
                if((ycf1 > 0 && ycf2 > 0) || (ycf1 < 0 && ycf2 < 0)) {      //Signs same so subtract to eliminate y's
                    if((xcf1 * Math.abs(ycf2) / h) - (xcf2 * Math.abs(ycf1) / h) > 0) {     //eqn1 - eqn2
                        if((xcf1 * Math.abs(ycf2) / h - xcf2 * Math.abs(ycf1) / h) === 1) {
                            suma += cfchk((xcf1 * Math.abs(ycf2) / h - xcf2 * Math.abs(ycf1) / h), ltr1, 1, 1) + "&=" + 
                                        (c1 * Math.abs(ycf2) / h - c2 * Math.abs(ycf1) / h) + "&&eqn 1 - eqn 2\\\\[20pt]";
                        } else {
                            suma += cfchk((xcf1 * Math.abs(ycf2) / h - xcf2 * Math.abs(ycf1) / h), ltr1, 1, 1) + "&=" + 
                                            (c1 * Math.abs(ycf2) / h - c2 * Math.abs(ycf1) / h) + "&&eqn 1 - eqn 2\\\\[5pt]";
                            suma += ltr1 + "&=\\frac{" + (c1 * Math.abs(ycf2) / h - c2 * Math.abs(ycf1) / h) + "}{" + 
                                            (xcf1 * Math.abs(ycf2) / h - xcf2 * Math.abs(ycf1) / h) + "}\\\\[5pt]";
                            suma += ltr1 + "&=" + x + "\\\\[20pt]";
                        }
                    } else {        //eqn2 - eqn1
                        if((xcf2 * Math.abs(ycf1) / h - xcf1 * Math.abs(ycf2) / h) === 1) {
                            suma += cfchk((xcf2 * Math.abs(ycf1) / h - xcf1 * Math.abs(ycf2) / h), ltr1, 1, 1) + "&=" + 
                                            (c2 * Math.abs(ycf1) / h - c1 * Math.abs(ycf2) / h) + "&&eqn 2 - eqn 1\\\\[20pt]";
                        } else {
                            suma += cfchk((xcf2 * Math.abs(ycf1) / h - xcf1 * Math.abs(ycf2) / h), ltr1, 1, 1) + "&=" + 
                                            (c2 * Math.abs(ycf1) / h - c1 * Math.abs(ycf2) / h) + "&&eqn 2 - eqn 1\\\\[5pt]";
                            suma += ltr1 + "&=\\frac{" + (c2 * Math.abs(ycf1) / h - c1 * Math.abs(ycf2) / h) + "}{" + 
                                            (xcf2 * Math.abs(ycf1) / h - xcf1 * Math.abs(ycf2) / h) + "}\\\\[5pt]";
                            suma += ltr1 + "&=" + x + "\\\\[20pt]";
                        }
                    }
                } else {        //Signs different so add equations to eliminate x's
                    if((xcf1 * Math.abs(ycf2) / h + xcf2 * Math.abs(ycf1) / h) === 1) {
                        suma += cfchk((xcf1 * Math.abs(ycf2) / h + xcf2 * Math.abs(ycf1) / h), ltr1, 1, 1) + "&=" + 
                                (c1 * Math.abs(ycf2) / h + c2 * Math.abs(ycf1) / h) + "&&eqn 1 + eqn 2\\\\[20pt]";
                    } else {
                        suma += cfchk((xcf1 * Math.abs(ycf2) / h + xcf2 * Math.abs(ycf1) / h), ltr1, 1, 1) + "&=" + 
                                    (c1 * Math.abs(ycf2) / h + c2 * Math.abs(ycf1) / h) + "&&eqn 1 + eqn 2\\\\[5pt]";
                        suma += ltr1 + "&=\\frac{" + (c1 * Math.abs(ycf2) / h + c2 * Math.abs(ycf1) / h) + "}{" + 
                                    (xcf1 * Math.abs(ycf2) / h + xcf2 * Math.abs(ycf1) / h) + "}\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\\\[20pt]";
                    }
                }
                if(Math.abs(xcf1) < Math.abs(xcf2)) {       //Sub x in eqn 1
                    suma += xcf1 + "\\times" + x + cfchk(ycf1, ltr2, 1, 0) + "&=" + 
                                c1 + "&&Substitute\\ " + ltr1 + "\\ in\\ eqn 1\\\\[5pt]";
                    suma += (xcf1 * x) + cfchk(ycf1, ltr2, 1, 0) + "&=" + c1 + "\\\\[5pt]";
                    if(ycf1 === 1) {
                        suma += ltr2 + "&=" + c1 + cfchk(-1 * xcf1 * x, "", 0, 0) + "\\\\[5pt]";
                        suma += ltr2 + "&=" + y + "\\end{alignat}$$";
                    } else {
                        suma += ltr2 + "&=\\frac{" + c1 + cfchk(-1 * xcf1 * x, "", 0, 0) + "}{" + ycf1 + "}\\\\[5pt]";
                        suma += ltr2 + "&=\\frac{" + (c1 + -1 * xcf1 * x) + "}{" + ycf1 + "}\\\\[5pt]";
                        suma += ltr2 + "&=" + y + "\\end{alignat}$$";
                    }
                } else {        //Sub x in eqn2
                    suma += xcf2 + "\\times" + x + cfchk(ycf2, "y", 1, 0) + "&=" + 
                                c2 + "&&Substitute\\ " + ltr1 + "\\ in\\ eqn 2\\\\[5pt]";
                    suma += (xcf2 * x) + cfchk(ycf2, "y", 1, 0) + "&=" + c2 + "\\\\[5pt]";
                    if(ycf2 === 1) {
                        suma += ltr2 + "&=" + c2 + cfchk(-1 * xcf2 * x, "", 0, 0) + "\\\\[5pt]";
                        suma += ltr2 + "&=" + y + "\\end{alignat}$$";
                    } else {
                        suma += ltr2 + "&=\\frac{" + c2 + cfchk(-1 * xcf2 * x, "", 0, 0) + "}{" + ycf2 + "}\\\\[5pt]";
                        suma += ltr2 + "&=\\frac{" + (c2 + -1 * xcf2 * x) + "}{" + ycf2 + "}\\\\[5pt]";
                        suma += ltr2 + "&=" + y + "\\end{alignat}$$";
                    }
                }
            } 
            break;
        case 2:
            //Creates 2 equations in form y = ax + b to be solved by substitution
            sumq = "";
            suma = "";
            var notesLink = "images/20200505-MathsBook10GraphsSimEquv1_5-APO.pdf#page=18";
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
            break;
    }
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}