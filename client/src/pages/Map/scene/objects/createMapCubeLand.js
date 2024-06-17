export function createMapCubeLand(loader, scene) {
    loader.load('src/pages/Map/assets/models/map1.glb', function(gltf) {
        const map = gltf.scene;
        scene.add(map);
    }, undefined, function(error) {
        console.error(error);
    });
}
