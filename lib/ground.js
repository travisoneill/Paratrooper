
class Ground {
  constructor(canvas, images){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = images;
  }

  draw(score){
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#55FFFF';
    this.ctx.fillRect(0, this.canvas.height - 40, this.canvas.width, 4);
    this.ctx.drawImage(this.images.score, 4, this.canvas.height - 24);
    this.drawScore(score, 100, this.canvas.height - 24);
    this.ctx.drawImage(this.images.hiscore, 500, this.canvas.height - 24);
    let hiscore = localStorage.hiscore > score ? localStorage.hiscore : score;
    localStorage.hiscore = hiscore;
    this.drawScore(hiscore, 644, this.canvas.height - 24);
  }

  drawScore(score, x, y){
    let arr = score.toString().split('').map( (n) => parseInt(n));
    let ctx = this.ctx;
    let img = this.images;
    arr.forEach( (n) => {
      let num = img[n];
      ctx.drawImage(num, x, y);
      x += 16;
    });
  }
}

module.exports = Ground;
