import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function findUser(option) {//查看系统用户信息
    let url = ApiConfig.findUser;
    return HttpRequest.requestJsonPost(url,option)
}
function updateUser(option) {//更新系统用户信息
    let url = ApiConfig.updateUser;
    return HttpRequest.requestJsonPost(url,option)
}
function findPublicUserById(option) {//查看公众用户信息
    let url = ApiConfig.findPublicUserById;
    return HttpRequest.requestJsonPost(url,option)
}
function updatePublicUser(option) {//更新公众用户信息
    let url = ApiConfig.updatePublicUser;
    return HttpRequest.requestJsonPost(url,option)
}
let Service = {
    findUser,
    updateUser,
    updatePublicUser,//更新公众用户
    findPublicUserById,//查看公众用户信息
   
};

export default Service;