<template>    
        <el-dialog
            title="自动排序规则"
            :visible.sync="sorting"
            class="myDialog zujuanMaxWidth"  :append-to-body='true'>          
             <div class="formDiv">
                <div class="borderTable">
                        <el-table  :data="sortingData" stripe  class="indexTable containTable" v-loading="sortingLoading" element-loading-text="努力加载中..." :default-expand-all="true">
                                        <el-table-column type="expand">
                                            <template slot-scope="props">
                                                <div style="margin:10px; text-align:right">
                                                        <el-button class="checkWay" @click="addchilden(props.row)">新增</el-button>                           
                                                </div>
                                                <el-table :data="props.row.sortValue"  class="indexTable containTable" style="margin:0 10px 20px 10px;">
                                                    <el-table-column label="排序" prop="sort">  
                                                        <template slot-scope="propschilden">                                          
                                                            <span >{{propschilden.row.sort}}</span>                                           
                                                        </template>                                                       
                                                    </el-table-column>
                                                    <el-table-column label="文件简字" prop="value">
                                                            <template slot-scope="propschilden">  
                                                                   <el-select v-model="propschilden.row.value" filterable placeholder="请选择" v-if="propschilden.row.edit">
                                                                        <el-option v-for="item in propschilden.row.sortchilden"
                                                                                :key="item.fieldName"
                                                                                :label="item.code"
                                                                                :value="item.code">
                                                                        </el-option>
                                                                    </el-select> 
                                                                    <span v-else>{{propschilden.row.value}}</span>                                              
                                                            </template>      
                                                    </el-table-column>
                                                    <el-table-column fixed="left" label="操作" width="120">
                                                        <template slot-scope="propschilden">    
                                                            <span class="addBtn" v-if="propschilden.row.edit" @click="chcksaveChilden(props.row,props.$index)">保存</span>                                    
                                                            <span class="addBtn" v-else @click="editSortChilden(propschilden.row,props.row)">编辑</span>                                          
                                                            <span class="addBtn" @click="delSortingC(props.row.sortValue,propschilden.row,props.row,props.$index)">删除</span>                                           
                                                        </template>
                                                    </el-table-column>
                                                </el-table>                                                    
                                            </template>
                                            </el-table-column>                         
                                    <el-table-column  prop="fieldValue" label="著录项"> 
                                        <template slot-scope="scope">                                            
                                            <span>{{scope.row.fieldValue}}</span>     
                                        </template>                                                         
                                    </el-table-column>                          
                                    <el-table-column  prop="sortRule" label="排序规则">
                                    <template slot-scope="scope">
                                            <el-select v-model="scope.row.sortRule" filterable placeholder="请选择" v-if="scope.row.edit">
                                                <el-option v-for="item in sortRule"
                                                        :key="item.code"
                                                        :label="item.displayText"
                                                        :value="item.code">
                                                </el-option>
                                            </el-select> 
                                            <div v-else>
                                                <span v-if="scope.row.sortRule=='ASC'" >正序</span>
                                                <span v-else-if="scope.row.sortRule=='DESC'">降序</span>
                                            </div>
                                    </template> 
                                    </el-table-column> 
                                    <el-table-column label="操作" fixed="left" width="120">
                                        <template slot-scope="scope">
                                            <span class="addBtn" @click="saveSorting(scope.row,scope.$index,'编辑')" v-if="scope.row.edit">保存</span>
                                            <span class="addBtn" @click="editSorting(scope.$index,scope.row)" v-else>编辑</span>
                                            <span class="addBtn" @click="delSorting(scope.row)">删除</span>
                                        </template> 
                                </el-table-column>
                                </el-table>
                                <el-table  :data="addSorting" stripe  class="indexTable containTable" :show-header="false">                         
                                    <el-table-column>
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.fieldValue" filterable placeholder="请选择">
                                                <el-option v-for="item in selectfiles"
                                                        :key="item.fieldName"
                                                        :label="item.caption"
                                                        :value="item.fieldName">
                                                </el-option>
                                            </el-select>      
                                        </template>
                                    </el-table-column>                         
                                    <el-table-column>
                                        <template slot-scope="scope">
                                        <el-select v-model="scope.row.sortRule" filterable placeholder="请选择">
                                                <el-option v-for="item in sortRule"
                                                        :key="item.code"
                                                        :label="item.displayText"
                                                        :value="item.code">
                                                </el-option>
                                            </el-select>           
                                        </template>
                                    </el-table-column> 
                                    <el-table-column label="操作" fixed="left" width="120">
                                    <template slot-scope="scope">
                                        <el-button class="checkWay" @click="chcksave(scope.row)">新增</el-button>
                                    </template> 
                                </el-table-column>
                                </el-table>                       
                             
                    </div>
                </div>
            <span slot="footer" class="dialog-footer">                
                <el-button  class="checkWay" @click="sorting=false">关闭</el-button>
          </span>
       </el-dialog>
  
</template>
<script lang="ts">
    import { Component, Vue,Prop , Watch } from 'vue-property-decorator';   
    import Service from './classManagement.service';  
    @Component({})
    export default class atuoSort extends Vue{ 
        @Prop({})        
        libId : number;
        @Prop({})
        selectfiles:any;
        @Prop({})
        sortRule:any; 
        sorting:boolean = false;  
        sortingLoading:boolean = false;      
        addSorting: any = [];
        sortingData: any = [];         
        constructor(){
            super();           
        };        
        getSorting(){
                this.sortingLoading=true;
                Service.getautoSorting({}).then((res) =>{
                        if(res.data.succeeded){                                
                                for(let i in res.data.data){
                                   res.data.data[i].sortValue=JSON.parse(res.data.data[i].sortValue); 
                                }
                                this.sortingData=res.data.data;                               
                                this.sortingLoading=false;
                        }else{
                               this.sortingLoading=false;
                                this['$message']({
                                    message: '获取失败',
                                    type: 'error'
                                }); 
                        }
                })                   
        };
        chcksave(row){
           if(row.sortRule==""){
                this['$message']({
                    message: '排序不能为空',
                    type: 'error'
                    });
            }else if(row.fieldValue==""){
                this['$message']({
                        message: '著录项不能为空',
                        type: 'error'
                    });
            }else{ 
                 this.saveSorting(row,'','添加')
            }

        } 
        chcksaveChilden(row,index){
            let istrue = true
            if(row.sortValue && row.sortValue.length>0){
                for(let i in row.sortValue){                   
                    if(row.sortValue[i].value==""){
                        this['$message']({
                            message: '文件简字不能为空',
                            type: 'error'
                            });
                            istrue = false
                      break;
                    } 
                }    
             }   
            if(istrue){
              this.saveSorting(row,index,'添加')  
            }  

        }         
        saveSorting(row,index,str){
                    let tableName='';
                    let Id ='';
                    let fieldName= '';
                    let sortSeq='';                    
                    if(row.id){
                        Id=row.id;
                        for(let i in this.selectfiles){
                            if(this.selectfiles[i].fieldName == row.fieldName ){
                                tableName=this.selectfiles[i].tableName
                            }
                        } 
                        fieldName = row.fieldName 
                        sortSeq = index
                    }else{
                       for(let i in this.selectfiles){
                            if(this.selectfiles[i].fieldName == row.fieldValue ){
                                tableName=this.selectfiles[i].tableName
                            }
                        } 
                        fieldName = row.fieldValue
                        sortSeq = this.sortingData.length  
                    }                                  
                    let sortValue=[]
                    for(let i in row.sortValue){
                     sortValue.push({sort:row.sortValue[i].sort, value:row.sortValue[i].value})
                    }     
                                             
                    let params = {
                        id:Id,
                        libId:this.libId,
                        tableName:tableName, 
                        sortSeq:sortSeq,
                        sortRule:row.sortRule,
                        "fieldValue":fieldName,
                        sortValue:JSON.stringify(sortValue)                            
                    } 
                                                   
                Service.saveautoSort(params).then(res=>{                   
                        if(res.data.succeeded){                            
                                this['$message']({
                                    message: str+'成功',
                                    type: 'success'
                                });
                                this.addSorting = [{
                                        sortRule :'';
                                        fieldValue : '';
                                    }];                            
                                this.getSorting()
                        }else{                       
                                                                   
                                this['$message']({
                                    message: str+'失败',
                                    type: 'error'
                                });
                                          
                        }
                })
                 
    }
    delSorting(row){
            this['$confirm']('确认删除吗？', '提示',  {
                type: 'warning'
            }).then(() => {
                let params=[];
                params.push(row.id)
                Service.delautoSort(params).then(res=>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: ' 删除成功',
                            type: 'success'
                        });                             
                        this.getSorting()
                    }else{                        
                        this['$message']({
                            message: '删除失败',
                            type: 'error'
                        });
                    }                        
                })
            });
    }
    delSortingC(data,row,saverow,saveindex){
        if(!row.value){
            data.splice(data.indexOf(row),1);
            for(let i in data){
               data[i].sort = parseInt(i)+ 1
           }
        }else{
           this['$confirm']('确认删除吗？',  '提示', {
                type: 'warning'
            }).then(() => {
               data.splice(data.indexOf(row),1);
               for(let i in data){
                   data[i].sort = parseInt(i)+ 1
               }
               this.saveSorting(saverow,saveindex,'删除')  
            })
        }
    };
    editSorting(index,row){
            this['$set'](row,'edit',true);
        };
    editSortChilden(childenRow,row){
        this['$set'](childenRow,'edit',true);
        let sortchilden=[]
        for(let i in this.selectfiles){
            if(row.fieldName == this.selectfiles[i].fieldName){
                sortchilden = this.selectfiles[i].dictDatas
            }
        }
       childenRow.sortchilden = sortchilden
    };  
    addchilden(row){  
       let sortchilden=[]
       for(let i in this.selectfiles){
          if(row.fieldName == this.selectfiles[i].fieldName){
               sortchilden = this.selectfiles[i].dictDatas
          }
       }
       row.sortValue.push({sort:row.sortValue.length+1,value:'','sortchilden':sortchilden,edit:true})
    };
    created(){
            this.addSorting = [{
                                sortRule :'';
                                fieldValue : '';
                            }];
            this.getSorting()
    };
    mounted(){  
                
    };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/classManagement/classManagement';
</style>