import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getExamSearch(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function getEachCount(options){
    let url = ApiConfig.getEachCountUrl;
    return HttpRequest.requestJsonPost(url,options)
}

let Service = {
    getExamSearch,
    getEachCount
};

export default Service;