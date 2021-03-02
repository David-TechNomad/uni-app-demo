import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getCarData(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}
//获取用信息
function getUserInfo(params) {
    let url = ApiConfig.getUserUrl;
    return HttpRequest.requestJsonPost(url,params)
}
//获取画面表格的列配置
function getListConfig(params){
    let url = ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,params)
}
//获取数据库的所有数据
function FileSearch(params){
    let url=ApiConfig.FileSearch;
    return HttpRequest.requestJsonPost(url,params)
}
//检索项配置
function Getquerycondition(params){
    let url = ApiConfig.Getquerycondition;
    return HttpRequest.requestJsonPost(url,params)
};

//取需要移交的数据
function QueryFileTransferApply(params){
    let url = ApiConfig.QueryFileTransferApply;
    return HttpRequest.requestJsonPost(url,params)
};

// 查询OAtree
function findOaData(option) {
    let url = ApiConfig.getOaTreeUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 常用联系人
function findOaPerson(option) {
    let url = ApiConfig.getOaPerson;
    return HttpRequest.requestJsonPost(url,option)
}

// 节点名称表格
function findNameList(option) {
    let url = ApiConfig.getTreeNameList;
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

//添加常用联系人
function saveContacts(ids){
    let url = ApiConfig.saveContacts;
    return HttpRequest.requestJsonPost(url,ids)
};

//获取审批人角色
function GetSelectRole(data){
    let url = ApiConfig.getSelectRole;
    return HttpRequest.requestJsonPost(url,data)
}

//提交移交申请
function saveTransferLookup(params){
    let url = ApiConfig.saveTransferLookup;
    return HttpRequest.requestJsonPost(url,params)
};
// 获取所属分区下拉选数据
function getKeyName(option) {//根据全宗名获取全宗联想
    let url = ApiConfig.getKeyNameUrl;
    return HttpRequest.requestJsonPost(url,option)
}
function getAllFondsTreeData(option) {//获取全集全宗树（全量数据）
    let url = ApiConfig.getAllFondsTreeData;
    return HttpRequest.requestJsonPost(url,option)
}

// 全宗迁移
function fondsMove(option) {
    let url = ApiConfig.fondsMove;
    return HttpRequest.requestJsonPost(url,option)
}

function selectAuditprocess(option) {
    let url = ApiConfig.selectAuditprocess;
    return HttpRequest.requestJsonPost(url,option)
}
function getLogonUserRelatedFonds(option) {
    let url = ApiConfig.getLogonUserRelatedFonds;
    return HttpRequest.requestJsonPost(url,option)
}
function getArchiveTreeListByFondsId(option) {
    let url = ApiConfig.getArchiveTreeListByFondsId;
    return HttpRequest.requestJsonPost(url,option)
}

function apply(option) {
    let url = ApiConfig.apply;
    return HttpRequest.requestJsonPost(url,option)
}

function getUserUrl(option) {
    let url = ApiConfig.getUserUrl;
    return HttpRequest.requestJsonPost(url,option)
}
function getRecordById(option) {
    let url = ApiConfig.getRecordById;
    return HttpRequest.requestJsonPost(url,option)
}
function modify(option) {
    let url = ApiConfig.modify;
    return HttpRequest.requestJsonPost(url,option)
}
function shutdown(option) {
    let url = ApiConfig.shutdown;
    return HttpRequest.requestJsonPost(url,option)
}
// 全宗查询树
const getKeyTree = option => {
    let url = ApiConfig.getKeyTreeUrl;
    return HttpRequest.requestJsonPost(url,option)
};
// 根据全宗Id取得档案分类树
const getFondTree = option => {
    let url = ApiConfig.archiveTreeUrl1;
    return HttpRequest.requestJsonPost(url,option)
};
function findArchiveTreeByID(option) {
    let url = ApiConfig.findArchiveTreeByID;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getCarData,
    getUserInfo,
    getListConfig,
    FileSearch,
    Getquerycondition,
    QueryFileTransferApply,
    findOaData,
    findOaPerson,
    findNameList,
    clearOaPerson,
    findOaList,
    searchOaList,
    saveContacts,
    GetSelectRole,
    saveTransferLookup,
    getKeyName,
    getAllFondsTreeData,
    fondsMove,
    selectAuditprocess,//申请档案员 上级审批人
    getLogonUserRelatedFonds,//权限范围 父级
    getArchiveTreeListByFondsId,//权限范围 子级
    apply,//档案员 提交申请
    getUserUrl,//获取申请人信息
    getRecordById, //获取 原申请人信息
    modify,//档案员申请修改提交
    shutdown,//档案员关闭
    getKeyTree,
    getFondTree,
    findArchiveTreeByID


};

export default Service;