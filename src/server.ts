import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Client } from "pg";
import { getEnvVarOrFail } from "./support/envVarUtils";
import { setupDBClientConfig } from "./support/setupDBClientConfig";
import { teamsDbItem, orderOfPlayDbItem } from "./interfaces";

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

app.post<{}, {}, teamsDbItem>("/teams", async (req, res) => {
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

app.post<{}, {}, orderOfPlayDbItem>("/orderOfPlay", async (req, res) => {
    try {
        const data = req.body;
        const text =
            "INSERT INTO orderOfPlay(teamname, Game1Player1, Game1Player2, Game2Player1, Game2Player2, Game3Player1, Game3Player2, Game4Player1, Game4Player2, Game5Player1, Game5Player2,Game6Player1,Game6Player2, Game7Player1,Game7Player2) VALUES($1, $2, $3,$4, $5, $6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *";
        const value = [
            data.teamname,
            data.game1Player1,
            data.game1Player2,
            data.game2Player1,
            data.game2Player2,
            data.game3Player1,
            data.game3Player2,
            data.game4Player1,
            data.game4Player2,
            data.game5Player1,
            data.game5Player2,
            data.game6Player1,
            data.game6Player2,
            data.game7Player1,
            data.game7Player2
        ];
        const result = await client.query(text, value);
        res.status(201).json(result.rows);
    } catch (error) {
        console.error(`there is an error: ${error}`);
    }
});

app.get("/orderOfPlay", async (_req, res) => {
    try {
        const text = "SELECT * FROM orderOfPlay";

        const result = await client.query(text);
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
