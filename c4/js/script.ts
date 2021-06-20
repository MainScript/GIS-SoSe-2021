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
        let outArray: ReadHandler[] = JSON.parse(out);
        console.log(JSON.parse(out));
        document.getElementById("outputDiv").innerHTML = "";
        for (let entry of outArray) {
            let entrydiv: HTMLDivElement = document.createElement("div");
            entrydiv.id = entry._id;
            let vornameP: HTMLParagraphElement = document.createElement("p");
            vornameP.innerText = "Vorname: " + entry.vorname;
            let nachnameP: HTMLParagraphElement = document.createElement("p");
            nachnameP.innerText = "Nachname: " + entry.nachname;
            let farbeP: HTMLParagraphElement = document.createElement("p");
            farbeP.innerText = "Lieblingsfarbe: " + entry.farbe;
            farbeP.style.color = entry.farbe;
            let datumP: HTMLParagraphElement = document.createElement("p");
            datumP.innerText = "Geburtstag: " + entry.datum;
            let trennungsP: HTMLParagraphElement = document.createElement("p");
            trennungsP.innerText = "--------------------";
            entrydiv.appendChild(vornameP);
            entrydiv.appendChild(nachnameP);
            entrydiv.appendChild(farbeP);
            entrydiv.appendChild(datumP);
            entrydiv.appendChild(trennungsP);
            document.getElementById("outputDiv").appendChild(entrydiv);
        }
    }

    interface ReadHandler {
        vorname: string;
        nachname: string;
        farbe: string;
        datum: string;
        _id: string;
    }
}