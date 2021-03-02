import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getLoginLogList(option) {//用户登录信息
    let url = ApiConfig.getLoginLogList;
    return HttpRequest.requestJsonPost(url,option)
}
function loginLogExport(option) {//导出
    let url = ApiConfig.loginLogExport;
    return HttpRequest.requestBlobPost(url,option)
}
let Service = {
    getLoginLogList,
    loginLogExport
};

export default Service;