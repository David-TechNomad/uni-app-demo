import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getLendInit(data) {
    let url = ApiConfig.applyUrl;
    return HttpRequest.requestJsonPost(url,data)
}

let Service = {
    getLendInit
};

export default Service;