const GameView = require('./lib/game_view');
const ImageLibrary = require('./lib/image_library');

let canvas;
let canvasContext;
let game = 'game';

window.onload = function(){
  console.log("Hello World");
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  const library = new ImageLibrary();

  // game = new GameView(canvas, library.images);
  // game.start();

  setInterval(function(){
    if(!game.status){
      clearInterval(game.interval);
      game = new GameView(canvas, library.images);
      game.start();
    }
  }, 50);

};
