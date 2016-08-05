class Bomber {
  constructor(canvas, images, dir, level){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = images;
    this.level = level;
    this.status = true; //setting to false flags object for removal
    this.payload = true; //set to false when bomber drops bomb
    this.dir = dir === 1 ? "l" : "r";
    this.count = 0;
    this.vx = 4 * (1 + ((this.level - 1) / 10)); //sets velocity based on level
    this.y = 40;
    this.x = -50;
    if(this.dir === "l"){ //sets velocity based on direction
      this.x = 800;
      this.vx *= -1;
    }
  }

  draw(){
    let img;
    let n = ~~((this.count % 9) / 3);
    //selects which frame to render based on a 9 frame cycle and direction of motion
    if(this.dir === "r" &&  n === 0){ img = this.images.bomber_r0;}
    if(this.dir === "r" &&  n === 1){ img = this.images.bomber_r1;}
    if(this.dir === "r" &&  n === 2){ img = this.images.bomber_r2;}
    if(this.dir === "l" &&  n === 0){ img = this.images.bomber_l0;}
    if(this.dir === "l" &&  n === 1){ img = this.images.bomber_l1;}
    if(this.dir === "l" &&  n === 2){ img = this.images.bomber_l2;}
    this.ctx.drawImage(img, this.x, this.y);
  }

  step(){
    this.x += this.vx;
    if(this.x > 800 || this.x < -60){this.status = false;} //removes objects after leaving visible area
    this.count += 1;
  }
}

module.exports = Bomber;
