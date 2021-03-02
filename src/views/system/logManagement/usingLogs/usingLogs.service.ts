import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
function utilizeLoglist(option) {//日志列表
    let url = ApiConfig.utilizeLoglist;
    return HttpRequest.requestJsonPost(url,option)
}
function utilizeExport(option) {//导出
    let url = ApiConfig.utilizeExport;
    return HttpRequest.requestBlobPost(url,option)
}
let Service = {
    utilizeLoglist,
    utilizeExport
};
export default Service;