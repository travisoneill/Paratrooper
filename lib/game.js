const Ground = require('./ground');
const Turret = require('./turret');
const Gun = require('./gun');
const Bullet = require('./bullet');
const Helicopter = require('./helicopter');
const Trooper = require('./trooper');

class Game {
  constructor(canvas, images){
    this.images = images;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ground = new Ground(canvas, images);
    this.turret = new Turret(canvas);
    this.gun = new Gun(canvas);
    this.bullets = [];
    this.helicopters = [];
    this.troopers = [];
    this.countl = 0;
    this.countr = 0;
    this.trooperMap = this.makeMap();
    this.status = true;
    this.timeout = false;
    // this.helicopters = [new Helicopter(canvas, images, "r", 200)];
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
    this.renderTroopers();
    // this.helicopters[0].draw();
  }

  step(){
    this.gun.step();
    this.bullets.forEach( (bullet) => {
      bullet.step();
    });
    this.helicopters.forEach( (helicopter) => {
      helicopter.step();
    });
    this.troopers.forEach( (trooper) => {
      trooper.step();
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
    if(rand % 2 === 0){dir = "l";}
    let height = 50 + rand;
    return new Helicopter(this.canvas, this.images, dir, height);
  }

  renderTroopers(){
    let update = [];
    for (let i = 0; i < this.troopers.length; i++) {
      if(this.troopers[i].status === true){
        update.push(this.troopers[i]);
      }
    }
    this.troopers = update;

    this.helicopters.forEach( (helicopter) => {

        let rand = Math.floor(Math.random() * 10000);
        if(helicopter.x > 350 && helicopter.x < 450){rand = 1000;}
        const game = this;
        if(rand < 10){
          game.troopers.push(new Trooper(game.canvas,
                                         game.images,
                                         this.troopers,
                                         helicopter));
        }

    });
    this.countl = 0;
    this.countr = 0;
    this.troopers.forEach( (trooper) => {
      if(trooper.landed === true && trooper.side === "l"){this.countl += 1;}
      if(trooper.landed === true && trooper.side === "r"){this.countr += 1;}
      trooper.draw();
    });

    if(this.countl > 3){this.deathSequence("l");}
    if(this.countr > 3){this.deathSequence("r");}
    if(this.countr <= 3 && this.countl <= 3){this.status = true;}
  }

  deathSequence(side){
    if(this.status === true){
      let troopers = this.troopers.filter( t => t.side === side && t.landed === true);
      troopers.sort( (a, b) => {
        Math.abs(a.x - 400) + Math.abs(b.x - 400);
      });
      [this.t0, this.t1, this.t2, this.t3] = troopers;
      this.status = side;
    }

    let v = this.status === "l" ? 1 : -1;

    let [t0, t1, t2, t3] = [this.t0, this.t1, this.t2, this.t3];

    t0.vx = Math.abs(t0.x + 4 - 400) > 52 ? v : 0;

    if(Math.abs(t0.x + 4 - 400) === 52){
      t1.vx = Math.abs(t1.x + 4 - 400) > 60 ? v : 0;
    }

    if(Math.abs(t1.x + 4 - 400) === 60 && this.timeout === false){
        let game = this;
        setTimeout(function(){
          t1.x += v * 8;
          t1.y -= 16;
          game.timeout = false;
        }, 200);
        this.timeout = true;
    }

    if(Math.abs(t1.x + 4 - 400) === 52){
      t2.vx = Math.abs(t2.x + 4 - 400) > 60 ? v : 0;
    }

    if(Math.abs(t2.x + 4 - 400) === 60){
      t3.vx = Math.abs(t3.x + 4 - 400) > 68 ? v : 0;
    }

    if(Math.abs(t3.x + 4 - 400) === 68 && this.timeout === false){
      let game = this;
      this.interval = setInterval(function(){
        t3.x += v * 8;
        t3.y -= 16;
      }, 200);
      this.timeout = true;
    }
    if(t3.y === 104){this.status = false;}

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
      this.helicopterLogic(bullet);
      this.trooperLogic(bullet);
    }
  }

  trooperLogic(bullet){
    for (let i = 0; i < this.troopers.length; i++) {
      let trooper = this.troopers[i];
      if(this.intersectTrooper(trooper, bullet)){
        trooper.chute = false;
        trooper.status = false;
      } else if(this.intersectChute(trooper, bullet)){
        trooper.chute = false;
        trooper.velocity = 2;
      }
    }
  }

  helicopterLogic(bullet){
    for (let j = 0; j < this.helicopters.length; j++) {
      let helicopter = this.helicopters[j];
      if(bullet.x > helicopter.x &&
         bullet.x < helicopter.x + 48 &&
         bullet.y > helicopter.y &&
         bullet.y < helicopter.y + 20){
           helicopter.status = false;
           bullet.status = false;
         }
    }
  }

  intersectTrooper(trooper, bullet){
    const tx = trooper.x;
    const ty = trooper.y;
    const bx = bullet.x;
    const by = bullet.y;
    if(bx > tx && bx < tx + 8 && by > ty && by < ty + 16){
      return true;
    }
    return false;
  }

  intersectChute(trooper, bullet){
    const tx = trooper.x;
    const ty = trooper.y;
    const bx = bullet.x;
    const by = bullet.y;
    if(bx > tx - 8 && bx < tx + 16 && by < ty && by > ty -28){
      return true;
    }
    return false;
  }

  makeMap(){
    let map = {};
    for (let i = 0; i < 101; i++) {
      map[i] = 0;
    }
    return map;
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
