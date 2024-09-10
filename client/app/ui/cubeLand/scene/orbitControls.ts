import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function orbitControls(camera: THREE.Camera, rendererElement: HTMLElement) {
    const controls = new OrbitControls(camera, rendererElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    return controls;
}