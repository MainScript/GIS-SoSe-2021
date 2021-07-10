namespace memoryHighscore {

    let highscoresDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("highscoresDiv");
    window.addEventListener("load", handleGet);
    
    async function handleGet(): Promise<void> {
        let url: string = "https://mainscript-gis.herokuapp.com/getScores";
        let outRes: Response = await fetch(url);
        let out: string = await outRes.text();
        let scoreArr: Score[] = JSON.parse(out);
        let sortedArr: Score[] = findHighscores(scoreArr, 10);
        for (let i: number = 0; i < sortedArr.length; i++) {
            let scoreDiv: HTMLDivElement = document.createElement("div");
            let nameP: HTMLParagraphElement = document.createElement("p");
            let scoreP: HTMLParagraphElement = document.createElement("p");
            nameP.innerText = "Name: " + sortedArr[i].name.toUpperCase();
            scoreP.innerText = "Score: " + sortedArr[i].score;
            if (i % 2 == 0) {
                scoreDiv.classList.add("scoreDivHell");
            } else {
                scoreDiv.classList.add("scoreDivDunkel");
            }
            scoreDiv.appendChild(nameP);
            scoreDiv.appendChild(scoreP);
            highscoresDiv.appendChild(scoreDiv);
        }
    }

    function findHighscores(arr: Score[], n: number): Score[] {
        // der folgende Code basiert auf: https://www.geeksforgeeks.org/python-program-to-find-n-largest-elements-from-a-list/
        let out: Score[] = [];
        let maxLen: number = n;
        if (arr.length < n) {
            maxLen = arr.length;
        }
        for (let i: number = 0; i < maxLen; i++) {
            let max: number = 0;
            let maxInd: number = 0;
            for (let k: number = 0; k < arr.length; k++) {
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

    interface Score {
        name: string;
        score: number;
    }
}