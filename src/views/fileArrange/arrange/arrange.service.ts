import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//获取tree
function getTree(data) {
    let url = ApiConfig.getAllByArchiveAgentCode;
    return HttpRequest.requestJsonPost(url,data)
}
//获取tree
function getTreeNum(data) {
    let url = ApiConfig.getTreeNum;
    return HttpRequest.requestJsonPost(url,data)
}

//获取libid
function getlibId(data) {
    let url = ApiConfig.getarclib;
    return HttpRequest.requestJsonPost(url,data)
}
//判断是案卷还是文件
function containsAnJuan(data){
    let url = ApiConfig.containsAnJuan;
    return HttpRequest.requestJsonPost(url,data)
}
//删除
function BatchDelete(params){
    let url = ApiConfig.BatchDelete;
    return HttpRequest.requestJsonPost(url,params)
};
function unmergeAndDelete(params){
    let url = ApiConfig.unmergeAndDelete;
    return HttpRequest.requestJsonPost(url,params)
};

//自动组卷
function autoAssemble(params){
    let url = ApiConfig.autoAssemble;
    return HttpRequest.requestJsonPost(url,params)
}
//自动拆卷
function unmerge(params){
    let url = ApiConfig.unmerge;
    return HttpRequest.requestJsonPost(url,params)
}
//发布案卷
function anjuanPublish(params){
    let url = ApiConfig.anjuanPublish;
    return HttpRequest.requestJsonPost(url,params)
}
//发布文件
function weijianPublish(params){
    let url = ApiConfig.weijianPublish;
    return HttpRequest.requestJsonPost(url,params)
}

//数据导出
function DataImporterExport(params){
    let url = ApiConfig.DataImporterExport;
    return HttpRequest.requestBlobPost(url,params)
}

//导出目录
function archiveExportTask(params){
    let url = ApiConfig.archiveExportTask;
    return HttpRequest.requestBlobPost(url,params)
}
// 查找卷内文件列表
function searchJuanNei(params){
    let url = ApiConfig.searchJuanNei;
    return HttpRequest.requestJsonPost(url,params)
}
//我的鉴定
function getTypeData(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}

function getIdentifyNameList(data) {
	let url = ApiConfig.getIdentifyNameList;
	return HttpRequest.requestJsonPost(url, data)
}

function saveAddToIdentifyTask(data) {
	let url = ApiConfig.saveAddToIdentifyTask;
	return HttpRequest.requestJsonPost(url, data)
}
//导出含原文
    //创建任务
    function arrcreateExportTask(data) {
        let url = ApiConfig.arrcreateExportTask;
        return HttpRequest.requestJsonPost(url, data)
    }   
    //启动任务
    function arrExportstart(data) {
        let url = ApiConfig.arrExportstart;
        return HttpRequest.requestJsonPost(url, data)
    }   


let Service = {
    getTree,
    getTreeNum,
    getlibId,
    BatchDelete,
    unmergeAndDelete,
    autoAssemble,
    anjuanPublish,
    weijianPublish,
    DataImporterExport,
    archiveExportTask ,
    searchJuanNei , 
    unmerge  ,
    getTypeData,
    getIdentifyNameList,
    saveAddToIdentifyTask,
    arrcreateExportTask,
    arrExportstart,
    containsAnJuan,//通过kindId判断是案卷还是文件
};

export default Service;