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
    } else {
        document.getElementById("a").style.visibility="visible";
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
  if (type === 1) {
   if(r === 1 && n  === 1 && d === 1) {        //if no root or indices
    return ltr;
    } else if(r === 1 && n === 0) {              //if numerator 0, ignore denominator
      return ltr + "^0";
    } else if(r === 1 && d === 1) {              //just ltr with integer power, no root
      return ltr + "^{" + n + "}";
    } else if(r === 1) {                          //ltr with fraction power, no root
      return ltr + "^\\frac{" + n + "}{" + d + "}";
    } else if(r == 2 && n === 1 && d === 1) {   //square root over just ltr
      return "\\sqrt{" + ltr + "}"; 
    } else if(n === 1 && d === 1) {             //'>2' root over ltr
      return "\\sqrt[" + r + "]{" + ltr + "}";
    } else if(r === 2 && d === 1) {              //square root over ltr with integer power
      return "\\sqrt{" + ltr + "^{" + n + "}}";
    } else if(d === 1) {                         //'>2' root over ltr with integer power
      return "\\sqrt[" + r + "]{" + ltr + "^{" + n + "}}";
    } else if(r === 2) {                          //square root over ltr with fractional power
        return "\\sqrt{" + ltr + "^\\frac{" + n + "}{" + d + "}}";
    } else {                                      //'2' root over ltr with fraction power
      return "\\sqrt[" + r + "]{" + ltr + "^\\frac{" + n + "}{" + d + "}}";
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