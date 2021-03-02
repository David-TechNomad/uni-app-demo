import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// function getBorrowerApplySearch(option) {
//     let url = ApiConfig.getFondChildrenUrl;
//     return HttpRequest.requestJsonPost(url,option)
// }
// const borrowFileHead = option => {
//     let url = ApiConfig.getSuperSearchHead;
//     return HttpRequest.requestJsonPost(url,option)
// };
// function borrowFileTable(option) {
//     let url = ApiConfig.borrowFileTable;
//     return HttpRequest.requestJsonPost(url,option)
// }
function getUtilizeInfoByApplicationNoAndObjId(option){
    let url = ApiConfig.getUtilizeInfoByApplicationNoAndObjId;
    return HttpRequest.requestJsonPost(url,option)
}
function getEditField(option) {
    let url = ApiConfig.getP4EditField;
    return HttpRequest.requestJsonPost(url,option)
}
function getEditFieldValue(option){
    let url = ApiConfig.getEditFieldValue;
    return HttpRequest.requestJsonPost(url,option)
}
function getBorrowHistoryDetailList(option){
    let url = ApiConfig.getBorrowHistoryDetailList;
    return HttpRequest.requestJsonPost(url,option)
}


let Service = {
    getUtilizeInfoByApplicationNoAndObjId,
    getEditField,
    getEditFieldValue,
    getBorrowHistoryDetailList
};

export default Service;