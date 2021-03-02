import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function archiveAgenterTree(option) {//档案馆树
    let url = ApiConfig.archiveAgenterTree;
    return HttpRequest.requestJsonPost(url,option)
}

function findFondsByName(option) {//列表
    let url = ApiConfig.findFondsByName;
    return HttpRequest.requestJsonPost(url,option)
}

function saveFond(option) {//创建和编辑
    let url = ApiConfig.addSaveFond;
    return HttpRequest.requestJsonPost(url,option)
}

function deleteFond(option) {//删除
    let url = ApiConfig.deleteFond;
    return HttpRequest.requestJsonPost(url,option)
}

function fondExport(option) {//导出
    let url = ApiConfig.fondExport;
    return HttpRequest.requestBlobGet(url,option)
}


let Service = {
    archiveAgenterTree,
    findFondsByName,
    saveFond,
    deleteFond,
    fondExport
};

export default Service;