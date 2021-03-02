import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 左侧列表
const queryWkDocClassNos = option => {
    let url = ApiConfig.queryWkDocClassNos;
    return HttpRequest.requestJsonPost(url,option)
};
// 获取文档类别详情
const wordClassObject = option => {
    let url = ApiConfig.wordClassObject;
    return HttpRequest.requestJsonPost(url,option)
};
// 文档类别编辑
const wordClassUpdate = option => {
    let url = ApiConfig.wordClassUpdate;
    return HttpRequest.requestJsonPost(url,option)
};
// 文档字段列表
const wordFieldList = option => {
    let url = ApiConfig.wordFieldList;
    return HttpRequest.requestJsonPost(url,option)
};
// 文档字段修改
const wordFieldUpdate = option => {
    let url = ApiConfig.wordFieldUpdate;
    return HttpRequest.requestJsonPost(url,option)
};
// 文档字段删除
const wordFieldDelete = option => {
    let url = ApiConfig.wordFieldDelete;
    return HttpRequest.requestJsonPost(url,option)
};
// 文档字段保存
const wordFieldAdd = option => {
    let url = ApiConfig.wordFieldAdd;
    return HttpRequest.requestJsonPost(url,option)
};

// 数据字典
const getDictlistsurl = option => {
    let url = ApiConfig.getDictlistsurl;
    return HttpRequest.requestJsonPost(url,option)
};

// 数据字典
const dicFindList = option => {
    let url = ApiConfig.dicFindList;
    return HttpRequest.requestJsonPost(url,option)
};

// 上移下移
const wordFieldUpdateSort = option => {
    let url = ApiConfig.wordFieldUpdateSort;
    return HttpRequest.requestJsonPost(url,option)
};

// 文档号规则列表
const workNoSetingList = option => {
    let url = ApiConfig.workNoSetingList;
    return HttpRequest.requestJsonPost(url,option)
};

// 文档号规则 - 值下拉选
const workInfoFieldList = option => {
    let url = ApiConfig.workInfoFieldList;
    return HttpRequest.requestJsonPost(url,option)
};

// 文档号规则保存
const workNoSetingAdd = option => {
    let url = ApiConfig.workNoSetingAdd;
    return HttpRequest.requestJsonPost(url,option)
};

// 获取件号规则
const workAutoNoList = option => {
    let url = ApiConfig.workAutoNoList;
    return HttpRequest.requestJsonPost(url,option)
};

// 件号规则保存
const workAutoNoAdd = option => {
    let url = ApiConfig.workAutoNoAdd;
    return HttpRequest.requestJsonPost(url,option)
};

let Service = {
    queryWkDocClassNos,
    wordClassObject,
    wordClassUpdate,
    wordFieldList,
    wordFieldUpdate,
    wordFieldDelete,
    wordFieldAdd,
    getDictlistsurl,
    dicFindList,
    wordFieldUpdateSort,
    workNoSetingList,
    workInfoFieldList,
    workNoSetingAdd,
    workAutoNoList,
    workAutoNoAdd
}

export default Service;