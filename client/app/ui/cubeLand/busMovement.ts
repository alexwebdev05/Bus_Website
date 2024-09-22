import * as THREE from "three";

export default function busMovement(bus: THREE.Object3D) {
    const ws = new WebSocket("ws://localhost:3010");

    ws.onopen = () => {
        console.log("[Bus] Connected to WebSocket (position)");
        ws.send("getPositionCubeLand");
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.name === "position" && message.data) {
            const receivedPosition = message.data.position;
            const receivedQuaternion = message.data.quaternion;
            bus.position.set(receivedPosition.x, receivedPosition.y, receivedPosition.z);
            bus.quaternion.set(receivedQuaternion.x, receivedQuaternion.y, receivedQuaternion.z, receivedQuaternion.w);
        }
    };

    ws.onclose = () => {
        console.log("[Bus] WebSocket connection closed");
    };

    // ws.onerror = (error) => {
    //     console.error("[Client] WebSocket error:", error);
    // };

    return () => {
        ws.close();
    };
}
