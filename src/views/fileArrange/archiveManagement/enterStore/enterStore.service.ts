import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//取画面表格的列配置
function getDispField(data){
    let url=ApiConfig.getDispField4;
    return HttpRequest.requestJsonPost(url,data)
}
//书的第一级
function getHouseTree(params){
    let url=ApiConfig.HouseTreeList;
    return HttpRequest.requestJsonPost(url,params)
}
function getHouseTreeson(params){
    let url=ApiConfig.HouseTreeListson;
    return HttpRequest.requestJsonPost(url,params)
}
//归入库位
function saveWareArchive(params){
    let url = ApiConfig.saveWareArchive;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getDispField,
    getHouseTree,
    getHouseTreeson,
    saveWareArchive
}
export default Service