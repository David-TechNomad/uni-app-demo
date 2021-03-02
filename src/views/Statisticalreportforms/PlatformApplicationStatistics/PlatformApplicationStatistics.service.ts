import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//平台应用排行榜
function getRankingList(params){
    let url=ApiConfig.getRankingList;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    getRankingList,
};

export default Service;