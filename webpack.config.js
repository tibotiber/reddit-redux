var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin')

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/app/index.html'),
  filename: 'index.html',
  inject: 'body'
})

var BitBarWebpackProgressPluginConfig = new BitBarWebpackProgressPlugin()

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [ HtmlWebpackPluginConfig, BitBarWebpackProgressPluginConfig ]
}
