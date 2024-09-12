// index.ts
import myWebsocket from './src/app';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http'

import { handlerWebsocket } from './src/websocket/handlerWebsocket';

dotenv.config(); // Cargar las variables de entorno

const PORT = process.env.PORT || 3000;

const app = express();

// Percentage
const TIME = 120
const startTime = new Date().getTime();
const stopTime = startTime + TIME * 1000;
var percentage: number;

const intervalId = setInterval(() => {
  percentage = clock();
  if (percentage <= 0) {
      clearInterval(intervalId);
      //resolve(0);
  } else {
    console.log('hola ' + percentage)
  }
}, 100); // Actualiza cada 100ms

function clock(): number {
  let actualTime = new Date().getTime();
  let leftover = stopTime - actualTime;

  let percentage = (100 - (leftover / (TIME * 1000)) * 100);
  // console.log(percentage)
  return percentage;
}

// Crear un servidor HTTP
const server = http.createServer(app);
myWebsocket(server, percentage)

// Escuchar en el mismo puerto para HTTP y WebSocket
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});