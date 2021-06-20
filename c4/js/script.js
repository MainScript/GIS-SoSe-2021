"use strict";
var c4;
(function (c4) {
    let inputForm;
    let writeB = document.getElementById("dataB");
    let readB = document.getElementById("outputB");
    writeB.addEventListener("click", handleWrite);
    readB.addEventListener("click", handleRead);
    async function handleWrite() {
        inputForm = new FormData(document.getElementById("form1"));
        let q = new URLSearchParams(inputForm);
        let url = "https://mainscript-gis.herokuapp.com/write";
        url += "?" + q.toString();
        console.log(url);
        let outRes = await fetch(url);
        let out = await outRes.text();
        console.log(out);
    }
    async function handleRead() {
        let url = "https://mainscript-gis.herokuapp.com/read";
        let outRes = await fetch(url);
        let out = await outRes.text();
        console.log(out);
        console.log(JSON.parse(out));
    }
})(c4 || (c4 = {}));
//# sourceMappingURL=script.js.map