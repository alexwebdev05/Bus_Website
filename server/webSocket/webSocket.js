const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const THREE = require('three');

// Objects
const { createScene } = require('./src/scene/createScene');
const { wayCubeLand } = require('./src/objects/wayCubeLand');

// Movement
// const { busStop } = require('./src/movement/stops')

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


    let time = 0;
    let moveingInterval;

    function busMovement() {
        // Time
        let actualDate = new Date();
        let actualMin = actualDate.getMinutes();
        let actualSec = actualDate.getSeconds()
        let actualMil = actualDate.getMilliseconds()
        let prueba = actualMin % 2

        // Speed
        time += 0.01
        const t = (time % 97) / 97;

        // Stops
        if ( actualMin % 2 == 0 && actualSec == 24 ) {
            console.log('autobus parado')
            clearInterval(moveingInterval)
            setTimeout(() => {
                moveingInterval = setInterval(busMovement, 10);
            }, 5000)
        } else if ( actualMin % 2 == 0 && actualSec == 52 ) {
            console.log('autobus parado')
            clearInterval(moveingInterval)
            setTimeout(() => {
                moveingInterval = setInterval(busMovement, 10);
            }, 5000)
        } else if ( actualMin % 2 == 1 && actualSec == 27 ) {
            console.log('autobus parado')
            clearInterval(moveingInterval)
            setTimeout(() => {
                moveingInterval = setInterval(busMovement, 10);
            }, 5000)
        } else if ( actualMin % 2 == 1 && actualSec == 53 ) {
            console.log('autobus parado')
            clearInterval(moveingInterval)
            setTimeout(() => {
                moveingInterval = setInterval(busMovement, 10);
            }, 5000)
        }
        console.log(prueba)
        
        if ( actualMin % 2 == 0 && actualSec <= 1 && actualMil < 4 ) {
            clearInterval(moveingInterval)
            time = 0;
            console.log('min par')
            moveingInterval = setInterval(busMovement, 10);
        }


        // Send position
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

    moveingInterval = setInterval(busMovement, 10);
}

module.exports = {
    startWebSocketServer
};