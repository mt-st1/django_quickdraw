const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: './quickdraw/front/javascripts/index.js',
  output: {
    path: path.resolve(__dirname, 'quickdraw/static'),
    filename: 'bundle.js'
  },

  devServer: {
    port: 8888,
    contentBase: path.resolve(__dirname, 'quickdraw/static')
  },

  plugins: [
    new BundleTracker({filename: './quickdraw/webpack-stats.json'}),
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