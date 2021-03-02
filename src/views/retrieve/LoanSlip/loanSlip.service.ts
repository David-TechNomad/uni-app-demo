import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 提交
function applyData(option) {
    let url = ApiConfig.getBorrowApplyUrl;
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

// 是否可抄送
function isWrite(option) {//获取详情
    let url = ApiConfig.isLoanCCUrl;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    applyData,
    findOaData,
    findOaPerson,
    findOaList,
    findNameList,
    clearOaPerson,
    searchOaList,
    addContacts,
    isWrite
};

export default Service;