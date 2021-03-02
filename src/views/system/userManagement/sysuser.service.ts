import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//用户列表
function getUserList(option) {
    let url = ApiConfig.getUserList;
    return HttpRequest.requestJsonPost(url,option)
}
//查询档案馆列表
function findByUserInfoMaster(option) {
    let url = ApiConfig.findByUserInfoMaster;
    return HttpRequest.requestJsonPost(url,option)
}
//新增用户
function saveSystemUser(option) {
    let url = ApiConfig.saveSystemUser;
    return HttpRequest.requestJsonPost(url,option)
}
//修改用户
function updateSystemUser(option) {
    let url = ApiConfig.updateSystemUser;
    return HttpRequest.requestJsonPost(url,option)
}
//修改密码：
function updatePwd(option) {
    let url = ApiConfig.updatePwd;
    return HttpRequest.requestJsonPost(url,option)
}  
//删除用户（批量删除）
function updateLocked(option) {
    let url = ApiConfig.updateLocked;
    return HttpRequest.requestJsonPost(url,option)
}

 
//获取用户角色列表
function getsysRoleList(option) {
    let url = ApiConfig.getsysRoleList;
    return HttpRequest.requestJsonPost(url,option)
}
//查询用户绑定的角色
function getUserById(option) {
    let url = ApiConfig.getUserById;
    return HttpRequest.requestJsonPost(url,option)
}
//验证原密码是否正确
function checkPass(option) {
    let url = ApiConfig.checkPassword;
    return HttpRequest.requestJsonPost(url,option)
}

//给角色赋权
function updateUserRole(option) {
    let url = ApiConfig.updateUserRole;
    return HttpRequest.requestJsonPost(url,option)
}

//查询用户绑定的角色
function getRoleById(option) {
    let url = ApiConfig.getRoleById;
    return HttpRequest.requestJsonPost(url,option)
}
function archiveAgenterTree(option) {//档案馆树
    let url = ApiConfig.archiveAgenterTree;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getUserList,      
    findByUserInfoMaster,    
    saveSystemUser,
    updateSystemUser,
    updatePwd,  
    updateLocked,    
    getsysRoleList,    
    getUserById,
    checkPass,
    updateUserRole,
    getRoleById,
    archiveAgenterTree

};

export default Service;