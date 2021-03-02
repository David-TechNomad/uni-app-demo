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
//删除
function BatchDelete(params){
    let url = ApiConfig.RecycleRemove;
    return HttpRequest.requestJsonPost(url,params)
}; 
//回收站恢复
function RecycleRestore(params){
    let url = ApiConfig.RecycleRestore;
    return HttpRequest.requestJsonPost(url,params)
};


let Service = {
    getTree,
    getTreeNum,
    getlibId,
    BatchDelete,
    RecycleRestore   
};

export default Service;