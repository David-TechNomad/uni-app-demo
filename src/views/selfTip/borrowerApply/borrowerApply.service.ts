import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getBorrowerApplySearch(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function getCreateList(option) {//借阅人变更申请列表
    let url = ApiConfig.getCreateList;
    return HttpRequest.requestJsonPost(url,option)
}

function closeProcess(option) {//关闭流程
    let url = ApiConfig.closeProcess;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getBorrowerApplySearch,
    getCreateList,//借阅人变更申请列表
    closeProcess,//关闭流程
};

export default Service;