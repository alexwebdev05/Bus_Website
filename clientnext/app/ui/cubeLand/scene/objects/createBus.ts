import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { busMovement } from '../animations/busMovement'

export function createBus(loader: GLTFLoader, scene: THREE.Scene) {
    loader.load('models/bus.glb', function(gltf) {
        let bus = gltf.scene;
        scene.add(bus);

        // Animation
        // busMovement(bus)
    });
}
