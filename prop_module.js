var sumarrprop = [], sumq, suma;
function prop() {
    //Produces randomly selected problems in proportionality
    var sum, k, engspeed, propspeed, engspeedadj, propspeedadj, drag, dragadj, velocity, veladj, friction, frictionadj, weight, weightadj;
    var volume, pressure, volumeadj, pressureadj, current, resistance, currentadj, resistanceadj, intensity, distance, intensityadj, distanceadj;
    sumq = "";
    suma = "";
    sumarrprop = QLimitRepeats(sumarrprop, 12);   //Ensures no repeat question until at least 50% of questions shown
    sum = sumarrprop[sumarrprop.length - 1];
    switch(sum) {
        case 1:
            do {
                engspeed = rndgen(15000, 16000, 0, 250, -1);
                do {
                    engspeedadj = rndgen(-750, 750, 0, 250, -1);
                } while (engspeedadj === 0 || engspeed + engspeedadj < 15000 || engspeed + engspeedadj > 16000);
                propspeed = rndgen(2000, 3000, 0, 50, -1);
                k = engspeed / propspeed;
            } while (k - dp(k, 4, -1) !== 0 || k === 1)  //Ensures k has no more than 4 decimal places and isn't 1
            sumq += "The engine speed of an aircraft is directly proportional to the propeller speed.<br>";
            sumq += "a. If the engine rotates at " + thouSep(engspeed, "&nbsp;") + "&nbsp;rpm and the propeller rotates at " + thouSep(propspeed, "&nbsp;") + "&nbsp;rpm, " + 
                        "find the constant of proportionality (k) for the reduction gearbox.<br>";
            sumq += "b. Using the constant of proportionality calculated above, find the propeller speed when the engine speed " + 
                        "is " + thouSep((engspeed + engspeedadj), "&nbsp;") + "&nbsp;rpm, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ engspeed&\\propto propspeed\\\\[5pt]";
            suma += "engspeed&=k\\ propspeed\\\\[5pt]";
            suma += "\\frac{engspeed}{propspeed}&=k\\\\[5pt]";
            suma += "\\frac{" + thouSep(engspeed, "\\ ") + "}{" + thouSep(propspeed, "\\ ") + "}&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ engspeed&=k\\ propspeed\\\\[5pt]";
            suma += "\\frac{engspeed}{k}&=propspeed\\\\[5pt]";
            suma += "\\frac{" + thouSep((engspeed + engspeedadj), "\\ ") + "}{" + k + "}&=propspeed\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + thouSep(dp((engspeed + engspeedadj) / k, 2, 2), "\\ ") + "\\ rpm}}&=propspeed\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 2:
            do {
                propspeed = rndgen(2000, 3000, 0, 50, -1);
                do {
                    propspeedadj = rndgen(-750, 750, 0, 50, -1);
                } while (propspeedadj === 0 || propspeed + propspeedadj < 2000 || propspeed + propspeedadj > 3000);
                engspeed = rndgen(15000, 16000, 0, 250, -1);
                k = engspeed / propspeed;
            } while (k - dp(k, 4, -1) !== 0 || k === 1)  //Ensures k has no more than 4 decimal places and isn't 1
            sumq += "The engine speed of an aircraft is directly proportional to the propeller speed.<br>";
            sumq += "a. If the engine rotates at " + thouSep(engspeed, "&nbsp;") + "&nbsp;rpm and the propeller rotates at " + thouSep(propspeed, "&nbsp;") + "&nbsp;rpm, " + 
                        "find the constant of proportionality (k) for the reduction gearbox.<br>";
            sumq += "b. Using the constant of proportionality calculated above, find the engine speed required to give a propeller speed " + 
                        "of " + thouSep((propspeed + propspeedadj), "&nbsp;") + "&nbsp;rpm, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ engspeed&\\propto propspeed\\\\[5pt]";
            suma += "engspeed&=k\\ propspeed\\\\[5pt]";
            suma += "\\frac{engspeed}{propspeed}&=k\\\\[5pt]";
            suma += "\\frac{" + thouSep(engspeed, "\\ ") + "}{" + thouSep(propspeed, "\\ ") + "}&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ engspeed&=k\\ propspeed\\\\[5pt]";
            suma += "&=" + k + "\\times " + thouSep((propspeed + propspeedadj), "\\ ") + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + thouSep(dp(k * (propspeed + propspeedadj), 2, 2), "\\ ") + "\\ rpm}}\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 3:
            do {
                drag = rndgen(1800, 1900, 0, 5, -1);
                do {
                    dragadj = rndgen(-750, 750, 0, 5, -1);
                } while (dragadj === 0 || drag + dragadj < 1800 || drag + dragadj > 1900);
                velocity = rndgen(170, 250, 0, 5, -1);
                k = drag / Math.pow(velocity, 2);
            } while (k - dp(k, 4, -1) !== 0 || k - dp(k, 0, -1) === 0)  //Ensures k has between 1 and 4 decimal places
            sumq += "The drag (D) acting on an aircraft in flight is directly proportional to the square of the velocity (v).<br>";
            sumq += "a. Find the constant of proportionality (k) if the drag force is " + thouSep(drag, "&nbsp;") + 
                        "&nbsp;N when the aircraft's velocity is " + thouSep(velocity, "&nbsp;") + "&nbsp;m/s <br>";
            sumq += "b. Using the constant of proportionality calculated above, determine the aircraft's velocity when the drag force " + 
                        "is " + thouSep((drag + dragadj), "&nbsp;") + "&nbsp;N, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ D&\\propto v^2\\\\[5pt]";
            suma += "D&=kv^2\\\\[5pt]";
            suma += "\\frac{D}{v^2}&=k\\\\[5pt]";
            suma += "\\frac{" + thouSep(drag, "\\ ") + "}{" + velocity + "^2}&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ D&=k\\ v^2\\\\[5pt]";
            suma += "\\frac{D}{k}&=v^2\\\\[5pt]";
            suma += "\\sqrt{\\frac{D}{k}}&=v\\\\[5pt]";
            suma += "\\sqrt{\\frac{" + thouSep((drag + dragadj), "\\ ") + "}{" + k + "}}&=v\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + thouSep(dp(Math.sqrt((drag + dragadj) / k), 2, 2), "\\ ") + "\\ m/s}}&=v\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 4:
            do {
                velocity = rndgen(170, 250, 0, 5, -1);
                do {
                    veladj = rndgen(-70, 70, 0, 5, -1);
                } while (veladj === 0 || velocity + veladj < 170 || velocity + veladj > 250);
                drag = rndgen(1800, 1900, 0, 5, -1);
                k = drag / Math.pow(velocity, 2);
            } while (k - dp(k, 4, -1) !== 0 || k - dp(k, 0, -1) === 0)  //Ensures k has between 1 and 3 decimal places
            sumq += "The drag (D) acting on an aircraft in flight is directly proportional to the square of the velocity (v).<br>";
            sumq += "a. Find the constant of proportionality (k) if the drag force is " + thouSep(drag, "&nbsp;") + 
                        "&nbsp;N when the aircraft's velocity is " + thouSep(velocity, "&nbsp;") + "&nbsp;m/s <br>";
            sumq += "b. Using the constant of proportionality calculated above, determine the drag force on an aircraft travelling at a velocity " + 
                        "of " + thouSep((velocity + veladj), "&nbsp;") + "&nbsp;m/s, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ D&\\propto v^2\\\\[5pt]";
            suma += "D&=kv^2\\\\[5pt]";
            suma += "\\frac{D}{v^2}&=k\\\\[5pt]";
            suma += "\\frac{" + thouSep(drag, "\\ ") + "}{" + velocity + "^2}&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ D&=k\\ v^2\\\\[5pt]";
            suma += "&=" + k + "\\times" + (velocity + veladj) + "^2\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + thouSep(dp(k * Math.pow(velocity + veladj, 2), 2, 2), "\\ ") + "\\ N}}\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 5:
            do {
                friction = rndgen(150, 400, 0, 5, -1);
                do {
                    frictionadj = rndgen(-240, 240, 0, 5, -1);
                } while (frictionadj === 0 || friction + frictionadj < 150 || friction + frictionadj > 400);
                weight = rndgen(200, 500, 0, 5, -1);
                k = friction / weight;
            } while (k - dp(k, 4, -1) !== 0 || k === 1)  //Ensures k has no more than 4 decimal places and isn't 1
            sumq += "The frictional force (F) required to move a container is directly proportional to the weight (W) of the container.<br>";
            sumq += "a. Determine the constant of proportionality (k) if the frictional force is " + friction + 
                        "&nbsp;N when the container's weight is " + weight + "&nbsp;N<br>";
            sumq += "b. A change in the weight of the container results in a new frictional force of " + (friction + frictionadj) +
                        "&nbsp;N. Use the constant of proportionality calculated above to determine the " +
                        "new weight of the container, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ F&\\propto W\\\\[5pt]";
            suma += "F&=kW\\\\[5pt]";
            suma += "\\frac{F}{W}&=k\\\\[5pt]";
            suma += "\\frac{" + friction + "}{" + weight + "}&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ F&=kW\\\\[5pt]";
            suma += "\\frac{F}{k}&=W\\\\[5pt]";
            suma += "\\frac{" + (friction + frictionadj) + "}{" + k + "}&=W\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + dp((friction + frictionadj) / k, 2, 2) + "\\ N}}&=W\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 6:
            do {
                weight = rndgen(200, 500, 0, 5, -1);
                do {
                    weightadj = rndgen(-290, 290, 0, 5, -1);
                } while (weightadj === 0 || weight + weightadj < 200 || weight + weightadj > 500);
                friction = rndgen(150, 400, 0, 5, -1);
                k = friction / weight;
            } while (k - dp(k, 4, -1) !== 0 || k === 1)  //Ensures k has no more than 4 decimal places and isn't 1
            sumq += "The frictional force (F) required to move a container is directly proportional to the weight (W) of the container.<br>";
            sumq += "a. Determine the constant of proportionality (k) if the frictional force is " + friction + 
                        "&nbsp;N when the container's weight is " + weight + "&nbsp;N<br>";
            sumq += "b. If the weight of the container changes to " + (weight + weightadj) +
                        "&nbsp;N, use the constant of proportionality calculated above to determine the " +
                        "new frictional force, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ F&\\propto W\\\\[5pt]";
            suma += "F&=kW\\\\[5pt]";
            suma += "\\frac{F}{W}&=k\\\\[5pt]";
            suma += "\\frac{" + friction + "}{" + weight + "}&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ F&=kW\\\\[5pt]";
            suma += "&=" + k + "\\times" + (weight + weightadj) + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(k * (weight + weightadj), 2, 2) + "\\ N}}\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 7:
            do {
                volume = rndgen(0.02, 0.4, 2, 0.01, -1);
                do {
                    volumeadj = rndgen(-0.37, 0.37, 2, 0.01, -1);
                } while (volumeadj === 0 || volume + volumeadj < 0.02 || volume + volumeadj > 0.4);
                pressure = rndgen(100, 300, 0, 5, -1);
                k = volume * pressure;
            } while (k - dp(k, 4, -1) !== 0 || k === 1)  //Ensures k has no more than 4 decimal places and isn't 1
            sumq += "The volume (V) of a hydraulic cylinder is inversely proportional to the pressure (P) inside the cylinder.<br>";
            sumq += "a. Determine the constant of proportionality (k) if the pressure is " + pressure + " bar and the volume is " + volume + " m<sup>3</sup>.<br>";
            sumq += "b. Using the constant of proportionality calculated above, find the pressure when the volume is changed to " + 
                        dp((volume + volumeadj), 2, -1) + " m<sup>3</sup>, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ V&\\propto \\frac{1}{P}\\\\[5pt]";
            suma += "V&=\\frac{k}{P}\\\\[5pt]";
            suma += "PV&=k\\\\[5pt]";
            suma += pressure + "\\times" + volume + "&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ V&=\\frac{k}{P}\\\\[5pt]";
            suma += "PV&=k\\\\[5pt]";
            suma += "P&=\\frac{k}{V}\\\\[5pt]";
            suma += "&=\\frac{" + k + "}{" + dp((volume + volumeadj), 2, -1) + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(k / (volume + volumeadj), 2, 2) + "\\ bar}}\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 8:
            do {
                pressure = rndgen(100, 300, 0, 5, -1);
                do {
                    pressureadj = rndgen(-190, 190, 0, 5, -1);
                } while (pressureadj === 0 || pressure + pressureadj < 100 || pressure + pressureadj > 300);
                volume = rndgen(0.02, 0.4, 2, 0.01, -1);
                k = volume * pressure;
            } while (k - dp(k, 4, -1) !== 0 || k === 1)  //Ensures k has no more than 4 decimal places and isn't 1
            sumq += "The volume (V) of a hydraulic cylinder is inversely proportional to the pressure (P) inside the cylinder.<br>";
            sumq += "a. Determine the constant of proportionality (k) if the pressure is " + pressure + " bar and the volume is " + volume + " m<sup>3</sup>.<br>";
            sumq += "b. Using the constant of proportionality calculated above, find the volume when the pressure is changed to " + 
                        dp((pressure + pressureadj), 2, -1) + " bar, rounding your answer to 3 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ V&\\propto \\frac{1}{P}\\\\[5pt]";
            suma += "V&=\\frac{k}{P}\\\\[5pt]";
            suma += "PV&=k\\\\[5pt]";
            suma += pressure + "\\times" + volume + "&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ V&=\\frac{k}{P}\\\\[5pt]";
            suma += "&=\\frac{" + k + "}{" + dp((pressure + pressureadj), 2, -1) + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(k / (pressure + pressureadj), 3, 3) + "\\ m^3}}\\ (3\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 9:
            do {
                current = rndgen(5, 20, 0, 1, -1);
                do {
                    currentadj = rndgen(-19, 19, 0, 2, -1);
                } while (currentadj === 0 || current + currentadj < 5 || current + currentadj > 20);
                resistance = rndgen(10, 100, 0, 1, -1);
                k = current * resistance;
            } while (k - dp(k, 2, -1) !== 0 || k === 1)  //Ensures k has no more than 2 decimal places and isn't 1
            sumq += "The flow rate of the current (I) in an electrical circuit is inversely proportional to the resistance (R) in the circuit.<br>";
            sumq += "a. Determine k if the current is " + current + " Amps (A) when the resistance is " + resistance + " Ohms (Ω).<br>";
            sumq += "b. Using the constant of proportionality calculated above, determine the resistance when the current is changed to " + 
                        (current + currentadj) + " A, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ I&\\propto \\frac{1}{R}\\\\[5pt]";
            suma += "I&=\\frac{k}{R}\\\\[5pt]";
            suma += "IR&=k\\\\[5pt]";
            suma += current + "\\times" + resistance + "&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ I&=\\frac{k}{R}\\\\[5pt]";
            suma += "IR&=k\\\\[5pt]";
            suma += "R&=\\frac{k}{I}\\\\[5pt]";
            suma += "&=\\frac{" + k + "}{" + dp((current + currentadj), 2, -1) + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(k / (current + currentadj), 2, 2) + "\\ \\Omega}}\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 10:
            do {
                resistance = rndgen(10, 100, 0, 1, -1);
                do {
                    resistanceadj = rndgen(-85, 85, 0, 2, -1);
                } while (resistanceadj === 0 || resistance + resistanceadj < 10 || resistance + resistanceadj > 100);
                current = rndgen(5, 20, 0, 1, -1);
                k = current * resistance;
            } while (k - dp(k, 2, -1) !== 0 || k === 1)  //Ensures k has no more than 2 decimal places and isn't 1
            sumq += "The flow rate of the current (I) in an electrical circuit is inversely proportional to the resistance (R) in the circuit.<br>";
            sumq += "a. Determine k if the current is " + current + " Amps (A) when the resistance is " + resistance + " Ohms (Ω).<br>";
            sumq += "b. Using the constant of proportionality calculated above, determine the current when the resistance is changed to " + 
                        (resistance + resistanceadj) + " Ω, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ I&\\propto \\frac{1}{R}\\\\[5pt]";
            suma += "I&=\\frac{k}{R}\\\\[5pt]";
            suma += "IR&=k\\\\[5pt]";
            suma += current + "\\times" + resistance + "&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ I&=\\frac{k}{R}\\\\[5pt]";
            suma += "&=\\frac{" + k + "}{" + dp((resistance + resistanceadj), 2, -1) + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(k / (resistance + resistanceadj), 2, 2) + "\\ A}}\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 11:
            do {
                intensity = rndgen(800, 900, 0, 5, -1);
                do {
                    intensityadj = rndgen(-90, 90, 0, 1, -1);
                } while (intensityadj === 0 || intensity + intensityadj < 800 || intensity + intensityadj > 900);
                distance = rndgen(10, 80, 0, 1, -1);
                k = intensity * Math.pow(distance, 2);
            } while (k - dp(k, 0, -1) !== 0 || k === 1)  //Ensures k has no decimal places and isn't 1
            sumq += "The intensity (I) of an aircraft landing light is inversely proportional to the square of the distance (d) from the light.<br>";
            sumq += "a. Calculate the constant of proportionality if the intensity is " + intensity + "&nbsp;candela (cd) at a distance of " + distance + "&nbsp;m.<br>";
            sumq += "b. Use the constant of proportionality calculated above to find the distance at which the intensity is " + (intensity + intensityadj) + 
                        "&nbsp;cd, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ I&\\propto \\frac{1}{d^2}\\\\[5pt]";
            suma += "I&=\\frac{k}{d^2}\\\\[5pt]";
            suma += "Id^2&=k\\\\[5pt]";
            suma += intensity + "\\times" + distance + "^2&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + thouSep(k, "\\ ") + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ I&=\\frac{k}{d^2}\\\\[5pt]";
            suma += "Id^2&=k\\\\[5pt]";
            suma += "d^2&=\\frac{k}{I}\\\\[5pt]";
            suma += "d&=\\sqrt{\\frac{k}{I}}\\\\[5pt]";
            suma += "&=\\sqrt{\\frac{" + thouSep(k, "\\ ") + "}{" + dp((intensity + intensityadj), 2, -1) + "}}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(Math.sqrt(k / (intensity + intensityadj)), 2, 2) + "\\ m}}\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
        case 12:
            do {
                distance = rndgen(10, 80, 0, 1, -1);
                do {
                    distanceadj = rndgen(-65, 65, 0, 1, -1);
                } while (distanceadj === 0 || distance + distanceadj < 10 || distance + distanceadj > 80);
                intensity = rndgen(800, 900, 0, 5, -1);
                k = intensity * Math.pow(distance, 2);
            } while (k - dp(k, 0, -1) !== 0 || k === 1)  //Ensures k has no decimal places and isn't 1
            sumq += "The intensity (I) of an aircraft landing light is inversely proportional to the square of the distance (d) from the light.<br>";
            sumq += "a. Calculate the constant of proportionality if the intensity is " + intensity + "&nbsp;candela (cd) at a distance of " + distance + "&nbsp;m.<br>";
            sumq += "b. Use the constant of proportionality calculated above to find the intensity of light at a distance of " + (distance + distanceadj) + 
                        "&nbsp;m, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ I&\\propto \\frac{1}{d^2}\\\\[5pt]";
            suma += "I&=\\frac{k}{d^2}\\\\[5pt]";
            suma += "Id^2&=k\\\\[5pt]";
            suma += intensity + "\\times" + distance + "^2&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + thouSep(k, "\\ ") + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ I&=\\frac{k}{d^2}\\\\[5pt]";
            suma += "&=\\frac{" + thouSep(k, "\\ ") + "}{" + (distance + distanceadj) + "^2}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + thouSep(dp(k / (Math.pow(distance + distanceadj, 2)), 2, 2), "\\ ") + "\\ cd}}\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
    }
    var notesLink = "images/20230706-MathsBook08Proportionv1_6-APO.pdf#page=4";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}