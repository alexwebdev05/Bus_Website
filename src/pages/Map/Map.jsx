// Libraries
// import * as THREE from 'three';
// // Styles
// import './Map.scss';
// // Modules
// import { initOrbitControls } from './controls/orbitControls';
// import { createScene } from './scene/createScene';
// import { createCamera } from './scene/camera';
// import { initLighting } from './scene/lighting';
// // Helpers
// import { topView } from './utils/helpers';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { useEffect } from 'react';

// function Map() {
//   useEffect(() => {
//     // Initialize Three.js
//     const canvas = document.querySelector('#map');

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0xD4E6F1);

//     // Camera
//     const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 5;
//     camera.position.x = -2;
//     camera.position.y = 5;

//     // Scene
//     createScene()

//     // Light
//     const intensity = 5;
//     const light = new THREE.DirectionalLight(0xffffff, intensity);
//     light.position.set(2, 4, 2);
//     scene.add(light);

//     // Object loader
//     const loader = new GLTFLoader();
//     let map, bus;
//     const signals = [];

//     const loadMap = () => {
//       loader.load('/way_cubeLand.glb', function(gltf) {
//         map = gltf.scene;
//         scene.add(map);
//       }, undefined, function(error) {
//         console.error(error);
//       });
//     };

//     const loadBus = () => {
//       loader.load('/bus.glb', function(gltf) {
//         bus = gltf.scene;
//         scene.add(bus);
//       }, undefined, function(error) {
//         console.error(error);
//       });
//     };

//     loadMap();
//     // loadBus();

//     // Signals
//     function addSignal(position, scale) {
//       loader.load('/signal.glb', function(gltf) {
//         let signal = gltf.scene;
//         signal.traverse(function(child) {
//           if (child.isMesh) {
//             child.material = new THREE.MeshBasicMaterial({ color: child.material.color });
//           }
//         });

//         signal.position.set(position.x, position.y, position.z);
//         signal.scale.set(scale.x, scale.y, scale.z);
//         scene.add(signal);
//         signals.push(signal);
//         render();

//         if (signals.length === 1) {
//           requestAnimationFrame(render);
//         }
//       }, undefined, function(error) {
//         console.error(error);
//       });
//     }

//     // Curve
//     const curve = new THREE.CatmullRomCurve3([
//       new THREE.Vector3(0.4, 0.5, 2.32),
//       new THREE.Vector3(0.78, 0.5, 2.32),
//       new THREE.Vector3(0.78, 0.5, 1.6),
//       new THREE.Vector3(1.55, 0.5, 1.6),
//       new THREE.Vector3(1.55, 0.5, 0.8),
//       new THREE.Vector3(2.1, 0.5, 0.8),
//     ])

//     const points = curve.getPoints(5);

//     const geometry = new THREE.BufferGeometry().setFromPoints(points);

//     const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

//     // create the final object to add to the scene
//     const curveObject = new THREE.Line(geometry, material);
//     scene.add(curveObject)


//     addSignal(new THREE.Vector3(0.4, 1.1, 2.05), new THREE.Vector3(0.5, 0.5, 0.5));
//     addSignal(new THREE.Vector3(1.44, 1.2, -1.08), new THREE.Vector3(0.5, 0.5, 0.5));
//     addSignal(new THREE.Vector3(-1.35, 1.2, -2.6), new THREE.Vector3(0.5, 0.5, 0.5));
//     addSignal(new THREE.Vector3(-2.6, 1.2, -0.6), new THREE.Vector3(0.5, 0.5, 0.5));
//     addSignal(new THREE.Vector3(0.3, 1.2, -0.38), new THREE.Vector3(0.5, 0.5, 0.5));

//     // OrbitControls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.25;
//     controls.screenSpacePanning = false;
//     controls.minDistance = 1;
//     controls.maxDistance = 500;
//     controls.maxPolarAngle = Math.PI / 2;

//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     // Animation loop
//     const render = () => {
//       // Three.js
//       controls.update();
//       const targetPosition = new THREE.Vector3();
//       camera.getWorldPosition(targetPosition);

//       signals.forEach(signal => {
//         signal.lookAt(targetPosition);
//       });
//       renderer.render(scene, camera);
//       requestAnimationFrame(render);
//     };

//     // Cleanup on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       controls.dispose();
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <>
//       <canvas id="map"></canvas>
//     </>
//   );
// }

// export default Map;

import React from 'react';
import CubeLand from './components/cubeLand';
import './Map.scss';

function Map() {
  return (
    <div className='app'>
      <CubeLand />
    </div>
  );
};

export default Map;