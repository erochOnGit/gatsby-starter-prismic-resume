import React, { Suspense } from "react";
import { CannonProvider } from "../../utils/useCannon";
import PlayerHandler from "../../gameScript/Player";
import PhysicHandler from "../../gameScript/PhysicHandler";
import AnimationHandler from "../../gameScript/Animation";
import GroundHandler from "../../gameScript/Ground";
import Plane from "../../components/simple/Plane";
import Box from "../../components/simple/Box";
import Character from "../../components/simple/Character";
import { GameObjectProvider } from "../../gameScript/GameObject";
import RippleBox from "../../components/simple/RippleBox";

const MovingCharacter = () => {
  return (
    <>
      <GroundHandler>
        {({ setRef, onClick }) => (
          <Plane position={[0, 0, -10]} setRef={setRef} onClick={onClick} />
        )}
      </GroundHandler>
      <Suspense fallback={null}>
        <GameObjectProvider>
          <Character scale={[0.1, 0.1, 0.1]} />
          <AnimationHandler
            animationUrls={["/3D/idle.fbx", "/3D/walking.fbx"]}
          />
          <PhysicHandler position={[0, 0, 25]} />
          <PlayerHandler />
        </GameObjectProvider>
      </Suspense>
      <Box position={[0.5, 1.0, 20]} />
      <Box position={[-5.5, -5.0, 30]} />
      <RippleBox position={[-0, -5.0, 12]} />
    </>
  );
};
export default MovingCharacter;
