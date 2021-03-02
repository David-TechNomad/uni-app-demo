import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getUserList(option) {//用户列表
    let url = ApiConfig.getUserList;
    return HttpRequest.requestJsonPost(url,option)
}

function getRoleSelectData(option) {//角色下拉框
    let url = ApiConfig.roleSelect;
    return HttpRequest.requestJsonPost(url,option)
}

function getUserById(option) {//获取用户信息
    let url = ApiConfig.getUserById;
    return HttpRequest.requestJsonPost(url,option)
}

function updateUserRole(option) {//修改用戶角色
    let url = ApiConfig.updateUserRole;
    return HttpRequest.requestJsonPost(url,option)
}

//------------------------------------------------
function list(option) {//修改用戶角色
    let url = ApiConfig.list;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getUserList,
    getRoleSelectData,
    getUserById,
    updateUserRole,
    list
};

export default Service;