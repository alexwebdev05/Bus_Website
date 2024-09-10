import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function createSignal(
    loader: GLTFLoader,
    scene: THREE.Scene,
    signals: THREE.Object3D[], // Se especifica que 'signals' es un array de Object3D
    position: THREE.Vector3,
    scale: THREE.Vector3
): void {
    loader.load(
        'models/signal.glb',
        (gltf) => {
            const signal = gltf.scene;

            // Recorrer los hijos del modelo GLTF para ajustar materiales
            // signal.traverse((child) => {
            //     if ((child as THREE.Mesh).isMesh) {
            //         const mesh = child as THREE.Mesh;
            //         const material = mesh.material;

            //         // Verificar si el material tiene la propiedad 'color'
            //         if (Array.isArray(material)) {
            //             material.forEach((mat) => {
            //                 if (mat instanceof THREE.MeshStandardMaterial) {
            //                     mat.color.set(0xffffff); // Puedes cambiar a otro color según sea necesario
            //                 }
            //             });
            //         } else if (material instanceof THREE.MeshStandardMaterial) {
            //             material.color.set(0xffffff); // Puedes cambiar a otro color según sea necesario
            //         }
            //     }
            // });

            // Establecer la posición y escala del objeto de señal
            signal.position.copy(position);
            signal.scale.copy(scale);

            // Agregar el objeto de señal a la escena y al array de señales
            scene.add(signal);
            signals.push(signal);
        },
        undefined,
        (error) => {
            console.error('Error loading signal model:', error);
        }
    );
}
