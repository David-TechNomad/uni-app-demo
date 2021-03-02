import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
function searchArchiveLog(params){
    let url = ApiConfig.searchArchiveLog;
    return HttpRequest.requestJsonPost(url,params)
}
function operationTypes(params){
    let url = ApiConfig.operationTypes;
    return HttpRequest.requestJsonPost(url,params)
}

let Service = {
    searchArchiveLog,
    operationTypes
}
export default Service;