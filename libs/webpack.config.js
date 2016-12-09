var path = require('path');
var webpack = require('webpack');

var SRC = "./src";
var DEST = "./build";

module.exports = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
       path.join(process.cwd(), SRC, '/js/main.js')
    ],
  },
  output: {
    path: path.join(process.cwd(), DEST,'/assets/js'),
    publicPath: '/assets/js/',
    filename: 'main.min.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', ]
  },
  debug: true,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      include: [path.join(process.cwd(), SRC, '/js')],
      loaders: ['react-hot', 'babel?cacheDirectory', 'webpack-module-hot-accept'],
    }],
  }
};