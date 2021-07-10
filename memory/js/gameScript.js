"use strict";
var memory;
(function (memory) {
    let timerDiv = document.getElementById("gameTimerDiv");
    let spielfeldDiv = document.getElementById("gameSpielfeldDiv");
    let timerP = document.createElement("p");
    let startTime = Date.now();
    let linkArr = [];
    let clickedCards = [];
    let foundPairs = 0;
    let timerInterval;
    let waiting = false;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        timerDiv.appendChild(timerP);
        timerP.innerHTML = "Das Spiel lädt...";
        fillSpielfeld();
    }
    function updateTimer() {
        timerP.innerHTML = "Das Spiel läuft seit " + ((Date.now() - startTime) / 1000).toFixed(1) + "s";
    }
    async function fillSpielfeld() {
        await handleGet();
        let feldW = 6;
        let cardW = 105;
        let divWidth = spielfeldDiv.getBoundingClientRect().width;
        let xOffset = 0;
        if (divWidth < 585) {
            cardW = 80;
        }
        if (divWidth < cardW * 6) {
            feldW = Math.floor(divWidth / cardW);
            xOffset = (divWidth - (feldW * cardW)) / 2;
        }
        // Der nachfolgende for-Loop ist der Fisher-Yates-Shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
        for (let i = linkArr.length - 1; i > 0; i--) {
            let j = Math.round(Math.random() * i);
            let zw = linkArr[j];
            linkArr[j] = linkArr[i];
            linkArr[i] = zw;
        }
        for (let i = 0; i < linkArr.length; i++) {
            let y = Math.floor(i / feldW) * cardW + 125;
            let x = (i % feldW) * cardW + 5 + xOffset;
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
            cardDiv.style.left = x + "px";
            cardDiv.style.top = y + "px";
            cardDiv.id = "" + i;
            cardDiv.addEventListener("click", handleCardClick);
            let cardImg = document.createElement("img");
            cardImg.src = linkArr[i];
            cardImg.classList.add("kartenBild");
            cardDiv.appendChild(cardImg);
            let cardBack = document.createElement("div");
            cardBack.classList.add("cardBack");
            cardDiv.appendChild(cardBack);
            spielfeldDiv.appendChild(cardDiv);
        }
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
    }
    async function handleGet() {
        let url = "https://mainscript-gis.herokuapp.com/getImg";
        let outRes = await fetch(url);
        let out = await outRes.text();
        let imgArr = JSON.parse(out);
        linkArr = [];
        for (let k = 0; k < imgArr.length; k++) {
            for (let i = 0; i < 2; i++) {
                linkArr.push(imgArr[k].link);
            }
        }
    }
    function handleCardClick(_ev) {
        let clickedDiv = _ev.currentTarget;
        let clickedDivImg = clickedDiv.childNodes[0];
        let clickedDivBack = clickedDiv.childNodes[1];
        let card = { id: clickedDiv.id, src: clickedDivImg.src };
        if (!waiting) {
            if (clickedCards.length == 0) {
                clickedCards.push(card);
                clickedDivBack.style.display = "none";
            }
            else if (clickedCards.length == 1) {
                if (clickedCards[0].id != card.id) {
                    clickedCards.push(card);
                    clickedDivBack.style.display = "none";
                }
            }
            if (clickedCards.length == 2) {
                if (clickedCards[0].src == clickedCards[1].src) {
                    let card0 = spielfeldDiv.childNodes[+clickedCards[0].id];
                    let card1 = spielfeldDiv.childNodes[+clickedCards[1].id];
                    card0.style.display = "none";
                    card1.style.display = "none";
                    foundPairs += 1;
                    clickedCards = [];
                }
                else {
                    waiting = true;
                    setTimeout(reshowCards, 1000, [+clickedCards[0].id, +clickedCards[1].id]);
                }
                if (foundPairs >= linkArr.length / 2) {
                    handleEnd();
                }
            }
        }
    }
    function reshowCards(ids) {
        let cardBack0 = spielfeldDiv.childNodes[ids[0]].childNodes[1];
        let cardBack1 = spielfeldDiv.childNodes[ids[1]].childNodes[1];
        cardBack0.style.display = "block";
        cardBack1.style.display = "block";
        clickedCards = [];
        waiting = false;
    }
    function handleEnd() {
        sessionStorage.setItem("time", "" + (Date.now() - startTime));
        sessionStorage.setItem("pairs", "" + (Math.floor(linkArr.length / 2)));
        clearInterval(timerInterval);
        window.location.href = "uploadScore.html";
    }
})(memory || (memory = {}));
//# sourceMappingURL=gameScript.js.map