import React, { useState, useEffect, useMemo } from "react";
import { useCannonAddBody } from "../../../utils/useCannon";
import * as CANNON from "cannon";
import Asset from "../Asset";

function Character({ position, rotation, scale, setRef }) {
  // Register Character as a physics body with mass
  const [body] = useState(() => new CANNON.Body({ mass: 10000 }));

  const ref = useCannonAddBody(body, (body) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
    body.position.set(...position);
  });


  useEffect(() => {
    setRef && setRef({ ref: body });
  }, []);

  return (
    <group ref={ref} dispose={null}>
      <Asset
        position={[0, 0, -1]}//depend on the mesh you're using 
        scale={scale}
        rotation={rotation}
        url={"/3D/ybot.fbx"}
      ></Asset>
    </group>
  );
}

export default Character;
