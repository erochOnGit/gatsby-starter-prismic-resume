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
          // console.log(e)
          // if(e.intersections[0].object.name==="name"){
          //   let to = intersections[0].point
          //   let distance = new Vector3(from.x, from.y, from.z).sub(to.x, to.y, to.z);
          //   // axis = new Vector3(0, 1, 0);
          //   // direction = distance.clone().normalize();

          //   // right = (axis.clone().cross(direction));
          //   // up = (distance.clone().cross(right));

          //   // float angle = (float) Math.acos((up.dot(direction)/ (up.length() * direction.length())));
          //   // bondObject.rotateLocal(angle, direction.x , direction.y, direction.z);
          // }
        }
      },
      false
    );
  });
  return <>{children({ bodyRef })}</>;
};

export default PlayerHandler;
