
module.exports = {
    proxyList: {
        '/api': {
            // 生产环境
            target: 'http://172.25.66.194:9090/',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/api': ''   //需要rewrite重写的,
            }
        }, 
        '/upload': {
                /**
                 * 批量挂接url
                 */
            target: 'http://172.25.66.194:9093/',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/upload': ''   //需要rewrite重写的,
            }
        },
        }
    }
