// Libraries
import React, { useEffect, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// Modules
import { initOrbitControls } from '../controls/orbitControls';
import { createScene } from '../scene/createScene';
import { createRenderer } from '../scene/renderer'
import { createCamera } from '../scene/camera';
import { initLighting } from '../scene/lighting';
// Models
import { createMapCubeLand } from '../scene/objects/createMapCubeLand'
import { wayCubeLand } from '../scene/objects/wayCubeLand'
// Helpers
import { topView, onWindowResize, addGridHelper, addAxisHelper } from '../utils/helpers'

const CubeLand = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene
        const scene = createScene();
        const camera = createCamera();
        const renderer = createRenderer();
    
        initLighting(scene);
        const controls = initOrbitControls(camera, renderer.domElement);

        addGridHelper(scene);
        addAxisHelper(scene);

        onWindowResize(renderer, camera);

        // Object loader
        const loader = new GLTFLoader();

        // Objects
        createMapCubeLand(loader, scene);

        wayCubeLand(scene)

        // Utils
        const latitude = 6
        topView(camera, latitude)

        // Append renderer to DOM
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (mountRef.current && mountRef.current.removeChild) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };

    }, []);

    return <div id="mapa" ref={mountRef} />;
};

export default CubeLand;