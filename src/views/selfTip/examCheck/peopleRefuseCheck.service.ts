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
function getTaskNodeList(option) {
    let url = ApiConfig.getTaskNodeList;
    return HttpRequest.requestJsonPost(url,option)
}

// 创建 or 修改
function saveOrUpdatePeople(option) {
    let url = ApiConfig.saveOrUpdatePeople;
    return HttpRequest.requestJsonPost(url,option)
}

// 审批详情
function getInfo(option) {
    let url = ApiConfig.getInfo;
    return HttpRequest.requestJsonPost(url,option)
}
function closeProcess(option) {//关闭流程
    let url = ApiConfig.closeProcess;
    return HttpRequest.requestJsonPost(url,option)
}

function isCC(option) {//是否可抄送
    let url = ApiConfig.isCC;
    return HttpRequest.requestJsonPost(url,option)
}

//（常用联系人）
function saveContacts(option) {
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,option)
}

function printProcess(option) {//打印
    let url = ApiConfig.printProcess;
    return HttpRequest.requestBlobGet(url,option)
}

// 水印是否超时
function waterMarkTime(params){
    let url = ApiConfig.getIsWatermark;
    return HttpRequest.requestJsonPost(url,params)
};

let Service = {
    borrowFileHead,
    borrowFileTable,
    borrowCheckTable,
    borrowUtilizeCtrl,
    findOaData,
    findOaPerson,
    findOaList,
    getTaskNodeList,
    clearOaPerson,
    searchOaList,
    saveOrUpdatePeople,
    getInfo,
    closeProcess,
    isCC,
    saveContacts,
    printProcess,
    waterMarkTime
};

export default Service;