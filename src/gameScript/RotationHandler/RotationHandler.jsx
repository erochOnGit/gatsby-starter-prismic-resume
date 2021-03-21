import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useCannonAddBody } from "../../utils/useCannon";
import * as CANNON from "cannon";
import { useGameObject } from "../GameObject";
import { useGame } from "../Game";
import { useThree } from "react-three-fiber";
import { useFrame } from "react-three-fiber";

let RotationHandler = ({ children, position, rotation }) => {
  const { attributes } = useGameObject();
  const { game } = useGame();
  // console.log("rotation", attributes);
  const { bodyRef } = attributes;
  const {
    scene, // Default scene
  } = useThree();

  const rotate = ({ to }) => {
    let from = bodyRef.current.position;
    let distance = new THREE.Vector3(from.x, from.y, from.z).sub(to);
    let directionA = new THREE.Vector3(1, 0, 0).normalize();
    let directionB = distance.clone().normalize();
    let rotationAngle = Math.acos(directionA.dot(directionB));
    let rotationAxis = directionA
      .clone()
      .cross(directionB)
      .normalize();
    bodyRef.current.quaternion.setFromAxisAngle(rotationAxis, rotationAngle);
  };

  useEffect(() => {
    if (bodyRef && game.meshes) {
      // console.log("position", game.meshes);
      // console.log("rotationing?²", bodyRef);
      // rotate(new THREE.Vector3(0, 0, 0));
    }
  }, [bodyRef]);

  useFrame((state) => {
    if (bodyRef && game.meshes.length > 0) {
      // console.log("position", game.meshes[0]);
      // console.log("rotationing?²", bodyRef);
      // console.log("rotationing?²", scene);
      // console.log(game.meshes[0].current.position);
      // rotate({ to: new THREE.Vector3(0, 1, 1) });
      // console.log(state.clock.elapsedTime * 0.1);
      // bodyRef.current.lookAt(
      //   new THREE.Vector3(0, state.clock.elapsedTime * 0.1, 0)
      // );
    }
  });

  return <>{children}</>;
};

export default RotationHandler;
