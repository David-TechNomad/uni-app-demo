import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//档案数量统计_档案馆级
function getArchiveSummaryStatistic(params){
    let url=ApiConfig.getArchiveSummaryStatistic;
    return HttpRequest.requestJsonPost(url,params)
}
//档案数量统计_全宗级（展开某个档案馆时）
function getFondArchiveSummaryStatistic(params){
    let url=ApiConfig.getFondArchiveSummaryStatistic;
    return HttpRequest.requestJsonPost(url,params)
}
//控制标识统计_档案馆级
function getControlIdStatistic(params){
    let url=ApiConfig.getControlIdStatistic;
    return HttpRequest.requestJsonPost(url,params)
}
//控制标识统计_全宗级
function getFondControlIdStatistic(params){
    let url=ApiConfig.getFondControlIdStatistic;
    return HttpRequest.requestJsonPost(url,params)
}
//各门类档案数量_档案馆级
function getArchiveCountByKindStatistic(params){
    let url=ApiConfig.getArchiveCountByKindStatistic;
    return HttpRequest.requestJsonPost(url,params)
}
//各门类档案数量_全宗级
function getFondArchiveCountByKindStatistic(params){
    let url=ApiConfig.getFondArchiveCountByKindStatistic;
    return HttpRequest.requestJsonPost(url,params)
}
//档案数量增长率_档案馆级
function getArchiveGrowthRateStatistic(params){
    let url=ApiConfig.getArchiveGrowthRateStatistic;
    return HttpRequest.requestJsonPost(url,params)
}
//获取数据字典接口
function dicgetDictListByDictId(params){
    let url=ApiConfig.dicgetDictListByDictId;
    return HttpRequest.requestJsonPost(url,params)
}
//获取档案分类列表
function getSearcheckurl(params){
    let url=ApiConfig.getSearcheckurl;
    return HttpRequest.requestJsonPost(url,params)
}

let Service = {
    getArchiveSummaryStatistic,
    getFondArchiveSummaryStatistic,
    dicgetDictListByDictId,//获取数据字典
    getSearcheckurl,//获取档案分类列表
    getControlIdStatistic,//控制标识统计_档案馆级
    getFondControlIdStatistic,//控制标识统计_全宗级
    getArchiveCountByKindStatistic,//各门类档案数量_档案馆级
    getFondArchiveCountByKindStatistic,//各门类档案数量_全宗级
    getArchiveGrowthRateStatistic,//档案数量增长率_档案馆级
};

export default Service;