<template>
    <section class="wrapprSection cloudListView">
        <div v-show = "showfa" class="cloudListContentView">
            <div class="mainTitle">
            <span>云盘管理</span>
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
                            <el-tree
                                :load="loadNodeTree"
                                node-key="id"
                                lazy
                                :props="defaultProps"
                                :expand-on-click-node="true"
                                :render-content="renderContent" 
                                :default-checked-keys="defaultChoosed"
                                @node-click = "setDataToTrees"
                                ref="loadNodeTree"
                                :default-expanded-keys="defaultTreeOpen">
                            </el-tree>    
                </div>
            </div>
            <div class="contentbox mainCon basicList pd10 boxshow bgwhite"> 
                <div v-show="treesId === -1 ? showHeader : !showHeader">
                    <span class="tableTitle">原文列表</span>
                    <div class="text-right">     
                        <el-button class="defaultBtn" @click="findList()">查看上传</el-button> 
                        <el-button class="redBtn" @click="deleteList()">删除</el-button>
                        <el-button class="defaultBtn" @click="upLoads()">上传</el-button>
                    </div>
                    <el-table border stripe :height="bodyHeight - 60" 
                    :data="cloudListData" 
                    highlight-current-row 
                    element-loading-text="努力加载中..."
                    v-loading="listLoading" 
                    class="defaultTable" 
                    :empty-text="treesId === -1 ?'请选择云盘目录':'暂无数据'" 
                    header-row-class-name="tableHeader"
                    @selection-change="selsChange"
                    >
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
                        <el-table-column prop="name" label="文件名称">
                        </el-table-column>
                        <el-table-column  prop="createDate" label="上传时间" :formatter="dateFormat1">
                        </el-table-column>
                        <el-table-column  prop="renderFileSize" label="文件大小">
                        </el-table-column>
                    </el-table>
                    <div class="clear mt10">                         
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[25, 50, 100, 200]"
                        :page-size="25"
                        layout="total, sizes, prev,pager, next, jumper"
                        :total="cloudListDataTotal">
                        </el-pagination>
                    </div> 
                </div>
            </div> 
            <!-- <el-dialog :show-close = 'false' class="fileModal processModal" :visible.sync="fileVisible1" :close-on-click-modal="false">
                <div>
                    <el-progress type="circle" :stroke-width="12" :percentage="process" color="rgb(146,176,0)"></el-progress>
                </div>
            </el-dialog> -->
            <!-- 添加目录弹框 -->
                <el-dialog
                        :title="catalogTitle"
                        :visible.sync="centerDialogVisible"
                        :close-on-click-modal="true"
                        class="myDialogCenter"
                        :modal-append-to-body="false"
                        width="40%"
                >
                    <div>
                        <el-form ref="dioForm" :model="dioForm" class="addfiles">
                            <!-- <el-form-item prop="title" label="父节点名称：" label-width="120px">
                                <el-input class="checkName" readonly v-model="tltForm" clearable></el-input>
                            </el-form-item> -->
                            <el-form-item prop="title" label="名称：" label-width="120px" :rules="[{required:true,message:'请填写名称',trigger:'blur'}]">
                                <el-input class="checkName" v-model="dioForm.title" clearable placeholder="请输入添加的目录名称" ></el-input>
                            </el-form-item>
                            <el-form-item prop="title" label="备注：" label-width="120px">
                                <el-input class="checkName" v-model="dioForm.titleNode" clearable placeholder="请输入添加的目录备注" ></el-input>
                            </el-form-item>
                            <!-- <span class="titleSpan" style="margin:8px 0 0 10px">备注：</span><el-input class="checkName" style="width:80%" v-model="dioForm.titleNode" clearable placeholder="请输入添加目录的备注"></el-input> -->
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addEventFormSubmitBtns('dioForm')" class="defaultBtn">确 定</el-button>
                    <el-button @click="centerDialogVisible = false" class="defaultBtn">取 消</el-button>
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
                    <el-button type="primary" @click="centerDialogVisibleBianjiEvent()" class="defaultBtn">确 定</el-button>
                    <el-button @click="centerDialogVisibleBianji = false" class="defaultBtn">取 消</el-button>
                </span>
                </el-dialog>
            <!-- 表格进行重命名-->
                <el-dialog
                        title="重命名"
                        :visible.sync="dataListTit"
                        width="40%"
                        :modal-append-to-body="false"
                        center class="myDialogCenter">
                    <span class="titleSpan">文件名称：</span><el-input class="checkName mt20" v-model="listTit" clearable></el-input>
                    <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dataListTitEvent()" class="defaultBtn">确 定</el-button>
                    <el-button @click="dataListTit = false" class="defaultBtn">取 消</el-button>
                </span>
                </el-dialog>
            <!-- 确定上传-->
                <el-dialog title="上传文件" v-dialogDrag :visible.sync="fileUploadShow" class="myDialogCenter fileUploadView" width="30%">
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
                            <uploader-btn id="global-uploader-btn" ref="uploadBtn" class="el-button defaultBtn">选择文件</uploader-btn>
                            <uploader-btn id="global-uploader-btn1" :directory="true"   class="el-button defaultBtn" ref="uploadBtn">选择文件夹</uploader-btn>

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
                        <el-button class="defaultBtn" @click="uploadEvent()">上传</el-button>
                        <el-button class="defaultBtn" @click.native="fileUploadShow=false">取消</el-button>
                    </div>
                </el-dialog>
                </div>
         <div v-show="showzi">
             <!-- <div class="mainTitle">上传档案</div> -->
             <div class="titleBlue">
                 <b></b>
                 <div class="mainTitle">
                    <span>云盘管理 >  上传任务管理</span>
                    <div class="rt mr10" style="position:relative;z-index:1;">
                        <el-button class="defaultBtn mt62" @click="reFiles()" v-show="this.errorTableData.length>0&&activeName==='2'">重新上传</el-button>
                        <!--<el-button @click="goUploads()" :disabled="!allProcessInit||documentTableData.length===0" v-show="activeName==='0'" class="el-button checkWay" style="position:absolute;right:223px;top:10px">继续上传</el-button>-->
                        <!-- <el-button @click="deleteAllFileUploads()" v-show="activeName==='0'" class="defaultBtn mt10" style="position:absolute;right:100px;top:10px">清空未完成</el-button> -->
                        <el-button @click="deleteAllFileUploads()" v-show="this.borrowTableData.length>0&&activeName==='1'" class="defaultBtn mt62">清空已完成</el-button>
                        <!-- <el-button @click="resumeAllFiles()" v-show="this.documentTableData.length>0&&activeName==='0'" class="defaultBtn mt62">全部继续</el-button>
                        <el-button @click="pauseAllFiles()" v-show="this.documentTableData.length>0&&activeName==='0'" class="defaultBtn mt62">全部暂停</el-button> -->
                        <el-button @click="goBack()" class="defaultBtn mt62">返回</el-button>
                    </div>
                </div>
             </div>
             <div class="mainDoc">
                 <div class="mainCon mainBorrow" style="padding:10px;">
                     <div class="formData">
                         <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="erpTab">
                             <el-tab-pane :label="tabName0" name="0">
                             </el-tab-pane>
                             <el-tab-pane :label="tabName1" name="1">
                             </el-tab-pane>
                             <el-tab-pane :label="tabName2" name="2">
                             </el-tab-pane>
                         </el-tabs>
                     </div>
                     <!--列表(正在上传)-->
                     <div class="borderTable mainCon basicList pd10 boxshow bgwhite uploadingView" v-show="documentShow">
                         <el-table border :height="fileHeight" :data="documentTableData" highlight-current-row v-loading="listLoading"  class="defaultTable" header-row-class-name="tableHeader">
                              <!-- <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column type="index" width="50" label="序号"></el-table-column> -->
                             <!-- <el-table-column label="操作" width="100">
                                 <template slot-scope="scope"> -->
                                     <!-- <span class="addBtn" @click="lastToFiles(scope.row)"  v-if="scope.row.conCateStatus==='UploadError'">重新上传</span> -->
                                     <!-- <el-button class="tabletoolBtn" @click="lastToFiles(scope.row)"  v-if="scope.row.conCateStatus==='UploadError'">重新上传</el-button> -->
                                     <!--&lt;!&ndash;&&scope.row.data.status!=='UploadError'&ndash;&gt;-->
                                     <!--<div v-if="scope.row.data.status!=='ProcessError'">-->
                                         <!--<div v-if="scope.row.data.restStatus === false&&!scope.row.Concate">-->
                                    <!-- <span class="addBtn" @click="pauseFiles(scope.row)" v-if="scope.row.isPrepare&&scope.row.process!==100&&scope.row.data.status!=='Paused'">暂停上传</span>
                                    <span class="addBtn" @click="resumeFiles(scope.row)"  v-if="!scope.row.isPrepare&&scope.row.process!==100&&scope.row.data.status!=='Paused'">继续上传</span>
                                    <span class="addBtn" @click="pauseFiles(scope.row)">暂停上传</span> -->
                                    <!-- <el-button class="tabletoolBtn" @click="pauseFiles(scope.row)" v-if="scope.row.isPrepare&&scope.row.process!==100&&scope.row.data.status!=='Paused'">暂停上传</el-button>
                                    <el-button class="tabletoolBtn" @click="resumeFiles(scope.row)"  v-if="!scope.row.isPrepare&&scope.row.process!==100&&scope.row.data.status==='Paused'">继续上传</el-button> -->
                                         <!--</div>-->
                                         <!--<span class="addBtn" @click="reFiles(scope.row)"  v-if="scope.row.data.status==='Paused'&&!scope.row.Concate">重新上传</span>-->
                                     <!--</div>-->
                                     <!--&lt;!&ndash;<div v-else>上传错误</div>&ndash;&gt;-->
                                 <!-- </template>
                             </el-table-column> -->
                             <el-table-column prop="originalFileName" label="文件名称">
                             </el-table-column>
                             <el-table-column prop="creationDate" :formatter="dateFormat1" label="上传时间">
                             </el-table-column>
                             <!--<el-table-column prop="physicalPath" label="云盘位置">-->
                             <!--</el-table-column>-->
                             <el-table-column prop="name" label="状态" width="350">
                                 <template slot-scope="scope">
                                     <div v-if="scope.row.data.status!=='ProcessError'">
                                         <span v-if="scope.row.conCateStatus==='UploadError'" style="color:red">上传失败</span>
                                         <div v-else>
                                             <el-progress v-if="!scope.row.data.restStatus&&!scope.row.data.pauseStatus&&!scope.row.Concate" :text-inside="false" :stroke-width="12" :percentage="scope.row.process" ></el-progress>
                                             <!--<span v-if="scope.row.data.pauseStatus&&!scope.row.Concate" style="color:orange">暂停中，上传至 <span style="color:green;">{{scope.row.process}}%</span></span>-->
                                             <span v-else-if="scope.row.data.restStatus&&!scope.row.data.pauseStatus&&!scope.row.Concate" style="color:orange">等待中</span>
                                             <span v-else-if="scope.row.Concate&&!scope.row.ConError&&scope.row.process===100" style="color:green">上传完成，处理中</span>
                                             <span v-else-if="scope.row.ConError" style="color:red">上传完成，后续处理失败</span>
                                         </div>
                                     </div>
                                     <div v-else style="color:red">
                                         <span>上传完成，后续处理失败</span>
                                     </div>
                                 </template>
                             </el-table-column>
                         </el-table>
                         <!--&lt;!&ndash;工具条分页&ndash;&gt;-->
                         <!--<el-col :span="24" class="pager" style="padding:15px 10px 10px 0">-->
                         <!--<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">-->
                         <!--</el-pagination>-->
                         <!--</el-col>-->
                     </div>

                     <!--列表(传输完成)-->
                     <div class="borderTable borderTable mainCon basicList pd10 boxshow bgwhite" v-show="borrowShow" ref="borrowTableData">
                         <el-table border :height="fileHeight" :data="borrowTableData" highlight-current-row v-loading="listLoading"  class="defaultTable" header-row-class-name="tableHeader">
                             <!-- <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column type="index" width="50" label="序号"></el-table-column> -->
                             <el-table-column prop="originalFileName" label="文件名称">
                             </el-table-column>
                             <el-table-column prop="creationDate" :formatter="dateFormat1"  label="上传时间">
                             </el-table-column>
                             <el-table-column prop="physicalPath" label="云盘位置">
                             </el-table-column>
                         </el-table>
                     </div>

                     <!--列表(传输失败)-->
                     <div class="borderTable borderTable mainCon basicList pd10 boxshow bgwhite" v-show="errorShow">
                         <el-table border :height="fileHeight" :data="errorTableData" highlight-current-row v-loading="listLoading"  class="defaultTable" header-row-class-name="tableHeader">
                             <!-- <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column type="index" width="50" label="序号"></el-table-column> -->
                             <el-table-column prop="originalFileName" label="文件名称">
                             </el-table-column>
                             <el-table-column prop="creationDate" :formatter="dateFormat1"  label="上传时间">
                             </el-table-column>
                             <el-table-column prop="name" label="状态" width="300">
                                 <!-- <template slot-scope="scope">
                                     <div v-if="Number(scope.row.process)>=100" style="color:orange">上传完成，后续处理失败</div>
                                     <div v-else><el-progress :text-inside="false" :stroke-width="12" :percentage="scope.row.process" ></el-progress></div>
                                 </template> -->
                                 <template slot-scope="scope">  
                                    <div v-if="Number(scope.row.process)>=100 && scope.row.data.status === 'ProcessError'" style="color:orange">上传完成，后续处理失败</div>
                                    <span v-else-if="scope.row.data.status === 'Unknown'" style="color:orange">未知错误</span>
                                    <span v-else style="color:red;">上传失败</span>                    
                                </template>
                             </el-table-column>
                         </el-table>
                         <!--&lt;!&ndash;工具条分页&ndash;&gt;-->
                         <!--<el-col :span="24" class="pager" style="padding:15px 10px 10px 0">-->
                         <!--<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">-->
                         <!--</el-pagination>-->
                         <!--</el-col>-->
                     </div>
                 </div>
             </div>
         </div>
         <!--错误文件上传-->
         <el-dialog title="重新上传文件" :visible.sync="fileUploadShow1" class="myDialogCenter fileUploadView" width="30%">
             <div id="global">
                 <!-- 上传 -->
                 <uploader
                         ref="uploader1"
                         :options="options"
                         :autoStart="false"
                        @file-added="onFileAdded"
                         @files-submitted="onFileSubmit1"
                         @change = "chooseFiles1"
                         class="uploader-app">
                     <uploader-unsupport></uploader-unsupport>
                     <!--:attrs="attrs"-->
                     <uploader-btn id="global-uploader-btn2" ref="uploadBtn" class="el-button defaultBtn">选择文件</uploader-btn>
                     <uploader-btn id="global-uploader-btn3" :directory="true"  class="el-button defaultBtn" ref="uploadBtn">选择文件夹</uploader-btn>

                     <uploader-list v-show="panelShow1" class="uploadList">
                         <div class="file-panel" >
                             <ul class="file-list">
                                 <li v-for="(file,index) in fileListError" style="padding:10px 0;" :key="'filere'+index">
                                     <div>{{index+1}}<span>. </span>{{file.name}}</div>
                                 </li>
                             </ul>
                         </div>
                     </uploader-list>
                     <div style="margin: 10px 0;">共选择了<span style="color:green;font-size:16px;">{{fileListError.length}}</span>个重新上传的文件</div>
                 </uploader>
             </div>
             <div slot="footer" class="dialog-footer">
                 <el-button class="defaultBtn" @click="uploadEvent2()">上传</el-button>
                 <el-button class="defaultBtn" @click.native="fileUploadShow1=false">取消</el-button>
             </div>
         </el-dialog>
     </section>
</template>
<script lang="ts">
   	import { Vue, Component } from 'vue-property-decorator'
    import Service from './cloudList.service'
    import mockData from '@/mock/data/mockData';
    import all from '../../../../utils/firstSlice.js';
    import { Loading } from 'element-ui';
    import HttpRequest from '@/api/request';
    import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
    import utils from '../../../../common/js/util.js';
    import cloudUploadManagement from '../cloudUploadManagement/cloudUploadManagement.vue'
    import cookieConfig from '@/utils/getCookie';
    import ACCEPT_CONFIG from '@/utils/uploadType.js';
    import moment from 'moment';
    import crc32 from '@/utils/crc32.js'; //crc加密
    import base from '@/scrollLoad';
    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
    @Component
    export default class arrange extends Vue{ 
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 202 ; 
        mockList: any = [];
        @State isShowLoad: boolean;
        @State isShow :boolean;
        @Getter GET_isShowLoad: boolean;
        @Mutation('SET_isShow') SET_isShow: () => void;
        @Mutation('SET_PROCESS') SET_PROCESS: () => void;
        @Mutation('SET_ProcessInitTag') SET_ProcessInitTag: () => void;
        tabName0 = '正在上传';
        tabName1 = '传输完成';
        tabName2 = '传输失败';
        maxNumberOfConcurrentUploads:number = 1;//上传并发数
        allProcessInit:boolean;
        allProcessInitTag:boolean;
        isShowTable:boolean = false;
        showHeader:boolean = false;
        crcsCalculated: number;
        setProcessNum: number = 0;
        fileListNum: any=[];
        treesData: any=[];
        loadingInstance:any={};
        fileListSize:number = 0;
        defaultTreeOpen:any = [];
        cloudListData:any = [];
        newFilesIds: number;
        findListNewData:any = [];
        fileHeight: number;
        defaultTreeOpenId: string = '';
        isPauseFilesUploadId: string = '';
        timer: boolean;
        allItems:any;
        treeID: string;
        isPauseFilesUpload: boolean = false;
        listLoading: boolean;
        TrueOk: boolean = false;
        showfa: boolean;
        showzi: boolean;
        listTit :string;
        fileVisible: boolean;
        fileUploadShow: boolean;
        fileUploadShow1: boolean = false;
        fixUploadShow:boolean;
        catalogTitle: string = '';
        centerDialogVisible :boolean;
        centerDialogVisibleBianji:boolean;
        bytesPerChunk:any;//总速率;
        dataListTit:boolean;
        tableShow : boolean;
        treeNodeId:number;
        cloudDirId: string = '1';
        catch: boolean = true;
        catchCount = 0;// 异常连接次数
        progressTime = 0;//获取进度的任务执行时间
        errorRecordList = [];//临时记录UploadError状态，再取一次
        findDoneDataList= [];//查看上传的成功的数据
        panelShow: boolean;
        panelShow1: boolean;
        isDelete: boolean = false;
        tltNode :string;
        tltForm :string;
        busy: boolean;
        start: number;
        total: number;
        cloudListDataTotal: number;
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
        physicalPath:string = '';
        clientId:string;
        // clientId:any = null;
        loginId:any = null;
        treeFilters:any = {};
        dioBianji: any = {};
        uploadFile: any = {};
        list: any = [];
        data: any = [];
        tree: any = [];
        defaultChoosed: any = [];
        arrsStart: any = [];
        restFiles: any = [];
        listData :any = [];
        // 预上传全部list
        jsonVersionOfNewFiles :any = [];
        defaultProps: any = {};
        fileForm: any = {};
        prepareBlob: any = {};
        dioForm : any  = {};
        triggerCurrenNodeData : any = {};
        triggerCurrenNode :any = {};
        resumeFilesForm :any = {};
        // 文件列表
        files: any;
        activeName: string;
        documentTableData: any = [];
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
        parentName:string = '';
        errorShow: boolean;
        isEditTitle:boolean = false;
        errorShowFiles:boolean = true;
        powerShow: boolean;
        formSelect: boolean;
        formInput: boolean;
        Treeresolve:any = {};
        Treenode:any = {};
        num:number;
        isCompleteProcess: boolean;
        $refs: { uploader: HTMLFormElement ,uploader1: HTMLFormElement};
        $notify:any;
        isFirst:boolean;
        Treenode1:any = {};
        Treeresolve1:any = {};
        treedata001: any = [];
        Url:string;
        archiveAgentCode:string;
        isshowPic:boolean;
        initId:number;
        constructor(){
            super();
            this.mockList = mockData;
            this.Url = HttpRequest['imgUrl'];
            this.allProcessInit = true;
            this.showfa = true;
            this.showzi = false;
            this.treeNodeId = 0;
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 202 ;
            this.fileHeight = document.documentElement.clientHeight - 240 ;
            this.timer = false;
            this.busy = false;
            this.tableShow = false;
            this.allProcessInitTag = this.$store.state.allProcessInitTag;
            this.fileUploadShow = false;
            this.fixUploadShow = false;
            this.Treenode={};
            this.treesData = [];
            this.Treeresolve = {};
            this.fileUpObj = {};
            this.Treenode1={};
            this.Treeresolve1 = {};
            this.listTit = '';
            this.treeID = '';
            this.allItems = null;
            this.isCompleteProcess = false;
            this.fileListNum = [];
            this.fileListAll = [];
            this.arrsStart = [];
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
            this.cloudListDataTotal = 0;
            this.treesId = -1;
            this.listRameId = 0;
            this.page = 0;
            this.limit = 25;
            this.listLoading = false;
            this.fileVisible = false;
            this.dataListTit = false;
            this.centerDialogVisible = false;
            this.centerDialogVisibleBianji = false;
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
                accept: ACCEPT_CONFIG.getAll()
            };
            this.panelShow = false;  //选择文件后，展示上传panel
            this.panelShow1 = false;  //选择文件后，展示上传panel
            this.data =  [];
            this.cloudListData =  [];
            this.archiveAgentCode = window.sessionStorage.getItem('archiveAgentCode');
            this.tree=[];

            // 列表页面
            this.activeName = '0';
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

        /** 档案云空间页面   /** 档案云空间页面 /** 档案云空间页面 /** 档案云空间页面 /** 档案云空间页面**/
         handleCurrentChange(val:number) {
            this.page = val;
            // // console.log(this.page);
            // this.start = (val-1)*(this.limit);
            this.getFiles(this.treesId);
        };
        handleSizeChange(val:number) {
            this.limit = val;
            // this.start = val*(this.page-1);
            this.getFiles(this.treesId);
        };
        // 选择项目
        selsChange(list:any){
            this.list = list;
            // // console.log(this.list)
        };
         handleNodeClick (data){ 
            //  let kindId = data
            //  if(kindId.nodeType!=1){
            //       this.getlibId(kindId.kindId);  
            //  } 
            this.getLounTile(data.id);
          };
          // 获取失败文件重新上传id集合
          uploadErrorReFiles() {
              let errorFileIds = [];
              for(var i = 0;i<this.errorTableData.length;i++) {
                  errorFileIds.push(this.errorTableData[i].name)
              }
              this.reUploadSingleFile(errorFileIds);
          };
        renderContent(createElement, { node, data,store }) {
            let that = this;
            return createElement(
                'span',
                {
                    attrs:{
                        'class':'custom-tree-node',
                    },
                    style:{
                        'padding': '11px 0',
                        // 'border-left':'3px solid #3c78d4'
                    }
                },
                [
                    createElement(
                        'i',
                        {
                            attrs:{
                                'class':data.className
                            },
                            style:{
                                'font-size': '12px',
                            }
                        },
                    ),
                    createElement(
                        'span',
                        {
                            style:{
                                'margin-left':'7px'
                            }
                        },
                        [
                            createElement('span',node.label)
                        ]
                    ),
                ],
            )
        }
           //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };
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
        //删除表格
        deleteList(){
            // // console.log(this.list)
                let self = this;
              if(this.list.length>0){
                    var arr=[];
                    for(var item of this.list){
                        arr.push(item.id)
                    }
                    // // console.log(arr.toString())
                    this['$confirm']('您是否要删除所选文件?', '提示', {
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                        Service.deleList(arr.toString()).then(res=>{
                            if(res.data.succeeded){
                                this.Suces("删除成功")
                                // // console.log(this.documentTableData)
                                if(self.list.length == self.cloudListData.length){
                                    self.num = Math.ceil(self.total/self.limit)
                                    if(self.page==self.num-1&&self.page>0){
                                        self.page-=1;
                                    }
                                }
                                self.getFiles(self.treesId);
                            }else{
                                self.getError(res.data.errorMessage)
                            }
                            self.updateTabName();
                        })
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消删除。'
                        });
                    });
                }else{
                    this.Warn('请选择要删除的文件。')
                }
            // if(this.list.length == 0){
            //     this['$message']({
            //         message: '请勾选要删除的文档。',
            //         type: 'error'
            //     });
            // }else{
            //     this['$confirm']('确认删除选中文件吗?', {
            //         type: 'warning'
            //     }).then(() => {
            //         // console.log(this.list)
            //         for(let item of this.list){
            //             // console.log(item)
            //             Service.deleList(item.id).then(res=>{
            //                 // console.log(res.data)
            //                 this.getFiles()
            //             })
            //         }


            //     });
            // }
        }

        findDetails(row){
            // // console.log(row);
            this.listTit = row.name;
            this.listRameId = row.id;
            this.dataListTit = true;
        }
        dataListTitEvent(){
            this.loadingInstance = Loading.service(
              {
                  lock: true,
                  text: '正在重命名，请稍候',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
              }
            );
            Service.ListRnmae({
                "id":this.listRameId,
                "name":this.listTit
            }).then(res=>{
                // // console.log(res.data);
                if(res.data.succeeded == true){
                    this.dataListTit = false;
                    this.getFiles(this.treesId);
                    this.Suces("重命名成功");
                }else{
                    this.error(res.data.errorMessage);
                }
                this.$nextTick(() => { this.loadingInstance.close();});
            })
        }
        // 表格初始化
        getFiles(id):void{
            if(id == -1){
                this.tableShow = false;
            }else{
                this.tableShow = true;
                this.listLoading = true;
                Service.getLoundList({
                    "dirId":id,
                    "page":this.page,
                    "pageSize":this.limit,
                    "sort":"createDate desc"
                }).then((res) =>{
                    if(res.data.succeeded == true){
                        this.cloudListData = res.data.data;
                        this.cloudListDataTotal = res.data.totalRecords;
                        this.listLoading = false;
                    }else{
                        this.listLoading = false;
                    }
                })
            }
        };
        //点击确定按钮  添加
        addEventFormSubmitBtns(dioForm):void{
            var param = {
                "name":this.dioForm.title,
            }
            let self = this;
            this.$refs[dioForm].validate((valid)=>{
                if (valid) {
                    let titleNodeId = null;
                    if(this.isEditTitle) {
                        titleNodeId = this.treesId;
                    }
                    Service.saveLoundTitle({
                        parentId:this.treesId,
                        name:this.dioForm.title,
                        note:this.dioForm.titleNode,
                        id:titleNodeId
                    }).then(res=>{
                        if(res.data.succeeded == false){
                                this['$message']({message:res.data.errorMessage,type:'warning'})
                            }else{
                                Service.gettersitle(this.treesId).then(res=>{
                                    for(let item of this.tree){
                                            for(let items of item.children){
                                                if(this.treesId == items.id){
                                                    items.children = res.data.data
                                                }
                                            }
                                    }
                                    if(res.data.succeeded == true){
                                        // location.reload();
                                        if(this.treesId == 0){
                                            this.centerDialogVisible = false;
                                            this.Treenode.childNodes = [];
                                            this.loadNodeTree(this.Treenode,this.Treeresolve);
                                        
                                        }else if(this.treesId !== 0){
                                            this.centerDialogVisible = false;
                                            this.Treenode.childNodes = [];
                                            this.loadNodeTree(this.Treenode,this.Treeresolve)   
                                        }
                                    }
                            // // console.log(res.data.succeeded)
                        })
                        }
                        this['$message']({message:'操作成功。',type:'success'})
                    })
                }
            })
        }
        //删除title
        deleteTile(){
            if(this.initId == 0){
                this.Warn('目录根节点不能进行删除。');
            } else if(this.initId === undefined) {
                this.Warn('请选择子节点进行删除。');
            } else{
                    this['$confirm']('确认删除选中目录吗？', {
                        type: 'warning'
                    }).then(() => {
                        Service.DeleTile(this.treesId).then(res=>{
                            if(res.data.succeeded==false){
                                this['$message']({message:res.data.errorMessage,type:'warning'})
                            }else{
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
        //添加结构树目录
        treeAddTitle(){
            this.dioForm.title = ""
            this.dioForm.titleNode = ""
            this.catalogTitle = "新增目录"
            this.isEditTitle = false;
            if(this.treesId == -1){
                this.Warn('请选择目录根节点。');
            }else{
                this.centerDialogVisible = true;
            }
        }
        chooseFiles(){
            // 重置文件队列
            this.$refs.uploader.uploader.cancel();
            // this.jsonVersionOfNewFiles = [];
        }
        chooseFiles1(){
            // 重置文件队列
            this.$refs.uploader1.uploader.cancel();
            // this.jsonVersionOfNewFiles = [];
        }
        bianjiTreeTitle(){
            let self = this;
            if(this.initId == 0){
                this.Warn('目录根节点不能进行编辑。');
            } else if(this.initId === undefined) {
                this.Warn('请选择子节点进行编辑。');
            }else{
                this.catalogTitle = "编辑目录";
                this.isEditTitle = true;
                this.centerDialogVisible = true;
                // for(let item in this.treesData) {
                //     if(this.treesData[item].id === this.treesId) {
                //         this.dioForm.title = this.treesData[item].name;
                //         this.dioForm.titleNode = this.treesData[item].note;
                //     }
                // }
            }
        };
        centerDialogVisibleBianjiEvent(){
            if(this.dioBianji.title == ''){
                this['$message']({
                            message: '编辑的名称不能为空。',
                            type: 'error'
                        });
                this.centerDialogVisibleBianji = true;
                }else{
                       Service.saveLoundTitle({
                        "parentId":this.treesId,
                        "name":this.dioBianji.title,
                        "note":this.dioBianji.titleNode,
                        "id":this.bId
                    }).then(res=>{
                            if(res.data.succeeded == false){
                                 this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'warning'
                                });
                                this.centerDialogVisibleBianji = true;
                            }else{
                                //  location.reload();
                                this.Treenode.childNodes = [];
                                this.loadNodeTree(this.Treenode,this.Treeresolve)
                                 this.centerDialogVisibleBianji = false;
                            }
                            this['$message']({message:'操作成功。',type:'success'})
                    })
                }
        }
        setDataToTrees(treeData){
            let self = this;
            this.defaultChoosed = [];
            let abc = document.querySelectorAll('.el-tree-node.is-focusable');
            for (let i = 0; i < abc.length; i++) {
                abc[i].classList.remove("is-current");
            }
            // // console.log(treeData)
            this.treesId = treeData.id;
            this.defaultChoosed.push(treeData.id);
            this.dioForm.title = treeData.name;
            this.dioForm.titleNode = treeData.note;
            this.initId = treeData.parentId;
            // this.treeNodeId = treeData.$treeNodeId;
            if(treeData.isParentNode === true) {
                this.tltForm = this.dioForm.title;
            }
            if(this.treesId !== 0){
                this.getFiles(this.treesId)
            }else{
                this.tableShow = false;
            }
        }
        //失败信息
        error(message:string){
            this['$message']({
                type: 'error',
                message
            });
        };
        getTreeName0(tree){
            for(let grass of tree){
                if(!grass.hasChildren){
                    // grass.isExpand = this.isExpand;
                    grass.className = 'fa fa-plus-square-o';
                    grass.className1 = 'fa fa-institution';
                }
            }
        };
        // 获取数信息
        getLounTile(treeID) {
            Service.gettersitle(treeID).then(res=>{
                if(res.data.succeeded == true){
                    // console.log(res.data.data)
                    if(res.data.data.length !== 0){
                        this.treedata001 = res.data.data;
                        this.treeID = res.data.data[0].id;
                    }else{
                        this['$message']({
                        message: '查询云盘库无数据！',
                        type: 'warning'
                       })
                    }
                }else{
                        this['$message']({
                        message: '查询云盘库失败！',
                        type: 'error'
                       })
                    }
            })
        }
            // 懒加载树
        loadNodeTree(node,resolve) {
             if(this.isFirst){
                this.Treenode = node;
                this.Treeresolve = resolve;
                this.isFirst = false;
            }
            let self = this;
            this.Treenode1 = node;
            this.Treeresolve1 = resolve;
            // debugger;
            if(node.level === 0){
                // Service.getUserUrl({}).then((res) =>{
                    // // console.log(res.data)
                    // var LogonFondName = res.data.data.LogonFondName;
                    // if(res.data.succeeded){
                        let treeData = [];
                        var obj = {};
                        //判断是否显示三角
                        Service.gettersitle(0).then(res=>{
                            if(res.data.succeeded == true){
                                // console.log(res.data.data)
                                if(res.data.data.length == 0){
                                    this.isshowPic = true;
                                    obj = {id:0,name:LogonFondName,hasChildren:this.isshowPic}
                                    treeData.push(obj);
                                    resolve(treeData);
                                }else{
                                    let treeData = [];
                                    let data = res.data.data;
                                    this.defaultTreeOpenId = res.data.data[0].id;
                                    this.defaultTreeOpen.push(this.defaultTreeOpenId);
                                    for(let child of data){
                                        let leaf = child.hasChildren
                                        child.isParentNode = child.hasChildren;
                                        child.hasChildren = !leaf;
                                    }
                                    data.forEach(item => {
                                        treeData.push(item)
                                        // // console.log(item)
                                    });
                                    // console.log(treeData)
                                    resolve(treeData);
                                    if(this.isEditTitle) {
                                         debugger;
                                        self.$nextTick(() => {
                                            setTimeout (() => {
                                                for(let i=0; i < self.$refs.loadNodeTree.$children[0].$children.length;i++) {
                                                    let item = self.$refs.loadNodeTree.$children[0].$children[i];
                                                    if(item.$el.className.indexOf('is-checked') >= 0) {
                                                        item.$el.className += ' is-current';
                                                    }
                                                }
                                            },1)
                                        });
                                     }
                                }
                            }
                        })
                       
                        // this.treesId = res.data.data[0].id;
                    // }else{
                    //     this['$message']({
                    //         message: '树节点数据错误。',
                    //         type: 'error'
                    //     });
                    // }
                // });
            }else{
                // this.treesId = node.data.id;
                Service.gettersitle(node.data.id).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        this.treesData = data;
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.isParentNode = child.hasChildren;
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                            // // console.log(item)
                        });
                        if(this.isEditTitle) {
                             debugger;
                            self.$nextTick(() => {
                                setTimeout(() => {
                                   for(let i=0; i < self.$refs.loadNodeTree.$children[0].$children.length;i++) {
                                        let item = self.$refs.loadNodeTree.$children[0].$children[i];
                                        if(item.$el.className.indexOf('is-checked') >= 0) {
                                            item.$el.className += ' is-current';
                                        }
                                    }
                                },1)
                            });
                         }
                        if(node.level == 1){
                    
                        }else if(node.level == 2){
                          
                        }else if(node.level == 3){
                           
                        }else if(node.level == 4){
                            
                        }
                        resolve(treeData);
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                    }
                });
            }
        };
        /** 断点续传集合   /* 断点续传集合*/  /** 断点续传集合   /* 断点续传集合*/  /** 断点续传集合   /* 断点续传集合*/
        // 弹出选择上传弹框
        upLoads(){
            // console.log('upLoads----------------------------');
            if(this.treesId !== -1) {
                let sys = utils.getBrowserInfo();
                if(sys.browser === 'msie' && parseInt(sys.ver) <=9 ){
                    this['$message']({
                        message: '当前浏览器版本过低，不支持文件上传，请使用IE10以上版本或Chrome,360等浏览器。',
                        type: 'warning',
                        duration: 8000
                    });
                    return;
                }
                // 文件正在上传 禁止上传新的文件
                if(this.allProcessInit){
                this.panelShow = false;
                this.fileUploadShow = true;
                let that = this;
                this.cutArr = [];
                // 重置表格
                    this.documentTableData = [];
                    this.borrowTableData = [];
                    this.errorTableData = [];
                    this.errorTableData1 = [];
                    Service.getUploadFilesOfCloud({},this.clientId,this.treesId).then((res) => {
                        // debugger;
                        let params = res.data.data.pendingFiles;
                        this.bytesPerChunk = res.data.data.inByte;
                        if (params!=={}) {
                            let arr = [];
                            let att = [];
                            for (let i in params) {
                                params[i].name = i;
                                // params[i].start = 0;
                                // params[i].end = 0;
                                // 有断点续传文件 暂时去除等待状态
                                params[i].data.restStatus = false;//去除等待状态
                                params[i].isPrepare = false;
                                params[i].isStart = false;
                                params[i].data.pauseStatus = false;
                                let process = Number(((params[i].fileCompletionInBytes/params[i].originalFileSizeInBytes)*100).toFixed(1));
                                params[i].process = process >100 ? 100 : process;
                                // 区分队列
                                if(params[i].data.type=='CloudFile'){
                                    if(params[i].data.status!=='Done'){
                                        params[i].done = false;//挂接未完成
                                        params[i].Concate = false;
                                        params[i].data.status = 'UploadError';//显示上传失败tab页面下
                                        this.errorTableData.push(params[i])
                                    }else{
                                        att.push(params[i])
                                    }
                                }
                            }
                            // 小于切割进度得直接赋予100%
                            arr.forEach(function(item){
                                if(item.originalFileSizeInBytes<that.bytesPerChunk){
                                    item.isOne = true;
                                }else{
                                    item.isOne = false;
                                }
                            });
                            // 获取正在上传序列
                            for(let a of arr){
                                this.documentTableData.push(a);
                                let arr = [];
                                for(let data of this.documentTableData){
                                    if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                                        arr.push(a)
                                    }
                                }
                                // 去重
                                if(arr.length>1){
                                    this.documentTableData.remove(a);
                                }
                            }
                            // 获取完成序列
                            this.borrowTableData = att;
                            // 去除上传完成的重复的文件
                            let app = [];
                            for(let a of this.borrowTableData){
                                for(let data of this.documentTableData){
                                    if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                                        app.push(a.name)
                                    }
                                }
                            }
                            if(app.length>0){
                                Service.searchUpload({fileIds:app} ,this.clientId).then(() =>{});
                            }
                            let ids = [];
                            if(att.length>0){
                                ids = Array.from(new Set(att.map(function(item){return item.data.cloudDirId}).toString().split(',')));
                                // 获取云盘路径
                                let strIds = JSON.stringify(ids);
                                if (that.fileCloudPathParam !== strIds) {
                                    // 获取云盘路径
                                    Service.getUploadUrl(ids).then((res) =>{
                                        if(res.data && res.data.succeeded) {
                                            that.fileCloudPathParam = strIds;
                                            that.fileUpObj = res.data.data;
                                            for (let obj of that.borrowTableData) {
                                                for (let i in that.fileUpObj) {
                                                    if (obj.data.cloudDirId == i) {
                                                        obj.physicalPath = that.fileUpObj[i];
                                                        that.physicalPath = that.fileUpObj[i];
                                                    }
                                                }
                                            }
                                        } 
                                        // else {
                                        //     for (let obj of that.borrowTableData) {
                                        //         for (let i in that.fileUpObj) {
                                        //             if (obj.data.cloudDirId == i) {
                                        //                 obj.physicalPath = that.fileUpObj[i]
                                        //             }
                                        //         }
                                        //     }
                                        // }
                                        this.borrowTableData = att;
                                    });
                                } else {
                                    for(let obj of att){
                                        for(let i in this.fileUpObj){
                                            if(obj.data.cloudDirId==i){
                                                obj.physicalPath = this.fileUpObj[i]
                                                that.physicalPath = that.fileUpObj[i];
                                            }
                                        }
                                    }
                                    this.borrowTableData = att;
                                }
                            }
                            this.updateTabName();
                        }
                    });
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
            } else {
                this.Warn('请选择要上传的云盘目录。')
            }
        }

        // 重新上传
        reFiles(){
            // debugger;
            // console.log('reFiles----------------------------');
            this.fileUploadShow1 = true;
            this.panelShow1 = false;
            let fileIds = [];
            for(var i=0;i<this.errorTableData.length;i++) {
                fileIds.push(this.errorTableData[i].name);
            }
            if(fileIds.length>0){
                Service.searchUpload({fileIds:fileIds} ,this.clientId).then(() =>{});
            }
            this.fileListError = [];//清空选择得文件序列
            this.$nextTick(() => {
               // 重置文件队列
                this.$refs.uploader1.uploader.cancel();
            });
        }

        // 预备上传
        onFileAdded(file) {
            // console.log('onFileAdded----------------------------');
            this.$nextTick(() => {
                // 重置文件队列
                this.$refs.uploader.uploader.cancel();
            });
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
        }

        // 收集错误上传队列
        onFileSubmit1(files){
            // console.log('onFileSubmit1----------------------------');
            this.panelShow1 = true;
            let fileTrue = [];
            this.fileListAll = files;
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
            // console.log('uploadEvent----------------------------');
            if(this.fileListAll.length>0){
                this.activeName = '0';
                this.fileUploadShow = false;
                this.showfa = false;
                this.showzi = true;
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
                this.uploadPre();
            }else{
                this['$message']({
                    message: '请选择文件。',
                    type: 'warning'
                });
            }
        }
        // 选择错误文件跳转2
        uploadEvent2(){
            // console.log('uploadEvent2----------------------------');
            if(this.fileListAll.length>0){
                this.activeName = '0';
                this.fileUploadShow = false;
                this.documentShow = true;
                this.borrowShow = false;
                this.errorShow = false;
                this.isCompleteProcess = true;
                this.numAll = 0;
                this.fileUploadShow1 = false;
                this.isCompleteProcess = true;
                this.setProcessNum = 0;
                this.AllDatas = [];
                // 重置限制上传个数队列
                this.arrsStart = [];
                this.errorTableData = [];
                this['$store'].commit('SET_PROCESS',0);
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
            // debugger;
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
            // console.log('uploadPre----------------------------');
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
            // let b = JSON.stringify(Array.from(new Set(this.jsonVersionOfNewFiles)));
            let b = this.jsonVersionOfNewFiles;
            Service.prepareUpload(b,'prepareUpload',id).then(res => {
                this.prepareBlob = Object.assign(this.prepareBlob,res.data.data);
                this.getFilesA();
            });
        }

        // 错误文件预备上传
        uploadPre1(){
            // console.log('uploadPre1----------------------------');
            // debugger;
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
                // this.getProcess();
            }
            // this.getProcess();
            this.updateTabName();
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

        // 继续校验是否可上传
        fileResumeProcessStarter(id,fileOnly) {
            // debugger;
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
                        Service.verifyCrcOfUncheckedPart({},id,crc,that.clientId).then((res) => {
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
                                    that.goFiles();
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

        // 确认继续上传
        fileUploadProcessStarter(pendingFile) {
            // debugger;
            // console.log('fileUploadProcessStarter----------------------------');
            // 未完成的传输
            const me = this;
            pendingFile.originalFileSizeInBytes = pendingFile.size;
            // console.log('fileUploadProcessStarter---------------0000000');
            if (pendingFile.fileCompletionInBytes < pendingFile.originalFileSizeInBytes) {
                pendingFile.end = pendingFile.fileCompletionInBytes + this.bytesPerChunk;
                // debugger;
                // console.log(this.arrsStart);
                // console.log(pendingFile.name);
                // console.log(pendingFile.size);
                // console.log(this.allProcessInit);
                for(let tip of this.documentTableData){
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

        /** 上传列表页面  /** 上传列表页面 /** 上传列表页面 /** 上传列表页面 /** 上传列表页面 /** 上传列表页面 */
        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        };
        goBack(){
            this.showfa = true;
            this.showzi = false;
            // this.getFiles();
        };
        findList(){
            // console.log('findList----------------------------');
            //  debugger;
            if(this.treesId !== -1) {
                var that = this;
                that.showfa = false;
                that.showzi = true;
                // this.activeName = '0';
                if(that.allProcessInit){
                    that.fileList = [];
                    that.documentTableData = [];
                    that.borrowTableData = [];
                    that.errorTableData = [];
                    that.listLoading = true;
                    // 获取上传的数据
                Service.getUploadFilesOfCloud({},that.clientId,that.treesId).then((res) => {
                        let params = res.data.data.pendingFiles;
                        that.bytesPerChunk = res.data.data.inByte;
                        if (params!=={}) {
                            let arr = [];
                            that.findDoneDataList = [];
                            for (let i in params) {
                                params[i].name = i;
                                let process = Number(((params[i].fileCompletionInBytes/params[i].originalFileSizeInBytes)*100).toFixed(1));
                                if(process > 0) {
                                    params[i].data.restStatus = false;//去除等待状态
                                    params[i].isPrepare = false;
                                    params[i].isStart = false;
                                    params[i].process = process >100 ? 100 : process;
                                }
                                // 区分队列
                                if(params[i].data.type=='CloudFile'){
                                    if(params[i].data.status!=='Done'){
                                        params[i].done = false;//挂接未完成
                                        params[i].Concate = false;
                                        // if(params[i].data.status === 'UploadError' || params[i].data.status === 'Unknown' || params[i].data.status === 'ProcessError') {
                                            
                                        // }
                                        // if(params[i].data.status === 'UploadFinish' || params[i].data.status === 'Processing' || params[i].data.status === 'Start' || params[i].data.status === 'Uploading') {
                                        //     that.documentTableData.push(params[i]);
                                        //     console.log(that.documentTableData);
                                        //     that.findListNewData = that.documentTableData;
                                        //     this.getProcess();
                                        // } else {
                                            params[i].data.status = 'UploadError';//显示上传失败tab页面下
                                            that.errorTableData.push(params[i]);
                                            // console.log(that.errorTableData);
                                        // }
                                    }else{
                                        that.findDoneDataList.push(params[i]);
                                    }
                                }
                            }
                            // 获取正在上传序列
                            for(let a of arr){
                                that.documentTableData.push(a);
                                let arr = [];
                                for(let data of that.documentTableData){
                                    if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                                        arr.push(a)
                                    }
                                }
                                // 去重
                                if(arr.length>1){
                                    that.documentTableData.remove(a);
                                }
                            }
                            // 获取完成序列
                            that.borrowTableData = that.findDoneDataList;
                            let app = [];
                            // 去除上传完成的重复的文件
                            for(let a of this.borrowTableData){
                                for(let data of this.documentTableData){
                                    if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                                        app.push(a.name)
                                    }
                                }
                            }
                            // 去除上传失败的重复文件
                            for(let a of this.errorTableData){
                                for(let data of this.documentTableData){
                                    if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                                        app.push(a.name)
                                    }
                                }
                            }
                            if(app.length>0){
                                Service.searchUpload({fileIds:app} ,that.clientId).then(() =>{});
                            }
                            // debugger;
                            let ids = [];
                            if(that.findDoneDataList.length>0){
                                ids = Array.from(new Set(that.findDoneDataList.map(function(item){return item.data.cloudDirId}).toString().split(',')));
                                // 获取云盘路径
                                let strIds = JSON.stringify(ids);
                                if (that.fileCloudPathParam !== strIds) {
                                    // 获取云盘路径
                                    Service.getUploadUrl(ids).then((res) =>{
                                        if(res.data && res.data.succeeded) {
                                            that.fileCloudPathParam = strIds;
                                            that.fileUpObj = res.data.data;
                                            for (let obj of that.borrowTableData) {
                                                for (let i in that.fileUpObj) {
                                                    if (obj.data.cloudDirId == i) {
                                                        obj.physicalPath = that.fileUpObj[i]
                                                        that.physicalPath = that.fileUpObj[i];
                                                    }
                                                }
                                            }
                                        } 
                                        // else {
                                        //     for (let obj of that.borrowTableData) {
                                        //         for (let i in that.fileUpObj) {
                                        //             if (obj.data.cloudDirId == i) {
                                        //                 obj.physicalPath = that.fileUpObj[i]
                                        //             }
                                        //         }
                                        //     }
                                        // }
                                        that.borrowTableData = that.findDoneDataList;
                                        that.$refs['borrowTableData'].children[0].children[2].children[0].children[1].children[0].click();
                                        that.$nextTick(() => {
                                            that.$refs['borrowTableData'].children[0].children[2].children[0].children[1].children[0].classList.remove("current-row");
                                        });
                                        // console.log(that.borrowTableData);
                                    });
                                } else {
                                    for(let obj of that.findDoneDataList){
                                        for(let i in this.fileUpObj){
                                            if(obj.data.cloudDirId==i){
                                                obj.physicalPath = this.fileUpObj[i]
                                                that.physicalPath = that.fileUpObj[i];
                                            }
                                        }
                                    }
                                    that.borrowTableData = that.findDoneDataList;
                                    // console.log(that.borrowTableData);
                                }
                            }
                        }
                        this.listLoading = false;
                        this.updateTabName();
                    });
                    // 删除标记重置
                    this.isDelete = false;
                    this.jsonVersionOfNewFiles = [];
                    this.fileListAll = [];//清空选择得文件序列
                    this.fileList = [];//清空选择得文件序列
                    this.fileListSize = 0;
                    this.newFilesIds = 0;
                };
                this.updateTabName();
            } else {
                this.Warn('请选择要查看的云盘目录。')
            }
            
        }
        // 查询列表
        getFilesA(){
            // debugger;
            // console.log('getFilesA----------------------------');
            let that = this;
            let id = this.clientId;
            // // console.log('getFilesA')
            Service.getUploadFilesOfCloud({},this.clientId,this.treesId).then((res) =>{
                let params = res.data.data.pendingFiles;
                this.bytesPerChunk = res.data.data.inByte;
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
                            params[i].isPrepare = false;
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
                        }else if(params[i].data.status==='Done'){ //挂接完成
                            params[i].process = 100;
                            params[i].Concate  = false;
                            params[i].conCateStatus = 'Done';
                            params[i].isPrepare = false;
                            params[i].isStart = false;
                        }
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
                                arr1.push(item)
                            }
                        })
                    }

                    // 获取正在上传序列
                    this.documentTableData = arr1;
                    this.allProcessDatas = arr1;
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

                    // 获取完成序列
                    this.borrowTableData = att;
                    // 去除上传完成的重复的文件
                    let app = [];
                    for(let a of this.borrowTableData){
                        for(let data of this.documentTableData){
                            if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                               app.push(a.name)
                            }
                        }
                    }
                    // 去除上传失败的重复文件
                    for(let a of this.errorTableData){
                        for(let data of this.documentTableData){
                            if(data.originalFileSizeInBytes==a.originalFileSizeInBytes&&data.originalFileName==a.originalFileName){
                                app.push(a.name)
                            }
                        }
                    }
                    if(app.length>0){
                        Service.searchUpload({fileIds:app} ,this.clientId).then(() =>{});
                    }
                    this.listLoading = false;
                    let ids = [];
                    if(att.length>0){
                        ids = Array.from(new Set(att.map(function(item){return item.data.cloudDirId}).toString().split(',')));
                        // 获取云盘路径
                        let strIds = JSON.stringify(ids);
                        if (this.fileCloudPathParam !== strIds) {
                            // 获取云盘路径
                            Service.getUploadUrl(ids).then((res) =>{
                                if(res.data && res.data.succeeded) {
                                    that.fileCloudPathParam = strIds;
                                    that.fileUpObj = res.data.data;
                                    for (let obj of that.borrowTableData) {
                                        for (let i in that.fileUpObj) {
                                            if (obj.data.cloudDirId == i) {
                                                obj.physicalPath = that.fileUpObj[i]
                                                that.physicalPath = that.fileUpObj[i];
                                            }
                                        }
                                    }
                                } 
                                // else {
                                //     for (let obj of that.borrowTableData) {
                                //         for (let i in that.fileUpObj) {
                                //             if (obj.data.cloudDirId == i) {
                                //                 obj.physicalPath = that.fileUpObj[i]
                                //             }
                                //         }
                                //     }
                                // }
                                this.borrowTableData = att;
                            });
                        } else {
                            for(let obj of att){
                                for(let i in this.fileUpObj){
                                    if(obj.data.cloudDirId==i){
                                        obj.physicalPath = this.fileUpObj[i]
                                        that.physicalPath = that.fileUpObj[i];
                                    }
                                }
                            }
                            this.borrowTableData = att;
                        }
                    }
                    // 开始上传
                    this.allDoneFiles();
                    this.updateTabName();
                }else{
                    this.listLoading = false;
                }
            })
        };

        // 调用全部文件上传
        allDoneFiles(){
            // console.log('allDoneFiles----------------------------');
            let that = this;
            this.errorRecordList = [];
            let arr = [];
            this.restFiles = [];//并发上传文件的等待文件;
            let a = 0;
            for(let datas of this.documentTableData){
                if(a<this.maxNumberOfConcurrentUploads){
                    datas.data.restStatus = false;
                    if(datas.data.status === 'Start'||datas.data.status === 'Uploading'){
                        arr.push(datas);
                        if(datas.originalFileSizeInBytes<this.bytesPerChunk){
                            this.numAll++;
                        }
                    }
                }else{
                    datas.data.restStatus = true;
                    this.restFiles.push(datas)
                }
                a++;
            }
            // 当前上传的文件是否全部是小于切割系数
            // if(this.numAll=== arr.length) {
            //     this['$store'].commit('SET_PROCESS', 100);
            // }
            // 有断点文件 一并结合在上传进度中 分批上传
            if(this.arrsStart.length>0){
                this.arrsStart = this.arrsStart.concat(arr)
            }else{
                this.arrsStart = arr;
            }
            // console.log('allDoneFiles')
            // // console.log(this.arrsStart)
            // 切割文件队列
            this.filesReact();
            if(arr.length>0){
                that.processNextIn();
             }
        };
        // 文件分块
        filesReact(){
            // console.log('filesReact----------------------------');
            // let files = this.fileList;
            // 文件分块
            let files = this.fileList;
            for(let tip of files){
                // 传输中的切割数量
                for(let item of this.arrsStart){
                    if(tip.file.size==item.originalFileSizeInBytes&&tip.file.name===item.originalFileName){
                        if(item.data.status === 'Start'){
                            tip.file.fileCompletionInBytes = 0;
                        }else if(item.data.status === 'Uploading'){
                            tip.file.fileCompletionInBytes = item.fileCompletionInBytes
                        }
                        if(tip.file.size>this.bytesPerChunk){
                            tip.file.end = tip.file.fileCompletionInBytes + this.bytesPerChunk;
                        }else{
                            tip.file.end = tip.file.size
                        }
                    }
                }
                // 等待传输的切割数量
                for(let item of this.restFiles){
                    if(tip.file.name===item.originalFileName&&tip.file.size==item.originalFileSizeInBytes){
                        if(item.data.status === 'Start'){
                            tip.file.fileCompletionInBytes = 0;
                        }else if(item.data.status === 'Uploading'){
                            tip.file.fileCompletionInBytes = item.fileCompletionInBytes
                        }
                        if(tip.file.size>this.bytesPerChunk){
                            tip.file.end = tip.file.fileCompletionInBytes + this.bytesPerChunk;
                        }else{
                            tip.file.end = tip.file.size
                        }
                    }
                }
            }
        }
        // 上传文件过程
        processNextIn() {
            // console.log('processNextIn----------------------------');
            let that = this;
            let files = this.fileList;
            let arr = [];
            files.forEach(function(item){
                for(let tip of that.arrsStart){
                    if(item.file.name===tip.originalFileName&&item.file.size==tip.originalFileSizeInBytes){
                        that.doneFiles(item.file,tip.name,tip);
                    }
                }
            });
            // 调取进度
            if(!this.prepareBlob.yes&&this.prepareBlob!=={}){
                this.getProcess();
            }
        }
        // 断点续传文件条目
        doneFiles(tip,item,originalFile){
            // console.log('doneFiles----------------------------');
            // this.setProcessNum = 0;
            // debugger;
            if(!this.isPauseFilesUpload && item !== this.isPauseFilesUploadId){
                let that = this;
                this.errorShowFiles = false;
                this.catch = true;
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
                            // console.log(res);
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
                                    for (let ab of that.documentTableData) {

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
                                                that.goFiles();
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
            }
        }

        updateDocumentTable() {
            // debugger;
            let me = this;
            // console.log('updateDocumentTable')
            // console.log(me.updateDocumentFlag)
            if (!me.updateDocumentFlag) {
                me.updateDocumentFlag = true;
                setTimeout(function () {
                    // console.log('11111111111111111updateDocumentTable')
                    me.updateDocumentFlag = false;
                    // console.log(me.documentTableData);
                    for (let i = me.documentTableData.length - 1; i >= 0; i--) {
                        if (me.documentTableData[i].conCateStatus === 'Done') {
                            // console.log('更新列表');
                            me.documentTableData[i].physicalPath = me.physicalPath;
                            me.borrowTableData.push(me.documentTableData[i]);
                            me.documentTableData.remove(me.documentTableData[i]);
                        }
                    }
                    me.updateTabName();
                }, 1000);
            }
        }

        // 断网继续上传
        goUploads(){
            // console.log('goUploads----------------------------');
            let that = this;
            if(this.restFiles.length>0){
                let att = [];
                this.arrsStart.forEach(function(item){
                    if(item.Concate){
                        att.push(item)
                    }else{
                        item.data.restStatus = true;
                        item.data.pauseStatus = false;
                        that.restFiles.push(item);
                        // 队列中去除 排列后方
                        let app = [];
                        for(let data of that.documentTableData){
                            if(data.originalFileSizeInBytes!==item.originalFileSizeInBytes||data.originalFileName!==item.originalFileName){
                                app.push(data);
                            }
                        }
                        that.documentTableData = app;
                        that.documentTableData.push(item)
                    }
                });
                this.arrsStart = att;
                this.goFiles();
                this.getProcess();
            }
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

        // 正常上传文件上传文件数量低于并发数量 自动补位
        goFiles(){
            // console.log('goFiles----------------------------');
            let arr = [];
            let att = [];
            this.arrsStart.forEach(function(item){
                if(!item.Concate && item.isPrepare){
                    att.push(item)
                }
            });
            // if(this.arrsStart.length > 1) {
            //     this.arrsStart.remove(data);
            // }
            // console.log('获取更新上传文件序列')
            // console.log(att)
            for(let i = 0;i<this.maxNumberOfConcurrentUploads-att.length;i++){
                if(this.restFiles[i]){
                    if(this.restFiles[i].isPrepare){
                        this.restFiles[i].data.restStatus = false;
                        for(let abc of this.documentTableData){
                            if(abc.originalFileName===this.restFiles[i].originalFileName&&this.restFiles[i].originalFileSizeInBytes==abc.originalFileSizeInBytes){
                                abc.data.restStatus = false;
                            }
                        }
                        // 补位需要上传的序列
                        // console.log('补位需要上传的序列');
                        this.arrsStart.push(this.restFiles[i]);
                        // 加入新文件传输
                        for(let j=0;j<this.fileList.length;j++) {
                            if (this.fileList[j].file.name === this.restFiles[i].originalFileName && this.fileList[j].file.size == this.restFiles[i].originalFileSizeInBytes) {
                                // console.log('上传文件' + this.fileList[j].file.name)
                                // console.log('------------------------------当前文件字节数==='+this.restFiles[i].fileCompletionInBytes);
                                // console.log(this.errorRecordList)
                                // console.log(this.restFiles[i].originalFileName)
                                if(new Date().getTime() - this.progressTime > 3000){
                                    // console.log('重新启动获取进度的任务')
                                    this.getProcess();
                                }
                                if(this.errorRecordList.indexOf(this.restFiles[i].name) > -1){
                                    // console.log('续传的文件');
                                    // console.log(this.restFiles[i].name)
                                    // console.log(this.restFiles[i]);
                                    this.reUploadSingleFile(this.restFiles[i]);
                                } else {
                                    // console.log(this.restFiles[i].name)
                                    this.getProcess();
                                    this.doneFiles(this.fileList[j].file, this.restFiles[i].name, this.restFiles[i]);
                                }
                                // this.getProcess();
                            }
                        }
                        // 去除剩余等待序列对应文件
                        // // console.log('restFiles---------------------')
                        // // console.log(this.restFiles)
                        this.restFiles.remove(this.restFiles[i]);
                    }
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
        // 侦察进度
        getProcess() {
            // console.log('getProcess----------------------------');
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

                for (let data of that.arrsStart) {
                    if (data.isPrepare && !data.done) {
                        ann.push(data);
                        annName.push(data.name);
                    }
                }
                // console.log('获取上传进度');
                if (annName.length > 0) {
                    let b = JSON.stringify(annName);
                    Service.prepareUpload({fileIds: annName},'getProgress',that.clientId).then(res => {
                        that.catchCount = 0;
                        let processList = [];
                        let datas = res.data.data;
                        // console.log('prepareUpload2');
                        // console.log(datas);
                        for (let a in datas) {
                            datas[a].processId = a;
                            processList.push(datas[a]);
                        }
                        ;
                        // 查询出不是暂停状态的文件的进度
                        // // console.log('查询出不是暂停状态的文件的进度');
                        // // console.log(res.data);
                        // that.documentTableData = [];
                        that.documentTableData = that.documentTableData;
                        if(that.findListNewData.length > 0) {
                            that.documentTableData = that.findListNewData;
                        }
                        for (let i = 0; i < that.documentTableData.length; i++) {
                            // 上传列表侦察文件分条进度
                            for (let j = 0; j < processList.length; j++) {
                                if (that.documentTableData[i].name === processList[j].processId) {
                                    if(processList[j].status === 'UploadError' || processList[j].status === 'ProcessError' || processList[j].status === 'Unknown'){
                                        // if(that.errorRecordList.indexOf(that.documentTableData[i].name) > -1){
                                        //     continue;
                                        // }
                                        // console.log('server 返回 UploadError 处理数据')
                                        // console.log(processList);
                                        // console.log(that.errorRecordList);
                                        // console.log(that.documentTableData[i].originalFileName);
                                        that.documentTableData[i].conCateStatus = processList[j].status;
                                        that.documentTableData[i].restStatus = false;
                                        that.documentTableData[i].done = false;
                                        that.documentTableData[i].isPrepare = false;
                                        that.documentTableData[i].isStart = false;
                                        // console.log(that.documentTableData[i].name );
                                        // 踢出可上传队列
                                        that.arrsStart.remove(that.documentTableData[i]);
                                        that.errorTableData.push(that.documentTableData[i]);
                                        that.documentTableData.remove(that.documentTableData[i]);
                                    } else {                                       
                                        that.documentTableData[i].conCateStatus = processList[j].status;
                                        that.documentTableData[i].data.status = processList[j].status;
                                        if (that.documentTableData[i].process !== 100 && !that.documentTableData[i].isOne) {
                                            this.$nextTick(() => {
                                                that.documentTableData[i].process = Number(processList[j].progress.toFixed(1)) > 100 ? 100 : Number(processList[j].progress.toFixed(1));
                                                if(that.preFiles.length === 1) {
                                                    that['$store'].commit('SET_PROCESS', Number(processList[j].progress.toFixed(1)) > 100 ? 100 : Number(processList[j].progress.toFixed(1)));
                                                }
                                            });
                                            
                                        } else {
                                            if (that.documentTableData[i].data.status === 'Start') {
                                                that.documentTableData[i].process = 100
                                            }
                                        }
                                        // console.log('更新状态' + that.documentTableData[i].conCateStatus);
                                        // console.log('更新状态status=' + that.documentTableData[i].data.status);
                                        // console.log('更新进度' + that.documentTableData[i].process);
                                    }
                                }
                            }
                        }

                        // for(let i in datas){
                        //     this.setProcessNum+= Number(datas[i].progress.toFixed(1))
                        // }
                        // for(let data of this.documentTableData){
                        //     this.setProcessNum+= data.start;
                        // }
                        // 根据进度增删表格条目
                        for (let i = 0; i < that.documentTableData.length; i++) {
                            // 判断上传完毕后是否在挂接状态
                            if (that.documentTableData[i].conCateStatus == 'Done') {
                                that.documentTableData[i].done = true;
                                that.arrsStart.forEach(function (item) {
                                    if (that.documentTableData[i].originalFileSizeInBytes == item.originalFileSizeInBytes && item.originalFileName === that.documentTableData[i].originalFileName) {
                                        item.done = true;
                                    }
                                });
                            }
                        }
                        // debugger;
                        // 计数全部进程是否均小于切片系数
                        if (that.numAll === that.fileList.length) {
                            // this['$store'].commit('SET_PROCESS',100);
                            that['$store'].commit('SET_isShow', false);
                            that['$store'].commit('SET_PROCESS', 0);
                        } else {
                            // 计算总值
                            if (that.preFiles.length > 1) {
                                that['$store'].commit('SET_PROCESS', ((that.setProcessNum) * 100 / that.preFiles.length).toFixed(1));
                                //  debugger;

                                //  if(that.allProcessDatas.length > 1) {
                                //     that['$store'].commit('SET_PROCESS', ((that.allProcessDatas.length-that.documentTableData.length)*100/that.allProcessDatas.length).toFixed(1));
                                // }
                            }
                        }
                        //// console.log(that.allProcessDatas.length)
                        //// console.log(that.documentTableData.length)
                        // 判断是否全部上传完毕,禁止上传
                        let arr = []; //文件总进度
                        let att = []; //start进度文件集合
                        let doneUploadData = []; //done 文件集合
                        for (let i = 0; i < that.documentTableData.length; i++) {
                            if (that.documentTableData[i].data.status === 'Start' || that.documentTableData[i].data.status === 'Uploading' || that.documentTableData[i].data.status === 'UploadError' || that.documentTableData[i].data.status === 'ProcessError'
                                || that.documentTableData[i].data.status === 'UploadFinish') {
                                att.push(that.documentTableData[i]);
                                if (that.documentTableData[i].done || !that.documentTableData[i].isPrepare) {
                                    arr.push(that.documentTableData[i])
                                }
                            } else if(that.documentTableData[i].data.status === 'Done'){
                                doneUploadData.push(that.documentTableData[i]);
                            }

                        }
                        // 再次赋值
                        for (let i = 0; i < that.documentTableData.length; i++) {
                            // 判断上传完毕后是否在挂接状态
                            if (that.documentTableData[i].conCateStatus == 'Done') {
                                // debugger;
                                that.documentTableData[i].done = true;
                                that.arrsStart.forEach(function (item) {
                                    if (item.originalFileName === that.documentTableData[i].originalFileName && item.originalFileSizeInBytes === that.documentTableData[i].originalFileSizeInBytes) {
                                        item.done = true;
                                    }
                                });

                                that.updateDocumentTable();
                                // this.allProcessDatas = this.allProcessDatas.concat(this.documentTableData[i]);
                                // 添加done状态的序列
                                let arrBorrow = that.borrowTableData;
                                // 实时获取上传完成的路径
                                let ids = [];
                                // debugger;
                                if (arrBorrow.length > 0) {
                                    ids = Array.from(new Set(doneUploadData.map(function (item) {
                                        return item.data.cloudDirId
                                    }).toString().split(',')));
                                }
                                let strIds = JSON.stringify(ids);
                                if (that.fileCloudPathParam !== strIds) {
                                    // 获取云盘路径
                                    Service.getUploadUrl(ids).then((res) => {
                                        if(res.data && res.data.succeeded) {
                                            that.fileCloudPathParam = strIds;
                                            that.fileUpObj = res.data.data;
                                            
                                            for (let obj of that.borrowTableData) {
                                                for (let i in that.fileUpObj) {
                                                    if (obj.data.cloudDirId == i) {
                                                        obj.physicalPath = that.fileUpObj[i]
                                                        that.documentTableData[i].physicalPath = that.fileUpObj[i]
                                                    }
                                                }
                                            }
                                        } 
                                        // else {
                                        //     for (let obj of that.borrowTableData) {
                                        //         for (let i in that.fileUpObj) {
                                        //             if (obj.data.cloudDirId == i) {
                                        //                 obj.physicalPath = that.fileUpObj[i]
                                        //             }
                                        //         }
                                        //     }
                                        // }
                                    });
                                    // that.borrowTableData = att;
                                } else {
                                    for (let obj of that.borrowTableData) {
                                        for (let i in that.fileUpObj) {
                                            if (obj.data.cloudDirId == i) {
                                                obj.physicalPath = that.fileUpObj[i]
                                                that.physicalPath = that.fileUpObj[i];
                                            }
                                        }
                                    }
                                    // that.borrowTableData = att;
                                }
                            }
                        }
                        // 尚有未上传完成的文件
                        if (arr.length !== att.length) {
                            that.allProcessInit = false;
                            that['$store'].commit('SET_ProcessInitTag',false);
                            that.allProcessInitTag = that.$store.state.allProcessInitTag;
                            // console.log('尚有未上传完成的文件');
                            // console.log(att);
                            // console.log(arr);
                            setTimeout(that.getProcess, 2000);
                        } else {
                            this.allProcessInit = true;
                            this['$store'].commit('SET_ProcessInitTag',true);
                            this.allProcessInitTag = this.$store.state.allProcessInitTag;
                            // that.setProcessNum = 0;
                            // 文件全部上传完毕
                            // console.log('// 文件全部上传完毕');
                            // // console.log(that.documentTableData);
                            // // console.log('// 文件全部上传完毕--restFiles');
                            // // console.log(that.restFiles);
                            if (that.documentTableData.length > 0) {
                                that.updateDocumentTable();

                                let ann = [];
                                for (let j = that.documentTableData.length - 1; j >= 0; j--) {
                                    if (that.documentTableData[j].conCateStatus === 'Done') {
                                        that.documentTableData[j].done = true;
                                        ann.push(that.documentTableData[j]);
                                    }
                                }

                                if (ann.length > 0) {
                                    // this.allProcessInit = false;
                                    setTimeout(that.getProcess, 2000);
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
                            setTimeout(that.getProcess, 5000);
                        } else {
                            that['$message']({
                                message: '连接服务器失败，请保持网络连接，点击继续上传',
                                type: 'error',
                                duration: 5 * 1000
                            });
                            that.catch = false;
                            that.allProcessInit = true;
                            that['$store'].commit('SET_ProcessInitTag',true);
                            that.allProcessInitTag = that.$store.state.allProcessInitTag;
                        }
                    })
                } else {
                    // console.log('没有获取到正在上传的文件进度');
                    // console.log(that.arrsStart);
                    if (that.documentTableData.length > 0) {
                        for (let i = 0; i < that.documentTableData.length; i++) {
                            // 判断上传完毕后是否在挂接状态
                            if (that.documentTableData[i].conCateStatus === 'Done') {
                                that.documentTableData[i].done = true;
                                that.arrsStart.forEach(function (item) {
                                    if (item.originalFileName === that.documentTableData[i].originalFileName && item.originalFileSizeInBytes === that.documentTableData[i].originalFileSizeInBytes) {
                                        item.done = true;
                                    }
                                });
                            }
                        }
                        let existUploadFile = false;
                        for (let j = that.documentTableData.length - 1; j >= 0; j--) {
                            if (that.documentTableData[j].conCateStatus !== 'ProcessError'
                                && that.documentTableData[j].conCateStatus !== 'UploadError') {

                                if (that.documentTableData[j].conCateStatus !== 'Done') {
                                    // console.log('还有没完成的上传文件，继续获取进度');
                                    setTimeout(that.getProcess, 5000);
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
                    that['$store'].commit('SET_ProcessInitTag',true);
                    that.allProcessInitTag = that.$store.state.allProcessInitTag;
                    that.catch = false;
                    that['$store'].commit('SET_isShow', false);

                }
                // }
                // }
            }
        }

        // 上传失败重新上传
        lastToFiles(row) {
            // debugger;
            // console.log('lastToFiles----------------------------');
            row.Concate = false;//挂接中状态
            row.done = false;//挂接完成
            row.data.pauseStatus = false;
            row.isPrepare = true;
            row.isStart = true;
            row.process = 0;
            // row.data.restStatus = true;
            row.conCateStatus = 'Start';
            for (let data of this.documentTableData) {
                if (data.originalFileName === row.originalFileName && data.originalFileSizeInBytes === row.originalFileSizeInBytes) {
                    data = row;
                }
            }
            this.documentTableData.remove(row);
            this.documentTableData.push(row);
            let att = [];
            this.arrsStart.forEach(function (item) {
                if (!item.Concate && (item.conCateStatus === 'Start' || item.conCateStatus === 'Uploading')) {
                    att.push(item)
                }
            });

            // console.log('重新上传文件')
            // console.log(this.arrsStart)
            // console.log(att)
            // console.log(this.restFiles)
            this.errorRecordList.push(row.name);
            // console.log(this.errorRecordList)
            if (att.length === 0 && this.restFiles.length === 0) {
                // console.log('resumeFiles重新上传')
                this.arrsStart.push(row);
                this.reUploadSingleFile(row);
            } else {
                // console.log('将文件加到上传队列')
                this.restFiles.push(row);
                this.updateDocumentTable();
                let t = new Date().getTime() - this.progressTime;
                if (t > 3000) {
                    // console.log('重新启动获取进度任务');
                    this.getProcess();
                }
            }
        }

        // 暂停上传
        pauseFiles(row){
            // debugger;
            let fileIds = [];
            let that = this;
            fileIds.push(row.name)
            Service.prepareUpload({fileIds:fileIds},'pauseFiles',that.clientId).then((res) => {
                // 存在fileList未上传完毕
                that.allProcessInit = false;
                that['$store'].commit('SET_ProcessInitTag',false);
                that.allProcessInitTag = that.$store.state.allProcessInitTag;
                for(let data of that.documentTableData){
                    if(data.name===row.name){
                        // 设置暂停上传为 true
                        that.isPauseFilesUpload = true;
                        data.isPrepare = false;
                        that.isPauseFilesUploadId = row.name;
                        data.data.status = 'Paused';
                        // 补位其他文件 小于等于并发数量
                        if(that.arrsStart.length > 1) {
                            that.arrsStart.remove(data);
                        }
                        // 在未上传文件序列里预备
                        data.data.pauseStatus = true;
                        that.restFiles.push(data);
                        that.restFiles.remove(row);
                        that.restFiles.push(row);
                        // 补位
                        if(that.restFiles.length>1){
                            // 设置暂停上传为 false
                            that.isPauseFilesUpload = false;
                            that.goFiles();
                        }
                    }
                }
            });
        }

        // 全部暂停
        pauseAllFiles(){
            // debugger;
            let arr = [];
            for(let datas of this.documentTableData){
                if(datas.process!==100&&datas.isPrepare){
                    arr.push(datas)
                }
            }
            let ids =  []; 
            arr.map(item => ids.push(item.name));
            if(arr.length>0){
                Service.prepareUpload({fileIds:ids},'pauseFiles',this.clientId).then((res) => {
                    // 设置暂停上传为 true
                    this.isPauseFilesUpload = true;
                    // 存在fileList未上传完毕
                    this.allProcessInit = false;
                    this['$store'].commit('SET_ProcessInitTag',false);
                    this.allProcessInitTag = this.$store.state.allProcessInitTag;
                    for(let data of arr){
                        data.isPrepare = false;
                    }
                });
            }
        }

        reUploadSingleFile(row){
            // console.log('reUploadSingleFile----------------------------');
            let fileIds = [];
            if(toString.call(row) === "[object Array]") {
                fileIds = row;
            } else {
                fileIds.push(row.name);
            }
            Service.prepareUpload({fileIds:fileIds},'resumeFiles',this.clientId).then((res) => {
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
                // this['$store'].commit('SET_isShow', true);
                this.fileResumeProcessStarter(row.name,fileOnly)
            });
        }
        // 继续上传
        resumeFiles(row){
            // console.log('resumeFiles----------------------------');
            let fileIds = [];
            // debugger;
            fileIds.push(row.name)
            Service.prepareUpload({fileIds: fileIds},'resumeFiles',this.clientId).then((res) => {
                // 设置暂停上传为 false
                this.isPauseFilesUpload = false;
                this.isPauseFilesUploadId = '';
                this.resumeFilesForm = res.data.data;//获取继续上传文件的信息
                let files = this.fileListAll;
                let fileOnly;
                // console.log('this.fileListAll---------------');
                // console.log(this.fileListAll.length);
                for(let item of files){
                    for(let item2 in this.resumeFilesForm){
                        if(this.resumeFilesForm[item2].originalFileName === item.file.name){
                            item.file.crcedBytes = this.resumeFilesForm[item2].crcedBytes;
                            item.file.fileCompletionInBytes = this.resumeFilesForm[item2].fileCompletionInBytes;
                            fileOnly = item.file;
                            // console.log('this.fileListAll---------------fileOnly');
                        }
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
                // this['$store'].commit('SET_isShow', true);
                this.fileResumeProcessStarter(row.name,fileOnly)
            });
        }

        // 全部继续上传
        resumeAllFiles(){
            // console.log('resumeAllFiles----------------------------');
            // debugger;
            let arr = [];
            let that = this;
            this.errorRecordList = [];
            for(let datas of that.documentTableData){
                if(datas.process!==100&&!datas.isPrepare){
                    arr.push(datas)
                }
            }
            if(arr.length>0){
                let ids = [];
                for(let data of arr){
                    ids.push(data.name);
                }
                Service.prepareUpload({fileIds: ids},'resumeFiles',that.clientId).then((res) => {
                        // 设置暂停上传为 false
                        that.isPauseFilesUpload = false;
                        that.resumeFilesForm = res.data.data;//获取继续上传文件的信息
                        let files = that.fileListAll;
                        let fileOnly;
                        for(let item of files){
                            for(let item2 in that.resumeFilesForm){
                                if(that.resumeFilesForm[item2].originalFileName === item.file.name){
                                    item.file.crcedBytes = that.resumeFilesForm[item2].crcedBytes;
                                    item.file.fileCompletionInBytes = that.resumeFilesForm[item2].fileCompletionInBytes;
                                    fileOnly = item.file;
                                }
                            }
                        }
                        // that['$store'].commit('SET_isShow', true);
                        for(let data of arr){
                            data.isPrepare = true;
                            data.data.status = 'Uploading';
                            that.fileResumeProcessStarter(data.name,fileOnly)
                        }
                    });
            }
        }

        // 全部清空
        deleteAllFileUploads(){
            // console.log('deleteAllFileUploads----------------------------');
            let fileIds = [];
            for(var i=0;i<this.borrowTableData.length;i++) {
                fileIds.push(this.borrowTableData[i].name)
            }
            // 传输中
            if(this.borrowTableData.length===0){
                    this['$message']({
                        message: '暂无需要删除的文件。',
                        type: 'warning'
                    });
            }else{
                this['$confirm']('确认删除选中文件吗？', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    Service.clearFiles({fileIds: fileIds},this.clientId).then((res) =>{
                        if(res.data) {
                            this.listLoading = false;
                            this['$store'].commit('SET_isShow', false);
                            this.allProcessInit = true;
                            this['$store'].commit('SET_ProcessInitTag',true);
                            this.allProcessInitTag = this.$store.state.allProcessInitTag;
                            this.getFilesA();
                            this.borrowTableData = [];
                            this['$message']({
                                message: '删除成功',
                                type: 'success'
                            });
                        } else {
                            this.listLoading = false;
                            this['$store'].commit('SET_isShow', false);
                            this['$message']({
                                message: '删除失败',
                                type: 'eror'
                            });
                        }
                        
                    });
                });
            }
            // if(this.activeName=='0'){
            //         if(this.documentTableData.length===0&&this.errorTableData.length ===0){
            //             this['$message']({
            //                 message: '暂无需要删除的文件。',
            //                 type: 'warning'
            //             });
            //         }else{
            //             this['$confirm']('确认删除选中文件吗？', {
            //                 type: 'warning'
            //             }).then(() => {
            //                 this.listLoading = true;
            //                 Service.searchUpload({action: 'cancelAllFiles',clientId:this.clientId}).then(() =>{
            //                     this.listLoading = false;
            //                     this['$store'].commit('SET_isShow', false);
            //                     this.allProcessInit = true;
            //                     this.isDelete = true;
            //                     this.getFilesA();
            //                     this.documentTableData = [];
            //                     this.errorTableData = [];
            //                     this['$message']({
            //                         message: '删除成功',
            //                         type: 'success'
            //                     });
            //                 });
            //             });
            //         }
            //     // 传输完成
            // }else if((this.activeName=='1')){
            //     if(this.borrowTableData.length===0){
            //         this['$message']({
            //             message: '暂无需要删除的文件。',
            //             type: 'warning'
            //         });
            //     }else{
            //         this['$confirm']('确认删除选中文件吗？', {
            //             type: 'warning'
            //         }).then(() => {
            //             this.listLoading = true;
            //             Service.searchUpload({action: 'clearFinishedFiles',clientId:this.clientId}).then(() =>{
            //                 this.listLoading = false;
            //                 this['$store'].commit('SET_isShow', false);
            //                 this.allProcessInit = true;
            //                 this.getFilesA();
            //                 this.borrowTableData = [];
            //                 this['$message']({
            //                     message: '删除成功',
            //                     type: 'success'
            //                 });
            //             });
            //         });
            //     }
            // }
        };

        getFileServer(){
            // console.log('getFileServer----------------------------');
            let serviceId = cookieConfig.getCookie('serviceId');
            if(serviceId){
                Service.getFileServiceStatus({}).then((res) =>{
                    if(!res || !res.data.data){
                        Service.getFileService({}).then((res) =>{
                            cookieConfig.setCookie('serviceId',res.data.data?res.data.data:'file');
                            window.localStorage.setItem("serviceId",res.data.data?res.data.data:'file');
                        });
                    }
                });

            } else {
                Service.getFileService({}).then((res) =>{
                    cookieConfig.setCookie('serviceId',res.data.data?res.data.data:'file');
                    window.localStorage.setItem("serviceId",res.data.data?res.data.data:'file');
                });
            }
        }

        // 点击选项卡
        handleClick(){
            if(this.activeName === '0'){
                this.documentShow = true;
                this.borrowShow = false;
                this.errorShow = false;
                this.powerShow = false;
                this.formSelect = true;
                this.formInput = true;
            }else if(this.activeName === '1'){
                this.documentShow = false;
                this.borrowShow = true;
                this.errorShow = false;
                this.powerShow = false;
                this.formSelect = false;
                this.formInput = true;
                // 查询云盘位置
            }else{
                this.documentShow = false;
                this.borrowShow = false;
                this.errorShow = true;
                this.powerShow = false;
                this.formSelect = false;
                this.formInput = true;
            }
            this.page = 0;
            this.start = 0;
            // this.getFiles();
        };

        // 显示隐藏上传进度球
        SET_isShow1() {
            this['$store'].commit('SET_isShow', true)
        }

        // 缓存页面判断是否监听进度
        beforeRouteEnter(to, from, next){
            // debugger;
            next(vm =>{
                if(window.sessionStorage.getItem('uploadWay')==='1'){
                    // debugger;
                    vm.showfa = false;
                    vm.showzi = true;
                    // console.log(vm.documentTableData);
                    // console.log(vm.documentTableData);
                }else{
                    vm.showfa = true;
                    vm.showzi = false;
                }
            });
            next();
        }

        // 全局监听上传进度
        beforeRouteLeave(to, from, next) {
             window.sessionStorage.setItem('uploadWay', '0');
            // 显示进度球
            if(!this.allProcessInit && !this.allProcessInitTag){
                this.SET_isShow1();
            }
            next();
        };

        /** 周期函数页面 */
        created(){           
            Array.prototype['remove'] = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
            // debugger;
            // console.log(this.documentTableData);
            // window.sessionStorage.setItem('uploadWay', '0');
            let id = window.sessionStorage.getItem('userId');
            this.loginId =  window.sessionStorage.getItem('LogonUserId');
            this.clientId = base['base64'].encode(id);
            //  //判断是否显示三角
            //     Service.getLounTile(0).then(res=>{
            //         if(res.data.succeeded == true){
            //             // console.log(res.data.data.length)
            //             if(res.data.data.length == 0){
            //                 this.isshowPic = true;
            //             }else{
            //                 this.isshowPic = false;
            //             }
            //         }
            //     })
            if(window.sessionStorage.getItem('uploadWay')==='1'){
                this.showfa = false;
                this.showzi = true;
                // this.findList();
            }else{
                this.showfa = true;
                this.showzi = false;
            }
        };

        //云空间下载
        findModify(row){
            Service.getUploadUp({ guid:row.guid }).then((res) =>{
                if (res) {
                    let csvData = new Blob([res]);
                    if (window.navigator && window.navigator.msSaveBlob) {
                        window.navigator.msSaveBlob(csvData,row.name);
                    }else{
                        let url = window["URL"].createObjectURL(new Blob([res]));
                        let link = document.createElement('a');
                        link.style.display = 'none';
                        link["href"] = url;
                        link.setAttribute('download',row.name);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }else{
                    this['$message']({
                        message: '下载文件失败',
                        type: 'error'
                    });
                }
            })
        };

        mounted(){
            const me = this;
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 202;
                })()
            };
            // 获取数信息
            // this.getLounTile(0);
            // this.getFiles(1);
            // this.getFileServer();
            let closeWin = function (e){
                if(!me.allProcessInit && !me.allProcessInitTag && window.sessionStorage.getItem('uploadWay') !=='0'){
                    var ev = e || event;
                    ev && (ev.returnValue='确认退出吗');
                    cookieConfig.setCookie('isPauseUpload',!me.allProcessInit);
                    me.pauseAllFiles();
                    return '确认退出吗';
                }else{
                    if(cookieConfig.getCookie('isPauseUpload')){
                        cookieConfig.delCookie('isPauseUpload');
                    }
                }

            }
            if(window.attachEvent){
                window.attachEvent('onbeforeunload',closeWin);
            }else{
                window.addEventListener('beforeunload',closeWin,true);
            }


            // 刷新查询
            // Service.searchUpload({action: 'getConfig',clientId:this.clientId}).then((res) => {
            //     let params = res.data.pendingFiles;
            //     if (params!=={}) {
            //         let arr = [];
            //         let att = [];
            //         for (let i in params) {
            //             params[i].name = i;
            //             params[i].Concate = false;//挂接中状态
            //             params[i].done = false;//挂接完成
            //             // 有断点续传文件 暂时去除等待状态
            //             params[i].data.restStatus = false;//去除等待状态
            //             params[i].data.status = 'Paused';//显示重新上传按钮
            //             params[i].isPrepare = false;
            //             params[i].isStart = false;
            //             params[i].process = Number(((params[i].fileCompletionInBytes/params[i].originalFileSizeInBytes)*100).toFixed(1))
            //             // 区分队列
            //             if(params[i].data.type=='CloudFile'){
            //                 if(params[i].data.status!=='Done'){
            //                     arr.push(params[i]);
            //                 }else{
            //                     att.push(params[i])
            //                 }
            //             }
            //         }
            //         // 获取正在上传序列
            //         this.documentTableData = arr;
            //         // 获取完成序列
            //         this.borrowTableData = att;
            //         let ids = [];
            //         if(att.length>0){
            //             ids = att.map(function(item){return item.data.cloudDirId}).toString().split(',');
            //             // 获取云盘路径
            //             Service.getUploadUrl(ids).then((res) =>{
            //                 this.fileUpObj = res.data.data;
            //                 for(let obj of att){
            //                     for(let i in this.fileUpObj){
            //                         if(obj.data.cloudDirId==i){
            //                             obj.physicalPath = this.fileUpObj[i]
            //                         }
            //                     }
            //                 }
            //                 this.borrowTableData = att;
            //             });
            //         }
            //     }
            // });
        };
     
        
    }
</script>
<style lang="scss" scoped>
    @import '../../../../styles/innerPublic.scss';
    .wrapprSection {
        .cloudListContentView{
            >>>.tree, >>>.contentbox{ 
            top:50px;
            }
            >>>.tree .treeCon{
                top:60px;
            }
            >>>.contentbox.contentbox-full{ 
                left: 10px;
                overflow-y: auto;
            }
        }
    } 
.TabRBtn i{
  color: #78c500;
  margin-right: 5px;
}
body >>>.searchKey{
  margin-bottom:10px; 
}
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
  .el-form-item{
  margin-bottom: 18px;
}
</style>
