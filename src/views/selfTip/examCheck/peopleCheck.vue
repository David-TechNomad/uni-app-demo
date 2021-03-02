<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            <span>借阅人变更申请</span>
            <el-button v-show="fanhui" class="checkWay rt" @click="back">返回</el-button>
            <el-button class="checkWay rt" @click="dayin">打印</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号：{{detailData.processNo}}
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{detailData.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.userName}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.userDept}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请时间</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{dateFormat1(detailData.createDate)}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{dateFormat1(detailData.appStartDate)}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划归还日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{dateFormat1(detailData.appEndDate)}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅天数</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{detailData.days}} 天</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">变更后借阅人</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;">{{detailData.updateUserFullName }}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">原流程</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;"><span class="superTarget" @click="findBorrowDetails">{{detailData.oldTitle}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">变更事由</span></div></el-col>
                        <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto;">{{detailData.desc }}</div></el-col>
                    </el-row>
                </ul>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        待借阅文档
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table tooltip-effect="dark" style="width: 100%" stripe max-height="300" :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <template v-for="file in tableHeadArrs">
                                <el-table-column :width="file.width" v-if = "file.fieldName==='CFWZ'" :prop="file.fieldName" :label="file.caption">
                                    <template slot-scope="scope">
                                        <el-popover trigger="hover" placement="top" v-if = "scope.row.CFWZ">
                                            <p>档案存放地</p>
                                            <p>{{ scope.row.CFWZ }}</p>
                                            <p>{{ scope.row.tooltipContent }}</p>
                                            <div slot="reference" class="name-wrapper">
                                                <div>{{ scope.row.CFWZ}}</div>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="file.width" v-if = "file.fieldName==='TM'" :label="file.caption">
                                    <template slot-scope="scope">
                                        <span class="superTarget" @click="electricBorrowDetail(scope.row)">{{scope.row.TM}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="file.width"  v-if="file.fieldName!=='TM'&&file.fieldName!=='CFWZ'" :prop="file.fieldName" :label="file.caption" >
                                </el-table-column>
                            </template>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    审批流程
                    <div class="titleSect"></div>
                </div>
                <div class="basicList1">
                    <el-row>
                        <el-col :span="22">
                            <div class="grid-content2 bg-purple-light">
                                <span class="span3">
                                    <span v-for="(item,index) in stepMap">
                                        {{item.taskNodeName}}【{{item.auditUserName}}<span v-if="item.auditResult==1"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span><span v-if="item.auditResult==2"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>】<span v-if="index != stepMap.length-1"><img style="width:20px;height:20px;vertical-align: top;" src="../../../imgs/arrow.png"></span>
                                    </span>
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="mainCon basicList" v-show="shenpiyijian">
                <div class="loanTipTitle">
                    审批意见
                    <div class="titleSect"></div>
                </div>
                <div class="basicList" style="padding:10px 0 15px">
                    <el-row>
                         <el-col :span="7"  v-show="jiaqian">
                             <el-form :model="checkFilters" class="topParamsForm superLeftForm ">
                                 <el-form-item class="" label="加签人：" label-width="90px">
                                     <div @mouseover="yiru" @mouseout="yichu">
                                        <el-input class="checkName percentName" readonly="readonly" v-model="checkFilters.jiaqianren" placeholder=""></el-input>
                                        <span class="myI" v-show="myI" @click="qingchu"><i class="fa fa-times-circle-o" style="color:lightgrey;font-size:15px;"></i></span>
                                     </div>
                                     <el-button class="checkSearch choosePerson thisInp" @click="jiaqianOut(3)"><i class="fa fa-search"></i></el-button>
                                 </el-form-item>
                             </el-form>
                        </el-col><el-col :span="22"></el-col>
                        <el-col :span="7" v-show="baocunyijian">
                             <el-form :model="checkFilters" class="topParamsForm superLeftForm ">
                                 <el-form-item class="title" label="审批意见：" ref="title" label-width="90px"  :rules="[{required:true,message:'请选择',trigger:'change'}]">
                                     <el-select class="checkName percentName" v-model="checkFilters.title" placeholder="请选择" @change="changeYiJian">
                                         <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                                         </el-option>
                                     </el-select>
                                 </el-form-item>
                             </el-form>
                        </el-col>
                        <el-col :span="22" v-show="baocunyijian">
                            <el-form :model="checkFilters" class="topParamsForm superLeftForm">
                                <el-form-item class="" label="意见说明：" label-width="90px">
                                    <el-input class="" type="textarea" v-model="checkFilters.others" placeholder="最多输入1000字" maxlength="1000"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit(1)" v-show="passOrNotPass">批准</el-button>
                <el-button class="checkWay" @click="applySubmit(2)" v-show="passOrNotPass">驳回</el-button>
                <el-button class="checkWay" @click="applySubmit(1)" v-show="tijiao">收到</el-button>
                <el-button class="checkWay" @click="applyTransfer()" v-show="forward">转发</el-button>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批记录
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table tooltip-effect="dark" style="width: 100%" stripe :data="recordData" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{recordData.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="taskNodeName" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="auditRemark" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="auditUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate" :formatter="dateFormat" label="审批时间" width="200">
                            </el-table-column>
                            <el-table-column prop="type" label="操作">
                            </el-table-column>
                            <el-table-column prop="nextNodeUserName" label="接收人">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog v-dialogDrag class="zhuanfaModal" title="选择转发人员" :visible.sync="peopleVisible0" :close-on-click-modal="true">
            <div class="checkCon">
                <div class="daiTitle">
                    流程转发
                </div>
                <p class="rightTitle">
                    标<span style="color:red;">*</span>为必填项
                </p>
                <div>
                    <el-row>
                      <el-col :span="6"><div class="grid-content3 bg-purple3"><span class="span4">标题：</span></div></el-col>
                      <el-col :span="18"><div class="grid-content3 bg-purple-light3"><span class="span5">{{detailData.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6"><div class="grid-content3 bg-purple3"><span class="span4"><span style="color:red;">*</span>转发人员：</span></div></el-col>
                      <el-col :span="18"><div class="grid-content3 bg-purple-light3"><el-input readonly v-model="checkFilters.zhuanfaName"></el-input><el-button class="checkSearch choosePerson thisInp1" @click="xuanren(0)"><i class="fa fa-search"></i></el-button></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6"><div class="grid-content4 bg-purple3"><span class="span6"><span style="color:red;">*</span>转发意见：</span></div></el-col>
                      <el-col :span="18"><div class="grid-content4 bg-purple-light3"><el-input type="textarea" placeholder="最多输入200字" maxlength="200" class="myInput" v-model="checkFilters.auditRemark"></el-input></div></el-col>
                    </el-row>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="chooseDone0" >提交</el-button>
                <el-button class="checkDefault" @click="peopleVisible0 = false">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible1" :close-on-click-modal="true" :before-close="handleClose">
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
                                         :render-content="renderContent">
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
                <el-button class="checkDefault" @click="peopleVisible1 = false;node.childNodes = [];dataOa = [];checkNameForm.checkName = '';">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './peopleCheck.service';
    import moment from 'moment';
    import base from '@/scrollLoad';
    import treeChange from '../../../utils/treeChange';
    import { Loading } from 'element-ui';
    import HttpRequest from '@/api/request';
    @Component
    export default class appPeopleCheck extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        i: number;
        timer: boolean;
        peopleVisible0: boolean;
        peopleVisible1:boolean;
        treeLoading: boolean;
        comLoading: boolean;
        forward: boolean;
        passOrNotPass: boolean;
        jiaqian:boolean;
        baocunyijian: boolean;
        shenpiyijian:boolean;
        tijiao: boolean;
        fanhui:boolean;
        dataDetail : any = [];
        dataCheck: any = [];
        recordData; any = [];
        tableHeadArrs: any = [];
        listLoading: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        qufen: number;
        treeParamsId: number;
        processId:number;
        a:number;
        marginSize:number;
        myI: boolean;
        dataCompany: any = [];
        leafName: any = [];
        searchOptions: any = [];
        checkNameForm: any = {};
        row: any = {};
        detailData: any = {};
        filters: any = {};
        basicForm: any = {};
        pickerOptions: any = {};
        checkFilters: any = {};
        dateOptions: any = {};
        allParams:any = {};
        node: any = {};
        resolve: any = {};
        list: any = [];
        list1: any = [];
        data: any = [];
        dataOa: any = [];
        defaultTrees: any = [];
        dataName: any = [];
        tree: any = [];
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        stepMap: any = [];
        oaClickRowName: any = {};
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.myI = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.processId = 0;
            this.a = 0;
            this.marginSize = 0;
            this.i = 0;
            this.listLoading = false;
            this.peopleVisible0 = false;
            this.peopleVisible1 = false;
            this.treeLoading = false;
            this.comLoading = false;
            this.forward = false;
            this.passOrNotPass = false;
            this.jiaqian = false;
            this.baocunyijian = false;
            this.shenpiyijian = false;
            this.tijiao = false;
            this.fanhui = false;
            this.dataDetail = [];
            this.dataCheck = [];
            this.recordData = [];
            this.tableHeadArrs = [];
            this.defaultTrees = {
                children: 'children',
                label: 'shortName',
                id:'orgID'
            };
            this.row = {};
            this.searchOptions = [
                { label:'同意',value:'1'},
                { label:'不同意',value:'2'},
                { label:'收到',value:'3'}
            ];
            this.oaClickRowName = {
                uName:'',
                uid:'',
                zhiwu:'',
                bumen:''
            };
            this.checkFilters = {
                title:'',
                others:'',
                jiaqianren:'',
                zhuanfaName:'',
                jiaqianrenID:'',
                zhuanfaNameID:'',
                jiaqianrenBumen:'',
                jiaqianrenZhiwu:'',
                zhuanfaNameBumen:'',
                zhuanfaNameZhiwu:'',
            }
        }

        back():void{
            //this['$router'].go(-1);
            this['$router'].push({
                path:'/selfTip/examination',
            });
        };

        //时间格式化
        dateFormat1(date) {
            if(date){
                return moment(date).format("YYYY-MM-DD");
            }else{
                return '';
            }
        }

        // 下载
        electricDownLoad(){

        };

        // 表格内时间格式化
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }


        // 查询审核列表
        borrowCheckTable(){
            let params = {
                applicationNo:this.detailData.applicationNo
            };
            Service.borrowCheckTable(params).then((res) =>{
                if(res.data.succeeded){
                    this.dataCheck = res.data.data;
                }else{
                    this['$message']({
                        message: '加载审批列表失败！',
                        type: 'error'
                    });
                }
            })
        }

        // 批准
        applySubmit(a){
            if(this.checkFilters.title == '' || this.checkFilters.title == null){
                this['$message']({
                    message: '请选择审批意见',
                    type: 'warning'
                });
                return;
            }

            let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在提交中，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );

            let aa;
            if(this.processId == 0){
                aa = this.row.processId;
            }else{
                aa = this.a;
            }
            let params = {
                id:aa,
                auditResult:a,
                auditRemark:this.checkFilters.others,
                appendApprovcalUsers:this.checkFilters.jiaqianrenID,
            };
            Service.approvalSubmit(params).then((res) =>{
                this.$nextTick(() => {
                    loadingInstance.close();
                });
                if(res.data.succeeded){
                    this['$message']({
                        message: '成功！',
                        type: 'success'
                    });
                    if(this.processId == 0){
                        this['$router'].push({
                            path:'/selfTip/examination',
                        });
                    }else{
                        window.opener = null;
               　　　　 window.close();
                    }


                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
            this.oaClickRowName.uName = '';
            this.oaClickRowName.uid = '';
        };
        // 转发
        applyTransfer(){
            this.peopleVisible0 = true;
        };

        // 查询档案列表
        getHeader():void{
            Service.borrowFileHead({}).then((res) =>{
                if(res.data.succeeded){
                    this.tableHeadArrs = res.data.data;
                    this.dataDetail = this.detailData.archiveList;
                }else{
                    this['$message']({
                        message: '加载表格列配置失败！',
                        type: 'error'
                    });
                }
            })
        };

        //获取详情
        getInfo(){
            let processId;
            if(this.processId == 0){
                processId = parseInt(this.row.processId);
            }else{
                processId = this.a;
            }
            let params = {borrowId:null,processId:processId};
            Service.getInfo(params).then((res) =>{
                this.detailData = res.data.data;
                this.getHeader();
                this.stepMap = this.detailData.approvalFlowList;
                this.recordData = this.detailData.approvalRecordList;
                this.forward = this.detailData.forward;
                this.shenpiyijian = this.detailData.isApprovalNode;
                let type = this.detailData.type;
                if(this.detailData.isApprovalNode == true){ // 待办
                	if(type == 0){//显示通过 驳回
                	    this.passOrNotPass = true;
                        if(this.detailData.additionalSignature == true){ //显示加签
                            this.jiaqian = true;
                        }
                	}else if(type == 6 || type == 4 ){//显示提交按钮
                        this.tijiao = true;
                	}
                        this.baocunyijian = true;
                }
            });
        }

        //加签选人弹出框
        jiaqianOut(obj){
            this.i+=1;
            this.qufen = obj;
            this.peopleVisible1 = true;
            if(this.i != 1){
                this.loadNode(this.node,this.resolve);
            }
            //回显
            let obj = {
                        userID:this.checkFilters.jiaqianrenID,
                        fullName:this.checkFilters.jiaqianren,
                        unitname:this.checkFilters.jiaqianrenBumen,
                        jobname:this.checkFilters.jiaqianrenZhiwu
                        };
            let attr = [];
            attr.push(obj);
            if(obj.fullName == ''){
                this.dataOa = [];
            }else{
                this.dataOa = attr;
            }
            //常用联系人
            Service.getContacts({}).then((res) =>{
                this.dataName = res.data.data;
            });
        }

        //转发选人弹出框
        xuanren(obj){
            this.i+=1;
            this.qufen = obj;
            this.peopleVisible1 = true;
            if(this.i != 1){
                this.loadNode(this.node,this.resolve);
            }
            let obj = {
                        userID:this.checkFilters.zhuanfaNameID,
                        fullName:this.checkFilters.zhuanfaName,
                        unitname:this.checkFilters.zhuanfaNameBumen,
                        jobname:this.checkFilters.zhuanfaNameZhiwu
                        };
            let attr = [];
            attr.push(obj);
            if(obj.fullName == ''){
                this.dataOa = [];
            }else{
                this.dataOa = attr;
            }
            //常用联系人
            Service.getContacts({}).then((res) =>{
                this.dataName = res.data.data;
            });
        }

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

        // 点击左侧OA表格行（单选）
        oaClickRow1(row){
            this.oaClickRowName.uName = row.fullName;
            this.oaClickRowName.uid = row.userID;
            this.oaClickRowName.zhiwu = row.jobname;
            this.oaClickRowName.bumen = row.unitname;
        };

        // 审批人确定（单选）
        chooseDone1(){
            if(this.qufen === 3){
                this.checkFilters.jiaqianren = this.oaClickRowName.uName;
                this.checkFilters.jiaqianrenID = this.oaClickRowName.uid;
                this.checkFilters.jiaqianrenBumen = this.oaClickRowName.bumen;
                this.checkFilters.jiaqianrenZhiwu = this.oaClickRowName.zhiwu;
            }else if(this.qufen === 0){
                this.checkFilters.zhuanfaName = this.oaClickRowName.uName;
                this.checkFilters.zhuanfaNameID = this.oaClickRowName.uid;
                this.checkFilters.zhuanfaNameBumen = this.oaClickRowName.bumen;
                this.checkFilters.zhuanfaNameZhiwu = this.oaClickRowName.zhiwu;
            }
            this.peopleVisible1 = false;
            this.saveContacts(this.oaClickRowName.uid);
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        };

        // 转发人确定
        chooseDone0(){
            let aa;
            if(this.processId == 0){
                aa = this.row.processId;
            }else{
                aa = this.a;
            }
            let id = aa;
            let users = this.checkFilters.zhuanfaNameID.toString();
            let auditRemark = this.checkFilters.auditRemark;
            let parame = {id:id,users:users,auditRemark:auditRemark};
            if(users != '' && users != null && auditRemark != '' && auditRemark != null){

                let loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在提交中，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );

                Service.taskNodeForward(parame).then((res) =>{

                    this.$nextTick(() => {
                        loadingInstance.close();
                    });

                    if(res.data.succeeded){
                        this['$message']({
                            message: '转发成功！',
                            type: 'success'
                        });
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }

                });
                this.peopleVisible0 = false;
                this.oaClickRowName.uName = '';
                this.oaClickRowName.uid = '';
                this.checkFilters.zhuanfaName = '';
                this.checkFilters.auditRemark = '';
            }else{
                if(users == '' || users == null){
                    this['$message']({
                        message: '转发人不能为空！',
                        type: 'warning'
                    });
                }else if(auditRemark == '' || auditRemark == null){
                    this['$message']({
                        message: '转发意见不能为空！',
                        type: 'warning'
                    });
                }
            }

        };

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

        //双击
        dblNameRow(row){
            if(this.qufen === 3){
                this.checkFilters.jiaqianren = row.fullName;
                this.checkFilters.jiaqianrenID = row.userID;
                this.checkFilters.jiaqianrenBumen = row.unitname;
                this.checkFilters.jiaqianrenZhiwu = row.jobname;
            }else if(this.qufen === 0){
                this.checkFilters.zhuanfaName = row.fullName;
                this.checkFilters.zhuanfaNameID = row.userID;
                this.checkFilters.zhuanfaNameBumen = row.unitname;
                this.checkFilters.zhuanfaNameZhiwu = row.jobname;
            }
            this.peopleVisible1 = false;
            this.saveContacts(row.userID);
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
            //this.dataOa.push(row);
        }

        findBorrowDetails(){
            window.sessionStorage.setItem('applicationNo',this.detailData.applicationNo);
            window.sessionStorage.setItem('rectState', 'right');
            if(this.processId == 1){
                window.sessionStorage.setItem('z_check', 4);
            }else{
                window.sessionStorage.setItem('z_check', 1);
            }
            this['$router'].push({
                path:'/selfTip/borrowDetails/borrowDetails',
                name:'实体借阅单详情',
            });
         };

        electricBorrowDetail(row){
            var obj = {appNo:this.detailData.applicationNo,archiveId:row.id,libId:row.libId,MJ:row.MJ}
            window.sessionStorage.setItem('searchToDetail',JSON.stringify(obj))
            this['$router'].push({
                path:'/retrieve/searchDetail/searchDetail',
            })
        }

        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };

        changeYiJian(data){
            if(data === '1'){
                this.checkFilters.others = "同意";
            }else if(data === '2'){
                this.checkFilters.others = "不同意";
            }else if(data === '3'){
                this.checkFilters.others = "收到";
            }
        }

        saveContacts(ids){
            Service.saveContacts(ids).then((res) =>{

            });
        }

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
                        this.dataName = [];
                    }else{
                        this['$message']({
                            message: '删除失败！',
                            type: 'error'
                        });
                    }
                });
            });
        }

        dayin(){
            let parames = {id:this.detailData.id,type:3};
            Service.printProcess(parames).then((res) =>{
                if (res) {
                    let csvData = new Blob([res],{type: 'application/pdf'});
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(csvData,'document.pdf');
                    }else{
                        let url = window["URL"].createObjectURL(new Blob([res],{type: 'application/pdf'}));
                        window.open(url);
                    }
                }else{
                    this['$message']({
                        message: '打印失败！',
                        type: 'error'
                    });
                }
            });
        };

        qingchu(){
            this.oaClickRowName.uid = '';
            this.oaClickRowName.uName = '';
            this.checkFilters.jiaqianren = '';
            this.checkFilters.jiaqianrenID = '';
            this.checkFilters.jiaqianrenZhiwu = '';
            this.checkFilters.jiaqianrenBumen = '';
        }

        yiru(){
           if(this.checkFilters.jiaqianren != ''){
                this.myI = true;
           }
        }
        yichu(){
            this.myI = false;
        }

         handleClose(){
             this.peopleVisible1  =false;
             this.node.childNodes = [];
             this.dataOa = [];
             this.checkNameForm.checkName = '';
         }

        created(){
            this.row = JSON.parse(window.sessionStorage.getItem('examCheckData'));
            let url = window.location.href;
            url = unescape(url);
            console.log(url);
            if(url.indexOf("nodeId") > 0){
                this.processId = 1;
                if(url.split('?')[2]){
                    let bb = (url.split('?')[2]);
                    let pb = bb.substr(bb.indexOf("=")+1);
                    let b = base['base64'].decode(
                        JSON.stringify(pb)
                    );
                    this.a = parseInt(b);
                }
            }else{
                this.processId = 0;
                this.fanhui = true;
            }

            if(this.processId != 0){
                this.marginSize = -50;

            }

        };

        mounted(){
            //this.borrowCheckTable();
            this.getInfo();
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/transferDetail/transferDetail';
</style>