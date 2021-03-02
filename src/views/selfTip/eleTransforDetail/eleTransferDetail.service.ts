import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getCarData(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getCarData,
};

export default Service;