<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            <span v-if="row.parentAppNo">档案续借详情</span>
            <span v-else>档案借阅详情</span>
            <el-button class="checkWay rt" @click="back" v-if="fanhui">返回</el-button>
            <el-button class="checkWay rt" @click="printPage(row.parentAppNo)">打印</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    借阅单号：{{row.applicationNo}}
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{row.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{row.userName}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{row.userDept}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请时间</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{dateFormat1(row.appDate)}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1"><span v-if="row.parentAppNo">原</span>计划借阅日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="row.parentAppNo">{{dateFormat1(detailData.appStartDate)}}</span>
                            <span class="span2" v-else>{{dateFormat1(row.appStartDate)}}</span>
                        </div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">
                            <span v-if="row.parentAppNo">原</span>计划归还日期</span>
                        </div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="row.parentAppNo">{{dateFormat1(detailData.appEndDate)}}</span>
                            <span class="span2" v-else>{{dateFormat1(row.appEndDate)}}</span>
                        </div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1"><span v-if="row.parentAppNo">原</span>计划借阅天数</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light">
                            <span class="span2" v-if="row.parentAppNo">{{detailData.days}} 天</span>
                            <span class="span2" v-else>{{row.days}} 天</span>
                        </div></el-col>
                    </el-row>
                    <el-row v-if="row.parentAppNo">
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">续借天数</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;"><span>{{row.days-detailData.days}} 天</span></div></el-col>
                    </el-row>
                    <el-row v-if="row.parentAppNo">
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">原流程</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;"><span class="superTarget" style="cursor:pointer;" @click="backBorrowDetails">{{detailData.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">借阅事由</span></div></el-col>
                        <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;">{{row.lookupDescription }}</div></el-col>
                    </el-row>
                </ul>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        待借阅档案
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table border tooltip-effect="dark" style="width: 100%" stripe :max-height="300" :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column type="selection" width="30" label="#" v-if="tableHeadArrs.length>0">
                            </el-table-column>
                            <template v-for="file in tableHeadArrs">
                                <el-table-column :width="file.width" v-if = "file.fieldName==='HOUSETYPE'" :prop="file.fieldName" :label="file.caption">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.HOUSETYPE===1||scope.row.HOUSETYPE==='1'">在库</span>
                                        <span v-if="scope.row.HOUSETYPE===2||scope.row.HOUSETYPE==='2'">借出</span>
                                        <span v-if="scope.row.HOUSETYPE!==1&&scope.row.HOUSETYPE!==2&&scope.row.HOUSETYPE!=='1'&&scope.row.HOUSETYPE!=='2'">无实体</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="file.width" v-if = "file.fieldName==='TM'" :label="file.caption">
                                    <template slot-scope="scope">
                                        <span class="superTarget" @click="electricBorrowDetail(scope.row)">{{scope.row.TM}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="file.width"  v-if="file.fieldName!=='TM'&&file.fieldName!=='HOUSETYPE'" :prop="file.fieldName" :label="file.caption" >
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
                        <el-col :span="24">
                            <div class="grid-content2 bg-purple-light">
                                 <span class="span1">
                                    <span v-for="(item,index) in stepMap">
                                        {{item.auditUserRole}}
                                        【{{item.auditUserName}}
                                        <span v-if="item.flag&&item.auditResult===1"><i class="fa fa-check" style="color:green;font-size:15px;"></i> </span>
                                        <span v-if="item.flag&&item.auditResult===2"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>
                                        】<span v-if="index != stepMap.length-1"><img style="width:20px;vertical-align: middle;" src="../../../../imgs/arrow.png"></span>
                                    </span>
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="applyDone">
                <!--v-if="rowFlag.forward"-->
                <el-button class="checkWay"  @click="applyTransfer()">转发</el-button>
            </div>
            <!--<div class="mainCon basicList">-->
                <!--<div class="loanTipTitle">-->
                    <!--审批意见-->
                    <!--<div class="titleSect"></div>-->
                <!--</div>-->
                <!--<div class="basicList" style="padding:10px 0 15px">-->
                    <!--<el-row>-->
                        <!--<el-col :span="23">-->
                            <!--<el-form label-width="105px" :model="personFilters" class="topParamsForm superLeftForm">-->
                            <!--</el-form>-->
                            <!--<el-form label-width="105px" :model="checkFilters" class="topParamsForm superLeftForm ">-->
                                <!--<el-form-item class="title" label="审批意见：" ref="title" >-->
                                    <!--<el-input class="" type="textarea" v-model="checkFilters.title" placeholder=""></el-input>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item class="" style="margin-top:5px;" label="意见说明：">-->
                                    <!--<el-input class="" type="textarea" v-model="checkFilters.others" placeholder=""></el-input>-->
                                <!--</el-form-item>-->
                                <!--&lt;!&ndash;<div class="">1234</div>&ndash;&gt;-->
                            <!--</el-form>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                <!--</div>-->
            <!--</div>-->
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批记录
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table border tooltip-effect="dark" style="width: 100%" stripe :data="dataCheck" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{dataCheck.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="auditUserRole" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="auditRemark" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="auditUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate" :formatter="dateFormat" label="审批时间" width="200">
                            </el-table-column>
                            <el-table-column prop="typeName" label="操作">
                            </el-table-column>
                            <el-table-column prop="receiveUserName" label="接收人">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog class="checkModal" title="选择操作人" :visible.sync="writorVisible" :close-on-click-modal="true" :before-close="handleClose">
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
                    <el-col :span="24" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomLeft">
                            <el-table tooltip-effect="dark" @row-dblclick="dbChaolNameRow" @row-click="oaClickRow" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
                <el-button class="checkDefault" @click="writorVisible = false;node.childNodes = [];dataOa = [];checkNameForm.checkName = '';">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1">确定</el-button>
            </div>
        </el-dialog>

        <!--转发页面-->
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
                        <el-col :span="18"><div class="grid-content3 bg-purple-light3"><span class="span5">{{row.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6"><div class="grid-content3 bg-purple3"><span class="span4"><span style="color:red;">*</span>转发人员：</span></div></el-col>
                        <el-col :span="18"><div class="grid-content3 bg-purple-light3"><el-input readonly v-model="checkFilters1.zhuanfaName"></el-input><el-button class="checkSearch choosePerson thisInp1" @click="xuanren()"><i class="fa fa-search"></i></el-button></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6"><div class="grid-content4 bg-purple3"><span class="span6"><span style="color:red;">*</span>转发意见：</span></div></el-col>
                        <el-col :span="18"><div class="grid-content4 bg-purple-light3"><el-input  placeholder="最多输入200字" maxlength="200" type="textarea" class="myInput" v-model="checkFilters1.auditRemark"></el-input></div></el-col>
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
    import Service from './borrowExaminationDetail.service';
    import moment from 'moment';
    import { Loading } from 'element-ui';
    import base from '@/scrollLoad';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        processId:number;
        oaHeight: number;
        nameHeight: number;
        timer: boolean;
        dataDetail : any = [];
        stepMap: any = [];
        dataCheck: any = [];
        listLoading: boolean;
        fanhui:boolean;
        FileDetailVisible: boolean;
        treeLoading: boolean;
        writorVisible: boolean;
        peopleVisible0: boolean;
        comLoading: boolean;
        fileVisible: boolean;
        a: string;
        b: any;
        start: number;
        total: number;
        page: number;
        limit: number;
        treeParamsId: number;
        marginSize:number;
        dataCompany: any = [];
        leafName: any = [];
        searchOptions: any = [];
        checkNameForm: any = {};
        rowFlag: any = {};
        row: any = {};
        filters: any = {};
        basicForm: any = {};
        detailData: any = {};
        personFilters: any = {};
        pickerOptions: any = {};
        checkFilters: any = {};
        dateOptions: any = {};
        allParams:any = {};
        list: any = [];
        list1: any = [];
        data: any = [];
        dataOa: any = [];
        checkFilters1:any = {};
        oaClickRowNameZan:any = {};
        tableHeadArrs: any = [];
        dataRights: any = [];
        defaultTrees: any = [];
        dataName: any = [];
        dataChao: any = [];
        tree: any = [];
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        oaClickRowName: any = {};
        oaClickRowName1: any = {};
        node: any = {};
        resolve: any = {};
        num: number;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight-280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.a = null;
            this.b = null;
            this.timer = false;
            this.peopleVisible0 = false;
            this.fanhui = true;
            this.writorVisible = false;
            this.comLoading = false;
            this.treeLoading = false;
            this.processId = 0;
            this.marginSize = 0;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.listLoading = false;
            this.fileVisible = false;
            this.FileDetailVisible = false;
            this.oaClickRowNameZan = {};
            this.rowFlag = {};
            this.detailData = {};
            this.dataDetail = [];
            this.stepMap=[];
            this.dataCheck = [];
            this.dataChao = [];
            this.dataRights = [];
            this.row = {};
            this.personFilters = {
                name:''
            };
            this.defaultTrees = {
                children: 'children',
                id:'orgID',
                label: 'shortName',
            };
            this.checkFilters1 = {
                zhuanfaName:'',
                auditRemark:''
            };
            this.oaClickRowName = {};
            this.oaClickRowName1 = {};
            this.tableHeadArrs = [];
            this.searchOptions = [
                { label:'同意',value:'1'},
                { label:'驳回',value:'2'}
            ];
            this.checkFilters = {
                title:'',
                others:''
            };
            this.num = 0;
            this.checkNameForm = {
                checkName:''
            }
        }

        back():void{
            if(window.sessionStorage.getItem('auditIdIf')==='2'){
                this['$router'].push({
                    path:'/selfTip/examination',
                });
            }else{
                this['$router'].go(-1);
            }
        };

        //时间格式化
        dateFormat1(date) {
            if(date){
                return moment(date).format("YYYY-MM-DD");
            }else{
                return '';
            }
        }

        loadNode(node,resolve) {
            if(node.level === 0){
                this.node = node;
                this.resolve = resolve;
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

        // 跳转借阅详情
        backBorrowDetails(){
            window.sessionStorage.setItem('applicationNo',this.row.parentAppNo);
            window.sessionStorage.setItem('borrowToData',JSON.stringify(this.detailData));
            window.sessionStorage.setItem('rectState','1');
            window.sessionStorage.setItem('isChecked','2');
            if(this.processId===1){
                window.sessionStorage.setItem('process','1');
            }else{
                window.sessionStorage.setItem('process','0');
            }
            this['$router'].push({
                path:'/selfTip/borrowDetails/borrowDetailsTo',
            });
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
            let app;
            if(this.processId == 0){
                app = this.row.applicationNo;
            }else{
                app = this.a;
            }
            let params = {
                applicationNo:app
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

        // 查询审核列表
        borrowCheckTable(){
            let app;
            if(this.processId == 0){
                app = this.row.applicationNo;
            }else{
                app = this.a;
            }
            let params = {
                applicationNo:app
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

        // 详情
        electricBorrowDetail(row){
            if(this.row.auditStatus===1){
                var obj = {appNo:this.row.applicationNo,archiveId:row.id,libId:row.libId,MJ:'1'}
                window.sessionStorage.setItem('XiangDetail',JSON.stringify(obj));
                this['$router'].push({
                    path:'/@/views/fileArrange/fileManagement/infile/XiangDetail',
                })
            }else{
                var obj = {appNo:this.row.applicationNo,archiveId:row.id,libId:row.libId,MJ:row.MJ}
                window.sessionStorage.setItem('searchToDetail',JSON.stringify(obj));
                this['$router'].push({
                    path:'/retrieve/searchDetail/searchDetail',
                })
            }
        }

        // 查询修改审批人表格信息
        modifyTable(){
            Service.examineSearch({}).then((res) =>{
                if(res.data.succeeded){
                    this.dataRights = res.data.data;
                }else{
                    this['$message']({
                        message: '修改审批人信息查询失败！',
                        type: 'error'
                    });
                }
            });
        };


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

        // 双击常联系人添加
        dblNameRow(row){
            let data = this.dataCompany;
            for(let com of data){
                if(!com.name){
                    com.name = row.fullName;
                    com.userID = row.userID;
                    return
                }
            }
            this.dataCompany = data;
        };

        // 双击抄送常联系人添加
        dbChaolNameRow(row){
            this.oaClickRowName = row;
            this.checkFilters1.zhuanfaName = row.fullName;
            let ids =  row.userID;
            // 添加常联系人
            Service.addContacts(ids).then((res) =>{
                if(!res.data.succeeded){
                    this['$message']({
                        message: '添加常用联系人失败！',
                        type: 'error'
                    });
                }
            });
            this.writorVisible = false;
            //清空数据
            this.checkNameForm.checkName = '';
            this.node.childNodes = [];
            this.dataOa = [];
        };

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

        // 转发
        applyTransfer(){
            this.peopleVisible0 = true;
        };

        // 转发页面选人
        xuanren(){
            this.num+=1;
            this.writorVisible = true;
            if(this.num != 1){
                this.loadNode(this.node,this.resolve);
            }
            this.userPeople();
        }

        // 转发确定
        chooseDone0(){
            if(window.sessionStorage.getItem('LogonUserId')==this.oaClickRowName.userID){
                this['$message']({
                    message: '转发人不能选择当前登录人，请选择其他人。',
                    type: 'warning'
                });
            }else {
                if(!this.checkFilters1.zhuanfaName){
                    this['$message']({
                        message: '请选择转发人！',
                        type: 'warning'
                    });
                }else if(!this.checkFilters1.auditRemark){
                    this['$message']({
                        message: '请填写转发意见！',
                        type: 'warning'
                    });
                }else{
                    let params = {
                        id:this.b,
                        ccUser:this.oaClickRowName,
                        auditRemark:this.checkFilters1.auditRemark
                    };
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在转发中，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.examineTransfer(params).then((res) =>{
                        if(res.data.succeeded){
                            this.$nextTick(() => {
                                loadingInstance.close();
                            });
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
                }
            }
        };

        // 转发选人
        chooseDone1(){
            this.oaClickRowName = this.oaClickRowNameZan;
            if(this.oaClickRowName.userID){
                this.checkFilters1.zhuanfaName = this.oaClickRowName.fullName;
                let ids =  this.oaClickRowName.userID;
                // 添加常联系人
                Service.addContacts(ids).then((res) =>{
                    if(!res.data.succeeded){
                        this['$message']({
                            message: '添加常用联系人失败！',
                            type: 'error'
                        });
                    }
                });
                this.writorVisible = false;
                //清空数据
                this.checkNameForm.checkName = '';
                this.node.childNodes = [];
                this.dataOa = [];
            }else{
                this['$message']({
                    message: '请选择转发人员！',
                    type: 'warning'
                });
            }
        }

        // 点击左侧表格
        oaClickRow(row){
            this.oaClickRowNameZan = row;
        }

        // 全局打印
        printPage(a){
            let params = {
                id:this.row.applicationNo,
                type:a?5:4
            };
            Service.printProcessUrl(params).then((res) =>{
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
        }

        handleClose(){
            this.writorVisible  =false;
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }

        created(){
            this.row =  JSON.parse(window.sessionStorage.getItem('examCheckData1'));
            if(this.row){
                if(window.sessionStorage.getItem('auditIdIf')==='2'){
                    this.row.auditId = window.sessionStorage.getItem('auditId')
                }
            };
            // 接入OA
            let url = window.location.href;
            url = unescape(url);
            if(url.indexOf("applicationNo") > 0){
                this.processId = 1;
                if(url.split('?')[2]){
                    let bb = (url.split('?')[2].split('&')[0]);
                    let bb1 = (url.split('&')[1]);
                    let cc = bb.substr(bb.indexOf("=")+1);
                    let cc1 = bb1.substr(bb1.indexOf("=")+1);
                    let dd = base['base64'].decode(
                        JSON.stringify(cc)
                    );
                    let dd1 = base['base64'].decode(
                        JSON.stringify(cc1)
                    );
                    this.a = dd;
                    this.b = Number(dd1);
                    this.fanhui = false;
                    // this.a = parseInt(b);
                }
            }else{
                this.b = Number(this.row.auditId);
                this.processId = 0;
                this.fanhui = true;
            }
            // 调整样式
            if(this.processId != 0){
                this.marginSize = -50;
            }
            let app;
            if(this.processId == 0){
                app = this.row.applicationNo;
            }else{
                app = this.a;
            }
            Service.getUtilizeLookup({ applicationNo:app }).then((res) =>{
                if(res.data.succeeded){
                    this.row = res.data.data;
                    Service.applyFlagInfo({ processId:this.b }).then((res) =>{
                        if(res.data.succeeded){
                            this.rowFlag = res.data.data;
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            })
                        }
                    });
                    if(this.row.parentAppNo){
                        let parame = {applicationNo:this.row.parentAppNo};
                        Service.getUtilizeLookup(parame).then((res) =>{
                            if(res.data.succeeded){
                                this.detailData = res.data.data;
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                })
                            }
                        });
                    }
                    //获取审批流程
                    let parame = {applicationNo:this.row.applicationNo};
                    Service.getFondsApprovalInfo(parame).then((res) =>{
                        if(res.data.succeeded){
                            this.stepMap = res.data.data;
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    });
                    this.getHeader();
                    this.borrowCheckTable();
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
            // 获取审批人角色
            Service.getUserInfo({}).then((res) => {
                if(res.data.succeeded){
                    window.sessionStorage.setItem('LogonUserName',res.data.data.LogonUserFullName);
                    window.sessionStorage.setItem('LogonOrgName',res.data.data.LogonOrgName);
                    window.sessionStorage.setItem('LogonUserId',res.data.data.LogonUserId);
                }else{
                    this['$message']({
                        message: '登录人信息获取失败',
                        type: 'error'
                    });
                }
            });
        };

        mounted(){
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../../styles/retrieve/loanSlip';
    @import '../../../../styles/transferDetail/transferDetail';
</style>