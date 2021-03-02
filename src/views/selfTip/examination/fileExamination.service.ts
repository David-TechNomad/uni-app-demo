import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getExamFondsSearch(option) {
    let url = ApiConfig.examineSearchUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function queryFileTransferTask(option) {// 全宗创建审批列表
    let url = ApiConfig.queryFileTransferTask;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getExamFondsSearch,
    queryFileTransferTask// 全宗创建审批列表
};

export default Service;