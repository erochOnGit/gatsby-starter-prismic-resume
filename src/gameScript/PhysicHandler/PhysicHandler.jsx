import React, { useRef, useEffect, useState } from "react";
import { useCannonAddBody } from "../../utils/useCannon";
import * as CANNON from "cannon";
import { useGameObject } from "../GameObject";

let PhysicHandler = ({ children, position, rotation }) => {
  const { attributesHandler } = useGameObject();

  const [body] = useState(() => new CANNON.Body({ mass: 10000 }));

  const bodyRef = useCannonAddBody(body, (body) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
    body.position.set(...position);
  });

  useEffect(() => {
    attributesHandler({ att: { body: body, bodyRef: bodyRef } });
  }, []);

  return <>{children}</>;
};

export default PhysicHandler;
