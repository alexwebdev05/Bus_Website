import * as THREE from "three";

export function topView(camera, y) {
    camera.position.z = 0;
    camera.position.x = 0;
    camera.position.y = y;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

export function onWindowResize(renderer, camera) {
    window.addEventListener('resize', () => {
        const width = window.innerWidth / 2; // Dividir el ancho por 2 para mostrar dos mapas
        const height = window.innerHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

export function addGridHelper(scene) {
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
}

export function addAxisHelper(scene) {
    const axisHelper = new THREE.AxesHelper(5);
    scene.add(axisHelper);
}