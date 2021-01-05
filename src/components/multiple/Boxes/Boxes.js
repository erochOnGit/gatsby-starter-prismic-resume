import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";


function Boxes({
  material: Material = "meshStandardMaterial",
  amount = 100,
  spread = 6,
  color,
  ...props
}) {
  const mesh = useRef();
  const dummy = new THREE.Object3D();
  const rps = () => spread / 2 - Math.random() * spread;
  const coords = useMemo(
    () => new Array(amount).fill().map(() => [rps(), rps(), rps()]),
    [amount]
  );

  useEffect((state) => {
    coords.forEach(([x, y, z], i) => {
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh
      ref={mesh}
      args={[null, null, amount]}
      {...props}
      receiveShadow
      castShadow
    >
      <boxBufferGeometry attach="geometry" />
      <Material attach="material" color={color} roughness={1} />
    </instancedMesh>
  );
}

export default Boxes;