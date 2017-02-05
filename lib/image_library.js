const IMAGES = {
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
  // trooper: './rsc/trooper.png',
  // chute: './rsc/chute.png',
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
class ImageLibrary {
  constructor(){
    let images = {};
    Object.keys(IMAGES).forEach( (key) => {
      let img = new Image();
      img.src = IMAGES[key];
      images[key] = img;

    });
    this.images = images;
  }
}

module.exports = ImageLibrary;
