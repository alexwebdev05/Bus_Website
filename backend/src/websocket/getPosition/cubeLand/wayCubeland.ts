import * as THREE from "three";

export function wayCubeLand() {
    const scene = new THREE.Scene();

    // Curve way
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.66, 0.35, 2.35),
        new THREE.Vector3(0.79, 0.35, 2.22),
        new THREE.Vector3(0.79, 0.35, 1.68),
        new THREE.Vector3(0.9, 0.35, 1.56),
        new THREE.Vector3(1.45, 0.35, 1.56),
        new THREE.Vector3(1.57, 0.35, 1.44),
        new THREE.Vector3(1.57, 0.35, 0.9),
        new THREE.Vector3(1.68, 0.35, 0.78),
        new THREE.Vector3(1.96, 0.35, 0.78),
        new THREE.Vector3(2.085, 0.35, 0.66),

        new THREE.Vector3(2.08, 0.35, -0.66),
        new THREE.Vector3(1.96, 0.35, -0.78),
        new THREE.Vector3(1.16, 0.35, -0.78),
        new THREE.Vector3(1.04, 0.35, -0.91),
        new THREE.Vector3(1.04, 0.35, -1.69),
        new THREE.Vector3(0.92, 0.35, -1.82),
        new THREE.Vector3(0.38, 0.35, -1.82),
        new THREE.Vector3(0.26, 0.35, -1.94),
        new THREE.Vector3(0.26, 0.35, -2.48),
        new THREE.Vector3(0.15, 0.35, -2.6),

        new THREE.Vector3(-0.93, 0.35, -2.6),
        new THREE.Vector3(-1.05, 0.35, -2.47),
        new THREE.Vector3(-1.17, 0.35, -2.34),
        new THREE.Vector3(-2.22, 0.35, -2.34),
        new THREE.Vector3(-2.34, 0.35, -2.22),
        new THREE.Vector3(-2.34, 0.35, -0.37),
        new THREE.Vector3(-2.224, 0.35, -0.26),
        new THREE.Vector3(-1.67, 0.35, -0.26),
        new THREE.Vector3(-1.55, 0.35, -0.375),
        new THREE.Vector3(-1.55, 0.35, -0.66),

        new THREE.Vector3(-1.44, 0.35, -0.775),
        new THREE.Vector3(-0.13, 0.35, -0.775),
        new THREE.Vector3(-0, 0.35, -0.62),
        new THREE.Vector3(-0, 0.35, 1.18),
        new THREE.Vector3(-0.13, 0.35, 1.31),
        new THREE.Vector3(-0.655, 0.35, 1.31),
        new THREE.Vector3(-0.775, 0.35, 1.43),
        new THREE.Vector3(-0.775, 0.35, 2.22),
        new THREE.Vector3(-0.66, 0.35, 2.35),
    ], true, "catmullrom", 0.5);

    curve.tension = 0.2;

    const points = curve.getPoints(220);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    scene.add(curveObject);
    return curve;
}
