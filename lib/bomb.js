class Bomb {
  constructor(canvas, bomber){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = bomber.x + 20;
    this.y = bomber.y + 20;
    this.vx = bomber.vx / 2;
    this.vy = 3 * (1 + ((bomber.level - 1) / 10));
    this.status = true;
  }

  draw(){
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, 2*Math.PI);
    this.ctx.fill();
  }

  step(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.y > 510){
      this.y = 530;
      this.x = 400;
    }
  }
}

module.exports = Bomb;
