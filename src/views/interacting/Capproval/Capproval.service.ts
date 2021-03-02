import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 全宗联想
const getKeyName = option => {
    let url = ApiConfig.getKeyNameUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 全宗查询树
const getKeyTree = option => {
    let url = ApiConfig.getKeyTreeUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 查询所有部门案卷库列表
const getAllPortTable = option => {
    let url = ApiConfig.getAllPort;
    return HttpRequest.requestJsonFtp(url,option)
};

// 取得当前用户全宗信息
const getTree = option => {
    let url = ApiConfig.getFondUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 根据全宗Id取得子全宗
const getTreeChildren = option => {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 根据全宗Id取得档案分类树
// const getFondTree = option => {
//     let url = ApiConfig.archiveTreeUrl;
//     return HttpRequest.requestJsonPost(url,option)
// };

const getFondTree = option => {
    let url = ApiConfig.archiveTreeUrl1;
    return HttpRequest.requestJsonPost(url,option)
};

// 高级检索案卷库及文件列表表头
const getSuperHead = option => {
    let url = ApiConfig.getSuperSearchHead;
    return HttpRequest.requestJsonPost(url,option)
};

// 高级检索案卷库及文件列表
const getSuperTable = option => {
    let url = ApiConfig.getSuperSearchUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 展开次级列表
const getSuperTableChild = option => {
    let url = ApiConfig.getSuperChildUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 加入借阅车
const getFilesCar = option => {
    let url = ApiConfig.getFilesCarUrl;
    return HttpRequest.requestJsonPost(url,option)
};

// 加入借阅单拆单
const goLoanList = option => {
    let url = ApiConfig.getLoanList;
    return HttpRequest.requestJsonPost(url,option)
};

// 查询借阅车数量
const getCarCount = option => {
    let url = ApiConfig.getCarCountUrl;
    return HttpRequest.requestJsonPost(url,option)
}

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

// 详情
function getEditField(data){
    let url=ApiConfig.getEditField;
    return HttpRequest.requestJsonPost(url,data)
}

function getNumber(params){
    let url=ApiConfig.getNumber;
    return HttpRequest.requestJsonPost(url,params)
}

let Service = {
    getKeyName,
    getKeyTree,
    getTree,
    getTreeChildren,
    getFondTree,
    getSuperHead,
    getSuperTable,
    getFilesCar,
    getSuperTableChild,
    goLoanList,
    getCarCount,
    getAllPortTable,
    clickFilesDetail,
    getUserInfor,
    getHomeDetail,
    getEditField,
    getNumber
};

export default Service;