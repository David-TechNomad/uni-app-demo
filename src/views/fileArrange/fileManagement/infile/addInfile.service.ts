import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//取得新增列表配置项
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

//取当前案卷列表
function FileSearch(params){
    let url=ApiConfig.FileSearch;
    return HttpRequest.requestJsonPost(url,params)
}

//新增案卷列表
function inheritDataFromAnJuan(params){
    let url=ApiConfig.inheritDataFromAnJuan;
    return HttpRequest.requestJsonPost(url,params)
}
//获取项目编号
function findByFond(ID){
    let url = ApiConfig.findByFond;
    return HttpRequest.requestJsonPost(url,ID)
}

// 断点续传
// 预备上传
function prepareUpload(params){
    let url = ApiConfig.getLoaderServlet;
    return HttpRequest.upLoadPreGet(url,params)
}

// 上传主体
function doneUpload(data,a,b){
    let url = ApiConfig.getAsyncServlet+'?action=upload&fileId=' + a + '&crc=' + b
    return HttpRequest.upLoadFormPost(url,data)
}

// 上传表格
function searchUpload(params){
    let url = ApiConfig.getLoaderServlet;
    return HttpRequest.upLoadPreGet(url,params)
}

//获取电子原文列表
function getOriginals(params){
    let url=ApiConfig.getOriginals;
    return HttpRequest.requestJsonPost(url,params)
}

//下载缩略图
function downloadThumbnail(params){
    let url = ApiConfig.downloadThumbnail;
    return HttpRequest.requestGet(url,params)
};

// 双击浏览原生pdf
function displayPdf(params){
    let url = ApiConfig.displayPdfFile;
    return HttpRequest.requestBlobGet1(url,params)
};

// 双击浏览转化pdf
function displayToPdf(params){
    let url = ApiConfig.displayToPdfFile;
    return HttpRequest.requestBlobGet1(url,params)
};

// 双击浏览原生pdf
function displayPdfs(params){
    let url = ApiConfig.displayPdfFiles;
    return HttpRequest.requestBlobPost1(url,params)
};

// 双击浏览转化pdf
function displayToPdfs(params){
    let url = ApiConfig.displayToPdfFiles;
    return HttpRequest.requestBlobPost1(url,params)
};

// 删除挂接原文
function deletePdf(params){
    let url = ApiConfig.displayToPdfDelete;
    return HttpRequest.requestJsonPost(url,params)
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
//是否为项目公司
function isTopCompany(ID){
    let url = ApiConfig.isTopCompany;
    return HttpRequest.requestJsonPost(url,ID)
}
let Service = {
    getEditField,
    getNumber,
    SaveFile,
    FileSearch,
    inheritDataFromAnJuan,
    findByFond,
    prepareUpload,
    doneUpload,
    searchUpload,
    getOriginals,
    downloadThumbnail,
    displayPdf,
    displayPdfs,
    displayToPdf,
    displayToPdfs,
    deletePdf,
    getCategoryNumbers,
    searchFondsForInput,
    isTopCompany
}
export default Service