import React, { useRef, useEffect, useState } from "react";
// import { useGame } from "../Game";
import { useCannonAddBody } from "../../utils/useCannon";
import * as CANNON from "cannon";
// import Player from "./Player";

let PhysicHandler = ({ children, position, rotation }) => {
  // Register Character as a physics body with mass
  const [body] = useState(() => new CANNON.Body({ mass: 10000 }));

  const bodyRef = useCannonAddBody(body, (body) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
    body.position.set(...position);
  });

  return <>{children({ body, bodyRef })}</>;
};

export default PhysicHandler;
