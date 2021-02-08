import React, { useState, useContext } from "react";
import Game from "./Game";
import { useFrame } from "react-three-fiber";

const GameContext = React.createContext();

export function GameProvider({ children }) {
  const [game] = useState(new Game());
  useFrame((state, delta) => {
    game.update();
  });
  return <GameContext.Provider value={game} children={children} />;
}

export function useGame() {
  const game = useContext(GameContext);
  return { game };
}
