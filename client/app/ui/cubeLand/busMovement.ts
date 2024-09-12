import * as THREE from "three";

export default function busMovement(bus: THREE.Object3D) {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
        console.log('[Bus] Connected to WebSocket (position)');
        setInterval(() => {
            ws.send('getPositionCubeLand');
        }, 10)
        
    };

    ws.onmessage = (event) => {

        

        const message = JSON.parse(event.data);

        console.log(message);

        if (message.name === 'position' && message.data) {
            const receivedPosition = message.data.position
            const receivedQuaternion = message.data.quaternion;
            bus.position.set(receivedPosition.x, receivedPosition.y, receivedPosition.z);
            bus.quaternion.set(receivedQuaternion[0], receivedQuaternion[1], receivedQuaternion[2], receivedQuaternion[3]);

        }
    };

    ws.onclose = () => {
        console.log('[Bus] WebSocket connection closed');
    };

    ws.onerror = (error) => {
        // console.error('[Client] WebSocket error:', error);
    };

    return () => {
        ws.close();
    };
}
