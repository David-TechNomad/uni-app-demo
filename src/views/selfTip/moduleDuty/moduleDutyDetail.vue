<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            <el-tooltip :content="content" placement="top">
                <span class="redLight" v-show="showLight"></span>
            </el-tooltip>
            <span>项目公司权属档案录入任务</span>
            <el-button class="checkWay rt" @click="back" v-show="fanhui">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    此任务是通过模块化管理系统各项权属档案办理节点推送的任务数据，经办人需于2日内完成数据填报，请从档案管理系统中行政部“权属档案-案卷库”内选择相关档案数据完成提交即可。
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">项目名称</span></div></el-col>
                        <el-col :span="13">
                            <div class="grid-content bg-purple-light" style="border-right:none;">
                                <span class="span2">{{detailData.projectName}}</span>
                            </div>
                        </el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">文件数量</span></div></el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple-light">
                                <span class="span2">{{detailData.count}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">负责人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.userName}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">负责人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.unitName}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">截止日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{dateFormat(detailData.planDate)}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">文件描述</span></div></el-col>
                        <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto;">{{detailData.fileContent}}</div></el-col>
                    </el-row>
                </ul>
            </div>
            <div class="stepDiv">
                    <el-steps  :active="active" finish-status="success" process-status="finish">
                      <el-step title="选择全宗"></el-step>
                      <el-step title="勾选档案"></el-step>
                      <el-step title="提交完成"></el-step>
                    </el-steps>
            </div>
            <div class="stepDiv" v-show="xianShi1">
                     请选择全宗：<el-button class="checkWay" @click="chooseFond">选择全宗</el-button>
            </div>
            <div class="mainCon basicList" v-show="xianShi2">
                    <div class="loanTipTitle">
                        已上传档案 <input type="text" id="dangAn" placeholder="单行输入" style="height:30px;margin-right:3px;border-radius:5px;border:1px solid grey"><el-button class="checkWay" @click="submitForm(1)">检索</el-button>
                        如无所需数据，请到行政部“权属档案-案卷库”录入项目相关权属档案
                        <span class="rt">全宗：{{obj.fondName}}</span>
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table
                            :data="data"
                            style="width:100%"
                            :stripe="true"
                            height="300"
                            v-loading="isloading"
                            class="containTable indexTable lineTable"
                            @selection-change="selectionChange"
                            @row-dblclick="RowDblclick"
                            border
                            @sort-change="headerclick"
                            >
                         <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                               <el-button class="checkBtn" @click="xuanZe(scope.row)">选择</el-button>
                            </template>
                         </el-table-column>
                        <template  v-for="item in tableHeader">
                            <el-table-column :width="item.width" :prop="item.dictData===null?item.fieldName:item.fieldName+'_Text'" :label="item.caption"  v-if="!item.hidden&&item.fieldName!='BZ'&&item.fieldName!='BZ1'" :key="item.fieldName"  :sortable="sortable"></el-table-column>
                            <el-table-column v-if="!item.hidden&&item.fieldName=='BZ'&&!headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName"  :sortable="sortable"></el-table-column>
                            <el-table-column v-if="!item.hidden&&item.fieldName=='BZ1'&&headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                        </template>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                               <el-button class="checkBtn" @click="xuanZe(scope.row)">选择</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    </div>
                    <div class="pager" style="margin-bottom:40px;margin-top:-10px;margin-right:10px">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" :current-page.sync="currentPage" v-if="total!=0" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
                        </el-pagination>
                    </div>
            </div>

            <div class="mainCon basicList" v-show="xianShi3">
                <div class="clear">
                    <div class="loanTipTitle">
                        已选择的文件 <span class="rt">应选择文档数：{{detailData.count}}已选择文档数：<span style="color:red" v-show="!countShow">{{recordData.length}}</span><span v-show="countShow">{{recordData.length}}</span></span>
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table tooltip-effect="dark" style="width: 100%" stripe @row-dblclick="RowDblclick" :data="recordData" border highlight-current-row class="containTable indexTable lineTable">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                   {{scope.$index+1}}
                                </template>
                            </el-table-column>
                            <template  v-for="item in tableHeader">
                                <el-table-column :width="item.width" :prop="item.dictData===null?item.fieldName:item.fieldName+'_Text'" :label="item.caption"  v-if="!item.hidden&&item.fieldName!='BZ'&&item.fieldName!='BZ1'" :key="item.fieldName"  :sortable="sortable"></el-table-column>
                                <el-table-column v-if="!item.hidden&&item.fieldName=='BZ'&&!headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName"  :sortable="sortable"></el-table-column>
                                <el-table-column v-if="!item.hidden&&item.fieldName=='BZ1'&&headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                            </template>
                            <el-table-column label="操作" width="160" v-if="showDel">
                                <template slot-scope="scope">
                                   <el-button class="checkBtn" @click="shanChu(scope.row,scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="applyDone" v-show="xianShi">
                <el-button class="checkWay" @click="prev()">上一步</el-button>
                <el-button class="checkWay" @click="next" v-show="!xianShi4">下一步</el-button>
                <el-button class="checkWay" @click="applyDuty" v-show="xianShi4">提交任务</el-button>
            </div>
        </div>


        <el-dialog class="fixModal" title="选择全宗" :visible.sync="fileVisible" :close-on-click-modal="true">
            <div class="scrollCon formDiv">
                <div class="tableCon">
                    <div class="treeTitle thisTitle"  style="text-align:center">
                        <el-form :inline="true" :model="FondForm" class="topParamsForm superLeftForm">
                            <el-form-item class="title" label="" ref="name">
                                <el-select class="checkName" v-model="FondForm.id" filterable remote reserve-keyword placeholder="请输入关键字搜索" :remote-method="remoteMethod" :loading="searchLoading">
                                    <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="fa fa-search thisBig" @click="fondSearch"></i>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-tree node-key="id"
                             v-loading="leftTreeLoading"
                             :data="leftData"
                             ref="treeku"
                             :default-expanded-keys="defaultLeftOpen"
                             :props="defaultProps"
                             @node-click="handleNodeClick1"
                             :render-content="renderContent1">
                    </el-tree>
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
    import Service from './moduleDutyDetail.service';
    import moment from 'moment';
    import base from '@/scrollLoad';
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
        detail:number;
        xianShi:boolean;
        xianShi1:boolean;
        xianShi2:boolean;
        xianShi3:boolean;
        xianShi4:boolean;
        FondForm:any = {};
        leftData: any = [];
        defaultProps: any = {};
        searchOptions: any = [];//远程搜索条目
        leftTreeLoading:boolean;
        defaultLeftOpen:any = [];
        tableHeader:any=[];
        kindId:string;
        libId:string;
        archiveLibId:string;
        obj:any = {};
        filters:any = {};
        limit: number;
        total: number;
        z_Module:any = {};
        active:number;
        showLight:boolean;
        content:string;
        countShow:boolean;
        marginSize:number;
        z_node:number;
        fanhui:boolean;
        id:number;
        showDel:boolean;
        currentPage:number;
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
            this.detail = 0;
            this.xianShi = false;
            this.xianShi1 = true;
            this.xianShi2 = false;
            this.xianShi3 = false;
            this.xianShi4 = false;
            this.FondForm = {
                id:'',
            };
            this.leftData = [];
            this.defaultProps = {
                children: 'children',
                label: 'fondName',
                id:'id'
            };
            this.searchOptions = [];
            this.leftTreeLoading = false;
            this.defaultLeftOpen = [];
            this.tableHeader = [];
            this.kindId = '';
            this.libId = '';
            this.archiveLibId = '';
            this.obj = {fondName:'',id:0};
            this.filters = {
                page:1,
                pageSize:10
            };
            this.limit = 10;
            this.total = 0;
            this.z_Module = {};
            this.active = 0;
            this.showLight = false;
            this.content = '';
            this.countShow = false;
            this.marginSize = 0;
            this.z_node = 0;
            this.fanhui = false;
            this.id = 0;
            this.showDel = true;
            this.currentPage = 1;
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

        submitForm(roleFrom){
            if(this.obj.parentId == 0){
                this['$message']({
                    message: '请不要选择根节点！',
                    type: 'warning'
                });
                return;
            }else if(Object.keys(this.obj).length == 0){
                this['$message']({
                    message: '请选择全宗！',
                    type: 'warning'
                });
                return;
            }
            let val = document.getElementById("dangAn").value;
            val = val.replace(/\s+/g,"");
            if(roleFrom == 1){
                this.filters.page = 1;
            }
            let parames = {
                kindId:parseInt(this.kindId),
                fondId:parseInt(this.obj.id),
                searchKey:val,
                pageCondition:{
                    page:this.filters.page,
                    pageSize:this.filters.pageSize,
                    sort:'',
                }
            };
            Service.z_searchJuanNei(parames).then(res=>{
                if(res.data.succeeded){
                    this.data = res.data.data;
                    this.total = res.data.totalRecords;
                    this.active = 1;
                }else{
                    this.getError(res.data.errorMessage);
                }
            });
            this.fileVisible = false;
            this.xianShi1 = false;
            this.xianShi2 = true;
            this.xianShi3 = true;
            this.xianShi4 = false;
            this.xianShi = true;
        }

        submitForm1(val){
            let parames = {
                kindId:parseInt(this.kindId),
                fondId:parseInt(this.obj.id),
                searchKey:val,
                pageCondition:{
                    page:this.filters.page,
                    pageSize:this.filters.pageSize,
                    sort:'',
                }
            };
            Service.z_searchJuanNei(parames).then(res=>{
                if(res.data.succeeded){
                    this.data = res.data.data;
                    this.total = res.data.totalRecords;
                    this.active = 1;
                }else{
                    this.getError(res.data.errorMessage);
                }
            });
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

        chooseFond(){
            this.searchOptions = [];
            this.FondForm.id = '';
            this.leftTreeLoading = true;
            Service.getAllFondsTreeData({}).then((res) =>{
                this.leftTreeLoading = false;
                if(res.data.succeeded){
                    this.leftData = res.data.data;
                }else{
                    this['$message']({
                        message: '树节点数据错误！',
                        type: 'error'
                    });
                }
            });
            this.fileVisible = true;
        }

        prev(){
            if(!this.xianShi2){
                this.xianShi2 = true;
                this.xianShi3 = true;
                this.showDel = true;
                this.active = 1;
            }else{
                this.xianShi2 = false;
                this.xianShi3 = false;
                this.xianShi1 = true;
                this.xianShi = false;
                this.active = 0;
            }
            if(this.xianShi){
                this.xianShi4 = false;
            }else{
                this.xianShi4 = true;
            }
        }

        next(){
            if(this.recordData.length < this.detailData.count){
                this['$message']({
                    message: '已选择文件数不足应选择文件数'+this.detailData.count+'，请继续选择！',
                    type: 'warning'
                });
                return;
            }
            this.xianShi2 = false;
            this.xianShi3 = true;
            this.xianShi4 = !this.xianShi4;
            this.showDel = false;
            this.active = 2;
        }

        // 远程搜索项目
        remoteMethod(query) {
            if (query !== '' && query != undefined) {
                this.searchLoading = true;
                Service.getKeyName(query).then((res) =>{
                    if(res.data.succeeded){
                        let data = res.data.data;
                        this.searchOptions = data.map(item => {
                            return { value: item.id, label: item.fondName};
                        });
                        setTimeout(() => {
                            this.searchLoading = false;
                            this.searchOptions = this.searchOptions.filter(item => {
                                return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        }, 200);
                    }else{
                        this['$message']({
                            message: '查询全宗联想错误！',
                            type: 'error'
                        });
                    }
                });

            } else {
                this.searchOptions = [];
            }
        }

        fondSearch(){
            this.leftTreeLoading = true;
            Service.getAllFondsTreeData({}).then((res) =>{
                if(res.data.succeeded){
                    this.leftData = res.data.data;
                    this.defaultLeftOpen = [];
                    this.defaultLeftOpen.push(this.FondForm.id);
                    this.$nextTick(function(){
                      this['$refs']['treeku']['setCurrentKey'](this.FondForm.id);
                    });
                    for(let child of this.searchOptions){
                        if(child.value == this.FondForm.id){
                            this.obj.id = child.value;
                            this.obj.fondName = child.label;
                        }
                    }
                    this.leftTreeLoading = false;
                }else{
                    this['$message']({
                        message: '树节点数据错误！',
                        type: 'error'
                    });
                    this.leftTreeLoading = false;
                }
            });
        }

        //获取表格头部设置
        getDispField(libId:number){
            Service.getDispField(libId).then(res=>{
                if(res.data.succeeded){
                    var arr = res.data.data;
                    var haveBZ = false;
                    for(var son of arr){
                        if(son.fieldName=='BZ'){
                            var str = JSON.stringify(son);
                            var obj = JSON.parse(str);
                            obj.fieldName = 'BZ1';
                            haveBZ = true;
                        };
                    };
                    if(haveBZ){
                        arr.splice(1,0,obj)
                    }
                    this.tableHeader=arr;
                }else{
                    this.getError(res.data.errorMessage);
                }
            });
        };

        // 点击全宗子节点
        handleNodeClick1(data){
            this.obj = data;
        };

        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };

        handleCurrentChange(val) {
            this.filters.page = val;
            this.submitForm();
        };
        handleSizeChange(val) {
            this.filters.pageSize = val;
            this.submitForm();
        };

        applyDuty(){
            let infoList = [];
            for(let child of this.recordData){
                let obj = {
                    archiveId:child.id
                };
                infoList.push(obj);
            }

            let parames = {
                id:this.id,
                kindId:this.kindId,
                libId:this.libId,
                infoList:infoList
            };
            Service.save(parames).then((res) =>{
                if(res.data.succeeded){
                    this['$message']({
                        message: "成功",
                        type: 'success'
                    });
                    this.active = 2;
                    if(this.z_node == 0){
                        this['$router'].go(-1);
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

        xuanZe(obj){
            let flag = true;
            for(let child of this.recordData){
                if(child.id == obj.id){
                    flag = false;
                }
            }
            if(flag){
                this.recordData.push(obj);
            }
            if(this.recordData.length < this.detailData.count){
                this.countShow = false;
            }else{
                this.countShow = true;
            }
        }

        RowDblclick(row){
            let obj={
                Srclib:this.archiveLibId,
                SrcId:row.id,
                type:'1'
            };
            window.sessionStorage.setItem('ToWjDetail',JSON.stringify(obj));
            window.sessionStorage.setItem('z_detail',1);
            window.sessionStorage.setItem('z_RecordData',JSON.stringify(this.recordData));
            window.sessionStorage.setItem('z_obj',JSON.stringify(this.obj));
            let val = document.getElementById("dangAn").value;
            window.sessionStorage.setItem('z_val',val);
            window.sessionStorage.setItem('z_page',this.filters.page);
            window.sessionStorage.setItem('z_pageSize',this.filters.pageSize);
            window.sessionStorage.setItem('z_kindId',this.kindId);
            window.sessionStorage.setItem('z_CountShow',this.countShow);
            window.sessionStorage.setItem('z_xianShi2',this.xianShi2);
            this['$router'].push({
                 path:'/selfTip/WjDetail',
             })
        }

        shanChu(row,index){
            this.recordData.splice(index,1);

        }

        dateFormat2(date) {
            if(date){
                return moment(date).format("YYYYMMDD");
            }else{
                return '';
            }
        }

        renderContent1(createElement, { node, data }) {
            return createElement(
                'span',
                {
                    attrs:{
                        'class':'custom-tree-node',
                    },
                    style:{
                        'padding': '11px 0',
                        'border-left':'3px solid #3c78d4'
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
                ]
            )
        };

        created(){
            this.z_Module = JSON.parse(window.sessionStorage.getItem('z_Module'));
            let z_detail = window.sessionStorage.getItem("z_detail");

            let z_RecordData = JSON.parse(window.sessionStorage.getItem('z_RecordData'));
            if(z_detail){
                this.obj = JSON.parse(window.sessionStorage.getItem('z_obj'));
                this.xianShi1 = false;
                this.xianShi2 = true;
                this.xianShi3 = true;
                this.xianShi = true;
                let z_val = window.sessionStorage.getItem("z_val");
                this.kindId = window.sessionStorage.getItem("z_kindId");
                this.countShow = window.sessionStorage.getItem("z_CountShow");
                this.filters.page = parseInt(window.sessionStorage.getItem("z_page"));
                this.filters.pageSize = parseInt(window.sessionStorage.getItem("z_pageSize"));
                let z_xianShi2 = window.sessionStorage.getItem("z_xianShi2");
                this.currentPage = this.filters.page;
                if(this.countShow == 'false'){
                    this.countShow = false;
                }else{
                    this.countShow = true;
                }
                if(z_xianShi2 == 'false'){
                    this.xianShi2 = false;
                }else{
                    this.xianShi2 = true;
                }
                this.submitForm1(z_val);
                for(let child of z_RecordData){
                    this.recordData.push(child);
                }
                window.sessionStorage.removeItem('z_detail');
            }

            let parame = {
                id:0
            };
            let url = window.location.href;
            url = unescape(url);
            console.log(url);
            if(url.indexOf("id") > 0){
                this.z_node = 1;
                if(url.split('?')[2]){
                    let bb = (url.split('?')[2]);
                    let pb = bb.substr(bb.indexOf("=")+1);
                    let b = base['base64'].decode(
                        JSON.stringify(pb)
                    );
                    this.id = parseInt(b);
                    parame.id = this.id;
                    this.fanhui = false;
                    this.marginSize = -60;
                }
            }else{
                this.z_node = 0;
                this.fanhui = true;
                parame.id = this.z_Module.id;
                this.id = this.z_Module.id;
                this.marginSize = 0;
            }

            Service.z_getInfo(parame).then((res) =>{
                if(res.data.succeeded){
                    let libId = parseInt(res.data.data.libId);
                    let archiveLibId = parseInt(res.data.data.archiveLibId);
                    this.libId = libId;
                    this.archiveLibId = archiveLibId;
                    this.kindId = res.data.data.kindId;
                    this.detailData = res.data.data.modularization;
                    let shiJian = new Date();
                    //let riQi = this.dateFormat(shiJian.toString());//当前日期;
                    let shiJianCha =  shiJian.getTime() - new Date(this.dateFormat(this.detailData.planDate)).getTime();//当前日期和截止日期的时间差
                    if(shiJianCha > 0){
                        this.showLight = true;
                        this.content = "此任务应在"+this.dateFormat(this.detailData.planDate)+"前完成，当前已超期"+parseInt(shiJianCha/(1000*60*60*24))+"天"
                    }else{
                        this.showLight = false;
                    }
                    this.getDispField(libId);
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
        }
        mounted(){

        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/processManagement/moduleDutyDetail';
</style>