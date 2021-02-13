import React, { useState, useContext } from "react";

const GameObjectContext = React.createContext();

export function GameObjectProvider({ children }) {
  //TODO : have a state for the function to update with useframe ?
  const [attributes, setAttributes] = useState({});
  const attributesHandler = ({ att }) => {
    setAttributes(Object.assign(new Object(), attributes, att));
  };
  return (
    <GameObjectContext.Provider
      value={{ attributes, attributesHandler }}
      children={children}
    />
  );
}

export function useGameObject() {
  const { attributes, attributesHandler } = useContext(GameObjectContext);
  return { attributes, attributesHandler };
}
