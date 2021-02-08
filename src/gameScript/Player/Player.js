import * as THREE from "three";
import * as CANNON from "cannon";

export default class Player {
  constructor({ body }) {
    this.body = body;
    this.position;
    this.speed = 10;
    this.destinationMarker = [];
  }
  setBody({ body }) {
    this.body = body;
    this.position = body.position.clone();
    this.body.angularDamping = 1;
  }
  setDestinationMarker({ destination }) {
    if (this.destinationMarker.length < 1) {
      this.destinationMarker.push(destination);
      this.rotate({ to: this.destinationMarker[0] });
    }
    if (this.destinationMarker.length >= 1) {
      this.destinationMarker.shift();
      this.destinationMarker.push(destination);
      this.rotate({ to: this.destinationMarker[0] });
    }
  }
  rotate({ to }) {
    let from = this.body.position;
    let distance = new THREE.Vector3(from.x, from.y, from.z).sub(to);
    let directionA = new THREE.Vector3(1, 0, 0).normalize();
    let directionB = distance.clone().normalize();
    let rotationAngle = Math.acos(directionA.dot(directionB));
    let rotationAxis = directionA
      .clone()
      .cross(directionB)
      .normalize();
    this.body.quaternion.setFromAxisAngle(rotationAxis, rotationAngle);
  }
  moveForward() {
    var localForward = new CANNON.Vec3(-1, 0, 0);
    var worldForward = new CANNON.Vec3();
    let forward = this.body.vectorToWorldFrame(localForward, worldForward);

    // forward.z = 0;
    //TODO : keep in mind that delta must be added
    forward.mult(this.speed, this.body.velocity);
  }
  //TODO : Math compute doable in shader ?
  isCloseWith({ destination }) {
    let distance = Math.sqrt(
      Math.pow(this.body.position.x - destination.x, 2) +
        Math.pow(this.body.position.y - destination.y, 2)
    );

    return distance < 0.85 && distance > -0.85;
  }
  update() {
    if (this.destinationMarker.length > 0) {
      this.moveForward();
      if (this.isCloseWith({ destination: this.destinationMarker[0] })) {
        this.destinationMarker.shift();
      }
    }
  }
}
