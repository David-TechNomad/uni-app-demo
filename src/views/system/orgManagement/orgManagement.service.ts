import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';


function agenterTreelist(parame){//机构管理列表
    let url = ApiConfig.agenterTreelist;
    return HttpRequest.requestJsonPost(url,parame)
}

function dicgetDictListByDictId(parame){//机构管理列表
    let url = ApiConfig.dicgetDictListByDictId;
    return HttpRequest.requestJsonPost(url,parame)
}

function archiveAgenterTree(parame){//档案馆树
    let url = ApiConfig.archiveAgenterTree;
    return HttpRequest.requestJsonPost(url,parame)
}

function addAgenter(parame){//添加
    let url = ApiConfig.addAgenter;
    return HttpRequest.requestJsonPost(url,parame)
}

function fondOne(parame){//详情
    let url = ApiConfig.fondOneAgenter;
    return HttpRequest.requestJsonPost(url,parame)
}

function updateAgenter(parame){//修改
    let url = ApiConfig.updateAgenter;
    return HttpRequest.requestJsonPost(url,parame)
}

function deleteAgenter(parame){//删除
    let url = ApiConfig.deleteAgenter;
    return HttpRequest.requestJsonPost(url,parame)
}

let Service = {
    agenterTreelist,
    dicgetDictListByDictId,
    archiveAgenterTree,
    addAgenter,
    fondOne,
    updateAgenter,
    deleteAgenter
}

export default Service;
