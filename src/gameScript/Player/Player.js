import * as THREE from "three"
export default class Player{
    constructor({ body }){
        this.body = body
        this.position
    }
    setBody({ body }){
        console.log(body)
        this.body = body
        this.position = body.position.clone()
    }
    rotate(axis, angle){
        this.body.quaternion.setFromAxisAngle(axis, angle);
        // this.body.position.set(this.position.x, this.position.y, this.position.z)
        // console.log(this.body.position)
        console.log(this.body)
    }
}