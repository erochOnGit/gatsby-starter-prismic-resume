import React, { useMemo, useRef, useState, useEffect } from "react";
import { useFBXLoader } from "../../../gameScript/FBXLoader";
import { useGameObject } from "../../../gameScript/GameObject";

function Asset({ position, rotation, scale, url }) {
  const [fbx, setFbx] = useState();
  const { attributes, attributesHandler } = useGameObject();
  const { loader } = useFBXLoader();
  const animatedRef = useRef();

  useEffect(() => {
    console.warn("fbx is being updated");
    attributesHandler({ att: { fbx: fbx, animatedRef: animatedRef } });
  }, [fbx]);
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

  return fbx ? (
    <primitive
      ref={attributes.animatedRef}
      position={position}
      rotation={rotation}
      scale={scale}
      object={fbx}
      dispose={null}
    />
  ) : null;
}

export default Asset;
