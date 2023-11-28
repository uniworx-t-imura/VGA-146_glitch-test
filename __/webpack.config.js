/** ↓ エディタで補完を効かせるための JSDoc */
/** @type {import('webpack').Configuration} */
const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    // ファイル名
    filename: "bundle.js",
    // 出力するフォルダ
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "asset/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // 画像やフォントファイル
        test: /\.(ico|png|svg|jpg)$/,
        generator: {
          filename: `./img/[name][ext]`,
        },
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      scriptLoading: "defer",
    }),
  ],
};
