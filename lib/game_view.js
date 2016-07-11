const Game = require('./game');

class GameView {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.game = new Game(canvas);
  }

  start(){
    let game = this.game;
    setInterval( function(){
      game.draw();
      game.step();
    }, 100);
  }
}

module.exports = GameView;
