import WebSocket from "ws";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT_PERCENTAGE || "3020", 10);

export function percentageClock() {

    // Percentage
    const TIME = 120;
    let startTime = new Date().getTime();
    let stopTime = startTime + TIME * 1000;
    let percentage: number;

    const wss = new WebSocket.Server({ port: port });

    wss.on("connection", (ws) => {
        console.log("Connected percentage clock");

        ws.send(JSON.stringify({ percentage: getPercentage() }));

        // When a client disconnects
        ws.on("close", () => {
            console.log("Client disconnected");
        });
    });

    const intervalId = setInterval(() => {
        percentage = getPercentage();

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ percentage }));
            }
        });

        if (percentage <= 0) {
            clearInterval(intervalId);
        } else if (percentage >= 1) {
            startTime += TIME * 1000;
            stopTime += TIME * 1000;
        }
    }, 10);

    function getPercentage() {
        const actualTime = new Date().getTime();
        const leftover = stopTime - actualTime;

        const percentage = 1 - leftover / (TIME * 1000);
        return Math.min(Math.max(percentage, 0), 1);
    }

    console.log("WebSocket percentage ws://localhost:3020");
}
