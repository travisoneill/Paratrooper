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
}

module.exports = Game;
