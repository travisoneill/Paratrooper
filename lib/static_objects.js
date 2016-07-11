module.exports = {

  class Ground {
    constructor(canvas){
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }

    draw(){
      this.ctx.fillStyle = '#9FF6FA';
      this.ctx.fillRect(0, this.canvas.height - 20, this.canvas.width, 4);
    }
  }


}
