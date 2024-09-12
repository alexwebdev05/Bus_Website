import WebSocket from "ws";

export function percentageClock() {
        
    // Percentage
    const TIME = 120
    const startTime = new Date().getTime();
    const stopTime = startTime + TIME * 1000;
    var percentage: number;

    var wss = new WebSocket.Server({ port: 3002 })

    wss.on('connection', (ws) => {
        console.log('Connected percentage clock');
    
        // Send the initial percentage when a new client connects
        ws.send(JSON.stringify({ percentage: getPercentage() }));
    
        // When a client disconnects
        ws.on('close', () => {
        console.log('Client disconnected');
        });
    });

    const intervalId = setInterval(() => {
        percentage = getPercentage();
    
        // Broadcast the percentage to all connected clients
        wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ percentage }));
        }
        });
    
        // Stop the interval if time is up
        if (percentage <= 0) {
        clearInterval(intervalId);
        }
    }, 10);

    function getPercentage() {
        let actualTime = new Date().getTime();
        let leftover = stopTime - actualTime;
    
        let percentage = 1 - leftover / (TIME * 1000);
        return Math.min(Math.max(percentage, 0), 100);
    }

    console.log('WebSocket server is running on ws://localhost:3001');
}