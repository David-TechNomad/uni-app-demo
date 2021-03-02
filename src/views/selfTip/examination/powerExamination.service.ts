import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getAgency(option) {
    let url = ApiConfig.getAgency;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getAgency,
};

export default Service;