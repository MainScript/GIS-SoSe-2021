"use strict";
var b3Aufgabe23;
(function (b3Aufgabe23) {
    // VARIABLEN
    let idStrings = b3Aufgabe23.optionData[3];
    let namestrings = b3Aufgabe23.optionData[4];
    let valuestrings = b3Aufgabe23.optionData[5];
    let position = 0;
    let partlist = [];
    class Part {
        constructor(_position) {
            this.position = _position;
        }
        choose(_chosen) {
            this.source = _chosen;
        }
    }
    /*interface Bild {
        top: Part;
        mid: Part;
        bottom: Part;
    }*/
    window.addEventListener("load", addElements);
    function addElements() {
        let body = document.body;
        let h1 = document.createElement("h1");
        h1.innerHTML = "BUILD YOUR ROCKET! - TOP PART";
        body.appendChild(h1);
        let h2 = document.createElement("h2");
        h2.innerHTML = "PREVIEW:";
        body.appendChild(h2);
        let previewDiv = document.createElement("div");
        previewDiv.id = "preview";
        let topPart = new Part("top");
        let randomTop = Math.floor(Math.random() * b3Aufgabe23.optionData[0].length);
        topPart.choose(b3Aufgabe23.optionData[0][randomTop]);
        let topImg = document.createElement("img");
        topImg.src = topPart.source;
        topImg.id = "part";
        topImg.classList.add("previewimg");
        previewDiv.appendChild(topImg);
        partlist.push(topPart);
        body.appendChild(previewDiv);
        body.appendChild(document.createElement("br"));
        h2.innerHTML = "CHOOSE YOUR TOP PART:";
        body.appendChild(h2);
        let optionDiv = document.createElement("div");
        optionDiv.id = "options";
        let optDiv = document.createElement("div");
        optDiv.id = idStrings[position];
        for (let k = 0; k < b3Aufgabe23.optionData[0].length; k++) {
            let optLabel = document.createElement("label");
            optLabel.classList.add("radio-inline");
            let optInp = document.createElement("input");
            optInp.type = "radio";
            optInp.name = namestrings[position];
            optInp.value = "" + k;
            optInp.id = namestrings[position] + "_" + valuestrings[k];
            if (randomTop == k) {
                optInp.checked = true;
            }
            optInp.addEventListener("change", function () {
                topPart.choose(b3Aufgabe23.optionData[0][+this.value]);
                topImg.src = partlist[position].source;
                previewDiv.replaceChild(topImg, previewDiv.childNodes[0]);
                console.log(topPart);
            });
            optLabel.appendChild(optInp);
            let optImg = document.createElement("img");
            optImg.src = b3Aufgabe23.optionData[position][k];
            optImg.classList.add("radioimg");
            optLabel.appendChild(optImg);
            optDiv.appendChild(optLabel);
        }
        body.appendChild(optDiv);
        body.appendChild(document.createElement("br"));
        let finishB = document.createElement("button");
        finishB.id = "finishB";
        finishB.innerHTML = "FINISH!";
        finishB.addEventListener("click", outputChoice);
        body.appendChild(finishB);
    }
    function outputChoice() {
        /*let result: Bild = {top: partlist[0], mid: partlist[1], bottom: partlist[2]};
        console.log(result);*/
        console.log("Choice: " + partlist[0]);
    }
})(b3Aufgabe23 || (b3Aufgabe23 = {}));
//# sourceMappingURL=script.js.map