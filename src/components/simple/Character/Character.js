import React, { useState, useEffect, useMemo, useRef } from "react";
import { useCannonAddBody } from "../../../utils/useCannon";
import * as CANNON from "cannon";
import Asset from "../Asset";

function Character({ position, rotation, scale }) {
  // useMemo(() => {
  //   bodyRef = bodyRef ? bodyRef : useRef();
  // }, [bodyRef]);
  const bodyRef = useRef();
  return (
    <group
      ref={bodyRef}
      dispose={null}
      position={position}
      scale={scale}
      rotation={rotation}
    >
      <Asset
        animation={false}
        position={[0, 0, -1]} //depend on the mesh you're using
        url={"/3D/walking.fbx"}
        animationUrls={["/3D/ybot.fbx", "/3D/walking.fbx"]} // make the animation object so that we can access them directly by their names
      ></Asset>
    </group>
  );
}

export default Character;
