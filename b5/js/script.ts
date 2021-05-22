namespace b5 {
    // VARIABLEN
    let idStrings: string[] = ["topOptions", "midOptions", "botOptions"];
    let namestrings: string[] = ["top", "mid", "bot"];
    let valuestrings: string[] = ["red", "green", "blue"];
    let position: number = 0;
    let partlist: Part[] = [];
    let optionJSON: string;
    let optionsArray: OptionsArray;
    let optionData: string[][];
    let error: boolean = false;

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

    export interface OptionsArray {
        top: Options;
        mid: Options;
        bot: Options;
    }

    export interface Options {
        red: string;
        green: string;
        blue: string;
    }

    export interface Bild {
        top: Part;
        mid: Part;
        bot: Part;
    }

    getData().then(function(): void {
        optionsArray = JSON.parse(optionJSON);
        optionData = [
            [optionsArray.top.red, optionsArray.top.green, optionsArray.top.blue],
            [optionsArray.mid.red, optionsArray.mid.green, optionsArray.mid.blue],
            [optionsArray.bot.red, optionsArray.bot.green, optionsArray.bot.blue]
        ];
    },             function(): void {
        error = true;
    }).then(addElements);

    function addElements(): void {
        let body: HTMLBodyElement = <HTMLBodyElement>document.body;
        if (error) {
            let h1: HTMLHeadingElement = document.createElement("h1");
            h1.innerHTML = "Da ist etwas schiefgelaufen!";
            body.appendChild(h1);
        } else {
            let partDiv: HTMLDivElement = document.createElement("div");
            partDiv.id = "part_" + position;
            let h1: HTMLHeadingElement = document.createElement("h1");
            h1.innerHTML = "BUILD YOUR ROCKET! - " + namestrings[position].toUpperCase() + " PART";
            partDiv.appendChild(h1);

            let h2: HTMLHeadingElement = document.createElement("h2");
            h2.innerHTML = "PREVIEW:";
            partDiv.appendChild(h2);

            let previewDiv: HTMLDivElement = document.createElement("div");
            previewDiv.classList.add("preview");
            previewDiv.style.height = (position + 1) * 150 + "px";
            
            
            let topPart: Part = new Part(namestrings[position]);
            let randomTop: number = Math.floor(Math.random() * optionData[position].length);
            topPart.choose(optionData[position][randomTop]);
            partlist.push(topPart);
            let previewList: HTMLImageElement[] = [];
            for (let k: number = 0; k < position + 1; k++) {
                let topImg: HTMLImageElement = document.createElement("img");
                topImg.src = partlist[k].source;
                topImg.id = "partImg_" + namestrings[k];
                topImg.classList.add("previewimg");
                topImg.style.top = k * 150 + "px";
                previewList.push(topImg);
                previewDiv.appendChild(topImg);
            }

            partDiv.appendChild(previewDiv);

            partDiv.appendChild(document.createElement("br"));

            h2.innerHTML = "CHOOSE YOUR " + namestrings[position] + " PART:";
            partDiv.appendChild(h2);

            let optionDiv: HTMLDivElement = document.createElement("div");
            optionDiv.id = "options_" + namestrings[position];

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
                    topPart.choose(optionData[position][+this.value]);
                    previewList[position].src = partlist[position].source;
                    previewDiv.replaceChild(previewList[position], previewDiv.childNodes[position]);
                    console.log(topPart);
                });
                optLabel.appendChild(optInp);

                let optImg: HTMLImageElement = document.createElement("img");
                optImg.src = optionData[position][k];
                optImg.classList.add("radioimg");
                optLabel.appendChild(optImg);

                optDiv.appendChild(optLabel);
            }
            partDiv.appendChild(optDiv);
            

            partDiv.appendChild(document.createElement("br"));

            let finishB: HTMLButtonElement = document.createElement("button");
            finishB.id = "finishB";
            finishB.innerHTML = "FINISH!";
            finishB.addEventListener("click", function(): void {
                if (position < 2) {
                    position++;
                    body.innerHTML = "";
                    
                    addElements();
                } else {
                    let bild: Bild = {
                        top: partlist[0], mid: partlist[1], bot: partlist[2]
                    };
                    sessionStorage.setItem("resultJSON", JSON.stringify(bild));
                    window.location.href = "./result.html";
                }
            });
            partDiv.appendChild(finishB);
            body.appendChild(partDiv);
        }
        
    }

    async function getData(): Promise<void> {
        let response: Response = await fetch("./js/data.json");
        optionJSON = await response.text();
    }
}