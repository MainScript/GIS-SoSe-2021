import * as Mongo from "mongodb";
import * as Http from "http";
import * as Url from "url";
import { ParsedUrlQuery } from "querystring";

export namespace memoryServer {
    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    let dbURL: string = "mongodb+srv://testuser1:ztykBMrrQJVzJXS6@gis-sose-21.irkhj.mongodb.net/Memory?retryWrites=true&w=majority";
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
        
        if (q.pathname == "/write") {
            let outHandler: ImgLink = {link: qdata.imgURL.toString()};
            let out: string = await writeToDB(outHandler);
            _response.write(out);
        } else if (q.pathname == "/getImg") {
            let out: string[] = await getImages();
            _response.write(JSON.stringify(out));
        } else if (q.pathname == "/getScores") {
            let out: string[] = await getHighscores();
            _response.write(JSON.stringify(out));
        }

        _response.end();
    }

    async function connectToDB(_url: string, _col: string): Promise<Mongo.Collection> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let collection: Mongo.Collection = mongoClient.db("Memory").collection(_col);
        return collection;
    }

    async function writeToDB(_link: ImgLink): Promise<string> {
        let collection: Mongo.Collection = await connectToDB(dbURL, "Images");
        collection.insertOne(_link);
        let out: string = "Dein Eintrag wurde hinzugefügt!";
        return out;
    }

    async function getImages(): Promise<string[]> {
        let collection: Mongo.Collection = await connectToDB(dbURL, "Images");
        let outCursor: Mongo.Cursor = await collection.find();
        let out: string[] = await outCursor.toArray();
        return out;
    }

    async function getHighscores(): Promise<string[]> {
        let collection: Mongo.Collection = await connectToDB(dbURL, "Scores");
        let outCursor: Mongo.Cursor = await collection.find();
        let out: string[] = await outCursor.toArray();
        return out;
    }

    interface ImgLink {
        link: string;
    }
}
