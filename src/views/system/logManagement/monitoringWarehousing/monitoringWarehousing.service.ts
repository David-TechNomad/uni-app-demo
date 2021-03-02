import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
function getPlanInfoDataStorageLogList(option) {//检测与入库日志列表
    let url = ApiConfig.getPlanInfoDataStorageLogList;
    return HttpRequest.requestJsonPost(url,option)
}
function taskExport(option) {//导出
    let url = ApiConfig.taskExport;
    return HttpRequest.requestBlobPost(url,option)
}
function getDataLogStandardCheckLogList(option) {//导出
    let url = ApiConfig.getDataLogStandardCheckLogList;
    return HttpRequest.requestJsonPost(url,option)
}
let Service = {
    getPlanInfoDataStorageLogList,
    taskExport,
    getDataLogStandardCheckLogList
};
export default Service;