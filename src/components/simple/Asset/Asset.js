import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "react-three-fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

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

function Asset({ position, rotation, scale, url, animationUrls }) {
  const group = useRef();
  const fbx = useLoader(FBXLoader, url);
  // const [mixer] = useState(() => new THREE.AnimationMixer());
  // let animationsFbx = [];
  // let animationsActions = [];
  // let activeAction = useRef();
  // let lastAction = useRef();

  // for (let i = 0; i < animationUrls.length; i++) {
  //   animationsFbx.push(useLoader(FBXLoader, animationUrls[i]));
  // }

  // useEffect(() => {
  //   for (let i = 0; i < animationsFbx.length; i++) {
  //     animationsActions.push(
  //       mixer.clipAction(animationsFbx[i].animations[0], group.current)
  //     );
  //   }
  //   ({ activeAction, lastAction } = setAction({
  //     toAction: animationsActions[0],
  //     activeAction,
  //   }));
  // }, []);

  useMemo(
    () =>
      Object.values(fbx.children).forEach(
        (obj) => obj.isMesh && Object.assign(obj, { castShadow: true })
      ),
    [fbx.children]
  );

  // useEffect(
  //   () => void mixer.clipAction(fbx.animations[0], group.current).play(),
  //   []
  // );

  // useFrame((state, delta) => {
  //   mixer.update(delta);
  //   // console.log(delta);
  // });

  return (
    <primitive
      ref={group}
      position={position}
      rotation={rotation}
      scale={scale}
      scale={scale}
      castShadow
      receiveShadow
      object={fbx}
      dispose={null}
    />
  );
}

export default Asset;
