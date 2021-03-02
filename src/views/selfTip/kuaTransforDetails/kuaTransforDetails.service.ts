import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//获取画面表格的列配置
function getListConfig(params){
    let url = ApiConfig.getDispField4;
    return HttpRequest.requestJsonPost(url,params)
}
//获取数据库的所有数据
function FileSearch(params){
    let url=ApiConfig.FileSearch4;
    return HttpRequest.requestJsonPost(url,params)
}
//检索项配置
function Getquerycondition(params){
    let url = ApiConfig.Getquerycondition;
    return HttpRequest.requestJsonPost(url,params)
};

//取需要移交的数据
function QueryFileTransferApply(params){
    let url = ApiConfig.QueryFileTransferApply;
    return HttpRequest.requestJsonPost(url,params)
};
//取当前全宗下的公司
function getSonUrl(data){
    let url = ApiConfig.getSonUrl;
    return HttpRequest.requestJsonPost(url,data)
};
//取下级全宗
function getFondChild(data){
    let url=ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,data)
}
// 全宗查询树
const getKeyTree = option => {
    let url = ApiConfig.getKeyTreeUrl;
    return HttpRequest.requestJsonPost(url,option)
};
// 取得当前用户全宗信息
const getTree = option => {
    let url = ApiConfig.getFondUrl;
    return HttpRequest.requestJsonPost(url,option)
};
// 根据全宗Id取得子全宗
const getTreeChildren = option => {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
};
// 全宗联想
const getKeyName = option => {
    let url = ApiConfig.getKeyNameUrl;
    return HttpRequest.requestJsonPost(url,option)
};
//当前全宗的档案分类结构
function archiveNowFile(data){
    let url = ApiConfig.archiveTreeUrl;
    return HttpRequest.requestJsonPost(url,data)
}
//提交
function TransferToOtherFond(params){
    let url =ApiConfig.TransferToOtherFond;
    return HttpRequest.requestJsonPost(url,params)
}
////取文件级档案
function WenjianSearch(params){
    let url = ApiConfig.WenjianSearch4;
    return HttpRequest.requestJsonPost(url,params)
}
//获取案卷库树
function archivesTree(params){
    let url = ApiConfig.archivesTree;
    return HttpRequest.requestJsonPost(url,params)
};

//获取文件数
function matterTree(params){
    let url = ApiConfig.matterTree;
    return HttpRequest.requestJsonPost(url,params)
}
//全宗移交
function initForTransferToOtherFond(params){
    let url = ApiConfig.initForTransferToOtherFond;
    return HttpRequest.requestJsonPost(url,params)
}
function fileTransfer(option) {
    let url = ApiConfig.fileTransfer;
    return HttpRequest.requestJsonPost(url,option)
}
let Service = {
    getListConfig,
    FileSearch,
    Getquerycondition,
    QueryFileTransferApply,
    getSonUrl,
    getFondChild,
    getKeyTree,
    getTree,
    getTreeChildren,
    getKeyName,
    archiveNowFile,
    TransferToOtherFond,
    WenjianSearch,
    archivesTree,
    matterTree,
    initForTransferToOtherFond,
    fileTransfer
};

export default Service;