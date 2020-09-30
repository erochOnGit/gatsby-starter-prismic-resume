import React, { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import GPUSim from "../../utils/GPUSim";

const getEmptyData = (width, height) => {
  var len = width * height * 3;
  var data = new Float32Array(len);
  while (len--) data[len] = 0.0;
  return data;
};

function RippleBox(props) {
  const { gl } = useThree();
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // const { clicking } = props;
  // Set up state for the hovered and active state
  const [clicked, setClicked] = useState(false);
  const [active, setActive] = useState(false);
  let vec2null = new THREE.Vector2(0);
  var textureWidth = 1024;
  var textureHeight = 1024;
  var data = getEmptyData(textureWidth, textureHeight);

  var initTexture = new THREE.DataTexture(
    data,
    textureWidth,
    textureHeight,
    THREE.RGBFormat,
    THREE.FloatType
  );
  initTexture.needsUpdate = true;

  let vert = `
    precision highp float;
    attribute vec3 position;
    attribute vec2 uv;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );
    }
  `;
  let frag = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D inputTexture;
    uniform vec2 pointer;
  
  
    vec4 get(float x,float y){
      vec2 oneRes = vUv.xy/gl_FragCoord.xy;
      return texture2D(inputTexture,
        (gl_FragCoord.xy+vec2(x,y))*oneRes).rgba;
    }
  
    void main() {
      float current =
       (get(-5.,0.).r+
        get(5.,0.).r+
        get(0.,-5.).r+
        get(0.,5.).r)/2.-
        get(0.,0.).g;
  
        float tap=.05;
        if(pointer.x!=0.){
            float distancePointerPixel=distance(pointer.xy,vUv.xy);
            if(distancePointerPixel<tap){
                current = 1.;
            }
        }
  
        if(current < 0.03){
          current = 0.;    
        }
        if(current > 1.){
          current = 1.;    
        }
  
        gl_FragColor = vec4(current, get(0.,0.).r, 0., 1.);
    }
  `;

  const colorMaterial = new THREE.RawShaderMaterial({
    uniforms: {
      //inputTexture is the backbuffer
      inputTexture: { type: "t", value: null },
      initTexture: { type: "t", value: initTexture },
      pointer: { value: vec2null },
    },
    // side: THREE.BackSide,
    transparent: true,
    vertexShader: vert,
    fragmentShader: frag,
  });

  const colorFBO = new GPUSim(gl, textureWidth, textureHeight, colorMaterial);
  colorMaterial.uniforms.initTexture.value = null;

  useFrame(({ mouse }) => {
    colorFBO.render();
    mesh.current.material.uniforms.color.value =
      colorFBO.fbos[colorFBO.current].texture;
    colorMaterial.uniforms.pointer.value = vec2null;
  });

  const uniforms = useMemo(() => {
    return {
      pointer: { type: "vec2", value: vec2null },
      color: { type: "t", value: null },
    };
  }, []);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1.5, 1.5, 1.5]}
      onPointerDown={(e) => {
        mesh.current.material.uniforms.pointer.value = e.intersections[0].uv;
        colorMaterial.uniforms.pointer.value = e.intersections[0].uv;
        colorFBO.render();
      }}
      // onPointerDown={(e) => setClicked(true)}
      // onPointerUp={(e) => setClicked.render()}
      onPointerMove={(e) => {
        mesh.current.material.uniforms.pointer.value = e.intersections[0].uv;
        colorMaterial.uniforms.pointer.value = e.intersections[0].uv;
      }}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <rawShaderMaterial
        attach="material"
        uniforms={uniforms}
        vertexShader={`
            precision highp float;
            attribute vec3 position;
            attribute vec2 uv;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );
            }
          `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform vec2 pointer;
          uniform sampler2D color;
        
          void main() {
            vec4 col = texture2D(color, vUv);
            gl_FragColor = vec4(1.-col.x,1.-col.y,1.-col.z,1.);
          }
          `}
      />
    </mesh>
  );
}

export default RippleBox