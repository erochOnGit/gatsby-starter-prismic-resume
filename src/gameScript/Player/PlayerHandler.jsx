import React, { useRef, useEffect, useState } from "react";
import { useGame } from "../Game";
import { useGameObject } from "../GameObject";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import * as CANNON from "cannon";

//TODO : refactor all the attributes into only theirs names
let PlayerHandler = ({ children }) => {
  const { game } = useGame();
  const { attributes, attributesHandler} = useGameObject();
  const player = useRef({
    destinationMarker: [],
    speed: 10,
    setDestinationMarker,
  });
  const { destinationMarker, speed } = player.current;
  const setDestinationMarker = ({ destination }) => {
    if (destinationMarker.length < 1) {
      destinationMarker.push(destination);
      rotate({ to: destinationMarker[0] });
    }
    if (destinationMarker.length >= 1) {
      destinationMarker.shift();
      destinationMarker.push(destination);
      rotate({ to: destinationMarker[0] });
    }
  };
  player.current.setDestinationMarker = setDestinationMarker;
  const rotate = ({ to }) => {
    let from = attributes.body.position;
    let distance = new THREE.Vector3(from.x, from.y, from.z).sub(to);
    let directionA = new THREE.Vector3(1, 0, 0).normalize();
    let directionB = distance.clone().normalize();
    let rotationAngle = Math.acos(directionA.dot(directionB));
    let rotationAxis = directionA
      .clone()
      .cross(directionB)
      .normalize();
    attributes.body.quaternion.setFromAxisAngle(rotationAxis, rotationAngle);
  };
  const moveForward = () => {
    var localForward = new CANNON.Vec3(-1, 0, 0);
    var worldForward = new CANNON.Vec3();
    let forward = attributes.body.vectorToWorldFrame(
      localForward,
      worldForward
    );
    // forward.z = 0;
    //TODO : keep in mind that delta must be added
    forward.mult(speed, attributes.body.velocity);
  };
  // //TODO : Math compute doable in shader ?
  const isCloseWith = ({ destination }) => {
    let distance = Math.sqrt(
      Math.pow(attributes.body.position.x - destination.x, 2) +
        Math.pow(attributes.body.position.y - destination.y, 2)
    );

    return distance < 0.85 && distance > -0.85;
  };
  const update = () => {
    if (destinationMarker.length > 0) {
      moveForward();
      if (isCloseWith({ destination: destinationMarker[0] })) {
        destinationMarker.shift();
      }
    }
  };

  useEffect(() => {
    if (attributes.body) {
      attributes.body.angularDamping = 1;
    }
    game.addPlayer({ player: player.current });
  }, [attributes]);
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          //In event you can access intersection point and others porperties
        }
      },
      false
    );
  });
  useFrame((state, delta) => {
    update();
  });
  return <>{children}</>;
};

export default PlayerHandler;
