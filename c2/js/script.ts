namespace P3_2 {
    let formData: FormData;
    let url: string = "https://mainscript-gis.herokuapp.com/";
    let type: string = "";
    
    let htmlSubmit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("htmlsubmit");
    let jsonSubmit: HTMLButtonElement = <HTMLButtonElement>document.getElementById("jsonsubmit");
    let responseDIV: HTMLDivElement = <HTMLDivElement>document.getElementById("responseDIV");

    jsonSubmit.addEventListener("click", function(): void {
        type = "json";
        handleSubmit();
    });

    htmlSubmit.addEventListener("click", function(): void {
        type = "html";
        handleSubmit();
    });


    async function handleSubmit(): Promise<void> {
        formData = new FormData(document.forms[0]);
        url += type;
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "?" + query.toString();
        let response: Response = await fetch(url, { method: "get" });
        let responseString: string = await response.text();
        if (type == "json") {
            let responseJSON: JSON = JSON.parse(responseString);
            console.log(responseJSON);
        } else if (type == "html") {
            responseDIV.innerHTML = "";
            let frag: DocumentFragment = document.createRange().createContextualFragment(responseString);
            responseDIV.appendChild(frag);
        }
        url = "https://mainscript-gis.herokuapp.com/";
    }
}