import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function queryMyAsistSelect(option) {
    let url = ApiConfig.queryMyAsistSelect;
    return HttpRequest.requestJsonPost(url,option)
}
function getTypeData(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}

function ApplyAsistSelect(data) {
	let url = ApiConfig.ApplyAsistSelect;
	return HttpRequest.requestJsonPost(url, data)
}

let Service = {
    queryMyAsistSelect,
    getTypeData,
    ApplyAsistSelect
};

export default Service;