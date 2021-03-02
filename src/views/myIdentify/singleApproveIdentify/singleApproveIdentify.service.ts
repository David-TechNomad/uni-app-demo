import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getProcessDetail(data) {
    let url = ApiConfig.getProcessDetail;
    return HttpRequest.requestJsonPost(url,data)
} 
 
function getTaskInfoProcessDetail(data) {
    let url = ApiConfig.getTaskInfoProcessDetail;
    return HttpRequest.requestJsonPost(url,data)
}
let Service = {
    getProcessDetail,
    getTaskInfoProcessDetail
};

export default Service;