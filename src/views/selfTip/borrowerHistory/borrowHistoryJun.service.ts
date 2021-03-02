import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getBorrowerApplySearch(option) {
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function getOriFilesByArchiveIds(option){
    let url = ApiConfig.getFondChildrenUrl;
    return HttpRequest.requestJsonPost(url,option)
}

function getToBorrowFilesList(option){//获得待借阅列表数据
    let url = ApiConfig.getToBorrowDataList;
    return HttpRequest.requestJsonPost(url,option)
}

function getToBorrowFilesListByArchivesMsg(option){//按照档号排列列表，选择多条档案信息，借出操作
    let url = ApiConfig.getToBorrowFilesListByArchivesMsg;
    return HttpRequest.requestJsonPost(url,option)
}

function saveBorrowDatas(option){//按照档号排列列表，选择多条档案信息，借出操作
    let url = ApiConfig.saveBorrowDatas;
    return HttpRequest.requestJsonPost(url,option)
}

function cancelOriFileOfToBorrow(option){
    let url = ApiConfig.cancelOriFileOfToBorrow;
    return HttpRequest.requestJsonPost(url,option)
}

const borrowFileHead = option => {
    let url = ApiConfig.getSuperSearchHead;
    return HttpRequest.requestJsonPost(url,option)
};

const borrowFileTable = option => {
    let url = ApiConfig.borrowBackArcList;
    return HttpRequest.requestJsonPost(url,option)
};

let Service = {
    getBorrowerApplySearch,
    getOriFilesByArchiveIds,
    getToBorrowFilesList,
    getToBorrowFilesListByArchivesMsg,
    saveBorrowDatas,
    cancelOriFileOfToBorrow,
    borrowFileTable,
    borrowFileHead
};

export default Service;