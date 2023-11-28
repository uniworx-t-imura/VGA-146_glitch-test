#  p5.js リファレンス
https://p5js.org/

https://qiita.com/bit0101/items/91818244dc26c767a0fe



# 
別途用意してあるGlitchクラスによりエフェクトを適応しています。 
サンプルにあるような、スライスした画像が元の画像より外にはみ出るエフェクトは、canvasのサイズが画像と同じサイズになるようにしているので、このjsでははみ出しません（cssの`overflow: hidden;`に近い感じです。） 


各エフェクトの頻度を調整するにはglitch.jsの関数の数値を変更してください。 
軽く頻度の調整程度であればコメントがある`random()`を含むif文の数値を変更で良いかと思います。

`random()`や`floor()`は一応p5.jsの関数ですが、jsのものとほぼ意味合いは同じです。


# webpack と p5.js のサンプル

参考:https://codepen.io/tksiiii/pen/xdQgJX

## set up

npm install

## start up

npm run dev




https://vantan.develop-env.info/www.vantan-game.com/lp/glitch_test/



https://twotone.me/web/4177/
https://note.com/omakazu/n/n32407af964ed



https://himco.jp/2019/11/24/11%EF%BC%9A%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88-objects/