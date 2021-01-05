import React, { useState, useEffect } from "react"
import { useCannon } from "../../../utils/useCannon"
import * as CANNON from 'cannon'

function Plane({ position, onClick, setRef }) {
    // Register plane as a physics body with zero mass
    const [body] = useState(() => new CANNON.Body({ mass: 0 }))
    const ref = useCannon(body, body => {
      body.addShape(new CANNON.Plane())
      body.position.set(...position)
    })

    useEffect(()=>{
      setRef && setRef({ref})
    },[])


    return (
      <mesh 
        name={"ground"}
        ref={ref} 
        receiveShadow
        onPointerDown={onClick}
      >
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" color="#171717" />
      </mesh>
    )
  }

  export default Plane