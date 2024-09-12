import WebSocket from "ws";

export function percentageClock() {
    // Percentage
    const TIME = 120;
    let startTime = new Date().getTime();
    let stopTime = startTime + TIME * 1000;
    let percentage: number;

    const wss = new WebSocket.Server({ port: 3002 });

    wss.on('connection', (ws) => {
        console.log('Connected percentage clock');

        ws.send(JSON.stringify({ percentage: getPercentage() }));

        // When a client disconnects
        ws.on('close', () => {
            console.log('Client disconnected');
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
        let actualTime = new Date().getTime();
        let leftover = stopTime - actualTime;

        let percentage = 1 - leftover / (TIME * 1000);
        console.log(percentage);
        return Math.min(Math.max(percentage, 0), 1);
    }

    console.log('WebSocket server is running on ws://localhost:3002');
}
