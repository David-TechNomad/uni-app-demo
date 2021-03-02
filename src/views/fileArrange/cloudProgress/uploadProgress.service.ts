import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getBorrowerApplySearch(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}

// 上传表格
function searchUpload(params){
    let url = ApiConfig.getLoaderServlet;
    return HttpRequest.upLoadPreGet(url,params)
}

// 上传进度
function processUpload(params){
    let url = ApiConfig.getLoaderServlet;
    return HttpRequest.upLoadPreGet(url,params)
}

// 上传主体
function doneUpload(data){
    let url = ApiConfig.getAsyncServlet
    return HttpRequest.upLoadFormPost(url,data)
}

let Service = {
    getBorrowerApplySearch,
    searchUpload,
    processUpload,
    doneUpload
};

export default Service;