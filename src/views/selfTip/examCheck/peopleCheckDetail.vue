<template>
    <section>
        <div class="mainTitle">
            <span>档案借阅人变更申请</span>
            <el-button class="checkWay rt" @click="back">关闭</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号：{{detailData.processNo}}
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm" label-width="120px" :rules="basicFormRules" ref="cell">
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题</span></div></el-col>
                            <el-col :span="21"><div class="grid-content bg-purple-light">
                            <span class="span2">
                                <span>{{title}}</span>
                             </span></div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{userName}}</span></div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{userDept}}</span></div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅日期</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{dateFormat(appStartDate)}}</span></div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划归还日期</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{dateFormat(appEndDate)}}</span></div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅天数</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{days}} 天</span></div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">变更事由</span></div></el-col>
                            <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;">
                                <span>{{lookupDescription}}</span>
                            </div></el-col>
                        </el-row>
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
                        <el-table tooltip-effect="dark" style="width: 100%" stripe :height="bodyHeight" :data="data" highlight-current-row v-loading="listLoading" class="indexTable containTable">
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
                                        <span class="" @click="electricBorrowDetail(scope.row)">{{scope.row.TM}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="file.width"  v-if="file.fieldName!=='TM'&&file.fieldName!=='CFWZ'" :prop="file.fieldName" :label="file.caption" >
                                </el-table-column>
                            </template>
                            <el-table-column v-if="tableHeadArrs.length>0 && xianshi" label="操作" width="80">
                                <template slot-scope="scope">
                                    <span class="addBtn" @click="deleteAgine(scope.row,scope.$index)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>

            <div class="mainCon basicList" v-show="shenpixinxi">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批信息
                        <div class="titleSect"></div>
                    </div>
                    <el-form :rules="checkFormRules" :model="auditDisplay" class="basicForm topParamsForm fileApplyForm" label-width="135px" ref="cell">
                        <div class="formItem topTitle">
                            <el-form-item class="checkThings" label="依次选择审批人：" ref="things" prop="auditIds">
                                <el-input readonly class="checkName percentName" v-model="auditIds"></el-input>
                            </el-form-item>
                        </div>
                        <div class="formItem evenTitle whiteTitle" v-show="cc">
                            <el-form-item class="checkThings" label="选择抄送人：" prop="ccUserId">
                                <el-input readonly class="checkName percentName" v-model="ccUserId"></el-input>
                            </el-form-item>
                        </div>
                        <div class="topTitle">
                            <el-form-item class="checkThings" label="签字：" prop="signature">
                                <el-input readonly class="checkName percentName" v-model="signature"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './peopleRefuseCheck.service';
    import moment from 'moment';
    import treeChange from '../../../utils/treeChange';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        timer: boolean;
        node:String;
        dataDetail : any = [];
        dataCheck: any = [];
        recordData; any = [];
        defaultTrees: any = {};
        listLoading: boolean;
        treeLoading: boolean;
        xianshi;boolean;
        shenpixinxi:boolean;
        shenpiliucheng:boolean;
        cc:boolean;
        tishi:String;
        showTiShi: boolean;

        title: String;
        userName: String;
        userDept: String;
        appStartDate: String;
        appEndDate: String;
        days: String;
        lookupDescription: String;
        auditIds: String;
        ccUserId: String;
        signature: String;

        start: number;
        total: number;
        page: number;
        limit: number;
        treeParamsId: number;
        dataCompany: any = [];
        stepMap: any = [];
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
        detailData: any = {};
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
            this.xianshi = true;
            this.shenpixinxi = true;
            this.shenpiliucheng = true;
            this.cc = true;
            this.tishi = '';
            this.showTiShi = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.listLoading = false;
            this.dataDetail = [];
            this.dataCheck = [];
            this.list = [];
            this.recordData = [];
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
        }

        back():void{
            this['$router'].push({
                path:'/selfTip/borrow',
            });
        };


        //时间格式化
        dateFormat(date) {
            if(date){
                return moment(date).format("YYYY-MM-DD");
            }else{
                return '';
            }
        }

        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }

        // 查询档案头
        getHeader():void{
            Service.borrowFileHead({}).then((res) =>{
                if(res.data.succeeded){
                    this.tableHeadArrs = res.data.data;
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

        created(){

        };

        mounted(){
            this.getHeader();
            Service.isCC({}).then((res) =>{
                this.cc = res.data.data.cc;
            });
            this.title = this['$route'].params.title;
            this.userName = this['$route'].params.userName;
            this.userDept = this['$route'].params.userDept;
            this.appStartDate = this['$route'].params.appStartDate;
            this.appEndDate = this['$route'].params.appEndDate;
            this.days = this['$route'].params.days;
            this.lookupDescription = this['$route'].params.lookupDescription;
            this.data = this['$route'].params.data;
            this.auditIds = this['$route'].params.auditIds;
            this.ccUserId = this['$route'].params.ccUserId;
            this.signature = this['$route'].params.signature;
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/transferDetail/transferDetail';
</style>