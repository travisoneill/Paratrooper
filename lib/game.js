const Ground = require('./ground');
const Turret = require('./turret');
const Gun = require('./gun');
const Bullet = require('./bullet');
const Helicopter = require('./helicopter');

class Game {
  constructor(canvas, images){
    this.images = images;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ground = new Ground(canvas);
    this.turret = new Turret(canvas);
    this.gun = new Gun(canvas);
    this.bullets = [];
    this.helicopters = [];
    this.setKeyHandlers();
  }

  draw(){
    // this.background.draw();
    this.checkCollisions();
    this.ground.draw();
    this.turret.draw();
    this.gun.draw(this.turret.fulcrum);
    this.turret.draw();
    this.renderBullets();
    this.renderHelicopters();

  }

  step(){
    this.gun.step();
    this.bullets.forEach( (bullet) => {
      bullet.step();
    });
    this.helicopters.forEach( (helicopter) => {
      helicopter.step();
    });
  }

  renderBullets(){
    let update = [];
    for (let i = 0; i < this.bullets.length; i++) {
      if(this.inBounds(this.bullets[i]) && this.bullets[i].status === true){
        update.push(this.bullets[i]);
      }
    }
    this.bullets = update;
    // console.log(this.bullets);
    this.bullets.forEach( (bullet) => {
      bullet.draw();
    });
  }

  renderHelicopters(){
    let update = [];
    for (let i = 0; i < this.helicopters.length; i++) {
      if(this.inBounds(this.helicopters[i]) && this.helicopters[i].status === true){
        update.push(this.helicopters[i]);
      }
    }
    this.helicopters = update;

    let rand = Math.floor(Math.random() * 10000);
    if(rand < 200){
      let helicopter = this.randomHelicopter(rand);
      this.helicopters.push(helicopter);
    }

    this.helicopters.forEach( (helicopter) => {
      helicopter.draw();
    });
  }

  randomHelicopter(rand){
    let dir = "r";
    console.log(rand);
    if(rand % 2 === 0){dir = "l";}
    let height = 50 + rand;
    return new Helicopter(this.canvas, this.images, dir, height);
  }

  inBounds(object){
    return object.y >= 0 &&
           object.y <= this.canvas.height &&
           object.x >= -60 &&
           object.x <= this.canvas.width;
  }

  checkCollisions(){
    for (let i = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];
      for (let j = 0; j < this.helicopters.length; j++) {
        let helicopter = this.helicopters[j];
        if(bullet.x > helicopter.x &&
           bullet.x < helicopter.x + 48 &&
           bullet.y > helicopter.y &&
           bullet.x < helicopter.y + 20){
             helicopter.status = false;
             bullet.status = false;
           }
      }
    }
  }

  handleKeyDown(code){
    if(code === "Space" || code === "ArrowUp"){
      this.bullets.push(new Bullet(this.canvas, this.turret.fulcrum, this.gun.theta));
    }
  }

  setKeyHandlers(){
    document.addEventListener('keydown', (event) => {
      this.gun.handleKeyDown(event.keyIdentifier);
      // console.log(event);
      this.handleKeyDown(event.code);
    });
    document.addEventListener('keyup', (event) => {
      this.gun.handleKeyUp(event.keyIdentifier);
    });
  }
}

module.exports = Game;
