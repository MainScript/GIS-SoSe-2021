namespace memoryUpload {
    let uploadB: HTMLButtonElement = <HTMLButtonElement>document.getElementById("scoreUploadButton");
    let scoreVal: string = calculateScore();
    let scoreSpan: HTMLSpanElement = <HTMLSpanElement>document.getElementById("scoreSpan");
    scoreSpan.innerText = scoreVal;
    uploadB.addEventListener("click", handleUpload);

    let uploadFormDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("uploadFormDiv");
    let uploadButtonsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("uploadButtonsDiv");

    let playAgainB: HTMLButtonElement = <HTMLButtonElement>document.getElementById("playAgainB");
    let mainMenuB: HTMLButtonElement = <HTMLButtonElement>document.getElementById("mainMenuB");
    playAgainB.addEventListener("click", handlePlayAgain);
    mainMenuB.addEventListener("click", handleMainMenu);

    async function handleUpload(): Promise<void> {
        let scoreInp: HTMLInputElement = <HTMLInputElement>document.getElementById("scoreInp");
        scoreInp.value = scoreVal;
        
        let formD: FormData = new FormData(<HTMLFormElement>document.getElementById("uploadForm"));
        let q: URLSearchParams = new URLSearchParams(<any>formD);
        let url: string = "https://mainscript-gis.herokuapp.com/writeScore";
        url += "?" + q.toString();
        let outRes: Response = await fetch(url);
        await outRes.text();
        sessionStorage.clear();
        uploadFormDiv.style.display = "none";
        uploadButtonsDiv.style.display = "block";
    }

    function calculateScore(): string {
        let out: number;
        let time: number = +sessionStorage.getItem("time");
        console.log(time);
        let pairs: number = +sessionStorage.getItem("pairs");
        console.log(pairs);
        out = Math.round((pairs * pairs) / (time / 1000) * 100);
        return "" + out;
    }

    function handlePlayAgain(): void {
        window.location.href = "game.html";
    }

    function handleMainMenu(): void {
        window.location.href = "index.html";
    }
}