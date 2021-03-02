var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_BASEURL: '"api"', //开发环境跨域api
    // upload_BASEURL:'"upload"'
});
