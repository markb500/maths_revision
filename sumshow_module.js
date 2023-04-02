var sumData = [], sumq = "", suma = "";
function sumshow(sumType, h1, w1, h2, w2, h3, w3) {
    document.getElementById("myCanvas");
    myCanvas.height = h1;
    myCanvas.width = w1;
    myCanvas.style = "border: none;";
    document.getElementById("myCanvas2");
    myCanvas2.height = h2;
    myCanvas2.width = w2;
    myCanvas2.style.visibility = "hidden";
    document.getElementById("a").innerHTML = "";
    switch (sumType) {
        case "noncalc":
            sumData = noncalc();
            break;
        case "solve1":
            sumData = solve1();
            break;
        case "transposeI":
            sumData = transposeI();
            break;
        case "transposeII":
            sumData = transposeII();
            break;
        case "quadratics":
            sumData = quadratics();
            break;
        case "hcflcm":
            sumData = hcflcm();
            break;
        case "indices":
            sumData = indices();
            break;
        case "numform":
            sumData = numform();
            break;
        case "percentratio":
            sumData = percentratio();
            break;
        case "prop":
            sumData = prop();
            break;
        case "simultaneous":
            sumData = simultaneous();
            break;
        case "conv":
            sumData = conv();
            break;
        case "areavol":
            sumData = areavol();
            break;
        case "fracs":
            sumData = fracs();
            break;
        case "trig":
            sumData = trig();
            break;
    }
    if (SolnWin) {      //Prior to 1st open of SolnWin, the .closed test is null
        if (!SolnWin.closed) {  //Once SolnWin has been opened, SolnWin is true whether open or closed so need this extra test
            SolnWin.document.getElementById("myCanvas3");
            SolnWin.myCanvas3.height = h3;
            SolnWin.myCanvas3.width = w3;
            if (h3 > 0.5) { //Otherwise, assume no solution image so myCanvas2 not defined
                var ctx3 = SolnWin.myCanvas3.getContext('2d');
                ctx3.drawImage(myCanvas2, 0, 0);
            }
            var suma2 = sumData[1].replace("<br>".repeat(11), "");  //Removes leading spaces in 'hcf/lcm' solution
            SolnWin.document.getElementById('a2').innerHTML = suma2;
            SolnWin.eqnformat('a2');
        }
    }
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {window.open(sumData[2], "_blank")}
    document.getElementById("q").innerHTML = sumData[0];
    document.getElementById("a").innerHTML = sumData[1];
    document.getElementById("btnSoln").style.visibility="visible";
}