"use strict";
var P3_2;
(function (P3_2) {
    let formData;
    let url = "https://mainscript-gis.herokuapp.com/";
    let type = "";
    let htmlSubmit = document.getElementById("htmlsubmit");
    let jsonSubmit = document.getElementById("jsonsubmit");
    let responseDIV = document.getElementById("responseDIV");
    jsonSubmit.addEventListener("click", jsonSubmitFunc);
    htmlSubmit.addEventListener("click", htmlSubmitFunc);
    function jsonSubmitFunc() {
        type = "json";
        handleSubmit();
    }
    function htmlSubmitFunc() {
        type = "json";
        handleSubmit();
    }
    async function handleSubmit() {
        formData = new FormData(document.forms[0]);
        url += type;
        let query = new URLSearchParams(formData);
        url += "?" + query.toString();
        let response = await fetch(url, { method: "get" });
        let responseString = await response.text();
        if (type == "json") {
            let responseJSON = JSON.parse(responseString);
            console.log(responseJSON);
        }
        else if (type == "html") {
            responseDIV.innerHTML = "";
            let frag = document.createRange().createContextualFragment(responseString);
            responseDIV.appendChild(frag);
        }
        url = "https://mainscript-gis.herokuapp.com/";
    }
})(P3_2 || (P3_2 = {}));
//# sourceMappingURL=script.js.map