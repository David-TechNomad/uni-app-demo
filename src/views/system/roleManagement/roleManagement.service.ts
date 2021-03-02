import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getRoleList(option) {//角色列表
    let url = ApiConfig.getRoleList;
    return HttpRequest.requestJsonPost(url,option)
}

function getRoleFunction(option) {//获取角色功能权限
    let url = ApiConfig.getRoleFunction;
    return HttpRequest.requestJsonPost(url,option)
}

function getPageList(option) {//获取菜单页面权限
    let url = ApiConfig.getPageList;
    return HttpRequest.requestJsonPost(url,option)
}
function getdictList(option) {
    let url = ApiConfig.getDictlistsurl;
    return HttpRequest.requestJsonPost(url,option)
}
function saveRole(option) {
    let url = ApiConfig.saveOrUpdateRole;
    return HttpRequest.requestJsonPost(url,option)
}
function delRole(option) {
    let url = ApiConfig.delRoleUrl;
    return HttpRequest.requestJsonPost(url,option)
}
function savePermiss(option) {
    let url = ApiConfig.updateRoleFunction;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getRoleList,//角色列表
    getRoleFunction,//获取角色功能权限
    getPageList,//获取菜单页面权限
    getdictList,
    saveRole,
    delRole,
    savePermiss
};

export default Service;