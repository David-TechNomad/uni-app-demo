import HttpRequest from '../../../api/request';
import ApiConfig from '../../../api-config';
//取得新增、编辑案卷页面的输入项配置
function getEditField(data){
    let url=ApiConfig.getEditField;
    return HttpRequest.requestJsonPost(url,data)
}
//取得新增、编辑案卷页面的输入项配置
function getEditField4(data){
    let url=ApiConfig.getEditField4;
    return HttpRequest.requestJsonPost(url,data)
}
//取得编辑案卷页面的案卷数据
function getNumber(params){
    let url=ApiConfig.getNumber;
    return HttpRequest.requestJsonPost(url,params)
}
function getEditDeploy(data) {
    let url=ApiConfig.getEditDeploy;
    return HttpRequest.requestJsonPost(url,data)
}
//获取电子原文列表
function getOriginals(params){
    let url=ApiConfig.getOriginals;
    return HttpRequest.requestJsonPost(url,params)
}

// 双击浏览原生pdf
function displayPdf(params){
    let url = ApiConfig.displayPdfFile;
    return HttpRequest.requestBlobGet1(url,params)
};

// 双击浏览转化pdf
function displayToPdf(params){
    let url = ApiConfig.displayToPdfFile;
    return HttpRequest.requestBlobGet1(url,params)
};

let Service={
    getEditField,
    getNumber,
    getEditField4,
    getOriginals,
    displayPdf,
    displayToPdf,
    getEditDeploy
};
export default Service