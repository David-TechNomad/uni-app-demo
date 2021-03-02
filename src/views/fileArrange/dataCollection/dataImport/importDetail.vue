<template>
    <section class="wrapprSection dataCollection">
        <div class="mainTitle">
           <span>数据采集任务详情</span>
           <el-button class="defaultBtn rt mt10" @click="Goback">返回</el-button>
        </div>   
        <div class=""> 
                          <div class="searchKey boxshow">           
                              <el-form :inline="true" >                                   
                                  <el-form-item>
                                      <el-input placeholder="请输入关键字" v-model="Gfilters.searchKey" size="small"></el-input>
                                  </el-form-item>
                                    <el-form-item>
                                      <el-button class="defaultBtn" @click="searchImportList">查询</el-button>
                                  </el-form-item>
                              </el-form>
                          </div>
                          <div class="pd10 boxshow bgwhite">
                              <el-table
                                :data="importTaskListData"
                                border
                                :height="bodyHeight"
                                element-loading-text="努力加载中..."
                                header-row-class-name="tableHeader" 
                                stripe
                                highlight-current-row
                                v-loading="loading"
                                class="defaultTable"
                                ref="ShiftSelectRef">
                                <el-table-column :prop="title.fieldName" :label="title.caption" :width="title.width" v-for="title,index in tableTitle" :key="index" v-if="!(title.hidden)">
                                    <template slot-scope="scope"> 
                                            <span v-if="title.fieldName=='ATTACHED_FILE_FLAG'"> <i class="fa fa-paperclip tableIcon" v-if="scope.row.ATTACHED_FILE_FLAG"></i> </span>
                                            <span v-if="title.dictData !== null">{{scope.row[title.fieldName + '_Text']}}</span>
                                            <span v-else>{{scope.row[title.fieldName]}}</span>                         
                                        </template>
                                </el-table-column>             
                            </el-table>
                        <!--工具条分页-->
                        <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[20, 50, 100, 200]"
                                        :page-size="20"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="importTaskListDataTotal">
                                        </el-pagination>
                                    </div>  
                         </div>                
        </div> 
     </section>
</template>
<script lang="ts">
   	import { Vue, Component } from 'vue-property-decorator'
    import Service from './importList.service' 
    import batchMountDialog from '@/views/common/bathMountDialog/batchMountDialog.vue' 
    import mockData from '@/mock/data/mockData';
    import { Loading } from 'element-ui';
    import moment from 'moment';
    @Component
    export default class arrange extends Vue{ 
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 290 ;
        importTaskListData: any = [];
        importTaskListDataTotal: number = 0;
        Gfilters:any = {};
        taskStatusList:any = [];
        total: number = 1;
        tableTitle:any = [];
        loading: Boolean= false;
         page: number = 0;
        pageSize: number = 25; 
        constructor(){
            super();
            this.taskStatusList = [];
            this.Gfilters = {
                importTaskId: null,
                searchKey:null,
                pageCondition: {
                    page: 1,
                    pageSize: 20,
                    sort: ""
                }
            }
        };
        handleCurrentChange(val:number) {
            this.Gfilters.pageCondition.page = val;
            this.importTaskList();

        };
        handleSizeChange(val:number) {
            this.Gfilters.pageCondition.pageSize = val;
            this.importTaskList();
        };
         selectGet(value){

        }
        //返回
        Goback(){
            this['$router'].go(-1);
        };
        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        };
        handleSelectionChange(val) {
            this.chooseIdS = [];
            for(let item of val) {
                this.chooseIdS.push(item.id);
            }
        }
        // 检索任务列表
        searchImportList() {
            this.importTaskList();
        }
        // 检索任务状态下拉选项
        importTaskStatusCandidates() {
            Service.importTaskStatusCandidates({}).then(res=>{               
                    if(res.data.succeeded){                     
                        this.taskStatusList = res.data.data;
                    }else{
                            this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        })
                    }
            });
        }
        //获取表格表头 
        getDispField(id, libId, phase){  
            let params={"phase":phase,"libId":libId};
            this.loading = true;          
            Service.getDispField(params).then(res=>{               
              if(res.data && res.data.succeeded){
                this.tableTitle =  res.data.data;
                //获取数据采集任务列表
                this.importTaskList()
              }else{
                this['$message']({
                message: '查询列表表头库失败！',
                type: 'error'
                })
              }
        });
            
               
        };
        //获取数据采集任务列表
        importTaskList() {
            let self = this;
            Service.getImportedData(this.Gfilters).then((res) =>{
                    if(res.data.succeeded) {
                        console.log(res.data.data);
                        this.loading=false;
                        self.importTaskListData = res.data.data;
                        self.importTaskListDataTotal = res.data.totalRecords;
                    } else {
                        self.Warn(res.data.errorMessage);
                    }
                })
        }
        //成功
        Suces(message){
            this['$message']({
                type: 'success',
                message
            })
        };
        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        }; 
        created(){ 
            let params;
            params = this.$route.params;
            if(params.importTaskId) {
                sessionStorage.removeItem('paramsImportData');
                sessionStorage.setItem("paramsImportData", JSON.stringify(params)); //把上个页面的路由带过来的参数保存到sessionStorage 
            } else {
                params = JSON.parse(sessionStorage.getItem("paramsImportData"));
            }
            this.Gfilters.importTaskId = params.importTaskId;
            // 获取表头
            this.getDispField(params.importTaskId, params.libId, params.phase);
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 290;
                })()
            };
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../../styles/innerPublic.scss';
    @import '../../../../styles/fileManage/dataCollection.scss';
</style>
