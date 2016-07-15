const Game = require('./game');
const ImageLibrary = require('./image_library');
const IntroScreen = require('./intro_screen');

class GameView {
  constructor(canvas, images){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = images;
    this.game = new Game(canvas, this.images);
    this.status = true;
    // this.intro = new IntroScreen(canvas, this.images);
  }

  start(){
    let game = this.game;
    let self = this;
      this.interval = setInterval(function(){
      game.draw();
      game.step();
      if(game.status === false){self.status = false;}
    }, 20);

  }
}

module.exports = GameView;
