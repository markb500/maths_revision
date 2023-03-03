function simultaneous() {
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
    document.getElementById("noteslink").style.visibility="hidden";
    if(rndgen(1, 2, 0, 1, -1) === 1) {
        simultaneouselim();
    } else {
        simultaneoussubst();
    }
}