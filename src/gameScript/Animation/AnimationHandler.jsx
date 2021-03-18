import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useGameObject } from "../GameObject";
import { useFrame } from "react-three-fiber";
import { useFBXLoader } from "../FBXLoader";

let AnimationHandler = ({ children, animationUrls }) => {
  const { attributes } = useGameObject();
  const { loader } = useFBXLoader();
  const [mixer] = useState(() => new THREE.AnimationMixer());
  let animationsActions = useRef([]);
  let [activeAction, setActiveAction] = useState();
  let [lastAction, setLastAction] = useState();
  const { fbx, animatedRef, player, body, startingPosition } = attributes;

  useEffect(() => {
    // TODO : search a way to remove thoses conditions
    if (fbx && animatedRef && animatedRef.current) {
      for (let i = 0; i < animationUrls.length; i++) {
        loader.load(animationUrls[i], (loadedFbx) => {
          animationsActions.current[i] = mixer.clipAction(
            loadedFbx.animations[0],
            animatedRef.current
          );
        });
      }
    }
  }, [fbx, animatedRef, animatedRef?.current]);

  useEffect(() => {
    // TODO : search a way to remove thoses conditions
    if (
      player &&
      player?.destinationMarker &&
      animationsActions.current[player.destinationMarker.length] != activeAction
    ) {
      setLastAction(activeAction);
      setActiveAction(
        animationsActions.current[player.destinationMarker.length]
      );
    }
  }, [player, player?.destinationMarker, player?.destinationMarker?.length]);

  useEffect(() => {
    if (activeAction && lastAction) {
      lastAction.fadeOut(1);
      activeAction.reset();
      activeAction.fadeIn(1);
      activeAction.play();
      setLastAction(null);
      mixer.update(5);
    }
  }, [activeAction]);
  let distanceBetweenTwoPoint = (xa, ya, xb, yb) => {
    return Math.sqrt(Math.pow(xa - xb, 2) + Math.pow(ya - yb, 2));
  };
  useFrame((state, delta) => {
    // TODO : search a way to remove thoses conditions
    if (body && body.position && startingPosition) {
      if (
        Math.round(
          (distanceBetweenTwoPoint(
            body.position.x,
            body.position.y,
            startingPosition.x,
            startingPosition.y
          ) *
            100) %
            8
        ) == 0
      ) {
        mixer.update(10);
      }
    }
  });

  return <>{children}</>;
};

export default AnimationHandler;
