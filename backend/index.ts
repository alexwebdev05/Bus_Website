// index.ts
import myWebsocket from './src/app';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http'

import { handlerWebsocket } from './src/websocket/handlerWebsocket';

dotenv.config(); // Cargar las variables de entorno

const PORT = process.env.PORT || 3000;

const app = express();

// Crear un servidor HTTP
const server = http.createServer(app);
myWebsocket(server)

// Escuchar en el mismo puerto para HTTP y WebSocket
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});