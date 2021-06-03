namespace P3_2_JSON {
    let formData: FormData;
    let url: string = "http://localhost:8100/json";

    let submitB: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
    submitB.addEventListener("click", handleSubmit);

    async function handleSubmit(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "?" + query.toString();
        let response: Response = await fetch(url, { method: "get" });
        let responseString: string = await response.text();
        let responseJSON: JSON = JSON.parse(responseString);
        console.log(responseJSON);
    }
}