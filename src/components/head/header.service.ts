import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function logout(option) {
    let url = ApiConfig.logout;
    return HttpRequest.requestJsonPost(url,option)
}
function getKey(data) {
    let url = ApiConfig.passwordPublicKey;
    return HttpRequest.requestJsonPost(url,data)
}
let Service = {
    logout,
    getKey
};

export default Service;