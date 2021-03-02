import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 下载文档
const getDownloadFile = option => {
    let url = ApiConfig.getDownloadInfoList;
    return HttpRequest.requestJsonPost(url,option)
};
//登出
function logout(option) {
    let url = ApiConfig.logout;
    return HttpRequest.requestJsonPost(url,option)
}
//获取通知公告列表
function getAnnouncementList(option) {
    let url = ApiConfig.getAnnouncementList;
    return HttpRequest.requestJsonPost(url,option)
}
//我的查阅单
function queryMyUtilize(option) {
    let url = ApiConfig.queryMyUtilize;
    return HttpRequest.requestJsonPost(url,option)
}
let Service = { 
    getDownloadFile,
    logout,
    getAnnouncementList,
    queryMyUtilize
};

export default Service;