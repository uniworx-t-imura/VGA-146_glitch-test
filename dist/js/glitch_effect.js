let isLoaded = false;
let glitch;
let glitch2;
let canvasW;
let windowW = window.innerWidth,
  windowH = window.innerHeight;
let imgSrc = "./img/fixed_background_img_sample.jpg";
let imgBgSrc = "./img/bg_contens.jpg";

const initP5 = function (sketch) {
  sketch.setup = function () {
    if (windowW >= 700) {
      canvasW = 375;
    } else {
      canvasW = 375;
    }
    sketch.createCanvas(canvasW, windowH);
    sketch.loadImage(imgSrc, function (img) {
      glitch = new Glitch(img, sketch);
      isLoaded = true;
    });
  };
  sketch.reset = function () {
  };
  sketch.draw = function () {
    sketch.clear();
    sketch.background(5, 15, 18);
    //isLoadedで判定すると読み込みの関係で止まる可能性があるので
    //何回でもdrawは判定するようなのでglitchがtrueになってからshowとする
    if (glitch) {
      glitch.show();
    }
  };
  // コンポーネントのレスポンシブ化
    sketch.windowResized = () => {
    let windowW = window.innerWidth;
    if (windowW >= 700) {
      canvasW = 375;
    } else {
      canvasW = 375;
    }
    sketch.resizeCanvas(canvasW, window.innerHeight);
    sketch.reset();
  };
};

const initP5bg = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(windowW, windowH);
    sketch.reset();
  };
  sketch.reset = function () {
    sketch.loadImage(imgBgSrc, function (img) {
      glitch2 = new Glitch(img, sketch);
      isLoaded = true;
    });
  };
  sketch.draw = function () {
    if (glitch2) {
      sketch.clear();
      glitch2.show();
    }
  };
  // コンポーネントのレスポンシブ化
  sketch.windowResized = () => {
    sketch.resizeCanvas(window.innerWidth, window.innerHeight);
  };
};

new p5(initP5, "p5-canvas");
new p5(initP5bg, "p5-bg-canvas");


// Glitchクラス　
class Glitch {
  constructor(img, p) {
    this.p = p;
    this.channelLen = 4;
    this.imgOrigin = img;
    this.imgOrigin.loadPixels();
    this.copyData = [];
    this.flowLineImgs = [];
    this.shiftLineImgs = [];
    this.shiftRGBs = [];
    this.scatImgs = [];
    this.throughFlag = true;
    this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

    // flow line
    for (let i = 0; i < 1; i++) {
      let o = {
        pixels: null,
        t1: this.p.floor(this.p.random(0, 1000)),
        speed: this.p.floor(this.p.random(4, 24)),
        randX: this.p.floor(this.p.random(24, 80)),
      };

      this.flowLineImgs.push(o);
    }

    // shift line
    for (let i = 0; i < 6; i++) {
      let o = null;
      this.shiftLineImgs.push(o);
    }

    // shift RGB
    for (let i = 0; i < 1; i++) {
      let o = null;
      this.shiftRGBs.push(o);
    }

    // scat imgs
    for (let i = 0; i < 3; i++) {
      let scatImg = {
        img: null,
        x: 0,
        y: 0,
      };

      this.scatImgs.push(scatImg);
    }
 
  }
  

  replaceData(destImg, srcPixels) {
    for (let y = 0; y < destImg.height; y++) {
      for (let x = 0; x < destImg.width; x++) {
        let r, g, b, a;
        let index;
        index = (y * destImg.width + x) * this.channelLen;
        r = index;
        g = index + 1;
        b = index + 2;
        a = index + 3;
        destImg.pixels[r] = srcPixels[r];
        destImg.pixels[g] = srcPixels[g];
        destImg.pixels[b] = srcPixels[b];
        destImg.pixels[a] = srcPixels[a];
      }
    }
    destImg.updatePixels();
  }

  flowLine(srcImg, obj) {
    let destPixels, tempY;
    destPixels = new Uint8ClampedArray(srcImg.pixels);
    obj.t1 %= srcImg.height;
    obj.t1 += obj.speed;
    tempY = this.p.floor(obj.t1);
    for (let y = 0; y < srcImg.height; y++) {
      if (tempY === y) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a;
          let index;
          index = (y * srcImg.width + x) * this.channelLen;
          r = index;
          g = index + 1;
          b = index + 2;
          a = index + 3;
          destPixels[r] = srcImg.pixels[r] + obj.randX;
          destPixels[g] = srcImg.pixels[g] + obj.randX;
          destPixels[b] = srcImg.pixels[b] + obj.randX;
          destPixels[a] = srcImg.pixels[a];
        }
      }
    }
    return destPixels;
  }

  shiftLine(srcImg) {
    let offsetX;
    let rangeMin, rangeMax;
    let destPixels;
    let rangeH;

    destPixels = new Uint8ClampedArray(srcImg.pixels);
    rangeH = srcImg.height;
    rangeMin = this.p.floor(this.p.random(0, rangeH));
    rangeMax = rangeMin + this.p.floor(this.p.random(1, rangeH - rangeMin));
    offsetX = this.channelLen * this.p.floor(this.p.random(-40, 40));

    for (let y = 0; y < srcImg.height; y++) {
      if (y > rangeMin && y < rangeMax) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a;
          let r2, g2, b2, a2;
          let index;

          index = (y * srcImg.width + x) * this.channelLen;
          r = index;
          g = index + 1;
          b = index + 2;
          a = index + 3;
          r2 = r + offsetX;
          g2 = g + offsetX;
          b2 = b + offsetX;
          destPixels[r] = srcImg.pixels[r2];
          destPixels[g] = srcImg.pixels[g2];
          destPixels[b] = srcImg.pixels[b2];
          destPixels[a] = srcImg.pixels[a];
        }
      }
    }
    return destPixels;
  }

  shiftRGB(srcImg) {
    let randR, randG, randB;
    let destPixels;
    let range;

    range = 16;
    destPixels = new Uint8ClampedArray(srcImg.pixels);
    randR =
      (this.p.floor(this.p.random(-range, range)) * srcImg.width +
        this.p.floor(this.p.random(-range, range))) *
      this.channelLen;
    randG =
      (this.p.floor(this.p.random(-range, range)) * srcImg.width +
        this.p.floor(this.p.random(-range, range))) *
      this.channelLen;
    randB =
      (this.p.floor(this.p.random(-range, range)) * srcImg.width +
        this.p.floor(this.p.random(-range, range))) *
      this.channelLen;

    for (let y = 0; y < srcImg.height; y++) {
      for (let x = 0; x < srcImg.width; x++) {
        let r, g, b, a;
        let r2, g2, b2, a2;
        let index;

        index = (y * srcImg.width + x) * this.channelLen;
        r = index;
        g = index + 1;
        b = index + 2;
        a = index + 3;
        r2 = (r + randR) % srcImg.pixels.length;
        g2 = (g + randG) % srcImg.pixels.length;
        b2 = (b + randB) % srcImg.pixels.length;
        destPixels[r] = srcImg.pixels[r2];
        destPixels[g] = srcImg.pixels[g2];
        destPixels[b] = srcImg.pixels[b2];
        destPixels[a] = srcImg.pixels[a];
      }
    }

    return destPixels;
  }

  getRandomRectImg(srcImg) {
    let startX;
    let startY;
    let rectW;
    let rectH;
    let destImg;
    startX = this.p.floor(this.p.random(0, srcImg.width - 30));
    startY = this.p.floor(this.p.random(0, srcImg.height - 50));
    rectW = this.p.floor(this.p.random(30, srcImg.width - startX));
    rectH = this.p.floor(this.p.random(1, 50));
    destImg = srcImg.get(startX, startY, rectW, rectH);
    destImg.loadPixels();
    return destImg;
  }

  show() {
    // restore the original state
    this.replaceData(this.imgOrigin, this.copyData);

    // sometimes pass without effect processing　グリッチが起きるかどうか（全共通）
    let n = this.p.floor(this.p.random(100));
    if (n > 75 && this.throughFlag) {//うごくチャンスがあって0~100で75より大きいとき（≒24%）
      this.throughFlag = false;
      setTimeout(() => {
        this.throughFlag = true;
      }, this.p.floor(this.p.random(40, 5000)));//40ms~5000msに一度グリッチがうごくチャンス
    }
    if (!this.throughFlag) {//グリッチがうごかないときは元の画像を表示し再抽選
      this.p.push();
      const a = this.p.width / this.p.height; // 画面の縦1に対する横の比
      const b = this.imgOrigin.width / this.imgOrigin.height; // 画像の縦1に対する横の比
      let w, h;
      if (a > b) {
        w = this.p.width;
        h = this.imgOrigin.height * (this.p.width / this.imgOrigin.width);
      } else {
        h = this.p.height;
        w = this.imgOrigin.width * (this.p.height / this.imgOrigin.height);
      }
      this.p.image(this.imgOrigin,(this.p.width - w) / 2, (this.p.height - h) / 2, w, h);
      this.p.pop();
      return;
    }

    // flow line　1pxの白いラインが落ちてくる
    this.flowLineImgs.forEach((v, i, arr) => {// 0~100で75より大きいとき（≒24%）
      arr[i].pixels = this.flowLine(this.imgOrigin, v);
      if (arr[i].pixels) {
        this.replaceData(this.imgOrigin, arr[i].pixels);
      }
    });

    // shift line 　ブロック状にカットされた画像のグリッチ
    this.shiftLineImgs.forEach((v, i, arr) => {
      if (this.p.floor(this.p.random(100)) > 50) {// 0~100で50より大きいとき（≒49%）
        arr[i] = this.shiftLine(this.imgOrigin);
        this.replaceData(this.imgOrigin, arr[i]);
      } else {
        if (arr[i]) {
          this.replaceData(this.imgOrigin, arr[i]);
        }
      }
    });

    // shift rgb　カラーチャンネルが乱れる
    this.shiftRGBs.forEach((v, i, arr) => {
      if (this.p.floor(this.p.random(100)) > 65) {// 0~100で65より大きいとき（≒34%）
        arr[i] = this.shiftRGB(this.imgOrigin);
        this.replaceData(this.imgOrigin, arr[i]);
      }
    });

    this.p.push();
    const a = this.p.width / this.p.height; // 画面の縦1に対する横の比
    const b = this.imgOrigin.width / this.imgOrigin.height; // 画像の縦1に対する横の比
    let w, h;
    if (a > b) {
      w = this.p.width;
      h = this.imgOrigin.height * (this.p.width / this.imgOrigin.width);
    } else {
      h = this.p.height;
      w = this.imgOrigin.width * (this.p.height / this.imgOrigin.height);
    }
    this.p.image(this.imgOrigin,(this.p.width - w) / 2, (this.p.height - h) / 2, w, h);
    this.p.pop();

    // scat image  画像がスライスされて左右にずれる
    this.scatImgs.forEach((obj) => {
      this.p.push();
      this.p.translate(
        (this.p.width - this.imgOrigin.width) / 2,
        (this.p.height - this.imgOrigin.height) / 2
      );
      if (this.p.floor(this.p.random(100)) > 80) {// 0~100で80より大きいとき（≒19%）
        obj.x = this.p.floor(
          this.p.random(-this.imgOrigin.width * 0.3, this.imgOrigin.width * 0.7)
        );
        obj.y = this.p.floor(
          this.p.random(-this.imgOrigin.height * 0.1, this.imgOrigin.height)
        );
        obj.img = this.getRandomRectImg(this.imgOrigin);
      }
      if (obj.img) {
        this.p.image(obj.img, obj.x, obj.y);
      }
      this.p.pop();
    });
  }
}