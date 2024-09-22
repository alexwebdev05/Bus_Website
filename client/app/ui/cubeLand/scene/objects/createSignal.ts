import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function createSignal(
    loader: GLTFLoader,
    scene: THREE.Scene,
    signals: THREE.Object3D[],
    position: THREE.Vector3,
    scale: THREE.Vector3
): void {
    loader.load(
        "models/signal.glb",
        (gltf) => {
            const signal = gltf.scene;

            // Position
            signal.position.copy(position);
            signal.scale.copy(scale);

            // Push object
            scene.add(signal);
            signals.push(signal);
        },
        undefined,
        (error) => {
            console.error("Error loading signal model:", error);
        }
    );
}
