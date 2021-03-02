import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//取画面表格的列配置
function getDispField(data){
    let url=ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,data)
}

//取页面数据
function searchByDhPrefix(params){
    let url = ApiConfig.searchByDhPrefix;
    return HttpRequest.requestJsonPost(url,params)
}

//生成档号
function generateDH(params){
    let url = ApiConfig.generateDH;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getDispField,
    searchByDhPrefix,
    generateDH
}
export default Service