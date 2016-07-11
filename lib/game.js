const Ground = require('./ground');
const Turret = require('./turret');
const Gun = require('./gun');

class Game {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ground = new Ground(canvas);
    this.turret = new Turret(canvas);
    this.gun = new Gun(canvas);
    this.setKeyHandlers();
  }

  draw(){
    // this.background.draw();
    this.ground.draw();
    this.turret.draw();
    this.gun.draw(this.turret.fulcrum);
    this.turret.draw();
  }

  step(){
    this.gun.step();
  }

  setKeyHandlers(){
    document.addEventListener('keydown', (event) => {
      this.gun.handleKeyDown(event.keyIdentifier);
      this.handleKeyDown(event.keyIdentifier);
    });
    document.addEventListener('keyup', (event) => {
      this.gun.handleKeyUp(event.keyIdentifier);
    });
  }
}

module.exports = Game;
