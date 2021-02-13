import React, { useEffect, useRef } from "react";
import { useCannonAddBody } from "../../../utils/useCannon";
import * as CANNON from "cannon";
import Asset from "../Asset";
import { useGameObject } from "../../../gameScript/GameObject";

const Character = ({ position, rotation, scale }) => {
  const { attributes } = useGameObject();
  return (
    <group
      ref={attributes.bodyRef}
      dispose={null}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <Asset
        animation={false}
        position={[0, 0, -20]} //depend on the mesh you're using
        rotation={[Math.PI / 2, -Math.PI / 2, 0]} //depend on the mesh you're using
        url={"/3D/walking.fbx"}
        animationUrls={["/3D/ybot.fbx", "/3D/walking.fbx"]}
      ></Asset>
    </group>
  );
};

export default Character;
