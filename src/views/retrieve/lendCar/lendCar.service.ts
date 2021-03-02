import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
import qs from 'qs';

// 借阅车表头
const getCarHead = option => {
    let url = ApiConfig.getSuperSearchHead;
    return HttpRequest.requestJsonPost(url,option)
};

// 借阅车列表
const getCarTable = option => {
    let url = ApiConfig.getCarSearchUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 删除购物车
const getSuperDelete = option => {
    let url = ApiConfig.getCarDeleteUrl;
    return HttpRequest.requestJsonPost(url,option)
};

const getCarCount = option => {
    let url = ApiConfig.getCarCountUrl;
    return HttpRequest.requestJsonPost(url,option)
};
// 点击表格检索档案存放地详情
const clickFilesDetail = option => {
    let url = ApiConfig.getFileDetail;
    return HttpRequest.requestJsonPost(url,option)
};

// 获取用户信息
const getUserInfor = option => {
    let url = ApiConfig.getUserById;
    return HttpRequest.requestJsonPost(url,option)
};

// 在库信息
const getHomeDetail = option => {
    let url = ApiConfig.getHomeDetailUrl;
    return HttpRequest.requestJsonPost(url,option)
};

let Service = {
    getCarHead,
    getCarTable,
    getSuperDelete,
    getCarCount,
    clickFilesDetail,
    getUserInfor,
    getHomeDetail
};

export default Service;