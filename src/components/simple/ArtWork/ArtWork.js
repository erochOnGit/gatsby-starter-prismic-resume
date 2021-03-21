import React, { useEffect, useRef, useState } from "react";
import { useGameObject } from "../../../gameScript/GameObject";
import * as THREE from "three";

function ArtWork({ position, rotation, scale, url }) {
  const { attributes, attributesHandler } = useGameObject();
  const [body, setBody] = useState(new THREE.Object3D());
  //initialization of bodyRef.
  //Might be recreated via another script
  //here in order to push it in gameobject from the start
  const bodyRef = useRef();

  useEffect(() => {
    body.position.set(position[0], position[1], position[2]);
    attributesHandler({
      att: { bodyRef: bodyRef, setBody: setBody },
    });
  }, []);
  useEffect(() => {
    attributesHandler({
      att: { body: body },
    });
  }, [body]);

  return (
    <mesh
      ref={attributes.bodyRef}
      rotation={[Math.PI / 2, -Math.PI / 2, 0]}
      position={[10, 10, 10]}
    >
      <planeBufferGeometry attach="geometry" args={[5, 3]} />
      <meshBasicMaterial attach="material" color={"orange"} />
    </mesh>
  );
}

export default ArtWork;
