import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { Server } from 'http';
import WebSocket from 'ws';
import { handlerWebsocket } from './websocket/handlerWebsocket';
import { percentageClock } from './percentageClock';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rutas
app.use('/', routes);

// Función para configurar WebSocket
function myWebsocket(server: Server) {
  // Crear el servidor WebSocket
  const wss = new WebSocket.Server({ noServer: true });

  // Percentage calculator
  percentageClock()

  // Manejar la actualización de la conexión de WebSocket
  server.on('upgrade', (request, socket, head) => {
    // Validar que la solicitud sea de tipo WebSocket
    const upgradeHeader = request.headers['upgrade'];

    if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket') {
      // Manejar la actualización a WebSocket
      wss.handleUpgrade(request, socket, head, (ws) => {
        // Pasar el WebSocket al manejador

        handlerWebsocket(ws);
      });
    } else {
      socket.destroy(); // Destruir la conexión si no es WebSocket
    }
  });

  // Manejar eventos del WebSocket Server (Opcional)
  wss.on('error', (error) => {
    console.error(`WebSocket error: ${error.message}`);
  });
}

export default myWebsocket;
