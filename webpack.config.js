const mode = process.env.NODE_ENV || "development";
const config = require("./config");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const Sass = require("sass");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: mode,
  devtool: mode === "development" ? "source-map" : false,
  watchOptions: {
    poll: true
  },
  entry: {
    [config.entry.jsApp.dist]: config.entry.jsApp.src,
  },
  output: {
    filename: mode === "production" ? "[name].min.js" : "[name].js",
    path: path.resolve(__dirname, config.dist)
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json", ".scss"]
  },
  plugins: [
    // cssの出力先を指定する
    new MiniCssExtractPlugin({
        filename: ({chunk}) => `${chunk.name.replace("/js/", "/css/")}.css`
      }
    )
  ],
  module: {
    rules: [
      {
        // 画像やフォントファイル
        test: /\.(ico|png|svg|jpg)$/,
        generator: {
          filename: `./img/[name][ext]`,
        },
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
        sideEffects: true, // production modeでもswiper-bundle.cssが使えるように
      },

      {
        test: /\.scss?$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {
            loader: "css-loader",
            options: {
              url: false, // CSS内のurl()メソッドの取り込みを禁止する
              sourceMap: true, // ソースマップの利用有無
              importLoaders: 2 // Sass+PostCSSの場合は2を指定
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: Sass,
              sassOptions: {
                includePaths: [
                  'node_modules',
                  path.resolve(__dirname, config.entry.assetsCSS),
                ],
                // importer: NodeSassGlobImporter(),
                // fiber: false // not supported fiber >= 16
              }
            }
          }
        ]
      },
      {
        test: [/\.ts$/, /\.tsx$/],
        use: [
          {
            loader: "babel-loader"
          }
          // "ts-loader"
        ],
        exclude: [/test|node_modules\/(?!(dom7|ssr-window|swiper)\/).*/]
      },
      {
        test: [/\.ts$/, /\.jsx$/],
        use: [
          // 下から順に処理される
          {
            loader: "babel-loader"
          }
        ],
        exclude: [/test|node_modules/]
      }
    ]
  },
  optimization:
    mode === "production"
      ? {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true // console.log等をproduction用ファイルに含めないため
              }
            }
          })
        ]
      }
      : {}
};
