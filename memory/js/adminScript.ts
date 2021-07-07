namespace adminMemory {
    let addButton: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById("addToDB");
    addButton.addEventListener("click", handleAdd);

    async function handleAdd(): Promise<void> {
        let formD: FormData = new FormData(<HTMLFormElement>document.getElementById("adminForm"));
        let q: URLSearchParams = new URLSearchParams(<any>formD);
        let url: string = "https://mainscript-gis.herokuapp.com/write";
        url += "?" + q.toString();
        console.log(url);
        let outRes: Response = await fetch(url);
        let out: string = await outRes.text();
        console.log(out);
    }
}