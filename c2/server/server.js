"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_2Server = void 0;
const Http = require("http");
const Url = require("url");
var P_3_2Server;
(function (P_3_2Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let q = Url.parse(_request.url, true);
        let qdata = q.query;
        let outHandler = { vorname: qdata.vorname.toString(), nachname: qdata.nachname.toString(), farbe: qdata.farbe.toString() };
        let respText = "";
        console.log(q.pathname);
        if (q.pathname == "/html") {
            respText = queryToHTML(outHandler);
        }
        else if (q.pathname == "/json") {
            respText = JSON.stringify(outHandler);
        }
        _response.write(respText);
        _response.end();
    }
    function queryToHTML(_hand) {
        let out = "<div><p>Vorname: " + _hand.vorname + "</p></div><div><p>Nachname: " + _hand.nachname + "</p></div><div><p>Lieblingsfarbe: " + _hand.farbe + "</p></div>";
        return out;
    }
})(P_3_2Server = exports.P_3_2Server || (exports.P_3_2Server = {}));
//# sourceMappingURL=server.js.map