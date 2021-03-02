import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//取当前全宗下的公司
function getSonUrl(data){
    let url = ApiConfig.getSonUrl;
    return HttpRequest.requestJsonPost(url,data)
}
//取下级全宗
function getFondChild(data){
    let url=ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,data)
}
//当前全宗的档案分类结构
function archiveNowFile(data){
    let url = ApiConfig.archiveTreeUrl;
    return HttpRequest.requestJsonPost(url,data)
}
//取得分类
function listWithoutLib(params){
    let url = ApiConfig.listWithoutLib;
    return HttpRequest.requestJsonPost(url,params)
}
//获取ehr组织架构
function getOaTreeChildUrl(id){
    let url = ApiConfig.getOaTreeChildUrl;
    return HttpRequest.requestJsonPost(url,id)
}

//创建分组
function createFolderNode(obj){
    let url = ApiConfig.createFolderNode;
    return HttpRequest.requestJsonPost(url,obj)
}

//创建档案库
function createKindNode(obj){
    let url = ApiConfig.createKindNode;
    return HttpRequest.requestJsonPost(url,obj)
}
//检测是否重名
function checkBeforeMigrateKindNode(obj){
    let url =ApiConfig.checkBeforeMigrateKindNode;
    return HttpRequest.requestJsonPost(url,obj)
}
//删除组或案卷库
function removeNode(obj){
    let url = ApiConfig.removeNode;
    return HttpRequest.requestJsonPost(url,obj)
}
//修改分组
function modifyFolderNode(obj){
    let url = ApiConfig.modifyFolderNode;
    return HttpRequest.requestJsonPost(url,obj)
}
//修改档案库
function modifyKindNode(obj){
    let url = ApiConfig.modifyKindNode;
    return HttpRequest.requestJsonPost(url,obj)
}
//进行案卷库的迁移
function migrateKindNode(obj){
    let url = ApiConfig.migrateKindNode;
    return HttpRequest.requestJsonPost(url,obj)
}
//案卷库的重命名
function rename(obj){
    let url = ApiConfig.rename;
    return HttpRequest.requestJsonPost(url,obj)
}
//分类号
function getCategoryNumbers(param){
    let url = ApiConfig.getCategoryNumbers;
    return HttpRequest.requestJsonPost(url,param)
}
// 全宗联想
const getKeyName = option => {
    let url = ApiConfig.searchLogonUserRelatedFonds;
    return HttpRequest.requestJsonPost(url,option)
};
//获取全总公司
function getLogonUserRelatedFondsTree(data) {
    let url = ApiConfig.getLogonUserRelatedFondsTree;
    return HttpRequest.requestJsonPost(url,data)
}
let Service = {
    getSonUrl,
    getFondChild,
    archiveNowFile,
    listWithoutLib,
    getOaTreeChildUrl,
    createFolderNode,
    createKindNode,
    checkBeforeMigrateKindNode,
    removeNode,
    modifyFolderNode,
    modifyKindNode,
    migrateKindNode,
    rename,
    getCategoryNumbers,
    getKeyName,
    getLogonUserRelatedFondsTree
};
 export default Service;