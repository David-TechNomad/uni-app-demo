import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//审批列表
function getList(option) {
    let url = ApiConfig.getFeedbackList;
    return HttpRequest.requestJsonPost(url,option)
}
//获取检索范围下拉
function getDictlistsurl(params){
    let url=ApiConfig.getDictlistsurl;
    return HttpRequest.requestJsonPost(url,params)
}

//意见审批删除
function systemdelete(params){
    let url=ApiConfig.systemdelete;
    return HttpRequest.requestJsonPost(url,params)
} 

//意见审批新增
function feedbackAdd(params){
    let url=ApiConfig.feedbackAdd;
    return HttpRequest.requestJsonPost(url,params)
}
//意见审批置顶
function setover(params){
    let url=ApiConfig.setover;
    return HttpRequest.requestJsonPost(url,params)
}

let Service = {
    getList,
    getDictlistsurl,
    systemdelete,
    setover
};

export default Service;