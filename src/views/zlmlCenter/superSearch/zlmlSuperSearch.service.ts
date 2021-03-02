import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//获取表头
function getDispField(data) {
    let url = ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,data)
}
//获取检索范围下拉
function getDictlistsurl(params){
    let url = ApiConfig.getDictlistsurl;
    return HttpRequest.requestJsonPost(url,params)
}
//获取检索列表
function getSearchUrl(params){
    let url = ApiConfig.zlmlGetSearchUrl;
    return HttpRequest.requestJsonPost(url,params)
}
//获取高级检索列表
function getsuperSearchUrl(params){
    let url = ApiConfig.zlmlGetSuperSearchUrl;
    return HttpRequest.requestJsonPost(url,params)
}
//获取档案目录
function gettree(params){
    let url = ApiConfig.zlmlSearchCountGroupByKindIdAndRank;
    return HttpRequest.requestJsonPost(url,params)
}
// 案卷获得卷内档案列表
function getArchiveFilesByJuan(params){
    let url = ApiConfig.getArchiveByFile;
    return HttpRequest.requestJsonPost(url,params)
}
function findUserFondByUserId(params){
    let url = ApiConfig.findUserFondByUserId;
    return HttpRequest.requestJsonPost(url,params)
}

function exportZlmlArchiveList(params){
    let url = ApiConfig.exportZlmlArchiveList;
    return HttpRequest.requestBlobPost(url,params)
}

let Service = {
    getDictlistsurl,
    getSearchUrl,
    getsuperSearchUrl,
    gettree,
    getDispField,
    getArchiveFilesByJuan,
    findUserFondByUserId,
    exportZlmlArchiveList
};

export default Service;