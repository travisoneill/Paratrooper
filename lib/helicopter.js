const ImageLibrary = require('./image_library');

class Helicopter {
  constructor(canvas, images, dir, height){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.y = height;
    this.x = -50;
    this.dir = dir;
    this.velocity = 3;
    if(this.dir === "l"){
      this.velocity *= -1;
      this.x = 799;
    }
    this.images = images;
    this.count = 0;
    this.status = true;
  }

  draw(){
    let img;
    let n = this.count % 6;
    if(this.dir === "r" && n <= 3){img = this.images.helicopter_r1;}
    if(this.dir === "r" && n >= 4){img = this.images.helicopter_r0;}
    if(this.dir === "l" && n <= 3){img = this.images.helicopter_l1;}
    if(this.dir === "l" && n >= 4){img = this.images.helicopter_l0;}
    this.ctx.drawImage(img, this.x, this.y);
  }

  step(){
    this.count += 1;
    this.x += this.velocity;
  }

}

module.exports = Helicopter;
