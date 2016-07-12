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
    setInterval( function(){
      game.draw();
      game.step();
      // console.log("step");
    }, 20);
  }
}

module.exports = GameView;
