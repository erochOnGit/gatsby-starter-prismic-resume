import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useGame } from "../Game";
import { useFrame } from "react-three-fiber";

const GameObjectContext = React.createContext();

export function GameObjectProvider({ children }) {
  //TODO : have a state for the function to update with useframe ?
  const [attributes, setAttributes] = useState({});
  const [shouldUpdateAttribute, setShouldUpdateAttribute] = useState(false);
  const attributesTab = useRef([]);
  const { bodyRef } = attributes;
  const { game } = useGame();

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

  useEffect(() => {
    if (bodyRef) {
      game.addMesh({ meshRef: bodyRef });
    }
  }, [bodyRef]);
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

// Custom hook to maintain ref body for gameObject
export function useBodyRef(ref, body, effect, deps = []) {
  // Instanciate things
  useEffect(() => {
    if (body) {
      // Execute initialization code and get the unmount function 
      return effect(body);
    }
  }, deps);

  // update information from state to ref.
  useFrame(() => {
    if (ref.current && body) {
      // Transport state infos into the referenced object
      ref.current.position.copy(body.position);
      ref.current.quaternion.copy(body.quaternion);
    }
  });
}
