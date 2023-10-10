var sumarrtranspose1 = [], sumq, suma;
function transposeI() {
    sumq = "";
    suma = "";
    sumarrtranspose1 = QLimitRepeats(sumarrtranspose1, 33);   //Ensures no repeat question until at least 50% of questions shown
    var sum = sumarrtranspose1[sumarrtranspose1.length - 1];
    switch(sum) {
        case 1:
            sumq += "Transpose the following to make x the subject.";
            sumq += "$$y=x+z$$";
            suma += "$$y-z=x$$";
            break;

        case 2:
            sumq += "Transpose the following to make b the subject.";
            sumq += "$$a=b-c$$";
            suma += "$$a+c=b$$";
            break;

        case 3:
            sumq += "Transpose the following to make s the subject.";
            sumq += "$$p=q+s$$";
            suma += "$$p-q=s$$";
            break;

        case 4:
            sumq += "Transpose the following to make n the subject.";
            sumq += "$$i=m-n$$";
            suma += "$$\\begin{aligned}i+n&=m\\\\[5pt]";
            suma += "n&=m-i\\end{aligned}$$";
            break;

        case 5:
            sumq += "Transpose the following to make x the subject.";
            sumq += "$$y=zx$$";
            suma += "$$\\frac{y}{z}=x$$";
            break;

        case 6:
            sumq += "Transpose the following to make Opp the subject.";
            sumq += "$$\\sin{\\theta}=\\frac{Opp}{Hyp}$$";
            suma += "$$Hyp\\times \\sin{\\theta}=Opp$$";
            break;

        case 7:
            sumq += "Transpose the following to make z the subject.";
            sumq += "$$y=\\frac{z}{x}$$";
            suma += "$$yx=z$$";
            break;

        case 8:
            sumq += "Transpose the following to make c the subject.";
            sumq += "$$a=\\frac{b}{c}$$";
            suma += "$$\\begin{aligned}ac&=b\\\\[5pt]";
            suma += "c&=\\frac{b}{a}\\end{aligned}$$";
            break;

        case 9:
            sumq += "Transpose the following to make u the subject.";
            sumq += "$$v=u+at$$";
            suma += "$$v-at=u$$";
            break;

        case 10:
            sumq += "Transpose the following to make I the subject.";
            sumq += "$$V=E-Ir$$";
            suma += "$$\\begin{aligned}V+Ir&=E\\\\[5pt]";
            suma += "Ir&=E-V\\\\[5pt]";
            suma += "I&=\\frac{E-V}{r}\\end{aligned}$$";
            break;

        case 11:
            sumq += "Transpose the following to make t the subject.";
            sumq += "$$v=u+at$$";
            suma += "$$\\begin{aligned}v-u&=at\\\\[5pt]";
            suma += "\\frac{v-u}{a}&=t\\end{aligned}$$";
            break;

        case 12:
            sumq += "Transpose the following to make T the subject.";
            sumq += "$$P=\\frac{mRT}{V}$$";
            suma += "$$\\begin{aligned}PV&=mRT\\\\[5pt]";
            suma += "\\frac{PV}{mR}&=T\\end{aligned}$$";
            break;

        case 13:
            sumq += "Transpose the following to make u the subject.";
            sumq += "$$s=ut+\\frac{1}{2}at^2$$";
            suma += "$$\\begin{aligned}s-\\frac{1}{2}at^2&=ut\\\\[5pt]";
            suma += "\\frac{s-\\frac{1}{2}at^2}{t}&=u\\\\[5pt]";
            suma += "\\frac{2s-at^2}{2t}&=u\\end{aligned}$$";
            break;

        case 14:
            sumq += "Transpose the following to make P the subject.";
            sumq += "$$\\frac{1}{R}=\\frac{1}{P}$$";
            suma += "$$R=P$$";
            break;

        case 15:
            sumq += "Transpose the following to make u the subject.";
            sumq += "$$R(u+s)=p$$";
            suma += "$$\\begin{aligned}u+s&=\\frac{P}{R}\\\\[5pt]";
            suma += "u&=\\frac{P}{R}-s\\end{aligned}$$";
            break;

        case 16:
            sumq += "Transpose the following to make I the subject.";
            sumq += "$$R_N=\\frac{E}{I}-R_M$$";
            suma += "$$\\begin{aligned}R_N+R_M&=\\frac{E}{I}\\\\[5pt]";
            suma += "I(R_N+R_M)&=E\\\\[5pt]";
            suma += "I&=\\frac{E}{R_N+R_M}\\end{aligned}$$";
            break;

        case 17:
            sumq += "Transpose the following to make x the subject.";
            sumq += "$$y=mx+c$$";
            suma += "$$\\begin{aligned}y-c&=mx\\\\[5pt]";
            suma += "\\frac{y-c}{m}&=x\\end{aligned}$$";
            break;

        case 18:
            sumq += "Transpose the following to make \\(P_2\\) the subject.";
            sumq += "$$\\frac{P_1 V_1}{T_1}=\\frac{P_2 V_2}{T_2}$$";
            suma += "$$\\begin{aligned}\\frac{P_1 V_1 T_2}{T_1}&=P_2 V_2\\\\[5pt]";
            suma += "\\frac{P_1 V_1 T_2}{T_1 V_2}&=P_2\\end{aligned}$$";
            break;

        case 19:
            sumq += "Transpose the following to make H the subject.";
            sumq += "$$\\cos \\theta=\\frac{Adj}{Hyp}$$";
            suma += "$$\\begin{aligned}Hyp\\times \\cos \\theta&=Adj\\\\[5pt]";
            suma += "Hyp&=\\frac{Adj}{\\cos \\theta}\\end{aligned}$$";
            break;

        case 20:
            sumq += "Transpose the following to make A the subject.";
            sumq += "$$\\sqrt{A}=d$$";
            suma += "$$A=d^2$$";
            break;

        case 21:
            sumq += "Transpose the following to make p the subject.";
            sumq += "$$p^2=q$$";
            suma += "$$p=\\sqrt{q}$$";
            break;

        case 22:
            sumq += "Transpose the following to make X the subject.";
            sumq += "$$\\sqrt[3]{X}=Y$$";
            suma += "$$X=Y^3$$;"
            break;

        case 23:
            sumq += "Transpose the following to make a the subject.";
            sumq += "$$a^3=b$$";
            suma += "$$a=\\sqrt[3]{b}$$";
            break;

        case 24:
            sumq += "Transpose the following to make r the subject.";
            sumq += "$$A=\\pi r^2$$";
            suma += "$$\\begin{aligned} \\frac{A}{\\pi}&=r^2\\\\[5pt]";
            suma += "\\sqrt{\\frac{A}{\\pi}}&=r\\end{aligned}$$";
            break;

        case 25:
            sumq += "Transpose the following to make n the subject.";
            sumq += "$$(n-1)^2=t$$";
            suma += "$$\\begin{aligned}n-1&=\\sqrt{t}\\\\[5pt]";
            suma += "n&=\\sqrt{t}+1\\end{aligned}$$";
            break;

        case 26:
            sumq += "Transpose the following to make r the subject.";
            sumq += "$$p=q\\sqrt{r}$$";
            suma += "$$\\begin{aligned}\\frac{p}{q}&=\\sqrt{r}\\\\[5pt]";
            suma += "\\left(\\frac{p}{q}\\right)^2&=r\\\\[5pt]";
            suma += "\\frac{p^2}{q^2}&=r\\end{aligned}$$";
            break;

        case 27:
            sumq += "Transpose the following to make x the subject.";
            sumq += "$$z=\\sqrt{r^2+x^2}$$";
            suma += "$$\\begin{aligned}z^2&=r^2+x^2\\\\[5pt]";
            suma += "z^2-r^2&=x^2\\\\[5pt]";
            suma += "\\sqrt{z^2-r^2}&=x\\end{aligned}$$";
            break;

        case 28:
            sumq += "Transpose the following to make c the subject.";
            sumq += "$$a=\\sqrt{2bc}$$";
            suma += "$$\\begin{aligned}a^2&=2bc\\\\[5pt]";
            suma += "\\frac{a^2}{2b}&=c\\end{aligned}$$";
            break;

        case 29:
            sumq += "Transpose the following to make z the subject.";
            sumq += "$$x^2=yz^3$$";
            suma += "$$\\begin{aligned}\\frac{x^2}{y}&=z^3\\\\[5pt]";
            suma += "\\sqrt[3]{\\frac{x^2}{y} }&=z\\end{aligned}$$";
            break;

        case 30:
            sumq += "Transpose the following to make k the subject.";
            sumq += "$$y=kx^3$$";
            suma += "$$\\frac{y}{x^3}=k$$";
            break;

        case 31:
            sumq += "Transpose the following to make k the subject.";
            sumq += "$$y=\\frac{k}{\\sqrt[3]{x}}$$";
            suma += "$$y\\sqrt[3]{x}=k$$";
            break;

        case 32:
            sumq += "Transpose the following to make x the subject.";
            sumq += "$$y=kx^3$$";
            suma += "$$\\begin{aligned}\\frac{y}{k}&=x^3\\\\[5pt]";
            suma += "\\sqrt[3]{\\frac{y}{k}}&=x\\end{aligned}$$";
            break;

        case 33:
            sumq += "Transpose the following to make x the subject.";
            sumq += "$$y=\\frac{k}{\\sqrt[3]{x}}$$";
            suma += "$$\\begin{aligned}y\\sqrt[3]{x}&=k\\\\[5pt]";
            suma += "\\sqrt[3]{x}&=\\frac{k}{y}\\\\[5pt]";
            suma += "x&=\\left(\\frac{k}{y}\\right)^3\\end{aligned}$$";
            break;
    }
    var notesLink = "images/20200504-MathsBook5AlgebraicOpsv1_3-APO.pdf#page=29"
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}