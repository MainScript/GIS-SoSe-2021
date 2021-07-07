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
        await outRes.text();
        handleGet();
    }

    async function handleGet(): Promise<void> {
        imagesDiv.innerHTML = "";
        let url: string = "https://mainscript-gis.herokuapp.com/getImg";
        let outRes: Response = await fetch(url);
        let out: string = await outRes.text();
        let imgArr: ImageLink[] = JSON.parse(out);
        for (let img of imgArr) {
            let imgDiv: HTMLDivElement = document.createElement("div");
            let imgCon: HTMLImageElement = document.createElement("img");
            let delB: HTMLAnchorElement = document.createElement("a");
            imgCon.src = img.link;
            imgCon.classList.add("kartenBild");
            imgCon.id = img._id;
            delB.innerText = "delete";
            delB.classList.add("aButtonSmall");
            delB.addEventListener("click", deleteImg);
            delB.id = imgCon.src;
            imgDiv.appendChild(imgCon);
            imgDiv.appendChild(delB);
            imagesDiv.appendChild(imgDiv);
        }
    }

    async function deleteImg(_event: MouseEvent): Promise<void> {
        let url: string = "https://mainscript-gis.herokuapp.com/remove?imgURL=";
        let tarImg: HTMLAnchorElement =  <HTMLAnchorElement>_event.currentTarget;
        url += tarImg.id;
        let outRes: Response = await fetch(url);
        await outRes.text();
        handleGet();
    }

    interface ImageLink {
        _id: string;
        link: string;
    }
}