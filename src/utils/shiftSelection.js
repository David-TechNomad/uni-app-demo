/**
 * 
 * @param {*} dataList 表格绑定的数据
 * @param {*} selections 表格中选中的数据对象
 * @param {*} tableRefObj 表格ref对象
 */
function shiftSelectMore( dataList, selections, tableRefObj) {
    var len = dataList.length;        
    var resulindex = -1;   
    if(selections.length>=2){
        resulindex = dataList.indexOf(selections[selections.length-2]);     
        var index = dataList.indexOf(selections[selections.length-1]); 
    }
    if(resulindex < index){          
        for(let i=resulindex; i<=index; i++){ 
            tableRefObj.toggleRowSelection(dataList[i], true);
            if(selections.indexOf(dataList[i])==-1){
                selections.push(dataList[i]);
            }           
        }        
    }
    else{          
        for(let i=index; i<=resulindex; i++){            
            tableRefObj.toggleRowSelection(dataList[i], true);  
            if(selections.indexOf(dataList[i])==-1){
                selections.push(dataList[i]);
            }          
        }        
    } 
    return selections;
}
export default shiftSelectMore;