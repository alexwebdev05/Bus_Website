export function createMapCubeLand(loader, scene) {
    loader.load('models/map1.glb', function(gltf) {
        const map = gltf.scene;
        scene.add(map);
    }, undefined, function(error) {
        console.error(error);
    });
}
