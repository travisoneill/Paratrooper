import { drawHelicopter } from './patterns/helicopter';

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
    drawHelicopter(this.ctx, this.x, this.y, this.dir, this.count);
  }

  step(){
    this.count += 1;
    this.x += this.velocity;
  }

}

module.exports = Helicopter;
