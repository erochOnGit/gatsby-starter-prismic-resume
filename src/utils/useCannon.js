import * as CANNON from "cannon";
import * as THREE from "three";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import AddCannonDebugRendererToThree from "./AddCannonDebugRendererToThree.js";

AddCannonDebugRendererToThree({ THREE, CANNON });

// Cannon-world context provider
const CannonContext = React.createContext();
export function CannonProvider({ children, debugRenderer = false }) {
  // Set up physics
  const [world] = useState(() => new CANNON.World());
  const { scene } = useThree();
  useEffect(() => {
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    world.gravity.set(0, 0, -25);
  }, [world]);
  const cannonDebugRenderer = new THREE.CannonDebugRenderer(scene, world);

  // Run world stepper every frame
  useFrame(() => {
    world.step(1 / 60);
    if (debugRenderer) {
      cannonDebugRenderer.update();
    }
  });
  // Distribute world via context
  return <CannonContext.Provider value={world} children={children} />;
}
export function useCannonWorld() {
  return useContext(CannonContext);
}

//TODO : OLD TO BE REMOVE
// Custom hook to maintain a world physics body
export function useCannonAddBody(body, fn, deps = []) {
  const ref = useRef();
  // Get cannon world object
  const world = useContext(CannonContext);
  // Instanciate a physics body
  useEffect(() => {
    // Call function so the user can add shapes
    fn(body);
    // Add body to world on mount
    world.addBody(body);
    // Remove body on unmount
    return () => world.removeBody(body);
  }, deps);

  useFrame(() => {
    if (ref.current) {
      // Transport cannon physics into the referenced threejs object
      ref.current.position.copy(body.position);
      ref.current.quaternion.copy(body.quaternion);
    }
  });

  return ref;
}
