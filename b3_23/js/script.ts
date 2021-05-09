//import { b3data } from "./data";
// Ich bekomme immer Uncaught ReferenceError: exports is not defined

namespace b3Aufgabe23 {
    // Dieser Teil wäre eigentlich in data.ts
    let optionData: string[][] = [
        ["img/top_red.png", "img/top_green.png", "img/top_blue.png"],
        ["img/mid_red.png", "img/mid_green.png", "img/mid_blue.png"],
        ["img/bot_red.png", "img/bot_green.png", "img/bot_blue.png"]
    ];

    let idStrings: string[] = ["topOptions", "midOptions", "botOptions"];
    let namestrings: string[] = ["top", "mid", "bot"];
    let valuestrings: string[] = ["red", "green", "blue"];
    ///////////////////////////////////////////////////


    let partlist: Part[] = [];

    class Part {
        possibleoptions: string[];
        chosenoption: string;
        image: HTMLImageElement;
        position: string;
        parent: HTMLDivElement;

        constructor(_options: string[], _position: string, _parent: HTMLDivElement) {
            this.possibleoptions = _options;
            this.image = document.createElement("img");
            this.image.src = "";
            this.position = _position;
            this.parent = _parent;
            this.parent.appendChild(this.image);
            this.image.id = this.position;
            this.image.classList.add("previewimg");
        }

        choose(_ch: number, _position: number): void {
            this.chosenoption = this.possibleoptions[_ch];
            this.image.src = this.chosenoption;
            this.parent.replaceChild(this.image, this.parent.childNodes[_position]);
        }
    }

    interface Bild {
        top: Part;
        mid: Part;
        bottom: Part;
    }

    window.addEventListener("load", addElements);

    function addElements(): void {
        let body: HTMLBodyElement = <HTMLBodyElement>document.body;
        let h1: HTMLHeadingElement = document.createElement("h1");
        h1.innerHTML = "BUILD YOUR ROCKET!";
        body.appendChild(h1);

        let previewDiv: HTMLDivElement = document.createElement("div");
        previewDiv.id = "preview";

        let topPart: Part = new Part(optionData[0], "top", previewDiv);
        let randomTop: number = Math.floor(Math.random() * optionData[0].length);
        topPart.choose(randomTop, 0);
        partlist.push(topPart);

        let midPart: Part = new Part(optionData[1], "mid", previewDiv);
        let randomMid: number = Math.floor(Math.random() * optionData[1].length);
        midPart.choose(randomMid, 1);
        partlist.push(midPart);

        let botPart: Part = new Part(optionData[2], "bot", previewDiv);
        let randomBot: number = Math.floor(Math.random() * optionData[2].length);
        botPart.choose(randomBot, 2);
        partlist.push(botPart);

        body.appendChild(previewDiv);

        body.appendChild(document.createElement("br"));

        let optionDiv: HTMLDivElement = document.createElement("div");
        optionDiv.id = "options";
        let randomNumbers: number[] = [randomTop, randomMid, randomBot];

        for (let i: number = 0; i < optionData.length; i++) {
            let optDiv: HTMLDivElement = document.createElement("div");
            optDiv.id = idStrings[i];
            for (let k: number = 0; k < optionData[i].length; k++) {
                let optLabel: HTMLLabelElement = document.createElement("label");
                optLabel.classList.add("radio-inline");

                let optInp: HTMLInputElement = document.createElement("input");
                optInp.type = "radio";
                optInp.name = namestrings[i];
                optInp.value = valuestrings[k];
                optInp.id = namestrings[i] + "_" + valuestrings[k];
                if (randomNumbers[i] == k) {
                    optInp.checked = true;
                }
                optInp.addEventListener("change", function(): void {
                    partlist[i].choose(k, i);
                });
                optLabel.appendChild(optInp);

                let optImg: HTMLImageElement = document.createElement("img");
                optImg.src = optionData[i][k];
                optImg.classList.add("radioimg");
                optLabel.appendChild(optImg);

                optDiv.appendChild(optLabel);
            }
            body.appendChild(optDiv);
        }

        body.appendChild(document.createElement("br"));

        let finishB: HTMLButtonElement = document.createElement("button");
        finishB.id = "finishB";
        finishB.innerHTML = "FINISH!";
        finishB.addEventListener("click", outputChoice);
        body.appendChild(finishB);
    }

    function outputChoice(): void {
        let result: Bild = {top: partlist[0], mid: partlist[1], bottom: partlist[2]};
        console.log(result);
    }
}