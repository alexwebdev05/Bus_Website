import { busMovement } from '../animations/busMovement'

export function createBus(loader, scene, renderer, camera, curve, position) {
    loader.load('src/pages/Map/assets/models/bus.glb', function(gltf) {
        let bus = gltf.scene;
        scene.add(bus);
        console.log(position)

        // Animation
        busMovement(bus, curve, renderer, camera, scene, position)
    });
}
