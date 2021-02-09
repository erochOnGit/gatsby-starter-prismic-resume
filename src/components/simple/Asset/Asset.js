import React, { useMemo } from "react";
import { useLoader } from "react-three-fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

function Asset({ position, rotation, scale, url }) {
  const fbx = useLoader(FBXLoader, url);

  useMemo(
    () =>
      Object.values(fbx.children).forEach(
        (obj) => obj.isMesh && Object.assign(obj, { castShadow: true })
      ),
    [fbx.children]
  );

  return (
    <primitive
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
