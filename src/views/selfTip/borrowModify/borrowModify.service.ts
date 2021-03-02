import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

const borrowFileHead = option => {
    let url = ApiConfig.getSuperSearchHead;
    return HttpRequest.requestJsonPost(url,option)
};

function borrowFileTable(option) {
    let url = ApiConfig.borrowFileTable;
    return HttpRequest.requestJsonPost(url,option)
}

function borrowCheckTable(option) {
    let url = ApiConfig.borrowCheckTable;
    return HttpRequest.requestJsonPost(url,option)
}

function borrowUtilizeCtrl(option) {
    let url = ApiConfig.borrowUtilize;
    return HttpRequest.requestJsonPost(url,option)
}

// 查询OAtree
function findOaData(option) {
    let url = ApiConfig.getOaTreeUrl;
    return HttpRequest.requestJsonPost(url,option)
}

// 常用联系人
function findOaPerson(option) {
    let url = ApiConfig.getOaPerson;
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

// 节点名称表格
function findNameList(option) {
    let url = ApiConfig.getTreeNameList;
    return HttpRequest.requestJsonPost(url,option)
}

// 驳回修改
function applyModify(option) {
    let url = ApiConfig.borrowModify;
    return HttpRequest.requestJsonPost(url,option)
}

// 关闭流程
function borrowCloseDone(option) {
    let url = ApiConfig.borrowClose;
    return HttpRequest.requestJsonPost(url,option)
}

// 添加常联系人
function addContacts(option){
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,option)
}

// 是否可抄送
function isWrite(option) {//获取详情
    let url = ApiConfig.isCCUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function getUtilizeLookup(option) {//获取详情
    let url = ApiConfig.getUtilizeLookup;
    return HttpRequest.requestJsonPost(url,option)
}

// 获取流程权限配置
function applyFlagInfo(options){
    let url = ApiConfig.applyFlag;
    return HttpRequest.requestJsonPost(url,options)
}

let Service = {
    borrowFileHead,
    borrowFileTable,
    borrowCheckTable,
    borrowUtilizeCtrl,
    findOaData,
    findOaPerson,
    findOaList,
    findNameList,
    clearOaPerson,
    searchOaList,
    applyModify,
    borrowCloseDone,
    addContacts,
    isWrite,
    getUtilizeLookup,
    applyFlagInfo
};

export default Service;