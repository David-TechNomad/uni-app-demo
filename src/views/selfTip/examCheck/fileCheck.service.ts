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

// 审批详情
function queryFileTransferTaskDetail(option) {
    let url = ApiConfig.queryFileTransferTaskDetail;
    return HttpRequest.requestJsonPost(url,option)
}

// 审批详情
function approvalFileTransfer(option) {
    let url = ApiConfig.approvalFileTransfer;
    return HttpRequest.requestJsonPost(url,option)
}

function seniorWdorg(option) {//选择对应公司
    let url = ApiConfig.seniorWdorg;
    return HttpRequest.requestJsonPost(url,option)
}
// 组织架构选人
function findOaList(option) {
    let url = ApiConfig.getOaList;
    return HttpRequest.requestJsonPost(url,option)
}

// 组织架构选人
function forwardFileTransfer(option) {
    let url = ApiConfig.forwardFileTransfer;
    return HttpRequest.requestJsonPost(url,option)
}

// 查询OA/姓名
function searchOaList(option) {
    let url = ApiConfig.getOaSearch;
    return HttpRequest.requestJsonPost(url,option)
}

// 04_档案移交收到
function doForwardFileTransfer(option) {
    let url = ApiConfig.doForwardFileTransfer;
    return HttpRequest.requestJsonPost(url,option)
}

function saveContacts(option) {
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,option)
}

// 常用联系人
function getContacts(option) {
    let url = ApiConfig.getOaPerson;
    return HttpRequest.requestJsonPost(url,option)
}

// 清除常用联系人
function clearOaPerson(option) {
    let url = ApiConfig.clearOaPerson;
    return HttpRequest.requestJsonPost(url,option)
}

function printProcess(option) {//打印
    let url = ApiConfig.printProcess;
    return HttpRequest.requestBlobGet(url,option)
}

let Service = {
    borrowFileHead,
    borrowFileTable,
    borrowCheckTable,
    examineProper,
    queryFileTransferTaskDetail,
    approvalFileTransfer,
    seniorWdorg,
    findOaList,
    forwardFileTransfer,
    searchOaList,
    doForwardFileTransfer,
    saveContacts,
    getContacts,
    clearOaPerson,
    printProcess
};

export default Service;