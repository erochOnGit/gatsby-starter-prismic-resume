import { graphql } from "gatsby";
import React, { Suspense, useMemo } from "react";
import { Canvas, useLoader, useThree } from "react-three-fiber";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/core";
import * as THREE from "three";
import CameraControl from "../utils/CameraControl";
import RippleBox from "../components/RippleBox";
import img from "../assets/livre.jpg";


function ImageNoised(props) {
    const texture = useLoader(THREE.TextureLoader, img);
    const { clock } = useThree();
  
    const uniforms = useMemo(() => {
      return {
        time: { type: "f", value: clock.elapsedTime },
      };
    }, []);
  
    return (
      <mesh {...props}>
        <planeBufferGeometry attach="geometry" args={[2, 2.5]} />
        <rawShaderMaterial
          attach="material"
          transparent={true}
          uniforms={uniforms}
          fragmentShader={`
          // Author @patriciogv - 2015 - patriciogonzalezvivo.com
  
          #ifdef GL_ES
          precision mediump float;
          #endif
          varying vec2 vUv;
          uniform float time;
          vec2 skew (vec2 st) {
              vec2 r = vec2(0.0);
              r.x = 1.1547*st.x;
              r.y = st.y+0.5*r.x;
              return r;
          }
          
          // Simplex 2D noise
          //
          vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
          
          float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
              dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }
          
          void main() {
              vec2 st = vUv.xy;
              vec3 color = vec3(0.0);
          
              // Scale the space to see the grid
              st *= 10.;
          
              // Show the 2D grid
              color.rg = fract(st);
          
              // Skew the 2D grid
              // color.rg = fract(skew(st));
          
              // Subdivide the grid into to equilateral triangles
              // color = simplexGrid(st);
                color = vec3(2. - snoise(st.xy* time * 10.)-snoise(st.xy*time* 0.0005)-snoise(st.xy*time* 0.5));
              gl_FragColor = vec4(color + vec3(0.5, 0.2, 0.1), 1. - color.x);
            }
          `}
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
            }`}
        />
      </mesh>
    );
  }

  export default ImageNoised