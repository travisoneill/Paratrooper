class Gun {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.theta = 90;
    this.dtheta = 0;
    this.status = true;
  }

  draw(fulcrum){
    let width = 12;
    let height = 36;
    if(this.status === false){
      width = 0;
      height = 0;
    }
    //draws gun barrel based on specified angle 'this.theta'
    let x = fulcrum.x;
    let y = fulcrum.y;
    this.ctx.translate(x, y);
    let startx = width/2;
    let starty = width/2;
    this.ctx.rotate(this.theta * Math.PI / 180);
    this.ctx.fillStyle = '#55FFFF';
    this.ctx.beginPath();
    this.ctx.moveTo(startx, starty);
    this.ctx.lineTo(startx , starty - width);
    this.ctx.lineTo(startx - height, starty - width);
    this.ctx.arc(startx - height, starty - width/2, width/2, 3 * Math.PI/2, Math.PI/2, true);
    this.ctx.lineTo(startx, starty);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.setTransform(1,0,0,1,0,0);
  }
  //rotates gun based on velocity 'this.dtheta' and sets limit on rotation
  step(){
    if(this.theta <= 10 && this.dtheta < 0){this.theta += 0;}
    else if(this.theta >= 170 && this.dtheta > 0){this.theta += 0;}
    else { this.theta += this.dtheta;}
  }
  //sets angular velocity on keydown
  handleKeyDown(key){
    if(key === "Left"){this.dtheta = -3;}
    if(key === "Right"){this.dtheta = 3;}
  }
  //freezes turret on keyup
  handleKeyUp(key){
    if(key === "Left"){this.dtheta = 0;}
    if(key === "Right"){this.dtheta = 0;}
  }
}
module.exports = Gun;
