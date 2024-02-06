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

function scaleDraw(ctx2, xpositive, ypositive, xscale, yscale) {
  //Use in Simultaneous Module to draw the graph axis
    var xfigs, yfigs, xposn, yposn, xoffset, yoffset, xtxtalign, ytxtalign, xscaleposn, yscaleposn;

    ctx2.font = "15px Comic Sans MS";
    ctx2.lineWidth = 3;
    ctx2.beginPath();
    if (xpositive && ypositive) {
        xposn = 350;
        yposn = 50;
        xoffset = 10;
        yoffset = -10;
        xtxtalign = 'top';
        ytxtalign = 'right';
        xscaleposn = [100, 150, 200, 250, 300, 350];
        yscaleposn = [300, 250, 200, 150, 100, 50];
        xfigs = [1 * xscale, 2 * xscale, 3 * xscale, 4 * xscale, 5 * xscale];
        yfigs = [1 * yscale, 2 * yscale, 3 * yscale, 4 * yscale, 5 * yscale];
        ctx2.moveTo(40, xposn);
        ctx2.lineTo(350, xposn);    //x axis
        ctx2.moveTo(yposn, 360);
        ctx2.lineTo(yposn, 50);     //y axis
    } else if (!xpositive && ypositive) {
        xposn = 350;
        yposn = 350;
        xoffset = 10;
        yoffset = 10;
        xtxtalign = 'top';
        ytxtalign = 'left';
        xscaleposn = [300, 250, 200, 150, 100, 50];
        yscaleposn = [300, 250, 200, 150, 100, 50];
        xfigs = [1 * -xscale, 2 * -xscale, 3 * -xscale, 4 * -xscale, 5 * -xscale];
        yfigs = [1 * yscale, 2 * yscale, 3 * yscale, 4 * yscale, 5 * yscale];
        ctx2.moveTo(50, xposn);
        ctx2.lineTo(360, xposn);    //x axis
        ctx2.moveTo(yposn, 360);
        ctx2.lineTo(yposn, 50);     //y axis
    } else if (xpositive && !ypositive) {
        xposn = 50;
        yposn = 50;
        xoffset = -10;
        yoffset = -10;
        xtxtalign = 'bottom';
        ytxtalign = 'right';
        xscaleposn = [100, 150, 200, 250, 300, 350];
        yscaleposn = [100, 150, 200, 250, 300, 350];
        xfigs = [1 * xscale, 2 * xscale, 3 * xscale, 4 * xscale, 5 * xscale];
        yfigs = [1 * -yscale, 2 * -yscale, 3 * -yscale, 4 * -yscale, 5 * -yscale];
        ctx2.moveTo(40, xposn);
        ctx2.lineTo(350, xposn);    //x axis
        ctx2.moveTo(yposn, 350);
        ctx2.lineTo(yposn, 40);     //y axis
    } else {
        xposn = 50;
        yposn = 350;
        xoffset = -10;
        yoffset = 10;
        xtxtalign = 'bottom';
        ytxtalign = 'left';
        xscaleposn = [300, 250, 200, 150, 100, 50];
        yscaleposn = [100, 150, 200, 250, 300, 350];
        xfigs = [1 * -xscale, 2 * -xscale, 3 * -xscale, 4 * -xscale, 5 * -xscale];
        yfigs = [1 * -yscale, 2 * -yscale, 3 * -yscale, 4 * -yscale, 5 * -yscale];
        ctx2.moveTo(50, xposn);
        ctx2.lineTo(360, xposn);    //x axis
        ctx2.moveTo(yposn, 350);
        ctx2.lineTo(yposn, 40);     //y axis
    }

    for (let i = 0; i < 5; i++) {
        ctx2.moveTo(xscaleposn[i], xposn);
        ctx2.lineTo(xscaleposn[i], xposn + xoffset);   //x scale marks
        ctx2.textAlign = "center";
        ctx2.textAlign = xtxtalign;
        ctx2.fillText(xfigs[i], xscaleposn[i], xposn + 3 * xoffset);   //x scale digits
        ctx2.moveTo(yposn, yscaleposn[i]);
        ctx2.lineTo(yposn + yoffset, yscaleposn[i]);   //y scale marks
        ctx2.textAlign = ytxtalign;
        ctx2.fillText(yfigs[i], yposn + 1.5 * yoffset, yscaleposn[i] + 5);     //y scale digits
    }
    ctx2.fillText('0', yposn + 1.5 * yoffset, xposn + 3 * xoffset);     //origin digit
    ctx2.font = "30px Comic Sans MS";
    ctx2.fillText(ltr1txt, xscaleposn[5], xposn + 3 * xoffset);    //x scale label
    ctx2.fillText(ltr2txt, yposn + 1.5 * yoffset, yscaleposn[5]);  //y scale label
    ctx2.font = "20px Comic Sans MS";
    ctx2.fillText('Solution: (' + x + ', ' + y + ')', xscaleposn[3], yscaleposn[5]);  //Show solution on graph
    ctx2.stroke();
    for (let i = 0; i < 5; i++) {
        ctx2.lineWidth = 0.4;
        ctx2.moveTo(xscaleposn[i], xposn);
        ctx2.lineTo(xscaleposn[i], yscaleposn[5]);
        ctx2.moveTo(yposn, yscaleposn[i]);
        ctx2.lineTo(xscaleposn[5], yscaleposn[i]);
    }
    ctx2.stroke();
    for (let i = 0; i < 5; i++) {
        ctx2.lineWidth = 0.1;
        if (xpositive) {
            ctx2.moveTo(xscaleposn[i] - 40, xposn);
            ctx2.lineTo(xscaleposn[i] - 40, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 30, xposn);
            ctx2.lineTo(xscaleposn[i] - 30, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 20, xposn);
            ctx2.lineTo(xscaleposn[i] - 20, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 10, xposn);
            ctx2.lineTo(xscaleposn[i] - 10, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 10, xposn);
            ctx2.lineTo(xscaleposn[i] + 10, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 20, xposn);
            ctx2.lineTo(xscaleposn[i] + 20, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 30, xposn);
            ctx2.lineTo(xscaleposn[i] + 30, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 40, xposn);
            ctx2.lineTo(xscaleposn[i] + 40, yscaleposn[5]);
        } else {
            ctx2.moveTo(xscaleposn[i] + 40, xposn);
            ctx2.lineTo(xscaleposn[i] + 40, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 30, xposn);
            ctx2.lineTo(xscaleposn[i] + 30, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 20, xposn);
            ctx2.lineTo(xscaleposn[i] + 20, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 10, xposn);
            ctx2.lineTo(xscaleposn[i] + 10, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 10, xposn);
            ctx2.lineTo(xscaleposn[i] - 10, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 20, xposn);
            ctx2.lineTo(xscaleposn[i] - 20, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 30, xposn);
            ctx2.lineTo(xscaleposn[i] - 30, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 40, xposn);
            ctx2.lineTo(xscaleposn[i] - 40, yscaleposn[5]);
        }
        if (ypositive) {
            ctx2.moveTo(yposn, yscaleposn[i] - 10);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 10);
            ctx2.moveTo(yposn, yscaleposn[i] - 20);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 20);
            ctx2.moveTo(yposn, yscaleposn[i] - 30);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 30);
            ctx2.moveTo(yposn, yscaleposn[i] - 40);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 40);
            ctx2.moveTo(yposn, yscaleposn[i] + 10);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 10);
            ctx2.moveTo(yposn, yscaleposn[i] + 20);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 20);
            ctx2.moveTo(yposn, yscaleposn[i] + 30);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 30);
            ctx2.moveTo(yposn, yscaleposn[i] + 40);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 40);
        } else {
            ctx2.moveTo(yposn, yscaleposn[i] + 10);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 10);
            ctx2.moveTo(yposn, yscaleposn[i] + 20);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 20);
            ctx2.moveTo(yposn, yscaleposn[i] + 30);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 30);
            ctx2.moveTo(yposn, yscaleposn[i] + 40);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 40);
            ctx2.moveTo(yposn, yscaleposn[i] - 10);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 10);
            ctx2.moveTo(yposn, yscaleposn[i] - 20);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 20);
            ctx2.moveTo(yposn, yscaleposn[i] - 30);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 30);
            ctx2.moveTo(yposn, yscaleposn[i] - 40);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 40);
        }
    }
    ctx2.stroke();
}

function coordCalc(x, y, xscale, yscale, xpositive, ypositive) {
  //Used in Simultaneous Module to calc coords for graphical solution
    var xcoord, ycoord;
    if (xpositive && ypositive) {           //x +ve y +ve
        xcoord = 50 * ((x / xscale) + 1);
        ycoord = 400 - 50 * ((y / yscale) + 1);
    } else if (xpositive && !ypositive) {    //x +ve y -ve
        xcoord = 50 * ((x / xscale) + 1);
        ycoord = 50 * ((y / -yscale) + 1);
    } else if (!xpositive && ypositive) {    //x -ve y +ve
        xcoord = 400 - 50 * ((x / -xscale) + 1);
        ycoord = 400 - 50 * ((y / yscale) + 1);
    } else {                        //x -ve y -ve
        xcoord = 400 - 50 * ((x / -xscale) + 1);
        ycoord = 50 * ((y / -yscale) + 1);
    }
    return {x: xcoord, y: ycoord};
}

function scaleSet(x, y) {
  var xpositive, ypositive, xscale, yscale;
  if (x > 0) {
      xpositive = true;
  } else {
      xpositive = false;
  }
  if (y > 0) {
      ypositive = true;
  } else {
      ypositive = false;
  }
  if (Math.abs(x) < 4) {
      xscale = 1;
  } else if (Math.abs(x) < 9) {
      xscale = 2;
  } else if (Math.abs(x) < 21) {
      xscale = 5;
  } else if (Math.abs(x) < 41) {
      xscale = 10;
  } else {
      xscale = 20;
  }
  if (Math.abs(y) < 4) {
      yscale = 1;
  } else if (Math.abs(y) < 9) {
      yscale = 2;
  } else if (Math.abs(y) < 21) {
      yscale = 5;
  } else if (Math.abs(y) < 41) {
      yscale = 10;
  } else {
      yscale = 20;
  }
  return {xptve: xpositive, yptve: ypositive, x: xscale, y: yscale};
}

function coordTab(x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, xscale, xpositive, sum) {
  //Used in Simultaneous Module. Creates the coordinates for the coord tables
  if (xpositive) {
    xtab11 = x - xscale;
    xtab21 = x - xscale;
    if (sum === 1) {
      ytab11 = dp((c1 - xcf1 * xtab11) / ycf1, 1, -1);
      ytab21 = dp((c2 - xcf2 * xtab21) / ycf2, 1, -1);
    } else {
      ytab11 = dp(xcf1 * xtab11 + c1, 1, -1);
      ytab21 = dp(xcf2 * xtab21 + c2, 1, -1);
    }
    xtab12 = x;
    xtab22 = x;
    ytab12 = y;
    ytab22 = y;
    xtab13 = x + xscale;
    xtab23 = x + xscale;
    if (sum === 1) {
      ytab13 = dp((c1 - xcf1 * xtab13) / ycf1, 1, -1);
      ytab23 = dp((c2 - xcf2 * xtab23) / ycf2, 1, -1);
    } else {
      ytab13 = dp(xcf1 * xtab13 + c1, 1, -1);
      ytab23 = dp(xcf2 * xtab23 + c2, 1, -1);
    }
  } else {
    xtab11 = x + xscale;
    xtab21 = x + xscale;
    if (sum === 1) {
      ytab11 = dp((c1 - xcf1 * xtab11) / ycf1, 1, -1);
      ytab21 = dp((c2 - xcf2 * xtab21) / ycf2, 1, -1);
    } else {
      ytab11 = dp(xcf1 * xtab11 + c1, 1, -1);
      ytab21 = dp(xcf2 * xtab21 + c2, 1, -1);
    }
    xtab12 = x;
    xtab22 = x;
    ytab12 = y;
    ytab22 = y;
    xtab13 = x - xscale;
    xtab23 = x - xscale;
    if (sum === 1) {
      ytab13 = dp((c1 - xcf1 * xtab13) / ycf1, 1, -1);
      ytab23 = dp((c2 - xcf2 * xtab23) / ycf2, 1, -1);
    } else {
      ytab13 = dp(xcf1 * xtab13 + c1, 1, -1);
      ytab23 = dp(xcf2 * xtab23 + c2, 1, -1);
    }
  }
  return {x11: xtab11, x12: xtab12, x13: xtab13, y11: ytab11, y12: ytab12, y13: ytab13, 
          x21: xtab21, x22: xtab22, x23: xtab23, y21: ytab21, y22: ytab22, y23: ytab23};
}

function QLimitRepeats(arr, x) {
  //Ensures no repeat question until at least 50% of questions in calling module have been shown.
  //'arr' stores previous questions for calling module. 'x' is the number of questions in the calling module.
  var sum;
  do {
    sum = rndgen(1, x, 0, 1, -1);
  } while (arr.includes(sum))
  arr.push(sum);
  if (arr.length > Math.ceil(x/2)) {
    arr.shift();
  }
  return arr;
}

function isCanvasBlank(canvas) {
  // returns true if all color channels in each pixel are 0 (or "blank")
  return !canvas.getContext('2d')
    .getImageData(0, 0, canvas.width, canvas.height).data
    .some(channel => channel !== 0);
}

function sumshow(sumType, h1, w1, h2, w2) {
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
    case "sincosgraph":
      ctx2 = myCanvas2.getContext('2d');
      sumData = sincosgraph(ctx2);
      break;
    case "simultaneous":
      ctx2 = myCanvas2.getContext('2d');
      sumData = simultaneous(ctx2);
      break;
    case "areavol":
      ctx = myCanvas.getContext('2d');
      sumData = areavol(ctx);
      break;
  }
  if (SolnWin) {      //Prior to 1st open of SolnWin, the .closed test is null
    if (!SolnWin.closed) {  //Once SolnWin has been opened, SolnWin is true whether open or closed so need this extra test
      SolnWin.document.getElementById("myCanvas3");
      SolnWin.myCanvas3.height = h2;
      SolnWin.myCanvas3.width = w2;
      if (h2 > 0.5) { //Otherwise, assume no solution image so myCanvas2 not defined
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
      // sumData[0] = sumData[0] + '<br>'.repeat(10);    //Makes space for canvas between this and next q, in pre-print view
      ctx2.drawImage(document.getElementById('myCanvasq' + qnum), 0, 0);  //Shows q image in solution
      sumData[1] = sumData[1].replace("<br>".repeat(16), "");     //Removes lead in <br>'s from solution
      break;
    case "prop":
      sumData = prop();
      break;
    case "sincosgraph":
      document.getElementById('myCanvasa' + qnum).height="600";
      document.getElementById('myCanvasa' + qnum).width="600";
      document.getElementById('myCanvasa' + qnum).style.visibility = 'visible';
      ctx2 = document.getElementById('myCanvasa' + qnum).getContext('2d');
      sumData = sincosgraph(ctx2);
      break;
    case "simultaneous":
      document.getElementById('myCanvasa' + qnum).style.visibility = 'visible';
      document.getElementById('myCanvasa' + qnum).height = '400';
      document.getElementById('myCanvasa' + qnum).width = '400';
      ctx2 = document.getElementById('myCanvasa' + qnum).getContext('2d');
      sumData = simultaneous(ctx2);
      sumData[1] = sumData[1].replace("<br>".repeat(14), "");     //Removes lead in <br>'s from solution
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
      // sumData[0] = sumData[0] + '<br>'.repeat(6);    //Makes space for canvas between this and next q, in pre-print view
      sumData[1] = sumData[1].replace("<br>".repeat(13), "");     //Removes lead in <br>'s from solution
      ctx2.drawImage(document.getElementById('myCanvasq' + qnum), 0, 0);  //Shows q image in solution
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

  function createpage(type) {
    if (type === 'q') {
      var qdiv = document.createElement('div');
      qdiv.id = 'qdiv' + qnum;
      qdiv.classList.add('wrapper');      //css in testQsheet used to put Q text, 'modify' btn and canvas in a row
      qdiv.style.margin = '20px';
      if (!(qnum % 2 === 0)) {
        document.getElementById('qpagediv' + qnum + (qnum + 1)).appendChild(qdiv);
      } else {
        qdiv.classList.add('midpage');
        document.getElementById('qpagediv' + (qnum - 1) + qnum).appendChild(qdiv);
      }
      var qele = document.createElement('h3');
      qele.id = 'q' + qnum;
      qele.style.width = '50%';
      qele.classList.add("qbtn");         //css testQsheet used to put Q text, 'modify' btn and canvas in a row
      document.getElementById('qdiv' + qnum).appendChild(qele);

      var button = document.createElement('button');
      button.id = 'btn' + qnum;
      button.classList.add("noshow");  //css in testQsheet used to hide button in print version
      button.classList.add("qbtn");       //css testQsheet used to put Q text, 'modify' btn and canvas in a row
      button.innerText = 'Modify This Question';
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
    } else if (type === 'a') {
      var adiv = document.createElement('div');
      adiv.id = 'adiv' + qnum;
      adiv.style.margin = '20px';
      if (!(qnum % 2 === 0)) {
        document.getElementById('apagediv' + qnum + (qnum + 1)).appendChild(adiv);
      } else {
        adiv.classList.add('midpage');
        document.getElementById('apagediv' + (qnum - 1) + qnum).appendChild(adiv);
      }

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
    }
  }
  if (!(qnum % 2 === 0)) {
    var qpagediv = document.createElement('div');
    qpagediv.id = 'qpagediv' + qnum + (qnum + 1);
    qpagediv.classList.add('pagebreak');
    document.getElementById('q').appendChild(qpagediv);
  }
  createpage('q');  
  
  if (!(qnum % 2 === 0)) {
    var apagediv = document.createElement('div');
    apagediv.id = 'apagediv' + qnum + (qnum + 1);
    apagediv.classList.add('pagebreak');
    document.getElementById('a').appendChild(apagediv);
  }
  createpage('a');
  
  testsumshow(sumtype, qnum);
  document.getElementById('q' + qnum).innerHTML = qnum + ".  " + sumData[0];
  document.getElementById('ai' + (qnum)).innerHTML = qnum + ".  " + sumData[0] + '<br>';
  document.getElementById('aii' + (qnum)).innerHTML = sumData[1];
  
  if (document.getElementById('myCanvasq' + qnum).height > 1) {
    if (isCanvasBlank(document.getElementById('myCanvasq' + qnum))) {
      document.getElementById('myCanvasq' + qnum).height = "0.5";
      document.getElementById('myCanvasq' + qnum).width = "0.5";
    }
  }
  if (document.getElementById('myCanvasqa' + qnum).height > 1) {
    if (isCanvasBlank(document.getElementById('myCanvasqa' + qnum))) {
      document.getElementById('myCanvasqa' + qnum).height = "0.5";
      document.getElementById('myCanvasqa' + qnum).width = "0.5";
    }
  }
  if (document.getElementById('myCanvasa' + qnum).height > 1) {
    if (isCanvasBlank(document.getElementById('myCanvasa' + qnum))) {
      document.getElementById('myCanvasa' + qnum).height = "0.5";
      document.getElementById('myCanvasa' + qnum).width = "0.5";
    }
  }
  
  if (qnum % 2 === 0) {
    var adivoddsize = document.getElementById('adiv' + (qnum - 1)).offsetHeight;  // Height of odd-numbered answer div, inc question
    var adivevensize = document.getElementById('adiv' + qnum).offsetHeight;   // Height of even-numbered answer div, inc question
    if (adivoddsize > 300 || adivevensize > 300) {
      document.getElementById('apagediv' + (qnum - 1) + qnum).style = 'page-break-after:avoid';   //Allow apagediv to stretch
      document.getElementById('adiv' + (qnum - 1)).classList.add('pagebreak');  // Ensure odd and even answers on different pages
      document.getElementById('adiv' + (qnum)).classList.remove('midpage');   // Remove requirement for even answer  to start at 50% height of apagediv
      var page = document.createElement('div');
      page.id = 'page' + qnum;
      page.classList.add('pagebreak');
      document.getElementById('a').appendChild(page);   // Add empty div after apagediv to force pagebreak
    }
  }
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
      case "Sin/Cos Graphs":
        sumAuth('sincosgraph', qnum);
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

function bgSelect() {
  //Changes background colour inn response to selection on dropdown list
  document.querySelector(':root').style.setProperty('--bgcolour', document.getElementById("colourSelect").value);
}