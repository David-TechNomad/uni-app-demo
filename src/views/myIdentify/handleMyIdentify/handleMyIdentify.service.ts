import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//待审批列表
function getHandleIdentifyList(data) {
	let url = ApiConfig.getAppraisalListByStatus;
	return HttpRequest.requestJsonPost(url, data)
}
function getTypeData(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}
let Service = {
	getHandleIdentifyList,
	getTypeData
};

export default Service;