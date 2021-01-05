import * as THREE from "three"

export default class Game {
    constructor(){
        this.players = []
        this.ground = {}
    }
    addPlayer ({ player })  {
        this.players.push(player)
    }
    getPlayerById({ id }) {
        for (let index = 0; index < this.meshes.length; index++) {
            if(this.meshes[index].id === id){
                return this.meshes[index]
            }      
        }
    }
    getPlayerByName({ name }) {
        for (let index = 0; index < this.meshes.length; index++) {
            if(this.meshes[index].name === name){
                return this.meshes[index]
            }      
        }
    }
    setGround({ ground }) {
        this.ground = ground
    }
    MakePlayerBehave({ to }) {
        let from = this.players[0].body.position
        let distance = new THREE.Vector3(from.x, from.y, from.z).sub(to);
        let directionA = new THREE.Vector3(1, 0, 0).normalize();
        let directionB = distance.clone().normalize();
        let rotationAngle = Math.acos(directionA.dot(directionB));
        let rotationAxis = directionA.clone().cross(directionB).normalize();
        
        this.players[0].rotate(rotationAxis, rotationAngle);
    }
}
