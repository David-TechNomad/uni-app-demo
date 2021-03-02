import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//案卷
function checkDH(params){
    let url = ApiConfig.CheckDH;
    return HttpRequest.requestJsonPost(url,params)
};
//文件
function checkDHW(params){
    let url = ApiConfig.CheckDHW;
    return HttpRequest.requestJsonPost(url,params)
}
function CheckDhNotes(params){
    let url = ApiConfig.CheckDhNotes;
    return HttpRequest.requestJsonPost(url,params)
}

let Service = {
    checkDH,
    CheckDhNotes,
    checkDHW
}

export default Service;