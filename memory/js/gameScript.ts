namespace memory {
    let timerDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("gameTimerDiv");
    let spielfeldDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("gameSpielfeldDiv");
    let timerP: HTMLParagraphElement = document.createElement("p");
    let startTime: number = Date.now();

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        timerDiv.appendChild(timerP);
        timerP.innerHTML = "" + 100;
        setInterval(updateTimer, 100);
        fillSpielfeld();
    }

    function updateTimer(): void {
        timerP.innerHTML = "Das Spiel läuft seit " + ((Date.now() - startTime) / 1000).toFixed(1) + "s";
    }

    function fillSpielfeld(): void {
        let loremP: HTMLParagraphElement = document.createElement("p");
        loremP.innerHTML = "Test";
        spielfeldDiv.appendChild(loremP);
    }
}