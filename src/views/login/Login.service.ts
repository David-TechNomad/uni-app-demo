import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
function getKey(data) {
    let url = ApiConfig.passwordPublicKey;
    return HttpRequest.requestJsonPost(url,data)
}
function login(data) {
    let url = ApiConfig.login;
    return HttpRequest.requestFormPost(url,data)
}
function logout(data) {
    let url = ApiConfig.logout;
    return HttpRequest.requestJsonPost(url,data)
}
function captcha(data) {
    let url = ApiConfig.captcha;
    return HttpRequest.requestJsonGet(url,data)
}
function guestLogin(data) {
    let url = ApiConfig.guestLogin;
    return HttpRequest.requestJsonPost(url,data)
}
let Service = {
	getKey,
	login,
    logout,
    captcha,
    guestLogin
};
export default Service;