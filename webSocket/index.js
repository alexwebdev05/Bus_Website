const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
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

    wss.clients.forEach(function each(client) {
      if ( client != ws && client.readyState === WebSocket.OPEN ) {
        client.send(message)
      }
    })
  });
});

// Objects
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
let time = 0;
let moveing = true

function busMovement() {
  time += 0.02
  const t = (time % 100) / 100;

  console.log(time)

  if ( time >= 100 ) {
    time = 0;
    busStops()
  }

  const point = curve.getPointAt(t);
  const tangent = curve.getTangentAt(t);

  if (point && tangent) {
    busState.position.set(point.x, point.y, point.z);

    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);

    busState.quaternion.copy(quaternion);
  } else {
    time = 0
  }
  broadcastBusState();
  
}

moveingInterval = setInterval(busMovement, 20);



// Paradas
function busStops() {
  setTimeout(() => {
    moveing = false
    console.log('Autobus parado')
    clearInterval(moveingInterval)
  
    setTimeout(() => {
      moveing = true
      moveingInterval = setInterval(busMovement, 20);
    }, 5000)
  }, 24000)
  
  
  
  
  setTimeout(() => {
    moveing = false
    console.log('Autobus parado')
    clearInterval(moveingInterval)
  
    setTimeout(() => {
      moveing = true
      moveingInterval = setInterval(busMovement, 20);
    }, 5000)
  }, 52000)
  
  
  
  setTimeout(() => {
    moveing = false
    console.log('Autobus parado')
    clearInterval(moveingInterval)
  
    setTimeout(() => {
      moveing = true
      moveingInterval = setInterval(busMovement, 20);
    }, 5000)
  }, 70500)
  
  
  
  setTimeout(() => {
    moveing = false
    console.log('Autobus parado')
    clearInterval(moveingInterval)
  
    setTimeout(() => {
      moveing = true
      moveingInterval = setInterval(busMovement, 20);
    }, 5000)
  }, 93000)

  setTimeout(() => {
    moveing = false
    console.log('Autobus parado')
    clearInterval(moveingInterval)
  
    setTimeout(() => {
      moveing = true
      moveingInterval = setInterval(busMovement, 20);
    }, 5000)
  }, 120000)
  
}
busStops()