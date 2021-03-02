import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function CheckDH(params){
    let url = ApiConfig.CheckDH;
    return HttpRequest.requestJsonPost(url,params)
};

function CheckDhNotes(params){
    let url = ApiConfig.CheckDhNotes;
    return HttpRequest.requestJsonPost(url,params)
}

let Service = {
    CheckDH,
    CheckDhNotes
}

export default Service