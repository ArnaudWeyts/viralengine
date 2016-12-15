var path = require('path');
var webpack = require('webpack');

var SRC = "./src";
var DEST = "./build";

module.exports = {
  entry: {
    app: [
       path.join(process.cwd(), SRC, '/js/main.js')
    ],
  },
  output: {
    path: path.join(process.cwd(), DEST,'/assets/js'),
    publicPath: '/assets/js/',
    filename: 'main.min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', ]
  },
  debug: false,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      include: [path.join(process.cwd(), SRC, '/js')],
      loaders: ['react-hot', 'babel?cacheDirectory'],
    }],
  }
};