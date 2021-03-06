class StateMachine {
  constructor(map, side){
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

  getState(){
    const start = this.start;
    const fwd = this.fwd;
    const back = this.back;
    const C = this.posCount.bind(this);
    let state = 0;
    if(C(start) === 1 && C(start + back) < 1){state = 1;}
    if(C(start) === 1 && C(start + back) > 0){state = 2;}
    if(C(start) === 2 && C(start + back) === 0){state = 3;}
    if(C(start) === 2 && C(start + back) === 1 && C(start + back + back) === 0){state = 4;}
    if(C(start) === 2 && C(start + back) === 1 && C(start + back + back) > 0){state = 5;}
    if(C(start) === 2 && C(start + back) > 1){state = 6;}
    if(C(start) > 2){state = 7;}
    if(C(start + fwd) > 0){state = 8;}
    return state;
  }

  run(){
    if(this.state === 8){return;}
    const trooper = this.grabNearestTrooper();
    switch(this.state){
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
  trooperStep(){
    const trooper = this.grabNearestTrooper();
    trooper.count += this.vx;
    if(trooper.count > 8){
      trooper.count %= 8;
      trooper.x += 8 * this.fwd;
      trooper.pos += this.fwd;
    }
  }
  //moves trooper forward 1 pos and up 1 pos
  trooperJump(){
    const trooper = this.grabNearestTrooper();
    trooper.count += this.vx;
    if(trooper.count > 8){
      trooper.count %= 8;
      trooper.x += 8 * this.fwd;
      trooper.y -= 16;
      trooper.pos += this.fwd;
    }
  }

  //returns nearest trooper appropriate for move given state
  grabNearestTrooper(state){
    const startArr = [0, 1, 1, 1, 2, 2, 1, 0];
    const step = this.back;
    const startPos = this.start + startArr[this.state] * step;
    let trooperArr;
    //searches this.map for nearest occupied position
    for (let i = startPos; i < 100 && i > -1; i += step) {
      trooperArr = this.map[i];
      if(trooperArr){break;}
    }
    //gets trooper with greatest height (least Y)
    let trooper = trooperArr[0];
    for (let i = 1; i < trooperArr.length; i++) {
      if(trooperArr[i].y < trooper.y){trooper = trooperArr[i];}
    }
    return trooper;
  }
  //returns number of troopers at position 'int'
  posCount(int){
    if(!this.map[int]){return 0;}
    return this.map[int].length;
  }
}

module.exports = StateMachine;
