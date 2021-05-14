"use strict";
var b4;
(function (b4) {
    window.addEventListener("load", addElements);
    function addElements() {
        let bild = JSON.parse(sessionStorage.getItem("resultJSON"));
        let body = document.body;
        let h1 = document.createElement("h1");
        h1.innerHTML = "BUILD YOUR ROCKET! - RESULT";
        body.appendChild(h1);
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
})(b4 || (b4 = {}));
//# sourceMappingURL=scriptResult.js.map