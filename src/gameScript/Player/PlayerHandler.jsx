import React, { useRef, useEffect, useState } from "react";
import { useGame } from "../Game";
import Player from "./Player";

let PlayerHandler = ({ children, body, bodyRef }) => {
  const [player] = useState(new Player({}));
  const { game } = useGame();
  useEffect(() => {
    player.setBody({ body: body });
    game.addPlayer({ player });
    // bodyRef.toto = true;
  }, []);
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          console.log("hah", bodyRef);
          //in event you can access intersection point and others porperties
        }
      },
      false
    );
  });
  return <>{children({ bodyRef })}</>;
};

export default PlayerHandler;
