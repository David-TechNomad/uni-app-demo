<template>
            <el-table
              :data="tableData"
              border
              :height="bodyHeight"
              element-loading-text="努力加载中..."
              header-row-class-name="tableHeader"
              :empty-text="libId && libId.length>0?'暂无数据':'请选择案卷库'" 
              stripe
              highlight-current-row
              v-loading="loading"
              class="defaultTable"
              @selection-change="handleShiftSelect"  
              ref="ShiftSelectRef"
               @row-dblclick="handleRowDblclick">
              <el-table-column type="selection"  width="55" v-if="tableTitle.length>0">
              </el-table-column>
              <el-table-column  prop="name" label="操作" width="180" v-if="tableTitle.length>0">
                    <template slot-scope="scope">                                                 
                        <el-button class="tabletoolBtn" @click="handSelected(scope.row)" v-if="activeName=='file'">查看卷内文件</el-button>
                        <el-button class="tabletoolBtn" v-if="activeName=='file'" @click="gotopage('newly/newlywenjian','fileEdit',scope.row.id, libId, scope.$index)">编辑</el-button>
                        <el-button class="tabletoolBtn" v-if="activeName=='Ingroupfile'" @click="gotopage('newly/newlywenjian','IngroupfileEdit',scope.row.id, libId, scope.$index)">编辑</el-button>
                        <el-button class="tabletoolBtn" v-if="activeName=='Ungroup'" @click="gotopage('newly/newlywenjian','documentsEdit',scope.row.id, libId, scope.$index)">编辑</el-button>                         
                    </template>                 
              </el-table-column>  
              <el-table-column :prop="title.fieldName" :label="title.caption" :width="title.width" v-for="title,index in tableTitle" :key="index" v-if="!(title.hidden)">
                   <template slot-scope="scope">                     
                        <span v-if="title.fieldName=='ATTACHED_FILE_FLAG'"> <i class="fa fa-paperclip tableIcon" v-if="scope.row.ATTACHED_FILE_FLAG"></i> </span>
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
    import Service from './arrangetable.service';
    import {
        State,
        Getter,
        Action,
        Mutation,
        namespace
    } from 'vuex-class'      
    @Component
    export default class arrangeTable extends Vue{  
        @State('arrangBackId') BackId 
        @Mutation('SET_ArrangBackId') setBackId
        @State('arrangBackScroll') BackScroll
        @Mutation('SET_arrangBackScroll') setBackScroll 
        
        bodyHeight: number= document.documentElement.clientHeight - 363 ;
        tableTitle:any = [];    
        tableData: any =[];
        activeName:string; 
        libId:any = [];
        loading: Boolean= false;
        isshift: Boolean;
        IngroupfileID:any=[] ;
        activeTd: number;
        AimTable: any;
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
            this.gotopage('newly/newlywenjian',name,row.id, this.libId,'');
        };
        gotopage(page, type, id, libIdObj, currentIdOrder){
          //判断是案卷级编辑还是文件级编辑
          let libId;
          if(type === 'findFile' || type === 'fileEdit') {
              libId=libIdObj.filter(function (item) {
                return item.rank === 3;
            });
          } else {
              libId=libIdObj.filter(function (item) {
                return item.rank === 4;
            });
          }   
          this.setBackScroll(this.AimTable.scrollTop);
          this.$refs.ShiftSelectRef['setCurrentRow'](this.tableData[currentIdOrder]);      
            this.$router.push({
                path:'/fileArrange/arrange/'+page,
                name:'整理编目新增文件页面',
                params: {
                    from: type,
                    id:id ? id:'',
                    libId:libId[0].id ? libId[0].id : '',
                    categoryCodeValue:libId[0].categoryCodeValue,
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
                this.tableTitle =  res.data.data;
                 if(this.BackId!=""){                     
                        let activeTd = this.BackId
                        this.activeTd = activeTd;
                        this.setBackId('');
                  }
                  if(this.activeName!='Ingroupfile'){
                      this.getTable(id)
                    }else{
                      let juannelibid；
                      if(this.libId.length!=0){
                          this.libId.forEach(row =>{
                              if(row.rank == 3){
                                juannelibid = row.id
                              }
                          })  
                          this.getjuanneiTable(juannelibid)
                      }
                     
                  }
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
            let that = this      
            let params={
                "phase": 2,
                "archiveAgentCode": this.$parent.archiveAgentCode,
                "libId": val,
                "searchKey": this.$parent.searchKey,
                "pageCondition": {
                    "page": this.$parent.page ,
                    "pageSize": this.$parent.pageSize,
                    "sort": ""
                }
            };
            Service. getArchiveList(params).then(res=>{
                  if(res.data && res.data.succeeded){ 
                    this.tableData =  res.data.data; 
                    this.loading=false; 
                    this.$nextTick(()=>{
                        setTimeout(()=>{
                            that.AimTable.scrollTop = that.BackScroll ? that.BackScroll : 0;
                            var index = null;
                            for(var key in that.tableData){
                                if(this.tableData[key].id==that.activeTd){
                                    index = key;
                                    break;
                                }
                            };
                            that.$refs.ShiftSelectRef['setCurrentRow'](that.tableData[index]);
                        });                       
                    })
                    this.$parent.total = res.data.totalRecords
                  }else{
                    this['$message']({
                    message: '查询列表失败！',
                    type: 'error'
                    })
                  }
                 
            });
        };
        //获取卷内
          getjuanneiTable(val){              
            let params={
                "phase": 2,
                "archiveAgentCode": this.$parent.archiveAgentCode,               
                "anJuanLibId": val,
                "anJuanIds": this.IngroupfileID,
                "searchKey": this.$parent.searchKey,
                "pageCondition": {
                    "page": this.$parent.page ,
                    "pageSize": this.$parent.pageSize,
                    "sort": ""
                }
            };
            Service.searchJuanNei(params).then(res=>{               
                  if(res.data && res.data.succeeded){
                    this.tableData =  res.data.data.data;
                    this.$parent.total = res.data.data.totalRecords;
                    this.AimTable.scrollTop=0;
                    this.loading = false;
                  }else{
                    this['$message']({
                      message: '查询案卷列表失败！',
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
        handSelected(row){                
               this.setBackId(row.id);
               this.IngroupfileID=[];
               this.IngroupfileID.push(row.id);
               this.getDispField(this.libId,'Ingroupfile')          
               this.$emit('handfileSelected', row);
               this.setBackScroll(this.AimTable.scrollTop);
        };
        activated(){ 
          this.$nextTick(() => { 
              this.bodyHeight = document.documentElement.clientHeight - 363;
              this.AimTable = this.$refs.ShiftSelectRef['bodyWrapper'];  
              let headerWrapperHeight = this.$refs.ShiftSelectRef['$refs'].headerWrapper.clientHeight;
              this.AimTable.style.height = this.bodyHeight - headerWrapperHeight + 'px';
              this.AimTable.style.overflow = 'auto';
              this.AimTable.scrollTop = this.BackScroll;
          });
        };
        created(){            
        };
        mounted(){
          let self = this;
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 363;
                })()
            };
            self.keyevent();
            self.AimTable = self.$refs.ShiftSelectRef['bodyWrapper'];
            // self.AimTable.addEventListener('scroll',()=>{ 
            //     debugger;
            //    if(self.activeName!=="Ingroupfile"){
            //       self.setBackScroll(self.AimTable.scrollTop) 
            //    }
            // });
        };
    }
</script>
<style> 

</style>
