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
	var ImageLibrary = __webpack_require__(8);
	
	var canvas = void 0;
	var canvasContext = void 0;
	var game = 'game';
	
	window.onload = function () {
	  console.log("Hello World");
	  canvas = document.getElementById('gameCanvas');
	  canvasContext = canvas.getContext('2d');
	  canvasContext.fillStyle = 'black';
	  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	
	  //preloads image library into cache
	  var library = new ImageLibrary();
	
	  //creates new game view on new game
	  setInterval(function () {
	    if (!game.status) {
	      clearInterval(game.interval);
	      game = new GameView(canvas, library.images);
	      game.start();
	    }
	  }, 50);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = __webpack_require__(2);
	var ImageLibrary = __webpack_require__(8);
	var IntroScreen = __webpack_require__(13);
	
	var GameView = function () {
	  //instantiates game and sets game canvas
	
	  function GameView(canvas, images) {
	    _classCallCheck(this, GameView);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.images = images;
	    this.game = new Game(canvas, this.images);
	    this.status = true;
	  }
	  //sets interval for game animation at the specified frame rate
	
	
	  _createClass(GameView, [{
	    key: 'start',
	    value: function start() {
	      var game = this.game;
	      var self = this;
	      this.interval = setInterval(function () {
	        game.draw();
	        game.step();
	        if (game.status === false) {
	          self.status = false;
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ground = __webpack_require__(3);
	var Turret = __webpack_require__(4);
	var Gun = __webpack_require__(5);
	var Bullet = __webpack_require__(6);
	var Helicopter = __webpack_require__(7);
	var Trooper = __webpack_require__(9);
	var Bomber = __webpack_require__(10);
	var Bomb = __webpack_require__(11);
	var StateMachine = __webpack_require__(12);
	
	var Game = function () {
	  function Game(canvas, images) {
	    _classCallCheck(this, Game);
	
	    this.images = images;
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.score = 0;
	    this.level = 0;
	    this.ground = new Ground(canvas, images);
	    this.turret = new Turret(canvas);
	    this.gun = new Gun(canvas);
	    this.bullets = [];
	    this.helicopters = [];
	    this.troopers = [];
	    this.bombers = [];
	    this.bombs = [];
	    this.countl = 0; //counts troopers on left side
	    this.countr = 0; //counts troopers on left side
	    this.killCount = 0;
	    this.status = "startup";
	    this.timeout = false;
	    this.phase = "helicopter"; //sets initial ai attack mode
	    this.setKeyHandlers();
	  }
	
	  _createClass(Game, [{
	    key: 'draw',
	    value: function draw() {
	      //title screen
	      if (this.status === "startup") {
	        this.ctx.drawImage(this.images.title, 175, 100);
	        this.ctx.drawImage(this.images.start_text, 132, 250);
	        this.ctx.drawImage(this.images.instructions, 50, 300);
	      } else {
	        this.animateGame();
	      }
	    }
	  }, {
	    key: 'animateGame',
	    value: function animateGame() {
	      this.checkCollisions();
	      this.ground.draw(this.score);
	      this.turret.draw();
	      this.gun.draw(this.turret.fulcrum);
	      this.turret.draw();
	      this.renderBullets();
	      this.renderHelicopters();
	      this.renderTroopers();
	      this.renderBombers();
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
	      this.bombers.forEach(function (bomber) {
	        bomber.step();
	      });
	      this.bombs.forEach(function (bomb) {
	        bomb.step();
	      });
	      //increments level based on kill count. Switches to bomber attack on level up
	      if (this.killCount > 0 && this.killCount >= 20 + 20 * this.level + 3 * this.level * this.level) {
	        this.phase = "bomber";
	        this.level += 1;
	      }
	    }
	  }, {
	    key: 'renderBombers',
	    value: function renderBombers() {
	      var _this = this;
	
	      if (this.phase === "bomber" && this.helicopters.length === 0) {
	        this.bombers.push(new Bomber(this.canvas, this.images, ~~(Math.random() * 2), this.level));
	        this.phase = "helicopter";
	      }
	      var update = [];
	      this.bombers.forEach(function (bomber) {
	        //removes bombers when shot or off screen
	        if (bomber.status) {
	          update.push(bomber);
	          bomber.draw();
	          //drops bomb at set position
	          if (Math.abs(380 - bomber.x) < 325 && bomber.payload === true) {
	            _this.bombs.push(new Bomb(_this.canvas, bomber));
	            bomber.payload = false;
	          }
	          //detects bullet/bomber collision, sets hit bomber to false and increments score
	          _this.bullets.forEach(function (bullet) {
	            if (bullet.x > bomber.x && bullet.x < bomber.x + 48 && bullet.y > bomber.y && bullet.y < bomber.y + 20) {
	              bullet.status = false;
	              bomber.status = false;
	              _this.score += 20;
	            }
	          });
	        }
	      });
	      this.bombers = update;
	
	      var update2 = [];
	      this.bombs.forEach(function (bomb) {
	        bomb.draw();
	        // detects bullet bomb collisions
	        _this.bullets.forEach(function (bullet) {
	          if (bullet.x > bomb.x - 5 && bullet.x < bomb.x + 5 && bullet.y > bomb.y - 5 && bullet.y < bomb.y + 5) {
	            bullet.status = false;
	            bomb.status = false;
	            _this.score += 20;
	          }
	        });
	        if (bomb.status === true) {
	          update2.push(bomb);
	        }
	        //destroys turret and triggers game over on bomb hit
	        if (bomb.y > 500) {
	          (function () {
	            _this.gun.status = false;
	            _this.turret.status = false;
	            var game = _this;
	            setTimeout(function () {
	              game.status = false;
	            }, 2000);
	          })();
	        }
	      });
	      this.bombs = update2;
	    }
	    //draws bullets and removes bullets off screen
	
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
	      this.bullets.forEach(function (bullet) {
	        bullet.draw();
	      });
	    }
	  }, {
	    key: 'renderHelicopters',
	    value: function renderHelicopters() {
	      //removes hit or off screen helicopters
	      var update = [];
	      for (var i = 0; i < this.helicopters.length; i++) {
	        if (this.inBounds(this.helicopters[i]) && this.helicopters[i].status === true) {
	          update.push(this.helicopters[i]);
	          this.helicopters[i].draw();
	        }
	      }
	      this.helicopters = update;
	      //generates random helicopters
	      if (this.status) {
	        var rand = ~~(Math.random() * 10000);
	        if (rand < 200 && this.phase === "helicopter" && this.bombers.length === 0) {
	          var helicopter = this.randomHelicopter(rand);
	          this.helicopters.push(helicopter);
	        }
	      }
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
	      var _this2 = this;
	
	      //removes dead troopers
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
	        //handles random trooper drop
	        var rand = Math.floor(Math.random() * 10000);
	        if (helicopter.x > 350 && helicopter.x < 450) {
	          rand = 1000;
	        }
	        var game = _this2;
	        if (rand < 20) {
	          game.troopers.push(new Trooper(game.canvas, game.images, _this2.troopers, helicopter));
	        }
	      });
	      //counts landed troopers on each side and maps to trooper.pos
	      this.countl = 0;
	      this.countr = 0;
	      this.map = {};
	      this.troopers.forEach(function (trooper) {
	        if (trooper.landed === true && trooper.side === "l") {
	          _this2.countl += 1;
	        }
	        if (trooper.landed === true && trooper.side === "r") {
	          _this2.countr += 1;
	        }
	        if (trooper.landed) {
	          if (_this2.map[trooper.pos]) {
	            _this2.map[trooper.pos].push(trooper);
	          } else {
	            _this2.map[trooper.pos] = [trooper];
	          }
	        }
	        trooper.draw();
	      });
	      //sets death sequence if trooper count on any side is > 3
	      if (this.countl > 3) {
	        this.deathSequence("l");
	      }
	      if (this.countr > 3) {
	        this.deathSequence("r");
	      }
	    }
	
	    //handles death sequence
	
	  }, {
	    key: 'deathSequence',
	    value: function deathSequence(side) {
	      var _this3 = this;
	
	      var gameOver = false;
	      var step = 8;
	      if (side === 'r') {
	        step = -8;
	      }
	      var Machine = new StateMachine(this.map, side);
	      var state = Machine.getState();
	      console.log(state);
	      if (state === 8) {
	        (function () {
	          _this3.gun.status = false;
	          _this3.turret.status = false;
	          var game = _this3;
	          clearInterval(_this3.interval); //clears game inteval
	          setTimeout(function () {
	            game.status = false;
	          }, 2000); //resets startup screen
	        })();
	      }
	
	      Machine.run();
	
	      // if(this.status === true){
	      //   //grabs the 4 closest troopers to the turret on the correct side
	      //   let troopers = this.troopers.filter( t => t.side === side && t.landed === true);
	      //   troopers.sort( (a, b) => {
	      //     Math.abs(a.x - 400) + Math.abs(b.x - 400);
	      //   });
	      //   [this.t0, this.t1, this.t2, this.t3] = troopers.slice(0, 4);
	      //   this.status = side;
	      // }
	      //
	      // //stops death sequence if count drops below 4
	      // if(side === 'l' && this.countl < 4){
	      //   this.status = true;
	      //   return undefined;
	      // }
	      // if(side === 'r' && this.countr < 4){
	      //   this.status = true;
	      //   return undefined;
	      // }
	      // //sets move direction based on side
	      // let v = this.status === "l" ? 1 : -1;
	      //
	      // let [t0, t1, t2, t3] = [this.t0, this.t1, this.t2, this.t3];
	      // //sets velocity of first trooper unless in final position
	      // t0.vx = Math.abs(t0.x + 4 - 400) > 52 ? v : 0;
	      // //sets trooper 2 velocity if trooper 1 in position
	      // if(Math.abs(t0.x + 4 - 400) === 52){
	      //   t1.vx = Math.abs(t1.x + 4 - 400) > 60 ? v : 0;
	      // }
	      // if(Math.abs(t1.x + 4 - 400) === 60 && this.timeout === false){
	      //     let game = this;
	      //     setTimeout(function(){
	      //       t1.x += v * 8;
	      //       t1.y -= 16;
	      //       game.timeout = false;
	      //     }, 200);
	      //     this.timeout = true;
	      // }
	      //
	      // //sets trooper 3 velocity if trooper 2 in position
	      // if(Math.abs(t1.x + 4 - 400) === 52){
	      //   t2.vx = Math.abs(t2.x + 4 - 400) > 60 ? v : 0;
	      // }
	      // //sets trooper 4 velocity if trooper 3 in position
	      // if(Math.abs(t2.x + 4 - 400) === 60){
	      //   t3.vx = Math.abs(t3.x + 4 - 400) > 68 ? v : 0;
	      // }
	      //
	      // if(Math.abs(t3.x + 4 - 400) === 68 && this.timeout === false){
	      //   let game = this;
	      //   this.interval = setInterval(function(){
	      //     t3.x += v * 8;
	      //     t3.y -= 16;
	      //   }, 200);
	      //   this.timeout = true;
	      // }
	      //destroys turret if trooper 4 is in position
	    }
	    //checks if object is in visible area
	
	  }, {
	    key: 'inBounds',
	    value: function inBounds(object) {
	      return object.y >= 0 && object.y <= this.canvas.height && object.x >= -60 && object.x <= this.canvas.width;
	    }
	    //checks for bullet helicopter collisions
	
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      for (var i = 0; i < this.bullets.length; i++) {
	        var bullet = this.bullets[i];
	        this.helicopterLogic(bullet);
	        this.trooperLogic(bullet);
	      }
	    }
	    //checks for trooper and chute collisions
	
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
	        }
	      }
	    }
	    //checks for bullet helicopter collisions
	
	  }, {
	    key: 'helicopterLogic',
	    value: function helicopterLogic(bullet) {
	      for (var j = 0; j < this.helicopters.length; j++) {
	        var helicopter = this.helicopters[j];
	        if (bullet.x > helicopter.x && bullet.x < helicopter.x + 48 && bullet.y > helicopter.y && bullet.y < helicopter.y + 20) {
	          helicopter.status = false;
	          bullet.status = false;
	          this.score += 10;
	          this.killCount += 1;
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
	    //event handler for shooting bullets
	
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(code) {
	      if ((code === "Space" || code === "ArrowUp") && this.gun.status === true) {
	        this.bullets.push(new Bullet(this.canvas, this.turret.fulcrum, this.gun.theta));
	        if (this.score > 0) {
	          this.score -= 1;
	        }
	      }
	    }
	    //rotates turret on keydown
	
	  }, {
	    key: 'keyDown',
	    value: function keyDown(event) {
	      if (this.status === "startup" || this.status === false) {
	        this.status = true;
	      } else if (this.status) {
	        this.gun.handleKeyDown(event.keyIdentifier);
	        this.handleKeyDown(event.code);
	      }
	    }
	    //freezes turret on keyup
	
	  }, {
	    key: 'keyUp',
	    value: function keyUp(event) {
	      if (this.status) {
	        this.gun.handleKeyUp(event.keyIdentifier);
	      }
	    }
	    //sets key handlers
	
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
	
	//draws stationary pieces of turret
	
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
	      //draws gun barrel based on specified angle 'this.theta'
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
	    //rotates gun based on velocity 'this.dtheta' and sets limit on rotation
	
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
	    //sets angular velocity on keydown
	
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
	    //freezes turret on keyup
	
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
	    //defines cartesian vx & vy based on angular position of gun
	    this.vx = -Math.cos(this.angle) * this.velocity;
	    this.vy = -Math.sin(this.angle) * this.velocity;
	    //starts oblect motion at end of barrel to avoid visual artifacts
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
	      //chooses image to render based on direction of movement and cycles through animation
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
	  title: './rsc/title.png',
	  start_text: './rsc/start-text.png',
	  instructions: './rsc/instructions.png',
	  helicopter_r0: './rsc/helicopter-right-0.png',
	  helicopter_r1: './rsc/helicopter-right-1.png',
	  helicopter_l0: './rsc/helicopter-left-0.png',
	  helicopter_l1: './rsc/helicopter-left-1.png',
	  bomber_l0: './rsc/bomber-l-0.png',
	  bomber_l1: './rsc/bomber-l-1.png',
	  bomber_l2: './rsc/bomber-l-2.png',
	  bomber_r0: './rsc/bomber-r-0.png',
	  bomber_r1: './rsc/bomber-r-1.png',
	  bomber_r2: './rsc/bomber-r-2.png',
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
	//loads images into cache as object 'ImageLibrary'
	
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
	    this.vy = 3;
	    this.vx = 0;
	    this.count = 0;
	    this.chute = false; //chute deployed on true
	    this.landed = false; //true if on ground
	    this.status = true; //set to false to flag for removal
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
	      //deploys chutes at specified height and slows fall
	      if (this.y < 302 && this.y > 298) {
	        this.chute = true;
	      }
	      this.vy = this.chute ? 1 : 3; //sets drop speed based on chute
	      this.vy = this.landed ? 0 : this.vy; //sets velocity to 0 if landed; 
	      this.y += this.vy;
	      this.x += this.vx;
	      //checks to see if trooper lives on landing
	      if (this.landed === false && this.y >= 544) {
	        this.landingLogic();
	      }
	      //removes any troopers off screen
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
	
	      //removes any troopers that land without chute
	      if (!this.chute) {
	        this.status = false;
	        this.ctx.drawImage(this.images.skull, this.x - 8, this.y - 14);
	        //kills any troopers on ground below falling trooper
	        this.map.forEach(function (trooper) {
	          if (trooper.pos === _this.pos) {
	            trooper.status = false;
	          }
	        });
	      }
	      this.vy = 0; //stops falling trooper on impact with ground
	      this.y = 560;
	      this.map.forEach(function (trooper) {
	        if (trooper.pos === _this.pos) {
	          _this.y -= 16;
	        } //stacks troopers in same position
	      });
	      this.chute = false; //removes chute on succesful landing
	      this.landed = true;
	    }
	  }]);
	
	  return Trooper;
	}();
	
	module.exports = Trooper;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Bomber = function () {
	  function Bomber(canvas, images, dir, level) {
	    _classCallCheck(this, Bomber);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.images = images;
	    this.level = level;
	    this.status = true; //setting to false flags object for removal
	    this.payload = true; //set to false when bomber drops bomb
	    this.dir = dir === 1 ? "l" : "r";
	    this.count = 0;
	    this.vx = 4 * (1 + (this.level - 1) / 10); //sets velocity based on level
	    this.y = 40;
	    this.x = -50;
	    if (this.dir === "l") {
	      //sets velocity based on direction
	      this.x = 800;
	      this.vx *= -1;
	    }
	  }
	
	  _createClass(Bomber, [{
	    key: "draw",
	    value: function draw() {
	      var img = void 0;
	      var n = ~~(this.count % 9 / 3);
	      //selects which frame to render based on a 9 frame cycle and direction of motion
	      if (this.dir === "r" && n === 0) {
	        img = this.images.bomber_r0;
	      }
	      if (this.dir === "r" && n === 1) {
	        img = this.images.bomber_r1;
	      }
	      if (this.dir === "r" && n === 2) {
	        img = this.images.bomber_r2;
	      }
	      if (this.dir === "l" && n === 0) {
	        img = this.images.bomber_l0;
	      }
	      if (this.dir === "l" && n === 1) {
	        img = this.images.bomber_l1;
	      }
	      if (this.dir === "l" && n === 2) {
	        img = this.images.bomber_l2;
	      }
	      this.ctx.drawImage(img, this.x, this.y);
	    }
	  }, {
	    key: "step",
	    value: function step() {
	      this.x += this.vx;
	      if (this.x > 800 || this.x < -60) {
	        this.status = false;
	      } //removes objects after leaving visible area
	      this.count += 1;
	    }
	  }]);
	
	  return Bomber;
	}();
	
	module.exports = Bomber;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Bomb = function () {
	  function Bomb(canvas, bomber) {
	    _classCallCheck(this, Bomb);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.x = bomber.x + 20;
	    this.y = bomber.y + 20;
	    this.vx = bomber.vx / 2;
	    this.vy = 3 * (1 + (bomber.level - 1) / 10);
	    this.status = true;
	  }
	
	  _createClass(Bomb, [{
	    key: 'draw',
	    value: function draw() {
	      this.ctx.fillStyle = '#FFFFFF';
	      this.ctx.beginPath();
	      this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
	      this.ctx.fill();
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.x += this.vx;
	      this.y += this.vy;
	      if (this.y > 510) {
	        this.y = 530;
	        this.x = 400;
	      }
	    }
	  }]);
	
	  return Bomb;
	}();
	
	module.exports = Bomb;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StateMachine = function () {
	  function StateMachine(map, side) {
	    _classCallCheck(this, StateMachine);
	
	    this.map = map;
	    this.side = side;
	    this.start = side === 'l' ? 43 : 56;
	    this.fwd = this.side === 'l' ? 1 : -1;
	    this.back = this.fwd * -1;
	    this.state = this.getState();
	    this.vx = 1;
	  }
	
	  //state map: X = must be present, 0 = must be absent:
	  //0: 0 0  1: 0 0    2: 0 0    3: 0 0    4: 0 0     5: 0 0      6: 0 0    7: 0 X  8: X
	  //     0       0         0         X         X 0        X 0         X X       X
	  //     0       X 0       X X       X 0       X X 0      X X X       X X       X
	
	  _createClass(StateMachine, [{
	    key: 'getState',
	    value: function getState() {
	      var start = this.start;
	      var fwd = this.fwd;
	      var back = this.back;
	      var C = this.posCount.bind(this);
	      var state = 0;
	      if (C(start) === 1 && C(start + back) < 1) {
	        state = 1;
	      }
	      if (C(start) === 1 && C(start + back) > 0) {
	        state = 2;
	      }
	      if (C(start) === 2 && C(start + back) === 0) {
	        state = 3;
	      }
	      if (C(start) === 2 && C(start + back) === 1 && C(start + back + back) === 0) {
	        state = 4;
	      }
	      if (C(start) === 2 && C(start + back) === 1 && C(start + back + back) > 0) {
	        state = 5;
	      }
	      if (C(start) === 2 && C(start + back) > 1) {
	        state = 6;
	      }
	      if (C(start) > 2) {
	        state = 7;
	      }
	      if (C(start + fwd) > 0) {
	        state = 8;
	      }
	      return state;
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      if (this.state === 8) {
	        return;
	      }
	      var trooper = this.grabNearestTrooper();
	      switch (this.state) {
	        case 0:
	        case 1:
	        case 3:
	        case 4:
	          this.trooperStep();
	          break;
	        case 2:
	        case 5:
	        case 6:
	        case 7:
	          this.trooperJump();
	          break;
	      }
	    }
	    //increments count and moves trooper forward 8 pixels if count > 8
	
	  }, {
	    key: 'trooperStep',
	    value: function trooperStep() {
	      var trooper = this.grabNearestTrooper();
	      trooper.count += this.vx;
	      if (trooper.count > 8) {
	        trooper.count %= 8;
	        trooper.x += 8 * this.fwd;
	        trooper.pos += this.fwd;
	      }
	    }
	    //moves trooper forward 1 pos and up 1 pos
	
	  }, {
	    key: 'trooperJump',
	    value: function trooperJump() {
	      var trooper = this.grabNearestTrooper();
	      trooper.count += this.vx;
	      if (trooper.count > 8) {
	        trooper.count %= 8;
	        trooper.x += 8 * this.fwd;
	        trooper.y -= 16;
	        trooper.pos += this.fwd;
	      }
	    }
	
	    //returns nearest trooper appropriate for move given state
	
	  }, {
	    key: 'grabNearestTrooper',
	    value: function grabNearestTrooper(state) {
	      var startArr = [0, 1, 1, 1, 2, 2, 1, 0];
	      var step = this.back;
	      var startPos = this.start + startArr[this.state] * step;
	      var trooperArr = void 0;
	      //searches this.map for nearest occupied position
	      for (var i = startPos; i < 100 && i > -1; i += step) {
	        trooperArr = this.map[i];
	        if (trooperArr) {
	          break;
	        }
	      }
	      //gets trooper with greatest height (least Y)
	      var trooper = trooperArr[0];
	      for (var _i = 1; _i < trooperArr.length; _i++) {
	        if (trooperArr[_i].y < trooper.y) {
	          trooper = trooperArr[_i];
	        }
	      }
	      return trooper;
	    }
	    //returns number of troopers at position 'int'
	
	  }, {
	    key: 'posCount',
	    value: function posCount(int) {
	      if (!this.map[int]) {
	        return 0;
	      }
	      return this.map[int].length;
	    }
	  }]);
	
	  return StateMachine;
	}();
	
	module.exports = StateMachine;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IntroScreen = function () {
	  function IntroScreen(canvas, images) {
	    _classCallCheck(this, IntroScreen);
	
	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');
	    this.images = images;
	  }
	
	  _createClass(IntroScreen, [{
	    key: 'draw',
	    value: function draw() {
	      this.ctx.drawImage(this.images.title, 175, 100);
	    }
	  }]);
	
	  return IntroScreen;
	}();
	
	module.exports = IntroScreen;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map