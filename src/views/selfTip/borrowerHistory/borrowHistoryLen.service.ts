import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getBorrowerApplySearch(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}
const borrowFileHead = option => {
    let url = ApiConfig.getSuperSearchHead;
    return HttpRequest.requestJsonPost(url,option)
};
function borrowFileTable(option) {
    let url = ApiConfig.borrowFileTable;
    return HttpRequest.requestJsonPost(url,option)
}
function borrowCheckTable(option) {
    let url = ApiConfig.borrowCheckTable;
    return HttpRequest.requestJsonPost(url,option)
}

function getUtilizeLookup(option) {//获取详情
    let url = ApiConfig.getUtilizeLookup;
    return HttpRequest.requestJsonPost(url,option)
}

function getFondsApprovalInfo(option) {//获取全宗审批数据详情
    let url = ApiConfig.getUtilizeProcess;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getBorrowerApplySearch,
    borrowFileHead,
    borrowFileTable,
    borrowCheckTable,
    getUtilizeLookup,
    getFondsApprovalInfo
};

export default Service;