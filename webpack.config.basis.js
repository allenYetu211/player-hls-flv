// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const moduleRulesConfig = [
  {
    test: /\.css$/,
    use: addMiniCssExtractPlugin([
      'style-loader',
      'css-loader',
    ]),
    exclude: /\.module\.css$/,
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
        loader: 'sass-loader',
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
    use: [{
      loader: 'url-loader',
      options: {
        limit: 5000,
        outputPath: 'images/',
        name: '[name].[ext]'
      }
    }]
  },
  {
    test: /\.ts(x)?$/,
    use: ['awesome-typescript-loader'],
    exclude: /node_modules/,
  }
]


const config = {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'Videoplayer',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: '/'
  },
  // resolveLoader: {
  //   modules: ['node_modules', './loader']
  // },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts','js', 'jsx', 'tsx', 'ts'],
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



function addMiniCssExtractPlugin(arr) {
  let copyarr = arr.concat();
  // if (envPrd) {
  //   copyarr.splice(1, 0, { loader: MiniCssExtractPlugin.loader })
  //   return copyarr
  // }
  return copyarr
}


module.exports = {
  moduleRulesConfig,
  config
}