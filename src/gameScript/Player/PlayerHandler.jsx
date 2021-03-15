import React, { useRef, useEffect, useState } from "react";
import { useGame } from "../Game";
import { useGameObject } from "../GameObject";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import * as CANNON from "cannon";

//TODO : refactor all the attributes into only theirs names
let PlayerHandler = ({ children }) => {
  const { game } = useGame();
  const { attributes, attributesHandler } = useGameObject();
  const [player, setPlayer] = useState({
    destinationMarker: [],
    speed: 10,
    setDestinationMarker: () => {},
    startingPosition: attributes?.body
      ? new THREE.Vector3(
          attributes.body.position.x,
          attributes.body.position.y,
          attributes.body.position.z
        )
      : null,
  });
  const { destinationMarker, speed } = player;

  player.setDestinationMarker = ({ destination }) => {
    if (destinationMarker.length < 1) {
      destinationMarker.push(destination);
      setPlayer({ ...player, destinationMarker });
      rotate({ to: destinationMarker[0] });
    }
    if (destinationMarker.length >= 1) {
      destinationMarker.shift();
      destinationMarker.push(destination);
      setPlayer({ ...player, destinationMarker });
      rotate({ to: destinationMarker[0] });
    }
    setPlayer({
      ...player,
      startingPosition: new THREE.Vector3(
        attributes.body.position.x,
        attributes.body.position.y,
        attributes.body.position.z
      ),
    });
    console.log("niek\n\n\n");
    // console.log(player.startingPosition);
    console.log(attributes.body.position.x);
    console.log("\n\n\nniek");
  };

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
        setPlayer({ ...player, destinationMarker, startingPosition: null });
      }
    }
  };
  useEffect(() => {
    if (attributes.body) {
      attributes.body.angularDamping = 1;
    }
    game.addPlayer({ player: player });
  }, [attributes]);
  useEffect(() => {
    // console.log("uo", player.destinationMarker.length);
    attributesHandler({ att: { player: player } });
  }, [player.destinationMarker.length, player.startingPosition]);
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          //In event you can access intersection point and others properties
        }
      },
      false
    );
  });
  useFrame((state, delta) => {
    update();
    // console.log(player.destinationMarker.length);
  });
  return <>{children}</>;
};

export default PlayerHandler;
