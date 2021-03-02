import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

///意见审批查看  
function showOptionDetail(params){
    let url=ApiConfig.showOptionDetail;
    return HttpRequest.requestJsonPost(url,params)
}
//意见审批回复
function addReplay(params){
    let url=ApiConfig.addReplay;
    return HttpRequest.requestJsonPost(url,params)
}





let Service = {
    addReplay,
    showOptionDetail
};

export default Service;