export default class Game {
  constructor() {
    this.players = [];
    this.meshes = [];
    this.ground = {};
  }
  addPlayer({ player }) {
    this.players.push(player);
  }
  addMesh({ meshRef }) {
    this.meshes.push(meshRef);
  }
  //TODO : refactor this in order to get the meshes in players
  //       or to add meshes when player is add
  getGameObjectById({ id }) {
    for (let index = 0; index < this.meshes.length; index++) {
      if (this.meshes[index].id === id) {
        return this.meshes[index];
      }
    }
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
