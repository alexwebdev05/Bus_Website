import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Define la función para crear el mapa en el cubo
export default function createMapCubeLand(loader: GLTFLoader, scene: THREE.Scene) {
    loader.load(
        'models/map1.glb',
        (gltf) => {
            const map = gltf.scene;
            scene.add(map);
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
        }
    );
}
