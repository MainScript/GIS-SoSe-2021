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
        
        if (q.pathname == "/writeImg") {
            let outHandler: ImgLink = {link: qdata.imgURL.toString()};
            let out: string = await writeToDBImg(outHandler);
            _response.write(out);
        } else if (q.pathname == "/getImg") {
            let out: string[] = await getImages();
            _response.write(JSON.stringify(out));
        } else if (q.pathname == "/getScores") {
            let out: string[] = await getHighscores();
            _response.write(JSON.stringify(out));
        } else if (q.pathname == "/writeScore") {
            let outHandler: Score = {name: qdata.name.toString(), score: +qdata.score.toString()};
            let out: string = await writeToDBScore(outHandler);
            _response.write(out);
        } else if (q.pathname == "/remove") {
            let outHandler: ImgLink = {link: qdata.imgURL.toString()};
            let out: string = await deleteImg(outHandler);
            _response.write(out);
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

    async function writeToDBImg(_link: ImgLink): Promise<string> {
        let out: string = "";
        if (_link.link != "") {
            let collection: Mongo.Collection = await connectToDB(dbURL, "Images");
            collection.insertOne(_link);
            out = "Dein Eintrag wurde hinzugefügt!";
        } else {
             out = "Ungültiger Link";
        }
        
        return out;
    }

    async function writeToDBScore(_score: Score): Promise<string> {
        let out: string = "";
        let collection: Mongo.Collection = await connectToDB(dbURL, "Scores");
        collection.insertOne(_score);
        out = "Dein Eintrag wurde hinzugefügt!";
        
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

    async function deleteImg(_link: ImgLink): Promise<string> {
        let collection: Mongo.Collection = await connectToDB(dbURL, "Images");
        await collection.deleteOne({"link" : _link.link});
        let out: string = "deleted";
        return out;
    }

    interface ImgLink {
        link: string;
    }

    interface Score {
        name: string;
        score: number;
    }
}
