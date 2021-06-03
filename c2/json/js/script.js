"use strict";
var P3_2_JSON;
(function (P3_2_JSON) {
    let formData;
    let url = "http://localhost:8100/json";
    let submitB = document.getElementById("submit");
    submitB.addEventListener("click", handleSubmit);
    async function handleSubmit() {
        formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        url += "?" + query.toString();
        let response = await fetch(url, { method: "get" });
        let responseString = await response.text();
        let responseJSON = JSON.parse(responseString);
        console.log(responseJSON);
    }
})(P3_2_JSON || (P3_2_JSON = {}));
//# sourceMappingURL=script.js.map