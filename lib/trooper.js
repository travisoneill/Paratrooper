import { drawTrooper, drawChute } from './patterns/trooper';

class Trooper {

  constructor(canvas, images, map, helicopter){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = images;
    this.map = map;
    this.x = helicopter.x - helicopter.x % 8;
    this.y = helicopter.y;
    this.side = this.x < 400 ? "l" : "r";
    this.pos = this.x / 8;
    this.vy = 3;
    this.vx = 0;
    this.count = 0;
    this.chute = false; //chute deployed on true
    this.landed = false; //true if on ground
    this.status = true; //set to false to flag for removal
  }

  draw(){
    drawTrooper(this.ctx, this.x, this.y);
    if(this.chute === true){
      drawChute(this.ctx, this.x - 8, this.y - 28);
    }
  }
  
  step(){
    //deploys chutes at specified height and slows fall
    if(this.y < 302 && this.y > 298){
      this.chute = true;
    }
    this.vy = this.chute ? 1 : 3; //sets drop speed based on chute
    this.vy = this.landed ? 0 : this.vy; //sets velocity to 0 if landed;
    this.y += this.vy;
    this.x += this.vx;
    //checks to see if trooper lives on landing
    if(this.landed === false && this.y >= 544){ this.landingLogic();}
    //removes any troopers off screen
    if(this.x < 0 || this.x > this.canvas.width - 8){
      this.status = false;}
    if(this.y > this.canvas.height){this.status = false;}
  }

  landingLogic(){
    //removes any troopers that land without chute
    if(!this.chute){
      this.status = false;
      this.ctx.drawImage(this.images.skull, this.x - 8, this.y - 14);
      //kills any troopers on ground below falling trooper
      this.map.forEach( (trooper) => {
        if(trooper.pos === this.pos){
          trooper.status = false;
        }
      });
    }
    this.vy = 0; //stops falling trooper on impact with ground
    this.y = 560;
    this.map.forEach( (trooper) => {
      if(trooper.pos === this.pos){ this.y -= 16;} //stacks troopers in same position
    });
    this.chute = false; //removes chute on succesful landing
    this.landed = true;
  }

}

module.exports = Trooper;
