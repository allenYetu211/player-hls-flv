const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {moduleRulesConfig, config} = require('./webpack.config.basis');

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
    stats: 'errors-only'
  },
  module: {
    rules: moduleRulesConfig
  }
});

console.log('result', result);

module.exports = result;