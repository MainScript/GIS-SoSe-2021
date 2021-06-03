namespace P3_2_HTML {
    let formData: FormData;
    let url: string = "http://localhost:8100/html";

    let submitB: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    submitB.addEventListener("click", handleSubmit);

    async function handleSubmit(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "?" + query.toString();
        let response: Response = await fetch(url, { method: "get" });
        let responseString: string = await response.text();
        console.log("Antwort des Servers: " + responseString);

        addAnswer(responseString);
    }

    function addAnswer(_ans: string): void {
        let fragment: DocumentFragment = document.createRange().createContextualFragment(_ans);
        document.body.appendChild(fragment);
    }
}