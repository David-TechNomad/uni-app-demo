import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getApprovalList(option) {//获取审批列表
    let url = ApiConfig.getApprovalList;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getApprovalList,//获取审批列表
};

export default Service;