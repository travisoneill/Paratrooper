const IMAGES = {
  helicopter_r0: './rsc/helicopter-right-0.png',
  helicopter_r1: './rsc/helicopter-right-1.png',
  helicopter_l0: './rsc/helicopter-left-0.png',
  helicopter_l1: './rsc/helicopter-left-1.png',
  trooper: './rsc/trooper.png',
  chute: './rsc/chute.png',
  skull: './rsc/skull.png'
};



class ImageLibrary {
  constructor(){
    let images = {};
    Object.keys(IMAGES).forEach( (key) => {
      let img = new Image();
      img.src = IMAGES[key];
      images[key] = img;

    });
    this.images = images;
    console.log(this.images);
  }
}

module.exports = ImageLibrary;
