import React,{useState} from "react";
import { Provider } from '../../utils/useCannon'
import Plane from "../../components/simple/Plane"
import Box from "../../components/simple/Box"

const CannonCubes = () =>{
  const [showPlane, set] = useState(true)

    const Boxes = new Array(100).fill().map((index) =>{
        let rdm = Math.random(index)
        return rdm
      })

    return (<Provider>
            <Plane position={[0, 0, -10]} />
            {showPlane && <Plane position={[0, 0, 0]} />}
            { Boxes.map((rdm, index)=>{
                return  <Box key={rdm+index} position={[Math.sin(rdm)*30, Math.abs(rdm*30), Math.cos(rdm)*10]} />
                })}
            {!showPlane && <Box position={[0.5, 1.0, 20]} />}
        </Provider>)
}
export default CannonCubes