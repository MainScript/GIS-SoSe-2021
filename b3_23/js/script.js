"use strict";
//import { b3data } from "./data";
// Ich bekomme immer Uncaught ReferenceError: exports is not defined
var b3Aufgabe23;
(function (b3Aufgabe23) {
    // Dieser Teil wäre eigentlich in data.ts
    let optionData = [
        ["img/top_red.png", "img/top_green.png", "img/top_blue.png"],
        ["img/mid_red.png", "img/mid_green.png", "img/mid_blue.png"],
        ["img/bot_red.png", "img/bot_green.png", "img/bot_blue.png"]
    ];
    let idStrings = ["topOptions", "midOptions", "botOptions"];
    let namestrings = ["top", "mid", "bot"];
    let valuestrings = ["red", "green", "blue"];
    let partlist = [];
    class Part {
        constructor(_options, _position, _parent) {
            this.possibleoptions = _options;
            this.image = document.createElement("img");
            this.image.src = "";
            this.position = _position;
            this.parent = _parent;
            this.parent.appendChild(this.image);
            this.image.id = this.position;
            this.image.classList.add("previewimg");
        }
        choose(_ch, _position) {
            this.chosenoption = this.possibleoptions[_ch];
            this.image.src = this.chosenoption;
            this.parent.replaceChild(this.image, this.parent.childNodes[_position]);
        }
    }
    window.addEventListener("load", addElements);
    function addElements() {
        let body = document.body;
        let h1 = document.createElement("h1");
        h1.innerHTML = "BUILD YOUR ROCKET!";
        body.appendChild(h1);
        let previewDiv = document.createElement("div");
        previewDiv.id = "preview";
        let topPart = new Part(optionData[0], "top", previewDiv);
        let randomTop = Math.floor(Math.random() * optionData[0].length);
        topPart.choose(randomTop, 0);
        partlist.push(topPart);
        let midPart = new Part(optionData[1], "mid", previewDiv);
        let randomMid = Math.floor(Math.random() * optionData[1].length);
        midPart.choose(randomMid, 1);
        partlist.push(midPart);
        let botPart = new Part(optionData[2], "bot", previewDiv);
        let randomBot = Math.floor(Math.random() * optionData[2].length);
        botPart.choose(randomBot, 2);
        partlist.push(botPart);
        body.appendChild(previewDiv);
        body.appendChild(document.createElement("br"));
        let optionDiv = document.createElement("div");
        optionDiv.id = "options";
        let randomNumbers = [randomTop, randomMid, randomBot];
        for (let i = 0; i < optionData.length; i++) {
            let optDiv = document.createElement("div");
            optDiv.id = idStrings[i];
            for (let k = 0; k < optionData[i].length; k++) {
                let optLabel = document.createElement("label");
                optLabel.classList.add("radio-inline");
                let optInp = document.createElement("input");
                optInp.type = "radio";
                optInp.name = namestrings[i];
                optInp.value = valuestrings[k];
                optInp.id = namestrings[i] + "_" + valuestrings[k];
                if (randomNumbers[i] == k) {
                    optInp.checked = true;
                }
                optInp.addEventListener("change", function () {
                    partlist[i].choose(k, i);
                    console.log(this.id);
                });
                optLabel.appendChild(optInp);
                let optImg = document.createElement("img");
                optImg.src = optionData[i][k];
                optImg.classList.add("radioimg");
                optLabel.appendChild(optImg);
                optDiv.appendChild(optLabel);
            }
            body.appendChild(optDiv);
        }
        body.appendChild(document.createElement("br"));
        let finishB = document.createElement("button");
        finishB.id = "finishB";
        finishB.innerHTML = "FINISH!";
        finishB.addEventListener("click", outputChoice);
        body.appendChild(finishB);
    }
    function outputChoice() {
        let result = { top: partlist[0], mid: partlist[1], bottom: partlist[2] };
        console.log("Top: " + result.top.chosenoption + " Mid: " + result.mid.chosenoption + " Bottom: " + result.bottom.chosenoption);
    }
})(b3Aufgabe23 || (b3Aufgabe23 = {}));
//# sourceMappingURL=script.js.map