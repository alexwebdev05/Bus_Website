import WebSocket from "ws";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT_TIMER || "3030", 10);
const wss = new WebSocket.Server({ port: port });

// Clock to make the main date to create other hours
export function timeClock() {
    const clients: WebSocket[] = [];

    wss.on("connection", (ws) => {
        clients.push(ws);


        ws.send(JSON.stringify(getTime()));


        ws.on("close", () => {
            const index = clients.indexOf(ws);
            if (index > -1) {
                clients.splice(index, 1);
            }
        });

    });

    setInterval(() => {
        const message = JSON.stringify(getTime());
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }, 1000);

    let startTime = new Date();
    let endTime = new Date(new Date().setMinutes(new Date().getMinutes() + 2));

    function loop() {
        const now = new Date();
        if (endTime <= now) {
            reset();
        }
        setTimeout(loop, 1000);
    }
    loop();

    function reset() {
        startTime = new Date(startTime.setMinutes(startTime.getMinutes() + 2));
        endTime = new Date(startTime.getTime() + 2 * 60 * 1000);

        console.log("reseted");
    }

    function getTime() {
        return {
            startTime: startTime,
            endTime: endTime
        };
    }
}
