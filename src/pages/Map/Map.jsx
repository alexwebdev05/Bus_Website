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
    renderer.setClearColor(0x17202A)

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.x = -2;
    camera.position.y = 5;

    // Scene
    const scene = new THREE.Scene();

    // Light
    const intensity = 5;
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    light.position.set(2, 4, 2);
    scene.add(light);

    // Object loader
    const loader = new GLTFLoader();
    let map, bus, signal
    const signals = []

    loader.load('/map1.glb', function(gltf) {
      map = gltf.scene;
      scene.add(map);
      render();
    }, undefined, function(error) {
      console.error(error);
    });

    loader.load('/bus.glb', function(gltf) {
      bus = gltf.scene;
      bus.position.set(0.4, 0.61, 2.35);
      bus.rotation.y = THREE.MathUtils.degToRad(90)
      scene.add(bus);
      render();
    }, undefined, function(error) {
      console.error(error);
    });

    // loader.load('/signal.glb', function(gltf) {
    //   signal = gltf.scene;
    //   signal.position.set(0.4, 1.1, 2.05);
    //   signal.scale.set(0.5, 0.5, 0.5)
    //   scene.add(signal);
    //   render();
    // }, undefined, function(error) {
    //   console.error(error);
    // });

    function addSignal(position, scale) {
      loader.load('/signal.glb', function(gltf) {
          let signal = gltf.scene;
          signal.traverse(function(child) {
            if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({ color: child.material.color });
            }
          });

          signal.position.set(position.x, position.y, position.z);
          signal.scale.set(scale.x, scale.y, scale.z);
          scene.add(signal);
          signals.push(signal); // Añadir la instancia de signal al array
          render();
  
          // Iniciar la animación si es la primera signal añadida
          if (signals.length === 1) {
              animate();
          }
      }, undefined, function(error) {
          console.error(error);
      });
    }

    addSignal(new THREE.Vector3(0.4, 1.1, 2.05), new THREE.Vector3(0.5, 0.5, 0.5));
    addSignal(new THREE.Vector3(1.44, 1.2, -1.08), new THREE.Vector3(0.5, 0.5, 0.5));
    addSignal(new THREE.Vector3(-1.35, 1.2, -2.6), new THREE.Vector3(0.5, 0.5, 0.5));
    addSignal(new THREE.Vector3(-2.6, 1.2, -0.6), new THREE.Vector3(0.5, 0.5, 0.5));
    addSignal(new THREE.Vector3(0.3, 1.2, -0.38), new THREE.Vector3(0.5, 0.5, 0.5));

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
      time *= 0.001;
      controls.update();
      const targetPosition = new THREE.Vector3();
      camera.getWorldPosition(targetPosition);

      signals.forEach(signal => {
          signal.lookAt(targetPosition);
      });
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
