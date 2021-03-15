import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { graphql } from "gatsby";
import { Global } from "@emotion/core";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber";
import CameraControl from "../utils/CameraControl";
import { CannonProvider } from "../utils/useCannon";
import { GameProvider } from "../gameScript/Game";
import PlayerHandler from "../gameScript/Player";
import PhysicHandler from "../gameScript/PhysicBody";
import GroundHandler from "../gameScript/Ground";
import { FBXLoaderProvider } from "../gameScript/FBXLoader";
import Plane from "../components/simple/Plane";
import Box from "../components/simple/Box";
import Character from "../components/simple/Character";
import GameObject, { GameObjectProvider } from "../gameScript/GameObject";
import { globalStyle, Container, CanvasContainer } from "./style";
import { pageQuery } from "./fragment";
import RippleBox from "../components/simple/RippleBox";
function Lights() {
  return (
    <group>
      <pointLight position={[-10, -10, 30]} intensity={0.25} />
      <spotLight
        intensity={0.3}
        position={[30, 30, 50]}
        angle={0.2}
        penumbra={1}
        castShadow
      />
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
          shadowMap
          camera={{ position: [0, -50, 40] }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.outputEncoding = THREE.sRGBEncoding;
          }}
        >
          <FBXLoaderProvider>
            <GameProvider>
              <CameraControl />
              <Lights />
              <CannonProvider debugRenderer={true}>
                <GroundHandler>
                  {({ setRef, onClick }) => (
                    <Plane
                      position={[0, 0, -10]}
                      setRef={setRef}
                      onClick={onClick}
                    />
                  )}
                </GroundHandler>
                <Box position={[0.5, 1.0, 20]} />
                <Suspense fallback={null}>
                  {/* //TODO : faire le test avec plusieurs gameObject et ensuite faire l'animation au déplacement du perso */}
                  {/* <GameObjectProvider>
                    <Character scale={[0.05, 0.05, 0.05]} />
                    <PlayerHandler />
                    <PhysicHandler position={[0, -15, 25]} />
                  </GameObjectProvider> */}
                  <GameObjectProvider>
                    <Character scale={[0.1, 0.1, 0.1]} />
                    <PlayerHandler />
                    <PhysicHandler position={[0, 0, 25]} />
                  </GameObjectProvider>
                </Suspense>
                <Box position={[-5.5, -5.0, 30]} />
              </CannonProvider>
            </GameProvider>
            <RippleBox position={[-0, -5.0, 12]} />
          </FBXLoaderProvider>
        </Canvas>
      </CanvasContainer>
    </Container>
  );
};

export { pageQuery };
