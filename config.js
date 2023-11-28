/**
 * ビルドツールが参照する定義です。
 */
const srcPath = './src/';
const distPath = './dist';

module.exports = {
  src: srcPath,
  dist: distPath,
  entry: {
    src: srcPath,
    dist: distPath,
    assets: {
      src: srcPath,
      dist: distPath
    },
    assetsCSS: srcPath + '/css/',
    jsApp: {
      src: './src/js/app.ts',
      dist: './js/app'
    },
    
  }
};
