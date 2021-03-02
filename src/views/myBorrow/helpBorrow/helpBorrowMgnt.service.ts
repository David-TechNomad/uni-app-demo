import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getBorrowSearch(option) {
    let url = ApiConfig.borrowApplySearch;
    return HttpRequest.requestJsonPost(url,option)
}

// 高级检索案卷库及文件列表表头
const getFileHead = option => {
    let url = ApiConfig.getSuperSearchHead;
    return HttpRequest.requestJsonPost(url,option)
};

function getFileSearch(option) {
    let url = ApiConfig.borrowFileSearch;
    return HttpRequest.requestJsonPost(url,option)
};
function updateReturnMessage(option) {
    let url = ApiConfig.updateReturnMessage;
    return HttpRequest.requestJsonPost(url,option)
};

// 水印是否超时
function waterMarkTime(params){
    let url = ApiConfig.getIsWatermark;
    return HttpRequest.requestJsonPost(url,params)
};
function queryApplyAssistSelectByOperator(params){
    let url = ApiConfig.queryApplyAssistSelectByOperator;
    return HttpRequest.requestJsonPost(url,params)
};
function queryUtilizeLookupByReceptionCode(params){
    let url = ApiConfig.queryUtilizeLookupByReceptionCode;
    return HttpRequest.requestJsonPost(url,params)
};
function queryApplyAssistSelectByFirstReceptionCode(params){
    let url = ApiConfig.queryApplyAssistSelectByFirstReceptionCode;
    return HttpRequest.requestJsonPost(url,params)
};
// 远程利用报表
const workPrint = option => {
    let url = ApiConfig.workPrint;
    return HttpRequest.requestBlobPost(url,option)
};

let Service = {
    getBorrowSearch,
    updateReturnMessage,
    getFileHead,
    getFileSearch,
    waterMarkTime,
    queryApplyAssistSelectByOperator,
    queryUtilizeLookupByReceptionCode,
    queryApplyAssistSelectByFirstReceptionCode,
    workPrint
};

export default Service;