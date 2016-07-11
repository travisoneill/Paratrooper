/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var GameView = __webpack_require__(1);
	
	var canvas = void 0;
	var canvasContext = void 0;
	
	window.onload = function () {
	  console.log("Hello World");
	  canvas = document.getElementById('gameCanvas');
	  canvasContext = canvas.getContext('2d');
	  canvasContext.fillStyle = 'black';
	  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	  var game = new GameView(canvas);
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = __webpack_require__(2);
	
	var GameView = function () {
	  function GameView(canvas) {
	    _classCallCheck(this, GameView);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.game = new Game(canvas);
	  }
	
	  _createClass(GameView, [{
	    key: 'start',
	    value: function start() {
	      var game = this.game;
	      setInterval(function () {
	        game.draw();
	        game.step();
	        console.log("step");
	      }, 100);
	    }
	  }]);
	
	  return GameView;
	}();
	
	module.exports = GameView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ground = __webpack_require__(3);
	var Turret = __webpack_require__(4);
	var Gun = __webpack_require__(5);
	
	var Game = function () {
	  function Game(canvas) {
	    _classCallCheck(this, Game);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.ground = new Ground(canvas);
	    this.turret = new Turret(canvas);
	    this.gun = new Gun(canvas);
	    this.setKeyHandlers();
	  }
	
	  _createClass(Game, [{
	    key: 'draw',
	    value: function draw() {
	      // this.background.draw();
	      this.ground.draw();
	      this.turret.draw();
	      this.gun.draw(this.turret.fulcrum);
	      this.turret.draw();
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.gun.step();
	    }
	  }, {
	    key: 'setKeyHandlers',
	    value: function setKeyHandlers() {
	      var _this = this;
	
	      document.addEventListener('keydown', function (event) {
	        _this.gun.handleKeyDown(event.keyIdentifier);
	        _this.handleKeyDown(event.keyIdentifier);
	      });
	      document.addEventListener('keyup', function (event) {
	        _this.gun.handleKeyUp(event.keyIdentifier);
	      });
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ground = function () {
	  function Ground(canvas) {
	    _classCallCheck(this, Ground);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	  }
	
	  _createClass(Ground, [{
	    key: 'draw',
	    value: function draw() {
	      this.ctx.fillStyle = '#000000';
	      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	      this.ctx.fillStyle = '#55FFFF';
	      this.ctx.fillRect(0, this.canvas.height - 40, this.canvas.width, 4);
	    }
	  }]);
	
	  return Ground;
	}();
	
	module.exports = Ground;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Turret = function () {
	  function Turret(canvas) {
	    _classCallCheck(this, Turret);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	  }
	
	  _createClass(Turret, [{
	    key: "draw",
	    value: function draw() {
	      var center = this.canvas.width / 2;
	      var width = 90;
	      var height = 70;
	      var ground = 40;
	      var top = this.canvas.height - ground - height;
	      this.ctx.fillStyle = "#ffffff";
	      this.ctx.fillRect(center - width / 2, top, width, height);
	      this.drawGunMount(top);
	    }
	  }, {
	    key: "drawGunMount",
	    value: function drawGunMount(base) {
	      var center = this.canvas.width / 2;
	      var width = 30;
	      var height = 30;
	      // this.ctx.fillStyle = "#DD80F7";
	      this.ctx.fillStyle = "#ff55ff";
	      this.ctx.fillRect(center - width / 2, base - height, width, height);
	      this.ctx.beginPath();
	      this.ctx.arc(center, base - height, width / 2, 0, Math.PI, true);
	      this.ctx.fill();
	      this.ctx.fillStyle = "#55ffff";
	      var width2 = width / 5;
	      this.fulcrum = { x: center, y: base - height + width2 / 2 };
	      this.ctx.fillRect(center - width2 / 2, base - height, width2, width2);
	    }
	  }]);
	
	  return Turret;
	}();
	
	module.exports = Turret;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Gun = function () {
	  function Gun(canvas) {
	    _classCallCheck(this, Gun);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.theta = 90;
	    this.dtheta = 0;
	  }
	
	  _createClass(Gun, [{
	    key: 'draw',
	    value: function draw(fulcrum) {
	      var width = 12;
	      var height = 36;
	      var x = fulcrum.x;
	      var y = fulcrum.y;
	      this.ctx.translate(x, y);
	      var startx = width / 2;
	      var starty = width / 2;
	      this.ctx.rotate(this.theta * Math.PI / 180);
	
	      this.ctx.fillStyle = '#55FFFF';
	      this.ctx.beginPath();
	      this.ctx.moveTo(startx, starty);
	      this.ctx.lineTo(startx, starty - width);
	      this.ctx.lineTo(startx - height, starty - width);
	      this.ctx.arc(startx - height, starty - width / 2, width / 2, 3 * Math.PI / 2, Math.PI / 2, true);
	      this.ctx.lineTo(startx, starty);
	      this.ctx.closePath();
	      this.ctx.fill();
	      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      if (this.theta <= 10 && this.dtheta < 0) {
	        this.theta += 0;
	      } else if (this.theta >= 170 && this.dtheta > 0) {
	        this.theta += 0;
	      } else {
	        this.theta += this.dtheta;
	      }
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(key) {
	      if (key === "Left") {
	        this.dtheta = -2;
	      }
	      if (key === "Right") {
	        this.dtheta = 2;
	      }
	    }
	  }, {
	    key: 'handleKeyUp',
	    value: function handleKeyUp(key) {
	      console.log(key);
	      if (key === "Left") {
	        this.dtheta = 0;
	      }
	      if (key === "Right") {
	        this.dtheta = 0;
	      }
	    }
	  }]);
	
	  return Gun;
	}();
	
	module.exports = Gun;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map