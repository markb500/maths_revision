var sumarrsincos = [];
function sincosgraph(ctx2) {
  var sum, sumq = "", suma = "";
  sumarrsincos = QLimitRepeats(sumarrsincos, 32);   //Ensures no repeat question until at least 50% of questions shown
  sum = sumarrsincos[sumarrsincos.length - 1];
  switch(sum) {
      case 1:
        sumq += "Sketch the graph of y = Sin(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(ysinx, 0, 0, 600, 600);
        break;
      case 2:
        sumq += "Sketch the graph of y = -Sin(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminussinx, 0, 0, 600, 600);
        break;
      case 3:
        sumq += "Sketch the graph of y = 2Sin(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(y2sinx, 0, 0, 600, 600);
        break;
      case 4:
        sumq += "Sketch the graph of y = -2Sin(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminus2sinx, 0, 0, 600, 600);
        break;
      case 5:
        sumq += "Sketch the graph of y = 2Sin(1.5&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(y2sin1_5x, 0, 0, 600, 600);
        break;
      case 6:
        sumq += "Sketch the graph of y = -2Sin(1.5&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminus2sin1_5x, 0, 0, 600, 600);
        break;
      case 7:
        sumq += "Sketch the graph of y = 2Sin(2&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(y2sin2x, 0, 0, 600, 600);
        break;
      case 8:
        sumq += "Sketch the graph of y = -2Sin(2&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminus2sin2x, 0, 0, 600, 600);
        break;
      case 9:
        sumq += "Sketch the graph of y = Sin(1.5&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(ysin1_5x, 0, 0, 600, 600);
        break;
      case 10:
        sumq += "Sketch the graph of y = -Sin(1.5&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminussin1_5x, 0, 0, 600, 600);
        break;
      case 11:
        sumq += "Sketch the graph of y = Sin(2&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(ysin2x, 0, 0, 600, 600);
        break;
      case 12:
        sumq += "Sketch the graph of y = -Sin(2&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminussin2x, 0, 0, 600, 600);
        break;
      case 13:
        sumq += "Sketch the graph of y = 1.5Sin(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(y1_5sinx, 0, 0, 600, 600);
        break;
      case 14:
        sumq += "Sketch the graph of y = -1.5Sin(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminus1_5sinx, 0, 0, 600, 600);
        break;
      case 15:
        sumq += "Sketch the graph of y = 0.75Sin(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(y0_75sinx, 0, 0, 600, 600);
        break;
      case 16:
        sumq += "Sketch the graph of y = -0.75Sin(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminus0_75sinx, 0, 0, 600, 600);
        break;
      case 17:
        sumq += "Sketch the graph of y = Cos(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(ycosx, 0, 0, 600, 600);
        break;
      case 18:
        sumq += "Sketch the graph of y = -Cos(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminuscosx, 0, 0, 600, 600);
        break;
      case 19:
        sumq += "Sketch the graph of y = 2Cos(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(y2cosx, 0, 0, 600, 600);
        break;
      case 20:
        sumq += "Sketch the graph of y = -2Cos(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminus2cosx, 0, 0, 600, 600);
        break;
      case 21:
        sumq += "Sketch the graph of y = 2Cos(1.5&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(y2cos1_5x, 0, 0, 600, 600);
        break;
      case 22:
        sumq += "Sketch the graph of y = -2Cos(1.5&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminus2cos1_5x, 0, 0, 600, 600);
        break;
      case 23:
        sumq += "Sketch the graph of y = 2Cos(2&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(y2cos2x, 0, 0, 600, 600);
        break;
      case 24:
        sumq += "Sketch the graph of y = -2Cos(2&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminus2cos2x, 0, 0, 600, 600);
        break;
      case 25:
        sumq += "Sketch the graph of y = Cos(1.5&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(ycos1_5x, 0, 0, 600, 600);
        break;
      case 26:
        sumq += "Sketch the graph of y = -Cos(1.5&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminuscos1_5x, 0, 0, 600, 600);
        break;
      case 27:
        sumq += "Sketch the graph of y = Cos(2&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(ycos2x, 0, 0, 600, 600);
        break;
      case 28:
        sumq += "Sketch the graph of y = -Cos(2&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminuscos2x, 0, 0, 600, 600);
        break;
      case 29:
        sumq += "Sketch the graph of y = 1.5Cos(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(y1_5cosx, 0, 0, 600, 600);
        break;
      case 30:
        sumq += "Sketch the graph of y = -1.5Cos(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminus1_5cosx, 0, 0, 600, 600);
        break;
      case 31:
        sumq += "Sketch the graph of y = 0.75Cos(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(y0_75cosx, 0, 0, 600, 600);
        break;
      case 32:
        sumq += "Sketch the graph of y = -0.75Cos(&theta;) from 0<sup>O</sup> to 360<sup>O</sup>";
        ctx2.drawImage(yminus0_75cosx, 0, 0, 600, 600);
        break;
  }
  var notesLink = "images/"
  var sumArray = [sumq, suma, notesLink];
  return sumArray;
}