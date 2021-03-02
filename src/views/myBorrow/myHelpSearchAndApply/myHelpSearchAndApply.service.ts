import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function queryMyAsistSelect(option) {
    let url = ApiConfig.queryMyAsistSelect;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    queryMyAsistSelect
};

export default Service;