import * as Mongo from "mongodb";
import * as Http from "http";
import * as Url from "url";
import { ParsedUrlQuery } from "querystring";

export namespace c4_server {
    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    let dbURL: string = "mongodb+srv://testuser1:ztykBMrrQJVzJXS6@gis-sose-21.irkhj.mongodb.net/task3-4?retryWrites=true&w=majority";
    if (!port)
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse, _url: string): Promise<void> {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let q: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let qdata: ParsedUrlQuery = q.query;
        let outHandler: Handler = {vorname: qdata.foreName.toString(), nachname: qdata.surName.toString(), farbe: qdata.inpCol.toString(), datum: qdata.birthDate.toString()};

        if (q.pathname == "/write") {
            let out: string = await writeToDB(outHandler);
            _response.write(out);
        } else if (q.pathname == "/read") {
            let out: Handler[] = await readFromDB();
            _response.write(JSON.stringify(out));
        }

        _response.end();
    }

    async function connectToDB(_url: string): Promise<Mongo.Collection> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let collection: Mongo.Collection = mongoClient.db("task3-4").collection("Entries");
        return collection;
    }

    async function writeToDB(_handler: Handler): Promise<string> {
        let collection: Mongo.Collection = await connectToDB(dbURL);
        collection.insertOne(_handler);
        let out: string = "Dein Eintrag wurde hinzugefügt!";
        return out;
    }

    async function readFromDB(): Promise<Handler[]> {
        let collection: Mongo.Collection = await connectToDB(dbURL);
        let out: Handler[] = await collection.find().toArray();
        return out;
    }

    interface Handler {
        vorname: string;
        nachname: string;
        farbe: string;
        datum: string;
    }
}
