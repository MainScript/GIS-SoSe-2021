namespace b3Aufgabe23 {
    // VARIABLEN
    let idStrings: string[] = optionData[3];
    let namestrings: string[] = optionData[4];
    let valuestrings: string[] = optionData[5];
    let position: number = 0;
    let partlist: Part[] = [];

    class Part {
        source: string;
        position: string;

        constructor( _position: string) {
            this.position = _position;
        }

        choose(_chosen: string): void {
            this.source = _chosen;
        }
    }

    /*interface Bild {
        top: Part;
        mid: Part;
        bottom: Part;
    }*/

    window.addEventListener("load", addElements);

    function addElements(): void {
        let body: HTMLBodyElement = <HTMLBodyElement>document.body;
        let h1: HTMLHeadingElement = document.createElement("h1");
        h1.innerHTML = "BUILD YOUR ROCKET! - TOP PART";
        body.appendChild(h1);

        let h2: HTMLHeadingElement = document.createElement("h2");
        h2.innerHTML = "PREVIEW:";
        body.appendChild(h2);

        let previewDiv: HTMLDivElement = document.createElement("div");
        previewDiv.id = "preview";

        let topPart: Part = new Part("top");
        let randomTop: number = Math.floor(Math.random() * optionData[0].length);
        topPart.choose(optionData[0][randomTop]);
        let topImg: HTMLImageElement = document.createElement("img");
        topImg.src = topPart.source;
        topImg.id = "part";
        topImg.classList.add("previewimg");
        previewDiv.appendChild(topImg);
        partlist.push(topPart);

        body.appendChild(previewDiv);

        body.appendChild(document.createElement("br"));

        h2.innerHTML = "CHOOSE YOUR TOP PART:";
        body.appendChild(h2);

        let optionDiv: HTMLDivElement = document.createElement("div");
        optionDiv.id = "options";

        let optDiv: HTMLDivElement = document.createElement("div");

        optDiv.id = idStrings[position];
        for (let k: number = 0; k < optionData[0].length; k++) {
            let optLabel: HTMLLabelElement = document.createElement("label");
            optLabel.classList.add("radio-inline");

            let optInp: HTMLInputElement = document.createElement("input");
            optInp.type = "radio";
            optInp.name = namestrings[position];
            optInp.value = "" + k;
            optInp.id = namestrings[position] + "_" + valuestrings[k];
            if (randomTop == k) {
                optInp.checked = true;
            }
            optInp.addEventListener("change", function(): void {
                topPart.choose(optionData[0][+this.value]);
                topImg.src = partlist[position].source;
                previewDiv.replaceChild(topImg, previewDiv.childNodes[0]);
                console.log(topPart);
            });
            optLabel.appendChild(optInp);

            let optImg: HTMLImageElement = document.createElement("img");
            optImg.src = optionData[position][k];
            optImg.classList.add("radioimg");
            optLabel.appendChild(optImg);

            optDiv.appendChild(optLabel);
        }
        body.appendChild(optDiv);
        

        body.appendChild(document.createElement("br"));

        let finishB: HTMLButtonElement = document.createElement("button");
        finishB.id = "finishB";
        finishB.innerHTML = "FINISH!";
        finishB.addEventListener("click", outputChoice);
        body.appendChild(finishB);
    }

    function outputChoice(): void {
        /*let result: Bild = {top: partlist[0], mid: partlist[1], bottom: partlist[2]};
        console.log(result);*/

        console.log("Choice: " + partlist[0]);
    }
}