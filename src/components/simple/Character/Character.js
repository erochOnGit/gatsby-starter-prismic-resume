import React, { useRef, useEffect } from "react";
import Asset from "../Asset";
import { useGameObject } from "../../../gameScript/GameObject";

const Character = ({ position, rotation, scale }) => {
  const { attributesHandler, attributes } = useGameObject();
  const bodyRef = useRef();
  useEffect(() => {
    attributesHandler({ att: { bodyRef: bodyRef } });
  }, []);

  return (
    <group
      ref={attributes.bodyRef}
      dispose={null}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <Asset
        position={[0, 0, -10]} //depend on the mesh you're using
        rotation={[Math.PI / 2, -Math.PI / 2, 0]} //depend on the mesh you're using
        url={"/3D/ybot.fbx"}
      ></Asset>
    </group>
  );
};

export default Character;
