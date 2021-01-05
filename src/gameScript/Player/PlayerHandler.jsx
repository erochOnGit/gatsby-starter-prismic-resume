import React, { useRef, useEffect ,useState } from "react"
import {useGame} from "../Game"
import Player from "./Player"
let PlayerHandler = ({children}) => {
    const [player] = useState(new Player({}))
    let bodyRef = useRef(); 
    let setRef = ({ ref })=>{
        bodyRef = ref
    }
    const {game} = useGame()
    useEffect(()=>{
        console.log(game, player, bodyRef)
        // game.addPlayer(
        // ) 
        // bodyRef
        player.setBody({body : bodyRef})
        game.addPlayer({player})
    },[])
    useEffect(()=>{
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              console.log("hah",bodyRef)
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
          }, false);
    })
    return (
    <>
        {children({setRef: setRef})}
    </>)
}

export default PlayerHandler