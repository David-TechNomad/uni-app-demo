import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 左侧列表
const queryWkDocClassNos = option => {
    let url = ApiConfig.queryWkDocClassNos;
    return HttpRequest.requestJsonPost(url,option)
};

// 获取列头
const queryWkDocGridColumns = option => {
    let url = ApiConfig.queryWkDocGridColumns;
    return HttpRequest.requestJsonPost(url,option)
};

// 获取列表数据
const queryWkDocGridDatas = option => {
    let url = ApiConfig.queryWkDocGridDatas;
    return HttpRequest.requestJsonPost(url,option)
};

// 获取列表数据
const queryWkDocEditorControls = option => {
    let url = ApiConfig.queryWkDocEditorControls;
    return HttpRequest.requestJsonPost(url,option)
};

// 获取字典下拉选
const getDictListByDictId = option => {
    let url = ApiConfig.dicgetDictListByDictId;
    return HttpRequest.requestJsonPost(url,option)
};

// 获取内容明细
const queryWkDocGridData = option => {
    let url = ApiConfig.queryWkDocGridData;
    return HttpRequest.requestJsonPost(url,option)
};

// 工作文档著录
const wordAdd = option => {
    let url = ApiConfig.wordAdd;
    return HttpRequest.requestJsonPost(url,option)
};

// 工作文档修改
const wordUpdate = option => {
    let url = ApiConfig.wordUpdate;
    return HttpRequest.requestJsonPost(url,option)
};

// 工作文档删除
const wordDelete = option => {
    let url = ApiConfig.wordDelete;
    return HttpRequest.requestJsonPost(url,option)
};

// 获取原文列表
const wordAttachedList = option => {
    let url = ApiConfig.wordAttachedList;
    return HttpRequest.requestJsonPost(url,option)
};

// 上传原文
const uploadAttach = option => {
    let url = ApiConfig.uploadAttach;
    return HttpRequest.requestJsonPost(url,option)
};

// 获取原文信息
const downWorkDocFile = option => {
    let url = ApiConfig.downWorkDocFile;
    return HttpRequest.requestBlobGet(url,option)
};

// 删除原文
const deleteWorkAttached = option => {
    let url = ApiConfig.deleteWorkAttached;
    return HttpRequest.requestJsonPost(url,option)
};

// 打印
const workPrint = option => {
    let url = ApiConfig.workPrint;
    return HttpRequest.requestBlobPost(url,option)
};

// 支持上传的文件类型
const allSupportedTypes = option => {
    let url = ApiConfig.allSupportedTypes;
    return HttpRequest.requestJsonPost(url,option)
};

let Service = {
    queryWkDocClassNos,
    queryWkDocGridColumns,
    queryWkDocGridDatas,
    queryWkDocEditorControls,
    getDictListByDictId,
    queryWkDocGridData,
    wordAdd,
    wordUpdate,
    wordDelete,
    wordAttachedList,
    uploadAttach,
    downWorkDocFile,
    deleteWorkAttached,
    workPrint,
    allSupportedTypes
};

export default Service;