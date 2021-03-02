import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//鉴定统计 - 档案馆列表
function getAppraisalArchiveAgentCodeStatisticList(params){
    let url=ApiConfig.getAppraisalArchiveAgentCodeStatisticList;
    return HttpRequest.requestJsonPost(url,params)
}
//鉴定统计 - 全宗列表
function getAppraisalFondsStatisticList(params){
    let url=ApiConfig.getAppraisalFondsStatisticList;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getAppraisalArchiveAgentCodeStatisticList,
    getAppraisalFondsStatisticList,
};

export default Service;