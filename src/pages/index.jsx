import { graphql } from "gatsby";
import React, { Suspense, useCallback, useRef, useMemo } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/core";
import CameraControl from "../utils/CameraControl";
import Effects from "../components/Swarm/Effects";
const globalStyle = css`
  html,
  body,
  h1,
  #___gatsby,
  #gatsby-focus-wrapper {
    margin: 0;
    padding: 0;
    border: 0;
  }
  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    width: 100vw;
    height: 100vh;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: white;
`;
const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

function Swarm({ count, mouse }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(1.5, Math.cos(t) * 5);
      particle.mx += (mouse.current[0] - particle.mx) * 0.02;
      particle.my += (-mouse.current[1] - particle.my) * 0.02;
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
        <meshPhongMaterial attach="material" color="white" />
      </instancedMesh>
    </>
  );
}

function Lights() {
  return (
    <group>
      <ambientLight intensity={1} />
      <pointLight position={[100, 100, 100]} intensity={2.2} />
      <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
    </group>
  );
}

export default (props) => {
  const data = props.data && props.data.allPrismicMarque.nodes[0].data;
  const mouse = useRef([0, 0]);

  return (
    <Container>
      <Global styles={globalStyle} />
      <h1>{data && data.title.text}</h1>
      <CanvasContainer>
        <Canvas
          gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
          camera={{ fov: 75, position: [0, 0, 70] }}
          onCreated={({ gl }) => {
            gl.setClearColor("white");
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.outputEncoding = THREE.sRGBEncoding;
          }}
        >
          <CameraControl />
          <Lights />
          <pointLight position={[10, 10, 10]} />
          {/* <RippleBox position={[0, 0, 0]} /> */}
          <Swarm mouse={mouse} count={150} />
          {/* <Suspense fallback={null}>
            <Effects />
          </Suspense> */}
        </Canvas>
      </CanvasContainer>
    </Container>
  );
};

export const pageQuery = graphql`
  query MyQuery {
    allPrismicMarque {
      nodes {
        data {
          title {
            text
          }
          reinsurance {
            text
          }
        }
      }
    }
  }
`;
