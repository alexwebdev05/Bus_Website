import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { Server } from 'http';
import WebSocket from 'ws';
import { handlerWebsocket } from './websocket/handlerWebsocket';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rutas
app.use('/', routes);

// Websocket
function myWebsocket(server: Server, percentage: number) {
  const wss = new WebSocket.Server({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const upgradeHeader = request.headers['upgrade'];

    if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket') {
      wss.handleUpgrade(request, socket, head, (ws) => {
          handlerWebsocket(ws, percentage);
      });
    } else {
      socket.destroy();
    }
});
}

export default myWebsocket;
