import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';


function archiveAgenterTree(option) {//检索条件中的档案馆树
    let url = ApiConfig.archiveAgenterTree;
    return HttpRequest.requestJsonPost(url,option)
}

function appraisalFondList(option) {//检索条件中的档案馆树
    let url = ApiConfig.appraisalFondList;
    return HttpRequest.requestJsonPost(url,option)
}

function treelist(option) {//列表
    let url = ApiConfig.treelist;
    return HttpRequest.requestJsonPost(url,option)
}

function namelist(option) {//档案门类
    let url = ApiConfig.namelist;
    return HttpRequest.requestJsonPost(url,option)
}

function add(option) {//新增
    let url = ApiConfig.add;
    return HttpRequest.requestJsonPost(url,option)
}

function update(option) {//新增
    let url = ApiConfig.update;
    return HttpRequest.requestJsonPost(url,option)
}

function findOne(option) {//详情
    let url = ApiConfig.findOne;
    return HttpRequest.requestJsonPost(url,option)
}

function deleteCate(option) {//删除
    let url = ApiConfig.deleteCate;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    archiveAgenterTree,
    appraisalFondList,
    treelist,
    namelist,
    add,
    update,
    findOne,
    deleteCate
};

export default Service;