const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const { v4: uuidv4 } = require('uuid');
const THREE = require('three');
const path = require('path');

const server = express().listen(8080);
const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  console.log('[Server] Client was connected.');



  ws.on('close', () => {
    console.log('[Server] Client disconnected.');
  })

  ws.on('message', (message) => {

      console.log(message);

    // Broadcast to everyone
    wss.clients.forEach(function each(client) {
      if ( client != ws && client.readyState === WebSocket.OPEN ) {
        client.send(message)
      }
    })


  });

});

// My imports
const { createScene } = require('./src/scene/createScene');
const { wayCubeLand } = require('./src/objects/wayCubeLand');

// Scene
const scene = createScene();

// Curve
const curve = wayCubeLand(scene);

// Bus state
let busState = {
  position: new THREE.Vector3(),
  quaternion: new THREE.Quaternion(),
};

// Send bus state to clients
function broadcastBusState() {
  const busData = {
    position: busState.position.toArray(),
    quaternion: busState.quaternion.toArray(),
  };
  const message = JSON.stringify({
    type: 'busState',
    data: busData,
  });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Bus movement
const clock = new THREE.Clock();

function busMovement() {
  const elapsedTime = clock.getElapsedTime();

  const t = (elapsedTime % 10) / 10;

  const point = curve.getPointAt(t);
  const tangent = curve.getTangentAt(t);

  if (point && tangent) {
    busState.position.set(point.x, point.y, point.z);

    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);

    busState.quaternion.copy(quaternion);
  } else {
    clock.start();
  }

  broadcastBusState();
}
setInterval(busMovement, 100);
