import moment from 'moment';
/**
 *  案卷加入借阅车后，控制标识一列的数据只给了整数，所以需要处理成对应的数据字典
    提交后在拆单界面，控制标识一列的数据为字符串code，也需要处理成对应的数据字典
    文件级加入借阅车可以正常显示
 * @param {*} cvalue 
 */
function renderControlId(cvalue){
    if(typeof(cvalue) == 'number'){
        if(cvalue==1){
            return '开放';
        }else if(cvalue==2){
            return '控制';
        }else if(cvalue==3){
            return '绝对控制';
        }else if(cvalue==4){
            return '待定';
        }else if(cvalue==6){
            return '其它';
        }
    }else{
        var patter = new RegExp("[0-9]+");
        if(patter.test(cvalue)){//拆单页面
            if(cvalue=="1"){
                return '开放';
            }else if(cvalue=="2"){
                return '控制';
            }else if(cvalue=="3"){
                return '绝对控制';
            }else if(cvalue=="4"){
                return '待定';
            }else if(cvalue=="6"){
                return '其它';
            }
        }else{
            return cvalue;
        }
        
    }
}
//渲染列日期数据的格式
function dateFormat(row, column) {
    var date = row[column.property];
    if (date == undefined) {
        return "";
    }
    return moment(date).format("YYYYMMDD");
};
//提交时，需要去掉字段中的高光标签字符
function removeEM(oriStr){
    if(oriStr && (typeof(oriStr)=='string')){
        let result = oriStr.replace(/<em>/g,"").replace(/<\/em>/g,"");
        return result;
    }else{
        return oriStr;
    }
}
/**
 * 用于传入拆单页面的session数据，显示拆单信息
 * @param {*} lookupList 
 * @param {*} processList 
 * @param {*} infoList 
 */
function getLookUpObj(lookupList, processList, infoList){
    for(let up of lookupList){
        for(let pro of processList){
            if(pro.applicationNo == up.applicationNo){
                up.utilizeProcesses.push(pro);
            }
        }
        for(let info of infoList){
            if(info.applicationNo == up.applicationNo){
                up.utilizeInfos.push(info);
            }
        }
    }
    return lookupList;
};
/**
 * 当添加普通借阅数据时，过滤相同的数据，并加入到表格列表中(用于普通检索，受理登记，协查办理)
 * @param {*} isQw 是否是全文检索，判断是否相同条目时的字段不同
 * @param {*} tableDataList 表格当前的数据
 */
function pushDiffApplyDatas(isQw, tableDataList){
    let addList = []
    if(isQw==0){    //目录检索添加文件
        addList = window.sessionStorage.getItem("fromSp_comFiles")==null?[]: JSON.parse( window.sessionStorage.getItem("fromSp_comFiles"));
        window.sessionStorage.removeItem("fromSp_comFiles");
    }else{  //全文检索添加文件
        addList = window.sessionStorage.getItem("fromQw_comFiles")==null?[]: JSON.parse( window.sessionStorage.getItem("fromQw_comFiles"));
        window.sessionStorage.removeItem("fromQw_comFiles");
    }
    if(tableDataList.length==0){
        if(addList.length !=0){
            if(isQw){
                for(let add of addList){
                    add.id = add.archiveId;
                }
            }
            tableDataList = [...tableDataList,...addList];
        }
    }else{
        for(let add of addList){
            let same = false;
            for(let data of tableDataList){
                if(isQw){
                    add.id = add.archiveId;
                }
                if((data.id == add.id) && (data.libId==add.libId) && (data.archiveAgentCode==add.archiveAgentCode)){//过滤添加的待借阅相同条目
                    same = true;
                }
            }
            if(!same){
                tableDataList.push(add);
            }
        }
    }
    return tableDataList;
}
/**
 * 添加协查数据时，过滤相同数据，并将不同的数据加入到表格列表中(用于普通检索，受理登记)
 * @param {*} isQw 是否是全文检索，判断是否相同条目时的字段不同
 * @param {*} tableDataList 表格当前的数据
 */
function pushDiffAssistDatas(isQw, assistDataList){//0 目录检索  1全文检索
    let addXiechaList = [];
    if(isQw==0){
        let jsonSpAssistFiles = window.sessionStorage.getItem("fromSp_assistFiles");
        window.sessionStorage.removeItem("fromSp_assistFiles");
        addXiechaList = jsonSpAssistFiles==null?[]: JSON.parse(jsonSpAssistFiles);//新添加的协查数据

    }else{
        let jsonQwAssistFiles = window.sessionStorage.getItem("fromQw_assistFiles");
        window.sessionStorage.removeItem("fromQw_assistFiles");
        addXiechaList = jsonQwAssistFiles==null?[]: JSON.parse(jsonQwAssistFiles);//全文新添加的协查数据
    }
    if(assistDataList.length==0){
        if(addXiechaList.length !=0){
            assistDataList = [...assistDataList,...addXiechaList];
        }
    }else{
        for(let add of addXiechaList){
            let same = false;
            for(let data of assistDataList){
                if(data.archiveAgentCode == add.archiveAgentCode){//过滤添加的协查相同条目,区分文件级案卷级
                    same = true;
                    //判断关键字是否一样，不一样拼接在一起
                    if(add.keyWord && data.keyWord && data.keyWord.split(',').indexOf(add.keyWord)==-1 ){
                        data.keyWord = `${data.keyWord},${add.keyWord}`;
                    }
                }
            }
            if(!same){
                assistDataList.push(add);
            }
        }
    }
    return assistDataList;
}
/**
 * 
 * @param {*} tableDataList :表格中的属性，重新组装提交的档案属性的数据格式
 */
function setPropertyArchivesOfSubmitDatas(tableDataList){
    let fileArr = [];
    for(let file of tableDataList){
        let fa = {
            "libId": this.removeEM(file.libId),//
            "objectId": file.id,
            "arcPath": "",
            "pathArcAdminId": "",
            "changeUserId": 0,
            "changeUserName": '',
            "archiveDH": this.removeEM(file.ARCHIVAL_CODE), 
            "archiveTM": this.removeEM(file.TITLE),
            "archiveWJBH": "",
            "archiveXMMCNEW": file.archiveAgentName,
            "archiveAgentCode": file.archiveAgentCode,
            "keyWord": file.keyWord,
            "controlId": file.CONTROL_ID,
            "fondCode": this.removeEM(file.FONDS_CODE),//
            "year": this.removeEM(file.YEAR),//
            "kindName": file.kindName
        }
        fileArr.push(fa);
    }
    return fileArr;
}


let BorrowUtils = {
    renderControlId,
    getLookUpObj,
    dateFormat,
    removeEM,
    pushDiffApplyDatas,
    pushDiffAssistDatas,
    setPropertyArchivesOfSubmitDatas
};

export default BorrowUtils;


