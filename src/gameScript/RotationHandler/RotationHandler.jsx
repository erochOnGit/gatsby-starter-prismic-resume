import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGameObject, useBodyRef } from "../GameObject";
import { useGame } from "../Game";
import { useThree } from "react-three-fiber";
import { useFrame } from "react-three-fiber";

let RotationHandler = ({ children, position, rotation }) => {
  const { attributes, attributesHandler } = useGameObject();
  const { game } = useGame();
  const { body } = attributes;
  // const {
  //   scene, // Default scene
  // } = useThree();

  const bodyRef = useBodyRef(body, null, [body]);
  useEffect(() => {
    if (bodyRef) {
      attributesHandler({ att: { bodyRef: bodyRef } });
    }
  }, [bodyRef]);

  const rotate = ({ to }) => {
    let from = attributes.body.position;
    let distance = new THREE.Vector3(from.x, from.y, from.z).sub(to);
    let directionA = new THREE.Vector3(0, 0, 1).normalize();
    let directionB = distance.clone().normalize();
    let rotationAngle = Math.acos(directionA.dot(directionB));
    let rotationAxis = directionA
      .clone()
      .cross(directionB)
      .normalize();
    attributes.body.quaternion.setFromAxisAngle(rotationAxis, rotationAngle);
  };

  useFrame((state) => {
    if (body && game.meshes.length > 0) {
      rotate({
        to: new THREE.Vector3(
          -game.meshes[0].current.position.x,
          -game.meshes[0].current.position.y,
          0
        ),
      });
    }
  });

  return <>{children}</>;
};

export default RotationHandler;
