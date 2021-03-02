import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';


//取画面表格的列配置
function getDispField(data){
    let url=ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,data)
}

//取得新增、编辑案卷页面的输入项配置
function getEditField(data){
    let url=ApiConfig.getEditField;
    return HttpRequest.requestJsonPost(url,data)
}

//组卷
function moveToExistingAnJuan(params){
    let url = ApiConfig.moveToExistingAnJuan;
    return HttpRequest.requestJsonPost(url,params)
}
//获取项目编号
function findByFond(ID){
    let url = ApiConfig.findByFond;
    return HttpRequest.requestJsonPost(url,ID)
}
//分类号
function getCategoryNumbers(param){
    let url = ApiConfig.getCategoryNumbers;
    return HttpRequest.requestJsonPost(url,param)
}
//全宗号
function  searchFondsForInput(name){
    let url = ApiConfig.searchFondsForInput;
    return HttpRequest.requestJsonPost(url,name)
}
//是否为集团公司
function isTopCompany(ID){
    let url = ApiConfig.isTopCompany;
    return HttpRequest.requestJsonPost(url,ID)
}
//取得指定案卷的卷内文件列表
function getFondInSearchUrl(params){
    let url=ApiConfig.getFondInSearchUrl;
    return HttpRequest.requestJsonPost(url,params)
}
let Service={
    getDispField,
    getEditField,
    moveToExistingAnJuan,
    findByFond,
    getCategoryNumbers,
    searchFondsForInput,
    isTopCompany,
    getFondInSearchUrl
}

export default Service