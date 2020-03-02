const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: "css-loader", 
            options: {
                importLoaders: 2,
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
            }
        },
        'postcss-loader',
        'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.ts(x)?$/,
        use: [
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@g': path.resolve(__dirname, './src'),
      '@player': path.resolve(__dirname, './src/player'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@component': path.resolve(__dirname, './src/component'),
      '@codes': path.resolve(__dirname, './src/codecs'),
      '@images': path.resolve(__dirname, './src/images'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  },
};

module.exports = (env, argv) => {
  let result = {}; 
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = '[name].[hash].js';
  }
  

  if(env.NODE_ENV === 'production'){
    result = Object.assign({}, config, {
      entry: [
        './src/index.tsx',
      ],
      externals: {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
        },
        'rc-slider': {
          root: 'rc-slider',
          commonjs2: 'rc-slider',
          commonjs: 'rc-slider',
          amd: 'rc-slider'
        },
        'flv.js': {
          root: 'flvjs',
          commonjs2: 'flv.js',
          commonjs: 'flv.js',
          amd: 'flv.js'
        },
        'hls.js': {
          root: 'Hls',
          commonjs2: 'hls.js',
          commonjs: 'hls.js',
          amd: 'hls.js'
        },
        'classnames': {
          root: 'cn',
          commonjs2: 'classnames',
          commonjs: 'classnames',
          amd: 'classnames'
        }
      },
    })
  }

  if(env.NODE_ENV === 'development'){
    result =  Object.assign({} , config, {
      entry: [
        'react-hot-loader/patch',
        './devImport/index.tsx'
      ],
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
      },
      plugins: [
        new HtmlWebpackPlugin({
            template: require('html-webpack-template'),
            inject: false,
            appMountId: 'app',
            filename: 'index.html'
          })
      ],
      devServer: {
        contentBase: './dist',
        hot: true,
      },
    })
  }
  
  return result;
};