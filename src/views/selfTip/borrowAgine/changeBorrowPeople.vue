<template>
    <section>
        <div class="mainTitle">
            <span>档案借阅人变更申请</span>
            <el-button class="checkWay rt" @click="back">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    基本信息
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm" label-width="120px" :rules="basicFormRules" ref="basicForm">
                        <div class="formItem topTitle">
                            <el-form-item label="标题：" ref="title" prop="title" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                                <el-input placeholder="最多输入50字" class="checkName percentName" maxlength="50" v-model.trim="basicForm.title"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clear formItem evenTitle whiteTitle">
                            <el-form-item label="申请人：" ref="name" class="lt" prop="userName">
                                <el-input class="checkName percentName" readonly v-model="row.userName"></el-input>
                            </el-form-item>
                            <el-form-item label="申请人部门：" ref="company" class="lt basicItem" prop="userDept">
                                <el-input class="checkName percentName" readonly v-model="row.userDept"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clear formItem topTitle">
                            <el-form-item class="lt" label="计划借用日期：" prop="appStartDate">
                                <el-date-picker readonly type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="开始日期" class="checkName percentName" v-model="basicForm.appStartDate"></el-date-picker>
                            </el-form-item>
                            <el-form-item class="lt basicItem" label="计划归还日期：" prop="appEndDate">
                                <el-date-picker readonly  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName percentName" placeholder="结束日期" v-model="basicForm.appEndDate"></el-date-picker>
                            </el-form-item>
                            <el-form-item class="lt basicItem" label="计划借阅天数：" ref="date">
                                <el-input readonly class="checkName percentName" v-model="row.days"></el-input>
                                <!--<span>天</span>-->
                            </el-form-item>
                        </div>
                        <div class="evenTitle">
                            <el-form-item class="things" label="变更事由：" prop="lookupDescription" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                                <el-input type="textarea" maxlength="1000" placeholder="最多输入1000字" class="checkName percentName" v-model.trim="basicForm.lookupDescription"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </ul>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        待借阅文档
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table tooltip-effect="dark" style="width: 100%" max-height="300" stripe :data="data" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column type="selection" width="30" label="#" v-if="tableHeadArrs.length>0">
                            </el-table-column>
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
                            <el-table-column v-if="tableHeadArrs.length>0" label="操作" width="80">
                                <template slot-scope="scope">
                                    <span class="addBtn" @click="deleteAgine(scope.row,scope.$index)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批信息
                        <div class="titleSect"></div>
                    </div>
                    <el-form :rules="checkFormRules" :model="auditDisplay" class="basicForm topParamsForm fileApplyForm" label-width="135px" ref="auditDisplay">
                        <div class="formItem topTitle">
                            <el-form-item class="checkThings" label="依次选择审批人：" ref="things" prop="auditIds" :rules="[{required:true,message:'请选择',trigger:'blur'}]">
                                <el-input readonly class="checkName percentName redFont" v-model="auditDisplay.auditIds"></el-input>
                                <el-button class="checkSearch choosePerson" @click="choosePerson"><i class="fa fa-search"></i></el-button>
                            </el-form-item>
                        </div>
                        <div class="formItem evenTitle whiteTitle" v-show="cc">
                            <el-form-item class="checkThings" label="选择抄送人：" prop="ccUserId">
                                <el-input readonly class="checkName percentName" v-model="auditDisplay.ccUserId"></el-input>
                                <el-button class="checkSearch choosePerson" @click="chooseWritor"><i class="fa fa-search"></i></el-button>
                            </el-form-item>
                        </div>
                        <div class="topTitle">
                            <el-form-item class="checkThings" label="签字：" prop="signature" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                                <el-input class="checkName percentName" type="textarea" maxlength="1000" placeholder="最多输入1000字"  v-model.trim="auditDisplay.signature"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit()">提交申请</el-button>
            </div>
        </div>
        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible" :close-on-click-modal="true">
            <!--<el-form :model="fileForm" label-width="125px" ref="fileForm">-->
            <!--<el-form-item prop="fileName">-->
            <!---->
            <!--</el-form-item>-->
            <!--</el-form>-->
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="100px" ref="cell">
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName"></el-input>
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
                                <span class="rt" @click="clearPeople" style="color:#3c78d4;cursor:pointer;">全部清除</span>
                            </div>
                            <div class="topCheckTree" style="padding:0">
                                <el-table  @row-dblclick="dblNameRow" :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
                                    <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomLeft">
                            <el-table tooltip-effect="dark" @row-click="oaClickRow" :height = "oaHeight" stripe :data="dataOa"  v-loading="comLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="2" style="height:48%;margin-top:1%;">
                        <div>
                            <el-button @click="rightToLeft" type="primary" icon="el-icon-arrow-left" circle class="direction"></el-button>
                            <el-button @click="leftToRight" type="primary" icon="el-icon-arrow-right" circle class="direction"></el-button>
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomRight">
                            <el-table tooltip-effect="dark" @row-click="leafClickRow" @row-dblclick="celldblClick" stripe :height = "oaHeight" @selection-change="selsChange1" :data="dataCompany" v-loading="listLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="nodeName" label="节点名称">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column v-if = "false" :show-overflow-tooltip="true" prop="userId" label="ID">
                                </el-table-column>
                                <el-table-column v-if = "false" :show-overflow-tooltip="true" prop="id" label="">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button class="checkDefault" @click="peopleVisible = false">取消</el-button>
                <el-button class="checkWay" @click="chooseDone" >确定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="checkModal" title="选择抄送人" :visible.sync="writorVisible" :close-on-click-modal="true">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="100px" ref="cell">
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName"></el-input>
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
                                <span class="rt" @click="clearPeople" style="color:#3c78d4;cursor:pointer;">全部清除</span>
                            </div>
                            <div class="topCheckTree" style="padding:0">
                                <el-table  @row-dblclick="dbChaolNameRow" :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
                                    <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                    </el-table-column>
                                    <el-table-column v-if = "false" :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomLeft">
                            <el-table tooltip-effect="dark" @row-click="oaClickRow" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="2" style="height:48%;margin-top:1%;">
                        <div>
                            <el-button @click="chaoRightToLeft" type="primary" icon="el-icon-arrow-left" circle class="direction"></el-button>
                            <el-button @click="chaoLeftToRight" type="primary" icon="el-icon-arrow-right" circle class="direction"></el-button>
                            <el-button @click="chaoAllRightToLeft" type="primary" icon="el-icon-d-arrow-left" circle class="direction"></el-button>
                            <el-button @click="chaoAllLeftToRight" type="primary" icon="el-icon-d-arrow-right" circle class="direction"></el-button>
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomRight">
                            <el-table tooltip-effect="dark" @row-click="leafClickRow" @row-dblclick="cellChaodblClick" :height = "oaHeight" stripe :data="dataChao" highlight-current-row class="indexTable containTable">
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
            <div slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button class="checkDefault" @click="writorVisible = false">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './changeBorrowPeople.service';
    import moment from 'moment';
    import treeChange from '../../../utils/treeChange';
    import { Loading } from 'element-ui';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        timer: boolean;
        cc: boolean;
        dataDetail : any = [];
        dataCheck: any = [];
        defaultTrees: any = {};
        listLoading: boolean;
        treeLoading: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        sign: number;
        treeParamsId: number;
        dataCompany: any = [];
        leafName: any = [];
        auditDisplay: any = {};
        checkNameForm: any = {};
        row: any = {};
        filters: any = {};
        basicForm: any = {};
        pickerOptions: any = {};
        dateOptions: any = {};
        allParams:any = {};
        list: any = [];
        list1: any = [];
        tableHeadArrs: any = [];
        dataName: any = [];
        tree: any = [];
        data: any = [];
        dataOa: any = [];
        dataChao: any = [];//抄送人数据
        peopleVisible: boolean;
        writorVisible: boolean;
        comLoading: boolean;
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        oaClickRowName: any = {};
        oaClickRowName1: any = {};
        auditForm: any = {};
        fondName: string;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.peopleVisible = false;
            this.writorVisible = false;
            this.comLoading = false;
            this.treeLoading = false;
            this.cc = true;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.sign = 0;
            this.listLoading = false;
            this.dataDetail = [];
            this.dataCheck = [];
            this.list = [];
            this.data = [];
            this.dataOa = [];
            this.dataChao = [];
            this.row = {};
            this.oaClickRowName = {};
            this.oaClickRowName1 = {};
            this.tableHeadArrs = [];
            this.auditForm = {
                auditIds:{},
                ccUserId:{},
                signature:''
            };
            this.defaultTrees = {
                children: 'children',
                id:'orgID',
                label: 'shortName',
            };
            this.basicFormRules = {

            };
            this.basicForm = {
                title:'',
                againDays:'',
                lookupDescription:'',
                userId:'',
                userName:'',
                appDate:'',
                userDept:'',
                appStartDate:'',
                appEndDate:'',
                days:'',
            };
            this.auditDisplay ={
                auditIds:'',
                ccUserId:'',
                signature:''
            };
            this.fondName = '';
        }

        back():void{
            this['$router'].go(-1);
        };

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
                            message: '树节点数据错误！',
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

        //时间格式化
        dateFormat(date) {
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
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        }

        // 查询档案头
        getHeader():void{
            Service.borrowFileHead({}).then((res) =>{
                if(res.data.succeeded){
                    this.tableHeadArrs = res.data.data;
                    this.list.forEach(function(item){
                        if(item.HOUSETYPE==1){
                            item.HOUSETYPE = '在库'
                        }else if(item.HOUSETYPE==2){
                            item.HOUSETYPE = '借出'
                        }else{
                            item.HOUSETYPE = '无实体'
                        }
                    });
                    this.data = this.list;
                    //this.borrowFileTable();
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
                applicationNo:this.row.applicationNo
            };
            Service.borrowFileTable(params).then((res) =>{
                if(res.data.succeeded){
                    this.data = res.data.data;
                }else{
                    this['$message']({
                        message: '加载档案列表失败！',
                        type: 'error'
                    });
                }
            })
        }

        // 查询审核列表
        borrowCheckTable(){
            let params = {
                applicationNo:this.row.applicationNo
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

        // 常用联系人
        userPeople(){
            Service.findOaPerson({}).then((res) =>{
                if(res.data.succeeded){
                    this.dataName = res.data.data;
                }else{
                    this['$message']({
                        message: '常用联系人加载失败！',
                        type: 'error'
                    });
                }
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
                        this.userPeople();
                    }else{
                        this['$message']({
                            message: '删除失败！',
                            type: 'error'
                        });
                    }
                });
            });
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

        // 节点表格
        nameList(){
            let params = this.row.fondId;
            Service.getTaskNodeList(params).then((res) =>{
                this.dataCompany = res.data.data;
                for(let child of this.dataCompany){
                    if(!child.select && child.fullName == ''){
                        this.fondName = child.fondName;
                        let b = document.querySelector(".redFont .el-input__inner");
                        b["style"].color = 'red';
                        this.auditDisplay.auditIds = "审批人员未配置，流程无法发起。请联系" + this.fondName + "的行政部档案员。";
                        this.sign = 1;
                    }
                }
            });
        };

        // 点击选择审批人
        choosePerson():void{
            if(this.data.length===0){
                this['$message']({
                    message: '待借阅文档列表为空，无法选择审批人！',
                    type: 'warning'
                });
            }else{
                if(this.sign ==1){
                    this['$message']({
                        message: '审批人员未配置，流程无法发起。请联系' + this.fondName + '的行政部档案员。',
                        type: 'warning'
                    });
                }else{
                    this.peopleVisible = true;
                    this.userPeople();
                }

            }
        }

        // 点击选择抄送人
        chooseWritor():void{
            if(this.data.length===0){
                this['$message']({
                    message: '待借阅档案列表为空，无法选择抄送人！',
                    type: 'warning'
                });
            }else{
                this.writorVisible = true;
                this.userPeople();
            }
        };

        // 审批人确定
        chooseDone(){
            let arr = [];
            let userIds = [];
            for(let data of this.dataCompany){
                if(data.fullName != ''){
                    arr.push(data.fullName);
                    userIds.push(data.userId);
                }
            }
            if(arr.length===this.dataCompany.length){
                this.auditDisplay.auditIds  = arr.join('->');
                let ids = userIds.join(',');
                for(let i=0;i<this.leafName.length;i++){
                    for(let j in this.leafName[i]){
                        this.leafName[i][j] = this.dataCompany[i].userID
                    }
                }
                this.peopleVisible = false;
                this.saveContacts(ids);
            }else{
                this['$message']({
                    message: '审核人姓名未选择完整！',
                    type: 'warning'
                });
            }
        };

        // 抄送人确定
        chooseDone1(){
            if(this.dataChao.length>0){
                let arr = [];
                let userIds = [];
                for(let data of this.dataChao){
                    for(let i in data){
                        if(i==='fullName'){
                            arr.push(data[i]);
                        }
                    }
                    userIds.push(data.userID);
                }
                this.auditDisplay.ccUserId  = arr.join('，');
                let ids = userIds.join(',');
                this.writorVisible = false;
                this.saveContacts(ids);
            }else{
                this.writorVisible = false;
                this.auditDisplay.ccUserId  = '';
            }
        };

        // 双击常联系人添加
        dblNameRow(row){
            let data = this.dataCompany;
            for(let com of data){
                if(!com.fullName){
                    com.fullName = row.fullName;
                    com.userId = row.userID;
                    return false;
                }
            }
        };

        // 双击抄送常联系人添加
        dbChaolNameRow(row){
            if(this.dataChao.length>0){
                let arr = [];
                for(let data of this.dataChao){
                    if(data.userID === row.userID){
                        arr.push(row.userID);
                    }
                }
                if(arr.length===0){
                    this.dataChao.push({
                        fullName:row.fullName,
                        userID:row.userID,
                        unitname:row.unitname,
                        jobname:row.jobname,
                    });
                }
            }else{
                this.dataChao.push({
                    fullName:row.fullName,
                    userID:row.userID,
                    unitname:row.unitname,
                    jobname:row.jobname,
                });
            }
        };

        // 点击节点表格删除
        celldblClick(row:any){
            console.log(row)
            if(row.fullName && row.select) {
               row.fullName = '';
            }else if(!row.select){
                this['$message']({
                    message: '节点不能更改！',
                    type: 'warning'
                });
            }
        }

        // 点击抄送人节点表格删除
        cellChaodblClick(row:any){
            if(row.fullName) {
                let arr = [];
                for(let data of this.dataChao){
                    if(data.fullName!==row.fullName){
                        arr.push(data)
                    }
                };
                this.dataChao = arr;
            }
        }

        // 点击左侧OA表格行
        oaClickRow(row){
            this.oaClickRowName = row;
        };

        // 左转右
        leftToRight(){
            let data = this.oaClickRowName;
            for(let com of this.dataCompany){
                if(com.select && com.fullName == ''){
                    com.fullName = data.fullName;
                    com.userId = data.userID;
                    return false;
                }
            }
        }

        // 抄送左转右
        chaoLeftToRight(){
            if(this.dataOa.length>0){
                let data1 = this.oaClickRowName;
                if(this.dataChao.length>0){
                    let arr = [];
                    for(let data of this.dataChao){
                        if(data1.userID === data.userID){
                            arr.push(data.userID);
                        }
                    }
                    if(arr.length===0){
                        this.dataChao.push({
                            fullName:data1.fullName,
                            userID:data1.userID,
                            unitname:data1.unitname,
                            jobname:data1.jobname,
                        });
                    }
                }else{
                    this.dataChao.push({
                        fullName:data1.fullName,
                        userID:data1.userID,
                        unitname:data1.unitname,
                        jobname:data1.jobname,
                    });
                }
            }
        }

        // 点击节点名称列表
        leafClickRow(row){
            this.oaClickRowName1 = row;
        };
        // 右转左
        rightToLeft(){
            let data = this.oaClickRowName1;
            for(let com of this.dataCompany){
                if(data.id===com.id && com.select){
                    com.fullName = '';
                }
            }
        }

        // 抄送右转左
        chaoRightToLeft(){
            let data1 = this.oaClickRowName1;
            let arr = [];
            for(let data of this.dataChao){
                if(data1.fullName!==data.fullName){
                    arr.push(data)
                }
            };
            this.dataChao = arr;
        }

        // 全部右转左
        allRightToLeft(){
            for(let com of this.dataCompany){
                if(com.fullName && com.select){
                    com.fullName = '';
                }
            }
        };

        // 全部左转右
        allLeftToRight(){
            let arr = this.dataOa;
            for(let i=0;i<this.dataCompany.length;i++){
                if(!this.dataCompany[i].fullName){
                    this.dataCompany[i].fullName = arr[i].fullName;
                    this.dataCompany[i].userId = arr[i].userID;
                }
            }
        };

        // 全部抄送右转左
        chaoAllRightToLeft(){
            this.dataChao = [];
        }

        // 全部抄送左转右
        chaoAllLeftToRight(){
            if(this.dataOa.length>0){
                this.dataChao = this.dataOa;
            }
        }

        // 点击子节点
        handleNodeClick(data){
            this.oaPerson(data.orgID);
        };

        // 提交借阅人变更申请
        applySubmit():void{
            if(this.sign == 1){
                this['$message']({
                    message: '审批人员未配置，流程无法发起。请联系' + this.fondName + '的行政部档案员。',
                    type: 'warning'
                });
                return;
            }

            if(!this.basicForm.title){
                this['$message']({
                    message: '请完善基本信息。',
                    type: 'warning'
                });
                this['$refs']['basicForm']['validate']((valid)=>{

                });
            }else if(!this.basicForm.lookupDescription){
                this['$message']({
                    message: '请完善基本信息。',
                    type: 'warning'
                });
                this['$refs']['basicForm']['validate']((valid)=>{

                });
            }else if(!this.auditDisplay.auditIds){
                this['$message']({
                    message: '请选择审批人。',
                    type: 'warning'
                });
                this['$refs']['auditDisplay']['validate']((valid)=>{

                });
            }else if(!this.auditDisplay.signature){
                this['$message']({
                    message: '请填写签字意见。',
                    type: 'warning'
                });
                this['$refs']['auditDisplay']['validate']((valid)=>{

                });
            }else{

                let loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在提交中，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );

                let utilizeLookup = {applicationNo:this.row.applicationNo}
                let title = this.basicForm.title;
                let description = this.basicForm.lookupDescription;
                let fonds = {id:this.row.fondId};
                let updateBorrowInfoList = [];
                for(let child of this.data){
                    let obj = {libId:child.libId,objectId:child.id};
                    updateBorrowInfoList.push(obj);
                };
                let updateBorrowProcessList = [];
                for(let child of this.dataCompany){
                    let auditUser = {userId:child.userId};
                    let obj = {auditStep:child.step,taskNodeName:child.nodeName,auditUser:auditUser,forward:child.forward,additionalSignature:child.additionalSignature};
                    updateBorrowProcessList.push(obj);
                };
                let attr = [];
                for(let child of this.dataChao){
                    attr.push(child.userID);
                }
                let ccUsers = attr.join(",");
                let auditRemark = this.auditDisplay.signature;
                let parames = {
                                utilizeLookup:utilizeLookup,
                                title:title,
                                description:description,
                                fonds:fonds,
                                updateBorrowInfoList:updateBorrowInfoList,
                                updateBorrowProcessList:updateBorrowProcessList,
                                ccUsers:ccUsers,
                                auditRemark:auditRemark
                              };
                Service.saveOrUpdatePeople(parames).then((res) =>{

                    this.$nextTick(() => {
                        loadingInstance.close();
                    });

                    if(res.data.succeeded){
                        this['$message']({
                            message: '成功！',
                            type: 'success'
                        });
                        window.sessionStorage.setItem('myId', res.data.data);
                        window.sessionStorage.setItem('node', '3');
                        this['$router'].push({
                            path:'/selfTip/examCheck/peopleRefuseCheck',
                            name:'驳回借阅人变更审批',
                        });
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                    window.sessionStorage.setItem('examState', '2');
                });
            }
        };

        electricBorrowDetail(row){
            var obj = {appNo:this.row.applicationNo,archiveId:row.id,libId:row.libId}
            window.sessionStorage.setItem('XiangDetail',JSON.stringify(obj))
            this['$router'].push({
                path:'/views/fileArrange/fileManagement/infile/XiangDetail',
                name:'借阅档案的详情',
            })
        }

        // 删除
        deleteAgine(row,index){
            this.data.splice(index,1);
        }
        created(){
            this.row =  JSON.parse(window.sessionStorage.getItem('borrowPeopleData'));
            this.list =  JSON.parse(window.sessionStorage.getItem('list'));
        };

        saveContacts(ids){
            Service.saveContacts(ids).then((res) =>{

            });
        }

        mounted(){
            this.basicForm.lookupDescription = this.row.lookupDescription;
            this.basicForm.userId = this.row.userId;
            this.basicForm.userName = this.row.userName;
            this.basicForm.appDate = this.dateFormat(this.row.appDate);
            this.basicForm.appStartDate = this.dateFormat(this.row.appStartDate);
            this.basicForm.appEndDate = this.dateFormat(this.row.appEndDate);
            this.basicForm.userDept = this.row.userDept;
            this.basicForm.days = this.row.days;
            this.getHeader();
            this.borrowCheckTable();

            Service.isCC({}).then((res) =>{
                this.cc = res.data.data.cc;
            });

            this.nameList();
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/transferDetail/transferDetail';
</style>