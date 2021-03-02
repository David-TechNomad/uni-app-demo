import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getVirtualDiskConfigList(option) {//用户列表
    let url = ApiConfig.getVirtualDiskConfigList;
    return HttpRequest.requestJsonPost(url,option)
}

function deleteVirtualDiskConfig(option) {//删除存储盘
    let url = ApiConfig.deleteVirtualDiskConfig;
    return HttpRequest.requestJsonPost(url,option)
}

function saveOrUpdate(option) {//保存and修改存储盘
    let url = ApiConfig.saveOrUpdate;
    return HttpRequest.requestJsonPost(url,option)
}

function getVirtualDiskConfig(option) {//获取存储盘信息
    let url = ApiConfig.getVirtualDiskConfig;
    return HttpRequest.requestJsonPost(url,option)
}

function getDictListByDictId(option) {//获取存储盘信息
    let url = ApiConfig.getDictListByDictId;
    return HttpRequest.requestJsonPost(url,option)
}

let Service = {
    getVirtualDiskConfigList,
    deleteVirtualDiskConfig,
    saveOrUpdate,
    getVirtualDiskConfig,
    getDictListByDictId
};

export default Service;