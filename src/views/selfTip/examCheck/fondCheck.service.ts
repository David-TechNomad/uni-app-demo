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

function getFondRoleList(option) {//获取全宗角色
    let url = ApiConfig.getFondRoleList;
    return HttpRequest.requestJsonPost(url,option)
}

function getFondsApprovalInfo(option) {//获取全宗审批数据详情
    let url = ApiConfig.getFondsApprovalInfo;
    return HttpRequest.requestJsonPost(url,option)
}

function fondsApproval(option) {//全宗审批通过
    let url = ApiConfig.fondsApproval;
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

// 常用联系人
function getContacts(option) {
    let url = ApiConfig.getOaPerson;
    return HttpRequest.requestJsonPost(url,option)
}

// 查询OA/姓名
function searchOaList(option) {
    let url = ApiConfig.getOaSearch;
    return HttpRequest.requestJsonPost(url,option)
}

// 全宗审批转发
function doCopyApproval(option) {
    let url = ApiConfig.doCopyApproval;
    return HttpRequest.requestJsonPost(url,option)
}

// 获取所属分区下拉选数据
function getDictListByDictId(option) {
    let url = ApiConfig.getDictListByDictId;
    return HttpRequest.requestJsonPost(url,option)
}

function getAllFondsTreeData(option) {//获取全集全宗树（全量数据）
    let url = ApiConfig.getAllFondsTreeData;
    return HttpRequest.requestJsonPost(url,option)
}

function saveContacts(option) {
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,option)
}

// 清除常用联系人
function clearOaPerson(option) {
    let url = ApiConfig.clearOaPerson;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    borrowFileHead,
    borrowFileTable,
    borrowCheckTable,
    examineProper,
    getFondRoleList,//获取全宗角色
    getFondsApprovalInfo,//获取全宗审批数据详情
    fondsApproval,//全宗审批通过
    seniorWdorg,//选择对应公司
    findOaList,// 组织架构选人
    getContacts,// 常用联系人
    searchOaList,// 查询OA/姓名
    doCopyApproval,//全宗审批转发
    getDictListByDictId,// 获取所属分区下拉选数据
    getAllFondsTreeData,//获取全集全宗树（全量数据）
    saveContacts,
    clearOaPerson
};

export default Service;