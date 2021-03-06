class Bullet {
  constructor(canvas, origin, angle){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.angle = angle * (Math.PI / 180);
    this.velocity = 5;
    //defines cartesian vx & vy based on angular position of gun
    this.vx = -Math.cos(this.angle) * this.velocity;
    this.vy = -Math.sin(this.angle) * this.velocity;
    //starts oblect motion at end of barrel to avoid visual artifacts
    this.x = origin.x + (this.vx * 36 / this.velocity);
    this.y = origin.y + (this.vy * 36 / this.velocity);
    this.status = true;
  }

  draw(){
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(this.x, this.y, 4, 4);
  }

  step(){
    this.x += this.vx;
    this.y += this.vy;
  }

}

module.exports = Bullet;
