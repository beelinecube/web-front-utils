__webpack_public_path__ = 'noop';
const webpack = require("webpack");
const glob = require("glob");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlPluginArray= [];

function getEntry() {
  const entry = {};
  //读取src目录所有page入口
  glob
    .sync('./src/pages/*/index.js')
    .forEach(function (filePath) {
      let name = filePath.match(/\/pages\/(.+)\/index.js/);
      name = name[1];
      entry[name] = filePath;

      htmlPluginArray.push(new HtmlWebpackPlugin({
        filename: './' + name + '/index.html',
        template: './src/pages/' + name + '/index.html',
      }))   
    });
  return entry;
};



module.exports = {
  mode: 'development',
  // 多入口
  entry: getEntry(),
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      h5: path.resolve(__dirname, 'src/common/h5/'),
      pc: path.resolve(__dirname, 'src/common/pc/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [ path.resolve(__dirname, 'src') ],
      },
      {
        // 增加对 SCSS 文件的支持
        test: /\.scss|\.css/,
        // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: 'a.css',
              },
          },
          'style-loader',
          {
            loader: 'css-loader',
            // 给 css-loader 传入配置项
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|pdf)$/,
        loader: 'file-loader',
      },
      {
        test: require.resolve('zepto'),
        use: ['exports-loader?window.Zepto','script-loader']
      }
    ]
  },
  plugins: [
    ...htmlPluginArray,
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
  ],
  devServer: {
    publicPath: '/act/',
    port: 8888,
    hot: true,
  },
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/
        name: 'vendor',
        chunks: 'initial',
        priority: 2,
        minChunks: 2
      },
      common: {
        test: /.js$/,
        name: 'common',
        chunks: 'initial',
        priority: 1,
        minChunks: 2
      }
    }
  }
}