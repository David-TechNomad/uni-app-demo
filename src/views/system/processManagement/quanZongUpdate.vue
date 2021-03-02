<template>
    <section>
        <div class="mainTitle">
            <span>流程实例修改</span>
            <el-button class="checkWay rt" @click="applySubmit">保存</el-button>
            <el-button class="checkWay rt" @click="back">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">申请单号：{{detailData.processNo}}</div>
                <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm" :rules="basicFormRules" ref="basicForm">
                    <div class="formItem topTitle">
                        <el-form-item label="标题：" ref="title" prop="title" label-width="120px" >
                            <el-input class="checkName percentName" v-model="basicForm.title" readonly maxlength="50" placeholder="最多填写50个字"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="申请人：" ref="name" class="lt" prop="name" label-width="120px" >
                            <el-input class="checkName percentName" readonly v-model="basicForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="申请人部门：" ref="company" class="lt basicItem" prop="company" label-width="120px">
                            <el-input class="checkName percentName" readonly v-model="basicForm.company"></el-input>
                        </el-form-item>
                        <el-form-item label="申请时间：" ref="createDate" class="lt basicItem" prop="createDate" label-width="120px">
                            <el-input class="checkName percentName" readonly v-model="basicForm.createDate"></el-input>
                        </el-form-item>
                    </div>
                    <div class="evenTitle">
                        <el-form-item class="things" label="创建事由：" ref="cause"  prop="cause" label-width="120px">
                            <el-input type="textarea" maxlength="1000" placeholder="最多填写1000个字" class="checkName percentName" v-model="basicForm.cause"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    全宗信息
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                <el-row class="" style="">
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">全宗号</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" ><span class="span2">{{detailData.fondCode}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">全宗名</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" ><span class="span2">{{detailData.fondName}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">上级公司</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{detailData.parentFondsName}}</span></div></el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">万信对应公司</span></div></el-col>
                      <el-col :span="21"><div class="grid-content bg-purple-light" style="border-right:1px solid lightgrey;"><span class="span2">{{detailData.orgName}}</span></div></el-col>
                  </el-row>
                  <el-row style="border-top:0">
                  <el-col :span="3"><div class="grid-content bg-purple" style="border-top:1px solid lightgrey"><span class="span1">是否项目公司</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;"><span class="span2">{{detailData.isProjectCompany?"是":"否"}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple" v-show='isShowArea'><span class="span1">所属分区</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" v-show='isShowArea' ><span class="span2">{{detailData.regionName}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">全宗类型</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;"><span class="span2">{{fondTypeFun(detailData.fondType)}}</span></div></el-col>
                </el-row>
                <el-row style="border-top:0">
                     <div :class="isShowArea?'':'lightEvenStyle'">
                      <div v-for="(item,index) in roleSelect" class="scopesStyle">
                          <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">{{item.roleName}}</span></div></el-col>
                          <el-col :span="5"><div class="grid-content bg-purple-light scopeLight"><span class="span2">{{item.userName}}</span></div></el-col>
                      </div>
                  </div>
                </el-row>
                <el-row>
                  <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-bottom:1px solid #ccc"><span class="span1">备注</span></div></el-col>
                  <el-col :span="21"><div class="grid-content1 bg-purple-light" style="line-height:30px;padding-left:10px;overflow-y:auto;border-bottom:1px solid #ccc;border-right:1px solid #ccc">{{detailData.comments}}</div></el-col>
                </el-row>
                </ul>
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
                                        {{item.stepName}}【{{item.userName}}<span v-if="item.stepType==0 || item.stepType==5 || item.stepType==8"><i class="fa fa-check" style="color:green;font-size:15px;"></i> </span><span v-if="item.stepType==1"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>】<span v-if="index != stepMap.length-1"><img style="width:20px;height:20px;vertical-align: top;" src="../../../imgs/arrow.png"></span>
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
                        <el-table-column prop="stepName" label="审批节点">
                        </el-table-column>
                        <el-table-column prop="ApprovalContext" label="签字意见" width="350px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.ApprovalContext"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createPersion" label="审批人">
                        </el-table-column>
                        <el-table-column prop="auditDate" :formatter="dateFormat1" label="审批时间" width="200">
                        </el-table-column>
                        <el-table-column prop="auditResult" label="操作" width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.auditResult === 1">驳回</span>
                                <span v-if="scope.row.auditResult === 3">加签</span>
                                <span v-if="scope.row.auditResult === 2">转发</span>
                                <span v-if="scope.row.auditResult === 4">抄送</span>
                                <span v-if="scope.row.auditResult === 0">审批通过</span>
                                <span v-if="scope.row.auditResult === 5">提交审批</span>
                                <span v-if="scope.row.auditResult === 6">批注</span>
                                <span v-if="scope.row.auditResult === 7">关闭</span>
                                <span v-if="scope.row.auditResult === 8">重新提交</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="stepUserName" label="接收人" width="120">
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
                        <el-table-column prop="stepName" label="节点名称">
                        </el-table-column>
                        <el-table-column prop="userName" label="操作人">
                        </el-table-column>
                        <el-table-column prop="type" label="审批状态">
                            <template slot-scope="scope">
                               <span v-if="scope.row.dealtType == 0">未审批</span>
                               <span v-else>已审批</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120px">
                            <template slot-scope="scope">
                                <span class="addBtn" v-show="scope.row.dealtType == 0" @click="lendModalOut(scope.row)">修改审批人</span>
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
        basicForm: any = {};
        basicForm1: any = {};
        roleSelect: any = [];
        stepData: any = [];
        isShowArea: boolean;
        constructor(){
            super();
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.detailData = {};
            this.row = {};
            this.isShowArea = false;
            this.recordData = [];
            this.data = [];
            this.tableHeadArrs = [];
            this.stepMap = [];
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
            this.stepData = [];
            this.treeLoading = false;
            this.comLoading = false;
            this.treeParamsId = 0;
            this.i = 0;
            this.hangData = {};
            this.tableHangData = {};
            this.yijianInput = false;
            this.basicForm = {
                title:'',
                userName:'',
                company:'',
                createDate:'',
                cause:''
            };
            this.basicForm1 = {};
            this.roleSelect = [];
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
            this.hangData.userName = row.fullName;
            for(let child of this.stepData){
                if(this.hangData.stepId == child.stepId){
                    child.userName = row.fullName;
                    child.userId = row.userID;
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
                if(this.hangData.stepId == child.stepId){
                    child.userName = this.tableHangData.fullName;
                    child.userId = this.tableHangData.userID;
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
            let flag = false;
            let fondsStepInfoList = [];
            for(let child of this.stepMap){
                if(!child.userId){
                    flag = true;
                }
                if(child.dealtType == 0){
                    let obj = {
                        id:child.stepId,
                        user:{
                            userId:child.userId
                        }
                    };
                    fondsStepInfoList.push(obj);
                }
            };
            let fondStepInfoProcessRecordList = [];
            for(let child of this.recordData){
                let obj = {
                    id:child.stepId,
                    auditRemark:child.ApprovalContext
                };
                fondStepInfoProcessRecordList.push(obj);
            }
            if(flag){
                this['$message']({
                    message: "审批人有空，请重新选择！",
                    type: 'warning'
                });
                return;
            }
            let parames = {
                id:this.row.id,
                cause:this.basicForm.cause,
                fondsStepInfoList:fondsStepInfoList,
                fondStepInfoProcessRecordList:fondStepInfoProcessRecordList
            };
            Service.updateFondWorkFlow(parames).then((res) =>{
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

        getFondsApprovalInfo(){
            let parames = {id:this.row.id};
            Service.getFondsApprovalInfo(parames).then((res) =>{
                this.detailData = res.data.data;
                this.basicForm.title = res.data.data.title;
                this.basicForm.userName = res.data.data.createPerson;
                this.basicForm.company = res.data.data.createOrgName;
                this.basicForm.createDate = moment(res.data.data.createDate).format("YYYY-MM-DD");
                this.basicForm.cause = res.data.data.cause;
                this.roleSelect = res.data.data.fondsApprovalRoleUserList;
                if(this.detailData.isProjectCompany == true){
                    this.isShowArea = true
                }else{
                    this.isShowArea = false;
                }
                this.recordData = res.data.data.Approval;
                this.stepMap = this.detailData.stepMap;
                for(let child of this.detailData.stepMap){
                    let obj = {
                        dealtType:child.dealtType,
                        stepName:child.stepName,
                        stepType:child.stepType,
                        userName:child.userName,
                        stepId:child.stepId,
                        userId:child.userId
                    };
                    this.stepData.push(obj);
                }
            })
        }

        submitForm(roleFrom){
            this.stepMap = [];
            for(let child of this.stepData){
                let obj = {
                    dealtType:child.dealtType,
                    stepName:child.stepName,
                    stepType:child.stepType,
                    userName:child.userName,
                    stepId:child.stepId,
                    userId:child.userId
                };
                this.stepMap.push(obj);
            }
            this.fileVisible = false;
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

        //全宗类型
        fondTypeFun(i){
            if(i == 1){
                return "集团";
            }else if(i == 2){
                return "地方";
            }
        }

        created(){
            this.row = JSON.parse(window.sessionStorage.getItem('zQuanZongData'));
        }
        mounted(){
            this.getFondsApprovalInfo();
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/processManagement/processManagementUpdate';
</style>