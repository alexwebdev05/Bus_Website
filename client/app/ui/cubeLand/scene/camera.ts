import * as THREE from "three";

export default function createCamera() {
    const camera = new THREE.PerspectiveCamera(60, (window.innerWidth / 1.3) / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.x = 2;
    camera.position.y = 5;
    return camera;
}
