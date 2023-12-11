const p5 = require("p5");
let isLoaded = false;
let glitch;
let glitch2;
let canvasW;
let windowW = window.innerWidth,
  windowH = window.innerHeight;
import imgSrc from "../img/fixed_background_img_sample.jpg";
import imgBgSrc from "../img/bg_contens.jpg";
import Glitch from "./glitch";

const initP5 = function (sketch) {
  sketch.setup = function () {
    if (windowW >= 500) {
      canvasW = 500;
    } else {
      canvasW = window.innerWidth;
    }
    sketch.createCanvas(canvasW, 635);
    sketch.loadImage(imgSrc, function (img) {
      glitch = new Glitch(img, sketch);
      isLoaded = true;
    });
  };
  sketch.reset = function () {
    console.log("sss");
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
    if (windowW >= 500) {
      canvasW = 500;
    } else {
      canvasW = window.innerWidth;
    }
    console.log(canvasW);
    sketch.resizeCanvas(canvasW, 635);
    sketch.reset();
  };
};

// 背景のグリッチはなしに
// const initP5bg = function (sketch) {
//   sketch.setup = function () {
//     sketch.createCanvas(windowW, windowH);
//     sketch.reset();
//   };
//   sketch.reset = function () {
//     sketch.loadImage(imgBgSrc, function (img) {
//       glitch2 = new Glitch(img, sketch);
//       isLoaded = true;
//     });
//   };
//   sketch.draw = function () {
//     if (glitch2) {
//       sketch.clear();
//       glitch2.show();
//     }
//   };
//   // コンポーネントのレスポンシブ化
//   sketch.windowResized = () => {
//     sketch.resizeCanvas(window.innerWidth, window.innerHeight);
//   };
// };

new p5(initP5, "p5-canvas");
// new p5(initP5bg, "p5-bg-canvas");
