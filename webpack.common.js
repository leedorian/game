const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// env
const buildDirectory = 'dist';

module.exports = {
  entry: {
    app: './src/index.jsx',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, buildDirectory),
    filename: '[name].bundle.js',
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
      title: 'Development',
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
