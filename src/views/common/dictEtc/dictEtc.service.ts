import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';


function getDictListByDictId(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}

let Service = {
    getDictListByDictId
}
export default Service