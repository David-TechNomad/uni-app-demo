import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//取画面表格的列配置
function getDispField(data){
    let url=ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,data)
}

//获取卷内文件数据
function getFondInSearchUrl(params){
    let url = ApiConfig.getFondInSearchUrl;
    return HttpRequest.requestJsonPost(url,params)
};

//生成档号
function generateDH(params){
    let url = ApiConfig.generateDH;
    return HttpRequest.requestJsonPost(url,params)
}

//页码转页次
function PageTranslateByanJuan(params){
    let url = ApiConfig.PageTranslateByanJuan;
    return HttpRequest.requestJsonPost(url,params)
}
//页码转页次
function NumTranslateByanJuan(params){
    let url = ApiConfig.NumTranslateByanJuan;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getDispField,
    getFondInSearchUrl,
    generateDH,
    PageTranslateByanJuan,
    NumTranslateByanJuan
}
export default Service