import * as THREE from "three";
import React, { useEffect, useRef, useMemo } from "react";
import { useThree, useFrame, useLoader, extend } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { SsaoPass } from "three/examples/jsm/postprocessing/SSAOPass";

extend({ EffectComposer, RenderPass, ShaderPass, SsaoPass });

const DEFAULT_LAYER = 0;
const OCCLUSION_LAYER = 1;

function Effects() {
  const { gl, scene, camera, size } = useThree();
  const occlusionRenderTarget = useMemo(
    () => new THREE.WebGLRenderTarget(),
    []
  );
  const occlusionComposer = useRef();
  const composer = useRef();

  useEffect(() => {
    occlusionComposer.current.setSize(size.width, size.height);
    composer.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    camera.layers.set(OCCLUSION_LAYER);
    occlusionComposer.current.render();
    camera.layers.set(DEFAULT_LAYER);
    composer.current.render();
  }, 1);

  return (
    <>
      <mesh layers={OCCLUSION_LAYER} position={[0, 4.5, -10]}>
        <sphereBufferGeometry attach="geometry" args={[5, 32, 32]} />
        <meshBasicMaterial attach="material" />
      </mesh>
      <effectComposer
        ref={occlusionComposer}
        args={[gl, occlusionRenderTarget]}
        renderToScreen={false}
      >
        <renderPass attachArray="passes" args={[scene, camera]} />
        <ssaoPass
          attachArray="passes"
          args={[scene, camera, window.innerWidth, window.innerHeight]}
        />
      </effectComposer>
    </>
  );
}

export default Effects;
