import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//处置历史 业务实体元数据查询
function history(data) {
    let url = ApiConfig.history;
    return HttpRequest.requestJsonPost(url,data)
}
//处置历史 机构人员实体元数据查询
function agent(data) {
    let url = ApiConfig.agent;
    return HttpRequest.requestJsonPost(url,data)
}
//处置历史 法规元数据查询
function mandate(data) {
    let url = ApiConfig.mandate;
    return HttpRequest.requestJsonPost(url,data)
}
//处置历史 关系实体元数据查询
function archiveEntity(data) {
    let url = ApiConfig.archiveEntity;
    return HttpRequest.requestJsonPost(url,data)
}


let Service = {
    history,
    agent,
    mandate,
    archiveEntity
};

export default Service;