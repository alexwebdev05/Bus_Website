import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initOrbitControls(camera, rendererElement) {
    const controls = new OrbitControls(camera, rendererElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    return controls;
}