import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//获取表头
function getDispField(data) {
    let url = ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,data)
}
//获取列表
function getArchiveList(data) {
    let url = ApiConfig.RecycleList;
    return HttpRequest.requestJsonPost(url,data)
}
//获取卷内
function searchJuanNei(data) {
    let url = ApiConfig.getWenJianByAnJuan;
    return HttpRequest.requestJsonPost(url,data)
}


let Service = {
    getDispField,
    getArchiveList,
    searchJuanNei
};

export default Service;