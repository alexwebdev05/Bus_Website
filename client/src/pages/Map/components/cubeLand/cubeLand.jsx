// Libraries
import { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// Modules
import { initOrbitControls } from '../../controls/orbitControls';
import { createScene } from '../../scene/createScene';
import { createRenderer } from '../../scene/renderer'
import { createCamera } from '../../scene/camera';
import { initLighting } from '../../scene/lighting';
// Models
import { createMapCubeLand } from '../../scene/objects/createMapCubeLand'
import { wayCubeLand } from '../../scene/objects/wayCubeLand'
import { createSignal } from '../../scene/objects/createSignal'
// Helpers
import { onWindowResize, addGridHelper, addAxisHelper } from '../../utils/helpers'
import { createBus } from '../../scene/objects/createBus';


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

      let signals = [];
      createSignal(loader, scene, signals, new THREE.Vector3(0.4, 1.1, 2.05), new THREE.Vector3(0.5, 0.5, 0.5))
      createSignal(loader, scene, signals, new THREE.Vector3(1.44, 1.2, -1.08), new THREE.Vector3(0.5, 0.5, 0.5))
      createSignal(loader, scene, signals, new THREE.Vector3(-1.35, 1.2, -2.6), new THREE.Vector3(0.5, 0.5, 0.5))
      createSignal(loader, scene, signals, new THREE.Vector3(-2.6, 1.2, -0.6), new THREE.Vector3(0.5, 0.5, 0.5))
      createSignal(loader, scene, signals, new THREE.Vector3(0.3, 1.2, -0.38), new THREE.Vector3(0.5, 0.5, 0.5))

      wayCubeLand(scene)

      createBus(loader, scene);

      // Utils
      // const latitude = 6
      // topView(camera, latitude)

      // Append renderer to DOM
      const current = mountRef.current
      if (current) {
        current.appendChild(renderer.domElement);
      }

      // Animation
      const animate = () => {
          requestAnimationFrame(animate);
          controls.update();

          const targetPosition = new THREE.Vector3();
          camera.getWorldPosition(targetPosition);

          signals.forEach(signal => {
            signal.lookAt(targetPosition); 
          });

          renderer.render(scene, camera);
      };
      animate();

      return () => {
        if (current && current.removeChild) {
          current.removeChild(renderer.domElement);
        }
      };

    }, []);

    return <div id="mapa" ref={mountRef} />;
};

export default CubeLand;