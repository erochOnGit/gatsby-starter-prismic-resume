import React, { Suspense } from "react";
import GroundHandler from "../../gameScript/Ground";
import Plane from "../../components/simple/Plane";
import Box from "../../components/simple/Box";
import { GameObjectProvider } from "../../gameScript/GameObject";
import RippleBox from "../../components/simple/RippleBox";
import ArtWork from "../../components/simple/ArtWork";
import RotationHandler from "../../gameScript/RotationHandler";
import Player from "../../components/complex/Player";

const Gallery = () => {
  return (
    <>
      <GroundHandler>
        {({ setRef, onClick }) => (
          <Plane position={[0, 0, -10]} setRef={setRef} onClick={onClick} />
        )}
      </GroundHandler>
      <Box position={[0.5, 1.0, 20]} />
      <Box position={[-5.5, -5.0, 30]} />
      <RippleBox position={[-0, -5.0, 12]} />
      <Player />
      <Suspense fallback={null}>
        {new Array(300).fill().map((elt, index) => (
          <GameObjectProvider>
            <ArtWork
              position={[Math.sin(index) * index, Math.cos(index) * index, 0]}
            />
            <RotationHandler />
          </GameObjectProvider>
        ))}
      </Suspense>
    </>
  );
};
export default Gallery;
