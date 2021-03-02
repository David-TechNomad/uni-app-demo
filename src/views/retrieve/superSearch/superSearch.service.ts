import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//获取表头
function getDispField(data) {
    let url = ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,data)
}
//获取检索范围下拉
function getDictlistsurl(params){
    let url=ApiConfig.getDictlistsurl;
    return HttpRequest.requestJsonPost(url,params)
}
//获取检索列表
function getSearchUrl(params){
    let url=ApiConfig.getSearchUrl;
    return HttpRequest.requestJsonPost(url,params)
}
//获取高级检索列表
function getsuperSearchUrl(params){
    let url=ApiConfig.getSuperSearchUrl;
    return HttpRequest.requestJsonPost(url,params)
}
//获取档案目录
function gettree(params){
    let url=ApiConfig.searchCountGroupByKindIdAndRank;
    return HttpRequest.requestJsonPost(url,params)
}

// 案卷获得卷内档案列表
function getArchiveFilesByJuan(params){
    let url=ApiConfig.getArchiveByFile;
    return HttpRequest.requestJsonPost(url,params)
}
function applyAsistSelect(data) {
	let url = ApiConfig.ApplyAsistSelect;
	return HttpRequest.requestJsonPost(url, data)
}
function rejectAsistSelectByAppno(data) {
	let url = ApiConfig.rejectAsistSelectByAppno;
	return HttpRequest.requestJsonPost(url, data)
}
//目录信息右侧数据
function getEditFieldValue(params){
    let url=ApiConfig.getEditFieldValue;
    return HttpRequest.requestJsonPost(url,params)
}
//目录信息左侧配置
function getEditField(data){
    let url=ApiConfig.getEditDeploy;
    return HttpRequest.requestJsonPost(url,data)
}
let Service = {
    getDictlistsurl,
    getSearchUrl,
    getsuperSearchUrl,
    gettree,
    getDispField,
    getArchiveFilesByJuan,
    applyAsistSelect,
    rejectAsistSelectByAppno,
    getEditFieldValue,
    getEditField
};

export default Service;