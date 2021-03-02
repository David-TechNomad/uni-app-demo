import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

// 公告中心列表
const getAnnouncementList = option => {
    let url = ApiConfig.getAnnouncementList;
    return HttpRequest.requestJsonPost(url,option)
};
// 公告中心获取详情
const showDetail = option => {
    let url = ApiConfig.showDetail;
    return HttpRequest.requestJsonPost(url,option)
};
// 公告中心管理获取检索下拉
const getDictListByDictId = option => {
    let url = ApiConfig.getDictListByDictId;
    return HttpRequest.requestJsonPost(url,option)
};
// 公告中心新增保存
const saveAnnouncement = option => {
    let url = ApiConfig.saveAnnouncement;
    return HttpRequest.requestJsonPost(url,option)
};
// 公告中心编辑保存
const updateAnnouncement = option => {
    let url = ApiConfig.updateAnnouncement;
    return HttpRequest.requestJsonPost(url,option)
};
// 公告中心删除
const deleteAnnouncement = option => {
    let url = ApiConfig.deleteAnnouncement;
    return HttpRequest.requestJsonPost(url,option)
};
// 公告中心发布
const publish = option => {
    let url = ApiConfig.publish;
    return HttpRequest.requestJsonPost(url,option)
};
// 公告中心置顶
const important = option => {
    let url = ApiConfig.important;
    return HttpRequest.requestJsonPost(url,option)
};
// 公告中心删除文件
const delTempUploadFile = option => {
    let url = ApiConfig.delTempUploadFile;
    return HttpRequest.requestJsonPost(url,option)
};
let Service = {
    getAnnouncementList,
    showDetail,
    getDictListByDictId,
    saveAnnouncement,
    deleteAnnouncement,
    publish,
    important,
    updateAnnouncement,
    delTempUploadFile
};

export default Service;