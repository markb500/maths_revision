// js/sumshow_module.js - Handles displaying questions and solutions

let currentSumData = null;

function sumshow(sumType, h1, w1, h2, w2) {
  const canvasQ = document.getElementById("myCanvas");
  canvasQ.height = parseFloat(h1);
  canvasQ.width = parseFloat(w1);

  const canvasSol = document.getElementById("myCanvas2") || document.createElement("canvas");
  if (canvasSol.id === "myCanvas2") {
    canvasSol.height = parseFloat(h2);
    canvasSol.width = parseFloat(w2);
  }

  document.getElementById("a").innerHTML = "";

  // Call the appropriate generator (registered in registry)
  currentSumData = window.registry.get(sumType).generate();

  // Render
  document.getElementById("q").innerHTML = currentSumData.question;
  document.getElementById("a").innerHTML = currentSumData.solution || "";

  document.getElementById("noteslink").href = currentSumData.notesLink || "#";
  document.getElementById("noteslink").style.visibility = "visible";

  // Canvas drawing
  if (currentSumData.drawQuestion) {
    const ctx = canvasQ.getContext('2d');
    currentSumData.drawQuestion(ctx);
  }

  window.eqnformat('q');
}

window.sumshow = sumshow; // Make available globally