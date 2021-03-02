import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';

function getHouseTree(params){
    let url=ApiConfig.HouseTreeList;
    return HttpRequest.requestJsonPost(url,params)
}
function getHouseTreeson(params){
    let url=ApiConfig.HouseTreeListson;
    return HttpRequest.requestJsonPost(url,params)
}
function ChangTreeName(params){
    let url = ApiConfig.ChangeTreeList;
    return HttpRequest.requestJsonPost(url,params);
}
function AddHouseTree(params){
    let url = ApiConfig.AddWareHouse;
    return HttpRequest.requestJsonPost(url,params);
}
function DeleteHouse(params){
    let url = ApiConfig.DeleteHouseList;
    return HttpRequest.requestJsonPost(url,params);
}
function HouseFileList(params){
    let url = ApiConfig.GetArchiveHouseList;
    return HttpRequest.requestJsonPost(url,params);
}
function ModelListTemple(params){
    let url = ApiConfig.ModelList;
    return HttpRequest.requestJsonPost(url,params);
}
function SearchTree(params){
    let url = ApiConfig.SearchTree;
    return HttpRequest.requestJsonPost(url,params);
}
function ModelSureQues(params){
    let url = ApiConfig.ModelSure;
    return HttpRequest.requestJsonPost(url,params);
}
function ModelsListsQuer(params){
    let url = ApiConfig.ModelsLists;
    return HttpRequest.requestJsonPost(url,params);
}
function SerchModelLists(params){
    let url = ApiConfig.SerchModelList;
    return HttpRequest.requestJsonPost(url,params);
}
function DeletaModels(params){
    let url = ApiConfig.DeleteModels;
    return HttpRequest.requestJsonPost(url,params);
}

function ChangeHouse(params){
    let url = ApiConfig.ChangeHouse;
    return HttpRequest.requestJsonPost(url,params);
}

function getTreeName(params){
    let url = ApiConfig.getTreeName;
    return HttpRequest.requestJsonPost(url,params);
}

function projectListHouse(params){
    let url = ApiConfig.projectListHouse;
    return HttpRequest.requestJsonPost(url,params);
}

function houseListTitle(params){
    let url = ApiConfig.houseListTitle;
    return HttpRequest.requestJsonPost(url,params);
}

let Service = {
    getHouseTree,
    getHouseTreeson,
    ChangTreeName,
    AddHouseTree,
    DeleteHouse,
    HouseFileList,
    ModelListTemple,
    SearchTree,
    ModelSureQues,
    ModelsListsQuer,
    SerchModelLists,
    DeletaModels,
    ChangeHouse,
    getTreeName,
    projectListHouse,
    houseListTitle
    
};

export default Service;