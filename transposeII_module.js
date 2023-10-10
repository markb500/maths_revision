var sumarrtranspose2 = [], sumq, suma;
function transposeII() {
    var sum;
    sumq = "";
    suma = "";
    sumarrtranspose2 = QLimitRepeats(sumarrtranspose2, 20);   //Ensures no repeat question until at least 50% of questions shown
    sum = sumarrtranspose2[sumarrtranspose2.length - 1];
    switch(sum) {
        case 1:
            sumq += "Transpose the following to make b the subject.";
            sumq += "$$ab-b=c$$";
            suma += "$$\\begin{aligned}b(a-1)&=c\\\\[5pt]";
            suma += "b&=\\frac{c}{a-1}\\end{aligned}$$";
            break;

        case 2:
            sumq += "Transpose the following to make p the subject.";
            sumq += "$$p=st-pq$$";
            suma += "$$\\begin{aligned}p+pq&=st\\\\[5pt]";
            suma += "p(1+q)&=st\\\\[5pt]";
            suma += "p&=\\frac{st}{1+q}\\end{aligned}$$";
            break;

        case 3:
            sumq += "Transpose the following to make y the subject.";
            sumq += "$$x=\\frac{y+3}{y}$$";
            suma += "$$\\begin{aligned}xy&=y+3\\\\[5pt]";
            suma += "xy-y&=3\\\\[5pt]";
            suma += "y(x-1)&=3\\\\[5pt]";
            suma += "y&=\\frac{3}{x-1}\\end{aligned}$$";
            break;

        case 4:
            sumq += "Transpose the following to make a the subject.";
            sumq += "$$\\frac{a-b}{a}=c$$";
            suma += "$$\\begin{aligned}a-b&=ac\\\\[5pt]";
            suma += "-b&=ac-a\\\\[5pt]";
            suma += "-b&=a(c-1)\\\\[5pt]";
            suma += "\\frac{-b}{c-1}&=a\\\\[5pt]";
            suma += "OR\\\\[5pt]";
            suma += "a-b&=ac\\\\[5pt]";
            suma += "a&=ac+b\\\\[5pt]";
            suma += "a-ac&=b\\\\[5pt]";
            suma += "a(1-c)&=b\\\\[5pt]";
            suma += "a&=\\frac{b}{1-c}\\end{aligned}$$";
            break;

        case 5:
            sumq += "Transpose the following to make u the subject.";
            sumq += "$$d=\\frac{t-u}{u}$$";
            suma += "$$\\begin{aligned}du&=t-u\\\\[5pt]";
            suma += "du+u&=t\\\\[5pt]";
            suma += "u(d+1)&=t\\\\[5pt]";
            suma += "u&=\\frac{t}{d+1}\\end{aligned}$$";
            break;

        case 6:
            sumq += "Transpose the following to make b the subject.";
            sumq += "$$\\frac{1}{a}=\\frac{2}{b}+\\frac{3}{c}$$";
            suma += "$$\\begin{aligned}\\frac{1}{a}-\\frac{3}{c}&=\\frac{2}{b}\\\\[5pt]";
            suma += "\\frac{c-3a}{ac}&=\\frac{2}{b}\\\\[5pt]";
            suma += "\\frac{ac}{c-3a}&=\\frac{b}{2}\\\\[5pt]";
            suma += "\\frac{2ac}{c-3a}&=b\\end{aligned}$$";
            break;

        case 7:
            sumq += "Transpose the following to make \\(R_1\\) the subject.";
            sumq += "$$\\frac{1}{R}=\\frac{1}{R_1}+\\frac{1}{R_2}$$";
            suma += "$$\\begin{aligned}\\frac{1}{R}-\\frac{1}{R_2}&=\\frac{1}{R_1}\\\\[5pt]";
            suma += "\\frac{R_2-R}{RR_2}&=\\frac{1}{R_1}\\\\[5pt]";
            suma += "\\frac{RR_2}{R_2-R}&=R_1\\end{aligned}$$";
            break;

        case 8:
            sumq += "Transpose the following to make \\(A_0\\) the subject.";
            sumq += "$$A_F=\\frac{A_0}{1+A_0\\beta}$$";
            suma += "$$\\begin{aligned}A_F(1+A_0\\beta)&=A_0\\\\[5pt]";
            suma += "A_F+A_F A_0\\beta&=A_0\\\\[5pt]";
            suma += "A_F&=A_0-A_F A_0\\beta\\\\[5pt]";
            suma += "A_F&=A_0(1-A_F\\beta)\\\\[5pt]";
            suma += "\\frac{A_F}{1-A_F\\beta}&=A_0\\end{aligned}$$";
            break;

        case 9:
            sumq += "Transpose the following to make c the subject.";
            sumq += "$$f=f_0\\left(\\frac{c+v}{c-u}\\right)$$";
            suma += "$$\\begin{aligned}f&=\\frac{f_0c+f_0v}{c-u}\\\\[5pt]";
            suma += "f(c-u)&=f_0c+f_0v\\\\[5pt]";
            suma += "fc-fu&=f_0c+f_0v\\\\[5pt]";
            suma += "fc-f_0c&=f_0v+fu\\\\[5pt]";
            suma += "c(f-f_0)&=f_0v+fu\\\\[5pt]";
            suma += "c&=\\frac{f_0v+fu}{f-f_0}\\end{aligned}$$";
            break;

        case 10:
            sumq += "Transpose the following to make u the subject.";
            sumq += "$$\\frac{1}{f}=\\frac{1}{u}+\\frac{1}{v}$$";
            suma += "$$\\begin{aligned}\\frac{1}{f}-\\frac{1}{v}&=\\frac{1}{u}\\\\[5pt]";
            suma += "\\frac{v-f}{fv}&=\\frac{1}{u}\\\\[5pt]";
            suma += "\\frac{fv}{v-f}&=u\\end{aligned}$$";
            break;

        case 11:
            sumq += "Transpose the following to make F the subject.";
            sumq += "$$C=\\frac{5}{9}F-32$$";
            suma += "$$\\begin{aligned}\\frac{9}{5}C&=F-32\\\\[5pt]";
            suma += "\\frac{9}{5}C+32&=F\\end{aligned}$$";
            break;

        case 12:
            sumq += "Transpose the following to make R the subject.";
            sumq += "$$I=\\frac{E}{r+R}$$";
            suma += "$$\\begin{aligned}I(r+R)&=E\\\\[5pt]";
            suma += "r+R&=\\frac{E}{I}\\\\[5pt]";
            suma += "R&=\\frac{E}{I}-r\\\\[5pt]";
            suma += "OR\\\\[5pt]";
            suma += "I(r+R)&=E\\\\[5pt]";
            suma += "Ir+IR&=E\\\\[5pt]";
            suma += "IR&=E-Ir\\\\[5pt]";
            suma += "R&=\\frac{E-Ir}{I}\\end{aligned}$$";
            break;

        case 13:
            sumq += "Transpose the following to make h the subject.";
            sumq += "$$v=\\sqrt{2gh}$$";
            suma += "$$\\begin{aligned}v^2&=2gh\\\\[5pt]";
            suma += "\\frac{v^2}{2g}&=h\\end{aligned}$$";
            break;

        case 14:
            sumq += "Transpose the following to make C the subject.";
            sumq += "$$Q=\\frac{1}{R}\\sqrt{\\frac{L}{C}}$$";
            suma += "$$\\begin{aligned}QR&=\\sqrt{\\frac{L}{C}}\\\\[5pt]";
            suma += "(QR)^2&=\\frac{L}{C}\\\\[5pt]";
            suma += "C(QR)^2&=L\\\\[5pt]";
            suma += "C&=\\frac{L}{(QR)^2}\\end{aligned}$$";
            break;

        case 15:
            sumq += "Transpose the following to make l the subject.";
            sumq += "$$T=2\\pi\\sqrt{\\frac{l}{g}}$$";
            suma += "$$\\begin{aligned}\\frac{T}{2\\pi}&=\\sqrt{\\frac{l}{g}}\\\\[5pt]";
            suma += "\\left(\\frac{T}{2\\pi}\\right)^2&=\\frac{l}{g}\\\\[5pt]";
            suma += "g\\left(\\frac{T}{2\\pi}\\right)^2&=l\\end{aligned}$$";
            break;

        case 16:
            sumq += "Transpose the following to make a the subject.";
            sumq += "$$s=ut+\\frac{1}{2}at^2$$";
            suma += "$$\\begin{aligned}s-ut&=\\frac{1}{2}at^2\\\\[5pt]";
            suma += "\\frac{s-ut}{\\frac{1}{2}t^2}&=a\\\\[5pt]";
            suma += "\\frac{2(s-ut)}{t^2}&=a\\end{aligned}$$";
            break;

        case 17:
            sumq += "Transpose the following to make s the subject.";
            sumq += "$$x=\\sqrt{\\frac{s-a}{s-b}}$$";
            suma += "$$\\begin{aligned}x^2&=\\frac{s-a}{s-b}\\\\[5pt]";
            suma += "x^2(s-b)&=s-a\\\\[5pt]";
            suma += "x^2s-x^2b&=s-a\\\\[5pt]";
            suma += "x^2s-s&=x^2b-a\\\\[5pt]";
            suma += "s(x^2-1)&=x^2b-a\\\\[5pt]";
            suma += "s&=\\frac{x^2b-a}{x^2-1}\\end{aligned}$$";
            break;

        case 18:
            sumq += "Transpose the following to make R the subject.";
            sumq += "$$I=\\frac{PTR}{100}$$";
            suma += "$$\\begin{aligned}100I&=PTR\\\\[5pt]";
            suma += "\\frac{100I}{PT}&=R\\end{aligned}$$";
            break;

        case 19:
            sumq += "Transpose the following to make r the subject.";
            sumq += "$$V=I\\sqrt{r^2+X_L}$$";
            suma += "$$\\begin{aligned}\\frac{V}{I}&=\\sqrt{r^2+X_L}\\\\[5pt]";
            suma += "\\left(\\frac{V}{I}\\right)^2&=r^2+X_L\\\\[5pt]";
            suma += "\\left(\\frac{V}{I}\\right)^2-X_L&=r^2\\\\[5pt]";
            suma += "\\sqrt{\\left(\\frac{V}{I}\\right)^2-X_L}&=r\\\\[5pt]";
            suma += "\\sqrt{\\frac{V^2}{I^2}-X_L}&=r\\end{aligned}$$";
            break;

        case 20:
            sumq += "Transpose the following to make g the subject.";
            sumq += "$$t=2\\pi \\sqrt{\\frac{h^2+g^2}{h}}$$";
            suma += "$$\\begin{aligned}\\frac{t}{2\\pi}&=\\sqrt{\\frac{h^2+g^2}{h}}\\\\[5pt]";
            suma += "\\left(\\frac{t}{2\\pi}\\right)^2&=\\frac{h^2+g^2}{h}\\\\[5pt]";
            suma += "h\\left(\\frac{t}{2\\pi}\\right)^2&=h^2+g^2\\\\[5pt]";
            suma += "h\\left(\\frac{t}{2\\pi}\\right)^2-h^2&=g^2\\\\[5pt]";
            suma += "\\sqrt{h\\left(\\frac{t}{2\\pi}\\right)^2-h^2}&=g\\end{aligned}$$";
            break;
    }
    
    var notesLink = "images/20200504-MathsBook5AlgebraicOpsv1_3-APO.pdf#page=29"
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}