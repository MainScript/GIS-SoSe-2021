"use strict";
var b5;
(function (b5) {
    // VARIABLEN
    let idStrings = ["topOptions", "midOptions", "botOptions"];
    let namestrings = ["top", "mid", "bot"];
    let valuestrings = ["red", "green", "blue"];
    let position = 0;
    let partlist = [];
    let optionJSON;
    let optionsArray;
    let optionData;
    let error = false;
    class Part {
        constructor(_position) {
            this.position = _position;
        }
        choose(_chosen) {
            this.source = _chosen;
        }
    }
    getData().then(function () {
        optionsArray = JSON.parse(optionJSON);
        optionData = [
            [optionsArray.top.red, optionsArray.top.green, optionsArray.top.blue],
            [optionsArray.mid.red, optionsArray.mid.green, optionsArray.mid.blue],
            [optionsArray.bot.red, optionsArray.bot.green, optionsArray.bot.blue]
        ];
    }, function () {
        error = true;
    }).then(addElements);
    function addElements() {
        let body = document.body;
        if (error) {
            let h1 = document.createElement("h1");
            h1.innerHTML = "Da ist etwas schiefgelaufen!";
            body.appendChild(h1);
        }
        else {
            let partDiv = document.createElement("div");
            partDiv.id = "part_" + position;
            let h1 = document.createElement("h1");
            h1.innerHTML = "BUILD YOUR ROCKET! - " + namestrings[position].toUpperCase() + " PART";
            partDiv.appendChild(h1);
            let h2 = document.createElement("h2");
            h2.innerHTML = "PREVIEW:";
            partDiv.appendChild(h2);
            let previewDiv = document.createElement("div");
            previewDiv.classList.add("preview");
            previewDiv.style.height = (position + 1) * 150 + "px";
            let topPart = new Part(namestrings[position]);
            let randomTop = Math.floor(Math.random() * optionData[position].length);
            topPart.choose(optionData[position][randomTop]);
            partlist.push(topPart);
            let previewList = [];
            for (let k = 0; k < position + 1; k++) {
                let topImg = document.createElement("img");
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
            let optionDiv = document.createElement("div");
            optionDiv.id = "options_" + namestrings[position];
            let optDiv = document.createElement("div");
            optDiv.id = idStrings[position];
            for (let k = 0; k < optionData[0].length; k++) {
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
                    topPart.choose(optionData[position][+this.value]);
                    previewList[position].src = partlist[position].source;
                    previewDiv.replaceChild(previewList[position], previewDiv.childNodes[position]);
                    console.log(topPart);
                });
                optLabel.appendChild(optInp);
                let optImg = document.createElement("img");
                optImg.src = optionData[position][k];
                optImg.classList.add("radioimg");
                optLabel.appendChild(optImg);
                optDiv.appendChild(optLabel);
            }
            partDiv.appendChild(optDiv);
            partDiv.appendChild(document.createElement("br"));
            let finishB = document.createElement("button");
            finishB.id = "finishB";
            finishB.innerHTML = "FINISH!";
            finishB.addEventListener("click", function () {
                if (position < 2) {
                    position++;
                    body.innerHTML = "";
                    addElements();
                }
                else {
                    let bild = {
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
    async function getData() {
        let response = await fetch("https://mainscript.github.io/GIS-SoSe-2021/b5/js/data.json");
        optionJSON = await response.text();
    }
})(b5 || (b5 = {}));
//# sourceMappingURL=script.js.map