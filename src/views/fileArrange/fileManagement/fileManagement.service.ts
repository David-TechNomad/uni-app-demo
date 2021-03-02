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
    return HttpRequest.requestJsonPost(url,data)
}
//获取全总公司
function getLogonUserRelatedFondsTree(data) {
    let url = ApiConfig.getLogonUserRelatedFondsTree;
    return HttpRequest.requestJsonPost(url,data)
}
//当前全宗的档案分类结构
function archiveNowFile(data){
    let url = ApiConfig.archiveTreeUrl;
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
    let url=ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,data)
}
//取当前案卷列表
function FileSearch(params){
    let url=ApiConfig.FileSearch;
    return HttpRequest.requestJsonPost(url,params)
}
//取未整理文件
function searchJuanWai(params){
    let url=ApiConfig.searchJuanWai;
    return HttpRequest.requestJsonPost(url,params)
}
//取卷内文件
function searchJuanNei(params){
    let url = ApiConfig.searchJuanNei;
    return HttpRequest.requestJsonPost(url,params)
}
//取得新增、编辑案卷页面的输入项配置
function getEditField(data){
    let url=ApiConfig.getEditField;
    return HttpRequest.requestJsonPost(url,data)
}
//取得编辑案卷页面的案卷数据
function getNumber(params){
    let url=ApiConfig.getNumber;
    return HttpRequest.requestJsonPost(url,params)
}
//保存案卷（新建，修改，删除）
function SaveFile(params){
    let url = ApiConfig.SaveFile;
    return HttpRequest.requestJsonPost(url,params)
}
//拆卷
function UnmergeUrl(params){
    let url =ApiConfig.UnmergeUrl;
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
function DataImport(data){
    let url = ApiConfig.dataImport;
    return HttpRequest.requestFormPost1(url,data)
}
//数据导入下拉
function DataImportXL(data){
    let url = ApiConfig.dataImportX;
    return HttpRequest.requestJsonPost(url,data)
}
//取文件级档案
function WenjianSearch(params){
    let url = ApiConfig.WenjianSearch;
    return HttpRequest.requestJsonPost(url,params)
}

//自动组卷
function AutoAssemble(params){
    let url = ApiConfig.AutoAssemble;
    return HttpRequest.requestJsonPost(url,params)
}
//获取项目编号
function findByFond(ID){
    let url = ApiConfig.findByFond;
    return HttpRequest.requestJsonPost(url,ID)
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

function getFileCount(params){
	let url = ApiConfig.getFileCount;
    return HttpRequest.requestJsonPost(url,params)
}

//检测是否可以匹配
function checkIsFinished(params){
    let url = ApiConfig.checkIsFinished;
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
//分类号
function getCategoryNumbers(param){
    let url = ApiConfig.getCategoryNumbers;
    return HttpRequest.requestJsonPost(url,param)
}
//生成档号
function generateDHs(params){
    let url = ApiConfig.generateDHs;
    return HttpRequest.requestJsonPost(url,params)
}
//数据模板下载
function DownLoadTemps(parmas){
    let url = ApiConfig.DownLoadTemps;
    return HttpRequest.requestBlobGet(url,parmas)
}
//数据导出
function DataImporterExport(params){
    let url = ApiConfig.DataImporterExport;
    return HttpRequest.requestBlobGet(url,params)
}
//合卷前，检查不同案卷的卷内文件的档号著录项值是否一致
function checkBeforeMergeAnJuans(params){
    let url = ApiConfig.checkBeforeMergeAnJuans;
    return HttpRequest.requestJsonPost(url,params)
}
//组卷前，检查不同文件的档号著录项值是否一致
function checkBeforeMergeWenJians(params){
    let url = ApiConfig.checkBeforeMergeWenJians;
    return HttpRequest.requestJsonPost(url,params)
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
//案卷及文件取分组候选值的接口
function getGroupByCandidatesValue1(params){
    let url = ApiConfig.getGroupByCandidatesValue1;
    return HttpRequest.requestJsonPost(url,params)
}
//未整理取分组候选值的接口
function getJuanWaiGroupByCandidatesValue1(params){
    let url = ApiConfig.getJuanWaiGroupByCandidatesValue1;
    return HttpRequest.requestJsonPost(url,params)
}
//卷内文件取分组候选值的接口
function getJuanNeiGroupByCandidatesValue1(params){
    let url = ApiConfig.getJuanNeiGroupByCandidatesValue1;
    return HttpRequest.requestJsonPost(url,params)
}

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
//页次转页数
const pageRangeTranslateByAnJuans=obj=>{
    let url = ApiConfig.pageRangeTranslateByAnJuans;
    return HttpRequest.requestJsonPost(url,obj)
}
//页数转页次
const pageTranslateByAnJuans= params=>{
    let url = ApiConfig.pageTranslateByAnJuans;
    return HttpRequest.requestJsonPost(url,params)
}
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
    getFondSearch,
    getSonUrl,
    getFondChild,
    archiveNowFile,
    getByKindId,
    getDispField,
    FileSearch,
    searchJuanWai,
    searchJuanNei,
    getEditField,
    getNumber,
    SaveFile,
    UnmergeUrl,
    getBatchModifiableFields,
    BatchModify,
    BatchDelete,
    Getquerycondition,
    GetEscrow,
    DataImport,
    WenjianSearch,
    AutoAssemble,
    findByFond,
    GetMatchRules,
    getUserUrl,
    getLounTile,
    getFileCount,
    checkIsFinished,
    autoFileUp,
    fileUpStart,
    getCategoryNumbers,
    generateDHs,
    DownLoadTemps,
    DataImporterExport,
    checkBeforeMergeAnJuans,
    checkBeforeMergeWenJians,
    isTopCompany,
    searchFondsForInput,
    getSupportGroupByFields,
    getGroupByCandidatesValue1,
    getJuanWaiGroupByCandidatesValue1,
    exchangeSeqs,
    getJuanNeiGroupByCandidatesValue1,
    getHomeDetail,
    getSolrDataByFondsAndLibId,
    getKeyName,
    getLogonUserRelatedFondsTree,
    DataImportXL,
    pageRangeTranslateByAnJuans,
    pageTranslateByAnJuans,
    DataImporterExportYW,
    ExporttaskStart
};

export default Service;