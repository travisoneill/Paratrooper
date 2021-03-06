const Ground = require('./ground');
const Turret = require('./turret');
const Gun = require('./gun');
const Bullet = require('./bullet');
const Helicopter = require('./helicopter');
const Trooper = require('./trooper');
const Bomber = require('./bomber');
const Bomb = require('./bomb');
const StateMachine = require('./state_machine');

class Game {
  constructor(canvas, images){
    this.images = images;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.score = 0;
    this.level = 0;
    this.ground = new Ground(canvas, images);
    this.turret = new Turret(canvas);
    this.gun = new Gun(canvas);
    this.bullets = [];
    this.helicopters = [];
    this.troopers = [];
    this.bombers = [];
    this.bombs = [];
    this.countl = 0; //counts troopers on left side
    this.countr = 0; //counts troopers on left side
    this.killCount = 0;
    this.status = "startup";
    this.timeout = false;
    this.phase = "helicopter"; //sets initial ai attack mode
    this.setKeyHandlers();
  }

  draw(){
    //title screen
    if(this.status === "startup"){
      this.ctx.drawImage(this.images.title, 175, 100);
      this.ctx.drawImage(this.images.start_text, 132, 250);
      this.ctx.drawImage(this.images.instructions, 50, 300);
    } else { this.animateGame();}
  }

  animateGame(){
    this.checkCollisions();
    this.ground.draw(this.score);
    this.turret.draw();
    this.gun.draw(this.turret.fulcrum);
    this.turret.draw();
    this.renderBullets();
    this.renderHelicopters();
    this.renderTroopers();
    this.renderBombers();
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
    this.bombers.forEach( (bomber) => {
      bomber.step();
    });
    this.bombs.forEach( (bomb) => {
      bomb.step();
    });
    //increments level based on kill count. Switches to bomber attack on level up
    if(this.killCount > 0 && this.killCount >= 5 + 20 * this.level + 3 * this.level * this.level){
      this.phase = "bomber";
      this.level += 1;
    }
  }

  renderBombers(){
    if(this.phase === "bomber" && this.helicopters.length === 0){
      this.bombers.push(new Bomber(this.canvas, this.images, ~~(Math.random()*2), this.level));
      this.phase = "helicopter";
    }
    let update = [];
    this.bombers.forEach( (bomber) => {
      //removes bombers when shot or off screen
      if(bomber.status){
        update.push(bomber);
        bomber.draw();
        //drops bomb at set position
        if(Math.abs(380 - bomber.x) < 325 && bomber.payload === true){
          this.bombs.push(new Bomb(this.canvas, bomber));
          bomber.payload = false;
        }
        //detects bullet/bomber collision, sets hit bomber to false and increments score
        this.bullets.forEach( (bullet) => {
          if(bullet.x > bomber.x && bullet.x < bomber.x + 48 && bullet.y > bomber.y && bullet.y < bomber.y + 20){
            bullet.status = false;
            bomber.status = false;
            this.score += 20;
          }
        });
      }
    });
    this.bombers = update;

    let update2 = [];
    this.bombs.forEach( (bomb) => {
      bomb.draw();
      // detects bullet bomb collisions
      this.bullets.forEach( (bullet) => {
        if(bullet.x > bomb.x -5 && bullet.x < bomb.x + 5 && bullet.y > bomb.y -5 && bullet.y < bomb.y + 5){
          bullet.status = false;
          bomb.status = false;
          this.score += 20;
        }
      });
      if(bomb.status === true){update2.push(bomb);}
      //destroys turret and triggers game over on bomb hit
      if(bomb.y > 500){
        this.gun.status = false;
        this.turret.status = false;
        let game = this;
        setTimeout(function(){game.status = false;}, 2000);
      }
    });
    this.bombs = update2;
  }
  //draws bullets and removes bullets off screen
  renderBullets(){
    let update = [];
    for (let i = 0; i < this.bullets.length; i++) {
      if(this.inBounds(this.bullets[i]) && this.bullets[i].status === true){
        update.push(this.bullets[i]);
      }
    }
    this.bullets = update;
    this.bullets.forEach( (bullet) => {
      bullet.draw();
    });
  }

  renderHelicopters(){
    //removes hit or off screen helicopters
    let update = [];
    for (let i = 0; i < this.helicopters.length; i++) {
      if(this.inBounds(this.helicopters[i]) && this.helicopters[i].status === true){
        update.push(this.helicopters[i]);
        this.helicopters[i].draw();
      }
    }
    this.helicopters = update;
    //generates random helicopters
    if(this.status){
      let rand = ~~(Math.random() * 10000);
      if(rand < 200 && this.phase === "helicopter" && this.bombers.length === 0){
        let helicopter = this.randomHelicopter(rand);
        this.helicopters.push(helicopter);
      }
    }
  }

  randomHelicopter(rand){
    let dir = "r";
    if(rand % 2 === 0){dir = "l";}
    let height = 50 + rand;
    return new Helicopter(this.canvas, this.images, dir, height);
  }

  renderTroopers(){
    this.helicopters.forEach( (helicopter) => {
      //handles random trooper drop
      let rand = Math.floor(Math.random() * 10000);
      if(helicopter.x > 350 && helicopter.x < 450){rand = 1000;}
      const game = this;
      if(rand < 20){
        game.troopers.push(new Trooper(game.canvas,
                                       game.images,
                                       this.troopers,
                                       helicopter));
      }

    });
    //counts landed troopers on each side and maps to trooper.pos
    this.countl = 0;
    this.countr = 0;
    let update = [];
    this.map = {}; //maps troopers for death sequence handling
    this.troopers.forEach( (trooper) => {
      if(trooper.status){update.push(trooper);} //removes dead and increments score
      else{this.score += 5;}
      if(trooper.landed){
        if(trooper.side === "l"){this.countl += 1;}
        if(trooper.side === "r"){this.countr += 1;}
        if(this.map[trooper.pos]){
          trooper.y = 544 - 16 * this.map[trooper.pos].length; //deal with stacking
          this.map[trooper.pos].push(trooper);
        }
        else{
          this.map[trooper.pos] = [trooper];
          trooper.y = 544;
        }
        if(trooper.pos > 43 && trooper.pos < 56){ trooper.y = 496;} //handles edge case in game over
      }
      trooper.draw();
    });
    this.troopers = update;
    //sets death sequence if trooper count on any side is > 3
    if(this.countl > 3){this.deathSequence("l");}
    if(this.countr > 3){this.deathSequence("r");}
  }

  //handles death sequence
  deathSequence(side){
    const Machine = new StateMachine(this.map, side)
    const state = Machine.getState();
    //ends game if state gets to 8
    if(state === 8){
      this.gun.status = false;
      this.turret.status = false;
      let game = this;
      clearInterval(this.interval); //clears game inteval
      setTimeout(function(){game.status = false;}, 2000); //resets startup screen
    }
    Machine.run();
  }
  //checks if object is in visible area
  inBounds(object){
    return object.y >= 0 &&
           object.y <= this.canvas.height &&
           object.x >= -60 &&
           object.x <= this.canvas.width;
  }
  //checks for bullet helicopter collisions
  checkCollisions(){
    for (let i = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];
      this.helicopterLogic(bullet);
      this.trooperLogic(bullet);
    }
  }
  //checks for trooper and chute collisions
  trooperLogic(bullet){
    for (let i = 0; i < this.troopers.length; i++) {
      let trooper = this.troopers[i];
      if(this.intersectTrooper(trooper, bullet)){
        trooper.chute = false;
        trooper.status = false;
      } else if(this.intersectChute(trooper, bullet)){
        trooper.chute = false;
      }
    }
  }
  //checks for bullet helicopter collisions
  helicopterLogic(bullet){
    for (let j = 0; j < this.helicopters.length; j++) {
      let helicopter = this.helicopters[j];
      if(bullet.x > helicopter.x &&
         bullet.x < helicopter.x + 48 &&
         bullet.y > helicopter.y &&
         bullet.y < helicopter.y + 20){
           helicopter.status = false;
           bullet.status = false;
           this.score += 10;
           this.killCount += 1;
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
  //event handler for shooting bullets
  handleKeyDown(code){
    if((code === "Space" || code === "ArrowUp") && this.gun.status === true){
      this.bullets.push(new Bullet(this.canvas, this.turret.fulcrum, this.gun.theta));
      if(this.score > 0){this.score -= 1;}
    }
  }
  //rotates turret on keydown
  keyDown(event){
    if(this.status === "startup" || this.status === false){this.status = true;}
    else if(this.status){
      this.gun.handleKeyDown(event.code);
      this.handleKeyDown(event.code);
    }
  }
  //freezes turret on keyup
  keyUp(event){
    if(this.status){
      this.gun.handleKeyUp(event.code);
    }
  }
  //sets key handlers
  setKeyHandlers(){
    let game = this;
    document.addEventListener('keydown', game.keyDown.bind(game), false);
    document.addEventListener('keyup', game.keyUp.bind(game), false);
  }
}

module.exports = Game;
