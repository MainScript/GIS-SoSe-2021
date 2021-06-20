namespace c4 {
    let inputForm: FormData;
    let writeB: HTMLButtonElement = <HTMLButtonElement>document.getElementById("dataB");
    let readB: HTMLButtonElement = <HTMLButtonElement>document.getElementById("outputB");

    writeB.addEventListener("click", handleWrite);
    readB.addEventListener("click", handleRead);

    async function handleWrite(): Promise<void> {
        inputForm = new FormData(<HTMLFormElement>document.getElementById("form1"));
        let q: URLSearchParams = new URLSearchParams(<any>inputForm);
        let url: string = "https://mainscript-gis.herokuapp.com/write";
        url += "?" + q.toString();
        console.log(url);
        let outRes: Response = await fetch(url);
        let out: string = await outRes.text();
        console.log(out);
    }

    async function handleRead(): Promise<void> {
        let url: string = "https://mainscript-gis.herokuapp.com/read";
        let outRes: Response = await fetch(url);
        let out: string = await outRes.text();
        console.log(out);
    }
}