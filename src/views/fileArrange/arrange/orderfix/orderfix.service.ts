import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//取画面表格的列配置
function getDispList(data){
    let url=ApiConfig.getDispList;
    return HttpRequest.requestJsonPost(url,data)
}

//取页面数据
function searchOrderfix(params){
    let url = ApiConfig.searchOrderfix;
    return HttpRequest.requestJsonPost(url,params)
}

//生成档号
function generateDH(params){
    let url = ApiConfig.generateDH;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getDispList,
    searchOrderfix,
    generateDH
}
export default Service