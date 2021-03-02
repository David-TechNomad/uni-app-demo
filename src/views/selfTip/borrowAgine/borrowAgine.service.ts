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

// 添加常联系人
function addContacts(option){
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,option)
}

function getFondsApprovalInfo(option) {//获取全宗审批数据详情
    let url = ApiConfig.getUtilizeProcess;
    return HttpRequest.requestJsonPost(url,option)
}

// 是否可抄送
function isWrite(option) {//获取详情
    let url = ApiConfig.isCCUrl;
    return HttpRequest.requestJsonPost(url,option)
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
    addContacts,
    getFondsApprovalInfo,
    isWrite
};

export default Service;