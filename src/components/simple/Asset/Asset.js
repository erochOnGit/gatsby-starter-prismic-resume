import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import { useFBXLoader } from "../../../gameScript/FBXLoader";

function Asset({
  position,
  rotation,
  scale,
  url,
  animationUrls = [],
  animationId = 0,
  startingPoint,
  currentPoint,
}) {
  //TODO : to put in its own file in utils
  const [fbx, setFbx] = useState();
  const assetRef = useRef();
  const { loader } = useFBXLoader();
  const [mixer] = useState(() => new THREE.AnimationMixer());
  let animationsActions = useRef([]);
  let [activeAction, setActiveAction] = useState();
  let [lastAction, setLastAction] = useState();
  //loading mesh
  useEffect(() => void loader.load(url, setFbx), [url]);
  //shadows
  useMemo(
    () =>
      fbx &&
      Object.values(fbx.children).forEach(
        (obj) => obj.isMesh && Object.assign(obj, { castShadow: true })
      ),
    [fbx?.children]
  );
  // loading animations
  //TODO : make this trigger only when fbx and assetRef are not undefined and animationUrl is not length 0
  useEffect(() => {
    if (fbx && assetRef.current) {
      for (let i = 0; i < animationUrls.length; i++) {
        // console.log("arf", i, animationUrls[i]);
        loader.load(animationUrls[i], (fbx) => {
          animationsActions.current[i] = mixer.clipAction(
            fbx.animations[0],
            assetRef.current
          );
        });
      }
    }
  }, [fbx, assetRef.current]);

  useEffect(() => {
    if (animationsActions.current[animationId] != activeAction) {
      setLastAction(activeAction);
      setActiveAction(animationsActions.current[animationId]);
    }
  }, [animationId]);
  useEffect(() => {
    if (activeAction && lastAction) {
      lastAction.fadeOut(1);
      activeAction.reset();
      activeAction.fadeIn(1);
      activeAction.play();
    }
  }, [activeAction]);
  let distanceBetweenTwoPoint = (xa, ya, xb, yb) => {
    return Math.sqrt(Math.pow(xa - xb, 2) + Math.pow(ya - yb, 2));
  };
  let nbr = 0;
  useFrame((state, delta) => {
    //différence entre la distance et la distance précedente
    if (currentPoint && startingPoint) {
      if (
        Math.round(
          distanceBetweenTwoPoint(
            currentPoint.x,
            currentPoint.y,
            startingPoint.x,
            startingPoint.y
          )*10 % 8
        ) == 0
      ) {
        console.log("meh");
        mixer.update(10);
        nbr = Math.round(
          distanceBetweenTwoPoint(
            currentPoint.x,
            currentPoint.y,
            startingPoint.x,
            startingPoint.y
          ) % 16
        );
      }
    }
  });

  return fbx ? (
    <primitive
      ref={assetRef}
      position={position}
      rotation={rotation}
      scale={scale}
      object={fbx}
      dispose={null}
    />
  ) : null;
}

export default Asset;
