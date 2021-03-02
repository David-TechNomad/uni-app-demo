import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//取当前用户全宗
function getFondSearch(data) {
    let url = ApiConfig.getFondUrl;
    return HttpRequest.requestJsonPost(url,data)
} 
//页数转页次
function pageTranslateByAnJuans(params){
    let url = ApiConfig.pageTranslateByAnJuans;
    return HttpRequest.requestJsonPost(url,params)
}
 
let Service = {
    getFondSearch,
};

export default Service;