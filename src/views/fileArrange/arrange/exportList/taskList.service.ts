import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

    //取消任务
    function arrExportcancel(data) {
        let url = ApiConfig.arrExportcancel;
        return HttpRequest.requestJsonPost(url, data)
    }   
    //下载
    function arrExportdownload(data) {
        //let url = ApiConfig.arrExportdownload;
        let url = ApiConfig.archiveExported;
        return HttpRequest.requestBlobGet2(url, data)
    }  
    //列表
    function arrExportlist(data) {
        let url = ApiConfig.arrExportlist;
        return HttpRequest.requestJsonPost(url, data)
    }
 
let Service = {
    arrExportcancel,
    arrExportdownload,
    arrExportlist
};

export default Service;