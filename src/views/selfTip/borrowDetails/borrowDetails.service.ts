import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

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

function getFondsApprovalInfo(option) {//获取全宗审批数据详情
    let url = ApiConfig.getUtilizeProcess;
    return HttpRequest.requestJsonPost(url,option)
}

function getUtilizeLookup(option) {//获取详情
    let url = ApiConfig.getUtilizeLookup;
    return HttpRequest.requestJsonPost(url,option)
}

function printProcessUrl(option) {//获取详情
    let url = ApiConfig.printProcess;
    return HttpRequest.requestBlobGet(url,option)
}

// 水印是否超时
function waterMarkTime(params){
    let url = ApiConfig.getIsWatermark;
    return HttpRequest.requestJsonPost(url,params)
};

let Service = {
    borrowFileHead,
    borrowFileTable,
    borrowCheckTable,
    getFondsApprovalInfo,
    getUtilizeLookup,
    printProcessUrl,
    waterMarkTime
};

export default Service;