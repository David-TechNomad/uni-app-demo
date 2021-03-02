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
function getInfo(option) {
    let url = ApiConfig.getInfo;
    return HttpRequest.requestJsonPost(url,option)
}

// 审批提交
function approvalSubmit(option) {
    let url = ApiConfig.approvalSubmit;
    return HttpRequest.requestJsonPost(url,option)
}

function seniorWdorg(option) {//选择对应公司
    let url = ApiConfig.seniorWdorg;
    return HttpRequest.requestJsonPost(url,option)
}

// 常用联系人
function getContacts(option) {
    let url = ApiConfig.getOaPerson;
    return HttpRequest.requestJsonPost(url,option)
}

// 组织架构选人
function findOaList(option) {
    let url = ApiConfig.getOaList;
    return HttpRequest.requestJsonPost(url,option)
}

// 组织架构选人
function taskNodeForward(option) {
    let url = ApiConfig.taskNodeForward;
    return HttpRequest.requestJsonPost(url,option)
}

// 查询OA/姓名
function searchOaList(option) {
    let url = ApiConfig.getOaSearch;
    return HttpRequest.requestJsonPost(url,option)
}

function saveContacts(option) {
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,option)
}

function printProcess(option) {
    let url = ApiConfig.printProcess;
    return HttpRequest.requestBlobGet(url,option)
}

// 清除常用联系人
function clearOaPerson(option) {
    let url = ApiConfig.clearOaPerson;
    return HttpRequest.requestJsonPost(url,option)
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
    examineProper,
    getInfo,
    approvalSubmit,
    seniorWdorg,
    getContacts,
    findOaList,// 组织架构选人
    taskNodeForward,
    searchOaList,// 查询OA/姓名
    saveContacts,
    printProcess,
    clearOaPerson,
    waterMarkTime
};

export default Service;