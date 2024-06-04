import * as THREE from 'three'

// Curve
export function wayCubeLand(scene) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.4, 0.5, 2.32),
      new THREE.Vector3(0.78, 0.5, 2.32),
      new THREE.Vector3(0.78, 0.5, 1.6),
      new THREE.Vector3(1.55, 0.5, 1.6),
      new THREE.Vector3(1.55, 0.5, 0.8),
      new THREE.Vector3(2.1, 0.5, 0.8),
    ])

    const points = curve.getPoints(5);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    scene.add(curveObject)
}
      