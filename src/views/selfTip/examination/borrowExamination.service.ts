import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getExamSearch(option) {
    let url = ApiConfig.examineSearchUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function getProperSearch(option) {
    let url = ApiConfig.properSearchUrl;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getExamSearch,
    getProperSearch
};

export default Service;