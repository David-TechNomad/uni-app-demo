import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function transferLookup(option) {
    let url = ApiConfig.TransferLookup;
    return HttpRequest.requestJsonPost(url,option)
}
function TransSearch(option) {
    let url = ApiConfig.TransSearch;
    return HttpRequest.requestJsonPost(url,option)
}

function findFondColumn(option) {
    let url = ApiConfig.findFondColumn;
    return HttpRequest.requestJsonPost(url,option)
}

function closeApproval(option) {
    let url = ApiConfig.closeApproval;
    return HttpRequest.requestJsonPost(url,option)
}
function findAllList(option) {
    let url = ApiConfig.findAllList;
    return HttpRequest.requestJsonPost(url,option)
}
let Service = {
    transferLookup,
    TransSearch,
    findFondColumn,
    closeApproval,
    findAllList
};

export default Service;