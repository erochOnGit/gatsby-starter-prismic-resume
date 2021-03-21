import React, { useRef, useEffect, useState } from "react";
import { useCannonWorld } from "../../utils/useCannon";
import * as CANNON from "cannon";
import { useGameObject, useBodyRef } from "../GameObject";
import * as THREE from "three";

let PhysicHandler = ({ children, position, rotation }) => {
  const { attributesHandler, attributes } = useGameObject();
  const { body, setBody } = attributes;
  const world = useCannonWorld();
  //TODO : check a way to put this ref into useBodyRef of GameObject

  useEffect(() => {
    if ((!body || body.constructor === THREE.Object3D) && setBody) {
      setBody(() => new CANNON.Body({ mass: 10000 }));
    }
  }, [setBody]);

  const bodyRef = useBodyRef(
    body,
    body && body.constructor !== THREE.Object3D
      ? (body) => {
          body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
          body.position.set(...position);
          world.addBody(body);
          return () => world.removeBody(body);
        }
      : null,
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
