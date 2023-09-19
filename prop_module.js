var sumarr = [], sumq, suma, x1, x2, y1, y2, k;
function prop() {
    //Produces randomly selected problems in proportionality
    var sum;
    sumq = "";
    suma = "";
    sumarr = QLimitRepeats(sumarr, 4);   //Ensures no repeat question until at least 50% of questions shown
    sum = sumarr[sumarr.length - 1];
    switch(sum) {
        case 1:     //y prop root x
            y1 = rndgen(2, 10, 0, 1, -1);
            x1 = rndgen(y1 + 5, 25, 0, 1, -1);
            k = dp(y1 / Math.sqrt(x1), 3, 3);
            if(rndgen(1, 2, 0, 1, -1) === 1) {     //For y prop root x, find x given y
                y2 = y1 + rndgen(3, 8, 0, 1, -1);
                do {
                    x2 = dp(Math.pow(y2 / k, 2), 2, 2);
                } while (x2 === x1);
                // if (y1 / Math.sqrt(x1) - dp(y1 / Math.sqrt(x1), 0, -1) === 0) {
                //     sumq += " and use it to find the value of x ";
                // } else {
                //     sumq += " (to 3 decimal places) and use it to find the value of x ";
                // }
                sumq += "If y is proportional to &#8730x and y&nbsp;=&nbsp;" + y1 + " when x&nbsp;=&nbsp;" + x1 + ", find the ";
                sumq += "constant of proportionality";
                if (y1 / Math.sqrt(x1) - dp(y1 / Math.sqrt(x1), 0, -1) === 0) {
                    sumq += " and use it to find the value of x ";
                } else {
                    sumq += " (to 3 decimal places) and use it to find the value of x ";
                }
                sumq += "(to 2 decimal places) when y&nbsp;=&nbsp;" + y2;

                suma += "$$\\begin{aligned}y&\\propto \\sqrt{x}\\\\[5pt]";
                suma += "y&=k\\sqrt{x}\\\\[5pt]";
                suma += "\\frac{y}{\\sqrt{x}}&=k\\\\[5pt]";
                suma += "\\frac{" + y1 + "}{\\sqrt{" + x1 + "}}&=k\\\\[5pt]";
                suma += k + "&=k\\ (3\\ dp)\\\\[25pt]";
                suma += "y&=k\\sqrt{x}\\\\[5pt]";
                suma += "\\frac{y}{k}&=\\sqrt{x}\\\\[5pt]";
                suma += "\\left(\\frac{y}{k}\\right)^2&=x\\\\[5pt]";
                suma += "\\left(\\frac{" + y2 + "}{" + k + "}\\right)^2&=x\\\\[5pt]";
                suma += "\\underline{\\mathbf{" + x2 + "}}&=x\\ (2\\ dp)\\end{aligned}$$";
            } else {                                //For y prop root x, find y given x
                x2 = x1 + rndgen(3, 8, 0, 1, -1);
                do {
                    y2 = dp(k * Math.sqrt(x2), 2, 2);
                } while (y2 === y1);
                sumq += "If y is proportional to &#8730x and y&nbsp;=&nbsp;" + y1 + " when x&nbsp;=&nbsp;" + x1 + ", find the ";
                sumq += "constant of proportionality (to 3 decimal places) and use it to find the value of y ";
                sumq += "(to 2 decimal places) when x&nbsp;=&nbsp;" + x2;

                suma += "$$\\begin{aligned}y&\\propto \\sqrt{x}\\\\[5pt]";
                suma += "y&=k\\sqrt{x}\\\\[5pt]";
                suma += "\\frac{y}{\\sqrt{x}}&=k\\\\[5pt]";
                suma += "\\frac{" + y1 + "}{\\sqrt{" + x1 + "}}&=k\\\\[5pt]";
                suma += k + "&=k\\ (3\\ dp)\\\\[25pt]";
                suma += "y&=k\\sqrt{x}\\\\[5pt]";
                suma += "&=" + k + "\\sqrt{" + x2 + "}\\\\[5pt]";
                suma += "&=\\underline{\\mathbf{" + y2 + "}}\\ (2\\ dp)\\end{aligned}$$";
            }
                break;
        case 2:     //y inverse prop root x
            y1 = rndgen(2, 10, 0, 1, -1);
            x1 = rndgen(y1 + 5, 25, 0, 1, -1);
            k = dp(y1 * Math.sqrt(x1), 3, 3);
            if(rndgen(1, 2, 0, 1, -1) === 1) {  //For y inverse prop root x, find x given y
                y2 = y1 + rndgen(3, 8, 0, 1, -1);
                do {
                    x2 = dp(Math.pow(k / y2, 2), 2, 2);
                } while (x2 === x1);
                sumq += "Given that y is inversely proportional to &#8730x and y&nbsp;=&nbsp;" + y1 + " when x&nbsp;=&nbsp;" + x1;
                sumq += ", find the constant of proportionality (to 3 decimal places) and use it to find the ";
                sumq += "value of x (to 2 decimal places) when y&nbsp;=&nbsp;" + y2;

                suma += "$$\\begin{aligned}y&\\propto \\frac{1}{\\sqrt{x}}\\\\[5pt]";
                suma += "y&=\\frac{k}{\\sqrt{x}}\\\\[5pt]";
                suma += "y\\sqrt{x}&=k\\\\[5pt]";
                suma += y1 + "\\sqrt{" + x1 + "}&=k\\\\[5pt]";
                suma += k + "&=k\\ (3\\ dp)\\\\[25pt]";
                suma += "y&=\\frac{k}{\\sqrt{x}}\\\\[5pt]";
                suma += "y\\sqrt{x}&=k\\\\[5pt]";
                suma += "\\sqrt{x}&=\\frac{k}{y}\\\\[5pt]";
                suma += "x&=\\left(\\frac{k}{y}\\right)^2\\\\[5pt]";
                suma += "&=\\left(\\frac{" + k + "}{" + y2 + "}\\right)^2\\\\[5pt]";
                suma += "&=\\underline{\\mathbf{" + x2 + "\\ (2\\ dp)}}\\end{aligned}$$";
            } else {                            //For y inverse prop root x, find y given x
                x2 = x1 + rndgen(3, 8, 0, 1, -1);
                do {
                    y2 = dp(k / Math.sqrt(x2), 2, 2);
                } while (y2 === y1);
                sumq += "Given that y is inversely proportional to &#8730x and y&nbsp;=&nbsp;" + y1 + " when x&nbsp;=&nbsp;" + x1;
                sumq += ", find the constant of proportionality (to 3 decimal places) and use it to find the ";
                sumq += "value of y (to 2 decimal places) when x&nbsp;=&nbsp;" + x2;

                suma += "$$\\begin{aligned}y&\\propto \\frac{1}{\\sqrt{x}}\\\\[5pt]";
                suma += "y&=\\frac{k}{\\sqrt{x}}\\\\[5pt]";
                suma += "y\\sqrt{x}&=k\\\\[5pt]";
                suma += y1 + "\\sqrt{" + x1 + "}&=k\\\\[5pt]";
                suma += k + "&=k\\ (3\\ dp)\\\\[25pt]";
                suma += "y&=\\frac{k}{\\sqrt{x}}\\\\[5pt]";
                suma += "&=\\frac{" + k + "}{\\sqrt{" + x2 + "}}\\\\[5pt]";
                suma += "&=\\underline{\\mathbf{" + y2 + "\\ (2\\ dp)}}\\end{aligned}$$";
            }
            break;
        case 3:     //y prop x^3
        y1 = rndgen(40, 50, 0, 1, -1);
        x1 = rndgen(2, y1 - 35, 0, 1, -1);
        k = dp(y1 / Math.pow(x1, 3), 3, 3);
        if(rndgen(1, 2, 0, 1, -1) === 1) {  //For y prop x^3, find x given y
            y2 = y1 + rndgen(3, 8, 0, 1, -1);
                do {
                    x2 = dp(Math.cbrt(y2 / k), 2, 2);
                } while (x2 === x1);
            sumq += "Given that y is proportional to x<sup>3</sup> and y&nbsp;=&nbsp;" + y1 + " when x&nbsp;=&nbsp;" + x1;
            sumq += ", find the constant of proportionality (to 3 decimal places) and use it to find the ";
            sumq += "value of x (to 2 decimal places) when y&nbsp;=&nbsp;" + y2;

            suma += "$$\\begin{aligned}y&\\propto x^3\\\\[5pt]";
            suma += "y&=kx^3\\\\[5pt]";
            suma += "\\frac{y}{x^3}&=k\\\\[5pt]";
            suma += "\\frac{" + y1 + "}{" + x1 + "^3}&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\ (3\\ dp)\\\\[25pt]";
            suma += "y&=kx^3\\\\[5pt]";
            suma += "\\frac{y}{k}&=x^3\\\\[5pt]";
            suma += "\\sqrt[3]{\\frac{y}{k}}&=x\\\\[5pt]";
            suma += "\\sqrt[3]{\\frac{" + y2 + "}{" + k + "}}&=x\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + x2 + "}}&=x\\ (2\\ dp)\\end{aligned}$$";
        } else {                            //For y prop x^3, find y given x
            x2 = x1 + rndgen(3, 8, 0, 1, -1);
                do {
                    y2 = dp(k * Math.pow(x2, 3), 2, 2);
                } while (y2 === y1);
            sumq += "Given that y is proportional to x<sup>3</sup> and y&nbsp;=&nbsp;" + y1 + " when x&nbsp;=&nbsp;" + x1;
            sumq += ", find the constant of proportionality (to 3 decimal places) and use it to find the ";
            sumq += "value of y (to 2 decimal places) when x&nbsp;=&nbsp;" + x2;

            suma += "$$\\begin{aligned}y&\\propto x^3\\\\[5pt]";
            suma += "y&=kx^3\\\\[5pt]";
            suma += "\\frac{y}{x^3}&=k\\\\[5pt]";
            suma += "\\frac{" + y1 + "}{" + x1 + "^3}&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\ (3\\ dp)\\\\[25pt]";
            suma += "y&=kx^3\\\\[5pt]";
            suma += "&=" + k + "\\times" + x2 + "^3\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + y2 + "\\ (2\\ dp)}}\\end{aligned}$$";
        }
            break;
        case 4:     //y inverse prop x^3
            y1 = rndgen(40, 50, 0, 1, -1);
            x1 = rndgen(2, y1 - 35, 0, 1, -1);
            k = dp(y1 * Math.pow(x1, 3), 3, -1);
            if(rndgen(1, 2, 0, 1, -1) === 1) {  //For y inverse prop x^3, find x given y
                y2 = rndgen(y1 + 8, 25, 0, 1, -1);
                do {
                    x2 = dp(Math.cbrt(k / y2), 2, 2);
                } while (x2 === x1);
                sumq += "Given that y is inversely proportional to x<sup>3</sup> and y&nbsp;=&nbsp;" + y1;
                sumq += " when x&nbsp;=&nbsp;" + x1 + ", find the constant of proportionality and use it to ";
                sumq += "find the value of x (to 2 decimal places) when y&nbsp;=&nbsp;" + y2;

                suma += "$$\\begin{aligned}y&\\propto \\frac{1}{x^3}\\\\[5pt]";
                suma += "y&=\\frac{k}{x^3}\\\\[5pt]";
                suma += "yx^3&=k\\\\[5pt]";
                suma += y1 + "\\times" + x1 + "^3&=k\\\\[5pt]";
                suma += k + "&=k\\\\[25pt]";
                suma += "y&=\\frac{k}{x^3}\\\\[5pt]";
                suma += "yx^3&=k\\\\[5pt]";
                suma += "x^3&=\\frac{k}{y}\\\\[5pt]";
                suma += "x&=\\sqrt[3]{\\frac{k}{y}}\\\\[5pt]";
                suma += "&=\\sqrt[3]{\\frac{" + k + "}{" + y2 + "}}\\\\[5pt]";
                suma += "&=\\underline{\\mathbf{" + x2 + "\\ (2\\ dp)}}\\end{aligned}$$";
            } else {                        //For y inverse prop x^3, find y given x
                x2 = rndgen(x1 + 2, 6, 0, 1, -1);
                do {
                    y2 = dp(k / Math.pow(x2, 3), 2, 2);
                } while (y2 === y1);
                sumq += "Given that y is inversely proportional to x<sup>3</sup> and y&nbsp;=&nbsp;" + y1;
                sumq += " when x&nbsp;=&nbsp;" + x1 + ", find the constant of proportionality and use it to ";
                sumq += "find the value of y (to 2 decimal places) when x&nbsp;=&nbsp;" + x2;

                suma += "$$\\begin{aligned}y&\\propto \\frac{1}{x^3}\\\\[5pt]";
                suma += "y&=\\frac{k}{x^3}\\\\[5pt]";
                suma += "yx^3&=k\\\\[5pt]";
                suma += y1 + "\\times" + x1 + "^3&=k\\\\[5pt]";
                suma += k + "&=k\\\\[25pt]";
                suma += "y&=\\frac{k}{x^3}\\\\[5pt]";
                suma += "&=\\frac{" + k + "}{" + x2 + "^3}\\\\[5pt]";
                suma += "&=\\underline{\\mathbf{" + y2 + "\\ (2\\ dp)}}\\end{aligned}$$";
            }
            break;
    }
    var notesLink = "images/20200505-MathsBook8Proportionv1_3-APO.pdf#page=4";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}
