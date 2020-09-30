import React from "react";
import {  useLoader } from "react-three-fiber";
import * as THREE from "three";

function Image({img}) {
  const texture = useLoader(THREE.TextureLoader, img);
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[5, 3]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}

export default Image;
