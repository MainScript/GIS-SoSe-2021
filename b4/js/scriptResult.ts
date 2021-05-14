namespace b4 {
    window.addEventListener("load", addElements);

    function addElements(): void {
        let bild: Bild = JSON.parse(sessionStorage.getItem("resultJSON"));
        let body: HTMLBodyElement = <HTMLBodyElement>document.body;
        let h1: HTMLHeadingElement = document.createElement("h1");
        h1.innerHTML = "BUILD YOUR ROCKET! - RESULT";
        body.appendChild(h1);
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
}