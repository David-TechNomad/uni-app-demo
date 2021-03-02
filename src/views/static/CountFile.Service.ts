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
//各库档案数量
function groupCountLibIdByFondsId(params){
    let url = ApiConfig.groupCountLibIdByFondsId;
    return HttpRequest.requestJsonPost(url,params)
}
//历年档案数量统计
function groupCountLibIdAndYearByFondsId(params) {
    let url = ApiConfig.groupCountLibIdAndYearByFondsId;
    return HttpRequest.requestJsonPost(url,params)
}
//未整理档案数量统计
function groupCountLibIdByUnfinished(parms) {
    let url = ApiConfig.groupCountLibIdByUnfinished;
    return HttpRequest.requestJsonPost(url,parms)
}
const Service = {
    getSonUrl,
    getFondChild,
    groupCountLibIdByFondsId,
    groupCountLibIdAndYearByFondsId,
    groupCountLibIdByUnfinished
};
export default Service;