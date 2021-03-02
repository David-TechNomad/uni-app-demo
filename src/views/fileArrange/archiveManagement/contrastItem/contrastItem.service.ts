import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//取得对应著录项关系
function getoutDatas(params){
    let url=ApiConfig.getoutDatas;
    return HttpRequest.requestJsonPost(url,params)
}
//保存到其他档案库 确定 是
function conserverest(params){
    let url = ApiConfig.conserverest;
    return HttpRequest.requestJsonPost(url,params)
}
//取需要移交的数据
function QueryFileTransferApply(params){
    let url = ApiConfig.QueryFileTransferApply;
    return HttpRequest.requestJsonPost(url,params)
};
//获取画面表格的列配置
function getListConfig(params){
    let url = ApiConfig.getDispField4;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getoutDatas,
    conserverest,
    QueryFileTransferApply,
    getListConfig
}
export default Service