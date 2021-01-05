import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import React, { useRef } from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import CameraControl from "../utils/CameraControl";
import { CannonProvider } from '../utils/useCannon'
import { GameProvider } from '../gameScript/Game'
import PlayerHandler from '../gameScript/Player'
import GroundHandler from '../gameScript/Ground'
import Plane from "../components/simple/Plane"
import Box from "../components/simple/Box"
import Sphere from "../components/simple/Sphere"

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

function Lights() {
  return (
    <group>
      <pointLight position={[-10, -10, 30]} intensity={0.25} />
      <spotLight intensity={0.3} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
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
          camera={{ position: [0, -50,  40] }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.outputEncoding = THREE.sRGBEncoding
          }}
        >
          <GameProvider>
            <CameraControl/>
            <Lights />
            <CannonProvider>
            <GroundHandler>
                {({setRef, onClick}) => 
                  <Plane 
                    position={[0, 0, -10]} 
                    setRef={setRef}
                    onClick={onClick}
                  />
                }
              </GroundHandler>
              <Box   
                position={[0.5, 1.0, 20]}
              />
              <PlayerHandler>
                {({setRef}) => 
                    <Box   
                      position={[-5.5, -5.0, 30]}
                      setRef={setRef}
                    />
                }
                </PlayerHandler>
            </CannonProvider>
          </GameProvider>
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
