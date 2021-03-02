<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            <span>创建全宗申请</span>
            <el-button v-show="fanhui && !guanbi" class="checkWay rt" @click="back">返回</el-button>
            <el-button v-show="fanhui && guanbi" class="checkWay rt" @click="back">关闭</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号：{{quanData.processNo}}
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                     <el-row style="border:1px solid #ccc;">
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题</span></div></el-col>
                  <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{quanData.title}}</span></div></el-col>
                </el-row>
                <el-row style="border:1px solid #ccc;border-top:0">
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{quanData.createPerson}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{quanData.createOrgName}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请时间</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{quanData.createDate}}</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0;border-bottom:1px solid #ccc"><span class="span1">创建事由</span></div></el-col>
                  <el-col :span="21"><div class="grid-content1 bg-purple-light" style="line-height:30px;padding-left:10px;overflow-y:auto;border-bottom:1px solid #ccc;border-right:1px solid #ccc">{{quanData.cause}}</div></el-col>
                </el-row>
                </ul>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    全宗信息
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                <el-row class="" style="border:1px solid #ccc">
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">全宗号</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" ><span class="span2">{{quanData.fondCode}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">全宗名</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" ><span class="span2">{{quanData.fondName}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">上级公司</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{quanData.parentFondsName}}</span></div></el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">万信对应公司</span></div></el-col>
                      <el-col :span="21"><div class="grid-content bg-purple-light" style="border-right:1px solid lightgrey;border-bottom:1px solid lightgrey"><span class="span2">{{quanData.orgName}}</span></div></el-col>
                  </el-row>
                  <el-row style="border:1px solid #ccc;border-top:0">
                  <el-col :span="3"><div class="grid-content bg-purple" style="border-top:1px solid lightgrey"><span class="span1">是否项目公司</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;"><span class="span2">{{quanData.isProjectCompany?"是":"否"}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple" v-show='isShowArea'><span class="span1">所属分区</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" v-show='isShowArea' ><span class="span2">{{quanData.regionName}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">全宗类型</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;"><span class="span2">{{fondTypeFun(quanData.fondType)}}</span></div></el-col>
                  <!-- <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">行政部档案员：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">公司总经理：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">集团总部-办公室</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">删除审批人：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">2018-10-25</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">行政总经理：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">集团总部-办公室</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">分管行政总裁：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">2018-10-25</span></div></el-col> -->
                </el-row>
                <el-row style="border:1px solid #ccc;border-top:0">
                     <div :class="isShowArea?'':'lightEvenStyle'">
                      <div v-for="(item,index) in fondsApprovalRoleUserList" class="scopesStyle">
                          <el-col :span="3"><div class="grid-content bg-purple" style="border-bottom:1px solid #ccc" :style="{'border-bottom':index==fondsApprovalRoleUserList.length-1? 'none':'1px solid #ccc'}"><span class="span1">{{item.roleName}}</span></div></el-col>
                          <el-col :span="5"><div class="grid-content bg-purple-light scopeLight"  :style="{'border-bottom':index==fondsApprovalRoleUserList.length-1? 'none':'1px solid #ccc'}"><span class="span2">{{item.userName}}</span></div></el-col>
                          <!-- <el-col :span="isShowArea? 21:5"><div class="grid-content bg-purple-light scopeLight"><span class="span2">{{item.userName}}</span></div></el-col> -->
                            <!-- <span v-if="scope.row.auditResult === 0">审批通过</span> -->
                      </div>
                  </div>
                </el-row>
                <el-row>
                  <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-bottom:1px solid #ccc"><span class="span1">备注</span></div></el-col>
                  <el-col :span="21"><div class="grid-content1 bg-purple-light" style="line-height:30px;padding-left:10px;overflow-y:auto;border-bottom:1px solid #ccc;border-right:1px solid #ccc">{{quanData.comments}}</div></el-col>
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
                             <span class="span1" style="font-size:2px">
                                <span v-for="(item,index) in quanData.stepMap" style="line-height:35px;font-size:14px">
                                     {{item.stepName}}【{{item.userName}} 
                                     <span v-if="item.stepType == 1"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>
                                     <span v-if="item.stepType == 0"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span>
                                     <span v-if="item.stepType == 5"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span>
                                     <span v-if="item.stepType == 8"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span>
                                     】<span v-if ="index != quanData.stepMap.length-1" ><img style="width:20px;height:20px;vertical-align: top;" src="../../../imgs/arrow.png"></span>
                                </span>
                             </span>
                          </div>
                      </el-col>
                    </el-row>
                </div>
            </div>
            <el-button @click="applyTransfer" type="primary" class="checkWay" style="margin-left:45%" v-show="isShowZhuanFa">转发</el-button>
               <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批记录
                        <div class="titleSect"></div>
                    </div>
                       <div class="borderTable waitTable">
                    <!-- <el-table tooltip-effect="dark" style="width: 100%" stripe :height="bodyHeight-100" :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                        <el-table-column width="55" fixed>
                        </el-table-column>
                        <el-table-column  :label="item.title" :prop="item.prop" v-for='item in listData'>
                        </el-table-column>
                    </el-table> -->
                     <el-table  border tooltip-effect="dark" style="width: 100%" stripe :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                             <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{dataDetail.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="stepName" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="ApprovalContext" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="createPersion" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate"  label="审批时间" width="200">
                            </el-table-column>
                            <el-table-column prop="auditResult" label="操作" width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.auditResult === 0">审批通过</span>
                                    <span v-if="scope.row.auditResult === 1">驳回</span>
                                    <span v-if="scope.row.auditResult === 2">转发</span>
                                    <span v-if="scope.row.auditResult === 3">加签</span>
                                    <span v-if="scope.row.auditResult === 4">抄送</span>
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
                      <el-col :span="18"><div class="grid-content3 bg-purple-light3"><span class="span5">
                      {{quanData.title}}
                          </span></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6"><div class="grid-content3 bg-purple3"><span class="span4"><span style="color:red;">*</span>转发人员：</span></div></el-col>
                      <el-col :span="18"><div class="grid-content3 bg-purple-light3"><el-input v-model="checkFilters.zhuanfaName" readOnly></el-input><el-button class="checkSearch choosePerson thisInp1" @click="xuanren()"><i class="fa fa-search"></i></el-button></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6"><div class="grid-content4 bg-purple3"><span class="span6"><span style="color:red;">*</span>转发意见：</span></div></el-col>
                      <el-col :span="18"><div class="grid-content4 bg-purple-light3"><el-input type="textarea" class="myInput" v-model="checkFilters.auditRemark" placeholder="最多填写1000个字"  maxlength="1000"></el-input></div></el-col>
                    </el-row>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="chooseDone0" >提交</el-button>
                <el-button class="checkDefault" @click="peopleVisible0 = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 转发的 审批人 -->
         <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible1" :close-on-click-modal="true">
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
                                <span class="rt" style="color:#3c78d4;cursor:pointer;">全部清除</span>
                            </div>
                            <div class="topCheckTree" style="padding:0">
                                <el-table  border @row-dblclick="dblNameRow"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table border tooltip-effect="dark" @row-click="oaClickRow1" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
                <el-button class="checkDefault" @click="peopleVisible1 = false;loadNode(node1,resolve1);node1.childNodes = [];dataOa = [];checkNameForm.checkName=''">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './transforDetail.server';
    import treeChange from '../../../utils/treeChange';
    import moment from 'moment';
    import base from '@/scrollLoad';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        treeData : any = [];
        oaHeight: number;
        nameHeight: number;
        timer: boolean;
        dataDetail : any = []
        listLoading: boolean;
        treeLoading : boolean;
        peopleVisible0 : boolean;
        peopleVisible1:boolean;
        fanhui:boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        treeParamsId: number;
        processId:number;
        marginSize:number;
        parameOne:number;
        parameTow:string;
        dataCompany: any = [];
        isShowZhuanFa : boolean;
        isShowArea : boolean;
        guanbi : boolean;
        leafName: any = [];
        checkNameForm: any = {};
        checkFilters: any = {};
        filters: any = {};
        basicForm: any = {};
        pickerOptions: any = {};
        dateOptions: any = {};
        allParams:any = {};
        fondsApprovalRoleUserList : any = []
        list: any = [];
        list1: any = [];
        data: any = [];
        dataOa: any = [];
        tableHeadArrs: any = [];
        defaultTrees: any = {};
        dataName: any = [];
        tree: any = [];
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        listData : any = [];
        quanData: any = {};
        row :any = {};
        oaClickRowName: any = {};
        comLoading :boolean;
        node1:any = {};
        resolve1:any = {};
        obj:any = {};
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.treeLoading = false;
            this.isShowZhuanFa = false;
            this.isShowArea = false;
            this.fanhui = false;
            this.guanbi = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.row = {};
            this.limit = 25;
            this.treeParamsId = 0;
            this.processId = 0;
            this.marginSize = 0;
            this.parameOne = 0;
            this.parameTow = '';
            this.listLoading = false;
            this.peopleVisible1 = false;
            this.peopleVisible0 = false;
            this.comLoading = false;
            this.checkFilters = {
                zhuanfaName:'',
                auditRemark:''
            }
            this.dataDetail = []
            this.defaultProps={
                children: 'children',
                label: 'shortName',
                id:'orgID'
            }
              this.listData = [
             {
                    title:'审批节点',
                    prop:'stepName'
                },
                {
                    title:'签字意见',
                    prop:'ApprovalContext'
                },
                 {
                    title:'审批人',
                    prop:'stepUserName'
                }, {
                    title:'审批时间',
                    prop:'auditDate'
                },
                 {
                    title:'操作',
                    prop:'auditResult'
                },
                 {
                    title:'接收人',
                    prop:'createPersion'
                },
        ]
        this.oaClickRowName = {
                uName:'',
                uid:'',
            };
        this.defaultTrees = {
                children: 'children',
                id:'orgID',
                label: 'shortName'
            };
        this.node1 = {};
        this.resolve1 = {};
        this.obj = {};
        }
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
          
        // 转发
        applyTransfer(){
            this.peopleVisible0 = true;
            this.userPeople();
        };
        //转发选人弹出框
        xuanren(){
            this.peopleVisible1 = true;
            this.node1.childNodes = [];
            this.loadNode(this.node1,this.resolve1)
        }
        // 点击左侧OA表格行（单选）
        oaClickRow1(row){
            // this.oaClickRowName.uName = row.fullName;
            // this.oaClickRowName.uid = row.userID;
            this.obj = row;//回显
            this.oaClickRowName.uName = row.fullName;
            this.oaClickRowName.uid = row.userID;
            this.oaClickRowName.bumen = row.unitname;
            this.oaClickRowName.zhiwu = row.jobname;
        };
        dblNameRow(row){
            console.log(row)
            console.log(this.dataOa)
           if(this.dataOa.length>0){
                let arr = [];
                for(let data of this.dataOa){
                    if(data.userID === row.userID){
                        arr.push(row.userID);
                    }
                }
                if(arr.length===0){
                    this.dataOa.push({
                        fullName:row.fullName,
                        userID:row.userID,
                        unitname:row.unitname,
                        jobname:row.jobname,
                    });
                }
            }else{
                this.dataOa.push({
                    fullName:row.fullName,
                    userID:row.userID,
                    unitname:row.unitname,
                    jobname:row.jobname,
                });
            
        }
            this.peopleVisible1 = false;
            this.node1.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
            this.oaClickRowName.uName = row.fullName;
            this.oaClickRowName.uid = row.userID;
            this.checkFilters.zhuanfaName = this.oaClickRowName.uName;
               //回显
            let obj = {
                        userID:this.oaClickRowName.uid,
                        fullName:this.oaClickRowName.uName,
                        unitname:row.unitname,
                        jobname:row.jobname
                    };
            let attr = [];
            attr.push(obj);
            if(obj.fullName == ''){
                this.dataOa = [];
            }else{
                this.dataOa = attr;
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
                        message: '检索失败。',
                        type: 'error'
                    });
                    this.comLoading = false;
                }
            });
        };
        //转发人的确定
        chooseDone0(){
            // let transferId = this.row.id;
            // let forwardUserId = this.oaClickRowName.uid;
            // let forwardRemark = this.checkFilters.auditRemark;
            // let forwardUserName = this.oaClickRowName.uName;
            // let transferProcessId = this.row.transferProcessId;
            // let parame = {transferId:transferId,forwardUserId:forwardUserId,forwardUserName:forwardUserName,forwardRemark:forwardRemark,transferProcessId:transferProcessId};
            // Service.quandoCopyApproval({
            //     "id":this.quanData.stepId,
            //     "userId":this.oaClickRowName.uid,
            //     "auditRemark":this.checkFilters.auditRemark
            // }).then((res) =>{
            //     if(res.data.succeeded){
            //         this['$message']({
            //             message: '转发成功。',
            //             type: 'success'
            //         });
            //     }else{
            //          this.peopleVisible0 = true;
            //         this['$message']({
            //             message: '请完善信息。',
            //             type: 'error'
            //         });
            //     }
            // });
            // this.peopleVisible0 = false;
            let userId = this.oaClickRowName.uid.toString();
            let auditRemark = this.checkFilters.auditRemark;
            let parame = {id:this.quanData.stepId,userId:this.oaClickRowName.uid,auditRemark:this.checkFilters.auditRemark};
            if(userId != '' && userId != null && auditRemark != '' && auditRemark != null){
                Service.quandoCopyApproval({
                     "id":this.quanData.stepId,
                    "userId":this.oaClickRowName.uid,
                    "auditRemark":this.checkFilters.auditRemark
                }).then((res) =>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '转发成功。',
                            type: 'success'
                        });
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
                this.oaClickRowName.uName = '';
                this.oaClickRowName.uid = '';
                this.peopleVisible0 = false;
            }else{
                if(userId == '' || userId == null){
                    this['$message']({
                        message: '转发人不能为空。',
                        type: 'warning'
                    });
                }else if(auditRemark == '' || auditRemark == null){
                    this['$message']({
                        message: '转发意见不能为空。',
                        type: 'warning'
                    });
                }
            }
        }
        // 审批人确定（单选）
        chooseDone1(){
            this.checkFilters.zhuanfaName = this.oaClickRowName.uName;
            this.peopleVisible1 = false;
        }
          // 常用联系人
        userPeople(){
            Service.findOaPerson({}).then((res) =>{
                if(res.data.succeeded){
                    this.dataName = res.data.data;
                }else{
                    this['$message']({
                        message: '常用联系人加载失败。',
                        type: 'error'
                    });
                }
            });
        }
        // 懒加载树
        loadNode(node,resolve) {
                 if(node.level === 0){
                this.treeLoading = true;
                Service.findOaData(1).then((res) =>{
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
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                    }
                });
            }else{
                this.treeParamsId = node.data.orgID;
                Service.findOaData(this.treeParamsId).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.hasChildren = !leaf;
                        };
                        data.forEach(item => {
                            treeData.push(item)
                        });
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
                        message: '组织架构列表加载失败。',
                        type: 'error'
                    });
                    this.comLoading = false;
                }
            });
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);
            // this.getFiles();
        };
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);
            // this.getFiles();
        };
        back():void{
            // this['$router'].go(-1);
            if(this['$route'].params.routerType == "r1"){
                this['$router'].push({
                        path:'/selfTip/examination',
                })
            }else if (this['$route'].params.routerType == "r2"){
                this['$router'].push({
                        path:'/system/casesManagement',
                })
            }else{
                this['$router'].push({
                        path:'/selfTip/transfer',
                })
            }
        };
        created(){

            if(this['$route'].params.routerType == "r2"){
                this.guanbi = true;
            }else{
                this.guanbi = false;
            }

            this.row =  JSON.parse(window.sessionStorage.getItem('fileCheckData'));

            let url = window.location.href;
            url = unescape(url);
            console.log(url);
            if(url.indexOf("nodeId") > 0){
                this.processId = 1;
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

                    this.parameOne = parseInt(b);//参数1
                    this.parameTow = c;//参数2
                }
                this.marginSize = -50;
            }else{
                this.processId = 0;
                this.fanhui = true;
            }
        };

        //全宗类型
        fondTypeFun(i){
            if(i == 1){
                return "集团";
            }else if(i == 2){
                return "地方";
            }
        }

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                    this.oaHeight = (document.documentElement.clientHeight-100)/2-50;
                })()
            };

            let parame;
            if(this.processId == 0){
                let id = JSON.parse(window.sessionStorage.getItem('QDchangQuanTransDetail'));
                let stepId = this['$route'].params.stepId;
                parame = {id:id,stepId:stepId};
            }else{
                parame = {id:this.parameOne,stepId:this.parameTow};
            }
            //var qId = this['$route'].params.id;
            Service.getFondsApprovalInfo(parame).then(res=>{
                console.log(res.data.data)
                this.quanData = res.data.data;
                if(this.quanData.isProjectCompany == true){
                    this.isShowArea = true
                }else{
                    this.isShowArea = false;
                }
                this.fondsApprovalRoleUserList = res.data.data.fondsApprovalRoleUserList;
                console.log(this.fondsApprovalRoleUserList)
                this.dataDetail = res.data.data.Approval;
                this.quanData.createDate = moment(this.quanData.createDate).format("YYYY-MM-DD")
                for(let item in res.data.data){
                    console.log(item)
                    if(item == "forward" && res.data.data[item] == true){
                        this.isShowZhuanFa = true;
                    }
            }
            })

        };
    }
</script>

<style lang="scss" scoped>
     @import '../../../styles/transferDetail/transferDetails';
</style>