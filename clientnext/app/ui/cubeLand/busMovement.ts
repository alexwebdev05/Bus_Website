import * as THREE from "three";

export default function busMovement(bus: THREE.Object3D) {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        console.log('[Bus] Connected to WebSocket');
    };

    ws.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);

            if (message.type === 'busState' && message.data.position && message.data.quaternion) {

                const receivedPosition = message.data.position
                const receivedQuaternion = message.data.quaternion;
                bus.position.set(receivedPosition[0], receivedPosition[1], receivedPosition[2]);
                bus.quaternion.set(receivedQuaternion[0], receivedQuaternion[1], receivedQuaternion[2], receivedQuaternion[3]);

            }

        } catch (error) {
            // console.error('Error parsing JSON:', error);
            // console.error('Message that caused the error:', event.data);
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
