import HttpRequest from '@/api/request';
import ApiConfig from '@/api-config';
//取档案树
function getKindAndLibList(data) {
	let url = ApiConfig.Arckind;
	return HttpRequest.requestJsonPost(url, data)
}
//取著录项
function getFieldList(data) {
	let url = ApiConfig.ManagementArclib;
	return HttpRequest.requestJsonPost(url, data)
}
//保存新增组
function ArckindSave(params){
    let url = ApiConfig.ArckindSave;
    return HttpRequest.requestJsonPost(url,params)
};
//新增类时获取模板
function templateList(params){
    let url = ApiConfig.TemplateList;
    return HttpRequest.requestJsonPost(url,params)
};
//保存新增分类
function ArckindCreate(params){
    let url = ApiConfig.ArckindCreate;
    return HttpRequest.requestJsonPost(url,params)
};
//删除组
 function FolderRemove(params){
    let url = ApiConfig.FolderRemove;
    return HttpRequest.requestJsonPost(url,params)
}; 
//删除类
 function ClassRemove(params){
    let url = ApiConfig.ClassRemove;
    return HttpRequest.requestJsonPost(url,params)
};
//编辑门类
function arckindmodify(params){
    let url = ApiConfig.arckindmodify;
    return HttpRequest.requestJsonPost(url,params)
};
//保存著录项
function saveZlxList(data) {
	let url = ApiConfig.ArclibSave;
	return HttpRequest.requestJsonPost(url, data)
}
//获取著录项新增类型
function getTypeData(data) {
	let url = ApiConfig.getDictListByDictId;
	return HttpRequest.requestJsonPost(url, data)
}

//取著录项数据字典
function getDictionaryList(data) {
	let url = ApiConfig.DictionaryCandidates;
	return HttpRequest.requestJsonPost(url, data)
}

//取著录删除
function delZlxList(data) {
	let url = ApiConfig.FieldRemove;
	return HttpRequest.requestJsonPost(url, data)
}

//获取一览定制画面列表
function ManagementCandidates(data) {
	let url = ApiConfig.candidates;
	return HttpRequest.requestJsonPost(url, data)
}
//获取定制已选列表
function ManagementList(data) {
	let url = ApiConfig.ManagementList;
	return HttpRequest.requestJsonPost(url, data)
}
//获取一览画面已选列表
function ManagementDispList(data) {
	let url = ApiConfig.ManagementDispList;
	return HttpRequest.requestJsonPost(url, data)
}


//获取档号列表
function getfilesNoChanges(data) {
	let url = ApiConfig.nosettings;
	return HttpRequest.requestJsonPost(url, data)
}


//保存/删除/修改/档号列表Added(1), Modified(2), Deleted(3)
function savefilesNoChanges(data) {
	let url = ApiConfig.SaveNosettings;
	return HttpRequest.requestJsonPost(url, data)
}

//获取批量列表
function getRule(data) {
	let url = ApiConfig.getRule;
	return HttpRequest.requestJsonPost(url, data)
}
//取得设置快捷搜索的候选著录项
function candidates(params){
    let url = ApiConfig.candidates;
    return HttpRequest.requestJsonPost(url,params)
}
//保存批量保存//保存/删除/修改/Added(1), Modified(2), Deleted(3)
function saveRule(data) {
	let url = ApiConfig.saveRule;
	return HttpRequest.requestJsonPost(url, data)
}

//保存一览画面定制
function saveSettingField(data) {
	let url = ApiConfig.saveSettingField;
	return HttpRequest.requestJsonPost(url, data)
}

//保存定制画面
function ManagementSave(params){
    let url = ApiConfig.ManagementSave;
    return HttpRequest.requestJsonPost(url,params)
}
//控件类型下拉候选项
function ManagementControl(){
    let url = ApiConfig.ManagementControlTypeCandidates;
    return HttpRequest.requestJsonPost(url,{});
}


let Service = {
    getKindAndLibList,
	getFieldList,
	getTypeData,
	getDictionaryList,
	saveZlxList,
	ManagementCandidates,
	saveSettingField,	
	getfilesNoChanges,
	savefilesNoChanges,
	ArckindCreate,
	templateList,
	FolderRemove,
	ClassRemove,
	arckindmodify,
	ManagementList,
	ManagementDispList,
	delZlxList,
	getRule,
	candidates,
	saveRule,
	ManagementSave,
	ManagementControl
	
};

export default Service;