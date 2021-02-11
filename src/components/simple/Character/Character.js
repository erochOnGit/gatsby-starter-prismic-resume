import React, { useState, useEffect, useMemo } from "react";
import { useCannonAddBody } from "../../../utils/useCannon";
import * as CANNON from "cannon";
import Asset from "../Asset";

function Character({ position, rotation, scale, bodyRef }) {
  // // Register Character as a physics body with mass
  // const [body] = useState(() => new CANNON.Body({ mass: 10000 }));

  // const group = useCannonAddBody(body, (body) => {
  //   body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
  //   body.position.set(...position);
  // });

  // useEffect(() => {
  //   setBodyState && setBodyState({ state: body });
  // }, []);

  // useEffect(() => {
  //   console.log("bodyboot", body);
  // }, [body]);
  return (
    <group ref={bodyRef} dispose={null}>
      <Asset
        animation={false}
        position={[0, 0, -1]} //depend on the mesh you're using
        scale={scale}
        rotation={rotation}
        url={"/3D/walking.fbx"}
        animationUrls={["/3D/ybot.fbx", "/3D/walking.fbx"]} // make the animation object so that we can access them directly by their names
      ></Asset>
    </group>
  );
}

export default Character;
