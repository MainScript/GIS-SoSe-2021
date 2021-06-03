"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
// import der http-Library
const Http = require("http");
var P_3_1Server;
(function (P_3_1Server) {
    // Konsolenausgabe bei Serverstart
    console.log("Starting server");
    // Festlegen der Portzahl auf 8100 by default
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    // Erstellen eines neuen Servers
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    // Konsolenausgabe, wenn der Server im Status "Listening" ist
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        /* Konsolennausgabe, wenn der Server eine Anfrage bekommt, habe ich auskommentiert,
        weil das sonst meine Konsole zuspammt wenn ich teste*/
        //console.log("I hear voices!");
        // Festlegen der Header-Eigenschaften
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // Die Zeile schreibt die Request-URL auf die Webpage
        _response.write(_request.url);
        // Ausgabe der URL in die Konsole
        console.log(_request.url);
        // Signal, dass die Bearbeitung der Anfrage beendet ist
        _response.end();
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map