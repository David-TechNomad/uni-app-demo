var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const os = require('os');
const UglifyJsParallelPlugin = require('webpack-parallel-uglify-plugin');
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
var env = config.build.env;
// 合并基础的webpack配置 // extract: true
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,     
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,// 编译输出目录
    filename: utils.assetsPath('js/[name].[chunkhash].js'),// 编译输出文件名格式
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')// 没有指定输出名的文件输出的文件名格式
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),   
    new UglifyJsParallelPlugin({
        cacheDir: '.cache/',
        uglifyJS:{
            output: {
                comments: false
            },
            compress: false
        }
    }),
      // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      favicon: path.resolve('favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
        hash: true,//版本控制
      chunksSortMode: 'dependency'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new CSSSplitWebpackPlugin({
      size: 4000,
      filename: 'static/css/[name]-[part].[ext]'
    }),
      // new webpack.DllReferencePlugin({
      //     context: __dirname, // 与DllPlugin中的那个context保持一致
      //     manifest: require('./vendor-manifest.json') // 下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
      //     // manifest: merge(require('./vendor-manifest.json'),require('./xxxx-manifest.json'))
      // })

      //这个主要是将生成的vendor.dll.js文件加上hash值插入到页面中。
      // new AddAssetHtmlPlugin([{
      //     filepath: path.resolve(__dirname,'../dist/static/js/vendor.dll.js'),
      //     outputPath: utils.assetsPath('js'),
      //     publicPath: path.posix.join(config.build.assetsPublicPath, 'static/js'),
      //     includeSourcemap: false,
      //     hash: true,
      // }]),
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
