const Game = require('./game');
const ImageLibrary = require('./image_library');

class GameView {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.library = new ImageLibrary();
    this.game = new Game(canvas, this.library.images);
  }

  start(){
    let game = this.game;
    let self = this;
    setInterval(function(){
      game.draw();
      game.step();
      if(game.status === false){clearInterval(self.interval);}
    }, 20);
  }
}

module.exports = GameView;
