<template>
    <!-- <section> -->
        <el-dialog title="上传任务管理" :visible.sync="cloudUploadManagementVisible" class="cloudUploadManagementRef" :close-on-click-modal="false" :before-close="beforeCloseReset" width='90%' height='100%'>
        <div class="mainTitle" style="position: absolute;top: 36px;right: 43px;z-index:1; ">
            <!-- <span>云盘管理 >  上传任务管理</span> -->
            <div class="rt">
                <!-- <el-button class="defaultBtn mt10" @click="goBack">返回</el-button> -->
                <el-button class="defaultBtn mt10" @click="addPreCleanSetVisible = true">全部继续</el-button>    
                <el-button  v-show="activeName==='0'" @click="deleteAllFileUploads()" class="defaultBtn mt10">清空全部文件</el-button>
                <el-button v-show="activeName==='1'" @click="deleteAllFileUploads()" class="defaultBtn mt10">清空已完成文件</el-button>
                <el-button class="defaultBtn mt10" @click="addPreCleanSetVisible = true">全部暂停</el-button>   
           </div>
        </div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow mainBorrowTop">
                <div class="formData">
                    <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="erpTab">
                        <el-tab-pane :label="tabName0" name="0"></el-tab-pane>
                        <el-tab-pane :label="tabName1" name="1"></el-tab-pane>
                        <el-tab-pane :label="tabName2" name="2"></el-tab-pane>
                    </el-tabs>
                </div>
                <!-- // 正在上传 -->
                    <div class="mainCon basicList pd10" v-show="DaoRu">
                       <div class="">
                           <el-table border stripe :height="bodyHeight" :data="cloudUploadDataList" highlight-current-row v-loading="listLoading" class="defaultTable" header-row-class-name="tableHeader">
                                <el-table-column
                                    type="selection"
                                    width="55">
                                </el-table-column>
                                <el-table-column type="index" width="50" label="序号"></el-table-column>
                                <el-table-column  label="操作"  width="100">
                                    <template slot-scope="scope">
                                        <el-button class="tabletoolBtn" @click="lastToFiles(scope.row)">继续上传</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="originalFileName" label="文件名称">
                                </el-table-column>
                                <el-table-column  prop="creationDate" label="上传时间" :formatter="dateFormat">
                                </el-table-column>
                                <el-table-column  prop="name" label="云盘位置">
                                    <template slot-scope="scope">                                                 
                                        <span>{{scope.row.data.cloudDirId}}</span>                      
                                    </template>
                                </el-table-column>
                                <el-table-column  prop="name" label="状态">
                                    <template slot-scope="scope">      
                                        <div v-if="scope.row.data.status!=='ProcessError'">
                                         <span v-if="scope.row.conCateStatus==='UploadError'" style="color:red">上传失败</span>
                                         <div v-else>
                                             <el-progress v-if="scope.row.data.status === 'Uploading'" :text-inside="false" :stroke-width="7" :percentage="scope.row.process" ></el-progress>
                                             <!--<span v-if="scope.row.data.pauseStatus&&!scope.row.Concate" style="color:orange">暂停中，上传至 <span style="color:green;">{{scope.row.process}}%</span></span>-->
                                             
                                             <span v-else-if="scope.row.data.status === 'Paused'">暂停中，上传至 <span style="color:green;">{{scope.row.process}}%</span></span>
                                             <span v-else-if="scope.row.data.status === 'Start'">开始上传</span>
                                         </div>
                                     </div>
                                     <div v-else style="color:red">
                                         <span>上传完成，后续处理失败</span>
                                     </div>                 
                                    </template>
                                </el-table-column>
                            </el-table>
                         <!--工具条分页-->
                        <!-- <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="100"
                                        layout="total, sizes, prev, next, jumper"
                                        :total="cloudUploadDataList.length">
                                        </el-pagination>
                                    </div> -->
                    </div>
                </div>

                <!-- 传输完成 -->
                <div class="pd10" v-show= "GuaJie">
                    <div class="">
                    <el-table border stripe :height="bodyHeight" :data="cloudUploadDataDoneList" highlight-current-row v-loading="listLoading" class="defaultTable" header-row-class-name="tableHeader">
                                <el-table-column type="index" width="50" label="序号"></el-table-column>
                                <el-table-column prop="originalFileName" label="文件名称">
                                </el-table-column>
                                <el-table-column  prop="creationDate" label="上传时间" :formatter="dateFormat">
                                </el-table-column>
                                <el-table-column  prop="name" label="云盘位置">
                                    <template slot-scope="scope">                                                 
                                        <span>{{scope.row.data.cloudDirId}}</span>                      
                                    </template>
                                </el-table-column>
                                <el-table-column  prop="name" label="状态">
                                    <template slot-scope="scope">  
                                        <span>已完成</span>                    
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
                                        :total="cloudUploadDataDoneList.length">
                                        </el-pagination>
                                    </div>
                    </div>
                </div>
                <!-- 传输失败 -->
                <div class="pd10" v-show= "uploadError">
                    <div class="">
                    <el-table border stripe :height="bodyHeight" :data="cloudUploadDataErrorList" highlight-current-row v-loading="listLoading" class="defaultTable" header-row-class-name="tableHeader">
                                <el-table-column type="index" width="50" label="序号"></el-table-column>
                                <el-table-column  label="操作"  width="100">
                                    <template slot-scope="scope">
                                        <el-button class="tabletoolBtn" @click="lastToFiles(scope.row)">重新上传</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="originalFileName" label="文件名称">
                                </el-table-column>
                                <el-table-column  prop="creationDate" label="上传时间" :formatter="dateFormat">
                                </el-table-column>
                                <el-table-column  prop="name" label="云盘位置">
                                    <template slot-scope="scope">                                                 
                                        <span>{{scope.row.data.cloudDirId}}</span>                      
                                    </template>
                                </el-table-column>
                                <el-table-column  prop="name" label="状态">
                                    <template slot-scope="scope">  
                                        <span v-if="scope.row.data.status === 'UploadError'" style="color:red;">上传失败</span>  
                                        <span v-else-if="scope.row.data.status === 'Unknown'" style="color:orange">未知错误</span>
                                        <span v-else-if="scope.row.data.status === 'ProcessError'" style="color:orange">处理错误</span>                  
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
                                        :total="cloudUploadDataErrorList.length">
                                        </el-pagination>
                                    </div>
                    </div>
                </div>
        </div>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button class="defaultBtn" @click="beforeCloseReset">关闭</el-button>
    </div>
</el-dialog>
      
    <!-- </section> -->
</template>

<script lang = "ts">
// import Vue from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// import Component from 'vue-class-component';
import Service from './cloudUploadManagement.service';
import Sltable from '@/components/tablePlug/tablePlug.vue';
import HttpRequest from '@/api/request';
import moment from 'moment';
import { Loading } from 'element-ui';
import mockData from '@/mock/data/mockData';
Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
 @Component({
        components: { 
            Sltable
        },
    })  
    export default class importList extends Vue{
        @Prop({}) 
        cloudUploadDataDoneList: Array;
        @Prop({}) 
        cloudUploadDataErrorList: Array;
        @Prop({}) 
        cloudUploadDataList: Array;
        cloudUploadManagementVisible: boolean = false;
        windowHeight: number;
        Url:string;
        bodyHeight: number;
        timer: boolean;
        listLoading: boolean;
        visibleAble : boolean;
        DaoRu : boolean;
        GuaJie : boolean;
        uploadError: boolean;
        LookUp: boolean;
        tabName0: string= '';
        cloudDirId: string= '';
        tabName1 : string= '';
        tabName2 : string= '';
        start: number;
        clientId:string = '5ff2443c1e5acd8bf4973d7adfbb638b';
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
        mockList: any = []
        // cloudUploadDataDoneList: any = []
        // cloudUploadDataList: any = []
        // cloudUploadDataErrorList: any = []
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
        // @Watch('cloudUploadDataList');
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
                selection:true
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
            this.page = 1;//移交页码
            this.limit = 25;
            this.Pstart = 0;
            this.Ptotal = 0;//总条数
            this.Ppage = 0;//移交页码
            this.Plimit = 25;
            this.LookUp = false;
            this.listLoading = false;
            this.visibleAble = false;
            this.DaoRu = true;
            this.uploadError = false;
            this.Url = HttpRequest['URLS'];
            this.GuaJie = false;
            this.activeName = 0;
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
                fondName:'',
                createDateStart:'',
                createDateEnd:''
            };
            this.Gfilters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                fondName:'',
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
            this.mockList = mockData;
};
    goBack() {
            this['$router'].go(-1);//返回上一层
    };
    //任务导入列表  删除勾选数组
    selsChangeList(data:any){
        this.ChekList = [];
        this.ChekList = data;
        console.log(this.ChekList)
    }
     beforeCloseReset() {
        this.cloudUploadManagementVisible = false;
    };
    // 上传失败重新上传
        lastToFiles(row) {
            debugger;
            // console.log('lastToFiles----------------------------');
            row.Concate = false;//挂接中状态
            row.done = false;//挂接完成
            row.data.pauseStatus = false;
            row.isPrepare = true;
            row.isStart = true;
            row.process = 0;
            row.data.restStatus = true;
            row.conCateStatus = 'Start';
            for (let data of this.cloudUploadDataList) {
                if (data.originalFileName === row.originalFileName && data.originalFileSizeInBytes === row.originalFileSizeInBytes) {
                    data = row;
                }
            }
            this.cloudUploadDataList.remove(row);
            this.cloudUploadDataList.push(row);
            let att = [];
            this.$parent.arrsStart.push(row);
            this.$parent.arrsStart.forEach(function (item) {
                if (!item.Concate && (item.conCateStatus === 'Start' || item.conCateStatus === 'Uploading')) {
                    att.push(item)
                }
            });

            // console.log('重新上传文件')
            // console.log(this.arrsStart)
            // console.log(att)
            // console.log(this.restFiles)
            this.$parent.errorRecordList.push(row.name);
            // console.log(this.errorRecordList)
            if (att.length === 0 && this.$parent.restFiles.length === 0) {
                // console.log('resumeFiles重新上传')
                this.$parent.arrsStart.push(row);
                this.$parent.reUploadSingleFile(row);
            } else {
                // console.log('将文件加到上传队列')
                this.$parent.restFiles.push(row);
                this.$parent.updateDocumentTable();
                let t = new Date().getTime() - this.$parent.progressTime;
                if (t > 3000) {
                    // console.log('重新启动获取进度任务');
                    this.$parent.getProcess();
                }
            }
        }
        // 全部清空
        deleteAllFileUploads(){
            // console.log('deleteAllFileUploads----------------------------');
            // 传输中
            if(this.activeName=='0'){
                    if(this.cloudUploadDataList.length===0 && this.cloudUploadDataDoneList.length===0 && this.cloudUploadDataErrorList.length===0){
                        this['$message']({
                            message: '暂无需要删除的文件。',
                            type: 'warning'
                        });
                    }else{
                        this['$confirm']('确认删除选中文件吗？', {
                            type: 'warning'
                        }).then(() => {
                            this.listLoading = true;
                            Service.searchUpload({},this.clientId,'clearAll').then((res) =>{
                                if(res.data && res.data.succeeded) {
                                    this.listLoading = false;
                                    this['$store'].commit('SET_isShow', false);
                                    // this.allProcessInit = true;
                                    // this.isDelete = true;
                                    // this.getFilesA();
                                    this.cloudUploadDataList = [];
                                    this.cloudUploadDataDoneList = [];
                                    this.cloudUploadDataErrorList = [];
                                    this.$parent.getUploadFilesOfCloud(this.cloudDirId);
                                    
                                    this['$message']({
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                } else {
                                    this['$message']({
                                        message: '删除失败',
                                        type: 'error'
                                    });
                                    this.listLoading = false;
                                }
                                
                            });
                        });
                    }
                // 传输完成
            }else if((this.activeName=='1')){
                if(this.cloudUploadDataDoneList.length===0){
                    this['$message']({
                        message: '暂无需要删除的文件。',
                        type: 'warning'
                    });
                }else{
                    this['$confirm']('确认删除选中文件吗？', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        Service.searchUpload({},this.clientId,'clearFinishedFiles').then((res) =>{
                            if(res.data && res.data.succeeded) {
                                this.listLoading = false;
                                this['$store'].commit('SET_isShow', false);
                                // this.allProcessInit = true;
                                // this.getFilesA();
                                this.$parent.getUploadFilesOfCloud(this.cloudDirId);
                                this.cloudUploadDataDoneList = [];
                                this.listLoading = false;
                                this['$message']({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            } else {
                                 this['$message']({
                                    message: '删除失败',
                                    type: 'error'
                                });
                                this.listLoading = false;
                            }
                        });
                    });
                }
            }
        };
    // 取得指定云盘文件夹的上传任务列表
    getUploadFilesOfCloud (cloudDirId) {
        // debugger;
        var that = this;
        
        Service.getUploadFilesOfCloud({},this.clientId,cloudDirId).then((res) =>{
            let arr = [] ;
            for(var item in res.data.data.pendingFiles) {
                res.data.data.pendingFiles[item].prepareId = item
                arr.push(res.data.data.pendingFiles[item]);
            }
            that.$parent.documentTableData = res.data.data;
            that.cloudUploadDataList= arr.filter(function (item) {
                return item.data.status === 'Start' || item.data.status === 'Uploading' || item.data.status === 'Paused' || item.data.status === 'Processing';
            });
            that.$parent.documentTableDataB = that.cloudUploadDataList
            that.cloudUploadDataDoneList= arr.filter(function (item) {
                return item.data.status === 'Done';
            });
            that.cloudUploadDataErrorList = arr.filter(function (item) {
                return item.data.status === 'UploadError' || item.data.status === 'ProcessError' || item.data.status === 'ProcessError' || item.data.status === 'Unknown';
            });
            console.log(that.cloudUploadDataDoneList);
            
        });
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
            // this.GuaChekList = [];
            this.DaoRu = true;
            this.GuaJie = false;
            this.uploadError = false;
            // this.filters.createDateStart= ''
            // this.filters.createDateEnd =''
            // this.filters.fondName =''
            // this.page = 0;
            // this.limit = 25;
            // this.getFiles();
            // this.searchTasks()
        }else if(tab.name == 1){
            // this.Gfilters.fondName = '';
            // this.taskStatus = '';
            // this.Gfilters.createDateStart = ''
            // this.Gfilters.createDateEnd = ''
            // this.Ppage = this.Ppage;
            // this.Plimit = this.Plimit;
            this.DaoRu = false;
            this.GuaJie = true;
            this.uploadError = false;
            // this.searchTasks()
        }else {
            this.uploadError = true;
            this.DaoRu = false;
            this.GuaJie = false;
            // Service.exporttask({}).then(res=>{
            //     if(res.data.succeeded){
            //      this.DaoChuData = res.data.data.reverse();
            //     }else{
            //         this['$message']({
            //             type: 'error',
            //             message: res.data.errorMessage
            //         });
            //     }
            // })
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
            var date = row.creationDate;
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
    downLoad(id){//下载当前错误文件
        window.location.href = this.Url+'/dataImporter/downLoadError?taskId='+id;
    }
    dataCheckeds(){//任务列表查询
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
        Service.Pdetails(id).then(res=>{
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
                Service.Pdelete(arr).then(res=>{
                    if(res.data.succeeded == true){
                        this['$message']({
                            type: 'success',
                            message: '删除成功'
                        });
                        // clearInterval(this.MySet1);
                        // clearInterval(this.MySet);
                        this.searchTasks()
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
    inters(){
        clearInterval(this.MySet)
        clearInterval(this.MySet1)
    }
    //批量挂接
    searchTasks(){
        if(this.taskStatus == ''){
            Service.searchTasks({
                    "startDate":this.Gfilters.createDateStart,
                    "endDate":this.Gfilters.createDateEnd,
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
              
            })
        }else{
            Service.searchTasks({
                    "startDate":this.Gfilters.createDateStart,
                    "endDate":this.Gfilters.createDateEnd,
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

            })
        }
                  
    }
    GetProgress(){
        let that  = this;
        let zrr;
        Service.getProgress(this.arr).then(res=>{
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
                            this.arr.sort();
                            for(let i=0;i<this.arr.length;i++){
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
    created(){
        Array.prototype['remove'] = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };   
        let params;
        params = this.$route.params;
        if(params.cloudDirId) {
            sessionStorage.removeItem('cloudDirId');
            sessionStorage.setItem("cloudDirId", JSON.stringify(params)); //把上个页面的路由带过来的参数保存到sessionStorage 
        } else {
            params = JSON.parse(sessionStorage.getItem("cloudDirId"));
        }
        this.cloudDirId = params.cloudDirId;
        // this.getUploadFilesOfCloud(params.cloudDirId);  
        // console.log('=========123456789'+this.cloudUploadDataList);       
    };
    mounted(){
        console.log(mockData);
        window.onresize = () => {
            return (() => {
                this.bodyHeight = document.documentElement.clientHeight-250;
            })()
        };
        // this.getFiles();
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
    
    // beforeRouteEnter(to,from,next){
    //       next(vm=>{
    //         vm.searchTasks()
    //     })
    // }
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
  body {
        >>>.uploader-btn{
            line-height: 1;
        }
        >>>.uploader-btn:hover{
            background: #2b87c6;
        }
  } 
</style>