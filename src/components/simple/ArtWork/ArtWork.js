import React, { useEffect, useRef } from "react";
import { useGameObject } from "../../../gameScript/GameObject";

function ArtWork({ position, rotation, scale, url }) {
  const { attributesHandler } = useGameObject();
  const bodyRef = useRef();

  useEffect(() => {
    attributesHandler({ att: { bodyRef: bodyRef } });
  }, []);

  return (
    <mesh
      ref={bodyRef}
      rotation={[Math.PI / 2, -Math.PI / 2, 0]}
      position={[10, 10, 10]}
    >
      <planeBufferGeometry attach="geometry" args={[5, 3]} />
      <meshBasicMaterial attach="material" color={"orange"} />
    </mesh>
  );
}

export default ArtWork;
