import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getCookieMiss(data) {
    let url = ApiConfig.cookieMissUrl;
    return HttpRequest.requestJsonPost(url,data)
}
// 购物车
function getCarCount(data) {
    let url = ApiConfig.getCarCountUrl;
    return HttpRequest.requestJsonPost(url,data)
}

// 获取OA菜单选项
function getOAMenu(data) {
    let url = ApiConfig.getOAMenuUrl;
    return HttpRequest.requestJsonPost(url,data)
}

function getFileService(data) {
    let url = ApiConfig.serviceUrl;
    return HttpRequest.requestJsonPost(url,data)
}

export default { getCookieMiss, getCarCount, getOAMenu,getFileService };
