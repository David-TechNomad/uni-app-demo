// 引入path
var path = require('path');
var proxyConfig = require('./proxyConfig');
// 导出模块
module.exports = {
  build: {//生产环境
    env: require('./prod.env'),//使用prod.env.js的编译环境
    index: path.resolve(__dirname, '../dist/index.html'),// 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../dist'),//编译输出的静态资源路径
    assetsSubDirectory: 'static',//编译输出的二级目录
      assetsPublicPath: './',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
      productionSourceMap: false,// 是否开启 cssSourceMap
    // assetsPublicPath: '/vue-admin/',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,// 是否开启 gzip
    productionGzipExtensions: ['js', 'css'],// 需要使用 gzip 压缩的文件扩展名
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
      useEslint:false,//去除严格模式
  },
  dev: {
      env: require('./dev.env'),// 使用 config/dev.env.js 中定义的编译环境
      host:'localhost', // can be overwritten by process.env.HOST
      useEslint:false,//去除严格模式
      useLocalIp: true,
      errorOverlay: true,
      notifyOnErrors: true,
      poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
      port: 8086,// 运行测试页面的端口
      autoOpenBrowser: true,// 是否自动打开浏览器
      assetsSubDirectory: 'static',// 编译输出的二级目录
      assetsPublicPath: '/',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
      proxyTable: proxyConfig.proxyList,// 需要 proxyTable 代理的接口（可跨域） // 用‘/api’开头，代理所有请求到目标服务器
      cssSourceMap: false,
  }
};
