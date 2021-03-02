import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getIdentifyDetail(data) {
    let url = ApiConfig.getIdentifyDetail;
    return HttpRequest.requestJsonPost(url,data)
} 
function getIdentifyProcess(data) {
    let url = ApiConfig.getProcessDetail;
    return HttpRequest.requestJsonPost(url,data)
}
// 提交鉴定申请
function submitIdentify(data) {
	let url = ApiConfig.submitIdentify;
	return HttpRequest.requestJsonPost(url, data)
}

 
let Service = {
    getIdentifyDetail,
    getIdentifyProcess,
    submitIdentify
};

export default Service;