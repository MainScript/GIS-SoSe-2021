"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c4_server = void 0;
const Mongo = require("mongodb");
const Http = require("http");
const Url = require("url");
var c4_server;
(function (c4_server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    let dbURL = "mongodb+srv://testuser1:ztykBMrrQJVzJXS6@gis-sose-21.irkhj.mongodb.net/task3-4?retryWrites=true&w=majority";
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response, _url) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let q = Url.parse(_request.url, true);
        let qdata = q.query;
        let outHandler = { vorname: qdata.foreName.toString(), nachname: qdata.surName.toString(), farbe: qdata.inpCol.toString(), datum: qdata.birthDate.toString() };
        if (q.pathname == "/write") {
            let out = await writeToDB(outHandler);
            _response.write(out);
        }
        else if (q.pathname == "/read") {
            let out = await readFromDB();
            _response.write(JSON.stringify(out));
        }
        _response.end();
    }
    async function connectToDB(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let collection = mongoClient.db("task3-4").collection("Entries");
        return collection;
    }
    async function writeToDB(_handler) {
        let collection = await connectToDB(dbURL);
        collection.insertOne(_handler);
        let out = "Dein Eintrag wurde hinzugefügt!";
        return out;
    }
    async function readFromDB() {
        let collection = await connectToDB(dbURL);
        let outCursor = await collection.find();
        let out = await outCursor.toArray();
        return out;
    }
})(c4_server = exports.c4_server || (exports.c4_server = {}));
//# sourceMappingURL=server.js.map