<template>
            <el-table
              :data="tableData"
              border
              :height="bodyHeight"
              element-loading-text="努力加载中..."
              header-row-class-name="tableHeader"
              :empty-text="libId && libId.length>0?'暂无数据':'请选择案卷库'" 
              stripe
              v-loading="loading"
              class="defaultTable"
              @selection-change="handleShiftSelect"  
              ref="ShiftSelectRef"
               @row-dblclick="handleRowDblclick">
              <el-table-column type="selection"  width="55" v-if="tableTitle.length>0">
              </el-table-column>              
              <el-table-column :prop="title.fieldName" :label="title.caption" :width="title.width" v-for="title,index in tableTitle" :key="index"  v-if="!(title.hidden)">
                   <template slot-scope="scope">                                                 
                        <span v-if="title.fieldName=='ATTACHED_FILE_FLAG'"> <i class="fa fa-paperclip tableIcon" v-if="scope.row.ATTACHED_FILE_FLAG=='true'"></i> </span>
                         <span v-else-if="title.fieldName=='PUBLISH_STATUS'">
                          <span v-if="scope.row[title.fieldName]==1">已发布</span>
                          <span v-if="scope.row[title.fieldName]==0">未发布</span>
                        </span>
                        <span v-else-if="title.dictData !== null">{{scope.row[title.fieldName + '_Text']}}</span>
                        <span v-else>{{scope.row[title.fieldName]}}</span>                         
                    </template>
              </el-table-column>             
          </el-table>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';   
    import Service from './recycleTable.service'      
    @Component
    export default class recycleTable extends Vue{         
        bodyHeight: number= document.documentElement.clientHeight - 363 ;
        tableTitle:any = [];    
        tableData: any =[];
        activeName:string; 
        libId:any = [];
        loading: Boolean= false;
        isshift: Boolean;
        IngroupfileID:any=[] ;
        constructor(){
            super();
        };
        handleRowDblclick(row, event){
            let name;  
            if(this.activeName=="file"){
                 name= 'findFile' 
            } else if(this.activeName=="Ungroup"){
                 name= 'findDocuments'
            } else if(this.activeName=="Ingroupfile"){
                 name= 'findIngroupfile'
            };
            this.gotopage('newly/newlywenjian',name,row.id, this.libId)
        };
        gotopage(page, type, id, libIdObj, currentIdOrder){
          //判断是案卷级编辑还是文件级编辑
          let libId;
          if(type === 'IngroupfileEdit') {
              libId=libIdObj.filter(function (item) {
                return item.rank === 3;
            });
          } else {
              libId=libIdObj.filter(function (item) {
                return item.rank === 4;
            });
          }         
            this.$router.push({
                path:'/fileArrange/arrange/'+page,
                name:'整理编目新增文件页面',
                params: {
                    from: type,
                    id:id ? id:'',
                    libId:`libId[0].id` ? libId[0].id : '',
                    tableData:this.tableData,
                    currentIdOrder:currentIdOrder
                }
            });
        }; 
        //获取表格表头 
        getDispField(val,activeName){         
          this.activeName = activeName 
          this.libId = val          
          if(!val)
             return false;
            let params,id;           
            if(activeName=='file'){ 
                val.forEach(row =>{
                  if(row.rank == 3){
                     id = row.id
                   }
                })  
            }else if(activeName=='Ungroup' || this.activeName=='Ingroupfile'){
                val.forEach(row =>{
                   if(row.rank == 4){
                     id = row.id
                   }
                   
                }) 
            }
            if(!id)
            return false;
            params={"phase":2,"libId":id};
            this.loading = true;          
            Service.getDispField(params).then(res=>{               
              if(res.data && res.data.succeeded){
                this.tableTitle = res.data.data;
                this.getTable(id)
                   
              }else{
                this['$message']({
                message: '查询列表表头库失败！',
                type: 'error'
                })
              }
        });
            
               
        };
        //获取案卷文件列表
        getTable(val){              
            let params={
                "phase": 2,
                "archiveAgentCode": this.$parent.archiveAgentCode,
                "libId": val,
                "mode": 1,
                "searchKey": this.$parent.searchKey,
                "pageCondition": {
                    "page": this.$parent.page + 1 ,
                    "pageSize": this.$parent.pageSize,
                    "sort": ""
                }
            };
            Service. getArchiveList(params).then(res=>{     
              debugger;          
                  if(res.data && res.data.succeeded){
                    
                    this.tableData = res.data.data.data;
                    this.$parent.total = res.data.data.totalRecords
                    this.loading = false;
                  }else{
                    this['$message']({
                    message: '查询回收站列表失败！',
                    type: 'error'
                    })
                  }
            });
        };        
        keyevent() {
            var that = this;
            document.onkeydown = function(e) { //按下键盘      
              switch(e.keyCode) {
                case 16:
                  that.isshift = true;
                  break;
              }
            };
            document.onkeyup = function(e) { //放弃键盘   
              switch(e.keyCode) {
                case 16:
                  that.isshift = false;
                  break;
              }
            };
        };
        handleShiftSelect(val){
            let selection=[]
            if(this.isshift) {
              selection = this.shiftSelect(this.tableData, val, this.$refs.ShiftSelectRef);
            } else {
              selection = val;
            } 
             this.$emit('handSfileSelected', selection)           
        }
       
        created(){            
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 363;
                })()
            };
            this.keyevent();
        };
    }
</script>
<style lang="scss" scoped> 
</style>
