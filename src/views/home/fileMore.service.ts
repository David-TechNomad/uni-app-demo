import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getNoticeList(option) {//通知列表
    let url = ApiConfig.getNoticeList;
    return HttpRequest.requestJsonPost(url,option)
}

function updateNotice(option){
	let url = ApiConfig.updateNotice;
    return HttpRequest.requestJsonPost(url,option)
}

function handleNotice(option){
	let url = ApiConfig.handleNotice;
    return HttpRequest.requestJsonPost(url,option)
}

function BatchDelNotice(ids){
	let url = ApiConfig.BatchDelNotice;
    return HttpRequest.requestJsonPost(url,ids)
}

function reportFileImport(data){
	let url = ApiConfig.reportFileImport;
    return HttpRequest.upLoadFormPost(url,data)
}

function updateReportTemplate(option){
	let url = ApiConfig.updateReportTemplate;
    return HttpRequest.requestJsonPost(url,option)
}

function BatchDelReportTemplate(ids){
	let url = ApiConfig.BatchDelReportTemplate;
    return HttpRequest.requestJsonPost(url,ids)
}
// 下载文档
const downloadFile = option => {
    let url = ApiConfig.indexDownLoad;
    return HttpRequest.requestBlobGet1(url,option)
};

let Service = {
    getNoticeList,
    updateNotice,
    handleNotice,
    BatchDelNotice,
    reportFileImport,
    updateReportTemplate,
    BatchDelReportTemplate,
    downloadFile
};

export default Service;