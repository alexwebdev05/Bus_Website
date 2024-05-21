import './Map.scss';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useEffect } from 'react';

function Map() {
  useEffect(() => {
    // Initialize Three.js
    const canvas = document.querySelector('#map');

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xECDFFF)

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 130;

    // Scene
    const scene = new THREE.Scene();

    // Light
    const intensity = 1;
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    light.position.set(-2, 4, -2);
    scene.add(light);

    // Object loader
    const loader = new GLTFLoader();
    loader.load('/map1.glb', function(gltf) {
      scene.add(gltf.scene);
      render();
    }, undefined, function(error) {
      console.error(error);
    });

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const render = (time) => {
      time *= 0.001; // convert time to seconds
      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas id="map"></canvas>
    </>
  );
}

export default Map;
