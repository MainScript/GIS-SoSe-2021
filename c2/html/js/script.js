"use strict";
var P3_2_HTML;
(function (P3_2_HTML) {
    let formData;
    let url = "http://localhost:8100/html";
    let submitB = document.getElementById("submit");
    submitB.addEventListener("click", handleSubmit);
    async function handleSubmit() {
        formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        url += "?" + query.toString();
        let response = await fetch(url, { method: "get" });
        let responseString = await response.text();
        console.log("Antwort des Servers: " + responseString);
        addAnswer(responseString);
    }
    function addAnswer(_ans) {
        let fragment = document.createRange().createContextualFragment(_ans);
        document.body.appendChild(fragment);
    }
})(P3_2_HTML || (P3_2_HTML = {}));
//# sourceMappingURL=script.js.map