import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//取树列表
function Arckind(params){
    let url = ApiConfig.Arckind;
    return HttpRequest.requestJsonPost(url,params)
}
//取著录项列表
function ManagementArclib(params){
    let url = ApiConfig.ManagementArclib;
    return HttpRequest.requestJsonPost(url,params)
}

//保存新增组
function ArckindSave(params){
    let url = ApiConfig.ArckindSave;
    return HttpRequest.requestJsonPost(url,params)
};
//新增类时获取模板
function TemplateList(params){
    let url = ApiConfig.TemplateList;
    return HttpRequest.requestJsonPost(url,params)
};
//保存新增分类
function ArckindCreate(params){
    let url = ApiConfig.ArckindCreate;
    return HttpRequest.requestJsonPost(url,params)
};
//删除组
function FolderRemove(id){
    let url = ApiConfig.FolderRemove;
    return HttpRequest.requestJsonPost(url,id)
};
//删除类
function ClassRemove(id){
    let url = ApiConfig.ClassRemove;
    return HttpRequest.requestJsonPost(url,id)
}
//著录项的删除
function FieldRemove(params){
    let url = ApiConfig.FieldRemove;
    return HttpRequest.requestJsonPost(url,params)
}
//取得快捷搜索项
function queryconditionGet(params){
    let url = ApiConfig.queryconditionGet;
    return HttpRequest.requestJsonPost(url,params)
}
//取得设置快捷搜索的候选著录项
function candidates(params){
    let url = ApiConfig.candidates;
    return HttpRequest.requestJsonPost(url,params)
}
//保存快捷搜索项
function queryconditionSave(params){
    let url = ApiConfig.queryconditionSave;
    return HttpRequest.requestJsonPost(url,params)
}
//取得档号规则
function nosettings(params){
    let url = ApiConfig.nosettings;
    return HttpRequest.requestJsonPost(url,params)
}
//保存档号规则
function SaveNosettings(params){
    let url = ApiConfig.SaveNosettings;
    return HttpRequest.requestJsonPost(url,params)
}
//取得设置快捷搜索的候选著录项
function ManagementCandidates(id){
    let url = ApiConfig.ManagementCandidates;
    return HttpRequest.requestJsonPost(url,id)
}
//取得批量挂接规则
function getRule(params){
    let url = ApiConfig.getRule;
    return HttpRequest.requestJsonPost(url,params)
}
//保存批量挂接规则
function saveRule(params){
    let url = ApiConfig.saveRule;
    return HttpRequest.requestJsonPost(url,params)
}
//获取已有项
function ManagementList(params){
    let url = ApiConfig.ManagementList;
    return HttpRequest.requestJsonPost(url,params)
}
//控件类型下拉候选项
function ManagementControl(){
    let url = ApiConfig.ManagementControlTypeCandidates;
    return HttpRequest.requestJsonPost(url,{});
}
//保存定制画面
function ManagementSave(params){
    let url = ApiConfig.ManagementSave;
    return HttpRequest.requestJsonPost(url,params)
}
//著录项类型
function DataTypeCandidates(params){
    let url = ApiConfig.DataTypeCandidates;
    return HttpRequest.requestJsonPost(url,params)
}
//数据字典
function DictionaryCandidates(params){
    let url = ApiConfig.DictionaryCandidates;
    return HttpRequest.requestJsonPost(url,params)
}
//保存著录项
function ArclibSave(params){
    let url = ApiConfig.ArclibSave;
    return HttpRequest.requestJsonPost(url,params)
}
//全文索引类行
function solrModeCandidates(){
    let url = ApiConfig.solrModeCandidates;
    return HttpRequest.requestJsonPost(url,{})
}
//取一览设置
function ManagementDispList(ID){
    let url = ApiConfig.ManagementDispList;
    return HttpRequest.requestJsonPost(url,ID)
}
//获取模板列表
function getReportTempListByLibId(ID){
    let url = ApiConfig.getReportTempListByLibId;
    return HttpRequest.requestJsonPost(url,ID)
}
//获取模板列表
function updateReportByLibId(ID){
    let url = ApiConfig.updateReportByLibId;
    return HttpRequest.requestJsonPost(url,ID)
}
//分类组编辑之后的保存
function arckindmodify(params){
    let url = ApiConfig.arckindmodify;
    return HttpRequest.requestJsonPost(url,params)
}
let Service = {
    Arckind,
    ManagementArclib,
    ArckindSave,
    TemplateList,
    ArckindCreate,
    FolderRemove,
    ClassRemove,
    FieldRemove,
    queryconditionGet,
    candidates,
    queryconditionSave,
    ManagementCandidates,
    ManagementList,
    nosettings,
    SaveNosettings,
    getRule,//取得批量挂接规则
    saveRule,//保存批量挂接规则
    ManagementControl,
    ManagementSave,
    DataTypeCandidates,
    DictionaryCandidates,
    ArclibSave,
    solrModeCandidates,
    ManagementDispList,
    getReportTempListByLibId,//获取模板列表
    updateReportByLibId,//绑定模板
    arckindmodify,
}
export default Service