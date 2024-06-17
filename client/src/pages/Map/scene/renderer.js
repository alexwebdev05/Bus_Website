import * as THREE from 'three'

export function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    return renderer
}