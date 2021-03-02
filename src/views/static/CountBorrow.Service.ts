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
//当前借出档案数量
function currentBorrowArchiveCount(data){
    let url=ApiConfig.currentBorrowArchiveCount;
    return HttpRequest.requestJsonPost(url,data)
}
//历年借出档案数量
function getAllDateOfYear(params){
    let url = ApiConfig.historyBorrowArchiveGroupYear;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getSonUrl,
    getFondChild,
    currentBorrowArchiveCount,
    getAllDateOfYear

};

export default Service;