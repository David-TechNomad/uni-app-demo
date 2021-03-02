import request from '@/api/request';
import axios from 'axios';
import qs from 'qs'

// 下载
const downListPage = params => {
    return axios({
        method: 'get',
        url: 'api/mvc/dispatch',
        params,
        responseType: 'blob'
    })
};

// 上传文件
const uploadListPage = data => {
    return axios({
        method: 'post',
        url: 'api/fonds/getChildren',
        data:data
    })
};

let apiCloud = {  
    downListPage,   
    uploadListPage
};

export default apiCloud;
