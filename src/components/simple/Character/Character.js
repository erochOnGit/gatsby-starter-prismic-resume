import React, { useState } from "react";
import { useCannonAddBody } from "../../../utils/useCannon";
import * as CANNON from "cannon";
import Asset from "../Asset";

const Character = ({ position, rotation, scale, bodyRef }) => {
  // const [body] = useState(() => new CANNON.Body({ mass: 10000 }));

  // const myref = useCannonAddBody(body, (body) => {
  //   body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
  //   body.position.set(...position);
  // });

  return (
    <group
      ref={bodyRef}
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
