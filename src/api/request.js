import axios from 'axios';
import { Message } from 'element-ui';
import cookieConfig from '@/utils/getCookie';
import store from '@/vuex/store';
import qs from 'qs';
var URLS =  process.env.url_BASEURL;
var serviceId = window.localStorage.getItem("serviceId");
// 略缩图
// var imgUrl = process.env.upload_BASEURL;
var imgUrl = 'http://'+serviceId+'.dangan.wanda.cn:9093';
var baseUrl = process.env.upload_BASEURL;// 测试
let token = sessionStorage.getItem("token");
if(process.env.API_BASEURL.indexOf('wanda-dev') > -1){
    if(!serviceId){
        serviceId = 'file';
    }
    baseUrl = 'http://'+serviceId+'.dangan.wanda-dev.cn:9093';// 测试
    imgUrl = 'http://'+serviceId+'.dangan.wanda-dev.cn:9093';// 测试
}else if(process.env.API_BASEURL.indexOf('dangan.wanda.cn') > -1){
    if(!serviceId){
        serviceId = 'file1';
    }
    baseUrl = 'http://'+serviceId+'.dangan.wanda.cn:9093';// 生产
    imgUrl = 'http://'+serviceId+'.dangan.wanda.cn:9093';// 生产
}

/**
 * 基本封装axios
 */
function request1 (options) {
    return new Promise((resolve, reject) => {
        // 基本设置
        const instance = axios.create({
            baseURL: process.env.API_BASEURL, // 从环境进程中根据运行环境获取的api的base_url
            withCredentials:true,//携带cookie
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
            },
            responseType : 'json',
            transformRequest: [function (data) {
                data = qs.stringify(data);
                return data
            }],
            transformResponse: [function (data) {
                return data;
            }]
        });
        // 请求拦截
        instance.interceptors.request.use(
            config => {
                if (config.method === 'post' || config.method === 'put') {
                    config.data = qs.stringify(config.data);
                    config.headers['Content-Type'] =  'application/x-www-form-urlencoded';
                }
                return config; 
            },
            error => {
                Message.error({
                    message: '加载超时',
                    type: 'error',
                    duration: 10 * 1000
                });
                return Promise.reject(error)
            });
        // 返回拦截
        instance.interceptors.response.use(
            response => {               
                return response
            },
            error => {
                if(error.response.status === 302){
                     　window.location.href= error.response.headers.Location; 

                }else if (error.response === undefined || error.response.status === undefined) {
                    Message({
                        message: '连接服务器失败!',
                        type: 'error',
                        duration: 10 * 1000,
                        showClose: true,
                    });
                } else if(error.response.status === 401||error.response.status === 412){
                    Message({
                        message: '加载超时!',
                        type: 'error',
                        duration: 10 * 1000,
                    });                   
                } else {
                    Message({
                        message: error.message,
                        type: 'error',
                        duration: 10 * 1000,
                        showClose: true,
                    })
                }
                return Promise.reject(error) // 错误信息
            });
        //请求处理
        instance(options)
            .then((res) => {
                resolve(res.data);
                return false
            })
            .catch((error) => {
                reject(error)
            })
    })
}
function request(options) {
    return new Promise((resolve, reject) => {
        // 基本设置
        const instance = axios.create({
            baseURL: process.env.API_BASEURL,
            withCredentials:true,//携带cookie
        });
        // 请求拦截
        instance.interceptors.request.use(
            config => {
                let token = sessionStorage.getItem("token")                
                if (token) {
                   config.headers ={                        
                        'Authorization':'Bearer'+' '+token
                     }
                } 
                if (config.method === 'post' || config.method === 'put') {
                    config.data = qs.stringify(config.data);
                    config.headers['Content-Type'] =  'application/x-www-form-urlencoded';
                }
                return config;
            },
            error => {
                Message.error({
                    message: '加载超时',
                    type: 'error',
                    duration: 5 * 1000
                });
                return Promise.reject(error)
            });
        // 返回拦截
        instance.interceptors.response.use(
            response => {
                return response
            },
            error => {
                if (error.response === undefined || error.response.status === undefined) {
                    Message({
                        message: '服务器繁忙，请稍后重试!',
                        type: 'error',
                        duration: 2 * 1000,
                        showClose: true,
                    });
                } else if(error.response.status === 401||error.response.status === 412){
                    Message({
                        message: '加载超时!',
                        type: 'error',
                        duration: 2 * 1000,
                    });
                } else {
                    Message({
                        message: error.message,
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
                return Promise.reject(error) // 错误信息
            });
        //请求处理
        instance(options)
            .then((res) => {
                resolve(res.data);
                return false
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function request2(options) {
    return new Promise((resolve, reject) => {
        // 基本设置
        const instance = axios.create({
            baseURL: process.env.upload_BASEURL,
            withCredentials:true,//携带cookie
        });
        // 请求拦截
        instance.interceptors.request.use(
            config => {               
                 let token = sessionStorage.getItem("token")                
                 if (token) {
                    config.headers ={                        
                         'Authorization':'Bearer'+' '+token
                      }
                 }                              
                if (config.method === 'post' || config.method === 'put') {
                    config.data = qs.stringify(config.data);
                    config.headers['Content-Type'] =  'application/x-www-form-urlencoded';
                }
                return config;
            },
            error => {
                Message.error({
                    message: '加载超时',
                    type: 'error',
                    duration: 5 * 1000
                });
                return Promise.reject(error)
            });
        // 返回拦截
        instance.interceptors.response.use(
            response => {
                return response
            },
            error => {
                if (error.response === undefined || error.response.status === undefined) {
                    Message({
                        message: '服务器繁忙，请稍后重试!',
                        type: 'error',
                        duration: 2 * 1000,
                        showClose: true,
                    });
                } else if(error.response.status === 401||error.response.status === 412){
                    Message({
                        message: '加载超时!',
                        type: 'error',
                        duration: 2 * 1000,
                    });
                } else {
                    Message({
                        message: error.message,
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
                return Promise.reject(error) // 错误信息
            });
        //请求处理
        instance(options)
            .then((res) => {
                resolve(res.data);
                return false
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function createFileAxios(){
    // var baseUrl = process.env.upload_BASEURL; //测试

    if(process.env.API_BASEURL.indexOf('wanda-dev') > -1){
        baseUrl = 'http://'+serviceId+'.dangan.wanda-dev.cn:9093';// 测试
    }else if(process.env.API_BASEURL.indexOf('dangan.wanda.cn') > -1){
        baseUrl = 'http://'+serviceId+'.dangan.wanda.cn:9093';// 生产
    }
    fileUp = axios.create({
        baseURL: baseUrl,
        timeout: 60*1000, // 请求超时时间
        withCredentials:true,//携带cookie
        // timeout: 240000, // 请求超时时间
    });
    fileUp.interceptors.request.use(
        config => {
            return config;
        },
        error => {
            Message.error({
                message: '加载超时',
                type: 'error',
                duration: 5 * 1000
            });
        });
}

let fileUp = axios.create({
    // baseURL:process.env.upload_BASEURL,
     baseURL: baseUrl, // 从环境进程中根据运行环境获取的api的base_url
    timeout: 60*1000, // 请求超时时间
    withCredentials:true,//携带cookie
    // timeout: 240000, // 请求超时时间
});

fileUp.interceptors.request.use(
    config => {
        if(token) {
            config.headers.Authorization = 'Bearer'+' '+token;
        }
        return config;
    },
    error => {
        Message.error({
            message: '加载超时',
            type: 'error',
            duration: 5 * 1000
        });
    });

let video = axios.create({
    // baseURL:process.env.upload_BASEURL,
    baseURL:  process.env.video_BASEURL, // 从环境进程中根据运行环境获取的api的base_url
    timeout: 60*1000, // 请求超时时间
    withCredentials:true,//携带cookie
    // timeout: 240000, // 请求超时时间
});

video.interceptors.request.use(
    config => {
        if(token) {
            config.headers.Authorization = 'Bearer'+' '+token;
        }
        return config;
    },
    error => {
        Message.error({
            message: '加载超时',
            type: 'error',
            duration: 5 * 1000
        });
    });
const $http = axios.create({
    baseURL: process.env.API_BASEURL, // 从环境进程中根据运行环境获取的api的base_url
    timeout: 50000, // 请求超时时间
    withCredentials:true,//携带cookie
});
// baseURL: process.env.NODE_ENV==='development'?process.env.`:abc,

const $ftp = axios.create({
    baseURL: process.env.re_BASEURL, // 从环境进程中根据运行环境获取的api的base_url
    withCredentials:true,//携带cookie
});
const $video = axios.create({
    baseURL: process.env.video_BASEURL, // 从环境进程中根据运行环境获取的api的base_url
    withCredentials:true,//携带cookie
});
const $atp = axios.create({
    baseURL: process.env.load_BASEURL, // 从环境进程中根据运行环境获取的api的base_url
    headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
    withCredentials:true,//携带cookie
});

// 请求拦截
$http.interceptors.request.use(
        config => {
            return config;
        },
        error => {
            Message.error({
                message: '加载超时',
                type: 'error',
                duration: 5 * 1000
            });
        }
    );

// 返回拦截
$http.interceptors.response.use(
    response => {
        return response
    },
    error => {
            if (error.response === undefined || error.response.status === undefined) {
                Message({
                    message: '连接服务器失败!',
                    type: 'error',
                    duration: 2 * 1000,
                    showClose: true,
                });
            } else if(error.response.status === 401||error.response.status === 412){
                Message({
                    message: '加载超时!',
                    type: 'error',
                    duration: 2 * 1000,
                    // showClose: true,
                });
            } else {
                Message({
                    message: error.message,
                    type: 'error',
                    duration: 10 * 1000,
                    showClose: true,
                })
            }
        }
        );



/**
 * get请求
 * @param url 接口地址
 * @param params 参数 (query params)
 * @returns {Promise<R>|Promise<U>}
 */
function requestGet(url,params){
    return request({
        method: 'GET',
        url: url,
        params,
    });
}

function requestHtmlGet(url,params){
    return request({
        method: 'GET',
        url: url,
        params,
        responseType: 'text/html'
    });
}

function requestBlobGet2(url,params){
   return request2({
        method: 'GET',
        url: url,
        params       
    });
}
function requestBlobGet(url,params){
    return request({
        method: 'GET',
        url: url,
        params,
        responseType: 'blob'
    });
}
function requestVideoGet(url,data){
    return video({
        method: 'POST',
        url: url,
        data,
        responseType: 'blob'
    });
 }
 function fileDownBlobPost(url,data){
    return fileUp({
        method: 'POST',
        url: url,
        data,
        responseType: 'blob'
    });
 }
function requestBlobPost(url,data){
    return request({
        method: 'Post',
        url: url,
        data,
        responseType: 'blob'
    });
}

function requestPdfGet(url,params){
    return request({
        method: 'GET',
        url: url,
        params,
        responseType: 'application/pdf'
    });
}

/**
 * post请求
 * @param url 接口地址
 * @param data 参数（request payLoad）
 * @returns {Promise<R>|Promise<U>}
 */
function requestJsonPost(url,data){     
    if(typeof(data)=== "number" ){
       data = ''+ data;
    }
    let token = sessionStorage.getItem("token")
    let headers ={}
    if (token) {
         headers ={
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':'Bearer'+' '+token
         }
    }else{
         headers = {'Content-Type': 'application/json;charset=UTF-8'};
    } 
    const options = {headers : headers};
    return $http.post(url, data, options)
}

// 测试solr
function requestJsonFtp(url,data){
    const headers = {'Content-Type': 'application/json;charset=UTF-8'};
    const options = {headers : headers};
    return $ftp.post(url, data, options)
}

function requestJsonGet(url,params){
    const headers = {'Content-Type': 'application/json;charset=UTF-8'};
    const options = {headers : headers};
    return $http.get(url, params, options)
}

/**
 * post请求
 * @param url 接口地址
 * @param data 参数（form data）
 * @returns {Promise<R>|Promise<U>}
 */
function requestFormPost(url,data){
    return request1({
        method: 'POST',
        url: url,
        data,
    });
}

/**
 * 断点续传
 * @param （form data）
 */
// 开始预备(暂停/继续/查询)
function upLoadPreGet(url,params){
    if(serviceId !==  window.localStorage.getItem("serviceId")) {
        serviceId =  window.localStorage.getItem("serviceId");
        createFileAxios();
    }
    return fileUp({
        method: 'GET',
        url: url,
        params,
        paramsSerializer: data => {
            return qs.stringify(data, { indices: false })
        }
    });
}

// 开始预备(暂停/继续/查询)
function upLoadPrePost(url,data){
    if(serviceId !==  window.localStorage.getItem("serviceId")) {
        serviceId =  window.localStorage.getItem("serviceId");
        createFileAxios();
    }
    const headers = {'Content-Type': 'application/json;charset=UTF-8'};
    const options = {headers : headers};
    return fileUp.post(url, data, options)
}

// 上传
function upLoadFormPost(url,data){
    if(serviceId !==  window.localStorage.getItem("serviceId")) {
        serviceId =  window.localStorage.getItem("serviceId");
        createFileAxios();
    }
    return fileUp({
        method: 'POST',
        url: url,
        data:data,
    });
}

const HttpRequest = {
    requestGet,
    requestJsonPost,
    requestFormPost,
    requestBlobGet,
    requestPdfGet,
    requestJsonGet,
    requestHtmlGet,
    requestJsonFtp,
    upLoadPreGet,
    upLoadPrePost,
    upLoadFormPost, 
    requestBlobPost,
    imgUrl,
    requestVideoGet,
    baseUrl,
    fileDownBlobPost,
    URLS,
    requestBlobGet2 
};

export default HttpRequest;
