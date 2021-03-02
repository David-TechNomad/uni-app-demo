import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function findAllStamp(option) {//查询所有印章
    let url = ApiConfig.findAllStamp;
    return HttpRequest.requestJsonPost(url,option)
}
function findStampByArchivesAgentCode(option) {//查询当前档案馆所有印章
    let url = ApiConfig.findStampByArchivesAgentCode;
    return HttpRequest.requestJsonPost(url,option)
}
function saveStamp(option) {//添加印章
    let url = ApiConfig.saveStamp;
    return HttpRequest.requestJsonPost(url,option)
}
function updateStamp(option) {//印章编辑
    let url = ApiConfig.updateStamp;
    return HttpRequest.requestJsonPost(url,option)
}
function archiveAgenterTree(option) {//检索条件中的档案馆树
    let url = ApiConfig.archiveAgenterTree;
    return HttpRequest.requestJsonPost(url,option)
}
let Service = {
    findAllStamp,//查询所有印章
    findStampByArchivesAgentCode,//查询当前档案馆所有印章
    saveStamp,//添加印章
    updateStamp,//印章编辑
    archiveAgenterTree,//检索条件中的档案馆树
};

export default Service;