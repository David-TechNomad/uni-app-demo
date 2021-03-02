import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function queryMyUtilize(option) {
    let url = ApiConfig.queryMyUtilize;
    return HttpRequest.requestJsonPost(url,option)
}
function queryMyAsistSelect(data) {
	let url = ApiConfig.queryMyAsistSelect;
	return HttpRequest.requestJsonPost(url, data)
}
function queryMyApplyAssistSelect(data) {
	let url = ApiConfig.queryMyApplyAssistSelect;
	return HttpRequest.requestJsonPost(url, data)
}
function findAsistSelectById(option) {
    let url = ApiConfig.findAsistSelectById;
    return HttpRequest.requestJsonPost(url,option)
}
let Service = {
    queryMyUtilize,
    queryMyAsistSelect,
    queryMyApplyAssistSelect,
    findAsistSelectById
};

export default Service;