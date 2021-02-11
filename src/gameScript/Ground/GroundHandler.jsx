import React, { useRef, useEffect } from "react";
import { useGame } from "../Game";

let GroundHandler = ({ children }) => {
  let groundRef = useRef();
  const { game } = useGame();

  let setRef = ({ ref }) => {
    groundRef = ref;
  };

  let onClick = (e) => {
    e.intersections[0].point.z = -9;
    game.players[0] &&
      game.players[0].setDestinationMarker({
        destination: e.intersections[0].point,
      });
  };

  useEffect(() => {
    // check if we should pass the ref or it's current attribut
    game.setGround({ ground: groundRef.current });
  }, []);

  return <>{children({ setRef: setRef, onClick: onClick })}</>;
};

export default GroundHandler;
