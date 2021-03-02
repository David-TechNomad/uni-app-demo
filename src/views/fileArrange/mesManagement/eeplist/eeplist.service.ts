import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';


//获取电子原文列表
function getOriginals(params){
    let url=ApiConfig.getOriginals;
    return HttpRequest.requestJsonPost(url,params)
}
//获取视频文件
function getVideoFile(params,a){
    let url=ApiConfig.getVideoFile+'?originalGuid=' + a;
    return HttpRequest.requestVideoGet(url,params)
}
//下载缩略图
function downloadThumbnail(params,a){
    let url = ApiConfig.downloadThumbnail+'?originalGuid=' + a;
    return HttpRequest.fileDownBlobPost(url,params)
};

// 删除挂接原文
function deletePdf(params){
    let url = ApiConfig.displayToPdfDelete;
    return HttpRequest.requestJsonPost(url,params)
}
//分类号
function getCategoryNumbers(param){
    let url = ApiConfig.getCategoryNumbers;
    return HttpRequest.requestJsonPost(url,param)
}
//全宗号
function  searchFondsForInput(name){
    let url = ApiConfig.searchFondsForInput;
    return HttpRequest.requestJsonPost(url,name)
}
//是否为项目公司
function isTopCompany(ID){
    let url = ApiConfig.isTopCompany;
    return HttpRequest.requestJsonPost(url,ID)
}

//取得页面配置项
function getEditField(data){
    let url=ApiConfig.getEditDeploy;
    return HttpRequest.requestJsonPost(url,data)
}
//数据
function getEditFieldValue(params){
    let url=ApiConfig.onlineGetAipInfo;
    return HttpRequest.requestJsonPost(url,params)
}
//EEP预览
function exportAipAttaFile(params){
    let url = ApiConfig.exportAipAttaFile;
    return HttpRequest.requestJsonPost(url,params)
};
// 原文元数据
function getMetadata(params){
    let url = ApiConfig.getMetadata;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getEditField, 
    getEditFieldValue, 
    getOriginals,
    downloadThumbnail,
    deletePdf,
    getCategoryNumbers,
    searchFondsForInput,
    isTopCompany,  
    getVideoFile,
    getMetadata
}
export default Service