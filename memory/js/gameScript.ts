namespace memory {
    let timerDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("gameTimerDiv");
    let spielfeldDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("gameSpielfeldDiv");
    let timerP: HTMLParagraphElement = document.createElement("p");
    let startTime: number = Date.now();
    let linkArr: string[] = [];
    let clickedCards: Card[] = [];
    let foundPairs: number = 0;
    let timerInterval: NodeJS.Timeout;
    let waiting: Boolean = false;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        timerDiv.appendChild(timerP);
        timerP.innerHTML = "Das Spiel lädt...";
        
        fillSpielfeld();
    }

    function updateTimer(): void {
        timerP.innerHTML = "Das Spiel läuft seit " + ((Date.now() - startTime) / 1000).toFixed(1) + "s";
    }

    async function fillSpielfeld(): Promise<void> {
        await handleGet();
        let feldW: number = 6;
        let cardW: number = 105;
        let divWidth: number = spielfeldDiv.getBoundingClientRect().width;
        let xOffset: number = 0;
        if (divWidth < 585) {
            cardW = 80;
        }
        if (divWidth < cardW * 6) {
            feldW = Math.floor(divWidth / cardW);
            xOffset = (divWidth - (feldW * cardW)) / 2;
        }
        
        

        // Der nachfolgende for-Loop ist der Fisher-Yates-Shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
        for (let i: number = linkArr.length - 1; i > 0; i--) {
            let j: number = Math.round(Math.random() * i);
            let zw: string = linkArr[j];
            linkArr[j] = linkArr[i];
            linkArr[i] = zw;
        }
        
        for (let i: number = 0; i < linkArr.length; i++) {
            let y: number = Math.floor(i / feldW) * cardW + 125;
            let x: number = (i % feldW) * cardW + 5 + xOffset;
            let cardDiv: HTMLDivElement = document.createElement("div");
            cardDiv.classList.add("card");
            cardDiv.style.left = x + "px";
            cardDiv.style.top = y + "px";
            cardDiv.id = "" + i;
            cardDiv.addEventListener("click", handleCardClick);

            let cardImg: HTMLImageElement = document.createElement("img");
            cardImg.src = linkArr[i];
            cardImg.classList.add("kartenBild");
            cardDiv.appendChild(cardImg);

            let cardBack: HTMLDivElement = document.createElement("div");
            cardBack.classList.add("cardBack");
            cardDiv.appendChild(cardBack);
            spielfeldDiv.appendChild(cardDiv);
        }
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
    }

    async function handleGet(): Promise<void> {
        let url: string = "https://mainscript-gis.herokuapp.com/getImg";
        let outRes: Response = await fetch(url);
        let out: string = await outRes.text();
        let imgArr: ImageLink[] = JSON.parse(out);
        linkArr = [];
        for (let k: number = 0; k < imgArr.length; k++) {
            for (let i: number = 0; i < 2; i++) {
                linkArr.push(imgArr[k].link);
            }
        }
    }

    function handleCardClick(_ev: MouseEvent): void {
        let clickedDiv: HTMLDivElement = <HTMLDivElement>_ev.currentTarget;
        let clickedDivImg: HTMLImageElement = <HTMLImageElement>clickedDiv.childNodes[0];
        let clickedDivBack: HTMLDivElement = <HTMLDivElement>clickedDiv.childNodes[1];
        let card: Card = {id: clickedDiv.id, src: clickedDivImg.src};
        if (!waiting) {
            if (clickedCards.length == 0) {
                clickedCards.push(card);
                clickedDivBack.style.display = "none";
            } else if (clickedCards.length == 1) {
                if (clickedCards[0].id != card.id) {
                    clickedCards.push(card);
                    clickedDivBack.style.display = "none";
                }
            }
            
            if (clickedCards.length == 2) {
                if (clickedCards[0].src == clickedCards[1].src) {
                    let card0: HTMLDivElement = <HTMLDivElement>spielfeldDiv.childNodes[+clickedCards[0].id];
                    let card1: HTMLDivElement = <HTMLDivElement>spielfeldDiv.childNodes[+clickedCards[1].id];
                    card0.style.display = "none";
                    card1.style.display = "none";
                    foundPairs += 1;
                    clickedCards = [];
                } else {
                    waiting = true;
                    setTimeout(reshowCards, 1000, [+clickedCards[0].id, +clickedCards[1].id]);
                }

                if (foundPairs >= linkArr.length / 2) {
                    handleEnd();
                }
            }
        }
    }

    function reshowCards(ids: number[]): void {
        let cardBack0: HTMLDivElement = <HTMLDivElement>spielfeldDiv.childNodes[ids[0]].childNodes[1];
        let cardBack1: HTMLDivElement = <HTMLDivElement>spielfeldDiv.childNodes[ids[1]].childNodes[1];
        cardBack0.style.display = "block";
        cardBack1.style.display = "block";
        clickedCards = [];
        waiting = false;
    }

    function handleEnd(): void {
        sessionStorage.setItem("time", "" + (Date.now() - startTime));
        sessionStorage.setItem("pairs", "" + (Math.floor(linkArr.length / 2)));
        clearInterval(timerInterval);
        window.location.href = "uploadScore.html";
    }

    interface ImageLink {
        _id: string;
        link: string;
    }

    interface Card {
        id: string;
        src: string;
    }
}