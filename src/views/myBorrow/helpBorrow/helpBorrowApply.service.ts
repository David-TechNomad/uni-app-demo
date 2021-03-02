import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getTypeData(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}
function utilizeRequestReceive(data) {
	let url = ApiConfig.utilizeRequestReceive;
	return HttpRequest.requestJsonPost(url, data)
}
function applyAsistSelect(data) {
	let url = ApiConfig.ApplyAsistSelect;
	return HttpRequest.requestJsonPost(url, data)
}
function getReceptionArchive(data) {
	let url = ApiConfig.getReceptionArchive;
	return HttpRequest.requestJsonPost(url, data)
}
 
let Service = {
    getTypeData,
    utilizeRequestReceive,
	applyAsistSelect,
	getReceptionArchive
};

export default Service;