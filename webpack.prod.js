const merge = require('webpack-merge');
const commonConf = require('./webpack.common.js');

let config = {
  mode: 'production',
};

module.exports = merge(commonConf, config);
