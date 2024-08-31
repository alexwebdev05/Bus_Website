import * as THREE from 'three'

export function createSignal(loader, scene, signals, position, scale) {
    loader.load('models/signal.glb', function(gltf) {
        let signal = gltf.scene;
        const emissiveColor = new THREE.Color(0xffffff);
        signal.traverse(function(child) {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({color: child.material.color});
            }
        });
    
        signal.position.set(position.x, position.y, position.z);
        signal.scale.set(scale.x, scale.y, scale.z);
        scene.add(signal);
        signals.push(signal);
        }, undefined, function(error) {
            console.error(error);
        }
    );
}

