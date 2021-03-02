import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//取得新增、编辑案卷页面的输入项配置
function getEditField(data){
    let url=ApiConfig.getEditField;
    return HttpRequest.requestJsonPost(url,data)
}
//取得编辑案卷页面的案卷数据
function getNumber(params){
    let url=ApiConfig.getNumber;
    return HttpRequest.requestJsonPost(url,params)
}

//保存案卷（新建，修改，删除）
function SaveFile(params){
    let url = ApiConfig.SaveFile;
    return HttpRequest.requestJsonPost(url,params)
}

//取当前案卷列表
function FileSearch(params){
    let url=ApiConfig.FileSearch;
    return HttpRequest.requestJsonPost(url,params)
}

//新增案卷列表
function inheritDataFromAnJuan(params){
    let url=ApiConfig.inheritDataFromAnJuan;
    return HttpRequest.requestJsonPost(url,params)
}
//获取电子原文列表
function getOriginals(params){
    let url=ApiConfig.getOriginals;
    return HttpRequest.requestJsonPost(url,params)
}

//下载缩略图
function downloadThumbnail(params){
    let url = ApiConfig.downloadThumbnail;
    return HttpRequest.requestGet(url,params)
};

// 双击浏览原生pdf
function displayPdf(params){
    let url = ApiConfig.displayPdfFile;
    return HttpRequest.requestBlobGet(url,params)
};

// 双击浏览转化pdf
function displayToPdf(params){
    let url = ApiConfig.displayToPdfFile;
    return HttpRequest.requestBlobGet(url,params)
};

function waterMarkPdf(params){
    let url = ApiConfig.waterMarkPdf;
    return HttpRequest.requestBlobGet(url,params)
};

// 水印是否超时
function waterMarkTime(params){
    let url = ApiConfig.getIsWatermark;
    return HttpRequest.requestJsonPost(url,params)
};

let Service = {
    getEditField,
    getNumber,
    SaveFile,
    FileSearch,
    inheritDataFromAnJuan,
    getOriginals,
    downloadThumbnail,
    displayPdf,
    displayToPdf,
    waterMarkPdf,
    waterMarkTime
};

export default Service