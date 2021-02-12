import React, { useState, useContext } from "react";
import GameObject from "./GameObject";
import { useFrame } from "react-three-fiber";

const GameObjectContext = React.createContext();

export function GameObjectProvider({ children }) {
  const [gameObject] = useState(new GameObject());
  useFrame((state, delta) => {
    gameObject.update();
  });
  return <GameObjectContext.Provider value={gameObject} children={children} />;
}

export function useGameObject() {
  const gameObject = useContext(GameObjectContext);
  return { gameObject };
}
