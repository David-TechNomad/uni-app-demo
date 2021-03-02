<template>
    <section>
        <div class="mainTitle">
            <span>批量挂接任务</span>
            <el-button class="defaultBtn rt mt10" @click="back">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow mainBorrowTop">
                    <!-- 任务列表 查询 -->
                    <div class="searchKey boxshow">
                        <el-form  :inline="true" :model="Gfilters" class="doneForm topParamsForm" v-show="DaoRu">
                            <el-form-item label="挂接状态">
                                <el-select v-model="Gfilters.taskStatus" placeholder="请选择任务状态" @change="selectGet" style="width:85%" size="small">
                                    <el-option v-for="ind in taskStatusList" :label="ind.value" :value="ind.key"></el-option>
                                </el-select>
                            </el-form-item>
                             <el-form-item class="" label="导入日期" ref="year">
                                <el-date-picker size="small" type="date" @change="PchangeDate" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="Gfilters.createDateStart"></el-date-picker>
                                <span style="margin:0 10px">至</span>
                            <!-- <el-date-picker type="date" @change="changeDate1" :picker-options="dateOptions" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filters.appEndDate" ref="endDate"></el-date-picker>  -->
                                <el-date-picker size="small" type="date" @change="PchangeDate1" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="Gfilters.createDateEnd" ref="endDate"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="defaultBtn"  @click="dataCheckeds" type="primary">检索</el-button>
                            </el-form-item>
                            <div class="clear"></div>
                        </el-form>
                    </div>
                    <div class="mainCon basicList pd10 boxshow bgwhite" v-show="DaoRu">
                       <div class="">
                           <el-table
                                :data="resetData"
                                border
                                :height="bodyHeight -30"
                                element-loading-text="努力加载中..."
                                header-row-class-name="tableHeader" 
                                stripe 
                                class="defaultTable">
                                <el-table-column  prop="name" label="操作"  width="150">
                                        <template slot-scope="scope">                                                 
                                            <el-button class="tabletoolBtn" @click="guaJieDetail(scope.row,scope.row.id)">详情</el-button>
                                            <el-button class="tabletoolBtn" @click="deleteClick(scope.row.id)">删除</el-button>  
                                        </template>
                                </el-table-column>
                                <el-table-column prop="createDate" :formatter="dateFormat1" label="操作时间">
                                </el-table-column>
                                <el-table-column prop="cloudDirectoryName" label="目标位置">                                      
                                </el-table-column>
                                <el-table-column prop="totalItemsCount" label="匹配数量">                                      
                                </el-table-column>
                                <el-table-column prop="taskStatus" label="挂接状态">
                                    <template slot-scope="scope">                     
                                        <el-progress v-if="scope.row.taskStatus === '2'" :percentage="scope.row.progress"></el-progress>  
                                        <span v-else >{{scope.row.taskStatusText }}</span>                    
                                    </template>
                                </el-table-column>                     
                            </el-table>
                         <!--工具条分页-->
                        <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="100"
                                        layout="total, sizes, prev, next, jumper"
                                        :total="400">
                                        </el-pagination>
                                    </div>
                    </div>
                </div>

                <!-- 批量挂接 -->
                <div class="pd10 boxshow bgwhite" v-show= "GuaJie">
                    <div class="">
                    <el-table style="width: 100%" border stripe :height="bodyHeight-70" :data="processTypeData" highlight-current-row v-loading="listLoading" class="defaultTable" header-row-class-name="tableHeader" @selection-change="selsChangeList">
                            <el-table-column type="selection" width="55" label="#"></el-table-column>
                            <template v-for="(item, index) in dataHead">
                                 <el-table-column  :prop="item.prop" :label="item.name" :key="index">
                                 </el-table-column>
                            </template>
                        </el-table>
                         <!--工具条分页-->
                        <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="100"
                                        layout="total, sizes, prev, next, jumper"
                                        :total="400">
                                        </el-pagination>
                                    </div>  
                    </div>
                </div>
        </div>
    </div>
      
      <!-- 查看 -->
        <el-dialog class="myDialogCenter" title="批量挂接" :visible.sync="visibleAble" :close-on-click-modal="true">
           <p style="padding:10px 15px;">匹配成功{{totalItemsCount}}条  挂接成功{{succeededItemsCount}}条</p>
            <div class="mainCon basicList">
                    <div class="borderTable waitTable">
                        <el-table style="width: 100%" stripe :height="bodyHeight - 150" :data="fileData" header-row-class-name="tableHeader"  highlight-current-row v-loading="GualistLoading" class="defaultTable">
                            <el-table-column :show-overflow-tooltip="true" prop="cloudFileName" label="文件名称">
                            </el-table-column>
                            <el-table-column :show-overflow-tooltip="true" prop="statusText" label="挂接状态">
                            </el-table-column>
                        </el-table>
                    </div>
            </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button class="defaultBtn" @click="submitForm1('ruleForm')">确定</el-button>
            </div>
        </el-dialog>

    <taskDetailDialog ref="taskDetailDialogRef" ></taskDetailDialog>
    </section>
</template>

<script lang = "ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Sltable from '@/components/tablePlug/tablePlug.vue';
import HttpRequest from '@/api/request';
import moment from 'moment';
import Service from '@/views/fileArrange/arrange/batchMount/taskList.service';
import { Loading } from 'element-ui';
import taskDetailDialog from './taskDetailDialog'
Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
 @Component({
        components: { 
            Sltable,
            taskDetailDialog
        },
    })  
    export default class importList extends Vue{
        windowHeight: number;
        Url:string;
        bodyHeight: number;
        timer: boolean;
        listLoading: boolean;
        visibleAble : boolean;
        taskStatusList:any = [];
        loadingInstance:any={};
        DaoRu : boolean;
        GuaJie : boolean;
        LookUp: boolean;
        archiveAgentCode:string;
        start: number;
        total: number;
        page: number;
        limit: number;
        Pstart: number;
        Ptotal: number;
        Ppage: number;
        Plimit: number;
        createPersonLike:string;
        succeededItemsCount:string;
        totalItemsCount:string;
        obj:any = {}
        activeName: number;
        taskStatus:string;
        listData : any = []
        fileData:any = []
        GuaData :  any = [];
        filters: any = {};
        Gfilters:any = {};
        dateOptions: any = {};
        dateOptionsA: any = {};
        PdateOptions: any = {};
        PdateOptionsA: any = {};
        ChekList:any = [];
        checkArr:any = [];
        GuaChekList:any = [];
        checkBrr:any = [];
        MySet:any;
        MySet1:any;
        progressShow:boolean;
        num:number;
        num1:number;
        inter:boolean;
        deleteClickFlag:boolean;
        arr:any = [];
        resetData:any = [];
        GualistLoading:boolean;
        brr:any = [];
        drr:any = [];
        prnum:number;
        DaoChu:boolean;
        dataTotal: any = {
                tableData:[{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                }],
                 tableKey: [{
                    name: '文件类型',
                    value: 'date',
                    width: 300,
                },{
                    name: '档号',
                    value: 'name',
                    width: 300,
                },{
                    name: '所属单位',
                    value: 'address',
                },{
                    name: '全宗',
                    value: 'address',
                },{
                    name: '密级',
                    value: 'address',
                }],
                // Operation:true,
                // OperationData:[{
                //     icon: "el-icon-edit",
                //     name: "编辑",
                //     onClick: function (node) {
                //         alert("编辑")
                //     }
                //     },
                //     {
                //     icon: "el-icon-delete",
                //     name: "删除",
                //     onClick: function (node) {
                //         alert("删除")
                //     }
                //     },
                //     ]
            };
        DaoChuData:any=[];
         processTypeData: any = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
        processTypeData2: any = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
        dataHead: any = [{
          id: '1',
          name: '文件类型',
          prop:'address'
        }, {
          date: '2',
          name: '档号',
          prop: 'date'
        }, {
          date: '3',
          name: '所属单位',
          prop:'address'
        }, {
          date: '4',
          name: '全宗',
          prop:'address'
        }, {
          date: '5',
          name: '控制标识',
          prop:'address'
        }, {
          date: '6',
          name: '密级',
          prop:'name'
        }];
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight-250;
            this.timer = false;
            this.start = 0;
            this.total = 0;//总条数
            this.page = 0;//移交页码
            this.limit = 25;
            this.Pstart = 0;
            this.Ptotal = 0;//总条数
            this.Ppage = 0;//移交页码
            this.Plimit = 25;
            this.loadingInstance = null;
            this.taskStatusList = [];
            this.LookUp = false;
            this.listLoading = false;
            this.visibleAble = false;
            this.DaoRu = true;
            this.Url = HttpRequest['URLS'];
            this.GuaJie = false;
            this.activeName = 0;
            this.archiveAgentCode = window.sessionStorage.getItem('archiveAgentCode');
            this.succeededItemsCount = '';
            this.totalItemsCount =''
            this.createPersonLike = '';
            this.inter = true;
            this.deleteClickFlag = true;
            this.obj={
                fondId:''
            }
            this.dateOptions = {

            };
            this.dateOptionsA = {

            };
            this.PdateOptions = {

            };
            this.PdateOptionsA = {

            };
            this.filters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                taskStatus:'',
                createDateStart:'',
                createDateEnd:''
            };
            this.Gfilters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                fondName:'',
                taskStatus:'',
                createDateStart:'',
                createDateEnd:''
            }
            this.listData = [
                
            ]
            this.GuaData = [
                
            ]
            this.fileData = [

            ];
            this.ChekList = [];
            this.GuaChekList = [];
            this.checkBrr = [];
            this.MySet = null;
            this.MySet1 = null;
            this.progressShow = false;
            this.num = 0;
            this.num1 = 0;
            this.arr = [];
            this.resetData = [];
            this.GualistLoading = false;
            this.brr = [];
            this.prnum = 0;
            this.DaoChu = false;
            this.DaoChuData = [];
};
    back(){
        this['$router'].go(-1);
    }
    //任务导入列表  删除勾选数组
    selsChangeList(data:any){
        this.ChekList = [];
        this.ChekList = data;
        console.log(this.ChekList)
    }
     // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        }
    //任务导入列表 删除
    deleteList(){
        this.checkArr = [];
        for(let item of this.ChekList){
                this.checkArr.push(item.id);
            }
        if(this.checkArr.length == 0){
            this['$message']({
                type: 'error',
                message: '请选择要删除的数据。'
            });
        }else{
             this['$confirm']('确认删除选中目录吗？', {
                    type: 'warning'
                }).then(() => {
                     Service.deleteImportTask({
                        taskIds:this.checkArr.join()
                    }).then(res=>{
                        if(res.data.succeeded){
                            this['$message']({
                                type: 'success',
                                message: '删除成功。'
                            });
                            this.page = this.page-1;
                            this.getFiles()
                        }else{
                                this['$message']({
                                    type: 'error',
                                    message: res.data.errorMessage
                                });
                            
                        }
                    })
                });
        }
    }
    //批量挂接  删除勾选数组
    GuaselsChangeList(data:any){
        if(data.length>0){
            this.GuaChekList = data;
        }
        console.log(this.GuaChekList);
    }
    showTaskDetail(){
        this.$nextTick(() => {
            this.$refs['taskDetailDialogRef'].taskDetailVisible = true;           
        });
    };
    //批量挂接  删除
    GuadeleteList(){
        this.checkBrr = [];
        for(let item of this.GuaChekList){
                this.checkBrr.push(item.id);
            }
        if(this.checkBrr.length == 0){
            this['$message']({
                type: 'error',
                message: '请选择要删除的数据。'
            });
        }else{
             this['$confirm']('确认删除选中目录吗？', {
                    type: 'warning'
                }).then(() => {
                     Service.Pdelete(
                        this.checkBrr
                        ).then(res=>{
                            if(res.data.succeeded){
                                this['$message']({
                                    type: 'success',
                                    message: '删除成功。'
                                });
                                if(this.Ppage == 0){
                                    this.Ppage = 0;
                                }else{
                                    this.Ppage = this.Ppage-1;
                                }
                                this.searchTasks();
                            }else{
                                this['$message']({ 
                                    type: 'error',
                                    message: res.data.errorMessage
                                });
                            }
                        })
                });
             
        }
    }

    //批量挂接 挂接状态
    selectGet(value){
        this.taskStatus = value;
    }
    handleCurrentChange(val) {
                this.page = val-1;
                this.start = (val-1)*(this.limit);
                this.chaXunList();
            };
    handleSizeChange(val) {
                this.limit = val;
                this.start = val*(this.page);
                this.chaXunList();
            };
    PhandleCurrentChange(val) {
                this.Ppage = val-1;
                this.Pstart = (val-1)*(this.Plimit);
                this.searchTasks();
            };
    PhandleSizeChange(val) {
                this.Plimit = val;
                this.Pstart = val*(this.Ppage);
                this.searchTasks();
            };
    handleClick(tab){
        if(tab.name == 0){
            this.GuaChekList = [];
            this.DaoRu = true;
            this.GuaJie = false;
            this.DaoChu = false;
            this.filters.createDateStart= ''
            this.filters.createDateEnd =''
            this.filters.fondName =''
            this.page = 0;
            this.limit = 25;
            this.getFiles();
            this.searchTasks()
        }else if(tab.name == 1){
            this.Gfilters.fondName = '';
            this.taskStatus = '';
            this.Gfilters.createDateStart = ''
            this.Gfilters.createDateEnd = ''
            // this.Ppage = this.Ppage;
            // this.Plimit = this.Plimit;
            this.DaoRu = false;
            this.GuaJie = true;
            this.DaoChu = false;
            this.searchTasks()
        }else {
            this.DaoChu = true;
            this.DaoRu = false;
            this.GuaJie = false;
            Service.exporttask({}).then(res=>{
                if(res.data.succeeded){
                 this.DaoChuData = res.data.data.reverse();
                }else{
                    this['$message']({
                        type: 'error',
                        message: res.data.errorMessage
                    });
                }
            })
        }

    }
    //取消导出
     cancelExport(id){
        Service.exporttaskcancel(id).then(res=>{
            if(res.data.succeeded){
                this.DaoChuData = [];
                Service.exporttask({}).then(res=>{
                    if(res.data.succeeded){
                        this.DaoChuData = res.data.data.reverse();
                    }else{
                        this['$message']({
                            type: 'error',
                            message: res.data.errorMessage
                        });
                    }
                })
            }else{
                this['$message']({
                    type: 'error',
                    message: res.data.errorMessage
                });
            }
        })
     };
     confirmExport(row){
         window.location.href = this.Url+'/exporttask/download?exportTaskId='+row.id;
         setTimeout(()=>{
             Service.exporttask({}).then(res=>{
                 this.DaoChuData = [];
                 if(res.data.succeeded){
                     this.DaoChuData = res.data.data.reverse();
                 }else{
                     this['$message']({
                         type: 'error',
                         message: res.data.errorMessage
                     });
                 }
             })
         },1000)

       // Service.exporttaskdownload({exportTaskId:row.id}).then(res=>{
       //     let data = res;
       //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
       //         var csvData =  new Blob([data]);
       //             window.navigator.msSaveOrOpenBlob(csvData,row.nodeName+'.zip');
       //     }else{
       //         let url = window.URL.createObjectURL(new Blob([data]));
       //         let link = document.createElement('a');
       //         link.style.display = 'none';
       //         link.href = url;
       //         link.setAttribute('download',row.nodeName+'.zip');
       //         document.body.appendChild(link);
       //         link.click();
       //     }
       //     this.$nextTick(()=>{
       //         Service.exporttask({}).then(res=>{
       //             if(res.data.succeeded){
       //                 this.DaoChuData = res.data.data;
       //             }else{
       //                 this['$message']({
       //                     type: 'error',
       //                     message: res.data.errorMessage
       //                 });
       //             }
       //         })
       //     })
       // })
     }
     dateFormat(row, column) {//时间格式化
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
    downLoad(id){//下载当前错误文件
        window.location.href = this.Url+'/dataImporter/downLoadError?taskId='+id;
    }
    taskStatusCandidates() {//任务状态选项下拉
        Service.taskStatusCandidates({}).then(res=>{
            if(res.data.succeeded) {
                this.taskStatusList = res.data.data;
            } 
        })
    }
    dataCheckeds(){//检索任务列表查询
        this.searchTasks();
    }
    chaXunList(){
            Service.taskList({
                        startDate:this.filters.createDateStart,
                        endDate:this.filters.createDateEnd,
                        fileName:this.filters.fondName,
                        page:this.page,
                        pageSize:this.limit,
                    }).then(res=>{
                        this.listData = res.data.data;
                        this.total = res.data.totalRecords;
                        
                       console.log(res.data.data)
            })
    }
    guaJieDetail(row,id){
        this.visibleAble = true;
        // this.succeededItemsCount = row.succeededItemsCount;
        this.GualistLoading = true;
        // this.totalItemsCount = row.totalItemsCount;
        this.fileData = [];

        Service.Pdetails({taskId:id}).then(res=>{
            if(res.data.succeeded){
                this.GualistLoading = false;
                this.fileData = res.data.data;
                this.totalItemsCount = res.data.data.length;
                this.brr = [];
                for(let i=0;i<res.data.data.length;i++){
                    if(res.data.data[i].status == 2){
                        this.brr.push(res.data.data[i].id)
                    }
                }
                // this.succeededItemsCount = brr.length;
                this.succeededItemsCount = this.brr.length;
            } else {
                this['$message']({
                    type: 'error',
                    message: res.data.errorMessage
                });
            }
        })
    }
    // 批量挂接 启动
    beginStrart(id){
        Service.Pstart(id).then(res=>{
             if(res.data.succeeded == true){
                  this['$message']({
                      type: 'info',
                      message: '当前挂接任务已经启动。'
                  });
                    // clearInterval(this.MySet1);
                    // clearInterval(this.MySet);
                    this.searchTasks();
            }
        })
    }
    //批量挂接 删除
    deleteClick(id){
        var arr = []
        arr.push(id)
        this['$confirm']('确认删除此条记录吗？', {
                type: 'warning'
            }).then(() => {
                Service.Pdelete({taskIds:arr}).then(res=>{
                    if(res.data.succeeded == true){
                        this['$message']({
                            type: 'success',
                            message: '删除成功'
                        });
                        // clearInterval(this.MySet1);
                        // clearInterval(this.MySet);
                        this.searchTasks()
                    } else {
                        this['$message']({
                            type: 'error',
                            message: res.data.errorMessage
                        });
                    }
        })
            });
       
    }
    //批量挂接  检索
    PdataCheckeds(){
        this.searchTasks();
        this.GuaData = [];
    }
    submitForm1(){
        this.visibleAble = false;
    }
    created(){ };
         
    inters(){
        clearInterval(this.MySet)
        clearInterval(this.MySet1)
    }
    //批量挂接任务列表
    searchTasks(){
        let loadingInstance = Loading.service(
            {
                lock: true,
                text: '正在查询中，请稍等',
                // spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            }
        );
        if(this.taskStatus === '' || this.taskStatus === undefined){
            Service.searchTasks({
                    "archiveAgentCode":this.archiveAgentCode,
                    "startDate":this.Gfilters.createDateStart || null,
                    "endDate":this.Gfilters.createDateEnd || null,
                    "taskStatus":null,
                    "pageCondition":{
                        "page":this.Ppage,
                        "pageSize":this.Plimit
                    }
               
            }).then(ress=>{
                let that = this;
                // this.GuaData = res.data.data;
                this.Ptotal = ress.data.totalRecords; 
                this.arr = [];
                this.resetData = [];
                // for(let int of res.data.data){
                //     int.progress = null
                // }
                for(let item of ress.data.data){
                    if(item.taskStatus == 2){
                        this.arr.push(item.id);
                    }
                }
                if(this.arr.length == 0){
                    for(var i=0;i<ress.data.data.length;i++){
                        ress.data.data[i]['progress']= null;
                    }
                    this.resetData = ress.data.data;
                    this.GuaData = this.resetData;
                }else{
                    for(var i=0;i<ress.data.data.length;i++){
                        ress.data.data[i]['progress']= null;
                    }
                    console.log(ress.data.data);
                    // let that =this;
                    // let b = ress.data.data;
                    // let c = [];//id
                    // let d = [];//整体data
                    // for(let item of b){
                    //     if(item.taskStatus == 2){
                    //         c.push(item.id);
                    //     }
                    //         d.push(item)
                    // }
    
                    this.resetData = ress.data.data;
                    // setTimeout(this.GetProgress,3000,this.arr,this.resetData);
                    this.GetProgress()
                    
                    
                 
                }
              this.$nextTick(() => { loadingInstance.close();});
            })
        }else{
            Service.searchTasks({
                    "archiveAgentCode":this.archiveAgentCode,
                    "startDate":this.Gfilters.createDateStart || null,
                    "endDate":this.Gfilters.createDateEnd || null,
                    "taskStatus":Number(this.taskStatus),
                    "pageCondition":{
                        "page":this.Ppage,
                        "pageSize":this.Plimit
                    }
               
            }).then(ress=>{
                this.arr = [];
                this.resetData = [];
                this.prnum = 0;
                if(this.taskStatus == '1'){
                    this.Ptotal = ress.data.totalRecords; 
                    this.resetData = ress.data.data;
                    this.GuaData = this.resetData;
                }else if(this.taskStatus == '3'){
                    this.Ptotal = ress.data.totalRecords; 
                    this.resetData = ress.data.data;
                    this.GuaData = this.resetData;
                    console.log(this.resetData)
                }else if(this.taskStatus == '4'){
                    this.Ptotal = ress.data.totalRecords; 
                    this.resetData = ress.data.data;
                    this.GuaData = this.resetData;
                    console.log(this.resetData)
                }else if(this.taskStatus == '2'){
                     let that = this;
                     this.Ptotal = ress.data.totalRecords;
             
                for(let item of ress.data.data){
                    if(item.taskStatus == 2){
                        this.arr.push(item.id);
                    }
                }
                if(this.arr.length == 0){
                        for(var i=0;i<ress.data.data.length;i++){
                            ress.data.data[i]['progress']= null;
                        }
                        this.resetData = ress.data.data;
                    }else{
                        for(var i=0;i<ress.data.data.length;i++){
                            ress.data.data[i]['progress']= null;
                        }
                        console.log(ress.data.data);
                        this.resetData = ress.data.data;
                        // setTimeout(this.GetProgress,3000,this.arr,this.resetData);
                        this.GetProgress();
                    }
                }
                this.$nextTick(() => { loadingInstance.close();});
            })
        }
                  
    }
    GetProgress(){
        let that  = this;
        let zrr;
        Service.getProgress({taskIds:that.arr}).then(res=>{
            if(res.data.succeeded){
                for(let ind  in res.data.data){
                    for(let int of this.resetData){
                        if(int.id == ind){
                            if(res.data.data[ind].progress == 100.00){
                                        this.progressShow = true;
                                        //   for(let i=0;i<this.arr.length;i++){
                                        //     if(this.arr[i]==ind){
                                        //     this.arr.splice(i,1)
                                        //     }
                                        //     console.log(this.arr)
                                        // }
                                        }else{
                                            int.progress = Number(res.data.data[ind].progress)
                                            this.progressShow = false;
                                        }
                            }
                        }
                        if(res.data.data[ind].total == res.data.data[ind].failed){
                            console.log('失败')
                            that.arr.sort();
                            for(let i=0;i<that.arr.length;i++){
                                if(this.arr[i]==ind){
                                this.arr.splice(i,1)
                                }else{
                                   
                                }
                            }
                            }else{
                        }
                        if(res.data.data[ind].progress == 100.00){
                            console.log('成功2')
                               this.arr.sort();
                            for(let i=0;i<this.arr.length;i++){
                                if(this.arr[i]==ind){
                                    this.arr.splice(i,1)
                                }
                            }
                        }
                        console.log(this.arr+'sssss')

                    }
                }
            })
            this.resetData = this.resetData;
            this.GuaData = this.resetData;
            console.log(this.arr+"ddddd")
            if(this.arr.length>0){
                    that.MySet = setTimeout(that.GetProgress,3000);     
            }
    }
    getFiles(){
        Service.taskList({
                        startDate:'',
                        endDate:'',
                        fileName:'',
                        page:this.page,
                        pageSize:this.limit,
                    }).then(res=>{
                        this.listData = res.data.data;
                        this.total = res.data.totalRecords; 
                        
                       console.log(res.data.data)
                    })
    }
    mounted(){
        window.onresize = () => {
            return (() => {
                this.bodyHeight = document.documentElement.clientHeight-250;
            })()
        };
        // this.getFiles();
        this.taskStatusCandidates();
    };
   // 日期开始 任务列表
    changeDate(){
            this.anaDate();
        };
    anaDate(){
            let date = new Date(this.filters.createDateStart);
            this.dateOptionsA = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600)
                    let timer =  time.getTime();
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer< date;
                }
            };
        }
        // 日期结束
    changeDate1(){
        if(!this.filters.createDateEnd){
            this.dateOptions = {
                disabledDate() {
                    return null
                }
            };
        }else{
            let date = new Date(this.filters.createDateEnd);
            this.PdateOptions = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600)
                    let timer =  time.getTime();
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer > date;
                }
            };
        }
    }
    NextTick(){
        console.log(this.GuaChekList);
         this.$nextTick(()=>{
             for(var i=0;i<this.GuaChekList.length;i++){
                 this['$refs']['pendingTable']['toggleRowSelection'](i)
             }
                        // brr.forEach(i => { 
                        //     that['$refs']['pendingTable']['toggleRowSelection'](i)
                        // })
            })
    }
    //批量挂接 日期开始
     PchangeDate(){
            this.PanaDate();
        };
    PanaDate(){
            let date = new Date(this.Gfilters.createDateStart);
            this.PdateOptions = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600)
                    let timer =  time.getTime();
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer< date;
                }
            };
        }
    // 日期结束
    PchangeDate1(){
            if(!this.Gfilters.createDateEnd){
                this.PdateOptionsA = {
                    disabledDate() {
                        return null
                    }
                };
            }else{
                let date = new Date(this.Gfilters.createDateEnd);
                this.PdateOptionsA = {
                    disabledDate(time) {
                        date.setTime(date.getTime() - 3600)
                        let timer =  time.getTime();
                        // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                        return timer > date;
                    }
                };
            }
        }
    
    beforeRouteEnter(to,from,next){
          next(vm=>{
            vm.searchTasks()
        })
    }
    // beforeRouteLeave(to,from,next){
    //     clearTimeout(this.MySet)
    //     next(vm=>{
            
            
    //     })
    // }

    computed: {
        };

}
</script>

<style lang="scss" scoped>
@import '../../../../styles/innerPublic.scss';
section{
    padding:0 10px;
    height:100%;
    .mainTitle{
      line-height:50px;
      height:50px;
      color:rgb(66,139,202);
      font-weight:500;
      font-size:16px;
      span{
        padding:0 10px;
        border-left:3px solid rgb(66,139,202);
      }
    }
    .mainDoc{
      position:absolute;
      top:50px;
      bottom:10px;
      left:0;
      right:0;
      padding:0 10px;
      .doubleForm{
        padding: 10px 10px 0 10px;
        // background:#fff;
      }
      .mainCon{
        height:100%;
        .more{
          font-size:12px;
          position:absolute;
          top:-5px;
          right:10px;
          color:#777;
          cursor:pointer;
          background:#fff;
          border:1px solid #ccc;
          border-radius:4px;
          padding:3px;
        }
        .mainBorrowBottom{
          background:rgb(249,249,249);
        }
        .borderTable{
          padding:0 10px;
          background:#fff;
          position:absolute;
          top:90px;
          left:10px;
          right:10px;
          bottom:0;
        }
      }
    }
  }
</style>