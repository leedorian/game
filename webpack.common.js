const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// env
const buildDirectory = 'cordova/www';

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.jsx'],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, buildDirectory),
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          name: 'common',
          test: /\/commons\//,
          priority: 10,
          reuseExistingChunk: true,
          minChunks: 2,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        query: {
          presets: ['airbnb', 'es2015', 'stage-0'],
        },
      }],
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Joy Cells',
      template: './src/index.html',
    }),
    // new webpack.optimize.SplitChunksPlugin({
    //   splitChunks: {
    //     cacheGroups: {
    //       commons: {
    //         name: 'commons',
    //         chunks: 'initial',
    //         minChunks: 2,
    //       },
    //     },
    //   },
    // }),
  ],
};
