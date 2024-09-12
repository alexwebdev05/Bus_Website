// index.ts
import myWebsocket from './src/app';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http'

dotenv.config(); // Cargar las variables de entorno

const PORT = process.env.PORT || 3000;

const app = express();

// Crear un servidor HTTP
const server = http.createServer(app);

// Percentage
const TIME = 120
const startTime = new Date().getTime();
const stopTime = startTime + TIME * 1000;
var percentage: number;

const percentageSubscribers: Array<(percentage: number) => void> = [];

const intervalId = setInterval(() => {
    percentage = clock();

    percentageSubscribers.forEach(callback => callback(percentage));

    if (percentage <= 0) {
        clearInterval(intervalId);
    } else {
      
    }
}, 10);

function clock(): number {
    let actualTime = new Date().getTime();
    let leftover = stopTime - actualTime;

    let percentage = 1 - leftover / (TIME * 1000);
    return Math.min(Math.max(percentage, 0), 100);
}

// Websocket
myWebsocket(server)

// Escuchar en el mismo puerto para HTTP y WebSocket
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});