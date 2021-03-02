import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//获取检索范围下拉
function getDictlistsurl(params){
    let url=ApiConfig.getDictlistsurl;
    return HttpRequest.requestJsonPost(url,params)
}
//获取检索列表
function ContentQuery(params){
    let url=ApiConfig.searchSolrFileContentQuery;
    return HttpRequest.requestJsonPost(url,params)
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
//目录信息右侧数据,获取全宗列表
function findFondsByName(params){
    let url=ApiConfig.findFondsByName;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getDictlistsurl,
    ContentQuery,
    getEditFieldValue,
    getEditField,
    findFondsByName
};

export default Service;