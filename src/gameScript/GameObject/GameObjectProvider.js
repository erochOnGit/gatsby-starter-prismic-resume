import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";

const GameObjectContext = React.createContext();

export function GameObjectProvider({ children }) {
  //TODO : have a state for the function to update with useframe ?
  const [attributes, setAttributes] = useState({});
  const [shouldUpdateAttribute, setShouldUpdateAttribute] = useState(false);
  const attributesTab = useRef([]);
  const attributesHandler = useCallback(({ att }) => {
    attributesTab.current.push(att);
    setShouldUpdateAttribute(true);
  });
  useEffect(() => {
    if (shouldUpdateAttribute) {
      setAttributes(
        Object.assign(
          {},
          attributes,
          attributesTab.current.reduce((acc, curr) => {
            return { ...acc, ...curr };
          }, {})
        )
      );
      attributesTab.current = [];
      setShouldUpdateAttribute(false);
    }
  }, [shouldUpdateAttribute]);

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
