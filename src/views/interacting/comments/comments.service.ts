import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 下拉
const getDictlistsurl = option => {
    let url = ApiConfig.getDictlistsurl;
    return HttpRequest.requestJsonPost(url,option)
};

// 新增
const add = option => {
    let url = ApiConfig.feedbackAdd;
    return HttpRequest.requestJsonPost(url,option)
};

// 列表
const getFeedbackList = option => {
    let url = ApiConfig.getFeedbackList;
    return HttpRequest.requestJsonPost(url,option)
};

// 删除
const systemdelete = option => {
    let url = ApiConfig.systemdelete;
    return HttpRequest.requestJsonPost(url,option)
};

// 置已完结
const setover = option => {
    let url = ApiConfig.setover;
    return HttpRequest.requestJsonPost(url,option)
};


let Service = {
    getDictlistsurl,
    add,
    getFeedbackList,
    systemdelete,
    setover
};

export default Service;