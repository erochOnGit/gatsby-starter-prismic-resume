import React, { useRef, useEffect, useState } from "react";
// import { useGame } from "../Game";
import { useCannonAddBody } from "../../utils/useCannon";
import * as CANNON from "cannon";
import { useGameObject } from "../GameObject";
// import Player from "./Player";

let PhysicHandler = ({ children, position, rotation }) => {
  const { attributesHandler } = useGameObject();
  // Register Character as a physics body with mass
  const [body] = useState(() => new CANNON.Body({ mass: 10000 }));

  const bodyRef = useCannonAddBody(body, (body) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
    body.position.set(...position);
  });
  //TODO : refactor with physicHandler name
  useEffect(() => {
    attributesHandler({ att: { body: body, bodyRef: bodyRef } });
  }, []);

  return <>{children}</>;
};

export default PhysicHandler;
