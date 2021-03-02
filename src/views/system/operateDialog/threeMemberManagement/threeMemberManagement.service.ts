import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 获取三元用户
const getRolesByAgentCode = option => {
    let url = ApiConfig.getRolesByAgentCode;
    return HttpRequest.requestJsonPost(url,option)
};

//用户列表
function getUserList(option) {
    let url = ApiConfig.getUserList;
    return HttpRequest.requestJsonPost(url,option)
}

function setAgentUserRole(option) {
    let url = ApiConfig.setAgentUserRole;
    return HttpRequest.requestJsonPost(url,option)
}

function setRoleFlag(option) {
    let url = ApiConfig.setRoleFlag;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getRolesByAgentCode,
    getUserList,
    setAgentUserRole,
    setRoleFlag
}

export default Service;