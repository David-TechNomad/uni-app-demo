import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
function getSystemOperationLogList(option) {//配置变更日志列表
    let url = ApiConfig.getSystemOperationLogList;
    return HttpRequest.requestJsonPost(url,option)
}
function getDictListByDictIdk(option) {//配置变更日志列表-操作类型
    let url = ApiConfig.getDictListByDictIdk;
    return HttpRequest.requestJsonPost(url,option)
}
function systemExport(option) {//导出
    let url = ApiConfig.systemExport;
    return HttpRequest.requestBlobPost(url,option)
}
let Service = {
    getSystemOperationLogList,
    getDictListByDictIdk,
    systemExport
};
export default Service;