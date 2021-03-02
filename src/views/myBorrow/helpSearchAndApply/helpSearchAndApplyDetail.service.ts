import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function findAsistSelectById(option) {
    let url = ApiConfig.findAsistSelectById;
    return HttpRequest.requestJsonPost(url,option)
}
function utilizeRequestReceive(data) {
	let url = ApiConfig.utilizeRequestReceive;
	return HttpRequest.requestJsonPost(url, data)
}
function ApplyAsistSelect(data) {
	let url = ApiConfig.ApplyAsistSelect;
	return HttpRequest.requestJsonPost(url, data)
}
function getReceptionArchive(data) {
	let url = ApiConfig.getReceptionArchive;
	return HttpRequest.requestJsonPost(url, data)
}
function rejectAsistSelectByAppno(data) {
	let url = ApiConfig.rejectAsistSelectByAppno;
	return HttpRequest.requestJsonPost(url, data)
}
function findUserById(data) {
	let url = ApiConfig.findUserById;
	return HttpRequest.requestJsonPost(url, data)
}
function findUtilizeLookUpByAsistSelectNum(data) {
	let url = ApiConfig.findUtilizeLookUpByAsistSelectNum;
	return HttpRequest.requestJsonPost(url, data)
}
function getArchivesInfo(option) {
    let url = ApiConfig.getArchivesInfo;
    return HttpRequest.requestJsonPost(url,option)
}
let Service = {
	findAsistSelectById,
	findUtilizeLookUpByAsistSelectNum,
    utilizeRequestReceive,
    ApplyAsistSelect,
    getReceptionArchive,
	rejectAsistSelectByAppno,
	findUserById,
	getArchivesInfo
};

export default Service;