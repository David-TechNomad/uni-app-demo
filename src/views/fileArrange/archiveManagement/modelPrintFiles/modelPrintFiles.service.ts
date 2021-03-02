import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 表格
const getTable = option => {
    let url = ApiConfig.modelTableUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 下载表格
const downLoadTable = option => {
    let url = ApiConfig.modelPrintUrl;
    return HttpRequest.requestBlobGet(url,option)
};

// 打印表格
const printTable = option => {
    let url = ApiConfig.modelPrintUrl;
    return HttpRequest.requestBlobGet(url,option)
};

// 预览表格
const displayTable = option => {
    let url = ApiConfig.modelPrintUrl;
    return HttpRequest.requestHtmlGet(url,option)
};

let Service = {
    getTable,
    printTable,
    displayTable,
    downLoadTable
};

export default Service;