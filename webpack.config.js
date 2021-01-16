const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let envPrd = false;

const config = {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'Videoplayer',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: addMiniCssExtractPlugin([
          'style-loader',
          'css-loader',
        ]),
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: addMiniCssExtractPlugin([
          'style-loader',
          'css-loader',
        ]),
        include: /\.module\.css$/,
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: addMiniCssExtractPlugin([
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[name]__[local]',
              },
            },
          },
          'postcss-loader',
          {
            loader:  'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true
            }
          }
         ,
        ]),
      },
      {
        test: /\.(svg|gif)$/,
        use:[{
          loader:'url-loader',
          options: {
              limit:5000,
              outputPath: 'images/',
              name:'[name].[ext]'
          }
      }]
      },
      {
        test: /\.ts(x)?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@g': path.resolve(__dirname, './src'),
      '@player': path.resolve(__dirname, './src/player'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@component': path.resolve(__dirname, './src/component'),
      '@codes': path.resolve(__dirname, './src/codecs'),
      '@images': path.resolve(__dirname, './src/images'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
};

function addMiniCssExtractPlugin (arr) {
  let copyarr = arr.concat();
  if (envPrd) {
    copyarr.splice(1, 0 ,{ loader: MiniCssExtractPlugin.loader} )
    return copyarr
  }
  return copyarr
}


module.exports = (env, argv) => {

  let result = {};
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = '[name].[hash].js';
  }

  if (env.NODE_ENV === 'production') {
    result = Object.assign({}, config, {
      entry: ['./src/index.tsx'],
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
    });
  }

  if (env.NODE_ENV === 'development') {
    result = Object.assign({}, config, {
      entry: ['babel-polyfill','react-hot-loader/patch', './devImport/index.tsx'],
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
					template:path.resolve(__dirname, 'index.html'),
        }),
      ],
      devServer: {
        contentBase: './dist',
        hot: true,
        stats: 'errors-only'
      }
    });
  }
  console.log('path.resolve(__dirname', path.resolve(__dirname, 'index.html'));
  return result;
};
