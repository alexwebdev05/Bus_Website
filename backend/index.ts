// index.ts
import myWebsocket from "./src/app";
import express from "express";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Init http server
const server = http.createServer(app);

// Websocket
myWebsocket(server);

// Listener
server.listen(process.env.PORT_MAIN, () => {
    console.log(`Server running on http://localhost:${process.env.PORT_MAIN}`);
});
