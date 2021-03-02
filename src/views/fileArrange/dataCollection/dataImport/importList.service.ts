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
//判断是案卷还是文件
function containsAnJuan(data){
    let url = ApiConfig.containsAnJuan;
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
//获取tree
function getTree(data) {
    let url = ApiConfig.getAllByArchiveAgentCode;
    return HttpRequest.requestJsonPost(url,data)
}
//获取tree数量
function getTreeNum(data) {
    let url = ApiConfig.getTreeNum;
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
function getDispList(data){
    let url=ApiConfig.getDispList;
    return HttpRequest.requestJsonPost(url,data)
}
//取当前案卷列表
function FileDossier(params){
    let url=ApiConfig.FileDossier;
    return HttpRequest.requestJsonPost(url,params)
}
//取未整理文件
function searchUnfinished(params){
    let url=ApiConfig.searchUnfinished;
    return HttpRequest.requestJsonPost(url,params)
}
//取卷内文件
function Insidecoil(params){
    let url = ApiConfig.Insidecoil;
    return HttpRequest.requestJsonPost(url,params)
}
//取得新增、编辑案卷页面的输入项配置
function getEditDeploy(data){
    let url=ApiConfig.getEditDeploy;
    return HttpRequest.requestJsonPost(url,data)
}
//取得编辑案卷页面的案卷数据
function getNumber(params){
    let url=ApiConfig.getNumber;
    return HttpRequest.requestJsonPost(url,params)
}
// 取得导入相关的档案数据
function getImportedData(params){
    let url=ApiConfig.getImportedData;
    return HttpRequest.requestJsonPost(url,params)
}
//保存案卷（新建，修改，删除）
function SaveDossier(params){
    let url = ApiConfig.SaveDossier;
    return HttpRequest.requestJsonPost(url,params)
}
//获取表头
function getDispField(data) {
    let url = ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,data)
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
//取消移交
function cancelFileTransfer(params){
    let url = ApiConfig.cancelFileTransfer;
    return HttpRequest.requestJsonPost(url,params)
}


//数据导入
function DataImport(params){
    let url = ApiConfig.dataImport;
    return HttpRequest.requestFormPost1(url,params)
}
//取文件级档案
function Searchwenjian(params){
    let url = ApiConfig.Searchwenjian;
    return HttpRequest.requestJsonPost(url,params)
}
//保存到其他档案库 案卷 树
function archivesTree(params){
    let url = ApiConfig.archivesTree;
    return HttpRequest.requestJsonPost(url,params)
}
//保存到其他档案库 文件 树
function matterTree(params){
    let url = ApiConfig.matterTree;
    return HttpRequest.requestJsonPost(url,params)
}

//案卷归档
function pigeonanjuan(params){
    let url = ApiConfig.pigeonanjuan;
    return HttpRequest.requestJsonPost(url,params)
}
//文件归档
function pigeonwenjian(params){
    let url = ApiConfig.pigeonwenjian;
    return HttpRequest.requestJsonPost(url,params)
}
//保存到其他档案库 确定 是
function conserverest(params){
    let url = ApiConfig.conserverest;
    return HttpRequest.requestJsonPost(url,params)
}
//获取项目编号
function findByFond(ID){
    let url = ApiConfig.findByFond;
    return HttpRequest.requestJsonPost(url,ID)
}
//自动组卷
function AutoGroupjuan(ID){
    let url = ApiConfig.AutoGroupjuan;
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
    let url = ApiConfig.checkIsFinished1;
    return HttpRequest.requestJsonPost(url,params)
}

//匹配任务
function autoFileUp(params){
    let url = ApiConfig.autoFileUp1;
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
//取分组候选值的接口
function getGroupByCandidatesValue2(params){
    let url = ApiConfig.getGroupByCandidatesValue2;
    return HttpRequest.requestJsonPost(url,params)
}
//未整理取分组候选值的接口
function getJuanWaiGroupByCandidatesValue2(params){
    let url = ApiConfig.getJuanWaiGroupByCandidatesValue2;
    return HttpRequest.requestJsonPost(url,params)
}
//卷内文件取分组候选值的接口
function getJuanNeiGroupByCandidatesValue2(params){
    let url = ApiConfig.getJuanNeiGroupByCandidatesValue2;
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
function conserverestWen(params){
    let url = ApiConfig.conserverestWen;
    return HttpRequest.requestJsonPost(url,params)
}
// 全宗联想
const getKeyName = option => {
    let url = ApiConfig.searchLogonUserRelatedFonds;
    return HttpRequest.requestJsonPost(url,option)
};
//数据导入下拉
function DataImportXL(data){
    let url = ApiConfig.dataImportX;
    return HttpRequest.requestJsonPost(url,data)
}
//页数转页次
function pageTranslateByAnJuans(params){
    let url = ApiConfig.pageTranslateByAnJuans;
    return HttpRequest.requestJsonPost(url,params)
}
//页次转页数
const pageRangeTranslateByAnJuans=obj=>{
    let url = ApiConfig.pageRangeTranslateByAnJuans;
    return HttpRequest.requestJsonPost(url,obj)
};
//数据导出目录及原文
function DataImporterExportYW(params){
    let url = ApiConfig.DataImporterExportYW;
    return HttpRequest.requestJsonPost(url,params)
}
//数据采集 任务列表
function importTaskList(params){
    let url = ApiConfig.importTaskList;
    return HttpRequest.requestJsonPost(url,params)
}
//数据采集 任务列表检索下拉选项
function importTaskStatusCandidates(params){
    let url = ApiConfig.importTaskStatusCandidates;
    return HttpRequest.requestJsonPost(url,params)
}
//数据采集 撤销任务
function withdrawTask(params){
    let url = ApiConfig.withdrawTask;
    return HttpRequest.requestJsonPost(url,params)
}
//数据采集 删除任务
function deleteTask(params){
    let url = ApiConfig.deleteTask;
    return HttpRequest.requestJsonPost(url,params)
}
//数据采集 入库
function enterStorage(params){
    let url = ApiConfig.enterStorage;
    return HttpRequest.requestJsonPost(url,params)
}
//数据采集 下载错误数据
function downloadErrorFile(params){
    let url = ApiConfig.downloadErrorFile;
    return HttpRequest.requestJsonPost(url,params)
}
//数据采集 准备采集任务的批量挂接
function prepareBatchAttach(params){
    let url = ApiConfig.prepareBatchAttach;
    return HttpRequest.requestJsonPost(url,params)
}
//数据采集 取得采集任务状态
function getTaskStatus(params){
    let url = ApiConfig.getTaskStatus;
    return HttpRequest.requestJsonPost(url,params)
}
//数据采集 继续导入
function appendImport(params){
    let url = ApiConfig.appendImport;
    return HttpRequest.requestJsonPost(url,params)
}
//数据采集 导入数据
function importArchive(params){
    let url = ApiConfig.importArchive;
    return HttpRequest.requestJsonPost(url,params)
}
//取得数据采集的目标字段列表
function archiveFields(params){
    let url = ApiConfig.archiveFields;
    return HttpRequest.requestJsonPost(url,params)
}
//导出后台操作
function ExporttaskStart(id){
    let url = ApiConfig.ExporttaskStart;
    return HttpRequest.requestJsonPost(url,id)
}
let Service = {
    getFondSearch,
    getTree,
    getTreeNum,
    archiveFields,
    importTaskStatusCandidates,
    importTaskList,
    getTaskStatus,
    withdrawTask,
    prepareBatchAttach,
    downloadErrorFile,
    deleteTask,
    appendImport,
    enterStorage,
    importArchive,
    getSonUrl,
    getFondChild,
    archiveNowFile,
    getByKindId,
    getDispList,
    FileDossier,
    searchUnfinished,
    Insidecoil,
    getEditDeploy,
    getNumber,
    SaveDossier,
    UnmergeUrl,
    getBatchModifiableFields,
    BatchModify,
    BatchDelete,
    Getquerycondition,
    GetEscrow,
    DataImport,
    Searchwenjian,
    archivesTree,
    pigeonanjuan,
    pigeonwenjian,
    conserverest,
    cancelFileTransfer,
    matterTree,
    findByFond,
    AutoGroupjuan,
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
    searchFondsForInput,
    isTopCompany,
    getSupportGroupByFields,
    getGroupByCandidatesValue2,
    getJuanWaiGroupByCandidatesValue2,
    getJuanNeiGroupByCandidatesValue2,
    exchangeSeqs,
    getHomeDetail,
    getSolrDataByFondsAndLibId,
    conserverestWen,
    getKeyName,
    getLogonUserRelatedFondsTree,
    DataImportXL,
    pageRangeTranslateByAnJuans,
    pageTranslateByAnJuans,
    DataImporterExportYW,
    getImportedData,
    getDispField,
    ExporttaskStart,
    containsAnJuan,//判断是案卷还是文件
};

export default Service;