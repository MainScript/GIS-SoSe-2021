"use strict";
var memoryHighscore;
(function (memoryHighscore) {
    let highscoresDiv = document.getElementById("highscoresDiv");
    window.addEventListener("load", handleGet);
    async function handleGet() {
        let url = "https://mainscript-gis.herokuapp.com/getScores";
        let outRes = await fetch(url);
        let out = await outRes.text();
        let scoreArr = JSON.parse(out);
        for (let score of scoreArr) {
            let scoreDiv = document.createElement("div");
            let nameP = document.createElement("p");
            let scoreP = document.createElement("p");
            nameP.innerText = "Name: " + score.name;
            scoreP.innerText = "Score: " + score.score;
            scoreDiv.appendChild(nameP);
            scoreDiv.appendChild(scoreP);
            highscoresDiv.appendChild(scoreDiv);
        }
    }
})(memoryHighscore || (memoryHighscore = {}));
//# sourceMappingURL=highscoreScript.js.map