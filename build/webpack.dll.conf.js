const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        //提前打包一些基本不怎么修改的文件
        vendor: [
            'vue/dist/vue.esm.js',
            // 'vue-router',
            // 'vue/dist/vue.common.js',
            // 'vue/dist/vue.js',
            // 'vuex',
            // 'babel-polyfill',
            // 'element-ui',
            // 'vue-loader/lib/component-normalizer.js',
        ]
    },
    output: {
        path: path.join(__dirname, '../static/js'), //放在项目的static/js目录下面
        filename: '[name].dll.js', //打包文件的名字
        // library: '[name]_library' //可选 暴露出的全局变量名
        // vendor.dll.js中暴露出的全局变量名。
        // 主要是给DllPlugin中的name使用，
        // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'), //生成上文说到清单文件，放在当前build文件下面，这个看你自己想放哪里了。
            name: '[name]_library',
            context: __dirname
        }),
        //压缩 只是为了包更小一点
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console:true,
                drop_debugger:true
            },
            output:{
                // 去掉注释内容
                comments: false,
            },
            sourceMap: true
        })
    ]
};