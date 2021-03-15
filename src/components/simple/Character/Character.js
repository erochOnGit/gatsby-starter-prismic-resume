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
      {/* //TODO remove animation from asset */}
      <Asset
        animationId={
          attributes.player && attributes.player.destinationMarker.length
        }
        startingPoint={attributes.player && attributes.player.startingPosition}
        currentPoint={attributes.body && attributes.body.position}
        position={[0, 0, -10]} //depend on the mesh you're using
        rotation={[Math.PI / 2, -Math.PI / 2, 0]} //depend on the mesh you're using
        url={"/3D/ybot.fbx"}
        animationUrls={["/3D/idle.fbx", "/3D/walking.fbx"]}
      ></Asset>
    </group>
  );
};


export default Character;
