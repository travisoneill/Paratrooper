class Trooper {

  constructor(canvas, images, helicopter){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = images;
    this.image = images.trooper;
    this.x = helicopter.x;
    this.y = helicopter.y;
    this.velocity = 2;
    this.chute = false;
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
      this.velocity = 0.5;
    }

    // if(this.chute === true){this.velocity = 1;}
    if(this.y >= 544){
      if(this.velocity > 1){
        this.status = false;
        this.ctx.drawImage(this.images.skull, this.x - 8, this.y - 14);
      }
      this.velocity = 0;
      this.y = 544;
      this.chute = false;
    }

    this.y += this.velocity;
    if(this.y > this.canvas.height){this.status = false;}
  }

}

module.exports = Trooper;
