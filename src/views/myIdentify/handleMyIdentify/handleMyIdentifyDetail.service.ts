import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getIdentifyDetail(data) {
    let url = ApiConfig.getIdentifyDetail;
    return HttpRequest.requestJsonPost(url,data)
} 
function getTypeData(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}
function batchCommitApprove(data) {
	let url = ApiConfig.startupProcess;
	return HttpRequest.requestJsonPost(url, data)
}

let Service = {
    getIdentifyDetail,
    getTypeData,
    batchCommitApprove
};

export default Service;