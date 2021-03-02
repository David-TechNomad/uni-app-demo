import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getProcessTypeData(option) {
    let url = ApiConfig.getProcessTypeList;
    return HttpRequest.requestGet(url,option)
};
function getProcessTypeByList(option) {
    let url = ApiConfig.getProcessTypeByList;
    return HttpRequest.requestGet(url,option)
};
function saveProcessType(option) {
    let url = ApiConfig.saveDictData;
    return HttpRequest.requestJsonPost(url,option)
};
function deleteProcessType(option) {
    let url = ApiConfig.deleteDictData;
    return HttpRequest.requestJsonPost(url,option)
};
function getFondRoleList(option) {
    let url = ApiConfig.getFondRoleList;
    return HttpRequest.requestJsonPost(url,option)
};
function saveProcess(option) {
    let url = ApiConfig.saveProcess;
    return HttpRequest.requestJsonPost(url,option)
};
function deleteProcess(option) {
    let url = ApiConfig.deleteProcess;
    return HttpRequest.requestGet(url,option)
};
function dicDataUpSave(option) {
    let url = ApiConfig.dicDataUpSave;
    return HttpRequest.requestJsonPost(url,option)
};
let Service = {
    getProcessTypeData,
    getProcessTypeByList,
    saveProcessType,
    deleteProcessType,
    getFondRoleList,
    saveProcess,
    deleteProcess,
    dicDataUpSave
};

export default Service;