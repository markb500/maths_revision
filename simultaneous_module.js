function simultaneous() {
    document.getElementById("myCanvas");
    myCanvas.height = "0.5";
    myCanvas.width = "0.5";
    myCanvas.style = "border: none;";
    document.getElementById("noteslink").style.visibility="hidden";
    if(rndgen(1, 2, 0, 1, -1) === 1) {
        simultaneouselim();
    } else {
        simultaneoussubst();
    }
}