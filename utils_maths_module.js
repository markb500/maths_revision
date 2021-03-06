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

function dp(sum, dp, fix) {
    //Rounds 'sum' to selected number of decimal places. Decimal places can be fixed.
    //sum = number to be rounded
    //dp = number of dec places
    //fix = number of dp's fixed. -1 if no trailing zeros wanted.
    var temp = 0, cnt = 0;
    do {
        if(fix === -1) {
            cnt = dp;
            temp = Math.round((sum + Number.EPSILON) * Math.pow(10, dp)) / Math.pow(10, dp);
        } else {
            cnt = fix;
            temp = (Math.round((sum + Number.EPSILON) * Math.pow(10, dp + 2)) / Math.pow(10, dp + 2)).toFixed(fix);
        }
        if(countDecimals(temp) > cnt) {
            sum += Number.EPSILON;
        }
    } while(countDecimals(temp) > cnt);  //Avoids occasional float point errors
    return temp;
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

function indchk(ltr, r, pn, pd) {
//Used in Indices to format each term, depending on values of
//radical and the numerator and denominator of the power.
   if(r === 1 && pn  === 1 && pd === 1) {        //just ltr, no root or indices
    return ltr;
  } else if(r === 1 && pn === 0) {              //if numerator 0, ignore denominator
    return ltr + "^0";
  } else if(r === 1 && pn === pd) {             //if numerator = denominator. Allows for result of 1 or -1
    return ltr + "^" + (pn / pd);
  } else if(r === 1 && pd === 1) {              //just ltr with integer power, no root
    return ltr + "^{" + pn + "}";
  } else if(r === 1) {                          //ltr with fraction power, no root
    return ltr + "^\\frac{" + pn + "}{" + pd + "}";
  } else if(r == 2 && pn === 1 && pd === 1) {   //square root over just ltr
    return "\\sqrt{" + ltr + "}"; 
  } else if(pn === 1 && pd === 1) {             //'>2' root over ltr
    return "\\sqrt[" + r + "]{" + ltr + "}";
  } else if(r === 2 && pd === 1) {              //square root over ltr with integer power
    return "\\sqrt{" + ltr + "^{" + pn + "}}";
  } else if(pd === 1) {                         //'>2' root over ltr with integer power
    return "\\sqrt[" + r + "]{" + ltr + "^{" + pn + "}}";
  } else if(r === 2) {                          //square root over ltr with fractional power
      return "\\sqrt{" + ltr + "^\\frac{" + pn + "}{" + pd + "}}";
  } else {                                      //'2' root over ltr with fraction power
    return "\\sqrt[" + r + "]{" + ltr + "^\\frac{" + pn + "}{" + pd + "}}";
  }
}

function sumpwrs(p1n, p1d, r1, p2n, p2d, r2, sign) {
//Used in Indices to format the sum (if req'd) in powers.
  if(p1n === 0) {     //if p1n is 0, set p1d & r1 to 1 so just ltr^0 returned
    p1d = 1;
    r1 = 1;
  }
  if(Math.abs(p1n) === Math.abs(p1d * r1)) {    //if numerator = denominator, change power to 1
    p1n = p1n / p1d;
    p1d  = 1;
  }
  if(Math.abs(p2n) === Math.abs(p2d * r2)) {    //if numerator = denominator, change power to 1
    p2n = p2n / p2d;
    p2d  = 1;
  }
  if(p1d === 1 && r1 === 1 && p2d === 1 && r2 === 1) {  //1111
    return p1n + sign + p2n;
  } else if(p1d === 1 && r1 === 1 && p2d === 1) {       //1110
    return p1n + sign + "\\frac{" + p2n + "}{" + r2 + "}"; 
  } else if(p1d === 1 && r1 === 1 && r2 === 1) {        //1101
    return p1n + sign + "\\frac{" + p2n + "}{" + p2d + "}"; 
  } else if(p1d === 1 && r1 === 1) {                    //1100
    return p1n + sign + "\\frac{" + p2n + "}{" + p2d * r2 + "}"; 
  }else if(p1d === 1 && p2d === 1 && r2 === 1) {        //1011
    return "\\frac{" + p1n + "}{" + r1 + "}" + sign + p2n;
  }else if(p1d === 1 && p2d === 1) {                    //1010
    return "\\frac{" + p1n + "}{" + r1 + "}" + sign + "\\frac{" + p2n + "}{" + r2 + "}";
  }else if(p1d === 1 && r2 === 1) {                     //1001
    return "\\frac{" + p1n + "}{" + r1 + "}" + sign + "\\frac{" + p2n + "}{" + p2d + "}";
  }else if(p1d === 1) {                                 //1000
    return "\\frac{" + p1n + "}{" + r1 + "}" + sign + "\\frac{" + p2n + "}{" + p2d * r2 + "}";
  }else if(r1 === 1 && p2d === 1 && r2 === 1) {         //0111
    return "\\frac{" + p1n + "}{" + p1d + "}" + sign + p2n;
  }else if(r1 === 1 && p2d === 1) {                     //0110
    return "\\frac{" + p1n + "}{" + p1d + "}" + sign + "\\frac{" + p2n + "}{" + r2 + "}";
  }else if(r1 === 1 && r2 === 1) {                      //0101
    return "\\frac{" + p1n + "}{" + p1d + "}" + sign + "\\frac{" + p2n + "}{" + p2d + "}";
  } else if(r1 === 1) {                                 //0100
    return "\\frac{" + p1n + "}{" + p1d + "}" + sign + "\\frac{" + p2n + "}{" + p2d * r2 + "}";
  } else if(p2d === 1 && r2 === 1) {                    //0011
    return "\\frac{" + p1n + "}{" + p1d * r1 + "}" + sign + p2n;
  }else if(p2d === 1) {                                 //0010
    return "\\frac{" + p1n + "}{" + p1d * r1 + "}" + sign + "\\frac{" + p2n + "}{" + r2 + "}";
  }else if(r2 === 1) {                                  //0001
    return "\\frac{" + p1n + "}{" + p1d + "}" + sign + "\\frac{" + p2n + "}{" + p2d * r2 + "}";
  } else {                                              //0000  
    return "\\frac{" + p1n + "}{" + p1d * r1 + "}" + sign + "\\frac{" + p2n + "}{" + p2d * r2 + "}";
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