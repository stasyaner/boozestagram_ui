const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
  entry: path.join(__dirname, './src/index.jsx'),
  output: {
     path: path.join(__dirname, './public'),
     filename: '[name].bundle-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  modules: false,
                  targets: {
                    browsers: ['> 1%', 'last 3 versions'],
                  },
                  useBuiltIns: false,
                },
              ],
              'react',
            ],
            plugins: ['react-hot-loader/babel'],
          },
        }],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules&import' +
            'Loaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
          'sass-loader',
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        }
      }
    },
  },
  plugins: [
    new CleanWebpackPlugin(['public/*']),
    new HtmlWebpackPlugin({
      template: 'template.html',
      inject: 'body',
      hash: true,
    }),
  ],
};

module.exports = config;
