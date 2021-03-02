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
function findPublicUserByName(option) {//查询公众用户
    let url = ApiConfig.findPublicUserByName;
    return HttpRequest.requestJsonPost(url,option)
}
function deletePublicUser(option) {//删除公众用户
    let url = ApiConfig.deletePublicUser;
    return HttpRequest.requestJsonPost(url,option)
}
function resetPassword(option) {//重置用户密码
    let url = ApiConfig.resetPassword;
    return HttpRequest.requestJsonPost(url,option)
}
function getAllFondsTreeData(option) {//获取全集全宗树（全量数据）
    let url = ApiConfig.getAllFondsTreeData;
    return HttpRequest.requestJsonPost(url,option)
}

// 获取所属分区下拉选数据
function getKeyName(option) {//根据全宗名获取全宗联想
    let url = ApiConfig.getKeyNameUrl;
    return HttpRequest.requestJsonPost(url,option)
}
// 根据用户id获取相关公众材料信息集合
function getFilesByUserId(option) {
    let url = ApiConfig.getFilesByUserId;
    return HttpRequest.requestJsonPost(url,option)
}
// 根据路径下载文件
function getFileByFilePath(option) {
    let url = ApiConfig.getFileByFilePath;
    return HttpRequest.requestBlobGet(url,option)
}
let Service = {
    getUserList,
    getRoleSelectData,
    getUserById,
    updateUserRole,
    getAllFondsTreeData,
    getKeyName,
    findPublicUserByName,//查询公众用户
    deletePublicUser,//删除公众用户
    resetPassword,//重置用户密码
    getFileByFilePath,//根据路径下载文件
    getFilesByUserId,//根据用户id获取相关公众材料信息集合
};

export default Service;