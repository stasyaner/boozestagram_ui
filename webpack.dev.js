const merge = require('webpack-merge');
const commonConf = require('./webpack.common.js');

let config = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
  },
};

module.exports = merge(commonConf, config);
