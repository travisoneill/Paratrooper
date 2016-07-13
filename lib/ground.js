
class Ground {
  constructor(canvas, images){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = images;
  }

  draw(){
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#55FFFF';
    this.ctx.fillRect(0, this.canvas.height - 40, this.canvas.width, 4);
    this.ctx.drawImage(this.images.score, 4, this.canvas.height - 24);
  }
}

module.exports = Ground;
