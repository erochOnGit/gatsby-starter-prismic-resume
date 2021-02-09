import React, { useState, useEffect } from "react";
import { useCannonAddBody } from "../../../utils/useCannon";
import * as CANNON from "cannon";
import { useFrame } from "react-three-fiber";

function Box({ position, setRef }) {
  // Register box as a physics body with mass
  const [body] = useState(() => new CANNON.Body({ mass: 10000 }));

  const ref = useCannonAddBody(body, (body) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
    body.position.set(...position);
  });

  useEffect(() => {
    setRef && setRef({ ref: body });
  }, []);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
      <arrowHelper />
    </mesh>
  );
}

export default Box;
