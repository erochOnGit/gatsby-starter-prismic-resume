import React, { useState, useContext } from "react";
import Game from "./Game";

const GameContext = React.createContext();

export function GameProvider({ children }) {
  //TODO : make the game a local state like gameobject else nothing will update.
  const [game] = useState(new Game());

  return <GameContext.Provider value={game} children={children} />;
}

export function useGame() {
  const game = useContext(GameContext);
  return { game };
}
