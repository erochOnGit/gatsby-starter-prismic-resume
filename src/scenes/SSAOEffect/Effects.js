import React, { useEffect, useRef } from 'react'
import { extend, useFrame, useThree } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass'

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  // WaterPass,
  // UnrealBloomPass,
  FilmPass,
  // GlitchPass,
  SSAOPass,
})

function Effects({ down }) {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  // const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
  useEffect(() => composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      {/* <waterPass attachArray="passes" factor={2} /> */}
      {/* <unrealBloomPass attachArray="passes" args={[aspect, 2, 1, 0]} /> */}
      <sSAOPass attachArray="passes" args={[scene, camera, 1024, 1024]} kernelRadius={0.8} maxDistance={0.4} />
      {/* <filmPass attachArray="passes" args={[0.25, 0.4, 1500, false]} /> */}

      {/* <glitchPass attachArray="passes" factor={down ? 1 : 0} /> */}
    </effectComposer>
  )
}

export default Effects
