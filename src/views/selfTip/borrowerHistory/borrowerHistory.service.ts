import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//按照借阅单查询  借阅 和归还的列表数据
function getBorrowReturnListByUtilizeNo(option) {
    let url = ApiConfig.getBorrowReturnListByUtilizeNo;
    return HttpRequest.requestJsonPost(url,option)
}
//按照档案列表查询  借阅和归还的列表数据
function getBorrowReturnListByArchiveCode(option) {
    let url = ApiConfig.getBorrowReturnListByArchiveCode;//.getBorrowReturnListByUtilizeNo;
    return HttpRequest.requestJsonPost(url,option)
}
//查找档案借阅历史数量列表
function getBorrowHistoryDataList(option){
    let url = ApiConfig.getBorrowHistoryDataList;
    return HttpRequest.requestJsonPost(url,option);
}

let Service = {
    getBorrowReturnListByUtilizeNo,
    getBorrowReturnListByArchiveCode,
    getBorrowHistoryDataList
};

export default Service;