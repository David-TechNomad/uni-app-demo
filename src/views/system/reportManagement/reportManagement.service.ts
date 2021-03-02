import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getReportTemplateList(option) {//用户列表
    let url = ApiConfig.getReportTemplateList;
    return HttpRequest.requestJsonPost(url,option)
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

let Service = {
    getReportTemplateList,
    reportFileImport,
    updateReportTemplate,
    BatchDelReportTemplate
};

export default Service;