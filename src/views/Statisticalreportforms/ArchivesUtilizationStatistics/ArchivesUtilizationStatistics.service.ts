import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//获取数据字典接口
function dicgetDictListByDictId(params){
    let url=ApiConfig.dicgetDictListByDictId;
    return HttpRequest.requestJsonPost(url,params)
}
//获取档案分类列表
function getSearcheckurl(params){
    let url=ApiConfig.getSearcheckurl;
    return HttpRequest.requestJsonPost(url,params)
}

let Service = {
    dicgetDictListByDictId,//获取数据字典
    getSearcheckurl,//获取档案分类列表
};

export default Service;