import HttpRequest from '../../../api/request';
import ApiConfig from '../../../api-config';
//取得新增、编辑案卷页面的输入项配置
function getEditField(data){
    let url=ApiConfig.getEditField;
    return HttpRequest.requestJsonPost(url,data)
}
function getEditDeploy(data) {
    let url=ApiConfig.getEditDeploy;
    return HttpRequest.requestJsonPost(url,data)
}
function getEditFields(data){
    let url=ApiConfig.getEditField4;
    return HttpRequest.requestJsonPost(url,data)
}
//取得编辑案卷页面的案卷数据
function getNumber(params){
    let url=ApiConfig.getNumber;
    return HttpRequest.requestJsonPost(url,params)
}
//获取移交数据列表头部配置
function getColumns(params) {
    let url = ApiConfig.getColumns;
    return HttpRequest.requestJsonPost(url,params)
}
//获取文件的libId
function genWenJianLibId(params){
    let url = ApiConfig.genWenJianLibId;
    return HttpRequest.requestJsonPost(url,params)
}
//获取卷内文件数据
function searchJuanNei(params){
    let url = ApiConfig.searchJuanNei;
    return HttpRequest.requestJsonPost(url,params)
};
//获取卷内文件数据
function searchJuanNei4(params){
    let url = ApiConfig.searchJuanNei4;
    return HttpRequest.requestJsonPost(url,params)
};
function Insidecoil(params){
    let url = ApiConfig.Insidecoil;
    return HttpRequest.requestJsonPost(url,params)
};
let Service={
    getEditField,
    getNumber,
    getColumns,
    genWenJianLibId,
    searchJuanNei,
    getEditFields,
    searchJuanNei4,
    getEditDeploy,
    Insidecoil
};
export default Service