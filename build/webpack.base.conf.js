var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');
require('babel-polyfill');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: { // 配置webpack编译入口
      app: ['babel-polyfill', './src/main.ts']
  },
    // externals:{
    //   'vue':'Vue'
    // },
  output: { // 配置webpack输出路径和命名规则
    path: config.build.assetsRoot,// webpack输出的目标文件夹路径（例如：/manage）
    filename: '[name].js',// webpack输出bundle文件命名格式，基于文件的md5生成Hash名称的script来防止缓存
    publicPath: process.env.NODE_ENV === 'production'//(判断是正式环境或者开发环境等)
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.css', '.scss'],//自动解析确定的拓展名,使导入模块时不带拓展名
    alias: { // 创建import或require的别名，一些常用的，路径长的都可以用别名
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'scss_vars': '@/styles/header.scss',
        'components': resolve('src/components'),
        'assets': resolve('src/assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
            resolve('src'), resolve('test'), resolve('static'),
            resolve('static/pdf'),
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                appendTsSuffixTo: [/\.vue$/],
                transpileOnly: true,
                happyPackMode: true
            }
        },
        {
            test: /\.ts$/,
            exclude: /node_modules|vue\/src/,
            loader: 'ts-loader',
            options: {
                appendTsSuffixTo: [/\.vue$/],
                transpileOnly: true,
                happyPackMode: true
            }
        }
    ]
  },
};
