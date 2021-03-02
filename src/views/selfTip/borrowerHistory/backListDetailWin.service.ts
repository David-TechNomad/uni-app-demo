import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function saveBackDatas(option){
    let url = ApiConfig.saveBackDatas;
    return HttpRequest.requestJsonPost(url,option)
}
function getToBackFilesList(option){//获得待借阅列表数据
    let url = ApiConfig.getToBorrowDataList;
    return HttpRequest.requestJsonPost(url,option)
}

function getToBackFilesListByArchivesMsg(option){//按照档号排列列表，选择多条档案信息，借出操作
    let url = ApiConfig.getToBackFilesListByArchivesMsg;
    return HttpRequest.requestJsonPost(url,option)
}

const borrowFileTable = option => {
    let url = ApiConfig.borrowBackArcList;
    return HttpRequest.requestJsonPost(url,option)
};
let Service = {
    saveBackDatas,
    getToBackFilesList,
    getToBackFilesListByArchivesMsg,
    borrowFileTable
    // cancelOriFileOfToBorrow
};

export default Service;