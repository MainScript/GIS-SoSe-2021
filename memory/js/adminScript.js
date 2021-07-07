"use strict";
var adminMemory;
(function (adminMemory) {
    let addButton = document.getElementById("addToDB");
    addButton.addEventListener("click", handleAdd);
    async function handleAdd() {
        let formD = new FormData(document.getElementById("adminForm"));
        let q = new URLSearchParams(formD);
        let url = "https://mainscript-gis.herokuapp.com/write";
        url += "?" + q.toString();
        let outRes = await fetch(url);
        let out = await outRes.text();
        console.log(out);
    }
})(adminMemory || (adminMemory = {}));
//# sourceMappingURL=adminScript.js.map