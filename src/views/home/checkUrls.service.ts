import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//
const getKeyName = option => {
    let url = ApiConfig.checkUrl;
    return HttpRequest.requestJsonPost(url,option)
};


let Service = {
    getKeyName,
};

export default Service;