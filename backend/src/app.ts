import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { Server } from "http";
import WebSocket from "ws";
import { handlerWebsocket } from "./websocket/handlerWebsocket";
import { percentageClock } from "./websocket/getPosition/cubeLand/percentageClock";

const app = express();

app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(express.json());

// Routes
app.use("/", routes);

// Websocket definer
function myWebsocket(server: Server) {

    const wss = new WebSocket.Server({ noServer: true });

    percentageClock();

    // Websocket conexion manager
    server.on("upgrade", (request, socket, head) => {

        const upgradeHeader = request.headers["upgrade"];

        if (upgradeHeader && upgradeHeader.toLowerCase() !== "websocket") {
            socket.destroy();
        }
        wss.handleUpgrade(request, socket, head, (ws) => {
            handlerWebsocket(ws);
        });
    });

    // Errors
    wss.on("error", (error) => {
        console.error(`WebSocket error: ${error.message}`);
    });
}

export default myWebsocket;
