import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
import qs from 'qs';
function getMenus(data) {
    let url = ApiConfig.getMenus;
    return HttpRequest.requestJsonPost(url,data)
}
let Service = {
    getMenus   
};

export default Service;