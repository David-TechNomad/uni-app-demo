import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
function queryUtilizeLookupByAppnum(data) {
    let url = ApiConfig.queryUtilizeLookupByAppnum;
    return HttpRequest.requestJsonPost(url,data)
} 
//获取电子原文列表
function getOriginals(params){
    let url=ApiConfig.getOriginals;
    return HttpRequest.requestJsonPost(url,params)
}
function updateUtilizeInfoArcstatus(option) {
    let url = ApiConfig.updateUtilizeInfoArcstatus;
    return HttpRequest.requestJsonPost(url,option)
}
function getArchivesInfo(option) {
    let url = ApiConfig.getArchivesInfo;
    return HttpRequest.requestJsonPost(url,option)
}
function updateUtilizeInfoById(params){
    let url=ApiConfig.updateUtilizeInfoById;
    return HttpRequest.requestJsonPost(url,params)
}
//下载缩略图
function downloadThumbnail(params,a){
    let url = ApiConfig.downloadThumbnail+'?originalGuid=' + a;
    return HttpRequest.fileDownBlobPost(url,params)
};
function getFileByFilePath(params){
    let url=ApiConfig.getFileByFilePath;
    return HttpRequest.requestBlobGet(url,params)
}
 
let Service = {
    queryUtilizeLookupByAppnum,
    getOriginals,
    updateUtilizeInfoArcstatus,
    getArchivesInfo,
    updateUtilizeInfoById,
    downloadThumbnail,
    getFileByFilePath
};

export default Service;