namespace b5 {
    let serverAntwort: Antwort;
    sendData("https://gis-communication.herokuapp.com/").then(function(): void {
        addElements();
    });

    interface Antwort {
        message: string;
        error: string;
    }

    function addElements(): void {
        let bild: Bild = JSON.parse(sessionStorage.getItem("resultJSON"));
        let body: HTMLBodyElement = <HTMLBodyElement>document.body;
        let h1: HTMLHeadingElement = document.createElement("h1");
        h1.innerHTML = "BUILD YOUR ROCKET! - RESULT";
        body.appendChild(h1);

        let answerP: HTMLParagraphElement = document.createElement("p");
        answerP.classList.add("antwort");
        if (serverAntwort.message) {
            answerP.innerText = "Der Server sagt: " + serverAntwort.message;
            answerP.classList.add("positiv");
        } else if (serverAntwort.error) {
            answerP.innerText = "Fehler: " + serverAntwort.error;
            answerP.classList.add("negativ");
        }
        body.appendChild(answerP);

        let resultDiv: HTMLDivElement = document.createElement("div");
        resultDiv.classList.add("result");

                
        let topImg: HTMLImageElement = document.createElement("img");
        topImg.src = bild.top.source;
        topImg.classList.add("resultimg");
        topImg.style.top = "0px";
        resultDiv.appendChild(topImg);

        let midImg: HTMLImageElement = document.createElement("img");
        midImg.src = bild.mid.source;
        midImg.classList.add("resultimg");
        midImg.style.top = "300px";
        resultDiv.appendChild(midImg);

        let botImg: HTMLImageElement = document.createElement("img");
        botImg.src = bild.bot.source;
        botImg.classList.add("resultimg");
        botImg.style.top = "600px";
        resultDiv.appendChild(botImg);

        body.appendChild(resultDiv);
    }

    async function sendData(_url: RequestInfo): Promise<void> {
        let outpJSON: Bild = JSON.parse(sessionStorage.getItem("resultJSON"));
        let outputString: string = "top=" + outpJSON.top.source + "&mid=" + outpJSON.mid.source + "&bot=" + outpJSON.bot.source;
        _url = _url + "?" + outputString;
        let response: Response = await fetch(_url);
        serverAntwort = await response.json();
    }
}