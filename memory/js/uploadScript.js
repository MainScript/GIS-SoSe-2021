"use strict";
var memoryUpload;
(function (memoryUpload) {
    let uploadB = document.getElementById("scoreUploadButton");
    let scoreVal = calculateScore();
    let scoreSpan = document.getElementById("scoreSpan");
    scoreSpan.innerText = scoreVal;
    uploadB.addEventListener("click", handleUpload);
    let uploadFormDiv = document.getElementById("uploadFormDiv");
    let uploadButtonsDiv = document.getElementById("uploadButtonsDiv");
    let playAgainB = document.getElementById("playAgainB");
    let mainMenuB = document.getElementById("mainMenuB");
    playAgainB.addEventListener("click", handlePlayAgain);
    mainMenuB.addEventListener("click", handleMainMenu);
    async function handleUpload() {
        let scoreInp = document.getElementById("scoreInp");
        scoreInp.value = scoreVal;
        let formD = new FormData(document.getElementById("uploadForm"));
        let q = new URLSearchParams(formD);
        let url = "https://mainscript-gis.herokuapp.com/writeScore";
        url += "?" + q.toString();
        let outRes = await fetch(url);
        await outRes.text();
        sessionStorage.clear();
        uploadFormDiv.style.display = "none";
        uploadButtonsDiv.style.display = "block";
    }
    function calculateScore() {
        let out;
        let time = +sessionStorage.getItem("time");
        console.log(time);
        let pairs = +sessionStorage.getItem("pairs");
        console.log(pairs);
        out = Math.round((pairs * pairs) / (time / 1000) * 100);
        return "" + out;
    }
    function handlePlayAgain() {
        window.location.href = "game.html";
    }
    function handleMainMenu() {
        window.location.href = "index.html";
    }
})(memoryUpload || (memoryUpload = {}));
//# sourceMappingURL=uploadScript.js.map