import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 全宗联想
const getKeyName = option => {
    let url = ApiConfig.indexSearchUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 展示常用文档和通知
const getDownloadFile = option => {
    let url = ApiConfig.messagerDocumentUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 下载文档
const downloadFile = option => {
    let url = ApiConfig.indexDownLoad;
    return HttpRequest.requestBlobGet(url,option)
};

//任务列表 
const taskList = option => {
    let url = ApiConfig.taskList;
    return HttpRequest.requestJsonPost(url,option)
};
// 检索任务状态选项下拉
const taskStatusCandidates = option => {
    let url = ApiConfig.taskStatusCandidates;
    return HttpRequest.requestJsonPost(url,option)
};
//批量挂接
const searchTasks = option => {
    let url = ApiConfig.searchTasks;
    return HttpRequest.requestJsonPost(url,option)
};
function getUserUrl(option) {
    let url = ApiConfig.getUserUrl;
    return HttpRequest.requestJsonPost(url,option)
}
//批量挂接  删除
function Pdelete(option) {
    let url = ApiConfig.Pdelete;
    return HttpRequest.requestJsonPost(url,option)
}
//批量挂接 启动
function Pstart(option) {
    let url = ApiConfig.Pstart;
    return HttpRequest.requestJsonPost(url,option)
}
//批量挂接 详情
function Pdetails(option) {
    let url = ApiConfig.Pdetails;
    return HttpRequest.requestJsonPost(url,option)
}
//任务列表  删除
function deleteImportTask(option) {
    let url = ApiConfig.deleteImportTask;
    return HttpRequest.requestJsonPost(url,option)
}
//任务列表  批量挂接 进度条
function getProgress(option) {
    let url = ApiConfig.getProgress;
    return HttpRequest.requestJsonPost(url,option)
}
//匹配完成开始批量挂接
function fileUpStart(params){
    let url = ApiConfig.fileUpStart;
    return HttpRequest.requestJsonPost(url,params)
}
//获取导出任务列表
function exporttask(params){
    let url = ApiConfig.exporttask;
    return HttpRequest.requestJsonPost(url,params)
}
//取消下载
function exporttaskcancel(ID){
    let url = ApiConfig.exporttaskcancel;
    return HttpRequest.requestJsonPost(url,ID);
}
//下载
function exporttaskdownload(id){
    let url = ApiConfig.exporttaskdownload;
    return HttpRequest.requestBlobPost(url,id)
}
let Service = {
    getKeyName,
    getDownloadFile,
    downloadFile,
    taskList,
    searchTasks,
    getUserUrl,
    Pdelete,
    Pstart,
    fileUpStart,
    Pdetails,
    deleteImportTask,
    getProgress,
    exporttask,
    exporttaskcancel,
    exporttaskdownload,
    taskStatusCandidates,//检索任务状态选项下拉
};

export default Service;