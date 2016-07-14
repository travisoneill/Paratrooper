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
	var ImageLibrary = __webpack_require__(8);
	
	var GameView = function () {
	  function GameView(canvas) {
	    _classCallCheck(this, GameView);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.library = new ImageLibrary();
	    this.game = new Game(canvas, this.library.images);
	  }
	
	  _createClass(GameView, [{
	    key: 'start',
	    value: function start() {
	      var game = this.game;
	      var self = this;
	      setInterval(function () {
	        game.draw();
	        game.step();
	        if (game.status === false) {
	          clearInterval(self.interval);
	        }
	      }, 20);
	    }
	  }]);
	
	  return GameView;
	}();
	
	module.exports = GameView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ground = __webpack_require__(3);
	var Turret = __webpack_require__(4);
	var Gun = __webpack_require__(5);
	var Bullet = __webpack_require__(6);
	var Helicopter = __webpack_require__(7);
	var Trooper = __webpack_require__(9);
	
	var Game = function () {
	  function Game(canvas, images) {
	    _classCallCheck(this, Game);
	
	    this.images = images;
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.score = 0;
	    this.ground = new Ground(canvas, images);
	    this.turret = new Turret(canvas);
	    this.gun = new Gun(canvas);
	    this.bullets = [];
	    this.helicopters = [];
	    this.troopers = [];
	    this.countl = 0;
	    this.countr = 0;
	    this.trooperMap = this.makeMap();
	    this.status = true;
	    this.timeout = false;
	    // this.helicopters = [new Helicopter(canvas, images, "r", 200)];
	    this.setKeyHandlers();
	  }
	
	  _createClass(Game, [{
	    key: 'draw',
	    value: function draw() {
	      // this.background.draw();
	      this.checkCollisions();
	      this.ground.draw(this.score);
	      this.turret.draw();
	      this.gun.draw(this.turret.fulcrum);
	      this.turret.draw();
	      this.renderBullets();
	      this.renderHelicopters();
	      this.renderTroopers();
	      // this.helicopters[0].draw();
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.gun.step();
	      this.bullets.forEach(function (bullet) {
	        bullet.step();
	      });
	      this.helicopters.forEach(function (helicopter) {
	        helicopter.step();
	      });
	      this.troopers.forEach(function (trooper) {
	        trooper.step();
	      });
	    }
	  }, {
	    key: 'renderBullets',
	    value: function renderBullets() {
	      var update = [];
	      for (var i = 0; i < this.bullets.length; i++) {
	        if (this.inBounds(this.bullets[i]) && this.bullets[i].status === true) {
	          update.push(this.bullets[i]);
	        }
	      }
	      this.bullets = update;
	      // console.log(this.bullets);
	      this.bullets.forEach(function (bullet) {
	        bullet.draw();
	      });
	    }
	  }, {
	    key: 'renderHelicopters',
	    value: function renderHelicopters() {
	      var update = [];
	      for (var i = 0; i < this.helicopters.length; i++) {
	        if (this.inBounds(this.helicopters[i]) && this.helicopters[i].status === true) {
	          update.push(this.helicopters[i]);
	        }
	      }
	      this.helicopters = update;
	      if (this.status) {
	        var rand = Math.floor(Math.random() * 10000);
	        if (rand < 200) {
	          var helicopter = this.randomHelicopter(rand);
	          this.helicopters.push(helicopter);
	        }
	      }
	
	      this.helicopters.forEach(function (helicopter) {
	        helicopter.draw();
	      });
	    }
	  }, {
	    key: 'randomHelicopter',
	    value: function randomHelicopter(rand) {
	      var dir = "r";
	      if (rand % 2 === 0) {
	        dir = "l";
	      }
	      var height = 50 + rand;
	      return new Helicopter(this.canvas, this.images, dir, height);
	    }
	  }, {
	    key: 'renderTroopers',
	    value: function renderTroopers() {
	      var _this = this;
	
	      var update = [];
	      for (var i = 0; i < this.troopers.length; i++) {
	        if (this.troopers[i].status === true) {
	          update.push(this.troopers[i]);
	        } else {
	          this.score += 5;
	        }
	      }
	      this.troopers = update;
	
	      this.helicopters.forEach(function (helicopter) {
	
	        var rand = Math.floor(Math.random() * 10000);
	        if (helicopter.x > 350 && helicopter.x < 450) {
	          rand = 1000;
	        }
	        var game = _this;
	        if (rand < 20) {
	          game.troopers.push(new Trooper(game.canvas, game.images, _this.troopers, helicopter));
	        }
	      });
	      this.countl = 0;
	      this.countr = 0;
	      this.troopers.forEach(function (trooper) {
	        if (trooper.landed === true && trooper.side === "l") {
	          _this.countl += 1;
	        }
	        if (trooper.landed === true && trooper.side === "r") {
	          _this.countr += 1;
	        }
	        trooper.draw();
	      });
	
	      if (this.countl > 3) {
	        this.deathSequence("l");
	      }
	      if (this.countr > 3) {
	        this.deathSequence("r");
	      }
	      if (this.countr <= 3 && this.countl <= 3) {
	        this.status = true;
	      }
	    }
	  }, {
	    key: 'deathSequence',
	    value: function deathSequence(side) {
	      var _this2 = this;
	
	      if (this.status === true) {
	        var troopers = this.troopers.filter(function (t) {
	          return t.side === side && t.landed === true;
	        });
	        troopers.sort(function (a, b) {
	          Math.abs(a.x - 400) + Math.abs(b.x - 400);
	        });
	
	        var _troopers = _slicedToArray(troopers, 4);
	
	        this.t0 = _troopers[0];
	        this.t1 = _troopers[1];
	        this.t2 = _troopers[2];
	        this.t3 = _troopers[3];
	
	        this.status = side;
	      }
	
	      var v = this.status === "l" ? 1 : -1;
	
	      var t0 = this.t0;
	      var t1 = this.t1;
	      var t2 = this.t2;
	      var t3 = this.t3;
	
	
	      t0.vx = Math.abs(t0.x + 4 - 400) > 52 ? v : 0;
	
	      if (Math.abs(t0.x + 4 - 400) === 52) {
	        t1.vx = Math.abs(t1.x + 4 - 400) > 60 ? v : 0;
	      }
	
	      if (Math.abs(t1.x + 4 - 400) === 60 && this.timeout === false) {
	        (function () {
	          var game = _this2;
	          setTimeout(function () {
	            t1.x += v * 8;
	            t1.y -= 16;
	            game.timeout = false;
	          }, 200);
	          _this2.timeout = true;
	        })();
	      }
	
	      if (Math.abs(t1.x + 4 - 400) === 52) {
	        t2.vx = Math.abs(t2.x + 4 - 400) > 60 ? v : 0;
	      }
	
	      if (Math.abs(t2.x + 4 - 400) === 60) {
	        t3.vx = Math.abs(t3.x + 4 - 400) > 68 ? v : 0;
	      }
	
	      if (Math.abs(t3.x + 4 - 400) === 68 && this.timeout === false) {
	        var _game = this;
	        this.interval = setInterval(function () {
	          t3.x += v * 8;
	          t3.y -= 16;
	        }, 200);
	        this.timeout = true;
	      }
	
	      if (t3.y < 500) {
	        this.status = false;
	        this.gun.status = false;
	        this.turret.status = false;
	        // let game = this;
	        clearInterval(this.interval);
	        // document.removeEventListener('keydown', game.keyDown, true);
	        // document.removeEventListener('keydown', game.keyDown, false);
	        // document.removeEventListener('keyup', game.keyUp, true);
	        // document.removeEventListener('keyup', game.keyUp, false);
	      }
	    }
	  }, {
	    key: 'inBounds',
	    value: function inBounds(object) {
	      return object.y >= 0 && object.y <= this.canvas.height && object.x >= -60 && object.x <= this.canvas.width;
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      for (var i = 0; i < this.bullets.length; i++) {
	        var bullet = this.bullets[i];
	        this.helicopterLogic(bullet);
	        this.trooperLogic(bullet);
	      }
	    }
	  }, {
	    key: 'trooperLogic',
	    value: function trooperLogic(bullet) {
	      for (var i = 0; i < this.troopers.length; i++) {
	        var trooper = this.troopers[i];
	        if (this.intersectTrooper(trooper, bullet)) {
	          trooper.chute = false;
	          trooper.status = false;
	        } else if (this.intersectChute(trooper, bullet)) {
	          trooper.chute = false;
	          trooper.velocity = 2;
	        }
	      }
	    }
	  }, {
	    key: 'helicopterLogic',
	    value: function helicopterLogic(bullet) {
	      for (var j = 0; j < this.helicopters.length; j++) {
	        var helicopter = this.helicopters[j];
	        if (bullet.x > helicopter.x && bullet.x < helicopter.x + 48 && bullet.y > helicopter.y && bullet.y < helicopter.y + 20) {
	          helicopter.status = false;
	          bullet.status = false;
	          this.score += 10;
	        }
	      }
	    }
	  }, {
	    key: 'intersectTrooper',
	    value: function intersectTrooper(trooper, bullet) {
	      var tx = trooper.x;
	      var ty = trooper.y;
	      var bx = bullet.x;
	      var by = bullet.y;
	      if (bx > tx && bx < tx + 8 && by > ty && by < ty + 16) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'intersectChute',
	    value: function intersectChute(trooper, bullet) {
	      var tx = trooper.x;
	      var ty = trooper.y;
	      var bx = bullet.x;
	      var by = bullet.y;
	      if (bx > tx - 8 && bx < tx + 16 && by < ty && by > ty - 28) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'makeMap',
	    value: function makeMap() {
	      var map = {};
	      for (var i = 0; i < 101; i++) {
	        map[i] = 0;
	      }
	      return map;
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(code) {
	      if (code === "Space" || code === "ArrowUp") {
	        this.bullets.push(new Bullet(this.canvas, this.turret.fulcrum, this.gun.theta));
	        if (this.score > 0) {
	          this.score -= 1;
	        }
	      }
	    }
	  }, {
	    key: 'keyDown',
	    value: function keyDown(event) {
	      if (this.status) {
	        this.gun.handleKeyDown(event.keyIdentifier);
	        this.handleKeyDown(event.code);
	      }
	    }
	  }, {
	    key: 'keyUp',
	    value: function keyUp(event) {
	      if (this.status) {
	        this.gun.handleKeyUp(event.keyIdentifier);
	      }
	    }
	  }, {
	    key: 'setKeyHandlers',
	    value: function setKeyHandlers() {
	      var game = this;
	      document.addEventListener('keydown', game.keyDown.bind(game), false);
	      document.addEventListener('keyup', game.keyUp.bind(game), false);
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
	  function Ground(canvas, images) {
	    _classCallCheck(this, Ground);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.images = images;
	  }
	
	  _createClass(Ground, [{
	    key: 'draw',
	    value: function draw(score) {
	      this.ctx.fillStyle = '#000000';
	      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	      this.ctx.fillStyle = '#55FFFF';
	      this.ctx.fillRect(0, this.canvas.height - 40, this.canvas.width, 4);
	      this.ctx.drawImage(this.images.score, 4, this.canvas.height - 24);
	      this.drawScore(score, 100, this.canvas.height - 24);
	      this.ctx.drawImage(this.images.hiscore, 500, this.canvas.height - 24);
	      var hiscore = localStorage.hiscore > score ? localStorage.hiscore : score;
	      localStorage.hiscore = hiscore;
	      this.drawScore(hiscore, 644, this.canvas.height - 24);
	    }
	  }, {
	    key: 'drawScore',
	    value: function drawScore(score, x, y) {
	      var arr = score.toString().split('').map(function (n) {
	        return parseInt(n);
	      });
	      // let x = 100;
	      // let y = this.canvas.height - 24;
	      var ctx = this.ctx;
	      var img = this.images;
	      arr.forEach(function (n) {
	        var num = img[n];
	        ctx.drawImage(num, x, y);
	        x += 16;
	      });
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
	    this.status = true;
	  }
	
	  _createClass(Turret, [{
	    key: "draw",
	    value: function draw() {
	      var center = this.canvas.width / 2;
	      var width = 96;
	      var height = 48;
	      var ground = 40;
	      var top = this.canvas.height - ground - height;
	      this.ctx.fillStyle = "#ffffff";
	      this.ctx.fillRect(center - width / 2, top, width, height);
	      if (this.status === true) {
	        this.drawGunMount(top);
	      }
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
	    this.status = true;
	  }
	
	  _createClass(Gun, [{
	    key: 'draw',
	    value: function draw(fulcrum) {
	      var width = 12;
	      var height = 36;
	      if (this.status === false) {
	        width = 0;
	        height = 0;
	      }
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
	      // this.muzzle = {x: startx-height + x, y: starty - width/2 + y};
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
	        this.dtheta = -3;
	      }
	      if (key === "Right") {
	        this.dtheta = 3;
	      }
	    }
	  }, {
	    key: 'handleKeyUp',
	    value: function handleKeyUp(key) {
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Bullet = function () {
	  function Bullet(canvas, origin, angle) {
	    _classCallCheck(this, Bullet);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.angle = angle * (Math.PI / 180);
	    this.velocity = 5;
	    this.vx = -Math.round(Math.cos(this.angle) * this.velocity);
	    this.vy = -Math.round(Math.sin(this.angle) * this.velocity);
	    this.x = origin.x + this.vx * 36 / this.velocity;
	    this.y = origin.y + this.vy * 36 / this.velocity;
	    this.status = true;
	  }
	
	  _createClass(Bullet, [{
	    key: "draw",
	    value: function draw() {
	      this.ctx.fillStyle = "#ffffff";
	      this.ctx.fillRect(this.x, this.y, 2, 2);
	    }
	  }, {
	    key: "step",
	    value: function step() {
	      this.x += this.vx;
	      this.y += this.vy;
	    }
	  }]);
	
	  return Bullet;
	}();
	
	module.exports = Bullet;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ImageLibrary = __webpack_require__(8);
	
	var Helicopter = function () {
	  function Helicopter(canvas, images, dir, height) {
	    _classCallCheck(this, Helicopter);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.y = height;
	    this.x = -50;
	    this.dir = dir;
	    this.velocity = 3;
	    if (this.dir === "l") {
	      this.velocity *= -1;
	      this.x = 799;
	    }
	    this.images = images;
	    this.count = 0;
	    this.status = true;
	  }
	
	  _createClass(Helicopter, [{
	    key: 'draw',
	    value: function draw() {
	      var img = void 0;
	      var n = this.count % 6;
	      if (this.dir === "r" && n <= 3) {
	        img = this.images.helicopter_r1;
	      }
	      if (this.dir === "r" && n >= 4) {
	        img = this.images.helicopter_r0;
	      }
	      if (this.dir === "l" && n <= 3) {
	        img = this.images.helicopter_l1;
	      }
	      if (this.dir === "l" && n >= 4) {
	        img = this.images.helicopter_l0;
	      }
	      this.ctx.drawImage(img, this.x, this.y);
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.count += 1;
	      this.x += this.velocity;
	    }
	  }]);
	
	  return Helicopter;
	}();
	
	module.exports = Helicopter;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IMAGES = {
	  helicopter_r0: './rsc/helicopter-right-0.png',
	  helicopter_r1: './rsc/helicopter-right-1.png',
	  helicopter_l0: './rsc/helicopter-left-0.png',
	  helicopter_l1: './rsc/helicopter-left-1.png',
	  trooper: './rsc/trooper.png',
	  chute: './rsc/chute.png',
	  skull: './rsc/skull.png',
	  score: './rsc/score.png',
	  hiscore: './rsc/hi-score.png',
	  0: './rsc/0.png',
	  1: './rsc/1.png',
	  2: './rsc/2.png',
	  3: './rsc/3.png',
	  4: './rsc/4.png',
	  5: './rsc/5.png',
	  6: './rsc/6.png',
	  7: './rsc/7.png',
	  8: './rsc/8.png',
	  9: './rsc/9.png'
	};
	
	var ImageLibrary = function ImageLibrary() {
	  _classCallCheck(this, ImageLibrary);
	
	  var images = {};
	  Object.keys(IMAGES).forEach(function (key) {
	    var img = new Image();
	    img.src = IMAGES[key];
	    images[key] = img;
	  });
	  this.images = images;
	  console.log(this.images);
	};
	
	module.exports = ImageLibrary;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Trooper = function () {
	  function Trooper(canvas, images, map, helicopter) {
	    _classCallCheck(this, Trooper);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.images = images;
	    this.image = images.trooper;
	    this.map = map;
	    this.x = helicopter.x - helicopter.x % 8;
	    this.y = helicopter.y;
	    this.side = this.x < 400 ? "l" : "r";
	    this.pos = this.x / 8;
	    this.velocity = 3;
	    this.vx = 0;
	    this.chute = false;
	    this.landed = false;
	    this.status = true;
	  }
	
	  _createClass(Trooper, [{
	    key: "draw",
	    value: function draw() {
	      this.ctx.drawImage(this.image, this.x, this.y);
	      if (this.chute === true) {
	        this.ctx.drawImage(this.images.chute, this.x - 8, this.y - 28);
	      }
	    }
	  }, {
	    key: "step",
	    value: function step() {
	      if (this.y < 302 && this.y > 298) {
	        this.chute = true;
	        this.velocity = 0.9;
	      }
	
	      this.y += this.velocity;
	      this.x += this.vx;
	      // if(this.chute === true){this.velocity = 1;}
	      // if(this.y >= 544){ this.landed = true; }
	
	      if (this.landed === false && this.y >= 544) {
	        this.landingLogic();
	      }
	
	      if (this.x < 0 || this.x > this.canvas.width - 8) {
	        this.status = false;
	      }
	      if (this.y > this.canvas.height) {
	        this.status = false;
	      }
	    }
	  }, {
	    key: "landingLogic",
	    value: function landingLogic() {
	      var _this = this;
	
	      if (this.velocity > 1) {
	        this.status = false;
	        this.ctx.drawImage(this.images.skull, this.x - 8, this.y - 14);
	        this.map.forEach(function (trooper) {
	          if (trooper.pos === _this.pos) {
	            trooper.status = false;
	          }
	        });
	      }
	      this.velocity = 0;
	      // console.log(this.map);
	      this.y = 560;
	      this.map.forEach(function (trooper) {
	        if (trooper.pos === _this.pos) {
	          _this.y -= 16;
	        }
	      });
	      this.chute = false;
	      this.landed = true;
	    }
	  }]);
	
	  return Trooper;
	}();
	
	module.exports = Trooper;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map