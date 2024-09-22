import * as THREE from "three";

export default function createLights(scene: THREE.Scene): void {
    const intensity = 5;
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    const light2 = new THREE.DirectionalLight(0x8C97CB, intensity);

    light.position.set(5, 4, 2);
    light2.position.set(-5, 4, -2);
    scene.add(light);
    scene.add(light2);
}
