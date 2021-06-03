import * as Http from "http";
import { ParsedUrlQuery } from "querystring";
import * as Url from "url";

export namespace P_3_2Server {
    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        
        let q: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let qdata: ParsedUrlQuery = q.query;
        let outHandler: Handler = {vorname: qdata.vorname.toString(), nachname: qdata.nachname.toString(), farbe: qdata.farbe.toString()};

        let respText: string = "";
        if (q.pathname == "/html") {
            respText = queryToHTML(outHandler);
        } else if (q.pathname == "/json") {
            respText = JSON.stringify(outHandler);
        }
        //console.log(respText);
        _response.write(respText);
        _response.end();
    }

    interface Handler {
        vorname: string;
        nachname: string;
        farbe: string;
    }

    function queryToHTML(_hand: Handler): string {
        let out: string = "<div><p>Vorname: " + _hand.vorname + "</p></div><div><p>Nachname: " + _hand.nachname + "</p></div><div><p>Lieblingsfarbe: " + _hand.farbe + "</p></div>";
        return out;
    }
}