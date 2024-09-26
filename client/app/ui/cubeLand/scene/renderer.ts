import * as THREE from "three";

export default function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 1.3, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    return renderer;
}
