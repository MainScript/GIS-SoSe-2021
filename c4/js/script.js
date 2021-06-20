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
        let outArray = JSON.parse(out);
        console.log(JSON.parse(out));
        document.getElementById("outputDiv").innerHTML = "";
        for (let entry of outArray) {
            let entrydiv = document.createElement("div");
            entrydiv.id = entry._id;
            let vornameP = document.createElement("p");
            vornameP.innerText = "Vorname: " + entry.vorname;
            let nachnameP = document.createElement("p");
            nachnameP.innerText = "Nachname: " + entry.nachname;
            let farbeP = document.createElement("p");
            farbeP.innerText = "Lieblingsfarbe: " + entry.farbe;
            farbeP.style.color = entry.farbe;
            let datumP = document.createElement("p");
            datumP.innerText = "Geburtstag: " + entry.datum;
            let trennungsP = document.createElement("p");
            trennungsP.innerText = "--------------------";
            entrydiv.appendChild(vornameP);
            entrydiv.appendChild(nachnameP);
            entrydiv.appendChild(farbeP);
            entrydiv.appendChild(datumP);
            entrydiv.appendChild(trennungsP);
            document.getElementById("outputDiv").appendChild(entrydiv);
        }
    }
})(c4 || (c4 = {}));
//# sourceMappingURL=script.js.map