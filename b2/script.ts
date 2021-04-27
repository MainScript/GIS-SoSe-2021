namespace Aufgabe2 {
    function min(...num: number[]): number {
        let currentmin: number = Infinity;
        for (let zahl of num){
            if (zahl < currentmin){
                currentmin = zahl;
            }
        }
        return currentmin;
    }
    function isEven(x: number): boolean {
        if (x == 0){
            return true;
        } else if (x == 1) {
            return false;
        } else {
            return(isEven(x-2));
        }
    }


    console.log(min(50, 75, -1));

    // console.log(isEven(-1));  Das Programm bleibt hängen, da x = x-2 bei einem Startwert von -1 nie 0/1 erreicht
    // Lösung:
    function isEvenEdited(x: number): boolean {
        if (x == 0){
            return true;
        } else if (x == 1) {
            return false;
        } else {
            if (x > 0){
                return(isEven(x-2));
            } else {
                return(isEven(x+2));
            }
        }
    }
    console.log(isEvenEdited(-1));

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Interface:
    interface StudierenderOld {
        nachname: string,
        vorname: string,
        matrikelnummer: string,
        semester: number,
        studiengang: string
    }

    let student1: StudierenderOld = {nachname: "Shinomiya", vorname: "Kaguya", matrikelnummer: "177013", semester: 3, studiengang: "MKB"};
    let student2: StudierenderOld = {nachname: "Shirogane", vorname: "Miyuki", matrikelnummer: "420690", semester: 3, studiengang: "MIB"};
    let student3: StudierenderOld = {nachname: "Fujiwara", vorname: "Chika", matrikelnummer: "123456", semester: 3, studiengang: "OMB"};

    let StuArrOld: StudierenderOld[] = [student1, student2, student3];
    StuArrOld[3] = {nachname: "Hayasaka", vorname: "Ai", matrikelnummer: "187420", semester: 3, studiengang: "MKB"};

    console.log(StuArrOld[0].nachname + " " + StuArrOld[1].matrikelnummer + " " + StuArrOld[3].studiengang);

    function showInfoOld(stud: StudierenderOld): void {
        console.log("Name: " + stud.vorname + " " + stud.nachname);
        console.log("Matrikelnummer: " + stud.matrikelnummer);
        console.log("Studiengang: " + stud.studiengang + stud.semester);
        console.log("\n");
    }

    for(let student of StuArrOld){
        showInfoOld(student);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // Klasse:
    class Studierender {
        nachname: string;
        vorname: string;
        matrikelnummer: string;
        semester: number;
        studiengang: string;

        constructor(_nachname: string, _vorname: string, _matrikelnummer: string, _semester: number, _studiengang: string){
            this.nachname = _nachname;
            this.vorname = _vorname;
            this.matrikelnummer = _matrikelnummer;
            this.semester = _semester;
            this.studiengang = _studiengang;
        }

        showInfo(): void {
            console.log("Name: " + this.vorname + " " + this.nachname);
            console.log("Matrikelnummer: " + this.matrikelnummer);
            console.log("Studiengang: " + this.studiengang + this.semester);
            console.log("\n");
        }
    }

    let studentNEW: Studierender = new Studierender("Gawr", "Gura", "14147", 9000, "MKB");
    studentNEW.showInfo();

console.log("___________________________________________________");

    var testarray: number[] = [1, 2, 3, 4, 5];

    function backwards(inpArr: number[]): number[]{
        let out: number[] = [];
        for (let i: number = inpArr.length-1; i >= 0; i--){
            out.push(inpArr[i]);
        }
        return out;
    }
    console.log(backwards(testarray));

    function join(...array): number[]{
        let out: number[] = [];
        for (let arr of array){
            for (let num of arr){
                out.push(num);
            }
        }
        return out;
    }

    let test2: number[] = [1,2,3];
    let test3: number[] = [4,5,6];
    console.log(join(testarray, test2, test3));


    // Ich hab die Aufgabe so verstanden, dass die Indizes inklusiv sind, d.h. bei 0 und 2 werden arr[0], arr[1] und arr[2] zurückgegeben
    function split(arr: number[], a: number, b: number): number[] {
        let min: number = Math.min(a, b);
        let max: number = Math.max(a, b);
        let out: number[] = [];
        if (min >= 0 && max < arr.length){
            for(let i: number = min; i <= max; i++){
                out.push(arr[i]);
            }
            return out;
        } else {
            return [-Infinity];
        }
    }

    console.log(split(testarray, 3,1));

    /////////////////////////////////////////////////////////////////////////////////////
    // Testcode:
    let arr: number[] = [5, 42, 17, 2018, -10, 60, -10010];
    let arrBack: number[] = backwards(arr);
    console.log(arr);
    console.log(arrBack);
    console.log(join(arr, [15, 9001, -440] ));
    console.log(join([123, 666, -911], arr, [15, 9001, -440, 1024] )); // Bonus b)
    arr = split(arr, 0, 4);
    console.log(arr);
    console.log(split(arr, 1, 2));
    console.log(split(arr, 2, 0));     // Bonus c)
    console.log(split(arr, -1, 2));    // Bonus c)
    console.log(split(arr, 0, 7));     // Bonus c)


/////////////////////////////////////////////////////////////////////////////////////////

    window.addEventListener("load", function(): void{
        // a)
        let canvas1: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas1");
        let context1: CanvasRenderingContext2D = canvas1.getContext("2d");
        //////////
        context1.beginPath();
        context1.ellipse(305, 225, 125, 150, 0, 0, 2*Math.PI, false);
        context1.fillStyle = 'yellow';
        context1.fill();
        context1.closePath();

        context1.beginPath();
        context1.ellipse(310, 250, 80, 80, 0, 0, 2*Math.PI, false);
        context1.fillStyle = '#ebdcca';
        context1.fill();
        context1.closePath();

        context1.beginPath();
        context1.ellipse(310, 500, 175, 150, 0, 0, 2*Math.PI, false);
        context1.fillStyle = '#665847';
        context1.fill();
        context1.closePath();

        context1.beginPath();
        context1.rect(250, 370, 110, 230);
        context1.fillStyle = 'white';
        context1.fill();
        context1.closePath();
        
        /////////
        let outerpath: number[][] = [[108,601],[102,584],[97,567],[106,534],[115,508],[113,502],[120,475],[126,472],[131,464],[143,460],[147,449],[137,416],[141,403],[156,386],[149,382],[137,383],[142,377],[136,370],[120,368],[103,357],[84,334],[72,302],[71,270],[88,251],[109,245],[129,251],[146,263],[162,281],[172,300],[177,323],[177,340],[172,354],[169,359],[173,366],[181,365],[179,369],[172,373],[168,376],[172,380],[178,380],[184,373],[196,370],[208,367],[202,356],[195,347],[199,358],[202,364],[190,355],[185,341],[183,315],[187,286],[191,262],[190,248],[189,219],[184,230],[187,252],[182,241],[181,223],[186,208],[191,186],[198,167],[203,146],[214,119],[224,105],[234,96],[231,90],[226,76],[245,80],[256,68],[278,64],[295,68],[311,76],[329,70],[352,67],[373,69],[380,82],[402,80],[395,87],[395,93],[388,97],[399,109],[407,122],[414,137],[417,154],[419,170],[418,182],[422,196],[427,216],[430,238],[431,261],[428,274],[433,286],[439,304],[445,317],[445,336],[441,319],[434,306],[436,323],[436,343],[434,355],[428,369],[431,352],[429,339],[423,326],[414,304],[414,323],[417,343],[416,357],[414,367],[405,377],[402,381],[414,387],[427,393],[439,398],[446,418],[454,451],[463,492],[472,527],[478,554],[481,585],[485,599]];
        let lupe: number[][] = [[137,363],[121,356],[105,340],[92,318],[82,293],[83,271],[94,254],[109,247],[124,253],[138,262],[150,275],[161,288],[166,301],[170,316],[172,328],[171,341],[168,352],[163,356],[156,361],[146,359]];
        let innerpath: number[][] = [[235,601],[237,582],[239,553],[242,530],[246,505],[249,484],[254,471],[257,453],[258,426],[257,413],[250,389],[246,371],[255,371],[262,363],[272,355],[282,351],[281,326],[269,320],[249,306],[234,277],[231,250],[235,236],[238,218],[244,199],[244,221],[251,199],[255,184],[259,215],[262,190],[271,213],[282,221],[295,219],[293,190],[314,222],[310,207],[307,178],[318,202],[327,207],[316,186],[312,166],[311,157],[326,158],[347,186],[353,197],[359,215],[368,225],[384,240],[387,250],[392,262],[394,272],[388,279],[383,283],[378,284],[375,293],[368,306],[357,316],[341,326],[331,330],[331,346],[339,353],[347,365],[359,376],[365,378],[362,393],[359,409],[358,424],[345,471],[343,490],[340,520],[340,551],[340,572],[338,601]];
        let leftarm: number[][] = [[189,601],[187,564],[170,584],[167,593],[147,601],[108,601],[97,567],[116,513],[112,506],[119,474],[126,473],[128,466],[150,457],[137,418],[141,406],[155,390],[145,383],[133,380],[141,375],[134,371],[115,367],[98,351],[75,315],[71,280],[83,255],[110,247],[135,255],[154,272],[170,296],[176,322],[176,339],[168,355],[173,364],[180,364],[172,374],[166,374],[172,382],[176,378],[180,387],[196,416],[190,425],[204,453],[204,461],[196,469],[181,445],[185,464],[193,474],[197,487],[192,514],[185,522],[179,555],[172,572]];
        drawPath(outerpath, context1);
        drawPath(lupe, context1);
        drawPath(innerpath, context1);
        drawPath(leftarm, context1);
        //////////
        context1.font = "30px Comic Sans MS";
        var gradient = context1.createLinearGradient(190, 550, 490, 550);
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.20202020202020202, "rgb(249, 255, 0)");
        gradient.addColorStop(0.3686868686868687, "rgb(0, 255, 2)");
        gradient.addColorStop(0.5303030303030303, "rgb(0, 245, 255)");
        gradient.addColorStop(0.6717171717171717, "rgb(0, 13, 255)");
        gradient.addColorStop(0.8383838383838383, "rgb(251, 0, 255)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");
        context1.fillStyle = gradient;
        context1.fillText('Scuffed Amelia lol', 190, 550);

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // b)-g)
    let canvas2: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas2");
    let context2: CanvasRenderingContext2D = canvas2.getContext("2d");
    let scale: number = 2;
    class Zeichenobjekt {
        position: number[] = [];
        dimensions: number[] = [];
        velocity: number[] = [];
        fillColor: string;

        constructor(_x: number, _y: number, _w: number, _h: number, _fc?: string){
            this.position[0] = _x;
            this.position[1] = _y;
            this.dimensions[0] = _w;
            this.dimensions[1] = _h;
            this.velocity[0] = Math.random()*scale-scale/2;
            this.velocity[1] = Math.random()*scale-scale/2;
            if (_fc != undefined){
                this.fillColor = _fc;
            } else {
                this.fillColor = randomCol();
            }
        }

        move(): void {
            this.checkforWall();
            this.position[0] += this.velocity[0];
            this.position[1] += this.velocity[1];
        }

        checkforWall(): void {
            let canvasdimensions: number[] = [canvas2.width, canvas2.height];
            for(let i: number = 0; i < 2; i++){
                if(this.position[i]+this.velocity[i]+this.dimensions[i] > canvasdimensions[i] || this.position[i]+this.velocity[i] < 0){
                    this.velocity[i] *= -1;
                }
            }
            
        }
    }
    
    
    class Rectangle extends Zeichenobjekt {

        constructor(_x: number, _y: number, _w: number, _h: number, _fc?: string) {
            if (_fc != undefined){
                super(_x, _y, _w, _h, _fc);
            } else {
                super(_x, _y, _w, _h);
            }
        };

        drawRect(): void {
            context2.beginPath();
            context2.rect(this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
            context2.fillStyle = this.fillColor;
            context2.fill();
            context2.closePath();
        }
    }

    class Kreis extends Zeichenobjekt {
        constructor(_x: number, _y: number, d: number, _fc?: string){
            if (_fc != undefined){
                super(_x, _y, d, d, _fc);
            } else {
                super(_x, _y, d, d);
            }
        }

        drawCircle(): void {
            context2.beginPath();
            context2.arc(this.position[0] + this.dimensions[0]/2, this.position[1]+this.dimensions[1]/2, this.dimensions[0]/2, 0, 2*Math.PI, false);
            context2.fillStyle = this.fillColor;
            context2.fill();
            context2.closePath();
        }
    }
    

    let rectArray: Rectangle[] = [];
    let anzahlObjekte: number = 20;
    let h: number = canvas2.height / anzahlObjekte;
    let fps: number = 60;
    let circArray: Kreis[] = [];
    for(let i = 0; i < anzahlObjekte/2; i++) {
        let rect: Rectangle = new Rectangle(0, i*h*2, Math.floor(Math.random()*canvas2.width), h);
        rectArray.push(rect);
    }
    for(let i = 0; i < anzahlObjekte/2; i++) {
        let r: number = Math.random()*100;
        let circ: Kreis = new Kreis(r*2, i*r*2, r);
        circArray.push(circ);
    }
    
    setInterval(function(): void{
        context2.clearRect(0,0,canvas2.width, canvas2.height);
        for(let rect of rectArray){
            rect.move();
            rect.drawRect();
        }
        for(let circ of circArray){
            circ.move();
            circ.drawCircle();
        }
    }, 1/fps);
    });

    function drawPath(arr: number[][], _context: CanvasRenderingContext2D): void {
        _context.beginPath();
        _context.moveTo(arr[0][0], arr[0][1]);
        for (let i: number = 1; i < arr.length; i++){
            _context.lineTo(arr[i][0], arr[i][1]);
        }
        _context.closePath();
        _context.stroke();
    }

    function randomCol(): string {
        let out: string = "rgb(";
        out += Math.floor(Math.random()*256) + ",";
        out += Math.floor(Math.random()*256) + ",";
        out += Math.floor(Math.random()*256) + ")";
        return out;
    }

}