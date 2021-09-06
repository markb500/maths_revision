var prevsum = 0, prev2sum = 0, x1, x2, y1, y2, k;
function prop() {
    //Produces randomly selected problems in proportionality
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
        sum = rndgen(1, 4, 0, 1, -1);
    } while(sum === prevsum || sum === prev2sum)
    prev2sum = prevsum;
    prevsum = sum;
    switch(sum) {
        case 1:     //y prop root x
            y1 = rndgen(2, 10, 0, 1, -1);
            x1 = rndgen(y1 + 5, 25, 0, 1, -1);
            k = dp(y1 / Math.sqrt(x1), 3, 3);
            if(rndgen(1, 2, 0, 1, -1) === 1) {     //For y prop root x, find x given y
                y2 = y1 + rndgen(3, 8, 0, 1, -1);
                x2 = dp(Math.pow(y2 / k, 2), 4, 2);
                sumq += "If y is proportional to &#8730x and y&nbsp;=&nbsp;" + y1 + " when x&nbsp;=&nbsp;" + x1 + ", find the ";
                sumq += "constant of proportionality (to 3 decimal places) and use it to find the value of x ";
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
                y2 = dp(k * Math.sqrt(x2), 4, 2);
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
            k = dp(y1 * Math.sqrt(x1), 5, 3);
            if(rndgen(1, 2, 0, 1, -1) === 1) {  //For y inverse prop root x, find x given y
                y2 = y1 + rndgen(3, 8, 0, 1, -1);
                x2 = dp(Math.pow(k / y2, 2), 4, 2);
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
                y2 = dp(k / Math.sqrt(x2), 4, 2);
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
        k = dp(y1 / Math.pow(x1, 3), 5, 3);
        if(rndgen(1, 2, 0, 1, -1) === 1) {  //For y prop x^3, find x given y
            y2 = y1 + rndgen(3, 8, 0, 1, -1);
            x2 = dp(Math.cbrt(y2 / k), 4, 2);
            sumq += "Given that y is proportional to x^3 and y&nbsp;=&nbsp;" + y1 + " when x&nbsp;=&nbsp;" + x1;
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
            y2 = dp(k * Math.pow(x2, 3), 4, 2);
            sumq += "Given that y is proportional to x^3 and y&nbsp;=&nbsp;" + y1 + " when x&nbsp;=&nbsp;" + x1;
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
            k = dp(y1 * Math.pow(x1, 3), 2, -1);
            if(rndgen(1, 2, 0, 1, -1) === 1) {  //For y inverse prop x^3, find x given y
                y2 = rndgen(y1 + 8, 25, 0, 1, -1);
                x2 = dp(Math.cbrt(k / y2), 4, 2);
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
                y2 = dp(k / Math.pow(x2, 3), 4, 2);
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

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}
