"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Three main
import createScene from "./scene/scene";
import createCamera from "./scene/camera";
import createRenderer from "./scene/renderer";

// Scene states
import createLights from "./scene/lighting";
import orbitControls from "./scene/orbitControls";

// Objects
import createMapCubeLand from "./scene/objects/createMapCubeLand";
import createSignal from "./scene/objects/createSignal";
import wayCubeLand from "./scene/objects/wayCubeLand";
import { createBus } from "./scene/objects/createBus";

// CSS
import style from "./style.module.css"

// Helpers
import { onWindowResize, addGridHelper, addAxisHelper } from './scene/utils/helpers';

export default function CubeLand() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Scene, Camera, and Renderer
    const scene: THREE.Scene = createScene();
    const camera: THREE.PerspectiveCamera = createCamera();
    const renderer = createRenderer()

    // Append renderer to the DOM
    const current = mountRef.current;
    if (current) {
      current.appendChild(renderer.domElement);
    }

    // Initialize Lights and Controls
    createLights(scene);
    const controls = orbitControls(camera, renderer.domElement);

    // Handle window resize
    onWindowResize(renderer, camera);

    // Object loader
    const loader = new GLTFLoader();

    // Create Objects
    createMapCubeLand(loader, scene);

    createBus(loader, scene)
    
    // Create Signals
    let signals: THREE.Object3D[] = [];
    createSignal(loader, scene, signals, new THREE.Vector3(0.4, 1.1, 2.05), new THREE.Vector3(0.5, 0.5, 0.5));
    createSignal(loader, scene, signals, new THREE.Vector3(1.44, 1.2, -1.08), new THREE.Vector3(0.5, 0.5, 0.5));
    createSignal(loader, scene, signals, new THREE.Vector3(-1.35, 1.2, -2.6), new THREE.Vector3(0.5, 0.5, 0.5));
    createSignal(loader, scene, signals, new THREE.Vector3(-2.6, 1.2, -0.6), new THREE.Vector3(0.5, 0.5, 0.5));
    createSignal(loader, scene, signals, new THREE.Vector3(0.3, 1.2, -0.38), new THREE.Vector3(0.5, 0.5, 0.5));

    // WayCubeLand setup
    wayCubeLand(scene);

    // Animation function
    const animate = (): void => {
      requestAnimationFrame(animate);
      controls.update();

      const targetPosition = new THREE.Vector3();
      camera.getWorldPosition(targetPosition);

      signals.forEach((signal: THREE.Object3D) => {
        signal.lookAt(targetPosition);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      controls.dispose();
      if (current) {
        current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div className={style.map} ref={mountRef} />;
}
