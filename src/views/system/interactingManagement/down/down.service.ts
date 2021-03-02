import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 获取下载中心列表
const getDownloadInfoList = option => {
    let url = ApiConfig.getDownloadInfoList;
    return HttpRequest.requestJsonPost(url,option)
};
// 数据字典接口
const dicgetDictListByDictId = option => {
    let url = ApiConfig.dicgetDictListByDictId;
    return HttpRequest.requestJsonPost(url,option)
};

// 新增
const saveDownload = option => {
    let url = ApiConfig.saveDownload;
    return HttpRequest.requestJsonPost(url,option)
};

// 编辑
const updateDownload = option => {
    let url = ApiConfig.updateDownload;
    return HttpRequest.requestJsonPost(url,option)
};

// 删除
const deleteDownload = option => {
    let url = ApiConfig.deleteDownload;
    return HttpRequest.requestJsonPost(url,option)
};

// 发布/取消发布
const downloadInfoPublish = option => {
    let url = ApiConfig.downloadInfoPublish;
    return HttpRequest.requestJsonPost(url,option)
};

let Service = {
    getDownloadInfoList,
    dicgetDictListByDictId,
    saveDownload,
    updateDownload,
    deleteDownload,
    downloadInfoPublish
};

export default Service;