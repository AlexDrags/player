const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 200,
    poll: 1000,
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[hash].js',
    clean: true
  },
  module: {
    rules: [
      { 
        test: /\.svg$/i, 
        use: 'svg-inline-loader' 
      },
      {
        test: /\.(woff?2|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.SourceMapDevToolPlugin({}),
    new HtmlWebpackPlugin({ 
      //filename: '[hash].html',
      template: './src/index.html',
      favicon: './favicon.ico',
      hash: true,
    }),
    new FaviconsWebpackPlugin(path.resolve(__dirname,"src/img/favicon/favicon.svg")),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname,"public"), to: path.resolve(__dirname,"dist") },
        //{ from: path.resolve(__dirname,"src/fonts"), to: "fonts" }
      ],
    })
  ],
};