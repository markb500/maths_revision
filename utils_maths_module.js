//Various functions used in sum functions, as described in each below.

var views = 0;  //Used to count solution views

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
  MathJax.Hub.Queue(["Typeset",MathJax.Hub, id]);
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