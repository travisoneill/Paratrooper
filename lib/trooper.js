class Trooper {

  constructor(canvas, images, map, helicopter){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = images;
    // this.image = images.trooper;
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
    // this.ctx.drawImage(this.image, this.x, this.y);
    this.drawTrooper(this.x, this.y);
    if(this.chute === true){
      // this.ctx.drawImage(this.images.chute, this.x - 8, this.y - 28);
      this.drawChute(this.x - 8, this.y - 28);
    }
  }

  drawTrooper(x, y){
    this.ctx.fillStyle = '#ffffff';
    // head
    this.ctx.fillRect(x+2, y, 4, 4);
    this.ctx.fillStyle = '#55ffff';
    // torso
    this.ctx.fillRect(x+2, y+4, 4, 6);
    // arms
    this.ctx.fillRect(x, y+4, 2, 2);
    this.ctx.fillRect(x+6, y+4, 2, 2);
    // legs
    this.ctx.fillRect(x, y+10, 2, 6);
    this.ctx.fillRect(x+6, y+10, 2, 6);
    // debugger;
  }

  drawChute(x, y){
    this.ctx.fillStyle = '#55ffff';
    this.ctx.fillRect(x+8, y, 8, 2);
    this.ctx.fillRect(x+4, y+2, 16, 2);
    this.ctx.fillRect(x+2, y+4, 20, 2);
    this.ctx.fillRect(x, y+6, 24, 6);
    this.ctx.fillStyle = '#ff55ff';
    this.ctx.fillRect(x, y+12, 2, 2);
    this.ctx.fillRect(x+2, y+14, 2, 4);
    this.ctx.fillRect(x+4, y+18, 2, 4);
    this.ctx.fillRect(x+6, y+22, 2, 4);
    this.ctx.fillRect(x+8, y+26, 2, 2);
    this.ctx.fillRect(x+22, y+12, 2, 2);
    this.ctx.fillRect(x+20, y+14, 2, 4);
    this.ctx.fillRect(x+18, y+18, 2, 4);
    this.ctx.fillRect(x+16, y+22, 2, 4);
    this.ctx.fillRect(x+14, y+26, 2, 2);
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
