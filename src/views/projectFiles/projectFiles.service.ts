import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function projectAllList(params){
    let url = ApiConfig.projectAllList;
    return HttpRequest.requestJsonPost(url,params);
}
function houseListTitle(params){
    let url = ApiConfig.houseListTitle;
    return HttpRequest.requestJsonPost(url,params);
}


let Service = {
    projectAllList,
    houseListTitle
};

export default Service;