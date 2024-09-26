import * as THREE from "three";

export function topView(camera: THREE.Camera, latitude: number) {
    camera.position.z = 0;
    camera.position.x = 0;
    camera.position.y = latitude;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

export function onWindowResize(renderer: THREE.Renderer, camera: THREE.PerspectiveCamera) {
    window.addEventListener("resize", () => {
        const width = window.innerWidth / 2;
        const height = window.innerHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}
