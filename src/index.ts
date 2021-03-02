import apiCloud from './api/api';

// 封装vue的axios插件
const install = function(Vue) {   
    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                return apiCloud
            }
        }
    })
};

export default {
    install
}