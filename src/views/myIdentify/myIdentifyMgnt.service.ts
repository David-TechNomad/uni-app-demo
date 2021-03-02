import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getAppraisalByUserList(data) {
    let url = ApiConfig.getAppraisalByUserList;
    return HttpRequest.requestJsonPost(url,data)
} 

function getTypeData(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}

 
let Service = {
    getAppraisalByUserList,//我的鉴定列表
    getTypeData
};

export default Service;