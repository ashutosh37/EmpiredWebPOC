var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'}),
  exclude: ['node_modules']
});
loaders.push({
    test: /\.png/,
    exclude: /(node_modules|bower_components)/,
    loader: "file-loader?limit=10000&mimetype=image/png",
    options:{
       name : '[name].[ext]', 
       publicPath : '/_catalog/masterpage/vsba/images/'
    }
  });

module.exports = {
  entry: [
    './Scripts/app/src/index.jsx',
    './Scripts/app/src/index.scss'
  ],
  output: {
    publicPath: './',
	path: path.join(__dirname, './Scripts/app/public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
     // template: './src/template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js'],
      }
    })
  ]
};
