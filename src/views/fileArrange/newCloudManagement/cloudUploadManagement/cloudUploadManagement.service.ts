import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//取得新增、编辑案卷页面的输入项配置
function getEditField(data){
    let url=ApiConfig.getEditDeploy;
    return HttpRequest.requestJsonPost(url,data)
}
//取得编辑案卷页面的案卷数据
function getNumber(params){
    let url=ApiConfig.getNumber;
    return HttpRequest.requestJsonPost(url,params)
}

//文件级编辑取得编辑案卷页面的案卷数据
function getEditFieldValue(params){
    let url=ApiConfig.getEditFieldValue;
    return HttpRequest.requestJsonPost(url,params)
}

//保存案卷（新建，修改，删除）
function SaveFile(params){
    let url = ApiConfig.SaveDossier;
    return HttpRequest.requestJsonPost(url,params)
}

//取当前案卷列表
function FileSearch(params){
    let url=ApiConfig.FileDossier;
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
function prepareUpload(data,a,b){
    let url = ApiConfig.getLoaderServlet+'?action=' + a + '&clientId=' + b;
    return HttpRequest.upLoadFormPost(url,data)
}

// 上传主体
function doneUpload(data,a,b,c){
    let url = ApiConfig.getAsyncServlet+'?action=upload&fileId=' + a + '&crc=' + b+ '&clientId=' + c
    return HttpRequest.upLoadFormPost(url,data)
}
// 取得指定云盘文件夹的上传任务列表
function getUploadFilesOfCloud(data,a,b){
    let url = ApiConfig.getLoaderServlet+'?action=getUploadFilesOfCloud&clientId=' + a + '&cloudDirId=' + b
    return HttpRequest.upLoadFormPost(url,data)
}

// 上传表格
function searchUpload(params, a,b){
    let url = ApiConfig.getLoaderServlet+'?action=' + b + '&clientId=' + a;
    return HttpRequest.upLoadFormPost(url,params)
}

//获取电子原文列表
function getOriginals(params){
    let url=ApiConfig.getOriginals;
    return HttpRequest.requestJsonPost(url,params)
}

//下载缩略图
function downloadThumbnail(params,a){
    let url = ApiConfig.downloadThumbnail+'?originalGuid=' + a;
    return HttpRequest.upLoadFormPost(url,params)
};

// 双击浏览原生pdf
function displayPdf(params,a,b){
    let url = ApiConfig.displayPdfFile+'?originalGuid=' + a + '&preview=' + b;
    return HttpRequest.requestBlobPost(url,params)
};

// 双击浏览转化pdf
function displayToPdf(params,a,b){
    let url = ApiConfig.displayToPdfFile+'?originalGuid=' + a + '&preview=' + b;;
    return HttpRequest.requestBlobPost(url,params)
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

let Service = {
    getEditField,
    getNumber,
    getUploadFilesOfCloud,
    getEditFieldValue,
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
    displayToPdf,
    deletePdf,
    getCategoryNumbers,
    searchFondsForInput,
    isTopCompany,
    displayPdfs,
    displayToPdfs
}
export default Service