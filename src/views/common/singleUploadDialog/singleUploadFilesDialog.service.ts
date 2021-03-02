import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';


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
// 支持上传的文件类型
function allSupportedTypes(params){
    let url = ApiConfig.allSupportedTypes;
    return HttpRequest.requestJsonPost(url,params)
}
// 上传表格
function searchUpload(params, a){
    let url = ApiConfig.getLoaderServlet+'?action=cancelFiles&clientId=' + a;
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
    return HttpRequest.fileDownBlobPost(url,params)
};

// 双击浏览原生pdf
function displayPdf(params,a,b){
    let url = ApiConfig.displayPdfFile+'?originalGuid=' + a + '&preview=' + b;
    return HttpRequest.fileDownBlobPost(url,params)
};

// 双击浏览转化pdf
function displayToPdf(params,a,b){
    let url = ApiConfig.displayToPdfFile+'?originalGuid=' + a + '&preview=' + b;;
    return HttpRequest.fileDownBlobPost(url,params)
};

// 删除挂接原文
function deletePdf(params){
    let url = ApiConfig.displayToPdfDelete;
    return HttpRequest.requestJsonPost(url,params)
}
// 双击浏览原生pdf
function displayPdfs(params){
    let url = ApiConfig.displayPdfFiles;
    return HttpRequest.fileDownBlobPost(url,params)
};

// 双击浏览转化pdf
function displayToPdfs(params){
    let url = ApiConfig.displayToPdfFiles;
    return HttpRequest.fileDownBlobPost(url,params)
};

let Service = {
    prepareUpload,
    doneUpload,
    searchUpload,
    getOriginals,
    downloadThumbnail,
    displayPdf,
    displayToPdf,
    deletePdf,
    displayPdfs,
    displayToPdfs,
    allSupportedTypes
}
export default Service