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

// 审批
function examineProper(option) {
    let url = ApiConfig.examineProperUrl;
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

// 修改审批人表格查询
function examineSearch(option) {
    let url = ApiConfig.getOaSearch;
    return HttpRequest.requestJsonPost(url,option)
}

// 转发
function examineTransfer(option) {
    let url = ApiConfig.borrowFileTransfer;
    return HttpRequest.requestJsonPost(url,option)
}

// 修改审批人表格
function examineQueryAuditList(option) {
    let url = ApiConfig.queryAuditList;
    return HttpRequest.requestJsonPost(url,option)
}

// 修改审批人提交
function examineApply(option) {
    let url = ApiConfig.updateAuditSubmit;
    return HttpRequest.requestJsonPost(url,option)
}
function getFondsApprovalInfo(option) {//获取全宗审批数据详情
    let url = ApiConfig.getUtilizeProcess;
    return HttpRequest.requestJsonPost(url,option)
}

// 添加常联系人
function addContacts(option){
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,option)
}

function printProcessUrl(option) {//获取详情
    let url = ApiConfig.printProcess;
    return HttpRequest.requestBlobGet(url,option)
}

function getUtilizeLookup(option) {//获取详情
    let url = ApiConfig.getUtilizeLookup;
    return HttpRequest.requestJsonPost(url,option)
}

// 获取用户角色
function getUserInfo(options){
    let url = ApiConfig.getUserUrl;
    return HttpRequest.requestJsonPost(url,options)
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
    examineProper,
    findOaData,
    findOaPerson,
    findOaList,
    clearOaPerson,
    searchOaList,
    examineSearch,
    examineApply,
    examineTransfer,
    examineQueryAuditList,
    getFondsApprovalInfo,
    addContacts,
    printProcessUrl,
    getUtilizeLookup,
    getUserInfo,
    applyFlagInfo
};

export default Service;