namespace adminMemory {
    let addButton: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById("addToDB");
    let imagesDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("imagesDiv");
    addButton.addEventListener("click", handleAdd);
    window.addEventListener("load", handleGet);

    async function handleAdd(): Promise<void> {
        let formD: FormData = new FormData(<HTMLFormElement>document.getElementById("adminForm"));
        let q: URLSearchParams = new URLSearchParams(<any>formD);
        let url: string = "https://mainscript-gis.herokuapp.com/writeImg";
        url += "?" + q.toString();
        let outRes: Response = await fetch(url);
        let out: string = await outRes.text();
        console.log(out);
        handleGet();
    }

    async function handleGet(): Promise<void> {
        let url: string = "https://mainscript-gis.herokuapp.com/getImg";
        let outRes: Response = await fetch(url);
        let out: string = await outRes.text();
        let imgArr: ImageLink[] = JSON.parse(out);
        for (let img of imgArr) {
            let imgDiv: HTMLDivElement = document.createElement("div");
            let imgCon: HTMLImageElement = document.createElement("img");
            imgCon.src = img.link;
            imgCon.classList.add("kartenBild");
            imgCon.id = img.id;
            imgDiv.appendChild(imgCon);
            imagesDiv.appendChild(imgDiv);
        }
    }

    interface ImageLink {
        id: string;
        link: string;
    }
}