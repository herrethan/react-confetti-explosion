var path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'app'),
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /(\.css)$/, loader: 'css-loader' },
    ],
  },
};
