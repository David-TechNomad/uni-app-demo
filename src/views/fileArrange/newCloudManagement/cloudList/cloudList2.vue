<template>
    <section class="wrapprSection cloudListView">
        <div class="mainTitle">
           <span>云盘管理</span>
           <el-progress :text-inside="false" :stroke-width="7" :percentage="processAB" ></el-progress>
        </div>        
        <div class="treeOne tree ">
            <div class="treeTitle boxshow textBlue">
               云盘目录
                <p class="fontClass rt">
                    <i class="fa fa-plus-square" @click="treeAddTitle()"></i>
                    <i class="fa fa-eyedropper" @click ="bianjiTreeTitle()"></i>
                    <i class="fa fa-times-rectangle" @click ='deleteTile()'></i>
                </p>
            </div>           
            <div class="treeCon boxshow icontree">
                    <el-tree class="filter-tree" 
                            :data="treedata001"                                                 
                            node-key="id"                           
                             @node-click="handleNodeClick" 
                            ref="tree">
                            <span slot-scope="{ node,data}">
                                <span>{{ node.label }}</span>
                            </span>
					           </el-tree>              
            </div>
        </div>
        <div class="contentbox mainCon basicList pd10 boxshow bgwhite"> 
            <span class="tableTitle">原文列表</span>
            <div class="text-right">     
                <el-button class="defaultBtn" @click="findUploadList()">查看上传</el-button> 
                <el-button class="redBtn">删除</el-button>
                <el-button class="defaultBtn" @click="upLoads()">上传</el-button>
            </div>
            <el-table border stripe :height="bodyHeight" :data="mockList.mackDataObj.res" highlight-current-row v-loading="listLoading" class="defaultTable" header-row-class-name="tableHeader">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column  label="操作"  width="100">
                    <template slot-scope="scope">
                    <el-button class="tabletoolBtn"  @click="findDetails(scope.row)">重命名</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="文件名称">
                </el-table-column>
                <el-table-column  prop="birth" label="上传时间">
                </el-table-column>
                <el-table-column  prop="name" label="文件大小">
                </el-table-column>
            </el-table>
            <div class="clear mt10">                         
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
        <cloudUploadManagement ref="cloudUploadManagementRef" :cloudUploadDataList='cloudUploadDataList' :cloudUploadDataDoneList='cloudUploadDataDoneList' :cloudUploadDataErrorList='cloudUploadDataErrorList'></cloudUploadManagement>
        <!-- <el-dialog :show-close = 'false' class="fileModal processModal" :visible.sync="fileVisible1" :close-on-click-modal="false">
            <div>
                <el-progress type="circle" :stroke-width="12" :percentage="process" color="rgb(146,176,0)"></el-progress>
            </div>
        </el-dialog> -->
        <!-- 添加目录弹框 -->
             <el-dialog
                     title="新增目录"
                     :visible.sync="centerDialogVisible"
                     :close-on-click-modal="true"
                     class="myDialogCenter"
                     :modal-append-to-body="false"
                     width="40%"
             >
                 <div>
                     <el-form ref="dioForm" :model="dioForm" class="addfiles">
                         <el-form-item prop="title" label="名称：" label-width="120px" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                             <el-input class="checkName" style="width:80%;margin:0 0 8px 8px" v-model="dioForm.title" clearable placeholder="请输入添加的目录名称" ></el-input>
                         </el-form-item>
                         <el-form-item prop="title" label="备注：" label-width="120px">
                             <el-input class="checkName" style="width:80%;margin:0 0 8px 8px" v-model="dioForm.title" clearable placeholder="请输入添加的目录名称" ></el-input>
                         </el-form-item>
                         <!-- <span class="titleSpan" style="margin:8px 0 0 10px">备注：</span><el-input class="checkName" style="width:80%" v-model="dioForm.titleNode" clearable placeholder="请输入添加目录的备注"></el-input> -->
                     </el-form>
                 </div>
                 <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="addEventFormSubmitBtns()" class="el-button checkWay">确 定</el-button>
            </span>
             </el-dialog>
             <!-- 编辑目录弹框 -->
             <el-dialog
                     title="编辑目录"
                     :visible.sync="centerDialogVisibleBianji"
                     class="myDialogCenter"
                     width="40%"
             >
                 <div>
                     <el-form>
                         <el-form-item prop="title" label="名称：" label-width="120px" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                             <el-input class="checkName" style="width:80%;margin:0 0 8px 8px" v-model="dioForm.title" clearable placeholder="请输入添加的目录名称" ></el-input>
                         </el-form-item>
                         <el-form-item prop="title" label="备注：" label-width="120px">
                             <el-input class="checkName" style="width:80%;margin:0 0 8px 8px" v-model="dioForm.title" clearable placeholder="请输入添加的目录名称" ></el-input>
                         </el-form-item>
                     </el-form>
                 </div>
                 <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisibleBianji = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisibleBianjiEvent()" class="el-button checkWay">确 定</el-button>
              </span>
             </el-dialog>
             <!-- 删除弹框目录 -->
             <el-dialog
                     title="删除"
                     :visible.sync="centerDialogVisibleSDelete"
                     width="40%"
                     center>
                 <span class="titleSpan">你是否要删除此目录?</span>
                 <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisibleSDelete = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisibleSDeleteEvent()" class="el-button checkWay">确 定</el-button>
            </span>
             </el-dialog>
         <!-- 表格进行重命名-->
             <el-dialog
                     title="重命名"
                     :visible.sync="dataListTit"
                     width="40%"
                     :modal-append-to-body="false"
                     center>
                 <span class="titleSpan">文件名称：</span><el-input class="checkName mt20" v-model="listTit" clearable></el-input>
                 <span slot="footer" class="dialog-footer">
                <el-button @click="dataListTit = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="dataListTitEvent()" class="el-button checkWay">确 定</el-button>
            </span>
             </el-dialog>
        <!-- 确定上传-->
             <el-dialog title="上传文件" :visible.sync="fileUploadShow" class="fileModal blobModal">
                 <div id="global-uploader">
                     <!-- 上传 -->
                     <uploader
                             ref="uploader"
                             :options="options"
                             :autoStart="false"
                             @file-added="onFileAdded"
                             @files-submitted="onFileSubmit"
                             class="uploader-app">
                         <uploader-unsupport></uploader-unsupport>
                         <!--:attrs="attrs"-->
                         <uploader-btn id="global-uploader-btn" ref="uploadBtn">选择文件</uploader-btn>
                         <uploader-btn id="global-uploader-btn1" :directory="true"  ref="uploadBtn">选择文件夹</uploader-btn>

                         <uploader-list v-show="panelShow" class="uploadList">
                             <div class="file-panel" >
                                 <ul class="file-list">
                                     <li v-for="(file,index) in fileListAll" style="padding:10px 0;" :key="'file'+index">
                                        <div>{{index+1}}<span>. </span>{{file.name}}</div>
                                     </li>
                                 </ul>
                             </div>
                         </uploader-list>
                         <div style="margin: 10px 0;">共选择了<span style="color:green;font-size:16px;">{{fileListAll.length}}</span>个文件</div>
                     </uploader>
                 </div>
                 <div slot="footer" class="dialog-footer">
                     <el-button class="checkWay" @click="uploadEvent()">上传</el-button>
                     <el-button class="checkDefault" @click.native="fileUploadShow=false">取消</el-button>
                 </div>
             </el-dialog>
             <!-- <el-dialog :show-close = 'false' class="fileModal processModal" :visible.sync="fileVisible1" :close-on-click-modal="false">
            <div>
                <el-progress type="circle" :stroke-width="12" :percentage="process" color="rgb(146,176,0)"></el-progress>
            </div> -->
        <!-- </el-dialog> -->
     </section>
</template>
<script lang="ts">
   	import { Vue, Component } from 'vue-property-decorator'
    import Service from './cloudList.service'
    import mockData from '@/mock/data/mockData';
    import all from '../../../../utils/firstSlice.js';
    import crc32 from '@/utils/crc32.js';
    import { Loading } from 'element-ui';
    import HttpRequest from '@/api/request';
    import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
    import utils from '../../../../common/js/util.js';
    import cloudUploadManagement from '../cloudUploadManagement/cloudUploadManagement.vue'
    @Component({
        components: { 
           cloudUploadManagement
        }
    })
    export default class arrange extends Vue{ 
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 300 ; 
        mockList: any = []
        radio3: string = '1';
        @Mutation('SET_isShow') SET_isShow: () => void;
        @Mutation('SET_PROCESS') SET_PROCESS: () => void;
        clientId:string = '5ff2443c1e5acd8bf4973d7adfbb638b';
        prepareBlob:any={};
        fileUploadShow: boolean;
        uploadFileId:string = '';
         arrsStart:any=[];
         cloudUploadManagementData:any=[];
         cloudUploadDataList:any=[];
         cloudUploadDataDoneList:any=[];
         cloudUploadDataErrorList:any=[];
         bytesPerChunk:any;//总速率;
        // pageList: any = [];
        jsonVersionOfNewFiles:  any = {}
        addFileName:string;
        // addFileType:string;
        addFileTitle:string;
        loadingInstance:any={};
        file:any;
        fileSingle:any={};
        documentTableData:any=[];
        newDocumentTableData:any=[];
        newFilesIds: number = 0;
        $refs: { uploader: HTMLFormElement};
        fondCode:string;
        firstClick:boolean;
        keepRight:boolean = false;
        FLhArr:any=[];
        processStop:boolean = false;
        fileVisible1: boolean = false;
        process: number = 0;
        cloudDirId: string = '1';
        processColor : string = 'rgb(247,78,0)';
        maxNumberOfConcurrentUploads:number = 1;//上传并发数
        allProcessInit:boolean;
        crcsCalculated: number;
        setProcessNum: number = 0;
        fileListNum: any=[];
        fileListSize:number = 0;
        defaultTreeOpen:any = [];
        fileHeight: number;
        timer: boolean;
        allItems:any;
        listLoading: boolean;
        TrueOk: boolean = false;
        showfa: boolean;
        showzi: boolean;
        listTit :string;
        fileVisible: boolean;
        fileUploadShow1: boolean = false;
        fixUploadShow:boolean;
        centerDialogVisible :boolean;
        centerDialogVisibleBianji:boolean;
        centerDialogVisibleSDelete:boolean;
        dataListTit:boolean;
        cloudUploadManagementRef:boolean;
        tableShow : boolean;
        catch: boolean = true;
        catchCount = 0;// 异常连接次数
        progressTime = 0;//获取进度的任务执行时间
        errorRecordList = [];//临时记录UploadError状态，再取一次
        currentUploadFileId: string = '';
        panelShow: boolean;
        panelShow1: boolean;
        isDelete: boolean = false;
        tltNode :string;
        tltForm :string;
        busy: boolean;
        start: number;
        total: number;
        treesId :number;
        bId : number;
        page: number;
        limit: number;
        listRameId:number;
        numAll:number;
        processLst:any = {};
        fileUpObj:any = {};
        fileCloudPathParam = [];
        filters: any = {};
        options: any = {};
        attrs: any = {};
        loginId:any = null;
        treeFilters:any = {};
        dioBianji: any = {};
        uploadFile: any = {};
        list: any = [];
        data: any = [];
        tree: any = [];
        restFiles: any = [];
        listData :any = [];
        defaultProps: any = {};
        fileForm: any = {};
        dioForm : any  = {};
        triggerCurrenNodeData : any = {};
        triggerCurrenNode :any = {};
        resumeFilesForm :any = {};
        // 文件列表
        files: any;
        updateDocumentFlag = false;
        errorTableData : any = [];
        errorTableData1 : any = [];
        AllDatas: any = [];
        borrowTableData: any = [];
        allProcessDatas: any = [];
        powerTableData:any = [];
        fileListAll:any = [];//文件显示队列
        fileListError:any = [];//错误上传序列
        fileList:any = [];//文件参数队列
        preFiles:any = [];
        cutArr:any = [];//断点未上传的list
        documentShow: boolean;
        borrowShow: boolean;
        errorShow: boolean;
        errorShowFiles:boolean = true;
        powerShow: boolean;
        formSelect: boolean;
        formInput: boolean;
        Treeresolve:any = {};
        Treenode:any = {};
        num:number;
        processAB:number = 0;
        isCompleteProcess: boolean;
        $notify:any;
        isFirst:boolean;
        Treenode1:any = {};
        Treeresolve1:any = {};
        Url:string;
        isshowPic:boolean;
        initId:number;
        constructor(){
            super();
            this.mockList = mockData;
            this.prepareBlob = {
                yes:true
            };
            this.bytesPerChunk = null;
            this.fileUploadShow = false;
            this.Url = HttpRequest['imgUrl'];
            this.allProcessInit = true;
            this.showfa = true;
            this.showzi = false;
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 283 ;
            this.fileHeight = document.documentElement.clientHeight - 216 ;
            this.timer = false;
            this.busy = false;
            this.tableShow = false;
            this.fileUploadShow = false;
            this.fixUploadShow = false;
            this.Treenode={};
            this.Treeresolve = {};
            this.fileUpObj = {};
            this.Treenode1={};
            this.Treeresolve1 = {};
            this.listTit = '';
            this.allItems = null;
            this.isCompleteProcess = false;
            this.fileListNum = [];
            this.fileListAll = [];
            this.arrsStart = [];
            this.cloudUploadDataList = [];
            this.resumeFilesForm = {};
            this.bId = 0;
            this.start = 0;
            this.numAll = 0;
            this.isFirst = true;
            this.crcsCalculated = 0;
            this.newFilesIds = 0;
            this.tltForm = '';
            this.tltNode = '';
            this.total = 0;
            this.treesId = 1;
            this.listRameId = 0;
            this.page = 0;
            this.limit = 10;
            this.listLoading = false;
            this.fileVisible = false;
            this.dataListTit = false;
            this.cloudUploadManagementRef = false;
            this.centerDialogVisible = false;
            this.centerDialogVisibleBianji = false;
            this.centerDialogVisibleSDelete = false;
            this.list = [];
            this.processLst = {};
            this.jsonVersionOfNewFiles = [];
            this.bytesPerChunk = null;
            this.uploadFile = {
                filePath:''
            };
            this.fileForm = {
                resource:''
            };
            this.prepareBlob = {
                yes:true
            };
            this.listData= [
                {
                    title:'文件名称',
                    prop:'name'
                },
                {
                    title:'上传时间',
                    prop:'createDate'
                },
                {
                    title:'文件大小',
                    prop:'fileSize'
                }

            ];
            this.triggerCurrenNodeData = {};
            this.triggerCurrenNode = {};
            this.dioForm = {
                title:'111',
                titleNode:'333'
            };
            this.dioBianji ={
                 title:'',
                titleNode:''
            };
            this.defaultProps = {
                isLeaf: 'hasChildren',
                label: 'name',
                id:'id'
            };
            this.filters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                fondName:'',
            };
            this.isshowPic = false;
            this.treeFilters = {
                title:''
            };
            // 断点续传配置
            // this.options = {
            //     target: 'http://xxxxx/xx', // 目标上传 URL
            //     chunkSize: '2048000',   //分块大小
            //     fileParameterName: 'file', //上传文件时文件的参数名，默认file
            //     testChunks: false,     //是否开启秒传
            //     maxChunkRetries: 3,  //最大自动失败重试上传次数
            //     // 服务器分片校验，断点续传基础
            //     checkChunkUploadedByResponse: function (chunk, message) {
            //         let objMessage = JSON.parse(message);
            //         if (objMessage.skipUpload) {
            //             return true;
            //         }
            //         return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
            //     },
            // };
            this.attrs =  {
                // accept: ACCEPT_CONFIG.getAll()
            };
            this.panelShow = false;  //选择文件后，展示上传panel
            this.panelShow1 = false;  //选择文件后，展示上传panel
            this.data =  [];
            this.tree=[];

            // 列表页面
            this.listLoading = false;
            this.documentShow = true;
            this.borrowShow = false;
            this.errorShow = false;
            this.powerShow = false;
            this.formSelect = true;
            this.formInput = true;
            this.documentTableData = [

            ];
            this.borrowTableData = [

            ];
            this.powerTableData = [

            ]
        };
        treedata001: any = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      activeName:string = 'file';
      tableData: any =[{
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
        findUploadList() {
            // this['$router'].push({
            //     path:"/fileArrange/newCloudManagement/cloudUploadManagement/cloudUploadManagement",
            //     name:'云盘管理上传任务管理',
            //     params: {
            //         cloudDirId:this.cloudDirId
            //     }
            // })
            // this.cloudUploadManagementRef = true;
            this.getUploadFilesOfCloud(this.cloudDirId);
            var loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在加载中，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            this.$nextTick(() => {
                this.$refs['cloudUploadManagementRef'].cloudUploadManagementVisible = true; 
                // this.$refs['cloudUploadManagementRef'].getUploadFilesOfCloud (this.cloudDirId);
                loadingInstance.close();
            });
        };
        /** 断点续传集合   /* 断点续传集合*/  /** 断点续传集合   /* 断点续传集合*/  /** 断点续传集合   /* 断点续传集合*/
        // 弹出选择上传弹框
        upLoads(){
            // debugger;
            // console.log('upLoads----------------------------');
            let sys = utils.getBrowserInfo();
            if(sys.browser === 'msie' && parseInt(sys.ver) <=9 ){
                this['$message']({
                    message: '当前浏览器版本过低，不支持文件上传，请使用IE10以上版本或Chrome,360等浏览器。',
                    type: 'warning',
                    duration: 8000
                });
                return;
            }
            console.log(this.documentTableData);
            // 文件正在上传 禁止上传新的文件
            if(this.allProcessInit){
            this.panelShow = false;
            this.fileUploadShow = true;
            let that = this;
            this.cutArr = [];
            // 重置表格
                // this.documentTableData = [];
                this.borrowTableData = [];
                this.errorTableData = [];
                this.errorTableData1 = [];
                // Service.searchUpload({action: 'getCloudFileConfig',clientId:this.clientId,targetDirId:this.treesId?this.treesId:null }).then((res) => {
                //     let params = res.data.pendingFiles;
                //     this.bytesPerChunk = res.data.inByte;
                //     if (params!=={}) {
                //         let arr = [];
                //         let att = [];
                //         for (let i in params) {
                //             params[i].name = i;
                //             // params[i].start = 0;
                //             // params[i].end = 0;
                //             // 有断点续传文件 暂时去除等待状态
                //             params[i].data.restStatus = false;//去除等待状态
                //             params[i].isPrepare = false;
                //             params[i].isStart = false;
                //             params[i].data.pauseStatus = false;
                //             let process = Number(((params[i].fileCompletionInBytes/params[i].originalFileSizeInBytes)*100).toFixed(1));
                //             params[i].process = process >100 ? 100 : process;
                //             // 区分队列
                //             if(params[i].data.type=='CloudFile'){
                //                 if(params[i].data.status!=='Done'){
                //                     params[i].done = false;//挂接未完成
                //                     params[i].Concate = false;
                //                     params[i].data.status = 'UploadError';//显示上传失败tab页面下
                //                     this.errorTableData.push(params[i])
                //                 }else{
                //                     att.push(params[i])
                //                 }
                //             }
                //         }
                //         // 小于切割进度得直接赋予100%
                //         arr.forEach(function(item){
                //             if(item.originalFileSizeInBytes<that.bytesPerChunk){
                //                 item.isOne = true;
                //             }else{
                //                 item.isOne = false;
                //             }
                //         });
                //         // 获取正在上传序列
                //         for(let a of arr){
                //             this.documentTableData.push(a);
                //             let arr = [];
                //             for(let data of this.documentTableData){
                //                 if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                //                     arr.push(a)
                //                 }
                //             }
                //             // 去重
                //             if(arr.length>1){
                //                 this.documentTableData.remove(a);
                //             }
                //         }
                //         // 获取完成序列
                //         this.borrowTableData = att;
                //         // 去除上传完成的重复的文件
                //         let app = [];
                //         for(let a of this.borrowTableData){
                //             for(let data of this.documentTableData){
                //                 if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                //                     app.push(a.name)
                //                 }
                //             }
                //         }
                //         if(app.length>0){
                //             Service.searchUpload({action: 'cancelFiles',fileId:JSON.stringify(app)}).then(() =>{});
                //         }
                //         let ids = [];
                //         if(att.length>0){
                //             ids = Array.from(new Set(att.map(function(item){return item.data.targetDirId}).toString().split(',')));
                //             // 获取云盘路径
                //             let strIds = JSON.stringify(ids);
                //             if (that.fileCloudPathParam !== strIds) {
                //                 // 获取云盘路径
                //                 Service.getUploadUrl(ids).then((res) =>{
                //                     that.fileCloudPathParam = strIds;
                //                     this.fileUpObj = res.data.data;
                //                     for(let obj of att){
                //                         for(let i in this.fileUpObj){
                //                             if(obj.data.targetDirId==i){
                //                                 obj.physicalPath = this.fileUpObj[i]
                //                             }
                //                         }
                //                     }
                //                     this.borrowTableData = att;
                //                 });
                //             } else {
                //                 for(let obj of att){
                //                     for(let i in this.fileUpObj){
                //                         if(obj.data.targetDirId==i){
                //                             obj.physicalPath = this.fileUpObj[i]
                //                         }
                //                     }
                //                 }
                //                 this.borrowTableData = att;
                //             }
                //         }
                //         this.updateTabName();
                //     }
                // });
                // 删除标记重置
                this.isDelete = false;
                // 重置文件队列
                if(this.$refs.uploader){
                  this.$refs.uploader.uploader.cancel();
                }                
                this.jsonVersionOfNewFiles = [];
                this.fileListAll = [];//清空选择得文件序列
                this.fileList = [];//清空选择得文件序列
                this.fileListSize = 0;
                this.newFilesIds = 0;
            }else{
                this['$message']({
                    message: '当前有正在上传的传输任务，请等待。',
                    type: 'warning'
                });
            }
        }
        clickFiles(){
            // 重置文件队列
            this.$refs.uploader.uploader.cancel();
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);           
        };
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);         
        };
        gotopage(page){            
            this.$router.push({path:'/fileArrange/arrange/'+page});
        }; 
        showMgroup(){ 
          this.$nextTick(() => {
            this.$refs['yijuanDialogRef'].yijuanVisible = true;           
          });
        };      
        showAddFiles(){ 
          this.$nextTick(() => {
            this.$refs['addFilesDialogRef'].addFilesVisible = true;           
          });
        };
        showBatchEdit(){
            this.$nextTick(() => {
              this.$refs['batchEditDialogRef'].batchEditVisible = true;           
            });
        };
        showBatchMount(){
            this.$nextTick(() => {
              this.$refs['batchMountDialogRef'].batchMountVisible = true;           
            });
        };
        fileSelected(row){         
           this.activeName='Ingroupfile';
           
        };  
        // 取得分块大小
        getSliceConfig() {
            let params = {
                action: 'getSliceConfig',
                clientId:this.clientId,
            };
            Service.prepareUpload({}, params.action, params.clientId).then(res => {
                if(res.data.succeeded){
                    this.prepareBlob = res.data.data;
                    this.bytesPerChunk = this.prepareBlob
                    console.log(this.prepareBlob);
                }else{
                    this.getError(res.errorMessage)
                }
            });
        }
        // 取得指定云盘文件夹的上传任务列表
    getUploadFilesOfCloud (cloudDirId) {
        debugger;
        var that = this;
        Service.getUploadFilesOfCloud({},this.clientId,cloudDirId).then((res) =>{
            let arr = [] ;
            for(var item in res.data.data.pendingFiles) {
                res.data.data.pendingFiles[item].prepareId = item
                arr.push(res.data.data.pendingFiles[item]);
            }
            // if(j !== '' && process) {
            //     arr[j].process = process;
            // }
            // this.cloudUploadManagementData = arr;
            this.cloudUploadDataList= arr.filter(function (item) {
                return item.data.status === 'Start' || item.data.status === 'Uploading' || item.data.status === 'Paused' || item.data.status === 'Processing';
            });
            this.cloudUploadDataDoneList= arr.filter(function (item) {
                return item.data.status === 'Done';
            });
            this.cloudUploadDataErrorList = arr.filter(function (item) {
                return item.data.status === 'UploadError' || item.data.status === 'ProcessError' || item.data.status === 'ProcessError' || item.data.status === 'Unknown';
            });
        });
    }
    upDataCloudUploadDataList(newData) {
        debugger;
        this.cloudUploadDataList = newData;
        console.log(this.cloudUploadDataList);
    }
        // 预备上传
        onFileAdded(file) {
            // console.log('onFileAdded----------------------------');
            this.panelShow = true;
            if(this.documentTableData.length>0){
                for(let data of this.documentTableData){
                        // 新文件加入预备(满足文件名和大小至少有一个不相同，认为新文件)
                    if(file.file.name!==data.originalFileName||file.file.size!==data.originalFileSizeInBytes){
                        this.computeMD5(file);
                    }else{
                        // 退出再次登录的断点文件去除出prepare队列
                        if(data.data.status!=='UploadFinish'&&data.data.status!=='ProcessError'){
                            this.cutArr.push(data);
                        }
                    }
                }
            }else{
                this.computeMD5(file);
            }
        };

        // 预备上传整编队列
        computeMD5(file) {
            // console.log('computeMD5----------------------------');
            let arr = [];
            for(let a of this.jsonVersionOfNewFiles){
               if(a.fileName===file.file.name){
                    arr.push(file.name)
               }
            };
            if(arr.length===0){
                let that = this;
                let fileForPost = {tempId: 0, fileName: '', size: 0, data: {}};
                fileForPost.data = {type: "CloudFile", cloudDirId : this.treesId};
                fileForPost.tempId = this.newFilesIds;
                fileForPost.fileName = file.name;
                fileForPost.size = file.size;
                this.jsonVersionOfNewFiles[fileForPost.tempId] = fileForPost;
                this.newFilesIds++;
                file.id = fileForPost.tempId;
                /*all.extractCrcFirstSlice(file, function(crc, blob) {
                    that.jsonVersionOfNewFiles[file.id].crc = crc;
                    that.crcsCalculated++;
                });*/
            }
        }

        // 列表重命名
        findDetails(row){
            // // console.log(row);
            this.listTit = row.id;
            this.listRameId = row.id;
            this.dataListTit = true;
        }
        // 收集全部可上传文件队列
        onFileSubmit(files, fileList){
            // console.log('onFileSubmit----------------------------');
            // files //文件队列
            // fileList //文件夹队列
            // console.log(files.length);
            this.preFiles = files;
            this.fileListAll = files;
            this.newFilesIds = 0;
            for(let file of files){
                this.fileListSize += file.file.size;
            }
            this.getSliceConfig();
        }
        
        // 收集错误上传队列
        onFileSubmit1(files){
            // console.log('onFileSubmit1----------------------------');
            this.panelShow1 = true;
            let fileTrue = [];
            files.forEach(item =>{
                this.errorTableData.forEach(item1 =>{
                    if(item1.originalFileName===item.file.name&&item.file.size===item1.originalFileSizeInBytes){
                        fileTrue.push(item)
                    }
                })
            });
            this.fileListError = fileTrue;
            this.preFiles = this.preFiles.concat(fileTrue);
        }
        // 保存队列跳转页面
        uploadEvent(){
            // debugger;
            console.log(this.documentTableData);
            // console.log('uploadEvent----------------------------');
            if(this.fileListAll.length>0){
                this.activeName = '0';
                this.fileUploadShow = false;
                this.showfa = false;
                this.showzi = true;
                // this.$refs['cloudUploadManagementRef'].cloudUploadManagementVisible = true;
                this.documentShow = true;
                this.borrowShow = false;
                this.errorShow = false;
                this.isCompleteProcess = true;
                this.numAll = 0;
                this.setProcessNum = 0;
                this.AllDatas = [];
                // 重置限制上传个数队列
                this.arrsStart = [];
                this['$store'].commit('SET_PROCESS',0);
                // this.fileVisible1 = true;
                // this.loadingInstance = Loading.service(
                //     {
                //         lock: true,
                //         text: '正在上传，请稍等',
                //         // spinner: 'el-icon-loading',
                //         background: 'rgba(0, 0, 0, 0.7)'
                //     }
                // );
                this.uploadPre();
            }else{
                this['$message']({
                    message: '请选择文件。',
                    type: 'warning'
                });
            }
        }

        // 选择错误文件跳转
        uploadEvent1(){
            // console.log('uploadEvent1----------------------------');
            if(this.fileListError.length>0){
                this.fileUploadShow1 = false;
                this.documentShow = false;
                this.borrowShow = false;
                this.errorShow = true;
                this.isCompleteProcess = true;
                this.uploadPre1();
            }else{
                this['$message']({
                    message: '请选择需要重新上传的文件。',
                    type: 'warning'
                });
            }
        }
        // 预备上传开始
        uploadPre(){
            // debugger;
            // console.log('uploadPre----------------------------');
            // this.listLoading = true;
            // let files = this.preFiles;
            // this.prepareBlob = {};
            // let fileOnly = [];
            // for(let fileB of this.jsonVersionOfNewFiles){
            //     for(let fileA of files){
            //         if(fileB.fileName===fileA.name){
            //             fileOnly.push(fileB)
            //         }
            //     }
            // }
            // this.jsonVersionOfNewFiles = fileOnly;
            // this.fileList = files;
            // this.filesReact();
            // let that = this;
            // let arr = [];
            // this.fileList.forEach(function(item,index){
            //     // for(let tip of that.arrsStart){
            //     //     if(item.file.name===tip.originalFileName&&item.file.size==tip.originalFileSizeInBytes){
            //             // that.doneFiles(item.file,tip.name,tip);
            //             // 执行上传
            //             let list  = item.file;
            //             list.originalFileSizeInBytes = list.size;
            //             let chunk = all.slice(list, list.fileCompletionInBytes, list.end);
            //             let formData = new FormData();
            //             var reader = new FileReader();
            //             reader.onloadend = function(e) {
            //                 if (e.target['readyState'] == FileReader.DONE) {
            //                     let digest;
            //                     if(window.navigator&&window.navigator.msSaveOrOpenBlob){
            //                         let binary = all.toBuffer(e.target['result']);
            //                         digest = all.crcUtf8(binary);
            //                     }else{
            //                         digest = crc32(e.target['result']);
            //                     }
            //                     let crc =  all.decimalToHexString(digest);
            //                     that.jsonVersionOfNewFiles[index].crc = crc;
            //                     let id = that.clientId;
            //                     // 全部新文件上传
                                
            //                     // if(this.jsonVersionOfNewFiles.length===this.fileList.length){
            //                     // 如有新选择的文件 预备上传
            //                     // let b = JSON.stringify(Array.from(new Set(that.jsonVersionOfNewFiles)));
            //                     let b = that.jsonVersionOfNewFiles;
            //                     Service.prepareUpload(b,'prepareUpload',id).then(res => {
            //                         // that.prepareBlob = Object.assign(that.prepareBlob,res.data.data);
            //                         that.uploadFileId = res.data.data[0];
            //                         that.getFilesA();
            //                     });
            //                 }
            //             };
            //             // 判断浏览器类型
            //             if(window.navigator&&window.navigator.msSaveOrOpenBlob){
            //                 // reader.readAsDataURL(chunk);
            //                 reader.readAsArrayBuffer(chunk);
            //             }else{
            //                 reader.readAsBinaryString(chunk);
            //             }
            //         // }
            //     // }
            // });
            let that = this;
            this.listLoading = true;
            let files = this.preFiles;
            this.prepareBlob = {};
            let fileOnly = [];
            for(let fileB of this.jsonVersionOfNewFiles){
                for(let fileA of files){
                    if(fileB.fileName===fileA.name){
                        fileOnly.push(fileB)
                    }
                }
            }
            this.jsonVersionOfNewFiles = fileOnly;
            let id = this.clientId;
            // 全部新文件上传
            this.fileList = files;
            // if(this.jsonVersionOfNewFiles.length===this.fileList.length){
            // 如有新选择的文件 预备上传
            let b = this.jsonVersionOfNewFiles;
            Service.prepareUpload(b,'prepareUpload',id).then(res => {
                // debugger;
                that.prepareBlob = Object.assign(this.prepareBlob,res.data.data);
                for(let i in res.data.data){
                    that.fileList[i].prepareId = res.data.data[i];
                }
                console.log(that.fileList);
                // this.$refs['cloudUploadManagementRef'].getUploadFilesOfCloud (this.cloudDirId);
                that.getFilesA();
            });

        }
        // 查询列表
        getFilesA(){
            // console.log('getFilesA----------------------------');
            let that = this;
            // let id = this.clientId;
            // let params2 = {
            //     data:{
            //         status:'Start'
            //     },
            //     isPrepare:true,
            //     isStart:true,
            //     process:0,
            //     name:this.prepareBlob[0]
            // };
            // let arr = [];
            // arr.push(params2);
            // // this.documentTableData = arr;
            // this.getSliceConfig();
            // // 开始上传
            // this.allDoneFiles();
            // this.updateTabName();
            // // console.log('getFilesA')
            // Service.searchUpload({action: 'getCloudFileConfig', clientId:id, targetDirId:this.treesId?this.treesId:null }).then((res) =>{
               Service.getUploadFilesOfCloud({},this.clientId,this.cloudDirId).then((res) =>{
                    let params = res.data.data.pendingFiles;
                    this.bytesPerChunk = res.data.data.inByte;
            
                
            //    let params = this.documentTableData.pendingFiles;
            //     this.bytesPerChunk = this.documentTableData.inByte;
                if(params!=={}){
                    let arr = [];
                    let arr1 = [];
                    let att = [];
                    for(let i in params){
                        params[i].name = i;
                        // params[i].start = 0;
                        // params[i].end = 0;
                        params[i].Concate = false;//挂接中状态
                        params[i].done = false;//挂接完成
                        params[i].data.pauseStatus = false;
                        // 区分预备上传还是断点续传
                        if(params[i].data.status === 'Start'){
                            params[i].isPrepare = true;
                            params[i].isStart = true;
                            params[i].process = 0;
                        }else if(params[i].data.status === 'Uploading'){
                            params[i].isPrepare = true;
                            params[i].isStart = true;
                            let process = Number(((params[i].fileCompletionInBytes/params[i].originalFileSizeInBytes)*100).toFixed(1));
                            params[i].process = process >100 ? 100 : process;
                        }else if(params[i].data.status === 'UploadError'){
                            params[i].isPrepare = false;
                            params[i].isStart = false;
                            let process = Number(((params[i].fileCompletionInBytes/params[i].originalFileSizeInBytes)*100).toFixed(1));
                            params[i].process = process >100 ? 100 : process;
                        }else if(params[i].data.status==='UploadFinish'){ //挂接中
                            params[i].Concate  = true;
                            params[i].isPrepare = false;
                            params[i].isStart = false;
                        }
                        // else if(params[i].data.status==='Done'){ //挂接完成
                        //     params[i].process = 100;
                        //     params[i].Concate  = false;
                        //     params[i].conCateStatus = 'Done';
                        //     params[i].isPrepare = false;
                        //     params[i].isStart = false;
                        // }
                        else{
                            params[i].isPrepare = true;
                            params[i].isStart = true;
                            let process = Number(((params[i].fileCompletionInBytes/params[i].originalFileSizeInBytes)*100).toFixed(1));
                            params[i].process = process >100 ? 100 : process;
                        }
                        // 区分队列
                        if(params[i].data.type=='CloudFile'){
                            this.AllDatas.push(params[i]); //全部进度序列
                            if(params[i].data.status!=='Done'){
                                params[i].done = false;//挂接未完成
                                arr.push(params[i]);
                            }else{
                                att.push(params[i])
                            }
                        }
                    }
                    debugger;
                    // 小于切割进度得直接赋予100%
                    arr.forEach(function(item){
                        if(item.originalFileSizeInBytes<that.bytesPerChunk){
                            item.isOne = true;
                        }else{
                            item.isOne = false;
                        }
                    });

                    // 去重
                    for(let i in that.prepareBlob){
                        arr.forEach(function(item){
                            if(item.name===that.prepareBlob[i]){
                                that.allProcessDatas.push(item);
                                arr1.push(item)
                            }
                        })
                    }

                    // 获取正在上传序列
                    // if(arr1.length !== 0) {
                        // that.$refs['cloudUploadManagementRef'].cloudUploadDataList.push(arr1);
                    // } else {
                        // that.$refs['cloudUploadManagementRef'].cloudUploadDataList.push(that.fileList);
                    // }
                    // this.documentTableData = arr1;
                    // this.allProcessDatas = arr1;
                   // for(let a of arr1){
                   //     this.documentTableData.push(a);
                   //     let arr = [];
                   //     for(let data of this.documentTableData){
                   //         if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                   //             data.data.status = a.data.status;
                   //             data.name = a.name;
                   //             arr.push(a)
                   //         }
                   //     }
                   //     // 去重
                   //     if(arr.length>1){
                   //         this.documentTableData.remove(a);
                   //     }
                   // }
                    for(var item in params) {
                        this.newDocumentTableData.push(params[item]);
                    }
                    // 获取完成序列
                    this.borrowTableData = att;
                    // 去除上传完成的重复的文件
                    let app = [];
                    for(let a of this.borrowTableData){
                        for(let data of this.newDocumentTableData){
                            if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                               app.push(a.name)
                            }
                        }
                    }
                    // 去除上传失败的重复文件
                    for(let a of this.errorTableData){
                        for(let data of this.newDocumentTableData){
                            if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                                app.push(a.name)
                            }
                        }
                    }
                    // if(app.length>0){
                    //     Service.searchUpload({action: 'cancelFiles',fileId:JSON.stringify(app)}).then(() =>{});
                    // }
                    this.listLoading = false;
                    let ids = [];
                    // if(att.length>0){
                    //     ids = Array.from(new Set(att.map(function(item){return item.data.targetDirId}).toString().split(',')));
                    //     // 获取云盘路径
                    //     let strIds = JSON.stringify(ids);
                    //     if (this.fileCloudPathParam !== strIds) {
                    //          获取云盘路径
                    //          Service.getUploadUrl(ids).then((res) =>{
                    //              this.fileCloudPathParam = strIds;
                    //              this.fileUpObj = res.data.data;
                    //              for(let obj of att){
                    //                  for(let i in this.fileUpObj){
                    //                      if(obj.data.targetDirId==i){
                    //                          obj.physicalPath = this.fileUpObj[i]
                    //                      }
                    //                  }
                    //              }
                    //              this.borrowTableData = att;
                    //          });
                    //     } else {
                    //         for(let obj of att){
                    //             for(let i in this.fileUpObj){
                    //                 if(obj.data.targetDirId==i){
                    //                     obj.physicalPath = this.fileUpObj[i]
                    //                 }
                    //             }
                    //         }
                    //         this.borrowTableData = att;
                    //     }
                    // }
                    // 开始上传
                    this.allDoneFiles();
                    this.updateTabName();
                }else{
                    this.listLoading = false;
                }
            })
        };
        //删除title
        deleteTile(){
                // this.centerDialogVisibleSDelete = true;
            if(this.treesId == 0){
                this['$message']({
                    message: '目录根节点不能进行删除。',
                    type: 'warning'
                });
            }else{
                    this['$confirm']('确认删除选中目录吗？', {
                        type: 'warning'
                    }).then(() => {
                        Service.DeleTile(this.treesId).then(res=>{
                            this.centerDialogVisibleSDelete = true;
                            if(res.data.succeeded==false){
                                this.centerDialogVisibleSDelete = false;
                                this['$message']({message:res.data.errorMessage,type:'warning'})
                            }else{
                                        this.centerDialogVisibleSDelete = false;
                                        this.Treenode.childNodes = [];
                                        this.loadNodeTree(this.Treenode,this.Treeresolve)
                                        this['$message']({message:'删除成功。',type:'success'})
                        //         Service.getLounTile(0).then(res=>{
                        //         this.tree=res.data.data;
                        //         var arrs = [];
                        //         arrs.push(res.data.data.id)
                        //         var arr=[{name:res.data.data[0].name,id:res.data.data[0].id,children:res.data.data}]
                        //             this.tree = arr;
                        //             // console.log(res.data.data[0].name);
                        //             this['$message']({message:"删除成功",type:'info'})
                        //             //  this['$router'].go(0);
                        //             // location.reload();
                        //              this.Treenode1.childNodes = [];
                        //              this.loadNodeTree(this.Treenode1,this.Treeresolve1)
                        // })
                           
                        }
                    })
                });
            }
        }
        bianjiTreeTitle(){
            if(this.initId == 0){
                this['$message']({
                    message: '目录根节点不能进行编辑。',
                    type: 'error'
                });
            }else{
                this.centerDialogVisibleBianji = true;
                Service.getLoundUrlTitle(this.treesId).then(res=>{
                    this.dioBianji.title=res.data.data.name;
                    this.dioBianji.titleNode= res.data.data.note;
                    this.bId= res.data.data.id;
                    this.treesId = res.data.data.parentId;
                    // // console.log("dfs"+this.treesId)
                })
            }
            
        };
        //添加结构树目录
        treeAddTitle(){
            this.dioForm.title = ""
            this.dioForm.titleNode = ""
            if(this.treesId == -1){
                this['$message']({
                    message: '请选择目录根节点。',
                    type: 'error'
                });
            }else{
                this.centerDialogVisible = true;
                
            }
        }
        // 调用全部文件上传
        allDoneFiles(){
            // console.log('allDoneFiles----------------------------');
            let that = this;
            this.errorRecordList = [];
            let arr = [];
            this.restFiles = [];//并发上传文件的等待文件;
            let a = 0;
            // debugger;
            for(let datas of this.preFiles){
                if(a<this.maxNumberOfConcurrentUploads){
                    // datas.data.restStatus = false;
                    // if(datas.data.status === 'Start'||datas.data.status === 'Uploading'){
                        arr.push(datas);
                        if(datas.originalFileSizeInBytes<this.bytesPerChunk){
                            this.numAll++;
                        }
                        a++;
                    // }
                }else{
                    // datas.data.restStatus = true;
                    this.restFiles.push(datas)
                }
            }
            // 当前上传的文件是否全部是小于切割系数
            if(this.numAll=== arr.length) {
                this['$store'].commit('SET_PROCESS', 100);
            }
            // 有断点文件 一并结合在上传进度中 分批上传
            if(this.arrsStart.length>0){
                this.arrsStart = this.arrsStart.concat(arr)
            }else{
                this.arrsStart = arr;
            }
            console.log('allDoneFiles')
            // console.log(this.arrsStart)
            // 切割文件队列
            that.filesReact();
            if(arr.length>0){
                that.processNextIn();
             }
        };
         handleNodeClick (data){ 
            //  let kindId = data
            //  if(kindId.nodeType!=1){
            //       this.getlibId(kindId.kindId);  
            //  } 
          };
        // 上传文件过程
        processNextIn() {
            // console.log('processNextIn----------------------------');
            let that = this;
            let files = this.preFiles;
            let arr = [];
            // files.forEach(function(item,index){
                for(let tip of that.arrsStart){
                    // if(item.file.name===tip.originalFileName&&item.file.size==tip.originalFileSizeInBytes){
                        // that.currentUploadFileId = that.prepareBlob[index];
                        that.doneFiles(tip.file,tip.prepareId,'');
                    // }
                }
            // });
            // 调取进度
            if(!this.prepareBlob.yes&&this.prepareBlob!=={}){
                this.getProcess();
            }
        }
        // 文件分块
        filesReact(){
            debugger;
           let files = this.fileList;
            for(let tip of files){
                // 传输中的切割数量
                for(let item of this.arrsStart){
                    // if(tip.file.size==item.originalFileSizeInBytes&&tip.file.name===item.originalFileName){
                        // if(item.data.status === 'Start'){
                        //     tip.file.fileCompletionInBytes = 0;
                        // }else if(item.data.status === 'Uploading'){
                        //     tip.file.fileCompletionInBytes = item.fileCompletionInBytes
                        // }
                        tip.file.fileCompletionInBytes = 0;
                        if(tip.file.size>this.bytesPerChunk){
                            tip.file.end = tip.file.fileCompletionInBytes + this.bytesPerChunk;
                        }else{
                            tip.file.end = tip.file.size
                        }
                    // }
                }
                // 等待传输的切割数量
                for(let item of this.restFiles){
                    // if(tip.file.name===item.originalFileName&&tip.file.size==item.originalFileSizeInBytes){
                        // if(item.data.status === 'Start'){
                        //     tip.file.fileCompletionInBytes = 0;
                        // }else if(item.data.status === 'Uploading'){
                        //     tip.file.fileCompletionInBytes = item.fileCompletionInBytes
                        // }
                        if(tip.file.size>this.bytesPerChunk){
                            tip.file.end = tip.file.fileCompletionInBytes + this.bytesPerChunk;
                        }else{
                            tip.file.end = tip.file.size
                        }
                    }
                // }
            }
        }
        // 错误文件预备上传
        uploadPre1(){
            // console.log('uploadPre1----------------------------');
            // 有正在等待的文件队列
            if(this.restFiles.length>0){
                let files = this.preFiles;
                this.fileList = files;
                let ayy = [];
                // 选择的断点续传文件
                for(let data of this.errorTableData){
                    let ab = [];
                    for(let item of this.fileListError){
                        if(data.originalFileName===item.file.name&&item.file.size===data.originalFileSizeInBytes){
                            data.conCateStatus = 'Start';//开启
                            this.documentTableData.push(data);
                            data.data.restStatus = true;
                            data.isPrepare = true;//更改上传为预备状态
                            data.data.status = 'Uploading';//续传状态
                            this.restFiles.push(data);
                        }else{
                            ab.push(data)
                        }
                    }
                    if(ab.length===this.fileListError.length){
                        ayy.push(data)
                    }
                };
                // // 当前上传的文件是否全部是小于切割系数
                // if(this.numAll=== arr.length) {
                //     this['$store'].commit('SET_PROCESS', 100);
                // }
                for(let data of this.errorTableData){
                    for(let item of files){
                        if(data.originalFileName===item.file.name&&item.file.size===data.originalFileSizeInBytes){
                            // 旧文件上传
                            this.goOnUpload(data,item);
                            data.data.status = 'Uploading';//显示暂停按钮
                        }
                    }
                }
                this.errorTableData = ayy;
            }else{
                // 需要加入等待队列
                this.documentTableData = [];
                this.arrsStart = [];
                let files = this.fileListError;
                this.fileList = files;
                let arr = [];
                let a = 0;
                let ayy = [];
                // 选择的断点续传文件
                for(let data of this.errorTableData){
                    let ab = [];
                    for(let item of files){
                        if(data.originalFileName===item.file.name&&item.file.size===data.originalFileSizeInBytes){
                            data.conCateStatus = 'Start';//开启
                            this.documentTableData.push(data);
                        }else{
                            ab.push(data)
                        }
                    }
                    if(ab.length===files.length){
                        ayy.push(data)
                    }
                }
                this.errorTableData = ayy;
                // 分流上传
                for(let datas of this.documentTableData){
                    if(a<this.maxNumberOfConcurrentUploads){
                        datas.data.restStatus = false;
                        datas.isPrepare = true;//更改上传为预备状态
                        datas.data.status = 'Uploading';//续传状态
                        if(datas.data.status === 'Start'||datas.data.status === 'Uploading'){
                            arr.push(datas);
                            if(datas.originalFileSizeInBytes<this.bytesPerChunk){
                                this.numAll++;
                            }
                        }
                    }else{
                        datas.data.restStatus = true;
                        datas.isPrepare = true;//更改上传为预备状态
                        datas.data.status = 'Uploading';//续传状态
                        this.restFiles.push(datas)
                    }
                    a++;
                }
                this.arrsStart = arr;
                // // 当前上传的文件是否全部是小于切割系数
                // if(this.numAll=== arr.length) {
                //     this['$store'].commit('SET_PROCESS', 100);
                // }
                for(let data of this.documentTableData){
                    for(let item of files){
                        if(data.originalFileName===item.file.name&&item.file.size===data.originalFileSizeInBytes){
                            // 旧文件上传
                            this.goOnUpload(data,item);
                            data.data.status = 'Uploading';//显示暂停按钮
                        }
                    }
                }
                this.getProcess();
            }
            this.updateTabName();
        }
        // 继续校验是否可上传
        fileResumeProcessStarter(id,fileOnly) {
            // console.log('fileResumeProcessStarter----------------------------');
            // // console.log(fileOnly);
            let that = this;
            let bytesToValidates = fileOnly.fileCompletionInBytes - fileOnly.crcedBytes;
            // // console.log(bytesToValidates);
            if (bytesToValidates > 0) {
                // console.log('fileResumeProcessStarter--------------字节校验成功，未完成')
                //slice the not validated part
                let chunk =  all.slice(fileOnly, fileOnly.crcedBytes , fileOnly.fileCompletionInBytes);
                let formData = new FormData();
                formData.append("file", chunk);
                // console.log('fileResumeProcessStarter-----onloadend');
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    if (e.target['readyState'] == FileReader.DONE) { // DONE == 2
                        let digest = crc32(e.target['result']);
                        let crc = all.decimalToHexString(digest);
                        // 校验是否可上传
                        // console.log('fileResumeProcessStarter-----verifyCrcOfUncheckedPart');
                        Service.prepareUpload({
                            action: 'verifyCrcOfUncheckedPart',
                            fileId: id,
                            crc: crc,
                            clientId: that.clientId
                        }).then((res) => {
                            // console.log('fileResumeProcessStarter-----verifyCrcOfUncheckedPart' + res.data);
                            // console.log(that.restFiles);
                            if (res.data) {
                                that.fileUploadProcessStarter(fileOnly);

                            } else if (that.restFiles.length > 0) {
                                for (let data of that.documentTableData) {
                                    if (data.name === id && data.originalFileSizeInBytes === fileOnly.originalFileSizeInBytes) {
                                        // console.log('UploadError');
                                        data.restStatus = false;
                                        data.done = false;
                                        data.isPrepare = false;
                                        data.isStart = false;
                                        data.conCateStatus = 'UploadError';
                                        // 提出可上传队列
                                        that.arrsStart.remove(data);
                                    }
                                }
                                if (that.restFiles.length > 0) {
                                    // console.log('上传失败获取下一个文件上传');
                                    // that.goFiles();
                                }
                                // console.log('文件续传校验失败,请等其他文件完成后清空未完成的文件，重新选择上传失败的文件重新上传！!');
                                that['$message']({
                                    message: '文件续传校验失败,请重新上传！!',
                                    type: 'error',
                                    duration: 5 * 1000
                                });
                            } else {
                                // console.log('that.documentTableData');
                                // console.log(that.documentTableData)
                                for (let data of that.documentTableData) {
                                    if (data.name === id && data.originalFileSizeInBytes === fileOnly.originalFileSizeInBytes) {
                                        // console.log('UploadError');
                                        data.restStatus = false;
                                        data.done = false;
                                        data.isPrepare = false;
                                        data.isStart = false;
                                        data.conCateStatus = 'UploadError';
                                        // 提出可上传队列
                                        that.arrsStart.remove(data);
                                    }
                                }
                            }
                        });
                    }
                };

                reader.readAsBinaryString(chunk);
            } else {
                this.fileUploadProcessStarter(fileOnly);
            }

        }
         updateDocumentTable() {
            let me = this;
            // console.log('updateDocumentTable')
            // console.log(me.updateDocumentFlag)
            if (!me.updateDocumentFlag) {
                me.updateDocumentFlag = true;
                setTimeout(function () {
                    // console.log('11111111111111111updateDocumentTable')
                    me.updateDocumentFlag = false;
                    for (let i = me.newDocumentTableData.length - 1; i >= 0; i--) {
                        if (me.newDocumentTableData[i].conCateStatus === 'Done') {
                            // console.log('更新列表');
                            me.borrowTableData.push(me.newDocumentTableData[i]);
                            me.newDocumentTableData.remove(me.newDocumentTableData[i]);
                        }
                    }
                    me.updateTabName();
                }, 1000);
            }
        }
        reUploadSingleFile(row){
            // console.log('reUploadSingleFile----------------------------');
            Service.prepareUpload({
                action: 'resumeFile',
                fileId: row.name,
                clientId:this.clientId
            }).then((res) => {
                if(res.data.fileComplete){
                    for(let data of this.documentTableData) {
                        if (data.name === row.name) {
                            data.conCateStatus = 'Done';
                            data.done = true;
                            this.arrsStart.forEach(function (item) {
                                if (data.originalFileSizeInBytes == item.originalFileSizeInBytes && item.originalFileName === data.originalFileName) {
                                    item.done = true;
                                }
                            });
                            this.updateDocumentTable();
                        }
                    }
                    // console.log('resume 查询到已完成，更新状态');
                    return;
                }
                this.resumeFilesForm = res.data;//获取继续上传文件的信息
                let files = this.fileList;
                let fileOnly;
                // console.log('this.fileList---------------');
                // console.log(this.fileList.length);
                for(let item of files){
                    if(res.data.originalFileName === item.file.name){
                        item.file.crcedBytes = res.data.crcedBytes;
                        item.file.fileCompletionInBytes = res.data.fileCompletionInBytes;
                        fileOnly = item.file;
                        // console.log('this.fileListAll---------------fileOnly');
                    }
                }
                for(let data of this.documentTableData){
                    if(data.name===row.name){
                        data.isPrepare = true;
                        // 在未上传文件序列里预备
                        data.data.pauseStatus = false;
                        data.data.status = 'Uploading';
                    }
                }
                this['$store'].commit('SET_isShow', true);
                this.fileResumeProcessStarter(row.name,fileOnly)
            });
        }
        // 正常上传文件上传文件数量低于并发数量 自动补位
        goFiles(){
            // console.log('goFiles----------------------------');
            let arr = [];
            let att = [];
            // this.arrsStart.forEach(function(item){
            //     if(!item.Concate){
            //         att.push(item)
            //     }
            // });
            // console.log('获取更新上传文件序列')
            // console.log(att)
            for(let i = 0;i<this.maxNumberOfConcurrentUploads-att.length;i++){
                if(this.restFiles[i]){
                    // if(this.restFiles[i].isPrepare){
                        // this.restFiles[i].data.restStatus = false;
                        // for(let abc of this.newDocumentTableData){
                        //     if(abc.originalFileName===this.restFiles[i].originalFileName&&this.restFiles[i].originalFileSizeInBytes==abc.originalFileSizeInBytes){
                        //         abc.data.restStatus = false;
                        //     }
                        // }
                        // 补位需要上传的序列
                        // console.log('补位需要上传的序列');
                        this.arrsStart.push(this.restFiles[i]);
                        this.doneFiles(this.arrsStart[this.arrsStart.length - 1].file, this.arrsStart[this.arrsStart.length - 1].prepareId, this.arrsStart[this.arrsStart.length - 1]);
                        // 加入新文件传输
                        // for(let j=0;j<this.fileList.length;j++) {
                        //     if (this.fileList[j].file.name === this.restFiles[i].originalFileName && this.fileList[j].file.size == this.restFiles[i].originalFileSizeInBytes) {
                        //         // console.log('上传文件' + this.fileList[j].file.name)
                        //         // console.log('------------------------------当前文件字节数==='+this.restFiles[i].fileCompletionInBytes);
                        //         // console.log(this.errorRecordList)
                        //         // console.log(this.restFiles[i].originalFileName)
                        //         if(new Date().getTime() - this.progressTime > 3000){
                        //             // console.log('重新启动获取进度的任务')
                        //             // this.getProcess();
                        //         }
                        //         if(this.errorRecordList.indexOf(this.restFiles[i].name) > -1){
                        //             // console.log('续传的文件');
                        //             // console.log(this.restFiles[i].name)
                        //             // console.log(this.restFiles[i]);
                        //             this.reUploadSingleFile(this.restFiles[i]);
                        //         } else {
                        //             // console.log(this.restFiles[i].name)
                        //             this.doneFiles(this.fileList[j].file, this.restFiles[i].name, this.restFiles[i]);
                        //         }
                        //         // this.getProcess();
                        //     }
                        // }
                        // 去除剩余等待序列对应文件
                        // // console.log('restFiles---------------------')
                        // // console.log(this.restFiles)
                        if(this.restFiles.length !==0 ) {
                            this.getProcess();
                            this.restFiles.shift();
                        }
                        
                    // }
                }
            }
            // // console.log(this.arrsStart);

            // 当前上传的文件是否全部是小于切割系数
            for(let arrs of this.arrsStart){
                if(arrs.originalFileSizeInBytes<this.bytesPerChunk){
                    arr.push(arrs.originalFileSizeInBytes)
                }
            }
            // 最大传输数量等于当前全部文件的最小切割数量
            // if(arr.length===this.maxNumberOfConcurrentUploads) {
            //     this['$store'].commit('SET_PROCESS', 100);
            // }
        }
        // 断点续传文件条目
        doneFiles(tip,item,originalFile){
            // console.log('doneFiles----------------------------');
            // this.setProcessNum = 0;
            // if(!this.isDelete){
                let that = this;
                this.errorShowFiles = false;
                this.catch = true;
                debugger;
                // 执行上传
                let list  = tip;
                list.originalFileSizeInBytes = list.size;
                let chunk = all.slice(list, list.fileCompletionInBytes, list.end);
                let formData = new FormData();
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    if (e.target['readyState'] == FileReader.DONE) {
                        let digest;
                        if(window.navigator&&window.navigator.msSaveOrOpenBlob){
                            let binary = all.toBuffer(e.target['result']);
                            digest = all.crcUtf8(binary);
                        }else{
                            digest = crc32(e.target['result']);
                        }
                        let crc =  all.decimalToHexString(digest);
                        formData.append("file", chunk);
                        // 上传主体
                        Service.doneUpload(formData,item,crc,that.clientId).then((res)=>{
                            console.log(res);
                            // 正常上传
                            if(!res.data||res.status===200){
                                // progress
                                list.fileCompletionInBytes = list.end;
                                // originalFile.start = list.fileCompletionInBytes;
                                list.end = list.fileCompletionInBytes + that.bytesPerChunk;
                                // originalFile.end = list.fileCompletionInBytes + that.bytesPerChunk;
                                if(list.end>list.originalFileSizeInBytes){
                                    list.end = list.originalFileSizeInBytes
                                }
                                // 进度到100%
                                if (list.fileCompletionInBytes < list.originalFileSizeInBytes) {
                                    setTimeout(that.doneFiles, 10,tip,item);
                                }else {
                                    that.setProcessNum += 1;
                                    // console.log(' // 进度到100%');

                                    // // console.log(that.documentTableData);
                                    for (let ab of that.newDocumentTableData) {

                                        if (ab.originalFileName === list.name && list.size == ab.originalFileSizeInBytes) {
                                            ab.process = 100;
                                            // // console.log(ab);
                                            if (ab.data.status !== 'UploadError' || ab.data.status !== 'ProcessError') {
                                                ab.Concate = true;
                                                // ab.ConKnow = true;
                                            } else {
                                                ab.ConError = true;
                                            }
                                            // 上传且挂接完毕 去除文件队列
                                            //if (ab.data.status === 'Done' || ab.conCateStatus === 'Done') {
                                            if (ab.data.status === 'Done') {
                                                // console.log('that.arrsStart.remove(ab)');
                                                that.arrsStart.remove(ab);
                                            }


                                            // 增加剩余未暂停状态的文件序列
                                            // console.log('-----------剩余文件个数' + that.restFiles.length);
                                            if (that.restFiles.length > 0) {
                                                // console.log('获取下一个上传文件');

                                                // setTimeout(that.goFiles, 200, tip, item);
                                                // that.goFiles();
                                            }
                                        }
                                    }

                                    that.updateDocumentTable();
                                    // // console.log('doneFiles------------------------in');
                                    // if (that.restFiles.length === 0) {
                                    //     if (that.documentTableData.length > 0) {
                                    //         // console.log('doneFiles---getProcess------------------------in');
                                    //         that.getProcess();
                                    //     }
                                    // }
                                }
                                // that.setProcessNum+=list.fileCompletionInBytes
                                // 出现错误
                            }else{
                                for(let i=0;i<that.documentTableData.length;i++){
                                    if(that.documentTableData[i].name===item&&that.documentTableData[i].originalFileName===tip.name){
                                        // // console.log
                                        // console.log('返回不是200更新状态到UploadError')
                                        that.documentTableData[i].restStatus = false;
                                        that.documentTableData[i].done = false;
                                        that.documentTableData[i].isPrepare = false;
                                        that.documentTableData[i].isStart = false;
                                        that.documentTableData[i].conCateStatus='UploadError';
                                        // 提出可上传队列
                                        that.arrsStart.remove(that.documentTableData[i]);
                                        if(that.restFiles.length>0){
                                            // console.log('上传失败获取下一个文件上传');
                                            that.goFiles();
                                        }
                                    }
                                }
                                that.updateDocumentTable();
                            }
                        }).catch((error)=>{
                            // console.log('上传连接异常');
                            // console.log(error);
                            for(let i=0;i<that.documentTableData.length;i++) {
                                if (that.documentTableData[i].name === item && that.documentTableData[i].originalFileName === tip.name) {
                                    // console.log('更新状态到UploadError')
                                    if (that.restFiles.length > 0 && that.errorRecordList.indexOf(that.documentTableData[i].name) == -1) {
                                        // console.log('lastToFiles-------------------------------')
                                       that.arrsStart.remove(that.documentTableData[i]);
                                       that.lastToFiles(that.documentTableData[i]);
                                        if (that.restFiles.length > 0) {
                                            // console.log('上传连接异常，获取下一个文件');
                                            setTimeout(function () {
                                                that.goFiles();
                                            }, 5000);
                                        }
                                        that.updateDocumentTable();
                                        break;
                                    } else {
                                        that.documentTableData[i].conCateStatus = 'UploadError';
                                        that.documentTableData[i].restStatus = false;
                                        that.documentTableData[i].done = false;
                                        that.documentTableData[i].isPrepare = false;
                                        that.documentTableData[i].isStart = false;
                                        // console.log(that.documentTableData[i].name);
                                        // 踢出可上传队列
                                        that.arrsStart.remove(that.documentTableData[i]);
                                        if (that.restFiles.length > 0) {
                                            // console.log('上传连接异常，获取下一个文件');
                                            setTimeout(function () {
                                                that.goFiles();
                                            }, 5000);
                                        }
                                        that.updateDocumentTable();
                                        that['$message']({
                                            message: '连接服务器失败，请保持网络连接，点击重新上传',
                                            type: 'error',
                                            duration: 5 * 1000
                                        });
                                    }
                                }
                            }
                            // that.allProcessInit = true;
                            // that.catch = false;
                        })
                    }
                };
                // 判断浏览器类型
                if(window.navigator&&window.navigator.msSaveOrOpenBlob){
                    // reader.readAsDataURL(chunk);
                    reader.readAsArrayBuffer(chunk);
                }else{
                    reader.readAsBinaryString(chunk);
                }
            // }
        }
        // 确认继续上传
        fileUploadProcessStarter(pendingFile) {
            // console.log('fileUploadProcessStarter----------------------------');
            // 未完成的传输
            const me = this;
            pendingFile.originalFileSizeInBytes = pendingFile.size;
            // console.log('fileUploadProcessStarter---------------0000000');
            if (pendingFile.fileCompletionInBytes < pendingFile.originalFileSizeInBytes) {
                pendingFile.end = pendingFile.fileCompletionInBytes + this.bytesPerChunk;
                // console.log(this.arrsStart);
                // console.log(pendingFile.name);
                // console.log(pendingFile.size);
                // console.log(this.allProcessInit);
                for(let tip of this.arrsStart){
                    if(pendingFile.name===tip.originalFileName&&pendingFile.size===tip.originalFileSizeInBytes){
                        // console.log('fileUploadProcessStarter----------doneFile');
                        pendingFile.restStatus = false;
                        this.doneFiles(pendingFile,tip.name,tip);
                        let t = new Date().getTime() - this.progressTime;
                        if(t > 2000){
                            // console.log('fileUploadProcessStarter----------getProcess');
                            setTimeout(me.getProcess,2000);
                        }
                    }
                }
               // this.getProcess();
            } else {
                // console.log('fileUploadProcessStarter---------------over');
                pendingFile.fileComplete=true;
                pendingFile.conCateStatus = "Done";
                this.updateDocumentTable();
                if(this.restFiles.length > 0){
                    this.goFiles();
                }
            }
        }
        // 赋值断点文件上传参数
        goOnUpload(data,file){
            // console.log('goOnUpload----------------------------');
            // if(file.file.name===data.originalFileName){
            data.isPrepare = true;
            data.data.status = 'Uploading';
            file.file.crcedBytes = data.crcedBytes;
            file.file.fileCompletionInBytes = data.fileCompletionInBytes;
            this.fileResumeProcessStarter(data.name,file.file)
            // }
        }
        //更新tab名称的文件数量显示
        updateTabName() {
            if (this.documentTableData.length > 0) {
                this.tabName0 = '正在上传(' + this.documentTableData.length + ')';
            } else {
                this.tabName0 = '正在上传';
            }
            if (this.borrowTableData.length > 0) {
                this.tabName1 = '传输完成(' + this.borrowTableData.length + ')';
            } else {
                this.tabName1 = '传输完成';
            }
            if (this.errorTableData.length > 0) {
                this.tabName2 = '传输失败(' + this.errorTableData.length + ')';
            } else {
                this.tabName2 = '传输失败';
            }
        }
        // 上传渐变色
        getColor(){
            if(this.process>=0&&this.process<=10){
                this.processColor = 'rgb(247,78,0)'
            }else if(this.process>10&&this.process<=30){
                this.processColor = 'rgb(255,161,7)'
            }else if(this.process>30&&this.process<=40){
                this.processColor = 'rgb(255,125,1)'
            }else if(this.process>40&&this.process<=50){
                this.processColor = 'rgb(255,125,1)'
            }else if(this.process>50&&this.process<=60){
                this.processColor = 'rgb(250,201,2)'
            }else if(this.process>60&&this.process<=70){
                this.processColor = 'rgb(198,233,42)'
            }else if(this.process>70&&this.process<=90){
                this.processColor = 'rgb(146,176,0)'
            }else if(this.process>90&&this.process<=100){
                this.processColor = 'rgb(8,208,45)'
            }
        }
        // 侦察进度
        getProcess() {
            // console.log('getProcess----------------------------');
            // let fileIds = [];
            // // for(let data of this.documentTableData){
            // //     if(data.isPrepare){
            // //         ann.push(data);
            // //         annName.push(data.name);
            // //     }
            // // }
            // fileIds.push(this.currentUploadFileId);
            // Service.prepareUpload({fileIds: fileIds},'getProgress',this.clientId).then(res => {
            //     debugger;
            //     let processList = [];
            //     let datas = res.data;
            //     for(let a in datas.data){
            //         // datas[a].processId = a;
            //         processList.push(datas.data[a]);
            //         if(datas.succeeded && datas.data[a].status === 'Done') {
            //         this.fileUploadShow = false;
            //         this.processStop = true;
            //         this.fileVisible1 = false;
            //         this['$message']({
            //             message: '上传成功',
            //             type: 'success'
            //         });
            //         // 删除挂接云空间的文件
            //         Service.searchUpload({fileIds: fileIds} ,this.clientId).then(() =>{});
            //         // 获取原文列表
            //         // this.getOriginalsList();
            //     }
            //     if(datas.succeeded && (datas.data[a].status === 'UploadError' || datas.data[a].status === 'ProcessError')) {
            //         this.fileUploadShow = false;
            //         this.processStop = true;
            //         this.fileVisible1 = false;
            //         this['$message']({
            //             message: '上传失败',
            //             type: 'warning'
            //         });
            //         // // 删除挂接云空间的文件
            //         Service.searchUpload({fileIds: fileIds},this.clientId).then(() =>{});                 
            //     }
            //     };
            //     // this.documentTableData[0].process = Number(processList[0].progress.toFixed(1));
            //     // this.process = this.documentTableData[0].process;
            //     // this.getColor();
            //     if(!this.processStop){
            //         setTimeout(this.getProcess, 1000);
            //     }
                
            // });
            // this.setProcessNum = 0;
            this.catch = true;
            // console.log(' this.progressTime-------------------'+ this.progressTime);
            if(new Date().getTime() - this.progressTime < 500){
                return;
            }
            this.progressTime = new Date().getTime();
            // // 显示进度球
            // if(this.isCompleteProcess){
            //     this.SET_isShow1();
            // }
            // if(!this.prepareBlob.yes){
            let that = this;

            // if(!this.isDelete){
            let ann = [];
            let annName = [];
            if (that.arrsStart.length > 0) {
                let files = this.preFiles;
                let arr = [];
                // files.forEach(function(item,index){
                //     for(let tip of that.arrsStart){
                //         // if(item.file.name===tip.originalFileName&&item.file.size==tip.originalFileSizeInBytes){
                //             // that.currentUploadFileId = that.prepareBlob[index];
                //             that.doneFiles(item.file,this.prepareBlob[index],'');
                //         // }
                //     }
                // });
                // for (let data of that.arrsStart) {

                //     if (data.isPrepare && !data.done) {
                //         ann.push(data);
                //         annName.push(data.name);
                //     }
                // }
                // console.log('获取上传进度');
                that.arrsStart.forEach(function(item,index){
                    // for(let tip of that.arrsStart){
                        // if(item.file.name===tip.originalFileName&&item.file.size==tip.originalFileSizeInBytes){
                            // that.currentUploadFileId = that.prepareBlob[index];
                            // that.doneFiles(item.file,this.prepareBlob[index],'');
                        // }
                    // }
                annName.push(item.prepareId);
                if (annName.length!==0) {
                    
                    // let b = JSON.stringify(annName);
                     Service.prepareUpload({fileIds: annName},'getProgress',that.clientId).then(res => {
                        //  debugger;
                        that.catchCount = 0;
                        let processList = [];
                        let datas = res.data.data;
                        // console.log('prepareUpload2');
                        // console.log(datas);
                        for (let a in datas) {
                            datas[a].processId = a;
                            processList.push(datas[a]);
                        };
                        // 查询出不是暂停状态的文件的进度
                        // // console.log('查询出不是暂停状态的文件的进度');
                        // // console.log(res.data);
                        debugger;
                        // let cloudUploadDataList = that.$refs['cloudUploadManagementRef'].cloudUploadDataList;
                        // console.log(cloudUploadDataList);
                        that.processAB = Number(processList[0].progress.toFixed(0)) > 100 ? 100 : Number(processList[0].progress.toFixed(0));
                        if(that.cloudUploadDataList.length !== 0) {
                            
                            // that.getUploadFilesOfCloud (that.cloudDirId);
                                for (let i = 0; i < that.cloudUploadDataList.length; i++) {
                            // 上传列表侦察文件分条进度
                            for (let j = 0; j < processList.length; j++) {
                                console.log(processList[j].status);
                                if (that.cloudUploadDataList[i].prepareId === processList[j].processId) {
                                    debugger;
                                    that.cloudUploadDataList[i].process = Number(processList[j].progress.toFixed(0)) > 100 ? 100 : Number(processList[j].progress.toFixed(0))
                                    // that.getUploadFilesOfCloud (that.cloudDirId,i,process);
                                    that.upDataCloudUploadDataList(that.cloudUploadDataList);
                                    // if(processList[j].status === 'UploadError'){
                                    //     if(that.errorRecordList.indexOf(cloudUploadDataList[i].name) > -1){
                                    //         continue;
                                    //     }
                                    //     // console.log('server 返回 UploadError 处理数据')
                                    //     // console.log(processList);
                                    //     // console.log(that.errorRecordList);
                                    //     // console.log(that.documentTableData[i].originalFileName);
                                    //     cloudUploadDataList[i].conCateStatus = 'UploadError';
                                    //     cloudUploadDataList[i].restStatus = false;
                                    //     cloudUploadDataList[i].done = false;
                                    //     cloudUploadDataList[i].isPrepare = false;
                                    //     cloudUploadDataList[i].isStart = false;
                                    //     // console.log(that.documentTableData[i].name );
                                    //     // 踢出可上传队列
                                    //     that.arrsStart.remove(cloudUploadDataList[i]);
                                    // } else if(processList[j].status !== 'UploadError') {
                                    //     cloudUploadDataList[i].conCateStatus = processList[j].status;
                                    //     cloudUploadDataList[i].data.status = processList[j].status;
                                    //     if (cloudUploadDataList[i].process !== 100 && !cloudUploadDataList[i].isOne) {
                                    //         cloudUploadDataList[i].process = Number(processList[j].progress.toFixed(1)) > 100 ? 100 : Number(processList[j].progress.toFixed(1));
                                    //     } else {
                                    //         if (cloudUploadDataList[i].data.status === 'Start') {
                                    //             cloudUploadDataList[i].process = 100
                                    //         }
                                    //     }
                                    //     // console.log('更新状态' + that.documentTableData[i].conCateStatus);
                                    //     // console.log('更新状态status=' + that.documentTableData[i].data.status);
                                    //     // console.log('更新进度' + that.documentTableData[i].process);
                                    // }else if(processList[j].status === 'Done') {
                                    //     debugger;
                                    //     this.$refs['cloudUploadManagementRef'].getUploadFilesOfCloud (this.cloudDirId);
                                    // }
                                }
                            }
                        }
                        }
                        
                        
                            for (let j = 0; j < processList.length; j++) {
                                // if (that.newDocumentTableData[i].name === processList[j].processId) {
                                    if(processList[j].status === 'UploadError'){
                                        // if(that.errorRecordList.indexOf(that.newDocumentTableData[i].name) > -1){
                                        //     continue;
                                        // }
                                        // console.log('server 返回 UploadError 处理数据')
                                        // console.log(processList);
                                        // console.log(that.errorRecordList);
                                        // console.log(that.documentTableData[i].originalFileName);
                                        // that.newDocumentTableData[i].conCateStatus = 'UploadError';
                                        // that.newDocumentTableData[i].restStatus = false;
                                        // that.newDocumentTableData[i].done = false;
                                        // that.newDocumentTableData[i].isPrepare = false;
                                        // that.newDocumentTableData[i].isStart = false;
                                        // console.log(that.documentTableData[i].name );
                                        // 踢出可上传队列
                                        that.arrsStart.remove(processList[j]);
                                        return false;
                                    } else if(processList[j].status !== 'Done') {
                                        setTimeout(that.getProcess, 1000);
                                    } else if(processList[j].status === 'Done') {
                                        // that.fileUploadShow = false;
                                        // that.processStop = true;
                                        // that['$message']({
                                        //     message: '上传成功',
                                        //     type: 'success'
                                        // });
                                        // that.loadingInstance.close();
                                        if (that.restFiles.length > 0) {
                                            debugger;
                                            that.goFiles();
                                        }
                                    }
                                    
                                // }
                            }
                        // }
                        // for(let i in datas){
                        //     this.setProcessNum+= Number(datas[i].progress.toFixed(1))
                        // }
                        // for(let data of this.documentTableData){
                        //     this.setProcessNum+= data.start;
                        // }
                        // 根据进度增删表格条目
                        // for (let i = 0; i < that.newDocumentTableData.length; i++) {
                        //     // 判断上传完毕后是否在挂接状态
                        //     if (that.newDocumentTableData[i].conCateStatus == 'Done') {
                        //         that.newDocumentTableData[i].done = true;
                        //         that.arrsStart.forEach(function (item) {
                        //             if (that.newDocumentTableData[i].originalFileSizeInBytes == item.originalFileSizeInBytes && item.originalFileName === that.documentTableData[i].originalFileName) {
                        //                 item.done = true;
                        //             }
                        //         });
                        //     }
                        // }
                        // 计数全部进程是否均小于切片系数
                        // if (that.numAll === that.fileList.length) {
                        //     // this['$store'].commit('SET_PROCESS',100);
                        //     that['$store'].commit('SET_isShow', false);
                        //     that['$store'].commit('SET_PROCESS', 0);
                        // } else {
                        //     // 计算总值
                        //     if (processList.length > 0) {
                        //         this['$store'].commit('SET_PROCESS', ((that.setProcessNum) * 100 / this.preFiles.length).toFixed(1));
                        //         // this['$store'].commit('SET_PROCESS', ((this.allProcessDatas.length-this.documentTableData.length)*100/this.allProcessDatas.length).toFixed(1));
                        //     }
                        // }
                        //// console.log(that.allProcessDatas.length)
                        //// console.log(that.documentTableData.length)
                        // 判断是否全部上传完毕,禁止上传
                        // let arr = []; //文件总进度
                        // let att = []; //start进度文件集合
                        // for (let datas of this.newDocumentTableData) {
                        //     if (datas.data.status === 'Start' || datas.data.status === 'Uploading' || datas.data.status === 'UploadError' || datas.data.status === 'ProcessError'
                        //         || datas.data.status === 'UploadFinish') {
                        //         att.push(datas);
                        //         if (datas.done || !datas.isPrepare) {
                        //             arr.push(datas)
                        //         }
                        //     }
                        // }

                        // 再次赋值
                        // for (let i = 0; i < that.newDocumentTableData.length; i++) {
                        //     // 判断上传完毕后是否在挂接状态
                        //     if (that.newDocumentTableData[i].conCateStatus == 'Done') {
                        //         that.newDocumentTableData[i].done = true;
                        //         that.arrsStart.forEach(function (item) {
                        //             if (item.originalFileName === that.newDocumentTableData[i].originalFileName && item.originalFileSizeInBytes === that.newDocumentTableData[i].originalFileSizeInBytes) {
                        //                 item.done = true;
                        //             }
                        //         });


                        //         // this.allProcessDatas = this.allProcessDatas.concat(this.documentTableData[i]);
                        //         // 添加done状态的序列
                        //         let arrBorrow = that.borrowTableData;
                        //         // 实时获取上传完成的路径
                        //         let ids = [];
                        //         if (arrBorrow.length > 0) {
                        //             ids = Array.from(new Set(att.map(function (item) {
                        //                 return item.data.targetDirId
                        //             }).toString().split(',')));
                        //         }

                        //         let strIds = JSON.stringify(ids);
                        //         if (that.fileCloudPathParam !== strIds) {
                        //             // 获取云盘路径
                        //             Service.getUploadUrl(ids).then((res) => {
                        //                 that.fileCloudPathParam = strIds;
                        //                 that.fileUpObj = res.data.data;
                        //                 for (let obj of that.borrowTableData) {
                        //                     for (let i in that.fileUpObj) {
                        //                         if (obj.data.targetDirId == i) {
                        //                             obj.physicalPath = that.fileUpObj[i]
                        //                         }
                        //                     }
                        //                 }
                        //             });
                        //         } else {
                        //             for (let obj of that.borrowTableData) {
                        //                 for (let i in that.fileUpObj) {
                        //                     if (obj.data.targetDirId == i) {
                        //                         obj.physicalPath = that.fileUpObj[i]
                        //                     }
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }
                        // 尚有未上传完成的文件
                        if (arr.length !== att.length) {
                            that.allProcessInit = false;
                            // console.log('尚有未上传完成的文件');
                            // console.log(att);
                            // console.log(arr);
                            // setTimeout(that.getProcess, 2000);
                        } else {
                            this.allProcessInit = true;
                            that.$refs['cloudUploadManagementRef'].getUploadFilesOfCloud(this.cloudDirId);  
                            // that.setProcessNum = 0;
                            // 文件全部上传完毕
                            // console.log('// 文件全部上传完毕');
                            // // console.log(that.documentTableData);
                            // // console.log('// 文件全部上传完毕--restFiles');
                            // // console.log(that.restFiles);
                            if (that.newDocumentTableData.length > 0) {
                                that.updateDocumentTable();

                                let ann = [];
                                for (let j = that.newDocumentTableData.length - 1; j >= 0; j--) {
                                    if (that.newDocumentTableData[j].conCateStatus === 'Done') {
                                        that.newDocumentTableData[j].done = true;
                                        ann.push(that.newDocumentTableData[j]);
                                    }
                                }

                                if (ann.length > 0) {
                                    // this.allProcessInit = false;
                                    // setTimeout(that.getProcess, 2000);
                                } else {
                                    that.isCompleteProcess = false;
                                    that['$store'].commit('SET_isShow', false);
                                    //     this.allProcessInit = true;
                                }
                                // console.log('上传完成查看列表')
                                // console.log(that.documentTableData)
                            } else {
                                that.isCompleteProcess = false;
                                that['$store'].commit('SET_isShow', false);
                                // this.allProcessInit = true;
                            }
                        }
                    }).catch((error) => {
                        // // console.log('连接服务器失败，请保持网络连接，点击继续上传');
                        if (that.catchCount < 60) {
                            // console.log('连接服务器失败，重新连接次数=' + that.catchCount);
                            that.catchCount++;
                            // setTimeout(that.getProcess, 5000);
                        } else {
                            that['$message']({
                                message: '连接服务器失败，请保持网络连接，点击继续上传',
                                type: 'error',
                                duration: 5 * 1000
                            });
                            that.catch = false;
                            that.allProcessInit = true;
                        }
                    })
                } else {
                    // console.log('没有获取到正在上传的文件进度');
                    // console.log(that.arrsStart);
                    if (that.newDocumentTableData.length > 0) {
                        for (let i = 0; i < that.newDocumentTableData.length; i++) {
                            // 判断上传完毕后是否在挂接状态
                            if (that.newDocumentTableData[i].conCateStatus === 'Done') {
                                that.newDocumentTableData[i].done = true;
                                that.arrsStart.forEach(function (item) {
                                    if (item.originalFileName === that.newDocumentTableData[i].originalFileName && item.originalFileSizeInBytes === that.newDocumentTableData[i].originalFileSizeInBytes) {
                                        item.done = true;
                                    }
                                });
                            }
                        }
                        let existUploadFile = false;
                        for (let j = that.newDocumentTableData.length - 1; j >= 0; j--) {
                            if (that.newDocumentTableData[j].conCateStatus !== 'ProcessError'
                                && that.newDocumentTableData[j].conCateStatus !== 'UploadError') {

                                if (that.conCateStatus !== 'Done') {
                                    // console.log('还有没完成的上传文件，继续获取进度');
                                    // setTimeout(that.getProcess, 5000);
                                    existUploadFile = true;
                                    break;
                                }
                            }
                        }
                        // // console.log(existUploadFile);
                        if (!existUploadFile) {
                            // console.log('文件上传完成，更新列表');
                            that.updateDocumentTable();
                            // that.findList();
                        }

                    }
                    that.allProcessInit = true;
                    that.catch = false;
                    that['$store'].commit('SET_isShow', false);

                }
                // }
                // }
                });
            }
        }
        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };
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
         DataImporterExport(params){
            Service.DataImporterExport(params).then(res=>{
                console.log(res)
                if(res){
                    if(res['type']=='application/json'){
                        this.getError('所选文件无电子原文！');
                    }else{
                        let data = res;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var csvData =  new Blob([data]);
                            if(params['isAtta']=='2'){
                                window.navigator.msSaveOrOpenBlob(csvData,params['nodeName']+'.zip');
                            }else{
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName=excelName+"_案卷目录";
                                        break;
                                    case 3:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                    case 4:
                                        excelName=excelName+"_未整理目录";
                                        break;
                                    case 5:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                }
                                window.navigator.msSaveOrOpenBlob(csvData,excelName+'.'+params['type']);
                            };
                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            if(params['isAtta']=='2'){
                                link.setAttribute('download',params['nodeName']+'.zip');
                            }else{
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName=excelName+"_案卷目录";
                                        break;
                                    case 3:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                    case 4:
                                        excelName=excelName+"_未整理目录";
                                        break;
                                    case 5:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                }
                                link.setAttribute('download',excelName+'.'+params['type']);
                            };
                            document.body.appendChild(link);
                            link.click();
                         }

                    }
                }
            });
        }    
        created(){   
            this.$nextTick(() => {
                this.$refs['cloudUploadManagementRef'].tabName0 = '正在上传';
                this.$refs['cloudUploadManagementRef'].tabName1 = '传输完成';
                this.$refs['cloudUploadManagementRef'].tabName2 = '传输失败';
            });
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 300;
                })()
            };
            
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../../styles/innerPublic.scss';
    .cloudListView {
        .fontClass{
            i{
                font-size: 25px;
                color: #2b87c6;
                vertical-align: middle;
                cursor: pointer;
            }
        }
        .tableTitle {
            padding-top: 10px;
            float: left;
        }
    }
    body {
       .uploader-list{
            margin: 10px 0;
            padding: 0 10px;
            min-height: 100px;
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid #ccc;
        }
  } 
</style>
