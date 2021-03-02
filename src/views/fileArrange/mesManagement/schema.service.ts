import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//获取列表
function getlist(data) {
    let url = ApiConfig.archiveAipTemplate;
    return HttpRequest.requestJsonPost(url,data)
}
//编辑
function updateInfo(data) {
    let url = ApiConfig.updateInfo;
    return HttpRequest.requestJsonPost(url,data)
}
const delTempUploadFile = option => {
    let url = ApiConfig.delTempUploadFile;
    return HttpRequest.requestJsonPost(url,option)
};
let Service = {
    getlist,
    updateInfo,
    delTempUploadFile  
};

export default Service;