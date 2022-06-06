function numform() {
    document.getElementById("myCanvas");
    myCanvas.height = "0.5";
    myCanvas.width = "0.5";
    myCanvas.style = "border: none;";
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/20200504-MathsBook3Indicesv1_3-APO.pdf#page=10", "_blank")
    }
    var tmp = rndgen(1, 2, 0, 1, -1);
    switch(tmp) {
        case 1: //multiply the numbers
            do {
                var num1 = rndgen(10.5, 500, 1, 0.1, -1);
                var num2 = rndgen(0.5, 4.5, 1, 0.1, -1);
            }while(num1 === 1 || num2 - dp(num2, 0, -1) === 0)
            var pwr1 = rndgen(-5, 5, 0, 1, -1);
            var pwr2 = rndgen(-5, 5, 0, 1, -1);
            var num = dp(num1 * num2, 2, -1);
            var pwr = pwr1 + pwr2;
            var results = sciengnot(num, pwr);  //returns array[scinum, scipwr, engnum, engpwr]
            sumq += "Without using a calculator, calculate the following, giving your answer in both Standard Form (Scientific Notation) ";
            sumq += "and Preferred Standard Form (Engineering Notation). Show all your working<BR>";
            sumq += "$$" + pwrzero(num1, pwr1) + "\\ \\ \\times\\ \\ " + pwrzero(num2, pwr2) + "$$<BR>";

            suma += "$$\\begin{aligned}&=" + num1 + "\\times" + num2 + "\\times 10^{" + pwr1 + "\\ +\\ " + pwr2 + "}\\\\[5pt]";
            suma += "&=" + num + "\\times 10^{" + pwr + "}\\\\[5pt]";
            suma += "In\\ Scientific\\ Notation &=\\underline{\\mathbf{" + results[0] + "\\times 10^{" + results[1] + "}}}\\\\[5pt]";
            suma += "In\\ Engineering\\ Notation &=\\underline{\\mathbf{" + results[2] + "\\times 10^{" + results[3] + "}}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            break;
        case 2: //divide the numbers
            do {
                var num1 = rndgen(10.5, 500, 1, 0.1, -1);
                var num2 = rndgen(0.5, 4.5, 1, 0.1, -1);
            }while(num1 === 1 || num2 - dp(num2, 0, -1) === 0 || (num1 / num2) - dp(num1 / num2, 0, -1) === 0 || (num1 / num2) - dp(num1 / num2, 2, -1) !== 0)
            var pwr1 = rndgen(-5, 5, 0, 1, -1);
            var pwr2 = rndgen(-5, 5, 0, 1, -1);
            var num = dp(num1 / num2, 2, -1);
            var pwr = pwr1 - pwr2;
            var results = sciengnot(num, pwr);  //returns array[scinum, scipwr, engnum, engpwr]
            sumq += "Without using a calculator, calculate the following, giving your answer in both Standard Form (Scientific Notation) ";
            sumq += "and Preferred Standard Form (Engineering Notation). Show all your working<BR>";
            sumq += "$$\\frac{" + pwrzero(num1, pwr1) + "}{" + pwrzero(num2, pwr2) + "}$$<BR>";

            suma += "$$\\begin{aligned}&=\\frac{" + num1 + "}{" + num2 + "}\\times 10^{" + pwr1 + "\\ -\\ " + pwr2 + "}\\\\[5pt]";
            suma += "&=" + num + "\\times 10^{" + pwr + "}\\\\[5pt]";
            suma += "In\\ Scientific\\ Notation &=\\underline{\\mathbf{" + results[0] + "\\times 10^{" + results[1] + "}}}\\\\[5pt]";
            suma += "In\\ Engineering\\ Notation &=\\underline{\\mathbf{" + results[2] + "\\times 10^{" + results[3] + "}}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            break;
    }
    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}