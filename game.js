const GameView = require('./lib/game_view');

let canvas;
let canvasContext;

window.onload = function(){
  console.log("Hello World");
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  const game = new GameView(canvas);
  game.start();


  // const FPS = 30;
  // setInterval(function() {
  //   moveEveything();
  //   drawEveything();
  // }, 1000 / FPS);

//   canvas.addEventListener('mousemove', function(evt){
//     let mousePos = calcMousePos(evt).y
//     paddle1y = mousePos;
//   })
};

// function drawEveything(){
//   console.log("called draw");
//   colorRect(0, 0, canvas.width, canvas.height, 'black');
//   colorRect(5, paddle1y - 75, 15, paddleHeight, "white");
//   // colorRect(ballx, bally, ballWidth, ballHeight, 'red');
//   canvasContext.fillStyle = 'red';
//   canvasContext.beginPath();
//   canvasContext.arc(ballx, bally, ballWidth/2, 0, Math.PI*2, true);
//   canvasContext.fill();
// }
//
// function moveEveything(){
//   ballx += ballSpeedx;
//   bally += ballSpeedy;
//   // ballSpeedx += 1;
//   // ballSpeedy += 1;
//   if(ballx > canvas.width - 10 || ballx < 10){ballSpeedx = -ballSpeedx;}
//   if(bally > canvas.height - 10 || bally < 10){ballSpeedy = -ballSpeedy;}
// }
//
// function colorRect(leftx, topy, width, height, color){
//   canvasContext.fillStyle = color;
//   canvasContext.fillRect(leftx, topy, width, height, color);
// }
