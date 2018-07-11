const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// env

module.exports = merge(common, {
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    host: '0.0.0.0',
    historyApiFallback: true,
    contentBase: './cordova/www',
  },
  devtool: 'inline-source-map',
  plugins: [

  ],
});
