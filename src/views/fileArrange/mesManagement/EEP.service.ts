import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//获取tree
function getTree(data) {
    let url = ApiConfig.getAllByArchiveAgentCode;
    return HttpRequest.requestJsonPost(url,data)
}
//获取tree
function getTreeNum(data) {
    let url = ApiConfig.getTreeNum;
    return HttpRequest.requestJsonPost(url,data)
}

//获取libid
function getlibId(data) {
    let url = ApiConfig.getarclib;
    return HttpRequest.requestJsonPost(url,data)
}

//获取libid
function getList(data) {
    let url = ApiConfig.archiveAipfindList;
    return HttpRequest.requestJsonPost(url,data)
}

//获取libid
function exportAip(data) {
    let url = ApiConfig.exportAip;
    return HttpRequest.requestBlobGet2(url,data)
}

let Service = {
    getTree,
    getTreeNum,
    getlibId,
    getList,
    exportAip
   
};

export default Service;