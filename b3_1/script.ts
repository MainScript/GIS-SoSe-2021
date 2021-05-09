namespace Aufgabe3_1 {
    let rectangles: rectangle[] = [];
    let maxsize: number = 50;
    let divdim: number[] = [800,600];
    let rectCont: HTMLDivElement;
    let fps: number = 10;

    window.addEventListener("load", function(): void{
        let body: HTMLElement = document.body;
        let h1: HTMLHeadingElement = document.createElement("h1");
        h1.innerHTML = "Rechtecke";
        body.appendChild(h1);

        let newButton: HTMLButtonElement = document.createElement("button");
        newButton.addEventListener("click", newRectangle);
        newButton.innerHTML = "Add Rectangle";
        body.appendChild(newButton);

        let resetButton: HTMLButtonElement = document.createElement("button");
        resetButton.addEventListener("click", resetB);
        resetButton.innerHTML = "Reset";
        body.appendChild(resetButton);

        rectCont = document.createElement("div");
        rectCont.style.width = divdim[0]+"px";
        rectCont.style.height = divdim[1]+"px";
        rectCont.style.position = "relative";
        body.appendChild(rectCont);

        setInterval(function(): void{
            reset();
            for(let rect of rectangles){
                rect.update();
                rect.draw();
            }
        }, 1/fps);
    });

    class rectangle {
        position: number[] = [];
        dimensions: number[] = [];
        velocity: number[] = [];
        container: HTMLDivElement;
        constructor(_x: number, _y: number, _w: number, _h: number){
            this.position[0] = _x;
            this.position[1] = _y;
            this.dimensions[0] = _w;
            this.dimensions[1] = _h;
            this.velocity[0] = Math.random();
            this.velocity[1] = Math.random();
            this.container = document.createElement("div");
            this.container.style.width = this.dimensions[0]+"px";
            this.container.style.height = this.dimensions[1]+"px";
            this.container.style.top = this.position[1]+"px";
            this.container.style.left = this.position[0]+"px";
            this.container.style.position = "absolute";
            this.container.style.backgroundColor = randomCol();
        }

        draw(){
            rectCont.appendChild(this.container);
        }

        update(){
            if(this.position[0]+this.velocity[0] < 0 || this.position[0]+this.velocity[0]+this.dimensions[0] > divdim[0]){
                this.velocity[0] *= -1;
            }
            if(this.position[1]+this.velocity[1] < 0 || this.position[1]+this.velocity[1]+this.dimensions[1] > divdim[1]){
                this.velocity[1] *= -1;
            }
            this.position[0] += this.velocity[0]*2;
            this.position[1] += this.velocity[1]*2;
            this.container.style.top = this.position[1]+"px";
            this.container.style.left = this.position[0]+"px";
        }
    }

    function newRectangle(){
        let w: number = Math.ceil(Math.random()*maxsize);
        let h: number = Math.ceil(Math.random()*maxsize);
        let x: number = Math.floor(Math.random()*(divdim[0]-w));
        let y: number = Math.floor(Math.random()*(divdim[1]-h));
        let rect: rectangle = new rectangle(x,y,w,h);
        rectangles.push(rect);
        rect.draw();
    }

    function resetB() {
        rectangles = [];
        rectCont.innerHTML = "";
    }

    function reset(){
        rectCont.innerHTML = "";
    }

    function randomCol(): string {
        let out: string = "rgb(";
        out += Math.floor(Math.random()*256) + ",";
        out += Math.floor(Math.random()*256) + ",";
        out += Math.floor(Math.random()*256) + ")";
        return out;
    }

}