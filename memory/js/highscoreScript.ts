namespace memoryHighscore {

    let highscoresDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("highscoresDiv");
    window.addEventListener("load", handleGet);
    
    async function handleGet(): Promise<void> {
        let url: string = "https://mainscript-gis.herokuapp.com/getScores";
        let outRes: Response = await fetch(url);
        let out: string = await outRes.text();
        let scoreArr: Score[] = JSON.parse(out);
        for (let score of scoreArr) {
            let scoreDiv: HTMLDivElement = document.createElement("div");
            let nameP: HTMLParagraphElement = document.createElement("p");
            let scoreP: HTMLParagraphElement = document.createElement("p");
            nameP.innerText = "Name: " + score.name;
            scoreP.innerText = "Score: " + score.score;
            scoreDiv.appendChild(nameP);
            scoreDiv.appendChild(scoreP);
            highscoresDiv.appendChild(scoreDiv);
        }
    }

    interface Score {
        name: string;
        score: number;
    }
}