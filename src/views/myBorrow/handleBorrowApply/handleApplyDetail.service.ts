import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function queryUtilizeLookupByAppnum(data) {
    let url = ApiConfig.queryUtilizeLookupByAppnum;
    return HttpRequest.requestJsonPost(url,data)
} 
function auditUtilize(data) {
    let url = ApiConfig.auditUtilize;
    return HttpRequest.requestJsonPost(url,data)
} 
function findSystemUserByFullName(data){
    let url = ApiConfig.findSystemUserByFullName;
    return HttpRequest.requestJsonPost(url,data)
}
//获取电子原文列表
function getOriginals(params){
    let url=ApiConfig.getOriginals;
    return HttpRequest.requestJsonPost(url,params)
}
// 更改sendStatus状态，表示是否可以出库
function updateInfoSendStatusByIdList(params){
    let url=ApiConfig.updateInfoSendStatusByIdList;
    return HttpRequest.requestJsonPost(url,params)
}
// 根据infoId获得info信息
function queryUtilizeInfoById(params){
    let url=ApiConfig.queryUtilizeInfoById;
    return HttpRequest.requestJsonPost(url,params)
}
function updateUtilizeInfoById(params){
    let url=ApiConfig.updateUtilizeInfoById;
    return HttpRequest.requestJsonPost(url,params)
}
function getReceptionArchive(data) {
	let url = ApiConfig.getReceptionArchive;
	return HttpRequest.requestJsonPost(url, data)
}
// 断点续传
// 预备上传
function prepareUpload(data,a,b){
    let url = ApiConfig.getLoaderServlet+'?action=' + a + '&clientId=' + b;
    return HttpRequest.upLoadFormPost(url,data)
}
//获取视频文件
function getVideoFile(params,a){
    let url=ApiConfig.getVideoFile+'?originalGuid=' + a;
    return HttpRequest.requestVideoGet(url,params)
}
function getArchivesInfo(params){
    let url=ApiConfig.getArchivesInfo;
    return HttpRequest.requestJsonPost(url,params)
}
function auditPdfFiles(params){
    let url=ApiConfig.auditPdfFiles;
    return HttpRequest.requestJsonPost(url,params)
}
 
let Service = {
    queryUtilizeLookupByAppnum,
    auditUtilize,
    findSystemUserByFullName,
    getOriginals,
    updateInfoSendStatusByIdList,
    updateUtilizeInfoById,
    queryUtilizeInfoById,
    getReceptionArchive,
    prepareUpload,
    getVideoFile,
    getArchivesInfo,
    auditPdfFiles
};

export default Service;