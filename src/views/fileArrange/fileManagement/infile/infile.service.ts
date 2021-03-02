import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//取画面表格的列配置
function getDispField(data){
    let url=ApiConfig.getDispField;
    return HttpRequest.requestJsonPost(url,data)
}
// function getFondInSearchUrl(data){
//     let url = ApiConfig.getFondInSearchUrl;
//     return HttpRequest.requestJsonPost(url,data)
// }
//检索项配置
function Getquerycondition(params){
    let url = ApiConfig.Getquerycondition;
    return HttpRequest.requestJsonPost(url,params)
};
//获取卷内文件数据
function searchJuanNei(params){
    let url = ApiConfig.searchJuanNei;
    return HttpRequest.requestJsonPost(url,params)
};

//删除
function BatchDelete(params){
    let url = ApiConfig.BatchDelete;
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

//页码转页次
function PageTranslate(params){
    let url = ApiConfig.PageTranslate;
    return HttpRequest.requestJsonPost(url,params)
};
//页次转页数
function NumTranslate(params){
    let url = ApiConfig.NumTranslate;
    return HttpRequest.requestJsonPost(url,params)
};
//移出
function moveOutWenJian(params){
    let url =ApiConfig.moveOutWenJian;
    return HttpRequest.requestJsonPost(url,params)
};
//数据导入
function DataImport(data){
    let url = ApiConfig.dataImport;
    return HttpRequest.requestFormPost1(url,data)
}

//获取 云盘目录
function GetMatchRules(libId){
    let url = ApiConfig.GetMatchRules;
    return HttpRequest.requestJsonPost(url,libId)
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
//获取项目编号
function findByFond(ID){
    let url = ApiConfig.findByFond;
    return HttpRequest.requestJsonPost(url,ID)
}
function getFileCount(params){
    let url = ApiConfig.getFileCount;
    return HttpRequest.requestJsonPost(url,params)
}
function getLounTile(params){
    let url = ApiConfig.gettersitle;
    return HttpRequest.requestJsonPost(url,params)
}

function getUserUrl(params){
    let url = ApiConfig.getUserUrl;
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
//生成顺序号
function generateDHs(params){
    let url = ApiConfig.generateDHs;
    return HttpRequest.requestJsonPost(url,params)
}
//组卷前，检查不同文件的档号著录项值是否一致
function checkBeforeMergeWenJians(params){
    let url = ApiConfig.checkBeforeMergeWenJians;
    return HttpRequest.requestJsonPost(url,params)
}
//是否可以上下移动
function exchangeSeqs(params){
    let url = ApiConfig.exchangeSeq;
    return HttpRequest.requestJsonPost(url,params)
}
//获取所有数据
function getSolrDataByFondsAndLibId(params){
    let url = ApiConfig.getSolrDataByFondsAndLibId;
    return HttpRequest.requestJsonPost(url,params)
}
//数据导入下拉
function DataImportXL(data){
    let url = ApiConfig.dataImportX;
    return HttpRequest.requestJsonPost(url,data)
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
    getDispField,
    searchJuanNei,
    Getquerycondition,
    BatchDelete,
    getBatchModifiableFields,
    BatchModify,
    PageTranslate,
    moveOutWenJian,
    DataImport,
    GetMatchRules,
    checkIsFinished,
    autoFileUp,
    fileUpStart,
    findByFond,
    getFileCount,
    getLounTile,
    getUserUrl,
    DownLoadTemps,
    DataImporterExport,
    generateDHs,
    checkBeforeMergeWenJians,
    exchangeSeqs,
    getSolrDataByFondsAndLibId,
    DataImportXL,
    NumTranslate,
    DataImporterExportYW,
    ExporttaskStart
};
export default Service