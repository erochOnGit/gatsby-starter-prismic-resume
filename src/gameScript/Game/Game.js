export default class Game {
  constructor() {
    this.players = [];
    this.ground = {};
    this.destinationMarker = [];
  }
  addPlayer({ player }) {
    this.players.push(player);
  }
  getPlayerById({ id }) {
    for (let index = 0; index < this.meshes.length; index++) {
      if (this.meshes[index].id === id) {
        return this.meshes[index];
      }
    }
  }
  getPlayerByName({ name }) {
    for (let index = 0; index < this.meshes.length; index++) {
      if (this.meshes[index].name === name) {
        return this.meshes[index];
      }
    }
  }
  setGround({ ground }) {
    this.ground = ground;
  }
}
