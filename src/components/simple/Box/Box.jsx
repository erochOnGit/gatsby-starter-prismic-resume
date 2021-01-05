import React, { useState, useEffect } from "react"
import {useCannon} from "../../../utils/useCannon"
import * as CANNON from 'cannon'
import {  useFrame } from "react-three-fiber";

function Box({ position, setRef }) {
    // Register box as a physics body with mass
  const [body] = useState(() => new CANNON.Body({ mass: 10000 }))

    const ref = useCannon(body, body => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)))
      body.position.set(...position)
    })

    useFrame((state, delta)=>{
      // console.log(state, delta, ref)
    })

    
    useEffect(()=>{
      setRef && setRef({ref : body})
    },[])



    return (
      <mesh 
          ref={ref} 
          castShadow 
          receiveShadow 
          onClick={()=>{
            // body.position.set(...position)
            body.velocity.x += 10
            console.log(ref.current.getWorldDirection())
          }}
        >
        <boxGeometry attach="geometry" args={[2, 2, 2]} />
        <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
        <arrowHelper />
      </mesh>
    )
  }

export default Box
