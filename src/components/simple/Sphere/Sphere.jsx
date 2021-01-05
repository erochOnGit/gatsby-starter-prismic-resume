import React, { useEffect, useState } from "react"
import {useCannon} from "../../../utils/useCannon"
import * as CANNON from 'cannon'
import { useFrame } from "react-three-fiber"

function Sphere({ position, setRef }) {
    // Register Sphere as a physics body with mass
  const [body] = useState(() => new CANNON.Body({ mass: 10000 }))

  const ref = useCannon(body, body => {
    body.addShape(new CANNON.Sphere(1))
    body.position.set(...position)
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
            body.position.z += 0.1
            
          }}
        >
        <sphereGeometry attach="geometry" args={[1, 32, 32]} />
        <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
        <axesHelper args={[2, 2, 2]} />
        <arrowHelper />
      </mesh>
  )
}

export default Sphere
