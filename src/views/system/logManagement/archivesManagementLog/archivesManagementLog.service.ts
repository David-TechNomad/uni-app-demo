import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
function getArchiveActionLogList(option) {//利用档案资源管理行为采集列表
    let url = ApiConfig.getArchiveActionLogList;
    return HttpRequest.requestJsonPost(url,option)
}
function archiveActionExport(option) {//导出
    let url = ApiConfig.archiveActionExport;
    return HttpRequest.requestBlobPost(url,option)
}
let Service = {
    getArchiveActionLogList,
    archiveActionExport
};
export default Service;