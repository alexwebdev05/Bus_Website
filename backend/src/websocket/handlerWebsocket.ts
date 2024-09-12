import * as THREE from "three";
import WebSocket from "ws";
import { wayCubeLand } from "./getPosition/cubeLand/wayCubeland";

// http request manager
export function handlerWebsocket(ws: WebSocket) {
    console.log("[Client] New connection");
    var percentage = 0.3
    const busState = {
        position: new THREE.Vector3(),
        quaternion: new THREE.Quaternion(),
    };

    // Función para actualizar la posición y el cuaternión del bus
    function updatePointAndTangent(percentage: number) {
        const point = wayCubeLand().getPointAt(percentage);
        const tangent = wayCubeLand().getTangentAt(percentage);
        

        if (point && tangent) {
            busState.position.set(point.x, point.y, point.z);

            const quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);

            busState.quaternion.copy(quaternion);

            ws.send(JSON.stringify({
                name: "position",
                data: {
                    position: {
                        x: busState.position.x,
                        y: busState.position.y,
                        z: busState.position.z
                    },
                    quaternion: {
                        x: busState.quaternion.x,
                        y: busState.quaternion.y,
                        z: busState.quaternion.z,
                        w: busState.quaternion.w
                    }
                }
            }));
        } else {
            console.log(`Invalid data at percentage: ${percentage}`);
        }
    }

    // Manejar mensajes del cliente WebSocket
    ws.on('message', (message: WebSocket.RawData) => {
        const messageString = message.toString();

        // Verificar si el cliente solicitó la posición
        if (messageString === "getPositionCubeLand") {
            const positionWs = new WebSocket('ws://localhost:3002');

            positionWs.onopen = () => {
                
            };

            positionWs.onmessage = (event) => {
                try {
                    const dataString = typeof event.data === 'string' ? event.data : event.data.toString();
                    const message = JSON.parse(dataString);  // Correct parsing after conversion
                    updatePointAndTangent(message.percentage);
                    // Optionally: Do something with the received message
                    
                } catch (error) {
                    console.error("Error parsing JSON message from secondary WebSocket:", error);
                }
                
            }
            

        } else {
            console.log(`Invalid message ${messageString}`);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket closed');
    });
}
