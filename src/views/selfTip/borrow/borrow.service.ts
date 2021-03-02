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

// 水印是否超时
function waterMarkTime(params){
    let url = ApiConfig.getIsWatermark;
    return HttpRequest.requestJsonPost(url,params)
};

let Service = {
    getBorrowSearch,
    getFileHead,
    getFileSearch,
    waterMarkTime
};

export default Service;