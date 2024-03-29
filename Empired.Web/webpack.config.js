"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3030";

loaders.push({
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
  exclude: ['node_modules']
});
loaders.push({
    test: /\.png/,
    exclude: /(node_modules|bower_components)/,
    loader: "file-loader?limit=10000&mimetype=image/png",
    
    });

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './Scripts/app/src/index.jsx',
    './Scripts/app/src/index.scss'
  ],
  devtool:  process.env.WEBPACK_DEVTOOL  || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/Scripts/app/public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders
  },
  devServer: {
	contentBase: "./Scripts/app/public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
	  template: './Scripts/app/src/template.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  ]
};
