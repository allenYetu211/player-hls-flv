/*
 * @Author: Allen OYang
 * @Date: 2021-04-06 09:12:41
 * @Descripttion: 
 * @LastEditTime: 2021-11-30 09:53:21
 * @FilePath: /ts-vp/webpack.config.dev.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { moduleRulesConfig, config } = require('./webpack.config.basis');

const result = Object.assign({}, config, {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './devImport/index.tsx'],
  // entry: ['./devImport/index.tsx'],
  output: {
    filename: '[name].[hash].js',
  },
  mode: "development",
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
    port: 6005
  },
  module: {
    rules: moduleRulesConfig
  }
});


module.exports = result;