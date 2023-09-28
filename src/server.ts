import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Client } from "pg";
import { getEnvVarOrFail } from "./support/envVarUtils";
import { setupDBClientConfig } from "./support/setupDBClientConfig";
import { DbItem } from "./interfaces";

dotenv.config(); //Read .env file lines as though they were env vars.

const dbClientConfig = setupDBClientConfig();
const client = new Client(dbClientConfig);

//Configure express routes
const app = express();

app.use(express.json()); //add JSON body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

app.get("/", async (_req, res) => {
    res.json({
        msg: "Hello! There's nothing interesting for GET /, try endpoint /teams",
    });
});

app.get("/teams", async (_req, res) => {
    try {
        const text = "SELECT * FROM teams";

        const result = await client.query(text);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(`there is an error: ${error}`);
    }
});

app.post<{}, {}, DbItem>("/teams", async (req, res) => {
    try {
        const data = req.body;
        const text =
            "INSERT INTO teams(teamname, teamcaptain, teamplayer1,teamplayer2,teamplayer3,teamplayer4,teamplayer5,teamplayer6) VALUES($1, $2, $3,$4, $5, $6,$7,$8) RETURNING *";
        const value = [
            data.teamname,
            data.teamcaptain,
            data.teamplayer1,
            data.teamplayer2,
            data.teamplayer3,
            data.teamplayer4,
            data.teamplayer5,
            data.teamplayer6,
        ];
        const result = await client.query(text, value);
        res.status(201).json(result.rows);
    } catch (error) {
        console.error(`there is an error: ${error}`);
    }
});

app.delete("/teams", async (_req, res) => {
    try {
        const text = "DELETE FROM teams";

        const result = await client.query(text);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(`there is an error: ${error}`);
    }
});

app.get("/teams/:id", async (_req, res) => {
    try {
        const id = _req.params.id;
        const text = "SELECT * FROM teams WHERE id = $1";
        const value = [id];
        const result = await client.query(text, value);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(`there is an error: ${error}`);
    }
});

app.get("/health-check", async (_req, res) => {
    try {
        //For this to be successful, must connect to db
        await client.query("select now()");
        res.status(200).send("system ok");
    } catch (error) {
        //Recover from error rather than letting system halt
        console.error(error);
        res.status(500).send("An error occurred. Check server logs.");
    }
});

connectToDBAndStartListening();

async function connectToDBAndStartListening() {
    console.log("Attempting to connect to db");
    await client.connect();
    console.log("Connected to db!");

    const port = getEnvVarOrFail("PORT");
    app.listen(port, () => {
        console.log(
            `Server started listening for HTTP requests on port ${port}.  Let's go!`
        );
    });
}
