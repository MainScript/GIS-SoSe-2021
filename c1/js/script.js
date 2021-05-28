"use strict";
var P3_1;
(function (P3_1) {
    let formData;
    let url = "https://mainscript-gis.herokuapp.com/";
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
        let ansH = document.createElement("h2");
        ansH.innerText = "Antwort des Servers: " + _ans;
        document.body.appendChild(ansH);
    }
})(P3_1 || (P3_1 = {}));
//# sourceMappingURL=script.js.map