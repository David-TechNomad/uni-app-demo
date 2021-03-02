import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function queryMyAuditUtilize(option) {
    let url = ApiConfig.queryMyAuditUtilize;
    return HttpRequest.requestJsonPost(url,option)
}

function getDictListByDictId(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}

let Service = {
    queryMyAuditUtilize,
    getDictListByDictId
};

export default Service;