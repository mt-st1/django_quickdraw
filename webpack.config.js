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

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'quickdraw/front/javascripts'),
      'node_modules',
    ]
  },

  devServer: {
    port: 8888,
    contentBase: path.resolve(__dirname, 'quickdraw/static'),
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    },
    https: false,
    disableHostCheck: true,
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
}
