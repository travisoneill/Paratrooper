class Bomb {
  constructor(canvas, bomber){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = bomber.x + 20;
    this.y = bomber.y + 20;
    this.vx = bomber.vx;
    this.vy = 2;
  }

  draw(){
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 3, 2*Math.PI);
    this.fill();
  }

  step(){
    this.x += this.vx;
    this.y += this.vy;
  }
}

module.exports = Bomb;
