import React, { useRef } from "react";
import { Global } from "@emotion/core";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber";
import CameraControl from "../utils/CameraControl";
import { CannonProvider } from "../utils/useCannon";
import { GameProvider } from "../gameScript/Game";
import { FBXLoaderProvider } from "../gameScript/FBXLoader";
import { globalStyle, Container, CanvasContainer } from "./style";
import { pageQuery } from "./fragment";
import Gallery from "../scenes/Gallery";
import MovingCharacter from "../scenes/MovingCharacter";

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
            gl.setClearColor("black");
          }}
        >
          <FBXLoaderProvider>
            <GameProvider>
              <CameraControl />
              <Lights />
              <CannonProvider debugRenderer={true}>
                <Gallery />
                {/* <MovingCharacter /> */}
              </CannonProvider>
            </GameProvider>
          </FBXLoaderProvider>
        </Canvas>
      </CanvasContainer>
    </Container>
  );
};

export { pageQuery };
