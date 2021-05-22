"use strict";
var b5;
(function (b5) {
    let serverAntwort;
    sendData("https://gis-communication.herokuapp.com/").then(function () {
        addElements();
    });
    function addElements() {
        let bild = JSON.parse(sessionStorage.getItem("resultJSON"));
        let body = document.body;
        let h1 = document.createElement("h1");
        h1.innerHTML = "BUILD YOUR ROCKET! - RESULT";
        body.appendChild(h1);
        let answerP = document.createElement("p");
        answerP.classList.add("antwort");
        if (serverAntwort.message) {
            answerP.innerText = "Der Server sagt: " + serverAntwort.message;
        }
        else if (serverAntwort.error) {
            answerP.innerText = "Fehler: " + serverAntwort.error;
        }
        body.appendChild(answerP);
        let resultDiv = document.createElement("div");
        resultDiv.classList.add("result");
        let topImg = document.createElement("img");
        topImg.src = bild.top.source;
        topImg.classList.add("resultimg");
        topImg.style.top = "0px";
        resultDiv.appendChild(topImg);
        let midImg = document.createElement("img");
        midImg.src = bild.mid.source;
        midImg.classList.add("resultimg");
        midImg.style.top = "300px";
        resultDiv.appendChild(midImg);
        let botImg = document.createElement("img");
        botImg.src = bild.bot.source;
        botImg.classList.add("resultimg");
        botImg.style.top = "600px";
        resultDiv.appendChild(botImg);
        body.appendChild(resultDiv);
    }
    async function sendData(_url) {
        let outpJSON = JSON.parse(sessionStorage.getItem("resultJSON"));
        let outputString = "top=" + outpJSON.top.source + "&mid=" + outpJSON.mid.source + "&bot=" + outpJSON.bot.source;
        _url = _url + "?" + outputString;
        let response = await fetch(_url);
        serverAntwort = await response.json();
    }
})(b5 || (b5 = {}));
//# sourceMappingURL=scriptResult.js.map