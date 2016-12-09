var path = require('path');
var webpack = require('webpack');
var production = false;

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
  plugins: production ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', ]
  },
  debug: !production,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      include: [path.join(process.cwd(), SRC, '/js')],
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2017', 'webpack-module-hot-accept'],
    }],
  }
};