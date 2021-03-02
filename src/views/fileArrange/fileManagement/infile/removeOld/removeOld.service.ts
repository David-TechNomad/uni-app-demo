import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//获取搜索框配置
function Getquerycondition(id){
    let url = ApiConfig.Getquerycondition;
    return HttpRequest.requestJsonPost(url,id)
}
//获取表格头部
function getDispField(id){
    let url = ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,id)
}

//案卷列表
function FileSearch(params){
    let url = ApiConfig.FileSearch;
    return HttpRequest.requestJsonPost(url,params)
}

let Service = {
    Getquerycondition,
    getDispField,
    FileSearch
}
export default Service;