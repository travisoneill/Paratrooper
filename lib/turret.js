
class Turret {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  draw(){
    let center = this.canvas.width / 2;
    let width = 96;
    let height = 70;
    let ground = 40;
    let top = this.canvas.height - ground - height;
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(
      center - width / 2, top,
      width, height
    );
    this.drawGunMount(top);
  }

  drawGunMount(base){
    let center = this.canvas.width / 2;
    let width = 30;
    let height = 30;
    // this.ctx.fillStyle = "#DD80F7";
    this.ctx.fillStyle = "#ff55ff";
    this.ctx.fillRect(
      center - width / 2, base - height,
      width, height
    );
    this.ctx.beginPath();
    this.ctx.arc(center, base - height, width/2, 0, Math.PI, true);
    this.ctx.fill();
    this.ctx.fillStyle = "#55ffff";
    let width2 = width / 5;
    this.fulcrum = {x: center, y: base - height + width2 /2};
    this.ctx.fillRect(center - width2 / 2, base - height, width2, width2);
  }
}

module.exports = Turret;
