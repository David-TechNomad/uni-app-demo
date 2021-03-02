import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getProcessInstanceList(option) {//获取流程实例列表
    let url = ApiConfig.getProcessInstanceList;
    return HttpRequest.requestJsonPost(url,option)
}

function getDictListByDictId(option) {//获取流程实例下拉选
    let url = ApiConfig.getDictListByDictId;
    return HttpRequest.requestJsonPost(url,option)
}

function enforceCloseProcess(option) {//强制关闭
    let url = ApiConfig.enforceCloseProcess;
    return HttpRequest.requestJsonPost(url,option)
}

function enforcePassOrReturnProcess(option) {//强制（通过/驳回）流程
    let url = ApiConfig.enforcePassOrReturnProcess;
    return HttpRequest.requestJsonPost(url,option)
}
function updateProcess(option) {//变更借阅人修改页面表单提交
    let url = ApiConfig.updateProcess;
    return HttpRequest.requestJsonPost(url,option)
}
function getInfo(option) {//详情
    let url = ApiConfig.getInfo;
    return HttpRequest.requestJsonPost(url,option)
}
const borrowFileHead = option => {
    let url = ApiConfig.getSuperSearchHead;
    return HttpRequest.requestJsonPost(url,option)
};
function seniorWdorg(option) {//选择对应公司
    let url = ApiConfig.seniorWdorg;
    return HttpRequest.requestJsonPost(url,option)
}
// 组织架构选人
function findOaList(option) {
    let url = ApiConfig.getOaList;
    return HttpRequest.requestJsonPost(url,option)
}
// 清除常用联系人
function clearOaPerson(option) {
    let url = ApiConfig.clearOaPerson;
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

// 批量修改审批人 - 用户下拉选
function getProcessUserList(option) {
    let url = ApiConfig.getProcessUserList;
    return HttpRequest.requestJsonPost(url,option)
}

// 批量修改审批人
function batchUpdateProcessApprovalUser(option) {
    let url = ApiConfig.batchUpdateProcessApprovalUser;
    return HttpRequest.requestJsonPost(url,option)
}

function saveContacts(option) {
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,option)
}

//全宗修改页
// 获取初始数据
function getFondsApprovalInfo(option) {
    let url = ApiConfig.getFondsApprovalInfo;
    return HttpRequest.requestJsonPost(url,option)
}

//申请档案员修改页
// 获取初始数据
function getRecordById(option) {
    let url = ApiConfig.getRecordById;
    return HttpRequest.requestJsonPost(url,option)
}

function modifyByAdmin(option) {//申请档案员修改页面表单提交
    let url = ApiConfig.modifyByAdmin;
    return HttpRequest.requestJsonPost(url,option)
}

function shutdownByAdmin(option) {//申请档案员强制关闭
    let url = ApiConfig.shutdownByAdmin;
    return HttpRequest.requestJsonPost(url,option)
}

function auditAll(option) {//申请档案员强制通过
    let url = ApiConfig.auditAll;
    return HttpRequest.requestJsonPost(url,option)
}

function rejectAll(option) {//申请档案员强制驳回
    let url = ApiConfig.rejectAll;
    return HttpRequest.requestJsonPost(url,option)
}

function batchModificationAuditor(option) {//申请档案员(批量修改审批人)
    let url = ApiConfig.batchModificationAuditor;
    return HttpRequest.requestJsonPost(url,option)
}

function getUtilizeLookup(option) {//获取详情(借阅，续借)
    let url = ApiConfig.getUtilizeLookup;
    return HttpRequest.requestJsonPost(url,option)
}

function getUtilizeProcess(option) {//获取数据详情
    let url = ApiConfig.getUtilizeProcess;
    return HttpRequest.requestJsonPost(url,option)
}

function borrowFileTable(option) {
    let url = ApiConfig.borrowFileTable;
    return HttpRequest.requestJsonPost(url,option)
}

function borrowCheckTable(option) {
    let url = ApiConfig.borrowCheckTable;
    return HttpRequest.requestJsonPost(url,option)
}

// 修改审批人提交（借阅，续借）
function examineApply(option) {
    let url = ApiConfig.updateAuditSubmit;
    return HttpRequest.requestJsonPost(url,option)
}

//(强制关闭，通过，驳回)（借阅，续借）
function enforceOperateProcess(option) {
    let url = ApiConfig.enforceOperateProcess;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getProcessInstanceList,
    getDictListByDictId,
    enforceCloseProcess,
    enforcePassOrReturnProcess,
    updateProcess,
    getInfo,
    borrowFileHead,
    seniorWdorg,
    findOaList,
    clearOaPerson,
    getContacts,
    searchOaList,
    getProcessUserList,
    batchUpdateProcessApprovalUser,
    saveContacts,
    getFondsApprovalInfo,
    getRecordById,
    modifyByAdmin,
    shutdownByAdmin,
    auditAll,
    rejectAll,
    batchModificationAuditor,
    getUtilizeLookup,
    getUtilizeProcess,
    borrowFileTable,
    borrowCheckTable,
    examineApply,
    enforceOperateProcess
};

export default Service;