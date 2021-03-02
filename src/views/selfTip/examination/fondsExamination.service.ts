import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getExamFondsSearch(option) {
    let url = ApiConfig.examineSearchUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function findFondApprovalColumn(option) {// 全宗创建审批列表
    let url = ApiConfig.findFondApprovalColumn;
    return HttpRequest.requestJsonPost(url,option)
}

//当前登录人
function getUserUrl(option) {
    let url = ApiConfig.getUserUrl;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getExamFondsSearch,
    findFondApprovalColumn,// 全宗创建审批列表
    getUserUrl
};

export default Service;