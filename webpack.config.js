const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

const ASSET_SERVER = process.env.ASSET_SERVER || 'http://localhost:8888/';

module.exports = {
  context: __dirname,

  entry: './quickdraw/front/javascripts/index.js',

  output: {
    path: path.resolve(__dirname, 'quickdraw/static/bundles'),
    filename: 'bundle.js',
    publicPath: ASSET_SERVER,
  },

  devServer: {
    port: 8888,
    contentBase: path.resolve(__dirname, 'quickdraw/static')
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', { 'modules': false }],
                'react'
              ]
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}