const GameView = require('./lib/game_view');
const ImageLibrary = require('./lib/image_library');

let canvas;
let canvasContext;
let game = 'game';

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  //preloads image library into cache
  const library = new ImageLibrary();

  //creates new game view on new game
  setInterval(function(){
    if(!game.status){
      clearInterval(game.interval);
      game = new GameView(canvas, library.images);
      game.start();
    }
  }, 50);

};
