import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getCarData(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function getFondsApprovalInfo(option) {
    let url = ApiConfig.getFondsApprovalInfo;
    return HttpRequest.requestJsonPost(url,option)
}

function fileTransfer(option) {
    let url = ApiConfig.fileTransfer;
    return HttpRequest.requestJsonPost(url,option)
}
// 组织架构选人
function forwardFileTransfer(option) {
    let url = ApiConfig.forwardFileTransfer;
    return HttpRequest.requestJsonPost(url,option)
}
// 组织架构选人
function findOaList(option) {
    let url = ApiConfig.getOaList;
    return HttpRequest.requestJsonPost(url,option)
}

function seniorWdorg(option) {//选择对应公司
    let url = ApiConfig.seniorWdorg;
    return HttpRequest.requestJsonPost(url,option)
}

// 查询OAtree
function findOaData(option) {
    let url = ApiConfig.getOaTreeUrl;
    return HttpRequest.requestJsonPost(url,option)
}
// 查询OA/姓名
function searchOaList(option) {
    let url = ApiConfig.getOaSearch;
    return HttpRequest.requestJsonPost(url,option)
}
//转发  提交
function quandoCopyApproval(option) {
    let url = ApiConfig.quandoCopyApproval;
    return HttpRequest.requestJsonPost(url,option)
}
// 常用联系人
function findOaPerson(option) {
    let url = ApiConfig.getOaPerson;
    return HttpRequest.requestJsonPost(url,option)
}
//打印
function printProcess(option) {//打印
    let url = ApiConfig.printProcess;
    return HttpRequest.requestBlobGet(url,option)
}
let Service = {
    getCarData,
    getFondsApprovalInfo,
    fileTransfer,
    forwardFileTransfer,
    findOaList,
    seniorWdorg,
    findOaData,
    searchOaList,
    quandoCopyApproval,
    findOaPerson,
    printProcess//打印
};

export default Service;