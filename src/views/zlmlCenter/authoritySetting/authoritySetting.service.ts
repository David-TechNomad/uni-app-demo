import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';


function getUserList(option) {
    let url = ApiConfig.getUserList;
    return HttpRequest.requestJsonPost(url,option)
}
function getSysUserJoinUserFondList(option){
    let url = ApiConfig.getSysUserJoinUserFondList;
    return HttpRequest.requestJsonPost(url,option)
}
function findFondsByName(option) {
    let url = ApiConfig.findFondsByName;
    return HttpRequest.requestJsonPost(url,option)
}
function updateUserFond(option) {
    let url = ApiConfig.updateUserFond;
    return HttpRequest.requestJsonPost(url,option)

}
let Service = { 
    getUserList,
    findFondsByName,
    getSysUserJoinUserFondList,
    updateUserFond
};

export default Service;