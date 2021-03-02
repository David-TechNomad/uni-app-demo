import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//取当前全宗下的公司
function getSonUrl(data){
    let url = ApiConfig.getSonUrl;
    return HttpRequest.requestJsonPost(url,data)
}
//取下级全宗
function getFondChild(data){
    let url=ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,data)
}
//当前移交数量
function currentTransferArchiveCount(params){
    let url = ApiConfig.currentTransferArchiveCount;
    return HttpRequest.requestJsonPost(url,params)
}
//历年移交统计
function historyTransferArchiveCount(params) {
    let url = ApiConfig.historyTransferArchiveCount;
    return HttpRequest.requestJsonPost(url,params)
}
const Service = {
    getSonUrl,
    getFondChild,
    currentTransferArchiveCount,
    historyTransferArchiveCount
};
export default Service;