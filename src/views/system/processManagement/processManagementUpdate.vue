<template>
    <section>
        <div class="mainTitle">
            <span>流程实例修改</span>
            <el-button class="checkWay rt" @click="applySubmit">保存</el-button>
            <el-button class="checkWay rt" @click="back">返回</el-button>
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
                        <el-col :span="21">
                            <div class="grid-content bg-purple-light">
                                <span class="span2">{{detailData.title}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.userName}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.userDept}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请时间</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{dateFormat(detailData.createDate)}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{dateFormat(detailData.appStartDate)}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划归还日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{dateFormat(detailData.appEndDate)}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅天数</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{detailData.days}} 天</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">变更后借阅人</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto;">{{detailData.updateUserFullName }}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">原流程</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto;"><span class="superTarget" @click="findBorrowDetails">{{detailData.oldTitle}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">变更事由</span></div></el-col>
                        <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto;">
                            <el-input class="checkName percentName" type="textarea" maxlength="1000" placeholder="最多输入1000字" style="margin:-8px" v-model="detailData.desc"></el-input>
                        </div></el-col>
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
                        <el-table tooltip-effect="dark" style="width: 100%" stripe max-height="300" :data="data" highlight-current-row class="indexTable containTable">
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
                    <el-button class="checkWay rt" @click="xiugaiLiucheng" style="margin-top:5px;">修改流程</el-button>
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
            <div class="mainCon basicList">
            <div class="clear">
                <div class="loanTipTitle">
                    审批记录
                    <div class="titleSect"></div>
                </div>
                <div class="borderTable waitTable">
                    <el-table tooltip-effect="dark" style="width: 100%" stripe :data="recordData" highlight-current-row class="indexTable containTable">
                        <el-table-column label="序号" width="70px">
                            <template slot-scope="scope">
                                {{recordData.length-scope.$index}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="taskNodeName" label="审批节点">
                        </el-table-column>
                        <el-table-column prop="auditRemark" label="签字意见" width="350px" v-if="false">
                            <template slot-scope="scope">
                                <el-input v-show="flagObj['check'+scope.row.id]" v-model="scope.row.auditRemark"></el-input>
                                <span v-show="!flagObj['check'+scope.row.id]">{{scope.row.auditRemark}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="auditRemark" label="签字意见" width="350px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.auditRemark"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="false">
                            <template slot-scope="scope">
                                 <span class="addBtn" @click="bianji(scope.row)" v-show="!flagObj['check'+scope.row.id]">编辑</span>
                                 <span class="addBtn" @click="baocun(scope.row)" v-show="flagObj['check'+scope.row.id]">保存</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="auditUserName" label="审批人">
                        </el-table-column>
                        <el-table-column prop="auditDate" :formatter="dateFormat1" label="审批时间" width="200">
                        </el-table-column>
                        <el-table-column prop="type" label="操作" width="120">
                        </el-table-column>
                        <el-table-column prop="nextNodeUserName" label="接收人" width="120">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        </div>

        <el-dialog class="fixModal" title="修改流程节点" :visible.sync="fileVisible" :close-on-click-modal="true" :model="ruleForm">
            <div class="scrollCon formDiv">
                <div class="tableCon">
                    <el-table tooltip-effect="dark" style="width: 100%" stripe :height="bodyHeight-100" :data="stepData" highlight-current-row class="indexTable containTable">
                        <el-table-column label="审批环节">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="taskNodeName" label="节点名称">
                        </el-table-column>
                        <el-table-column prop="auditUserName" label="操作人">
                        </el-table-column>
                        <el-table-column prop="type" label="审批状态">
                            <template slot-scope="scope">
                               <span v-if="scope.row.step == 0"></span>
                               <span v-else-if="scope.row.auditResult != null">已审批</span>
                               <span v-else>未审批</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120px">
                            <template slot-scope="scope">
                                <span v-if="scope.row.step == 0"></span>
                                <span v-else-if="scope.row.auditResult != null"></span>
                                <span class="addBtn" v-else @click="lendModalOut(scope.row)">修改审批人</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button type="primary" class="checkWay" @click="submitForm('ruleForm')">确定</el-button>
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
    import treeChange from '../../../utils/treeChange';
    import { Loading } from 'element-ui';
    @Component
    export default class processManagementUpdate extends Vue{
        bodyHeight: number;
        detailData:any = {};
        recordData; any = [];
        data: any = [];
        tableHeadArrs: any = [];
        stepMap: any = [];
        stepData: any = [];
        row: any = {};
        fileVisible: boolean;
        peopleVisible: boolean;
        checkNameForm: any = {};
        node: any = {};
        resolve: any = {};
        defaultTrees: any = {};
        dataOa: any = [];
        dataName: any = [];
        treeLoading: boolean;
        tree: any = [];
        comLoading: boolean;
        treeParamsId: number;
        oaHeight: number;
        i: number;
        hangData: any = {};
        tableHangData: any = {};
        yijianInput: boolean;
        flagObj: any = {};
        constructor(){
            super();
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.detailData = {};
            this.row = {};
            this.recordData = [];
            this.data = [];
            this.tableHeadArrs = [];
            this.stepMap = [];
            this.stepData = [];
            this.fileVisible = false;
            this.peopleVisible = false;
            this.checkNameForm = {
                checkName:''
            };
            this.defaultTrees = {
                children: 'children',
                label: 'shortName',
                id:'orgID'
            };
            this.dataOa = [];
            this.dataName = [];
            this.treeLoading = false;
            this.comLoading = false;
            this.treeParamsId = 0;
            this.i = 0;
            this.hangData = {};
            this.tableHangData = {};
            this.yijianInput = false;
            this.flagObj = {};
        }

        //时间格式化
        dateFormat(date) {
            if(date){
                return moment(date).format("YYYY-MM-DD");
            }else{
                return '';
            }
        }

        //常用联系人
        getContacts(){
            Service.getContacts({}).then((res) =>{
                this.dataName = res.data.data;
            });
        }

        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
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

        // 点击左侧OA表格行（单选）
        oaClickRow1(row){
            this.tableHangData = row;
        };

        // 点击子节点
        handleNodeClick(data){
            this.oaPerson(data.orgID);
        };

        //双击
        dblNameRow(row){
            this.hangData.auditUserName = row.fullName;
            for(let child of this.stepData){
                if(this.hangData.id == child.id){
                    child.auditUserName = row.fullName;
                    child.auditUserId = row.userID;
                }
            }
            this.saveContacts(row.userID);
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
            this.peopleVisible = false;
        }

        saveContacts(ids){
            Service.saveContacts(ids).then((res) =>{

            });
        }

       //审批人弹框确定
        chooseDone(){
            for(let child of this.stepData){
                if(this.hangData.id == child.id){
                    child.auditUserName = this.tableHangData.fullName;
                    child.auditUserId = this.tableHangData.userID;
                    this.saveContacts(this.tableHangData.userID);
                }
            }
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
            this.peopleVisible = false;
        }

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

        //修改流程
        xiugaiLiucheng(){
            this.fileVisible = true;
        }

        //修改提交
        applySubmit(){
            let flag = false
            let updateBorrowProcessList = [];
            for(let child of this.stepMap){
                if(!(child.step == 0 && child.auditResult != null)){
                    if(!child.auditUserId){
                        flag = true;
                    }
                    let obj = {
                        id:child.id,
                        auditUser:{
                            userId:child.auditUserId
                        }
                    };
                    updateBorrowProcessList.push(obj);
                }
            };
            if(flag){
                this['$message']({
                    message: "审批人有空，请重新选择！",
                    type: 'warning'
                });
                return;
            }
            let updateBorrowProcessRecordList = [];
            for(let child of this.recordData){
                let obj = {
                    id:child.id,
                    auditRemark:child.auditRemark
                };
                updateBorrowProcessRecordList.push(obj);
            }
            let parames = {
                id:this.row.id,
                title:this.detailData.title,
                description:this.detailData.desc,
                updateBorrowProcessList:updateBorrowProcessList,
                updateBorrowProcessRecordList:updateBorrowProcessRecordList
            };
            Service.updateProcess(parames).then((res) =>{
                if(res.data.succeeded){
                    this['$message']({
                        message: "修改成功！",
                        type: 'success'
                    });
                    this['$router'].push({
                    path:'/system/processManagement',
                });
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            })
        }

        getInfo(){
            let parames = {borrowId:this.row.id,processId:null};
            Service.getInfo(parames).then((res) =>{
                this.detailData = res.data.data;
                this.recordData = res.data.data.approvalRecordList;
                this.stepMap = this.detailData.approvalFlowList;
                for(let child of this.stepMap){
                    let obj = {
                        auditUserId:child.auditUserId,
                        auditUserName:child.auditUserName,
                        additionalSignature:child.additionalSignature,
                        auditResult:child.auditResult,
                        forward:child.forward,
                        id:child.id,
                        isApprovalNode:child.isApprovalNode,
                        step:child.step,
                        taskNodeName:child.taskNodeName
                    };
                    this.stepData.push(obj);
                }
                this.getHeader();
            })
        }

        // 查询档案列表
        getHeader():void{
            Service.borrowFileHead({}).then((res) =>{
                if(res.data.succeeded){
                    this.tableHeadArrs = res.data.data;
                    this.data = this.detailData.archiveList;
                }else{
                    this['$message']({
                        message: '加载表格列配置失败！',
                        type: 'error'
                    });
                }
            })
        };

        submitForm(roleFrom){
            this.fileVisible = false;
            this.stepMap = [];
            for(let child of this.stepData){
                let obj = {
                    auditUserId:child.auditUserId,
                    auditUserName:child.auditUserName,
                    additionalSignature:child.additionalSignature,
                    auditResult:child.auditResult,
                    forward:child.forward,
                    id:child.id,
                    isApprovalNode:child.isApprovalNode,
                    step:child.step,
                    taskNodeName:child.taskNodeName
                };
                this.stepMap.push(obj);
            }
            console.log(this.stepMap)
        }

        back(){
            this['$router'].go(-1);
        }

        //修改审批人
        lendModalOut(row){
            this.i+=1;
            this.peopleVisible = true;
            if(this.i != 1){
                this.loadNode(this.node,this.resolve);
            }
            this.hangData = row;
            this.getContacts();
        }

        handleClose(){
            this.peopleVisible = false;
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }

        bianji(obj){
            this.$set(this.flagObj,'check'+obj.id,true);
        }
        baocun(obj){
            this.$set(this.flagObj,'check'+obj.id,false);
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

        renderheader(h, { column, $index }) {
             return h('span', {}, [
                h('span', {}, column.label.split('/')[0]),
                h('br'),
                h('span', {}, column.label.split('/')[1])
             ])
        }

        findBorrowDetails(){
            window.sessionStorage.setItem('applicationNo',this.detailData.applicationNo);
            window.sessionStorage.setItem('rectState', 'right');
            window.sessionStorage.setItem('z_check', 3);
            this['$router'].push({
                path:'/selfTip/borrowDetails/borrowDetails',
                name:'实体借阅单详情',
            });
        };

        electricBorrowDetail(row){
            if(this.detailData.auditStatus===1||this.detailData.auditStatus===4){
                Service.waterMarkTime({ appNo:this.detailData.applicationNo,borrowId:this.detailData.id}).then(res=>{
                    if(res.data.succeeded){
                        if(!res.data.data){
                            let obj = {appNo:this.detailData.applicationNo,archiveId:row.id,libId:row.libId,MJ:'1',borrowId:this.detailData.id}
                            window.sessionStorage.setItem('XiangDetail',JSON.stringify(obj));
                            this['$router'].push({
                                path:'/@/views/fileArrange/fileManagement/infile/XiangDetail',
                            })
                        }else{
                            let obj = {appNo:this.detailData.applicationNo,archiveId:row.id,libId:row.libId,MJ:row.MJ}
                            window.sessionStorage.setItem('searchToDetail',JSON.stringify(obj));
                            this['$router'].push({
                                path:'/retrieve/searchDetail/searchDetail',
                            })
                        }
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }else{
                let obj = {appNo:this.detailData.applicationNo,archiveId:row.id,libId:row.libId,MJ:row.MJ}
                window.sessionStorage.setItem('searchToDetail',JSON.stringify(obj));
                this['$router'].push({
                    path:'/retrieve/searchDetail/searchDetail',
                })
            }
        }

        created(){
            this.row = JSON.parse(window.sessionStorage.getItem('zChangePeopleData'));
        }
        mounted(){
            this.getInfo();
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/processManagement/processManagementUpdate';
</style>