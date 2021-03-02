import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
function savePublicUser(option) {//保存公众用户
    let url = ApiConfig.savePublicUser;
    return HttpRequest.requestJsonPost(url,option)
}
function updatePublicUser(option) {//更新公众用户
    let url = ApiConfig.updatePublicUser;
    return HttpRequest.requestJsonPost(url,option)
}
function uploadPublicUserFiles(option) {//上传公众用户证明材料
    let url = ApiConfig.uploadPublicUserFiles;
    return HttpRequest.requestJsonPost(url,option)
}
function findPublicUserByName(option) {//查询公众用户
    let url = ApiConfig.findPublicUserByName;
    return HttpRequest.requestJsonPost(url,option)
}]
let Service = {
    savePublicUser,//保存公众用户
    findPublicUserByName,//查询公众用户
    updatePublicUser,//更新公众用户
    uploadPublicUserFiles,//上传公众用户证明材料
};

export default Service;