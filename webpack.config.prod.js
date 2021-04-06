const WebpackAddVersionPulgin = require('./webpackAddVersionPulgin');
const {moduleRulesConfig, config} = require('./webpack.config.basis');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const result = Object.assign({}, config, {
  entry: ['./src/index.tsx'],
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
      chunkFilename: 'css/index.css',
    }),
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-rangeslider': {
      root: 'react-rangeslider',
      commonjs2: 'react-rangeslider',
      commonjs: 'react-rangeslider',
      amd: 'react-rangeslider',
    },
    'flv.js': {
      root: 'flvjs',
      commonjs2: 'flv.js',
      commonjs: 'flv.js',
      amd: 'flv.js',
    },
    'hls.js': {
      root: 'Hls',
      commonjs2: 'hls.js',
      commonjs: 'hls.js',
      amd: 'hls.js',
    },
    'dashjs': {
      root: 'dashjs',
      commonjs2: 'dashjs',
      commonjs: 'dashjs',
      amd: 'dashjs',
    },
    classnames: {
      root: 'cn',
      commonjs2: 'classnames',
      commonjs: 'classnames',
      amd: 'classnames',
    },
  },
  module: {
    rules: moduleRulesConfig
  },
  plugins: [
    new WebpackAddVersionPulgin()
  ]
});


module.exports = result;