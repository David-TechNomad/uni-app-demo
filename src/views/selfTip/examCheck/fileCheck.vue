<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            <span v-show="!tranferType">档案移交申请</span>
            <span v-show="tranferType">档案跨全宗移交申请</span>
            <el-button v-show="fanhui" class="checkWay rt" @click="back">返回</el-button>
            <el-button class="checkWay rt" @click="dayin">打印</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号：{{detailData.transferLookup.applicationNo}}<span style="color:red">审批到线下移交归档节点时，需将实体档案进行线下移交</span>
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{detailData.transferLookup.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-bottom:1px solid #ccc"><span class="span1">申请人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;border-bottom:1px solid #ccc"><span class="span2">{{detailData.transferLookup.applyPerson}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-right:0;border-bottom:1px solid #ccc;"><span class="span1">申请人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;border-bottom:1px solid #ccc;"><span class="span2">{{detailData.transferLookup.applyDept}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-right:0;border-bottom:1px solid #ccc;"><span class="span1">申请时间</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:1px solid #ccc;border-bottom:1px solid #ccc;"><span class="span2">{{dateFormat1(detailData.transferLookup.applyDate)}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <div v-show="tranferType">
                            <el-col :span="3"><div class="grid-content bg-purple" style="border-top:0"><span class="span1">接收单位</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;border-top:0"><span class="span2">{{detailData.transferLookup.acceptOrg}}</span></div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple" style="border-top:0"><span class="span1">接收部门</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;border-top:0"><span class="span2">{{detailData.transferLookup.acceptDept}}</span></div></el-col>
                        </div>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-top:0"><span class="span1">移交数量</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-top:0"><span class="span2">{{detailData.transferLookup.transferCount}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">移交说明</span></div></el-col>
                        <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto;">{{detailData.transferLookup.transferMemo}}</div></el-col>
                    </el-row>
                </ul>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        要移动的目录
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table tooltip-effect="dark" style="width: 100%" stripe max-height="300" :data="dataDetail" :row-class-name="getRowClass1" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <template v-for="file in tableHeadArrs">
                                <el-table-column :width="file.width" :prop="file.fieldName" :label="file.caption">
                                </el-table-column>
                            </template>
                            <el-table-column v-if="tableHeadArrs.length>0" label="操作" width="120">
                                <template slot-scope="scope">
                                    <span class="addBtn" @click="electricBorrowDetail(scope.row)">详情</span>
                                </template>
                            </el-table-column>
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
                                <span class="span1">
                                    <span v-for="(item,index) in stepMap">
                                        {{item.stepName}}【{{item.userName}}<span v-if="item.stepType==1"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span><span v-if="item.stepType==2"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>】<span v-if="index != stepMap.length-1"><img style="width:20px;height:20px;vertical-align: top;" src="../../../imgs/arrow.png"></span>
                                    </span>
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="mainCon basicList" v-if="shenpiyijian">
                <div class="loanTipTitle">
                    审批意见
                    <div class="titleSect"></div>
                </div>
                <div class="basicList" style="padding:10px 0 15px">
                    <el-row>
                        <el-col :span="7"  v-show="addSign">
                            <el-form :model="checkFilters" class="topParamsForm superLeftForm">
                                <el-form-item class="" label="加签人：" label-width="90px">
                                    <div  @mouseover="yiru" @mouseout="yichu"><el-input class="checkName percentName" readonly="readonly" v-model="checkFilters.jiaqianren" placeholder=""></el-input>
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
                            <el-form :model="checkFilters"  :rules="formRule" class="topParamsForm superLeftForm " ref="checkFilters">
                                <el-form-item class="" label="意见说明：" ref="others" prop="others" label-width="90px">
                                    <el-input class="" type="textarea" maxlength="1000" v-model="checkFilters.others" placeholder="最多输入1000字"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit(1,'checkFilters')" v-show="IsApproval">批准</el-button>
                <el-button class="checkWay" @click="applySubmit(2,'checkFilters')" v-show="IsApproval">驳回</el-button>
                <el-button class="checkWay" @click="applySubmit(1,'checkFilters')" v-show="IsGetFiles">确认线下移交</el-button>
                <el-button class="checkWay" @click="applySubmit(2,'checkFilters')" v-show="IsGetFiles">驳回</el-button>
                <el-button class="checkWay" @click="forwardFile('checkFilters')" v-show="shoudao">收到</el-button>
                <el-button class="checkWay" @click="applyTransfer()" v-show="IsForward">转发</el-button>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批记录
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table tooltip-effect="dark" style="width: 100%" stripe :data="dataCheck" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column prop="" label="序号">
                                <template slot-scope="scope">
                                    {{dataCheck.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="stepName" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="ApprovalContext" label="审批意见">
                            </el-table-column>
                            <el-table-column prop="stepUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate" :formatter="dateFormat" label="审批时间" width="200">
                            </el-table-column>
                            <el-table-column prop="auditOperate" label="操作">
                            </el-table-column>
                            <el-table-column prop="nextAduitPerson" label="接收人">
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
                      <el-col :span="18"><div class="grid-content3 bg-purple-light3"><span class="span5">{{detailData.transferLookup.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6"><div class="grid-content3 bg-purple3"><span class="span4"><span style="color:red;">*</span>转发人员：</span></div></el-col>
                      <el-col :span="18"><div class="grid-content3 bg-purple-light3"><el-input v-model="checkFilters.zhuanfaName" readonly></el-input><el-button class="checkSearch choosePerson thisInp1" @click="xuanren(0)"><i class="fa fa-search"></i></el-button></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6"><div class="grid-content4 bg-purple3"><span class="span6"><span style="color:red;">*</span>转发意见：</span></div></el-col>
                      <el-col :span="18"><div class="grid-content4 bg-purple-light3"><el-input type="textarea" class="myInput" v-model="checkFilters.auditRemark"></el-input></div></el-col>
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
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="115px" ref="cell">
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-show="false"></el-input>
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

        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
          <div class="scrollCon formDiv">
              <div class="tableCon">
                <span style="margin-left:35%">是否打印卷内文件</span>
              </div>
          </div>
          <div slot="footer" class="dialog-footer diaFoot">
            <el-button class="checkDefault" @click="dayinNo">否</el-button>
            <el-button class="checkWay" type="primary" @click="dayinYes">是</el-button>
          </div>
        </el-dialog>

    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './fileCheck.service';
    import moment from 'moment';
    import base from '@/scrollLoad';
    import treeChange from '../../../utils/treeChange';
    import { Loading } from 'element-ui';
    @Component
    export default class appFileCheck extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        transferStatus:number;
        timer: boolean;
        dataDetail : any = [];
        dataCheck: any = [];
        formRule: any = {};
        listLoading: boolean;
        peopleVisible0: boolean;
        peopleVisible1:boolean;
        treeLoading: boolean;
        comLoading: boolean;
        IsApproval: boolean;
        IsForward:boolean;
        addSign:boolean;
        shoudao:boolean;
        shenpiyijian:boolean;
        tranferType:boolean;
        IsGetFiles:boolean;
        fanhui:boolean;
        myI:boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        treeParamsId: number;
        qufen: number;
        processId:number;
        marginSize:number;
        parameOne:number;
        parameTow:number;
        parameThree:number;
        i:number;
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
        oaClickRowName: any = {};
        node: any = {};
        resolve: any = {};
        allParams:any = {};
        list: any = [];
        list1: any = [];
        stepMap: any = [];
        data: any = [];
        dataOa: any = [];
        tableHeadArrs: any = [];
        defaultTrees: any = [];
        dataName: any = [];
        tree: any = [];
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        rank: number;
        dialogVisible:boolean;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.processId = 0;
            this.marginSize = 0;
            this.parameOne = 0;
            this.parameTow = 0;
            this.parameThree = 0;
            this.i = 0;
            this.listLoading = false;
            this.peopleVisible0 = false;
            this.peopleVisible1 = false;
            this.treeLoading = false;
            this.comLoading = false;
            this.tranferType = false;
            this.myI = false;
            this.IsApproval = true;
            this.IsForward = true;
            this.addSign = true;
            this.shenpiyijian = true;
            this.shoudao = false;
            this.IsGetFiles = true;
            this.fanhui = false;
            this.defaultTrees = {
                children: 'children',
                label: 'shortName',
                id:'orgID'
            };
            this.dataDetail = [];
            this.dataCheck = [];
            this.row = {};
            this.tableHeadArrs = [];
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
                zhuanfaNameId:'',
                jiaqianrenId:'',
                jiaqianrenBumen:'';
                jiaqianrenZhiwu:'',
                zhuanfaNameBumen:'',
                zhuanfaNameZhiwu:'',
            }
            this.oaClickRowName = {
                uName:'',
                uid:'',
                zhiwu:'',
                bumen:''
            };
            this.rank = 0;
            this.dialogVisible = false;
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

        // 详情
        electricBorrowDetail(row){
            //案卷
            if(this.rank == 3){
                let obj={
                    libId:this.detailData.libId,
                    fondId:this.detailData.fondId,
                    kindId:this.detailData.kindId,
                    SrcId:row.id,
                    type:this.detailData.transferLookup.tranferType
                };
                window.sessionStorage.setItem('Tofiledetail',JSON.stringify(obj));
                 this['$router'].push({
                     path:'/selfTip/fileDetail',
                 })
            }else if(this.rank == 4){//文件
                let obj={
                    Srclib:this.detailData.libId,
                    SrcId:row.id,
                    type:this.detailData.transferLookup.tranferType
                };
                window.sessionStorage.setItem('Tofiledetail',JSON.stringify(obj));
                window.sessionStorage.setItem('ToWjDetail',JSON.stringify(obj));
                this['$router'].push({
                     path:'/selfTip/WjDetail',
                 })
            }


        }

        // 批准
        applySubmit(a,checkFilters){
            let params = {};
            let id;
            let tid
            if(this.processId == 0){
                id = this.row.id;
                tid = this.row.transferProcessId;
            }else{
                id = this.parameOne;
                tid = this.parameThree;
            }
            if(this.checkFilters.jiaqianren != '' && this.checkFilters.jiaqianren != null){
                params = {
                    transferId:id,
                    auditResult:a,
                    auditRemark:this.checkFilters.others,
                    addUserId:this.checkFilters.jiaqianrenId,
                    addUserName:this.checkFilters.jiaqianren,
                    transferProcessId:tid,
                }
            }else{
                params = {
                    transferId:id,
                    auditResult:a,
                    auditRemark:this.checkFilters.others,
                    transferProcessId:tid,
                };
            }

            if(this.checkFilters.title == '' || this.checkFilters.title == null){
                this['$message']({
                    message: '请选择审批意见',
                    type: 'warning'
                });
                return;
            }

            this['$refs'][checkFilters]['validate']((valid)=>{
                if (valid) {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在提交中，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.approvalFileTransfer(params).then((res) =>{

                        this.$nextTick(() => {
                            loadingInstance.close();
                        });

                        if(res.data.succeeded){
                            this['$message']({
                                message: '审批成功！',
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

        // 转发
        applyTransfer(){
            this.peopleVisible0 = true;
        };

        //转发选人弹出框
        xuanren(obj){
            this.i+=1;
            this.qufen = obj;
            this.peopleVisible1 = true;
            if(this.i != 1){
                this.loadNode(this.node,this.resolve);
            }
            let obj = {
                        userID:this.checkFilters.zhuanfaNameId,
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
            let id;
            let tid;
            if(this.processId == 0){
                id = this.row.id;
                tid = this.row.transferProcessId;
            }else{
                id = this.parameOne;
                tid = this.parameThree;
            }
            let transferId = id;
            let forwardUserId = this.checkFilters.zhuanfaNameId;
            let forwardRemark = this.checkFilters.auditRemark;
            let forwardUserName = this.checkFilters.zhuanfaName;
            let transferProcessId = tid;
            let parame = {transferId:transferId,forwardUserId:forwardUserId,forwardUserName:forwardUserName,forwardRemark:forwardRemark,transferProcessId:transferProcessId};
            if(forwardUserId != '' && forwardUserId != null && forwardRemark != '' && forwardRemark != null){

                let loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在提交中，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );

                Service.forwardFileTransfer(parame).then((res) =>{

                    this.$nextTick(() => {
                        loadingInstance.close();
                    });

                    if(res.data.succeeded){
                        this['$message']({
                            message: '转发成功！',
                            type: 'success'
                        });
                        this.peopleVisible0 = false;
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
            }else{
                if(forwardUserId == '' || forwardUserId == null){
                    this['$message']({
                        message: '转发人不能为空！',
                        type: 'warning'
                    });
                }else if(forwardRemark == '' || forwardRemark == null){
                    this['$message']({
                        message: '转发意见不能为空！',
                        type: 'warning'
                    });
                }
            }

        };

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
                        userID:this.checkFilters.jiaqianrenId,
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
                this.checkFilters.jiaqianrenId = this.oaClickRowName.uid;
                this.checkFilters.jiaqianrenBumen = this.oaClickRowName.bumen;
                this.checkFilters.jiaqianrenZhiwu = this.oaClickRowName.zhiwu;
            }else if(this.qufen === 0){
                this.checkFilters.zhuanfaName = this.oaClickRowName.uName;
                this.checkFilters.zhuanfaNameId = this.oaClickRowName.uid;
                this.checkFilters.zhuanfaNameBumen = this.oaClickRowName.bumen;
                this.checkFilters.zhuanfaNameZhiwu = this.oaClickRowName.zhiwu;
            }
            this.peopleVisible1 = false;
            this.saveContacts(this.oaClickRowName.uid);
            this.oaClickRowName.uName = '';
            this.oaClickRowName.uid = '';
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
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

        //收到
        forwardFile(checkFilters){
            this['$refs'][checkFilters]['validate']((valid)=>{
                if (valid) {
                    let params;
                    if(this.processId == 0){
                        params = {transferId:this.row.id,auditResult:1,auditRemark:this.checkFilters.others,transferProcessId:this.row.transferProcessId};
                    }else{
                        params = {transferId:this.parameOne,auditResult:1,auditRemark:this.checkFilters.others,transferProcessId:this.parameThree};
                    }
                    Service.doForwardFileTransfer(params).then((res) =>{
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
                }
            });
        }

        changeYiJian(data){
            if(data === '1'){
                this.checkFilters.others = "同意";
            }else if(data === '2'){
                this.checkFilters.others = "不同意";
            }else if(data === '3'){
                this.checkFilters.others = "收到";
            }
        }



        //02_档案移交审批详情
        queryFileTransferTaskDetail(){
            let params;
            if(this.processId == 0){
                params = {transferId:this.row.id,transferStatus:this.transferStatus,transferProcessId:this.row.transferProcessId}
            }else{
                params = {transferId:this.parameOne,transferStatus:this.parameTow,transferProcessId:this.parameThree}
            }
            Service.queryFileTransferTaskDetail(params).then((res) =>{
                if(res.data.succeeded){
                    this.detailData = res.data.data;
                    this.tableHeadArrs = res.data.data.listColumns;
                    this.dataDetail = res.data.data.archives;
                    this.stepMap = res.data.data.stepMap;
                    this.dataCheck = res.data.data.Approval;
                    this.IsApproval = res.data.data.IsApproval;
                    this.IsForward = res.data.data.IsForward;
                    this.addSign = res.data.data.addSign;
                    this.shoudao = res.data.data.IsCopy;
                    this.IsGetFiles = res.data.data.IsGetFiles;
                    this.rank = res.data.data.rank;
                    let sn = this.detailData.transferLookup.tranferType;
                    //this.auditResult = this.detailData.this.detailData;
                    let flag = false;
                    for(let child in this.detailData){
                        if(child == 'auditResult' && this.detailData.auditResult != null){
                            flag = true;
                        }
                    }
                    if(this.transferStatus == 2){
                        this.shenpiyijian = false;
                    }else if(this.transferStatus == 1 && flag){
                        this.shenpiyijian = false;
                    }
                    if(sn === '1'){
                        this.tranferType = false;
                    }else if(sn === '2'){
                        this.tranferType = true;
                    }
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            })
        }

        saveContacts(ids){
            Service.saveContacts(ids).then((res) =>{

            });
        }

        //双击
        dblNameRow(row){
            if(this.qufen === 3){
                this.checkFilters.jiaqianren = row.fullName;
                this.checkFilters.jiaqianrenId = row.userID;
                this.checkFilters.jiaqianrenBumen = row.unitname;
                this.checkFilters.jiaqianrenZhiwu = row.jobname;
            }else if(this.qufen === 0){
                this.checkFilters.zhuanfaName = row.fullName;
                this.checkFilters.zhuanfaNameId = row.userID;
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

        //常用联系人
        getContacts(){
            Service.getContacts({}).then((res) =>{
                this.dataName = res.data.data;
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

        qingchu(){
            this.oaClickRowName.uid = '';
            this.oaClickRowName.uName = '';
            this.checkFilters.jiaqianren = '';
            this.checkFilters.jiaqianrenId = '';
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

        dayin(){     //rank=3 案卷  rank=4 文件  this.detailData.transferLookup.tranferType=1 文件移交  this.detailData.transferLookup.tranferType=2  跨全宗移交
            if(this.detailData.rank == 3){
                this.dialogVisible = true;
            }else{
                this.print(this.detailData.transferLookup.tranferType);
            }
        }

        dayinYes(){
            if(this.detailData.transferLookup.tranferType == '1'){//文件移交
                this.print(11);
            }else{//跨全宗移交
                this.print(22);
            }
            this.dialogVisible = false;
        }

        dayinNo(){
            this.print(this.detailData.transferLookup.tranferType);
            this.dialogVisible = false;
        }

        print(type){
            let id;
            if(this.processId == 0){
                id = this.row.id;
            }else{
                id = this.parameOne;
            }
            let parames = {
                            id:id,
                            type:type
                        };

            Service.printProcess(parames).then((res) =>{
                if (res) {
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        let csvData = new Blob([res],{type: 'application/pdf'});
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
        }

        handleClose(){
             this.peopleVisible1  =false;
             this.node.childNodes = [];
             this.dataOa = [];
             this.checkNameForm.checkName = '';
         }

         getRowClass1(row: any = {}):string {
             let obj = JSON.parse(window.sessionStorage.getItem('Tofiledetail'))
             if(obj && (obj.SrcId == row.row.id) ){
                return 'row-yijiao';
                window.sessionStorage.removeItem('Tofiledetail');
             }
         }

        created(){
            this.row =  JSON.parse(window.sessionStorage.getItem('fileCheckData'));
            let a = window.sessionStorage.getItem('transferStatus');
            let url = window.location.href;
            url = unescape(url);
            console.log(url);
            if(url.indexOf("transferId") > 0){
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
                    let dd = (url.split('?')[2]).split("&")[2];
                    let pd = dd.substr(dd.indexOf("=")+1);
                    let d = base['base64'].decode(
                        JSON.stringify(pd)
                    );
                    this.parameOne = parseInt(b);//参数1
                    this.parameTow = parseInt(c);//参数2
                    this.parameThree = parseInt(d);//参数3
                }
                this.marginSize = -50;
                this.transferStatus = this.parameTow;
            }else{
                this.processId = 0;
                this.fanhui = true;
                this.transferStatus = parseInt(a);
            }
        };

        mounted(){
            this.queryFileTransferTaskDetail();

        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/transferDetail/transferDetail';
</style>                    