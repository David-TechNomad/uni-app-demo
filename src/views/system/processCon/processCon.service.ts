import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getProcessTypeData(option) {
    let url = ApiConfig.getProcessTypeList;
    return HttpRequest.requestJsonPost(url,option)
};
function getDictListByDictId(option) {
    let url = ApiConfig.getDictListByDictId;
    return HttpRequest.requestJsonPost(url,option)
};
function getProcessTypeByList(option) {
    let url = ApiConfig.getProcessTypeByList;
    return HttpRequest.requestJsonPost(url,option)
};
function saveProcessType(option) {
    let url = ApiConfig.saveDictData;
    return HttpRequest.requestJsonPost(url,option)
};
function deleteProcessType(option) {
    let url = ApiConfig.deleteDictData;
    return HttpRequest.requestJsonPost(url,option)
};
function getRoleList(option) {
    let url = ApiConfig.getRoleList;
    return HttpRequest.requestJsonPost(url,option)
};
function getUserList(option) {
    let url = ApiConfig.getAgentUserList;
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
function findAgenterCode(option){
	let url = ApiConfig.findAgenterCode;
	return HttpRequest.requestJsonPost(url,option)
};
function getTypeData(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}
function selectAgent(data) {
	let url = ApiConfig.selectAgent;
	return HttpRequest.requestJsonPost(url, data)
}

let Service = {
    findAgenterCode,
    getDictListByDictId,
    getProcessTypeData,
    getProcessTypeByList,
    saveProcessType,
    deleteProcessType,
    getRoleList,
    saveProcess,
    deleteProcess,
    dicDataUpSave,
    getTypeData,
    selectAgent,
    getUserList
};

export default Service;