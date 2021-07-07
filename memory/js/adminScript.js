"use strict";
var adminMemory;
(function (adminMemory) {
    let addButton = document.getElementById("addToDB");
    let imagesDiv = document.getElementById("imagesDiv");
    addButton.addEventListener("click", handleAdd);
    window.addEventListener("load", handleGet);
    async function handleAdd() {
        let formD = new FormData(document.getElementById("adminForm"));
        let q = new URLSearchParams(formD);
        let url = "https://mainscript-gis.herokuapp.com/writeImg";
        url += "?" + q.toString();
        let outRes = await fetch(url);
        let out = await outRes.text();
        console.log(out);
        handleGet();
    }
    async function handleGet() {
        let url = "https://mainscript-gis.herokuapp.com/getImg";
        let outRes = await fetch(url);
        let out = await outRes.text();
        let imgArr = JSON.parse(out);
        for (let img of imgArr) {
            let imgDiv = document.createElement("div");
            let imgCon = document.createElement("img");
            imgCon.src = img.link;
            imgCon.classList.add("kartenBild");
            imgCon.id = img.id;
            imgDiv.appendChild(imgCon);
            imagesDiv.appendChild(imgDiv);
        }
    }
})(adminMemory || (adminMemory = {}));
//# sourceMappingURL=adminScript.js.map