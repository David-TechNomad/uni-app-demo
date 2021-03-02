import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getBorrowerApplySearch(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function searchProjectList(option) {//列表
    let url = ApiConfig.searchProjectList;
    return HttpRequest.requestJsonPost(url,option)
}


function getPrepareData(option) {//新增
    let url = ApiConfig.getPrepareData;
    return HttpRequest.requestJsonPost(url,option)
}

function findByDictIdAndText(option) {//模糊查询
    let url = ApiConfig.findByDictIdAndText;
    return HttpRequest.requestJsonPost(url,option)
}
function getProjectCode(option) {//项目编号 返回
    let url = ApiConfig.getProjectCode;
    return HttpRequest.requestJsonPost(url,option)
}
function xbglSave(option) {//项目编号 返回
    let url = ApiConfig.xbglSave;
    return HttpRequest.requestJsonPost(url,option)
}
function closeList(option) {//项目编号 返回
    let url = ApiConfig.closeList;
    return HttpRequest.requestJsonPost(url,option)
}
function SavegetEdit(option) {//项目编号 返回
    let url = ApiConfig.SavegetEdit;
    return HttpRequest.requestJsonPost(url,option)
}
function getAllFonds(option) {//全宗号
    let url = ApiConfig.getAllFonds;
    return HttpRequest.requestJsonPost(url,option)
}
// 全宗联想
const getKeyName = option => {
    let url = ApiConfig.getKeyNameUrl;
    return HttpRequest.requestJsonPost(url,option)
};
// 全宗联想
const getCode = option => {
    let url = ApiConfig.getCode;
    return HttpRequest.requestJsonPost(url,option)
};

function exportProjectList(option) {//导出
    let url = ApiConfig.exportProjectList;
    return HttpRequest.requestBlobGet(url,option)
}

let Service = {
    getBorrowerApplySearch,
    searchProjectList,
    getPrepareData,
    findByDictIdAndText,
    getProjectCode,
    xbglSave,
    closeList,
    SavegetEdit,
    getAllFonds,
    getKeyName,
    getCode,
    exportProjectList
};

export default Service;