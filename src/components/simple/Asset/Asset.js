import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import { useFBXLoader } from "../../../gameScript/FBXLoader";

//TODO : to put in its own file in utils
const setAction = ({ toAction, activeAction }) => {
  let lastAction;
  if (toAction != activeAction.current) {
    lastAction = activeAction;
    activeAction.current = toAction;
    lastAction.current.stop();
    //lastAction.fadeOut(1)
    activeAction.current.reset();
    //activeAction.fadeIn(1)
    activeAction.current.play();
  }
  return { activeAction, lastAction };
};

function Asset({ position, rotation, scale, url, animationUrls = [] }) {
  //TODO : to put in its own file in utils
  const [fbx, setFbx] = useState();
  const assetRef = useRef();
  const { loader } = useFBXLoader();
  const [mixer] = useState(() => new THREE.AnimationMixer());
  let animationsActions = [];
  let activeAction = useRef();
  let lastAction = useRef();

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
        console.log("url", url, animationUrls.length, assetRef.current);
        loader.load(animationUrls[i], (fbx) => {
          animationsActions.push(
            mixer.clipAction(fbx.animations[0], assetRef.current)
          );
          // console.log(animationsActions[0]);
          if (animationsActions[0]) {
            ({ activeAction, lastAction } = setAction({
              toAction: animationsActions[0],
              activeAction,
            }));
          }
        });
      }
    }
  }, [fbx, assetRef.current]);

  useFrame((state, delta) => {
    mixer.update(delta);
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
