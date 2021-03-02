import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getTypeData(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}
function saveIdentify(data) {
	let url = ApiConfig.saveIdentify;
	return HttpRequest.requestJsonPost(url, data)
}
function submitIdentify(data) {
	let url = ApiConfig.submitIdentify;
	return HttpRequest.requestJsonPost(url, data)
}



let Service = {
	getTypeData,
	saveIdentify,
	submitIdentify
};

export default Service;