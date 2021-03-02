import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function findBorrowUtilizeInfo(option) {
    let url = ApiConfig.findBorrowUtilizeInfo;
    return HttpRequest.requestJsonPost(url,option)
}
function updateUtilizeInfoArcstatus(option) {
    let url = ApiConfig.updateUtilizeInfoArcstatus;
    return HttpRequest.requestJsonPost(url,option)
}
const printODO = option => {
    let url = ApiConfig.printODO;
    return HttpRequest.requestBlobPost(url,option)
};

let Service = {
    findBorrowUtilizeInfo,
    updateUtilizeInfoArcstatus,
    printODO
};

export default Service;