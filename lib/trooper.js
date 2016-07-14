class Trooper {

  constructor(canvas, images, map, helicopter){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = images;
    this.image = images.trooper;
    this.map = map;
    this.x = helicopter.x - helicopter.x % 8;
    this.y = helicopter.y;
    this.side = this.x < 400 ? "l" : "r";
    this.pos = this.x / 8;
    this.velocity = 3;
    this.vx = 0;
    this.chute = false;
    this.landed = false;
    this.status = true;
  }

  draw(){
    this.ctx.drawImage(this.image, this.x, this.y);
    if(this.chute === true){
      this.ctx.drawImage(this.images.chute, this.x - 8, this.y - 28);
    }
  }

  step(){
    if(this.y < 302 && this.y > 298){
      this.chute = true;
      this.velocity = 0.9;
    }

    this.y += this.velocity;
    this.x += this.vx;
    // if(this.chute === true){this.velocity = 1;}
    // if(this.y >= 544){ this.landed = true; }

    if(this.landed === false && this.y >= 544){ this.landingLogic();}

    if(this.x < 0 || this.x > this.canvas.width - 8){
      this.status = false;}
    if(this.y > this.canvas.height){this.status = false;}
  }

  landingLogic(){
    if(this.velocity > 1){
      this.status = false;
      this.ctx.drawImage(this.images.skull, this.x - 8, this.y - 14);
      this.map.forEach( (trooper) => {
        if(trooper.pos === this.pos){
          trooper.status = false;
        }
      });
    }
    this.velocity = 0;
    // console.log(this.map);
    this.y = 560;
    this.map.forEach( (trooper) => {
      if(trooper.pos === this.pos){ this.y -= 16;}
    });
    this.chute = false;
    this.landed = true;
  }

}

module.exports = Trooper;
