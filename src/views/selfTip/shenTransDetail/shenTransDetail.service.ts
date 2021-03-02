import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getCarData(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}
function getRecordById(option) {
    let url = ApiConfig.getRecordById;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getCarData,
    getRecordById
};

export default Service;