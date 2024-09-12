import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';

import http from 'http';
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
const websocket = http.createServer(app);

const wss = new WebSocket.Server({ noServer: true });

websocket.on('upgrade', (request, socket, head) => {
  const upgradeHeader = request.headers['upgrade'];

  if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket') {
    wss.handleUpgrade(request, socket, head, (ws) => {
        handlerWebsocket(ws);
    });
  } else {
    socket.destroy();
  }
});

const PORT = process.env.PORT || 3737;
websocket.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})

export default app;
