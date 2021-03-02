import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//取当前用户全宗
function getFondSearch(data) {
    let url = ApiConfig.getFondUrl;
    return HttpRequest.requestJsonPost(url,data)
}
//取当前全宗下的公司
function getSonUrl(data){
    let url = ApiConfig.getSonUrl;
    return HttpRequest.requestJsonPost(url,data)
}
//取下级全宗
function getFondChild(data){
    let url=ApiConfig.getFondChildrenUrl;
    return HttpRequefileUpStartst.requestJsonPost(url,data)
}
//当前全宗的档案分类结构
function archiveNowFile(data){
    let url = ApiConfig.archiveTreeUrl;
    return HttpRequest.requestJsonPost(url,data)
}
//获取全总公司
function getLogonUserRelatedFondsTree(data) {
    let url = ApiConfig.getLogonUserRelatedFondsTree;
    return HttpRequest.requestJsonPost(url,data)
}
//取当前全宗的代管全宗
function GetEscrow(id){
    let url = ApiConfig.GetEscrow;
    return HttpRequest.requestJsonPost(url,id)
};
//根据档案分类取档案库
function getByKindId(data){
    let url=ApiConfig.getByKindId
    return HttpRequest.requestJsonPost(url,data)
}
//取画面表格的列配置
function getDispField(data){
    let url=ApiConfig.getDispField4;
    return HttpRequest.requestJsonPost(url,data)
}
//取当前案卷列表
function FileSearch(params){
    let url=ApiConfig.FileSearch4;
    return HttpRequest.requestJsonPost(url,params)
}

//取卷内文件
function searchJuanNei(params){
    let url = ApiConfig.searchJuanNei4;
    return HttpRequest.requestJsonPost(url,params)
}
//取得新增、编辑案卷页面的输入项配置
function getEditField(data){
    let url=ApiConfig.getEditField4;
    return HttpRequest.requestJsonPost(url,data)
}
//取得编辑案卷页面的案卷数据
function getNumber(params){
    let url=ApiConfig.getNumber;
    return HttpRequest.requestJsonPost(url,params)
}
//保存案卷（新建，修改，删除）
function SaveFile(params){
    let url = ApiConfig.SaveFile4;
    return HttpRequest.requestJsonPost(url,params)
}
//取得可批量修改的字段
function getBatchModifiableFields(params){
    let url = ApiConfig.getBatchModifiableFields;
    return HttpRequest.requestJsonPost(url,params)
}
//批量修改——按内容
function BatchModify(params){
    let url = ApiConfig.BatchModify;
    return HttpRequest.requestJsonPost(url,params)
}

//删除
function BatchDelete(params){
    let url = ApiConfig.BatchDelete;
    return HttpRequest.requestJsonPost(url,params)
};

//检索项配置
function Getquerycondition(params){
    let url = ApiConfig.Getquerycondition;
    return HttpRequest.requestJsonPost(url,params)
};

//数据导入
function DataImport(params){
    let url = ApiConfig.dataImport;
    return HttpRequest.requestFormPost1(url,params)
}

//取消案卷归档
function DeleteEnter(parmas){
    let url =ApiConfig.DeleteEnter;
    return HttpRequest.requestJsonPost(url,parmas)
}

//文件级档案取消案卷归档
function DeleteEnterW(parmas){
    let url =ApiConfig.DeleteEnterW;
    return HttpRequest.requestJsonPost(url,parmas)
}

////取文件级档案
function WenjianSearch(params){
    let url = ApiConfig.WenjianSearch4;
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
//获取 云盘目录
function GetMatchRules(libId){
    let url = ApiConfig.GetMatchRules;
    return HttpRequest.requestJsonPost(url,libId)
}

function getUserUrl(params){
    let url = ApiConfig.getUserUrl;
    return HttpRequest.requestJsonPost(url,params)
}

function getLounTile(params){
    let url = ApiConfig.gettersitle;
    return HttpRequest.requestJsonPost(url,params)
}
function gettersitle(params){
    let url = ApiConfig.gettersitle;
    return HttpRequest.requestJsonPost(url,params)
}
function getFileCount(params){
    let url = ApiConfig.getFileCount;
    return HttpRequest.requestJsonPost(url,params)
}

//检测是否可以匹配
function checkIsFinished(params){
    let url = ApiConfig.checkIsFinished2;
    return HttpRequest.requestJsonPost(url,params)
}

//匹配任务
function autoFileUp(params){
    let url = ApiConfig.autoFileUp;
    return HttpRequest.requestJsonPost(url,params)
}

//匹配完成开始批量挂接
function fileUpStart(params){
    let url = ApiConfig.fileUpStart;
    return HttpRequest.requestJsonPost(url,params)
}
//数据导出
function DataImporterExport(params){
    let url = ApiConfig.DataImporterExport;
    return HttpRequest.requestBlobGet(url,params)
}
//全宗号
function  searchFondsForInput(name){
    let url = ApiConfig.searchFondsForInput;
    return HttpRequest.requestJsonPost(url,name)
}
//是否为项目公司
function isTopCompany(ID){
    let url = ApiConfig.isTopCompany;
    return HttpRequest.requestJsonPost(url,ID)
}
//查可以分组查看的著录项接口
function getSupportGroupByFields(ID){
    let url = ApiConfig.getSupportGroupByFields;
    return HttpRequest.requestJsonPost(url,ID)
}
//案卷级文件级取分组候选值的接口
function getGroupByCandidatesValue4(params){
    let url = ApiConfig.getGroupByCandidatesValue4;
    return HttpRequest.requestJsonPost(url,params)
}
//未整理取分组候选值的接口
function getJuanWaiGroupByCandidatesValue4(params){
    let url = ApiConfig.getJuanWaiGroupByCandidatesValue4;
    return HttpRequest.requestJsonPost(url,params)
}
//卷内文件取分组候选值的接口
function getJuanNeiGroupByCandidatesValue4(params){
    let url = ApiConfig.getJuanNeiGroupByCandidatesValue4;
    return HttpRequest.requestJsonPost(url,params)
}
//是否可以上下移动
function exchangeSeqs(params){
    let url = ApiConfig.exchangeSeq;
    return HttpRequest.requestJsonPost(url,params)
}
// 在库信息
const getHomeDetail = option => {
    let url = ApiConfig.getHomeDetailUrl;
    return HttpRequest.requestJsonPost(url,option)
};
//获取所有数据
function getSolrDataByFondsAndLibId(params){
    let url = ApiConfig.getSolrDataByFondsAndLibId;
    return HttpRequest.requestJsonPost(url,params)
}
// 全宗联想
const getKeyName = option => {
    let url = ApiConfig.searchLogonUserRelatedFonds;
    return HttpRequest.requestJsonPost(url,option)
};
//数据导出目录及原文
function DataImporterExportYW(params){
    let url = ApiConfig.DataImporterExportYW;
    return HttpRequest.requestJsonPost(url,params)
}
//导出后台操作
function ExporttaskStart(id){
    let url = ApiConfig.ExporttaskStart;
    return HttpRequest.requestJsonPost(url,id)
}
let Service = {
    GetMatchRules,
    autoFileUp,
    fileUpStart,
    getFileCount,
    checkIsFinished,
    getFondSearch,
    getSonUrl,
    getUserUrl,
    getLounTile,
    gettersitle,
    getFondChild,
    archiveNowFile,
    getByKindId,
    getDispField,
    FileSearch,
    searchJuanNei,
    getEditField,
    getNumber,
    SaveFile,
    getBatchModifiableFields,
    BatchModify,
    BatchDelete,
    Getquerycondition,
    GetEscrow,
    DataImport,
    DeleteEnter,
    WenjianSearch,
    DeleteEnterW,
    findByFond,
    getCategoryNumbers,
    DataImporterExport,
    isTopCompany,
    searchFondsForInput,
    getSupportGroupByFields,
    getGroupByCandidatesValue4,
    getJuanWaiGroupByCandidatesValue4,
    getJuanNeiGroupByCandidatesValue4,
    exchangeSeqs,
    getHomeDetail,
    getSolrDataByFondsAndLibId,
    getKeyName,
    getLogonUserRelatedFondsTree,
    DataImporterExportYW,
    ExporttaskStart
};

export default Service;