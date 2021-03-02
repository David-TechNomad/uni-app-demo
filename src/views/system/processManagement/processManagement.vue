<template>
    <section>
        <div class="mainTitle">
            <span>流程实例管理</span>
        </div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow">
                 <div class="formData">
                     <el-form :inline="true" :model="filters" class="topParamsForm doubleForm">
                         <el-form-item v-for="" class="company" label="申请单号：" ref="createName">
                             <el-input class="checkName" v-model="filters.processNo" placeholder="单行输入" clearable></el-input>
                         </el-form-item>
                         <el-form-item v-for="" class="company" label="姓名：" ref="approvalName">
                             <el-input class="checkName" v-model="filters.approvalName" placeholder="单行输入" clearable></el-input>
                         </el-form-item>
                         <el-form-item v-for="" class="fondName" label="万信号：" ref="approvalCtx">
                             <el-input class="checkName" v-model="filters.approvalCtx" placeholder="单行输入" clearable></el-input>
                         </el-form-item>
                         <el-form-item label="流程类型：" prop="processType" ref="processType">
                              <el-select class="checkName" v-model="filters.processType">
                                   <el-option v-for="item in selectAttr" :key="item.code" :label="item.displayText" :value="item.code">
                                   </el-option>
                              </el-select>
                         </el-form-item>
                         <el-form-item>
                             <el-button class="checkWay" @click="getFiles">检索</el-button>
                             <el-button class="checkWay" @click="qingKong">清空</el-button>
                         </el-form-item>
                     </el-form>
                 </div>
                 <div class="btnDiv">
                    <el-button class="checkWay thisBtn" @click="plxgspr">批量修改审批人</el-button>
                 </div>
                 <div class="borderTable">
                    <el-table tooltip-effect="dark" border :height="bodyHeight" :data="tableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                         <el-table-column :show-overflow-tooltip="true" prop="processNo" label="申请单号" width="200px">
                            <template slot-scope="scope">
                                <span class="superChange" @click="xiangQing(scope.row,1)">{{scope.row.processNo}}</span>
                            </template>
                         </el-table-column>
                         <el-table-column :show-overflow-tooltip="true" prop="createFullName" label="申请人">
                         </el-table-column>
                         <el-table-column prop="createDate" :formatter="dateFormat1" label="申请时间" width="100px">
                         </el-table-column>
                         <el-table-column prop="roleName" label="具体流程" width="600px">
                             <template slot-scope="scope">
                                    <span v-for="(item,index) in scope.row.approvalFlowList" v-if="processType == '6' || processType == '1' || processType == '7' || processType == '2'">
                                        {{item.taskNodeName}}【{{item.auditUserName}}<span v-if="item.auditResult==1"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span><span v-if="item.auditResult==2"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>】<span v-if="index != scope.row.approvalFlowList.length-1"><img style="width:20px;height:20px;vertical-align: top;" src="../../../imgs/arrow.png"></span><span v-if="(index+1)%3 == 0"><br/></span>
                                    </span>
                                    <span v-for="(item,index) in scope.row.approvalFlowList" v-if="processType == '5'">
                                        {{item.taskNodeName}}【{{item.auditUserName}}<span v-if="item.auditResult==0 || item.auditResult==5 || item.auditResult==8"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span><span v-if="item.auditResult==1"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>】<span v-if="index != scope.row.approvalFlowList.length-1"><img style="width:20px;height:20px;vertical-align: top;" src="../../../imgs/arrow.png"></span><span v-if="(index+1)%3 == 0"><br/></span>
                                    </span>
                            </template>
                         </el-table-column>
                         <el-table-column :show-overflow-tooltip="true" prop="status" label="状态">
                            <template slot-scope="scope">
                                <span v-if="processType == '1'">
                                    <span v-if="scope.row.status == '1'">已通过</span>
                                    <span v-if="scope.row.status == '2'">审核中</span>
                                    <span v-if="scope.row.status == '4'">已驳回</span>
                                    <span v-if="scope.row.status == '5'">已结束</span>
                                </span>
                                <span v-if="processType == '2'">
                                    <span v-if="scope.row.status == '1'">审核中</span>
                                    <span v-if="scope.row.status == '2'">已通过</span>
                                    <span v-if="scope.row.status == '3'">已驳回</span>
                                    <span v-if="scope.row.status == '4'">已结束</span>
                                </span>
                                <span v-if="processType == '6'">
                                    <span v-if="scope.row.status == '1'">已通过</span>
                                    <span v-if="scope.row.status == '2'">审核中</span>
                                    <span v-if="scope.row.status == '3'">已驳回</span>
                                    <span v-if="scope.row.status == '4'">已结束</span>
                                </span>
                                <span v-if="processType == '5'">
                                    <span v-if="scope.row.status == '1'">审核中</span>
                                    <span v-if="scope.row.status == '2'">已通过</span>
                                    <span v-if="scope.row.status == '3'">已驳回</span>
                                    <span v-if="scope.row.status == '4'">已结束</span>
                                </span>
                                <span v-if="processType == '7'">
                                    <span v-if="scope.row.status == '1'">审核中</span>
                                    <span v-if="scope.row.status == '2'">已通过</span>
                                    <span v-if="scope.row.status == '3'">已驳回</span>
                                    <span v-if="scope.row.status == '4'">已结束</span>
                                </span>
                            </template>
                         </el-table-column>
                         <el-table-column label="操作"  width="320px">
                             <template slot-scope="scope">
                                <span v-if="processType == '1'">
                                    <span class="addBtn" @click="xiugai(scope.row,2)" v-show="scope.row.status == 2">修改</span>
                                    <span class="addBtn" @click="qzgb(scope.row)" v-show="scope.row.status == 2 || scope.row.status == 4">强制关闭</span>
                                    <span class="addBtn" @click="pass(scope.row,2)" v-show="scope.row.status == 2">强制通过</span>
                                    <span class="addBtn" @click="notPass(scope.row,3)" v-show="scope.row.status == 2">强制驳回</span>
                                </span>
                                <span v-if="processType == '2'">
                                    <span class="addBtn" @click="xiugai(scope.row,2)" v-show="scope.row.status == 1">修改</span>
                                    <span class="addBtn" @click="qzgb(scope.row)" v-show="scope.row.status == 1 || scope.row.status == 3">强制关闭</span>
                                    <span class="addBtn" @click="pass(scope.row,2)" v-show="scope.row.status == 1">强制通过</span>
                                    <span class="addBtn" @click="notPass(scope.row,3)" v-show="scope.row.status == 1">强制驳回</span>
                                </span>
                                <span v-if="processType == '6'">
                                    <span class="addBtn" @click="xiugai(scope.row,2)" v-show="scope.row.status == 2">修改</span>
                                    <span class="addBtn" @click="qzgb(scope.row)" v-show="scope.row.status == 2 || scope.row.status == 3">强制关闭</span>
                                    <span class="addBtn" @click="pass(scope.row,2)" v-show="scope.row.status == 2">强制通过</span>
                                    <span class="addBtn" @click="notPass(scope.row,3)" v-show="scope.row.status == 2">强制驳回</span>
                                </span>
                                <span v-if="processType == '5'">
                                    <span class="addBtn" @click="xiugai(scope.row,2)" v-show="scope.row.status == 1">修改</span>
                                    <span class="addBtn" @click="qzgb(scope.row)" v-show="scope.row.status == 1 || scope.row.status == 3">强制关闭</span>
                                    <span class="addBtn" @click="pass(scope.row,2)" v-show="scope.row.status == 1">强制通过</span>
                                    <span class="addBtn" @click="notPass(scope.row,3)" v-show="scope.row.status == 1">强制驳回</span>
                                </span>
                                <span v-if="processType == '7'">
                                    <span class="addBtn" @click="xiugai(scope.row,2)" v-show="scope.row.status == 1">修改</span>
                                    <span class="addBtn" @click="qzgb(scope.row)" v-show="scope.row.status == 1 || scope.row.status == 3">强制关闭</span>
                                    <span class="addBtn" @click="pass(scope.row,2)" v-show="scope.row.status == 1">强制通过</span>
                                    <span class="addBtn" @click="notPass(scope.row,3)" v-show="scope.row.status == 1">强制驳回</span>
                                </span>
                             </template>
                         </el-table-column>
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
                        </el-pagination>
                    </el-col>
                 </div>
            </div>
        </div>

        <el-dialog class="fixModal" title="批量修改审批人" :visible.sync="fileVisibleMoveUpdate" :close-on-click-modal="false" :before-close="handleClose1">
            <div class="scrollCon formDiv">
                <div class="tableCon">
                    <el-form :model="fileForm" :rules="fileFormRules" label-width="120px" ref="fileForm">
                        <el-form-item label="原节点审批人：" class="basicItem" ref="userId" prop="userId">
                            <el-select class="checkName percentName" v-model="fileForm.userId" style="width:260px;">
                                <el-option v-for="item in shenpirenAttr" :key="item.userId" :label="item.fullName" :value="item.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="新审批人 ：" class="basicItem" ref="newPeople" prop="newPeople">
                            <el-input class="checkName percentName" readonly v-model="fileForm.newPeople"></el-input>
                            <i class="fa fa-search bigJing" @click="xuanren"></i>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button type="primary" class="checkWay" @click="sureBatchUpdateFondsUser('fileForm')">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog class="fileModal closeModal" :title="biaoti" :visible.sync="peopleVisible0" :close-on-click-modal="true">
            <el-form :model="checkFilters" label-width="75px" ref="">
                <el-form-item class="things" label="全宗号：" ref="date" :rules="[{required:true,message:'请填写',trigger:'blur'}]" v-show="processType == 5 && code == 2">
                    <el-input :rows="5" placeholder="最多输入50字" maxlength="50" class="checkName percentName" v-model="checkFilters.fondCode"></el-input>
                </el-form-item>
                <el-form-item class="things" label="说明：" ref="date" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                    <el-input :rows="5" placeholder="最多输入1000字" type="textarea" maxlength="1000" class="checkName percentName" v-model="checkFilters.auditRemark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="chooseDone0">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible" :close-on-click-modal="true" :before-close="handleClose">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="115px" ref="cell" @submit.native.prevent>
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName" @keyup.enter.native="searchName(checkNameForm.checkName)"></el-input>
                                        <el-button class="checkWay" @click.enter="searchName(checkNameForm.checkName)">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="topCheckTree oaTree">
                                <el-tree node-key="id"
                                         v-loading="treeLoading"
                                         ref="tree"
                                         :load="loadNode"
                                         :props="defaultTrees"
                                         lazy
                                         @node-click="handleNodeClick"
                                         ><!--:render-content="renderContent"-->
                                </el-tree>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopRight checkTop">
                            <div class="topCheckCon">
                                <label>常用联系人</label><span>(双击选择)</span>
                                <span class="rt" @click="clearPeople" style="color:#3c78d4;cursor:pointer;">全部清除</span>
                            </div>
                            <div class="topCheckTree" style="padding:0">
                                <el-table  @row-dblclick="dblNameRow"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
                                    <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomAll">
                            <el-table tooltip-effect="dark" @row-dblclick="dblNameRow" @row-click="oaClickRow1" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkDefault" @click="peopleVisible = false;node.childNodes = [];dataOa = [];checkNameForm.checkName = '';">取消</el-button>
                <el-button class="checkWay" @click="chooseDone" >确定</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './processManagement.service';
    import moment from 'moment';
    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
    @Component
    export default class processManagement extends Vue{
        bodyHeight: number;
        fileVisibleMoveUpdate: boolean;
        tableData: any = [];
        fileForm: any = {};
        filters: any = {};
        parames: any = {};
        selectAttr: any = [];
        peopleVisible0: boolean;
        listLoading: boolean;
        checkFilters: any = {};
        biaoti:string;
        biaotiCode:number;
        shenpirenName: string;
        shenpirenCtx: string;
        shenpirenAttr: any = [];
        peopleVisible: boolean;
        checkNameForm: any = {};
        treeLoading: boolean;
        defaultTrees: any = {};
        node: any = {};
        resolve: any = {};
        i: number;
        code: number;
        dataOa: any = [];
        comLoading: boolean;
        total: number;
        oaHeight: number;
        limit: number;
        dataName : any = [];
        peopleObj: any = {};
        fileFormRules: any = {};
        processType: string;
        constructor(){
            super();
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.fileVisibleMoveUpdate = false;
            this.bodyHeight = document.documentElement.clientHeight-280;
            this.fileForm = {
                userId:'',
                newUserId:'',
                newPeople:''
            };
            this.tableData = [];
            this.filters = {
                processNo:'',
                approvalName:'',
                approvalCtx:'',
                processType:'',
                page:0,
                pageSize:25,
                sort:''
            },
            this.parames = {
                processNo:'',
                approvalName:'',
                approvalCtx:'',
                processType:'',
                page:0,
                pageSize:25,
                sort:''
            },
            this.selectAttr = [];
            this.peopleVisible0 = false;
            this.checkFilters = {
                auditRemark: '',
                borrowId:0,
                auditResult:0,
                fondCode:''
            };
            this.listLoading = false;
            this.biaoti = '';
            this.biaotiCode = 0;
            this.shenpirenName = '';
            this.shenpirenCtx = '';
            this.shenpirenAttr = [];
            this.peopleVisible = false;
            this.code = 0;
            this.checkNameForm = {
                checkName:''
            };
            this.treeLoading = false;
            this.defaultTrees = {
                children: 'children',
                label: 'shortName',
                id:'orgID'
            };
            this.i = 0;
            this.dataOa = [];
            this.comLoading = false;
            this.total = 0;
            this.limit = 25;
            this.dataName = [];
            this.peopleObj = {

            };
            this.fileFormRules = {
                userId:[
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                newPeople:[
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
            };
            this.processType = '';
        }

        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            if(this.processType == 1){//档案利用
                return moment(date).format("YYYY-MM-DD");
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }

        handleCurrentChange(val) {
            this.filters.page = val-1;
            this.getFiles();
        };
        handleSizeChange(val) {
            this.filters.pageSize = val;
            this.getFiles();
        };

        xiangQing(row){
            if(this.processType == '6'){
                window.sessionStorage.setItem('zChangePeopleData',JSON.stringify(row))
                this['$router'].push({
                    path:'/system/processManagement/detail/processManagementUpdateDetail',
                    name:'流程实例管理详情页',
                });
            }else if(this.processType == '5'){
                window.sessionStorage.setItem('zQuanZongData',JSON.stringify(row))
                this['$router'].push({
                    path:'/system/processManagement/detail/quanZongUpdateDetail',
                    name:'流程实例管理创建全宗详情页',
                });
            }else if(this.processType == '7'){
                 window.sessionStorage.setItem('zApplyFilerData',JSON.stringify(row))
                 this['$router'].push({
                     path:'/system/processManagement/applyFilerUpdateDetail',
                     name:'流程实例管理申请档案员详情页',
                 });
            }else if(this.processType == '1'){
                  window.sessionStorage.setItem('zBorrowData',JSON.stringify(row))
                  this['$router'].push({
                      path:'/system/processManagement/detail/borrowUpdateDetail',
                  });
            }else if(this.processType == '2'){
               window.sessionStorage.setItem('zYiJiaoData',JSON.stringify(row))
               this['$router'].push({
                   path:'/system/processManagement/detail/wenJianUpdateDetail',
                   name:'流程实例管理文件移交详情页',
               });
            }
        }

        xiugai(row,i){
            if(this.processType == '6'){
                window.sessionStorage.setItem('zChangePeopleData',JSON.stringify(row))
                this['$router'].push({
                    path:'/system/processManagement/processManagementUpdate',
                    name:'流程实例管理修改页',
                });
            }else if(this.processType == '5'){
                window.sessionStorage.setItem('zQuanZongData',JSON.stringify(row))
                this['$router'].push({
                    path:'/system/processManagement/quanZongUpdate',
                    name:'流程实例管理创建全宗修改页',
                });
            }else if(this.processType == '7'){
                 window.sessionStorage.setItem('zApplyFilerData',JSON.stringify(row))
                 this['$router'].push({
                     path:'/system/processManagement/applyFilerUpdate',
                     name:'流程实例管理申请档案员修改页',
                 });
            }else if(this.processType == '1'){
                  window.sessionStorage.setItem('zBorrowData',JSON.stringify(row))
                  this['$router'].push({
                      path:'/system/processManagement/borrowUpdate',
                      name:'流程实例管理借阅申请修改页',
                  });
            }else if(this.processType == '2'){
               window.sessionStorage.setItem('zYiJiaoData',JSON.stringify(row))
               this['$router'].push({
                   path:'/system/processManagement/wenJianUpdate',
                   name:'流程实例管理文件移交修改页',
               });
            }

        }

        plxgspr(){
            let flag = true;
            let processType = '';
            if(this.filters.processType == '7'){
                processType = '4';
            }else{
                processType = this.processType;
            }
            let parames = {
                processType:processType,
                approvalName:this.shenpirenName,
                approvalCtx:this.shenpirenCtx
            };
            Service.getProcessUserList(parames).then((res) =>{
                if(res.data.succeeded){
                    this.shenpirenAttr = res.data.data;
                    if(this.shenpirenAttr.length == 0){
                        this['$message']({
                            message: '该审批人暂无待办！',
                            type: 'warning'
                        });
                    }else{
                        this.fileVisibleMoveUpdate = true;
                    }
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });

        }

        //强制关闭
        qzgb(row){
            this.code = 0;
            this.checkFilters.auditRemark = '';
            this.biaotiFun(1);
            this.peopleVisible0 = true;
            this.checkFilters.borrowId = row.id;
        }

        //强制通过
        pass(row,i){
            this.code = i;
            this.checkFilters.auditRemark = '';
            this.biaotiFun(i);
            this.peopleVisible0 = true;
            this.checkFilters.borrowId = row.id;
        }
        //强制驳回
        notPass(row,i){
            this.pass(row,i);
        }

        //强制确定
        chooseDone0(){
            if((this.checkFilters.fondCode == '' || this.checkFilters.fondCode == null) && this.processType == 5 && this.code == 2){
                this['$message']({
                    message: '请填写全宗号！',
                    type: 'warning'
                });
            }else if(this.checkFilters.auditRemark == '' || this.checkFilters.auditRemark == null){
                 this['$message']({
                     message: '请填写说明！',
                     type: 'warning'
                 });
            }else{
                if(this.filters.processType == '6'){//借阅人变更
                    this.borrowPeople();
                }else if(this.filters.processType == '7'){//申请档案员
                    this.applyFiler();
                }else if(this.filters.processType == '1'){//档案利用
                    this.borrowApply();
                }else if(this.filters.processType == '5'){//创建全宗
                     this.applyFond();
                }else if(this.filters.processType == '2'){//移交
                      this.applyFile();
                }
            }
        }

        biaotiFun(i){
            if(i == 1){
                this.biaoti = "强制关闭";
                this.biaotiCode = 1;
            }else if(i == 2){
                this.biaoti = "强制通过";
                this.biaotiCode = 2;
            }else if(i == 3){
                this.biaoti = "强制驳回";
                this.biaotiCode = 3;
            }
        }

        qingKong(){
            this.filters.processNo = '';
            this.filters.approvalName = '';
            this.filters.approvalCtx = '';

        }

        getFiles(){
            this.listLoading = true;
            this.parames.processNo = this.filters.processNo;
            this.parames.approvalName = this.filters.approvalName;
            this.parames.approvalCtx = this.filters.approvalCtx;
            this.parames.page = this.filters.page;
            this.parames.pageSize = this.filters.pageSize;
            this.parames.sort = this.filters.sort;
            if(this.filters.processType == 7){
                this.parames.processType = 4;
            }else{
                this.parames.processType = this.filters.processType;
            }
            Service.getProcessInstanceList(this.parames).then((res) =>{
            this.listLoading = false;
                if(res.data.succeeded){
                    this.tableData = res.data.data.content;
                    this.shenpirenCtx = this.filters.approvalCtx;
                    this.shenpirenName = this.filters.approvalName;
                    this.total = res.data.data.totalElements;
                    this.processType = this.filters.processType;
                }else{
                    this['$message']({
                         message: res.data.errorMessage,
                         type: 'error'
                     });
                }
            })
        }

        //修改审批人
        lendModalOut(row){
            this.i+=1;
            this.peopleVisible = true;
            if(this.i != 1){
                this.loadNode(this.node,this.resolve);
            }
        }

        // 查询姓名/OA
        searchName(name):void{
            let params = name?name:{};
            this.comLoading = true;
            Service.searchOaList(params).then((res) =>{
                if(res.data.succeeded){
                    this.dataOa = res.data.data;
                    this.comLoading = false;
                }else{
                    this['$message']({
                        message: '检索失败！',
                        type: 'error'
                    });
                    this.comLoading = false;
                }
            });
        };

        // 懒加载树
        loadNode(node,resolve) {
            if(node.level === 0){
                this.node = node;
                this.resolve = resolve;
                this.treeLoading = true;
                Service.seniorWdorg(1).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                        });
                        resolve(treeData);
                        this.treeLoading = false;
                    }else{
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }else{
                this.treeParamsId = node.data.orgID;
                Service.seniorWdorg(this.treeParamsId).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                        });
                        resolve(treeData);
                    }else{
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }
        };

        // 点击子节点
        handleNodeClick(data){
            this.oaPerson(data.orgID);
        };

         // 组织架构选人
        oaPerson(id){
            this.comLoading = true;
            Service.findOaList(id).then((res) =>{
                if(res.data.succeeded){
                    this.dataOa = res.data.data;
                    this.comLoading = false;
                }else{
                    this['$message']({
                        message: '组织架构列表加载失败！',
                        type: 'error'
                    });
                    this.comLoading = false;
                }
            });
        };

        // 清除常用联系人
        clearPeople(){
            this['$confirm']('确认全部清除吗？', {
                type: 'warning'
            }).then(() => {
                Service.clearOaPerson({}).then((res) =>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getContacts();
                    }else{
                        this['$message']({
                            message: '删除失败！',
                            type: 'error'
                        });
                    }
                });
            });
        }

        //常用联系人
        getContacts(){
            Service.getContacts({}).then((res) =>{
                this.dataName = res.data.data;
            });
        }

        //双击
        dblNameRow(row){
            console.log(row)
            this.fileForm.newUserId = row.userID;
            this.fileForm.newPeople = row.fullName;
            this.saveContacts(row.userID);
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
            this.peopleVisible = false;
        }

        // 点击左侧OA表格行（单选）
        oaClickRow1(row){
            this.peopleObj = row;
        };

        saveContacts(ids){
            Service.saveContacts(ids).then((res) =>{

            });
        }

        //审批人弹框确定
        chooseDone(){
            this.fileForm.newUserId = this.peopleObj.userID;
            this.fileForm.newPeople = this.peopleObj.fullName;
            this.saveContacts(this.peopleObj.userID);
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
            this.peopleVisible = false;
        }

        // 批量修改审批人确定
        sureBatchUpdateFondsUser(fileForm){
            let processType = '';
            if(this.filters.processType == '7'){
                processType = '4';
                let oldAuditUserName = '';
                for(let child of this.shenpirenAttr){
                    if(child.userId == this.fileForm.userId){
                        oldAuditUserName = child.fullName;
                    }
                }
                let parames = {
                    oldAuditUserId:this.fileForm.userId.toString(),
                    newAuditUserId:this.fileForm.newUserId.toString(),
                    oldAuditUserName:oldAuditUserName,
                    newAuditUserName:this.fileForm.newPeople
                };
                this.updateSprForApplyFiler(fileForm,parames);
            }else if(this.filters.processType == '6'){
                processType = this.processType;
                let parames = {
                    oldUserId:this.fileForm.userId,
                    userId:this.fileForm.newUserId,
                    processType:processType
                };
                this.updateSprForChangePeople(fileForm,parames);
            }else if(this.filters.processType == '5'){
                processType = this.processType;
                let parames = {
                    oldUserId:this.fileForm.userId,
                    userId:this.fileForm.newUserId,
                    processType:processType
                };
                this.updateSprForChangePeople(fileForm,parames);
            }else if(this.filters.processType == '1'){
                processType = this.processType;
                let parames = {
                    oldUserId:this.fileForm.userId,
                    userId:this.fileForm.newUserId,
                    processType:processType,
                    fullName:this.fileForm.newPeople
                };
                this.updateSprForChangePeople(fileForm,parames);
             }else if(this.filters.processType == '2'){
                  processType = this.processType;
                  let parames = {
                      oldUserId:this.fileForm.userId,
                      userId:this.fileForm.newUserId,
                      processType:processType,
                      fullName:this.fileForm.newPeople
                  };
                  this.updateSprForChangePeople(fileForm,parames);
             }
        }

        updateSprForChangePeople(fileForm,parames){
            this['$refs'][fileForm]['validate']((valid)=>{
                if (valid) {
                    if(this.fileForm.userId == this.fileForm.newUserId){
                        this['$message']({
                            message: '新审批人不能和原审批人相同！',
                            type: 'warning'
                        });
                    }else{
                        Service.batchUpdateProcessApprovalUser(parames).then((res) =>{
                            if(res.data.succeeded){
                                this['$message']({
                                    message: '成功！',
                                    type: 'success'
                                });
                                this.shenpirenAttr = [];
                                this.fileForm.userId = '';
                                this.fileForm.newUserId = '';
                                this.fileForm.newPeople = '';
                                this['$refs'][fileForm]['resetFields']();
                                this.fileVisibleMoveUpdate = false;
                                this.getFiles();
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        })
                    }
                }
            });
        }

        updateSprForApplyFiler(fileForm,parames){
            this['$refs'][fileForm]['validate']((valid)=>{
                if (valid) {
                    if(this.fileForm.userId == this.fileForm.newUserId){
                        this['$message']({
                            message: '新审批人不能和原审批人相同！',
                            type: 'warning'
                        });
                    }else{
                        Service.batchModificationAuditor(parames).then((res) =>{
                            if(res.data.succeeded){
                                this['$message']({
                                    message: '成功！',
                                    type: 'success'
                                });
                                this.shenpirenAttr = [];
                                this.fileForm.userId = '';
                                this.fileForm.newUserId = '';
                                this.fileForm.newPeople = '';
                                this['$refs'][fileForm]['resetFields']();
                                this.fileVisibleMoveUpdate = false;
                                this.getFiles();
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        })
                    }
                }
            });
        }

        handleClose(){
            this.peopleVisible = false;
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }

        xuanren(){
            this.i+=1;
            this.peopleVisible = true;
            if(this.i != 1){
                this.loadNode(this.node,this.resolve);
            }
            this.getContacts();
        }

        handleClose1(){
            this.shenpirenAttr = [];
            this.fileForm.userId = '';
            this.fileForm.newUserId = '';
            this.fileForm.newPeople = '';
            this['$refs']['fileForm']['resetFields']();
            this.fileVisibleMoveUpdate = false;
        }

        borrowPeople(){
            if(this.biaotiCode == 1){
                let parame = {auditRemark:this.checkFilters.auditRemark,borrowId:this.checkFilters.borrowId};
                Service.enforceCloseProcess(parame).then((res) =>{
                    if(res.data.succeeded){
                         this['$message']({
                             message: '关闭成功！',
                             type: 'success'
                         });
                         this.peopleVisible0 = false;
                         this.getFiles();
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }else if(this.biaotiCode == 2){
                this.checkFilters.auditResult = 1;
                Service.enforcePassOrReturnProcess(this.checkFilters).then((res) =>{
                    if(res.data.succeeded){
                         this['$message']({
                             message: '通过成功！',
                             type: 'success'
                         });
                         this.peopleVisible0 = false;
                         this.getFiles();
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }else if(this.biaotiCode == 3){
                this.checkFilters.auditResult = 2;
                Service.enforcePassOrReturnProcess(this.checkFilters).then((res) =>{
                    if(res.data.succeeded){
                         this['$message']({
                             message: '驳回成功！',
                             type: 'success'
                         });
                         this.peopleVisible0 = false;
                         this.getFiles();
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }
        }

        applyFiler(){
            let parame = {message:this.checkFilters.auditRemark,archiveId:this.checkFilters.borrowId.toString()};
            if(this.biaotiCode == 1){
                Service.getRecordById({id:this.checkFilters.borrowId.toString()}).then((res) =>{
                    if(res.data.data.archivist.status == '3'){
                        this['$message']({
                            message: '当前业务已关闭！',
                            type: 'warning'
                        });
                    }else{
                        Service.shutdownByAdmin(parame).then((res) =>{
                            if(res.data.succeeded){
                                 this['$message']({
                                     message: '关闭成功！',
                                     type: 'success'
                                 });
                                 this.peopleVisible0 = false;
                                 this.getFiles();
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        })
                    }
                })
            }else if(this.biaotiCode == 2){
                 Service.auditAll(parame).then((res) =>{
                     if(res.data.succeeded){
                          this['$message']({
                              message: '通过成功！',
                              type: 'success'
                          });
                          this.peopleVisible0 = false;
                          this.getFiles();
                     }else{
                         this['$message']({
                             message: res.data.errorMessage,
                             type: 'error'
                         });
                     }
                 })
            }else if(this.biaotiCode == 3){
                Service.rejectAll(parame).then((res) =>{
                    if(res.data.succeeded){
                         this['$message']({
                             message: '驳回成功！',
                             type: 'success'
                         });
                         this.peopleVisible0 = false;
                         this.getFiles();
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }
        }

        borrowApply(){
            if(this.biaotiCode == 1){
                let parame = {auditRemark:this.checkFilters.auditRemark,borrowId:this.checkFilters.borrowId.toString(),auditResult:5};
                Service.enforceOperateProcess(parame).then((res) =>{
                    if(res.data.succeeded){
                         this['$message']({
                             message: '关闭成功！',
                             type: 'success'
                         });
                         this.peopleVisible0 = false;
                         this.getFiles();
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }else if(this.biaotiCode == 2){
                let parame = {auditRemark:this.checkFilters.auditRemark,borrowId:this.checkFilters.borrowId.toString(),auditResult:1};
                 Service.enforceOperateProcess(parame).then((res) =>{
                     if(res.data.succeeded){
                          this['$message']({
                              message: '通过成功！',
                              type: 'success'
                          });
                          this.peopleVisible0 = false;
                          this.getFiles();
                     }else{
                         this['$message']({
                             message: res.data.errorMessage,
                             type: 'error'
                         });
                     }
                 })
            }else if(this.biaotiCode == 3){
                let parame = {auditRemark:this.checkFilters.auditRemark,borrowId:this.checkFilters.borrowId.toString(),auditResult:4};
                Service.enforceOperateProcess(parame).then((res) =>{
                    if(res.data.succeeded){
                         this['$message']({
                             message: '驳回成功！',
                             type: 'success'
                         });
                         this.peopleVisible0 = false;
                         this.getFiles();
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }
        }

        applyFond(){
            if(this.biaotiCode == 1){
                let parame = {auditRemark:this.checkFilters.auditRemark,id:this.checkFilters.borrowId.toString()};
                Service.closeFondWorkFlow(parame).then((res) =>{
                    if(res.data.succeeded){
                         this['$message']({
                             message: '关闭成功！',
                             type: 'success'
                         });
                         this.peopleVisible0 = false;
                         this.getFiles();
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }else if(this.biaotiCode == 2){
                let parame = {auditRemark:this.checkFilters.auditRemark,id:this.checkFilters.borrowId.toString(), fondCode:this.checkFilters.fondCode};
                 Service.toEndFondWorkFlow(parame).then((res) =>{
                     if(res.data.succeeded){
                          this['$message']({
                              message: '通过成功！',
                              type: 'success'
                          });
                          this.peopleVisible0 = false;
                          this.getFiles();
                     }else{
                         this['$message']({
                             message: res.data.errorMessage,
                             type: 'error'
                         });
                     }
                 })
            }else if(this.biaotiCode == 3){
                let parame = {auditRemark:this.checkFilters.auditRemark,id:this.checkFilters.borrowId.toString()};
                Service.toStartFondWorkFlow(parame).then((res) =>{
                    if(res.data.succeeded){
                         this['$message']({
                             message: '驳回成功！',
                             type: 'success'
                         });
                         this.peopleVisible0 = false;
                         this.getFiles();
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }
        }

        applyFile(){
            if(this.biaotiCode == 1){
                let parame = {auditRemark:this.checkFilters.auditRemark,transferId:this.checkFilters.borrowId};
                Service.fileEnforceCloseProcess(parame).then((res) =>{
                    if(res.data.succeeded){
                         this['$message']({
                             message: '关闭成功！',
                             type: 'success'
                         });
                         this.peopleVisible0 = false;
                         this.getFiles();
                    }else{
                        if(res.data.errorMessage == '该流程已通过'){
                            this['$message']({
                                message: res.data.errorMessage,
                            });
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    }
                })
            }else if(this.biaotiCode == 2){
                let parame = {auditRemark:this.checkFilters.auditRemark,transferId:this.checkFilters.borrowId, auditResult:1};
                 Service.fileEnforcePassProcess(parame).then((res) =>{
                     if(res.data.succeeded){
                          this['$message']({
                              message: '通过成功！',
                              type: 'success'
                          });
                          this.peopleVisible0 = false;
                          this.getFiles();
                     }else{
                         this['$message']({
                             message: res.data.errorMessage,
                             type: 'error'
                         });
                     }
                 })
            }else if(this.biaotiCode == 3){
                let parame = {auditRemark:this.checkFilters.auditRemark,transferId:this.checkFilters.borrowId,auditResult:2};
                Service.fileEnforcePassProcess(parame).then((res) =>{
                    if(res.data.succeeded){
                         this['$message']({
                             message: '驳回成功！',
                             type: 'success'
                         });
                         this.peopleVisible0 = false;
                         this.getFiles();
                    }else{
                        if(res.data.errorMessage == '该流程已通过'){
                            this['$message']({
                                message: res.data.errorMessage,
                            });
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    }
                })
            }
        }

        // 档案审批刷新
        beforeRouteEnter(to, from, next) {
            next(vm =>{
                if(vm.selectAttr.length != 0){
                    vm.getFiles();
                }
            });
            next();
        };

        created(){
            Service.getDictListByDictId(230).then((res) =>{
                this.selectAttr = res.data.data;
                if(this.selectAttr.length != 0){
                    this.filters.processType = this.selectAttr[0].code;
                    this.getFiles();
                }
            })
        }
        mounted(){

        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/processManagement/processManagement';
</style>