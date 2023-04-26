//Various functions used in sum functions, as described in each below.

var sumData = [], sumq = "", suma = "", testQsheet, views = 0;

function op(sign) {
//Used in solve1 to convert random number (0 or 1) to sign string.
  if(sign) {
    return "-";
  } else {
    return "+";
  }
}

function cfchk(num, ltr, not1, notplus) {
  //Covers all options for coefficients and signs.
  //With/without 1's, with/without +'s, with/without ltr.
  //Used in simultaneous functions, quadratics and solve1
  if(num > 0) {     //num +ve
    if(num === 1 && not1 && notplus) {
      return ltr;
    } else if(num === 1 && not1) {
      return "+" + ltr;
    } else if(notplus) {
      return num + ltr;
    } else {
      return "+" + num + ltr;
    }
  } else {      //num -ve
    if(num === -1 && not1) {
      return "-" + ltr;
    }
    return num + ltr;
  }
}

function eqnformat(id) {
  //Re-runs mathjax rendering on text with given id. Used in all sum functions.
  //Also toggles visibility of the 'a' element each time soln btn clicked, increments the views
  //count each time 'a' is made visible and re-sets views to zero each time a question button is clicked.
  MathJax.Hub.Queue(["Typeset" ,MathJax.Hub, id]);
  if(id === "q") {
    //Initialisation for new Q; reset number of views in soln btn and ensure 'a' element is hidden.
    views = 0;
    document.getElementById("btnSoln").innerHTML = "<span class='font-weight-bold'>Show/Hide Solution</span><br />Views : " + views;
    document.getElementById("a").style.visibility="hidden";
  }
  if(id === "a") {      //soln btn clicked
    if(window.getComputedStyle(document.getElementById("a")).visibility === "visible") {
        document.getElementById("a").style.visibility="hidden";
        document.getElementById("myCanvas2").style.visibility="hidden";
    } else {
        document.getElementById("a").style.visibility="visible";
        document.getElementById("myCanvas2").style.visibility="visible";
        views += 1;
        document.getElementById("btnSoln").innerHTML = "<span class='font-weight-bold'>Show/Hide Solution</span><br />Views : " + views
    }
  }
}

function countDecimals(value) {
    //Counts number of decimal places. Used in rndgen() and dp()
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}

function rndgen(lower, upper, dp, step, fix) {
  //Produces random numbers between limits, with set number of decimal places and selectable steps. Also,
  //decimal places can be fixed.
  //upper = largest num
  //lower = smallest num
  //dp = number of decimal places
  //step = steps between smallest digits ie if 2 dp and want in 0.02 steps, then 0.02
  //fix = number of dp's fixed. -1 if no trailing zeros wanted
  step = step * Math.pow(10, dp);
  if(fix === -1) {
    do {
      var tmp =  (Math.floor(Math.random() * ((upper * Math.pow(10, dp) / step) - 
          (lower * Math.pow(10, dp) / step) + 1) + (lower * Math.pow(10, dp) / step)) / 
          Math.pow(10, dp) * step);
    } while(countDecimals(tmp) > dp) //Solves occasional float point maths error
    return tmp;
  } else {
    return (Math.floor(Math.random() * (upper * Math.pow(10, dp) / step - 
          lower * Math.pow(10, dp) / step + 1) + lower * Math.pow(10, dp) / step) / 
          Math.pow(10, dp) * step).toFixed(fix);
  }
}

function dp(num, scale, fix) {
    if(!("" + num).includes("e")) {
      if(fix === -1) {
        return +(Math.round(num + "e+" + scale)  + "e-" + scale);
      } else {
        return (+(Math.round(num + "e+" + scale)  + "e-" + scale)).toFixed(fix);
      }
    } else {
      var arr = ("" + num).split("e");
      var sig = ""
      if(+arr[1] + scale > 0) {
        sig = "+";
      }
      if(fix === -1) {
        return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
      } else {
        return (+(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale)).toFixed(fix);
      }
    }
  }

function thouSep(value, sep) {
    //Adds chosen 1 000's separator
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, sep);
}

function gcd2(a, b) {
  // Greatest common divisor of 2 integers
  if(!b) return b===0 ? a : NaN;
  return gcd2(b, a%b);
}

function gcd(array) {
  // Greatest common divisor of a list (as array) of integers
  var n = 0;
  for(var i=0; i<array.length; ++i) {
    n = gcd2(array[i], n);
}
  return n;
}

function lcm2(a, b) {
  // Least common multiple of 2 integers
  return a*b / gcd2(a, b);
}

function lcm(array) {
  // Least common multiple of a list (as array) of integers
  var n = 1;
  for(var i=0; i<array.length; ++i) {
    n = lcm2(array[i], n);
  }
  return n;
}

function chkpwr(ltr, pwr) {
  //Used in hcflcm to format letter and power for display
  //Removes letter if power is 0 and shows just letter if power is 1
  if (pwr === 0) {
    return "";
  } else if (pwr === 1) {
    return ltr;
  } else {
    return ltr + "^" + pwr;
  }
}

function indchk(ltr, r, n, d, type) {
//Used in Indices to format each term's index, depending on values of
//radical, numerator and denominator.
//'type' selects where used: 1 = question, 2 = initial answer breakdown, 3 = final answer breakdown
  if (type === 1) {
    if (r === 1) {
      if (d === 1) {
        return ltr + "^{" + n + "}";
      } else if (d > 1) {
        return ltr + "^{\\frac{" + n + "}{" + d + "}}";
      }
    } else if (r === 2) {
      if (d === 1) {
        return "\\sqrt{" + ltr + "^{" + n + "}}";
      } else if (d > 1) {
        return "\\sqrt{" + ltr + "^{\\frac{" + n + "}{" + d + "}}}";
      }
    } else if (r > 2) {
      if (d === 1) {
        return "\\sqrt[" + r + "]{" + ltr + "^{" + n + "}}";
      } else if (d > 1) {
        return "\\sqrt[" + r + "]{" + ltr + "^{\\frac{" + n + "}{" + d + "}}}";
      }
    }
  } else if (type === 2) {
    if (d > 1) {
      if (r > 1) {
        return ltr + "^{\\frac{" + n + "}{" + d + "\\times" + r + "}}";
      } else {
        return ltr + "^{\\frac{" + n + "}{" + d + "}}";
      }
    } else {
      if (r > 1) {
        return ltr + "^{\\frac{" + n + "}{" + r + "}}";
      } else {
        return ltr + "^{" + n + "}";
      }
    }
  } else {
    if (d > 1) {
      if (r > 1) {
        d = d * r;
      }
    } else {
      if (r > 1) {
        d = r;
      }
    }
    if (d > 1) {
      return "\\frac{" + n + "}{" + d + "}";
    } else {
      return n;
    }
  }
}

function sciengnot(num, pwr) {
  //Used in numform to convert num & pwr to sci and eng forms
  var logten = Math.floor(Math.log10(Math.abs(num)));
  var scinum = dp(num / Math.pow(10, logten), 5, -1);
  var scipwr = pwr + logten;
  var scimod = scipwr - 3 * Math.floor(scipwr / 3); //excel version of modulus calc different to js % operator for -ve nums
  var engnum = dp(scinum * Math.pow(10, scimod), 5, -1);
  var engpwr = scipwr - scimod;
  return [scinum, scipwr, engnum, engpwr];
}

function pwrzero(num, pwr) {
  //Used in numform to show just the num if pwr is 0
  if (pwr === 0) {
    return num
  } else {
    return num + "\\times 10^{" + pwr + "}"
  }
}

function primeFactors(n) {
//Finds prime factors for use in HCF/LCM
  let arr = [];
  let i = 2;
  while(i <= n){
    if(n % i == 0) {
      n = n / i;
      arr.push(i);
    } else {
      i++;
    }
  }
  return arr;
}

function primeExponents(arr) {
//Counts duplicates in primeFactors() array for use as exponents in HCF/LCM
  var count = {};
  arr.forEach(function(i) {count[i] = (count[i] || 0) + 1;});
  return count;
}

function primeTree(ctx2, term, primefacs, primesexp, x, y) {
//Draws the primes tree for hcf/lcm solution and lists primes with exponents beneath
  var num = term[0];
  ctx2.fillStyle = "red";
  ctx2.strokeStyle = "red";
  ctx2.textAlign = "left";
  ctx2.font = "bold 22px STIX Two Math";
  ctx2.fillText(term[0], x, y);
  ctx2.font = "20px STIX Two Math";
  for (var i = 0; i < primefacs.length - 1; i++) {
    y += 50;
    num /= primefacs[i];
    ctx2.fillText(primefacs[i], x - 50, y);
    ctx2.lineWidth = 2;
    ctx2.beginPath();
    ctx2.moveTo(x, y - 47);
    ctx2.lineTo(x - 35, y - 10);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.moveTo(x + 10, y - 47);
    ctx2.lineTo(x + 10, y - 20);
    ctx2.stroke();
    ctx2.fillText(num, x, y);
  }
  var str = "";
  for(var j in primesexp) {
    if (primesexp[j] === 1) {
      str += j + ", ";
    } else if (primesexp[j] === 2) {
      str += j + "\u00B2 " + ", ";
    } else if (primesexp[j] === 3) {
      str += j + "\u00B3 " + ", ";
    } else if (primesexp[j] === 4) {
      str += j + "\u2074" + ", ";
    } else if (primesexp[j] === 5) {
      str += j + "\u2075" + ", ";
    } else if (primesexp[j] === 6) {
      str += j + "\u2076" + ", ";
    } else if (primesexp[j] === 7) {
      str += j + "\u2077" + ", ";
    } else if (primesexp[j] === 8) {
      str += j + "\u2078" + ", ";
    } else if (primesexp[j] === 9) {
      str += j + "\u2079" + ", ";
    }
  }
  var str = str.slice(0, str.length - 2);  //Remove final comma
  ctx2.fillText(str, x - 50, 330);
  return str;
}

function sumshow(sumType, h1, w1, h2, w2, h3, w3) {
  //Called by btn click in Index. Gets required sum data and sets up canvas if required.
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
    case "fracs":
      sumData = fracs();
      break;
    case "percentratio":
      sumData = percentratio();
      break;
    case "indices":
      sumData = indices();
      break;
    case "numform":
      sumData = numform();
      break;
    case "hcflcm":
      ctx2 = myCanvas2.getContext('2d');
      sumData = hcflcm(ctx2);
      break;
    case "solve1":
      sumData = solve1();
      break;
    case "quadratics":
      sumData = quadratics();
      break;
    case "transposeI":
      sumData = transposeI();
      break;
    case "transposeII":
      sumData = transposeII();
      break;
    case "conv":
      sumData = conv();
      break;
    case "trig":
      ctx = myCanvas.getContext('2d');
      sumData = trig(ctx);
      break;
    case "prop":
      sumData = prop();
      break;
    case "simultaneous":
      sumData = simultaneous();
      break;
    case "areavol":
      ctx = myCanvas.getContext('2d');
      sumData = areavol(ctx);
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
      var suma2 = sumData[1].replace("<br>".repeat(12), "");  //Removes leading spaces in 'hcf/lcm' solution
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

function testsumshow(sumType, qnum) {
  //Called by sumAuth, used in test creation. Gets required sum and sets up canvas if required.
  switch (sumType) {
    case "noncalc":
      sumData = noncalc();
      break;
    case "fracs":
      sumData = fracs();
      break;
    case "percentratio":
      sumData = percentratio();
      break;
    case "indices":
      sumData = indices();
      break;
    case "numform":
      sumData = numform();
      break;
    case "hcflcm":
      document.getElementById('myCanvasa' + qnum).height="350";
      document.getElementById('myCanvasa' + qnum).width="500";
      document.getElementById('myCanvasa' + qnum).style.visibility = 'visible';
      ctx2 = document.getElementById('myCanvasa' + qnum).getContext('2d');
      sumData = hcflcm(ctx2);
      sumData[1] = sumData[1].replace("<br>".repeat(12), "");     //Removes lead in <br>'s from solution
      break;
    case "solve1":
      sumData = solve1();
      break;
    case "quadratics":
      sumData = quadratics();
      break;
    case "transposeI":
      sumData = transposeI();
      break;
    case "transposeII":
      sumData = transposeII();
      break;
    case "conv":
      sumData = conv();
      break;
    case "trig":
      document.getElementById('myCanvasq' + qnum).style.visibility = 'visible';
      document.getElementById('myCanvasq' + qnum).height = '375';
      document.getElementById('myCanvasq' + qnum).width = '450';
      ctx = document.getElementById('myCanvasq' + qnum).getContext('2d');
      document.getElementById('myCanvasqa' + qnum).style.visibility = 'visible';
      document.getElementById('myCanvasqa' + qnum).height = '375';
      document.getElementById('myCanvasqa' + qnum).width = '450';
      ctx2 = document.getElementById('myCanvasqa' + qnum).getContext('2d');
      sumData = trig(ctx);
      sumData[0] = sumData[0] + '<br>'.repeat(10);    //Makes space for canvas between this and next q, in pre-print view
      ctx2.drawImage(document.getElementById('myCanvasq' + qnum), 0, 0);
      break;
    case "prop":
      sumData = prop();
      break;
    case "simultaneous":
      sumData = simultaneous();
      break;
    case "areavol":
      document.getElementById('myCanvasq' + qnum).style.visibility = 'visible';
      document.getElementById('myCanvasq' + qnum).height = '300';
      document.getElementById('myCanvasq' + qnum).width = '500';
      ctx = document.getElementById('myCanvasq' + qnum).getContext('2d');
      document.getElementById('myCanvasqa' + qnum).style.visibility = 'visible';
      document.getElementById('myCanvasqa' + qnum).height = '300';
      document.getElementById('myCanvasqa' + qnum).width = '500';
      ctx2 = document.getElementById('myCanvasqa' + qnum).getContext('2d');
      sumData = areavol(ctx);
      sumData[0] = sumData[0] + '<br>'.repeat(6);    //Makes space for canvas between this and next q, in pre-print view
      sumData[1] = sumData[1].replace("<br>".repeat(13), "");     //Removes lead in <br>'s from solution
      ctx2.drawImage(document.getElementById('myCanvasq' + qnum), 0, 0);
      break;
  }
}

function sumAuth(sumtype, qnum) {
  //Called by testshow(). Creates elements for test layout and inserts q's, a's and diags
  //2 divs, 'q' & 'a', created in testshow()
  //Then, for each question, the following created inside these:
  //'qdiv' & qnum inside 'q'
  //    Inside this, 'q' & qnum and 'btn' & qnum and 'myCanvasq' & qnum. These 3 in-line (from css in testqsheet)
  //'adiv' & qnum inside 'a'
  //    Inside this, 'aele1outer' & qnum
  //        Inside this, 'ai' & qnum and 'myCanvasqa' & qnum. These 2 in-line (from css in testqsheet)
  //    After aele1outer but still inside 'adiv' & qnum, 'myCanvasa' & qnum and 'aii' & qnum
  var qdiv = document.createElement('div');
  qdiv.id = 'qdiv' + qnum;
  qdiv.classList.add('pagebreak');    //css in testQsheet used to add pagebreak in print version
  qdiv.classList.add('wrapper');      //css in testQsheet used to put Q text, 'modify' btn and canvas in a row
  qdiv.style.margin = '20px';
  document.getElementById('q').appendChild(qdiv);

  var qele = document.createElement('h3');
  qele.id = 'q' + qnum;
  qele.style.width = '50%';
  qele.classList.add("qbtn");         //css testQsheet used to put Q text, 'modify' btn and canvas in a row
  document.getElementById('qdiv' + qnum).appendChild(qele);

  var button = document.createElement('button');
  button.id = 'btn' + qnum;
  button.classList.add("pagebreak");  //css in testQsheet used to hide button in print version
  button.classList.add("qbtn");       //css testQsheet used to put Q text, 'modify' btn and canvas in a row
  button.innerText = 'Modify This Sum';
  button.addEventListener('click', (event) => {
    var whichQ = parseInt(event.target.id.replace('btn', ''));  //Gets the question number for use in element id
    testsumshow(sumtype, whichQ);
    document.getElementById('q' + whichQ).innerHTML = whichQ + '.  ' + sumData[0];
    document.getElementById('ai' + (whichQ)).innerHTML = whichQ + '.  ' + sumData[0] + "<br>";
    document.getElementById('aii' + (whichQ)).innerHTML = sumData[1];
    eqnformat();                      //Re-runs mathjax formatting
  })
  document.getElementById("qdiv" + qnum).appendChild(button);

  var canvasq = document.createElement("canvas");
  canvasq.id = 'myCanvasq' + qnum;
  canvasq.height = '0.5';
  canvasq.width = '0.5';
  canvasq.classList.add("qbtn");
  canvasq.style.visibility = 'hidden';
  document.getElementById('qdiv' + qnum).appendChild(canvasq);

  var adiv = document.createElement('div');
  adiv.id = 'adiv' + qnum;
  adiv.classList.add('pagebreak');    //css in testQsheet used to add pagebreak in print version
  adiv.style.margin = '20px';
  document.getElementById('a').appendChild(adiv);

  var aele1outer = document.createElement("div");
  aele1outer.id = 'aele1outer' + qnum;
  aele1outer.classList.add('wrapper');      //css in testQsheet used to put Q text, 'modify' btn and canvas in a row
  document.getElementById('adiv' + qnum).appendChild(aele1outer);

  var aele1 = document.createElement("h3");
  aele1.id = 'ai' + (qnum);
  aele1.style.width = '50%';
  aele1.classList.add("qbtn");         //css in testQsheet used to put Q text, 'modify' btn and canvas in a row
  document.getElementById('aele1outer' + qnum).appendChild(aele1);  //For answer section, question written in black

  var canvasqa = document.createElement("canvas");
  canvasqa.id = 'myCanvasqa' + qnum;
  canvasqa.height = '0.5';
  canvasqa.width = '0.5';
  canvasqa.style.visibility = 'hidden';
  canvasqa.classList.add("qbtn");
  document.getElementById('aele1outer' + qnum).appendChild(canvasqa);

  var canvasa = document.createElement("canvas");
  canvasa.id = 'myCanvasa' + qnum;
  canvasa.height = '0.5';
  canvasa.width = '0.5';
  document.getElementById('adiv' + qnum).appendChild(canvasa);

  var aele2 = document.createElement("h3");
  aele2.id = 'aii' + (qnum);
  aele2.style = "color:red";
  aele2.style.margin = '20px';
  document.getElementById('adiv' + qnum).appendChild(aele2);  //For answer section, solution written in red

  testsumshow(sumtype, qnum);
  document.getElementById('q' + qnum).innerHTML = qnum + ".  " + sumData[0];
  document.getElementById('ai' + (qnum)).innerHTML = qnum + ".  " + sumData[0] + '<br>';
  document.getElementById('aii' + (qnum)).innerHTML = sumData[1];
}

function testshow() {
  //Called on page load. Gets test design from testCreate and cycles through list
  let data = sessionStorage.getItem("testArr"); //Passed from testCreate as json string
  const testOrder = JSON.parse(data);
  // totalq = testOrder.length;
  var qnum = 1;
  var qdiv = document.createElement("div");
  qdiv.id = 'q';
  document.body.appendChild(qdiv);
  var adiv = document.createElement("div");
  adiv.id = 'a';
  document.body.appendChild(adiv);
  for (var i = 0; i < testOrder.length; i++) {
    switch (testOrder[i]) {
      case "Non-Calculator Maths":
        sumAuth('noncalc', qnum);
        qnum = qnum + 1;
        break;
      case "Fractions":
        sumAuth('fracs', qnum);
        qnum = qnum + 1;
        break;
      case "Percentages &amp; Ratios":
        sumAuth('percentratio', qnum);
        qnum = qnum + 1;
        break;
      case "Indices":
        sumAuth('indices', qnum);
        qnum = qnum + 1;
        break;
      case "Number Form":
        sumAuth('numform', qnum);
        qnum = qnum + 1;
        break;
      case "HCF/LCM":
        sumAuth('hcflcm', qnum);
        qnum = qnum + 1;
        break;
      case "Algebra: Solve Equation":
        sumAuth('solve1', qnum);
        qnum = qnum + 1;
        break;
      case "Quadratics":
        sumAuth('quadratics', qnum);
        qnum = qnum + 1;
        break;
      case "Transposition I":
        sumAuth('transposeI', qnum);
        qnum = qnum + 1;
        break;
      case "Transposition II":
        sumAuth('transposeII', qnum);
        qnum = qnum + 1;
        break;
      case "Errors &amp; Conversions":
        sumAuth('conv', qnum);
        qnum = qnum + 1;
        break;
      case "RA Triangle Trigonometry":
        sumAuth('trig', qnum);
        qnum = qnum + 1;
        break;
      case "Proportionality":
        sumAuth('prop', qnum);
        qnum = qnum + 1;
        break;
      case "Simultaneous Equations":
        sumAuth('simultaneous', qnum);
        qnum = qnum + 1;
        break;
      case "Surface Area &amp; Volume":
        sumAuth('areavol', qnum);
        qnum = qnum + 1;
        break;
    }
  }
  eqnformat('t'); //Ensures MathJax has formatted all sums in test
}