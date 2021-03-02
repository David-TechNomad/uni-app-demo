import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function findUserById(data) {
	let url = ApiConfig.findUserById;
	return HttpRequest.requestJsonPost(url, data)
}
function getArchivesInfo(option) {
    let url = ApiConfig.getArchivesInfo;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
	findUserById,
	getArchivesInfo
};

export default Service;