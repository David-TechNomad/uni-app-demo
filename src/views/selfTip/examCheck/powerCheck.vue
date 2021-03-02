<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            <span v-show="archivistType">档案员权限申请</span>
            <span v-show="!archivistType">档案员权限审批</span>
            <el-button class="checkWay rt" @click="back" v-show="fanhui">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号：{{detailData.applyNum}}
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{detailData.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.applyUserName}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.applyPartName}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请时间</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{detailData.applyTime.substr(0,10)}}</span></div></el-col>
                    </el-row>
                    <el-row v-show="archivistType">
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">权限范围</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;">{{fName}}</div></el-col>
                    </el-row>
                    <el-row v-show="!archivistType">
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">变更后档案员</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;">{{detailData.changeUserName}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1" v-show="archivistType">申请事由</span><span class="span1" v-show="!archivistType">变更事由</span></div></el-col>
                        <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto;">{{detailData.applyReason}}</div></el-col>
                    </el-row>
                </ul>
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
                                        {{item.stepName}}【{{item.auditUserName}}<span v-if="item.auditResult==1"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span><span v-if="item.auditResult==2"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>】<span v-if="index != stepMap.length-1"><img style="width:20px;height:20px;vertical-align: top;" src="../../../imgs/arrow.png"></span>
                                    </span>
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    审批意见
                    <div class="titleSect"></div>
                </div>
                <div class="basicList" style="padding:10px 0 15px">
                    <el-row>
                       <el-col :span="7"  v-show="jiaqian">
                            <el-form :model="checkFilters" class="topParamsForm superLeftForm ">
                                <el-form-item class="" label="加签人：" label-width="90px">
                                    <div @mouseover="yiru" @mouseout="yichu"><el-input class="checkName percentName" readonly="readonly" v-model="checkFilters.jiaqianren" placeholder=""></el-input>
                                    <span class="myI" v-show="myI" @click="qingchu"><i class="fa fa-times-circle-o" style="color:lightgrey;font-size:15px;"></i></span></div>
                                    <el-button class="checkSearch choosePerson thisInp" @click="jiaqianOut(3)"><i class="fa fa-search"></i></el-button>
                                </el-form-item>
                            </el-form>
                       </el-col><el-col :span="22"></el-col>
                       <el-col :span="7">
                            <el-form :model="checkFilters" class="topParamsForm superLeftForm ">
                                <el-form-item class="title" label="审批意见：" ref="title" label-width="90px"  :rules="[{required:true,message:'请填写',trigger:'change'}]">
                                    <el-select class="checkName percentName" v-model="checkFilters.title" placeholder="请选择" @change="changeYiJian">
                                        <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                       </el-col>
                        <el-col :span="22">
                            <el-form :model="checkFilters" class="topParamsForm superLeftForm ">
                                <el-form-item class="" label="意见说明：" label-width="90px">
                                    <el-input class="" type="textarea" maxlength="200" v-model="checkFilters.others" placeholder=""></el-input>
                                </el-form-item>
                                <!--<div class="">1234</div>-->
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit(1)" v-show="passOrNotPass">批准</el-button>
                <el-button class="checkWay" @click="applySubmit(2)" v-show="passOrNotPass">驳回</el-button>
                <el-button class="checkWay" @click="applySubmit(3)" v-show="shoudao">收到</el-button>
                <el-button class="checkWay" @click="applyTransfer()" v-show="zhuanfa">转发</el-button>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批记录
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table tooltip-effect="dark" style="width: 100%" stripe :data="dataCheck" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{dataCheck.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="stepName" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="auditRemark" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="auditUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate" :formatter="dateFormat" label="审批时间" width="200">
                            </el-table-column>
                            <el-table-column prop="type" label="操作" width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.businessType === '0'">审批</span>
                                    <span v-if="scope.row.businessType === '1'">转发</span>
                                    <span v-if="scope.row.businessType === '2'">申请</span>
                                    <span v-if="scope.row.businessType === '3'">加签</span>
                                    <span v-if="scope.row.businessType === '4'">批注</span>
                                    <span v-if="scope.row.businessType === '5'">加签审核</span>
                                    <span v-if="scope.row.businessType === '6'">抄送</span>
                                    <span v-if="scope.row.businessType === '7'">重新提交</span>
                                    <span v-if="scope.row.businessType === '8'">驳回</span>
                                    <span v-if="scope.row.businessType === '10'">关闭</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="receiveUserName" label="接收人" width="120">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible1" :close-on-click-modal="true" :before-close="handleClose">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="115px" ref="cell" @submit.native.prevent>
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName" @keyup.enter.native="searchName(checkNameForm.checkName)"></el-input>
                                        <el-button class="checkWay" @click="searchName(checkNameForm.checkName)">查询</el-button>
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
                                <span class="rt" style="color:#3c78d4;cursor:pointer;" @click="clearPeople">全部清除</span>
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
                <el-button class="checkDefault" @click="peopleVisible1 = false;checkNameForm.checkName = '';dataOa = [];node.childNodes = [];">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>

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
                      <el-col :span="18"><div class="grid-content4 bg-purple-light3"><el-input type="textarea" class="myInput" maxlength="200" v-model="checkFilters.auditRemark"></el-input></div></el-col>
                    </el-row>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="chooseDone0" >提交</el-button>
                <el-button class="checkDefault" @click="peopleVisible0 = false">关闭</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './powerCheck.service';
    import moment from 'moment';
    import base from '@/scrollLoad';
    import treeChange from '../../../utils/treeChange';
    import { Loading } from 'element-ui';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        qufen: number;
        timer: boolean;
        shoudao:boolean;
        fondCode: String;
        fName:string;
        dataDetail : any = [];
        dataCheck: any = [];
        archiveTreeReletions: any = [];
        listLoading: boolean;
        peopleVisible1:boolean;
        peopleVisible2:boolean;
        treeLoading: boolean;
        stepType: boolean;
        zhuanfa:boolean;
        jiaqian:boolean;
        comLoading: boolean;
        showFondCode:boolean;
        peopleVisible0: boolean;
        suoshufenqu: boolean;
        passOrNotPass:boolean;
        myI:boolean;
        archivistType:boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        i: number;
        id: number;
        treeParamsId: number;
        marginSize: number;
        sign: number;
        fanhui:boolean;
        defaultTrees: any = {};
        oaClickRowName: any = {};
        allData: any = {};
        dataCompany: any = [];
        leafName: any = [];
        searchOptions: any = [];
        checkNameForm: any = {};
        archivistId: string;
        type: string;
        processId: string
        parameOne: string;
        parameTwo: string;
        forward:string;
        filters: any = {};
        basicForm: any = {};
        pickerOptions: any = {};
        checkFilters: any = {};
        dateOptions: any = {};
        allParams:any = {};
        list: any = [];
        list1: any = [];
        data: any = [];
        dataOa: any = [];
        tableHeadArrs: any = [];
        dataName: any = [];
        tree: any = [];
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        detailData:any = {};
        roleSelect: any = [];
        stepMap: any = [];
        node: any = {};
        resolve: any = {};
        userId: string;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.stepType = false;
            this.peopleVisible0 = false;
            this.fondCode = '';
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.i = 0;
            this.id = 0;
            this.listLoading = false;
            this.peopleVisible1 = false;
            this.peopleVisible2 = false;
            this.myI = false;
            this.shoudao = false;
            this.zhuanfa = false;
            this.jiaqian = false;
            this.treeLoading = false;
            this.comLoading = false;
            this.showFondCode = false;
            this.suoshufenqu = true;
            this.passOrNotPass = false;
            this.archivistType = false;
            this.marginSize = 0;
            this.sign = 0;
            this.fanhui = false;
            this.dataDetail = [];
            this.dataCheck = [];
            this.fName = '';
            this.parameOne = '',
            this.parameTwo = '',
            this.archiveTreeReletions = [];
            this.archivistId = '';
            this.type = '';
            this.processId = '';
            this.userId = '';
            this.forward = '';
            this.checkNameForm = {

            };
            this.oaClickRowName = {
                uName:'',
                uid:'',
                zhiwu:'',
                bumen:''
            };
            this.tableHeadArrs = [];
            this.defaultTrees = {
                children: 'children',
                label: 'shortName',
                id:'orgID'
            };
            this.searchOptions = [
                { label:'同意',value:'1'},
                { label:'不同意',value:'2'},
                { label:'收到',value:'3'}
            ];
            this.checkFilters = {
                title:'',
                others:'',
                jiaqianren:'',
                zhuanfaName:'',
                jiaqianrenID:''
                zhuanfaNameID:'',
                jiaqianrenBumen:'';
                jiaqianrenZhiwu:'',
                zhuanfaNameBumen:'',
                zhuanfaNameZhiwu:'',
            }
        }

        back():void{
            this['$router'].go(-1);
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

        // 查询档案列表
        getHeader():void{
            Service.borrowFileHead({}).then((res) =>{
                if(res.data.succeeded){
                    this.tableHeadArrs = res.data.data;
                    this.borrowFileTable();
                }else{
                    this['$message']({
                        message: '加载表格列配置失败！',
                        type: 'error'
                    });
                }
            })
        };
        // 查询档案列表
        borrowFileTable(){
            let params = {

            };
            Service.borrowFileTable(params).then((res) =>{
                if(res.data.succeeded){
                    this.dataDetail = res.data.data;
                }else{
                    this['$message']({
                        message: '加载档案列表失败！',
                        type: 'error'
                    });
                }
            })
        }

        getLoginUser(){

        }

        // 批准
        applySubmit(a){
            let b;
            b = this.checkFilters.jiaqianrenID;
            if(this.checkFilters.title == '' || this.checkFilters.title == null){
                this['$message']({
                    message: '请选择审批意见',
                    type: 'warning'
                });
                return;
            }
            //加签不能加自己
            Service.getUserUrl().then((res) =>{
                this.userId = res.data.data.LogonUserId;
                if(b == this.userId){
                    this['$message']({
                        message: '加签人不能选择当前登录人，请选择其他人。',
                        type: 'warning'
                    });
                }else{
                    //let mid;
                    //let additionalSignature;
                    //if(this.type != '0'){
                    //    mid = this.processId;
                    //}else{
                    //    for(let child of this.allData.processList){
                    //        if(child.auditStep == this.detailData.step){
                    //            mid = child.id;
                    //            additionalSignature = child.additionalSignature;
                    //        }
                    //    }
                   // }
                    let sign1;
                    if(b == ''){
                        sign1 = 0;
                    }else{
                        sign1 = b;
                    }
                    let aid;
                    if(this.sign != 0){
                        aid = this.parameOne;
                    }else{
                        aid = this.archivistId;
                    }
                    let params = {
                        archivistId:aid,
                        processId:this.id,
                        auditResult:a,
                        addAuditPeopleId:sign1,
                        addCopyPeopleId:0,
                        auditRemark:this.checkFilters.others,
                    };
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在提交中，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.audit(params).then((res) =>{
                        this.$nextTick(() => {
                            loadingInstance.close();
                        });
                        if(res.data.data == null){
                            this['$message']({
                                message: '该待办已被办理！',
                                type: 'error'
                            });
                        }else{
                            if(res.data.succeeded){
                                this['$message']({
                                    message: '成功！',
                                    type: 'success'
                                });
                                this.oaClickRowName.uName = '';
                                this.oaClickRowName.uid = '';
                                if(this.sign == 0){
                                    this['$router'].push({
                                        path:'/selfTip/examination',
                                    });
                                }else{
                                    window.close();
                                }

                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        }
                    });
                }
            })
        };

        fenqu(num){
            if(num == 1){
                return "北区";
            }else if(num == 2){
                return "中区";
            }else if(num == 3){
                return "南区";
            }
        }
        isOrNoCompany(bool){
            if(bool == true){
                return "是";
            }else if(bool == false){
                return "否";
            }
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
            this.getContacts();
        }

        //转发选人弹出框
        xuanren(obj){
            this.i+=1;
            this.qufen = obj;
            this.peopleVisible1 = true;
            if(this.i != 1){
                this.loadNode(this.node,this.resolve);
            }
            //回显
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
            this.getContacts();
        }

        // 转发人确定
        chooseDone0(){
            let aid;
            if(this.sign == 0){
                aid = this.archivistId;
            }else{
                aid = this.parameOne;
            }
            let archivistId = aid;
            let addCopyPeopleId = this.checkFilters.zhuanfaNameID;
            let auditRemark = this.checkFilters.auditRemark;
            let additionalSignature;
            let forward;
            //let processId;
            //for(let child of this.allData.processList){
            //    if(child.auditStep == this.detailData.step){
            //        additionalSignature = child.additionalSignature;
            //        forward = child.forward;
            //        processId = child.id;
            //    }
           // }
            let parame = {
                            archivistId:archivistId,
                            auditRemark:auditRemark,
                            addCopyPeopleId:addCopyPeopleId,
                            //addAuditPeopleId:0,
                            //additionalSignature:additionalSignature,
                            //forward:forward,
                            processId:this.id
                        };
            if(addCopyPeopleId != '' && addCopyPeopleId != null && auditRemark != '' && auditRemark != null){
                let loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在提交中，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                 //转发不能转自己
                Service.getUserUrl().then((res) =>{
                    if(addCopyPeopleId == res.data.data.LogonUserId){
                        this.$nextTick(() => {
                            loadingInstance.close();
                        });
                        this['$message']({
                            message: '转发人不能选择当前登录人，请选择其他人。',
                            type: 'warning'
                        });
                    }else{
                        Service.forward(parame).then((res) =>{
                            this.$nextTick(() => {
                                loadingInstance.close();
                            });
                            if(res.data.data == null){
                                this['$message']({
                                    message: '该待办已被办理！',
                                    type: 'error'
                                });
                            }else{
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
                            }
                        });
                        this.oaClickRowName.uName = '';
                        this.oaClickRowName.uid = '';
                        this.checkFilters.zhuanfaName = '';
                        this.checkFilters.auditRemark = '';
                        this.peopleVisible0 = false;
                    }
                }

            }else{
                if(addCopyPeopleId == '' || addCopyPeopleId == null){
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

        // 懒加载树
        loadNode(node,resolve) {
            if(node.level === 0){
                this.treeLoading = true;
                this.node = node;
                this.resolve = resolve;
                Service.seniorWdorg(1).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        console.log(data);
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
            this.node.childNodes = [];
            this.checkNameForm.checkName = '';
            this.dataOa = [];
            this.saveContacts(this.oaClickRowName.uid);
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

        changeYiJian(data){
            if(data === '1'){
                this.checkFilters.others = "同意";
            }else if(data === '2'){
                this.checkFilters.others = "不同意";
            }else if(data === '3'){
                this.checkFilters.others = "收到";
            }
        }

        // 转发
        applyTransfer(){
            this.peopleVisible0 = true;
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
            //this.dataOa.push(row);
        }

        yiru(){
           if(this.checkFilters.jiaqianren != ''){
                this.myI = true;
           }
        }
        yichu(){
            this.myI = false;
        }

        qingchu(){
            this.oaClickRowName.uid = '';
            this.oaClickRowName.uName = '';
            this.checkFilters.jiaqianren = '';
            this.checkFilters.jiaqianrenID = '';
            this.checkFilters.jiaqianrenZhiwu = '';
            this.checkFilters.jiaqianrenBumen = '';
        }

        handleClose(){
            this.peopleVisible1  =false;
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
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

        saveContacts(ids){
            Service.saveContacts(ids).then((res) =>{

            });
        }

        created(){
            this.archivistId =  JSON.parse(window.sessionStorage.getItem('archivistId'));
            this.processId =  JSON.parse(window.sessionStorage.getItem('processId'));
            //从路径拿参数
            let url = window.location.href;
            url = unescape(url);
            console.log(url);
            if(url.indexOf("archivistId") > 0){
                this.sign = 1;
                if(url.split('?')[2]){
                    let bb = (url.split('?')[2]).split("&")[0];
                    let pb = bb.substr(bb.indexOf("=")+1);
                    let b = base['base64'].decode(
                       JSON.stringify(pb)
                    );
                    let cc = (url.split('?')[2]).split("&")[1];
                    let pc = cc.substr(cc.indexOf("=")+1);
                    let c = base['base64'].decode(
                        JSON.stringify(pc)
                    );
                    this.parameOne = b;//参数1
                    this.parameTwo = c;//参数2
                }
                this.marginSize = -50;
            }else{
                this.sign = 0;
                this.fanhui = true;
            }
        };

        mounted(){
            //this.getHeader();
            //this.borrowCheckTable();
            //获取审批数据详情
            let archivistId;
            let parame;
            if(this.sign == 0){
                archivistId = this.archivistId.toString();
                parame = {id:archivistId};
            }else{
                parame = {id:this.parameOne};
            }
            Service.getRecordById(parame).then((res) =>{
                if(res.data.succeeded){
                    this.allData = res.data.data;
                    this.detailData = res.data.data.archivist;
                    this.stepMap = res.data.data.processList;
                    this.dataCheck = res.data.data.allProcessList;
                    if(res.data.data.archiveTreeReletions.length != 0){
                        this.archiveTreeReletions = res.data.data.archiveTreeReletions;
                        let a = '';
                        for(let child of this.archiveTreeReletions){
                            a+=(","+child.archiveTreeName);
                        }
                        a = a.substr(1,a.length);
                        this.fName = this.archiveTreeReletions[0].foundName + "【"+a+"】";
                    }

                    if(this.detailData.type == 0){
                        this.archivistType = true;
                    }

                    let p;
                    if(this.sign == 0){
                        p = this.processId.toString();
                    }else{
                        p = this.parameTwo;
                    }
                    Service.getProcess({processId:p}).then((res) =>{
                        this.type = res.data.data.type;
                        this.forward = res.data.data.forward;
                        if(this.forward == '1'){//有转发
                            this.zhuanfa = true;
                        }
                        //控制批准和驳回按钮的显示和隐藏
                        if(this.type == '0'){
                            this.passOrNotPass = true;
                            if(res.data.data.additionalSignature == '1'){
                                this.jiaqian = true;
                            }
                        }else if(this.type != '0'){//有收到
                            this.shoudao = true;
                        }
                        this.id = res.data.data.id;
                    })

                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });



            //常用联系人
            Service.getContacts({}).then((res) =>{
                this.dataName = res.data.data;
            });
        };
    }
</script>

<style lang="scss" scoped>
     @import '../../../styles/transferDetail/transferDetail';
</style>