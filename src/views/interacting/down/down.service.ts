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

let Service = {
    getDownloadInfoList,
    dicgetDictListByDictId,
};

export default Service;