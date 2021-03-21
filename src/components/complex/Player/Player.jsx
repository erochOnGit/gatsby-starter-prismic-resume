import React, { Suspense } from "react";
import PlayerHandler from "../../../gameScript/Player";
import PhysicHandler from "../../../gameScript/PhysicHandler";
import AnimationHandler from "../../../gameScript/Animation";
import Character from "../../../components/simple/Character";
import { GameObjectProvider } from "../../../gameScript/GameObject";

const Player = () => {
  return (
    <Suspense fallback={null}>
      <GameObjectProvider>
        <Character scale={[0.1, 0.1, 0.1]} />
        <AnimationHandler animationUrls={["/3D/idle.fbx", "/3D/walking.fbx"]} />
        <PhysicHandler position={[0, 0, 25]} />
        <PlayerHandler />
      </GameObjectProvider>
    </Suspense>
  );
};

export default Player;
