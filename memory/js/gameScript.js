"use strict";
var memory;
(function (memory) {
    let timerDiv = document.getElementById("gameTimerDiv");
    let spielfeldDiv = document.getElementById("gameSpielfeldDiv");
    let timerP = document.createElement("p");
    let startTime = Date.now();
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        timerDiv.appendChild(timerP);
        timerP.innerHTML = "" + 100;
        setInterval(updateTimer, 100);
        fillSpielfeld();
    }
    function updateTimer() {
        timerP.innerHTML = "Das Spiel läuft seit " + ((Date.now() - startTime) / 1000).toFixed(1) + "s";
    }
    function fillSpielfeld() {
        let loremP = document.createElement("p");
        loremP.innerHTML = "Test";
        spielfeldDiv.appendChild(loremP);
    }
})(memory || (memory = {}));
//# sourceMappingURL=gameScript.js.map