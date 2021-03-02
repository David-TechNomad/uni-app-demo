import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function applyData(option) {
    let url = ApiConfig.getBorrowApplyUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function getFondRoleList(option) {//获取全宗角色
    let url = ApiConfig.getFondRoleList;
    return HttpRequest.requestJsonPost(url,option)
}
function seniorWdorg(option) {//选择对应公司
    let url = ApiConfig.seniorWdorg;
    return HttpRequest.requestJsonPost(url,option)
}

function fondsApprovalSave(option) {//全宗创建
    let url = ApiConfig.fondsApprovalSave;
    return HttpRequest.requestJsonPost(url,option)
}

// 组织架构选人
function findOaList(option) {
    let url = ApiConfig.getOaList;
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

// 节点名称表格
function getApprovalPerson(option) {
    let url = ApiConfig.getApprovalPerson;
    return HttpRequest.requestJsonPost(url,option)
}

// 控制选择抄送人是否显示
function getApprovalSave(option) {
    let url = ApiConfig.getApprovalSave;
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

// 查询OA/姓名
function searchOaList(option) {
    let url = ApiConfig.getOaSearch;
    return HttpRequest.requestJsonPost(url,option)
}

//当前登录人
function getUserUrl(option) {
    let url = ApiConfig.getUserUrl;
    return HttpRequest.requestJsonPost(url,option)
}

//（常用联系人）
function saveContacts(option) {
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    applyData,
    getFondRoleList,//获取全宗角色
    seniorWdorg,//选择对应公司
    findOaList,
    fondsApprovalSave,//全宗创建
    getDictListByDictId,//获取所属分区下拉选数据
    getAllFondsTreeData,//获取全集全宗树（全量数据）
    getApprovalPerson,// 节点名称表格
    getApprovalSave,//控制选择抄送人是否显示
    getContacts,//常用联系人
    searchOaList,// 查询OA/姓名
    clearOaPerson,//清除常用联系人
    getUserUrl,//获取当前登录人
    saveContacts,
};

export default Service;