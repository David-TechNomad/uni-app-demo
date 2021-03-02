import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//取字典列表
function dicFindList(params){
    let url = ApiConfig.dicFindList;
    return HttpRequest.requestJsonPost(url,params)
}
//获取字典值
function dicgetDictListByDictId(params){
    let url = ApiConfig.dicgetDictListByDictId;
    return HttpRequest.requestJsonPost(url,params)
}
//保存数据字典值
function dicSave(params){
    let url = ApiConfig.dicSave;
    return HttpRequest.requestJsonPost(url,params)
}
//保存字典值
function dicDataSave(params){
    let url = ApiConfig.dicDataSave;
    return HttpRequest.requestJsonPost(url,params)
}
//新增保存字典值
function dicDataUpSave(params){
    let url = ApiConfig.dicDataUpSave;
    return HttpRequest.requestJsonPost(url,params)
}
//删除字典值
function dicDatadelete(params){
    let url = ApiConfig.dicDatadelete;
    return HttpRequest.requestJsonPost(url,params)
}
//删除数据字典
function dicDelete(params){
    let url = ApiConfig.dicDelete;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    dicFindList,
    dicgetDictListByDictId,
    dicSave,
    dicDataSave,
    dicDataUpSave,
    dicDatadelete,
    dicDelete
}
export default Service