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
        let sortedArr = findHighscores(scoreArr, 10);
        for (let i = 0; i < sortedArr.length; i++) {
            let scoreDiv = document.createElement("div");
            let nameP = document.createElement("p");
            let scoreP = document.createElement("p");
            nameP.innerText = "Name: " + sortedArr[i].name.toUpperCase();
            scoreP.innerText = "Score: " + sortedArr[i].score;
            if (i % 2 == 0) {
                scoreDiv.classList.add("scoreDivHell");
            }
            else {
                scoreDiv.classList.add("scoreDivDunkel");
            }
            scoreDiv.appendChild(nameP);
            scoreDiv.appendChild(scoreP);
            highscoresDiv.appendChild(scoreDiv);
        }
    }
    function findHighscores(arr, n) {
        // der folgende Code basiert auf: https://www.geeksforgeeks.org/python-program-to-find-n-largest-elements-from-a-list/
        let out = [];
        let maxLen = n;
        if (arr.length < n) {
            maxLen = arr.length;
        }
        for (let i = 0; i < maxLen; i++) {
            let max = 0;
            let maxInd = 0;
            for (let k = 0; k < arr.length; k++) {
                if (arr[k].score > max) {
                    max = arr[k].score;
                    maxInd = k;
                }
            }
            out.push(arr[maxInd]);
            arr.splice(maxInd, 1);
        }
        return out;
    }
})(memoryHighscore || (memoryHighscore = {}));
//# sourceMappingURL=highscoreScript.js.map