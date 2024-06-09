import * as THREE from "three";

export function initLighting(scene) {
    const intensity = 5;
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    
    light.position.set(2, 4, 2);
    scene.add(light);
}