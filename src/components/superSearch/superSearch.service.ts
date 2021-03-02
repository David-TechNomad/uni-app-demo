import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

//获取搜索条件
const getSearchecked = option =>{
    let url = ApiConfig.getSearcheckurl;
    return HttpRequest.requestJsonPost(url,option)
}
//获取可增加搜索条件
const getAddCriteria = option =>{
    let url = ApiConfig.getAddCriteria;
    return HttpRequest.requestJsonPost(url,option)
}

//获取可增加字典列表
const getDictlists = option =>{
    let url = ApiConfig.getAddCriteriaoption;
    return HttpRequest.requestJsonPost(url,option)
}


let Service = {    
    getSearchecked,
    getAddCriteria,
    getDictlists
};

export default Service;