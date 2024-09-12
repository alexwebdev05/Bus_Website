import * as THREE from "three"

import WebSocket from "ws";
import { wayCubeLand } from "./getPosition/cubeLand/wayCubeland";

export function handlerWebsocket(ws: WebSocket) {
    console.log("[Client] New connection");

    // Percentage
    const TIME = 120
    const startTime = new Date().getTime();
    const stopTime = startTime + TIME * 1000;
    var percentage: number;

    const intervalId = setInterval(() => {
        percentage = clock();

        if (percentage <= 0) {
            clearInterval(intervalId);
    }
    }, 10);

    function clock(): number {
        let actualTime = new Date().getTime();
        let leftover = stopTime - actualTime;

        let percentage = 1 - leftover / (TIME * 1000);
        return Math.min(Math.max(percentage, 0), 100);
    }

    const busState = {
        position: new THREE.Vector3(),
        quaternion: new THREE.Quaternion(),
    };

    // Get message
    ws.on('message', (message: WebSocket.RawData) => {
        const messageString = message.toString();

        // Send Position
        if (messageString === "getPositionCubeLand") {
            // Insert data        
            const point = wayCubeLand().getPointAt(percentage);
            const tangent = wayCubeLand().getTangentAt(percentage);

            if (point && tangent) {
                busState.position.set(point.x, point.y, point.z);
            
                const quaternion = new THREE.Quaternion();
                quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);
            
                busState.quaternion.copy(quaternion);
            }

            ws.send(JSON.stringify({
                name: "position",
                data: {
                    position: {
                        x:  busState.position.x,
                        y:  busState.position.y,
                        z:  busState.position.z 
                    },
                    quaternion: busState.quaternion
                    
            }
            }));
        } else {
            console.log(`Invalid message ${messageString}`);
        }
    });
}
