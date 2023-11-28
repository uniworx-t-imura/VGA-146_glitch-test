const p5 = require("p5");
let isLoaded = false;
let glitch;
let glitch2;
let playful;
let canvasW;
const windowW = window.innerWidth,
windowH = window.innerHeight;
import imgSrc from "../img/fixed_background_img_sample.jpg";
import imgBgSrc from "../img/bg_contens.jpg";
import Glitch from "./glitch";



// const parent = document.getElementById('canvas-container');
// const canvas = document.getElementById('canvas');
// // 2次元の描画を行うメソッド
// const ctx = canvas.getContext('2d');
// // リサイズ時の判定用変数
// let isInit = false;

// function initP5(sketch) {
const initP5 = function (sketch) {
  sketch.setup = function () {
    if (windowW >= 700) {
      canvasW = 375;
    } else {
      canvasW = windowW;
    }
    sketch.createCanvas(canvasW, windowH);
    // sketch.reset()
    // sketch.loadImage(imgSrc, function (img) {
    //   glitch = new Glitch(img, sketch);
    //   isLoaded = true;
    // },0,0);
    sketch.loadImage(imgSrc, function (img) {
      glitch = new Glitch(img, sketch);
      isLoaded = true;
      sketch.image(img, 0, 200, 150, 100);
      console.log(sketch);
    });
  };
  sketch.reset = function () {
    console.log("sss");
  }
  sketch.draw = function () {
    sketch.clear();
    sketch.background(343, 85, 92, 100);
    // sketch.image(imgSrc, 10, 10, 640 - 20, 335 - 20);
    //isLoadedで判定すると読み込みの関係で止まる可能性があるので
    //何回でもdrawは判定するようなのでglitchがtrueになってからshowとする
    if (glitch) {
      glitch.show();
    }
  };
   // コンポーネントのレスポンシブ化
   sketch.windowResized = () => {
    if (windowW >= 700) {
      canvasW = 375;
    } else {
      canvasW = windowW;
    }
  sketch.resizeCanvas(canvasW, windowH);
  sketch.reset()
 
};

};

// function initP5bg(p) {
const initP5bg = function (sketch) {
  sketch.setup = function () {
      sketch.createCanvas(windowW, windowH);
      sketch.reset()
   
  };
  sketch.reset = function () {
    sketch.loadImage(imgBgSrc, function (img) {
      glitch2 = new Glitch(img, sketch);
      isLoaded = true;
    });
  }
  sketch.draw = function () {
    if (glitch2) {
      sketch.clear();
      glitch2.show();
    }
  };
   // コンポーネントのレスポンシブ化
   sketch.windowResized = () => {
   
    sketch.resizeCanvas(windowW, windowH);
  sketch.reset()
};
};


new p5(initP5, "p5-canvas");
new p5(initP5bg, "p5-bg-canvas");
