const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const THREE = require('three');


// Movement
const { busMovement } = require('./src/movement/posHandler');

function startWebSocketServer() {
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


    // Bus state
    let busState = {
        position: new THREE.Vector3(),
        quaternion: new THREE.Quaternion(),
    };

    // Send bus state to clients
    function broadcastBusState(hour) {
    const busData = {
        position: busState.position.toArray(),
        quaternion: busState.quaternion.toArray(),
        startTime: hour
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

    // Position handler
    busMovement(busState, broadcastBusState);
}

module.exports = {
    startWebSocketServer
};