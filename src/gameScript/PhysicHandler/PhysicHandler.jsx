import React, { useRef, useEffect, useState } from "react";
import { useCannonAddBody, useCannonWorld } from "../../utils/useCannon";
import * as CANNON from "cannon";
import { useGameObject, useBodyRef } from "../GameObject";
import { useFrame } from "react-three-fiber";

let PhysicHandler = ({ children, position, rotation }) => {
  const { attributesHandler, attributes } = useGameObject();
  const { body, setBody } = attributes;
  const world = useCannonWorld();
  //TODO : check a way to put this ref into useBodyRef of GameObject
  let bodyRef = useRef();

  useEffect(() => {
    if (!body && setBody) {
      setBody(() => new CANNON.Body({ mass: 10000 }));
    }
  }, [setBody]);

  useBodyRef(
    bodyRef,
    body,
    (body) => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
      body.position.set(...position);
      world.addBody(body);
      return () => world.removeBody(body);
    },
    [body]
  );

  useEffect(() => {
    if (bodyRef) {
      attributesHandler({ att: { bodyRef: bodyRef } });
    }
  }, [bodyRef]);

  return <>{children}</>;
};

export default PhysicHandler;
