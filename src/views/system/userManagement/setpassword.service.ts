import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//修改系统密码：
function updatePwd(option) {
    let url = ApiConfig.updatePwd;
    return HttpRequest.requestJsonPost(url,option)
} 
//修改公众用户密码：
function updatePublicUserPassword(option) {
    let url = ApiConfig.updatePublicUserPassword;
    return HttpRequest.requestJsonPost(url,option)
} 
//系统用户验证原密码是否正确
function checkPass(option) {
    let url = ApiConfig.checkPassword;
    return HttpRequest.requestJsonPost(url,option)
}
//公众用户验证原密码是否正确
function checkPublicUserPassword(option) {
    let url = ApiConfig.checkPublicUserPassword;
    return HttpRequest.requestJsonPost(url,option)
}
let Service = {
    updatePwd,//修改系统密码：
    checkPass,//系统用户验证原密码是否正确
    checkPublicUserPassword,//公众用户验证原密码是否正确
    updatePublicUserPassword,//修改公众用户密码：
};

export default Service;