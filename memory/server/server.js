"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryServer = void 0;
const Mongo = require("mongodb");
const Http = require("http");
const Url = require("url");
var memoryServer;
(function (memoryServer) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    let dbURL = "mongodb+srv://testuser1:ztykBMrrQJVzJXS6@gis-sose-21.irkhj.mongodb.net/Memory?retryWrites=true&w=majority";
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
        if (q.pathname == "/writeImg") {
            let outHandler = { link: qdata.imgURL.toString() };
            let out = await writeToDBImg(outHandler);
            _response.write(out);
        }
        else if (q.pathname == "/getImg") {
            let out = await getImages();
            _response.write(JSON.stringify(out));
        }
        else if (q.pathname == "/getScores") {
            let out = await getHighscores();
            _response.write(JSON.stringify(out));
        }
        else if (q.pathname == "/writeScore") {
            let outHandler = { name: qdata.name.toString(), score: +qdata.score.toString() };
            let out = await writeToDBScore(outHandler);
            _response.write(out);
        }
        else if (q.pathname == "/remove") {
            let outHandler = { link: qdata.imgURL.toString() };
            let out = await deleteImg(outHandler);
            _response.write(out);
        }
        _response.end();
    }
    async function connectToDB(_url, _col) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let collection = mongoClient.db("Memory").collection(_col);
        return collection;
    }
    async function writeToDBImg(_link) {
        let out = "";
        if (_link.link != "") {
            let collection = await connectToDB(dbURL, "Images");
            collection.insertOne(_link);
            out = "Dein Eintrag wurde hinzugef??gt!";
        }
        else {
            out = "Ung??ltiger Link";
        }
        return out;
    }
    async function writeToDBScore(_score) {
        let out = "";
        let collection = await connectToDB(dbURL, "Scores");
        collection.insertOne(_score);
        out = "Dein Eintrag wurde hinzugef??gt!";
        return out;
    }
    async function getImages() {
        let collection = await connectToDB(dbURL, "Images");
        let outCursor = await collection.find();
        let out = await outCursor.toArray();
        return out;
    }
    async function getHighscores() {
        let collection = await connectToDB(dbURL, "Scores");
        let outCursor = await collection.find();
        let out = await outCursor.toArray();
        return out;
    }
    async function deleteImg(_link) {
        let collection = await connectToDB(dbURL, "Images");
        await collection.deleteOne({ "link": _link.link });
        let out = "deleted";
        return out;
    }
})(memoryServer = exports.memoryServer || (exports.memoryServer = {}));
//# sourceMappingURL=server.js.map