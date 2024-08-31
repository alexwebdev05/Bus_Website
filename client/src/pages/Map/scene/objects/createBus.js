import { busMovement } from '../animations/busMovement'

export function createBus(loader, scene) {
    loader.load('models/bus.glb', function(gltf) {
        let bus = gltf.scene;
        scene.add(bus);

        // Animation
        busMovement(bus)
    });
}
