import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getCarData(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}
//获取用信息
function getUserInfo(params) {
    let url = ApiConfig.getUserUrl;
    return HttpRequest.requestJsonPost(url,params)
}
//获取移交数据列表头部配置
function getColumns(params) {
    let url = ApiConfig.getColumns;
    return HttpRequest.requestJsonPost(url,params)
}
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

// 查询OAtree
function findOaData(option) {
    let url = ApiConfig.getOaTreeUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 常用联系人
function findOaPerson(option) {
    let url = ApiConfig.getOaPerson;
    return HttpRequest.requestJsonPost(url,option)
}

// 节点名称表格
function findNameList(option) {
    let url = ApiConfig.getTreeNameList;
    return HttpRequest.requestJsonPost(url,option)
}

// 清除常用联系人
function clearOaPerson(option) {
    let url = ApiConfig.clearOaPerson;
    return HttpRequest.requestJsonPost(url,option)
}

// 组织架构选人
function findOaList(option) {
    let url = ApiConfig.getOaList;
    return HttpRequest.requestJsonPost(url,option)
}

// 查询OA/姓名
function searchOaList(option) {
    let url = ApiConfig.getOaSearch;
    return HttpRequest.requestJsonPost(url,option)
}

//添加常用联系人
function saveContacts(ids){
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,ids)
};

//获取审批人角色
function GetSelectRole(data){
    let url = ApiConfig.getSelectRole;
    return HttpRequest.requestJsonPost(url,data)
}

//提交移交申请
function saveTransferLookup(params){
    let url = ApiConfig.saveTransferLookup;
    return HttpRequest.requestJsonPost(url,params)
};
//检查审批人
function checkProcess(params){
    let url = ApiConfig.checkProcess;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getCarData,
    getUserInfo,
    getListConfig,
    FileSearch,
    Getquerycondition,
    QueryFileTransferApply,
    findOaData,
    findOaPerson,
    findNameList,
    clearOaPerson,
    findOaList,
    searchOaList,
    saveContacts,
    GetSelectRole,
    saveTransferLookup,
    getColumns,
    checkProcess
};

export default Service;