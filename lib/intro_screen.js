class IntroScreen {
  constructor(canvas, images){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = images;
  }

  draw(){
    this.ctx.drawImage(this.images.title, 175, 100);
  }
}

module.exports = IntroScreen;
