import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
import qs from 'qs';

function getFondsUserUpdateRecordList(data){
    let url=ApiConfig.getFondsUserUpdateRecordList;
    return HttpRequest.requestJsonPost(url,data)
}
function getFondRoleList(data){
    let url=ApiConfig.getFondRoleList;
    return HttpRequest.requestJsonPost(url,data)
}
function getCurrentFondsUserList(data){
    let url=ApiConfig.getCurrentFondsUserList;
    return HttpRequest.requestJsonPost(url,data)
}
function exportCurrentFondsUserList(data){
    let url=ApiConfig.exportCurrentFondsUserList;
    return HttpRequest.requestBlobGet(url,data)
}
function exportFondsUserUpdateRecordList(data){
    let url=ApiConfig.exportFondsUserUpdateRecordList;
    return HttpRequest.requestBlobGet(url,data)
}
// 获取所属分区下拉选数据
function getKeyName(option) {//根据全宗名获取全宗联想
    let url = ApiConfig.getKeyNameUrl;
    return HttpRequest.requestJsonPost(url,option)
}
function getAllFondsTreeData(option) {//获取全集全宗树（全量数据）
    let url = ApiConfig.getAllFondsTreeData;
    return HttpRequest.requestJsonPost(url,option)
}
let Service = {
    getFondsUserUpdateRecordList,
    getFondRoleList,
    getCurrentFondsUserList,
    exportCurrentFondsUserList,
    exportFondsUserUpdateRecordList,
    getKeyName,
    getAllFondsTreeData
};

export default Service;