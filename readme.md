#  p5.js リファレンス
https://p5js.org/

https://qiita.com/bit0101/items/91818244dc26c767a0fe



# 本ソースについて
別途用意してあるGlitchクラスによりエフェクトを適応しています。 
サンプルにあるような、スライスした画像が元の画像より外にはみ出るエフェクトは、canvasのサイズが画像と同じサイズになるようにしているので、このjsでははみ出しません（cssの`overflow: hidden;`に近い感じです。） 


各エフェクトの頻度を調整するにはglitch.jsの関数の数値を変更してください。 
軽く頻度の調整程度であればコメントがある`random()`を含むif文の数値を変更で良いかと思います。

`random()`や`floor()`は一応p5.jsの関数ですが、jsのものとほぼ意味合いは同じです。


cssに関しては`glitch.css`にもとのLPのリセット用と青い画像を固定するためのcssを記述しています。pc背景用のほうは元のLPの時点で固定になっているので記述していません。`position: fixed`のものしか書いていませんので作業時に適当にあわせてください。 
canvasのサイズはjs側でそれぞれ`createCanvas()`でサイズを指定して書き出していますので、cssでサイズ変更するには!importantを充てる必要があります。


htmlのほうは、glitchのcanvas作成用に`id="p5-canvas"`や`id="p5-bg-canvas"`が必須なだけですのでデザインに合わせて変更ください。 

本サンプルのindex.htmlで読み込んでいるapp.jsでは、グリッチを修正する場合や増やす場合など変更する際はwebpackによってコンパイルする必要があります。 
なので下記のsetup、start upを行って環境を作成してください。

webpack環境整えるのが難しい場合は、`glitch_effect.html`と`glitch_effect.js`の方を利用してください。 
`glitch_effect.js`はコンパイルなしのファイルになっていて、画像の読み込み方が違ったりやGlitchクラスが同一ファイル上に書いてあったりしています。こちらは非コンパイルソースなのでhtml側でp5.jsのライブラリjsを読み込む必要があります。






## set up
npm install

## start up
npm run watch:webpack　

## test
https://vantan.develop-env.info/www.vantan-game.com/lp/glitch_test/


##　memo 
https://twotone.me/web/4177/ 
https://note.com/omakazu/n/n32407af964ed 
https://himco.jp/2019/11/24/11%EF%BC%9A%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88-objects/