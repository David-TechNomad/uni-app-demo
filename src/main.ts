import 'babel-polyfill';
import 'es6-promise/auto'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
import './styles/public.scss';
import './styles/main.scss';
import './styles/form.scss';
import './styles/table.scss';
import './styles/button.scss';
import './styles/dialog.scss';
import './styles/upload.scss';
import './styles/fontStyle.scss';
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './vuex/store'
import routes from '@/router/routes'
import menuUtils from '@/utils/menuUtils';
import api from './index';
import './directive';
import './scrollLoad';
import infiniteScroll from 'vue-infinite-scroll';
import moment from 'moment';
import uploader from 'vue-simple-uploader'; //断点续传
import $ from 'jquery'
import cookieConfig from '@/utils/getCookie';
import getAll from '@/main.service';
import shiftSelectMore from '@/utils/shiftSelection';
import dictSelect from '@/views/common/dictEtc/dictSelect.vue';
import pageToolbar from '@/components/pageToolbar/pageToolbar.vue'
import 'video.js/dist/video-js.css'
Vue.component('dictSelect', dictSelect);
Vue.component('pageToolbar', pageToolbar);
Vue.prototype.shiftSelect = shiftSelectMore
// 组件
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(api);
Vue.use(infiniteScroll);
Vue.use(uploader);

// 定义全局时间过滤器
Vue.filter('dateFormat',function(value) {
    let date = value;
    if (date == undefined) {
        return "";
    }
    return moment(date).format("YYYY-MM-DD");
})
// 从链接里获取token
let url = window.location.hash;
var theRequest = new Object();  
if (url.indexOf("?") != -1) { 
    let str = url.split("?")[1]; 
    let strs = str.split("&");  
    for(var i = 0; i < strs.length; i ++) {  
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        window.sessionStorage.setItem(strs[i].split("=")[0],unescape(strs[i].split("=")[1]));  
    } 
    console.log(theRequest) 
}
if(!window.sessionStorage.getItem("token")){    
    routes[0].meta.requireAuth = true;    
}else{    
    routes[0].meta.requireAuth = false;
}
// 定义路由
const router = new VueRouter({
    mode: 'hash',
    routes
});

// 刷新重置路由
let data = JSON.parse(window.sessionStorage.getItem('menuData'));
if(data){
    let routers = [];
    menuUtils(routers, data);
    router.addRoutes(routers);
}
router.beforeEach((route, redirect, next) => {
    if (route.path) {      
        next();
    }else{
        next({ path: '/404'})
    }
});

// 挂载根实例
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
