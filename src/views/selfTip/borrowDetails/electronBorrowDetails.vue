<template>
    <section>
        <div class="mainTitle">
            <span>档案借阅申请</span>
            <el-button class="checkWay rt" @click="back">返回</el-button>
            <el-button class="checkWay rt" @click="printPage">打印</el-button>
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
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{dateFormat(row.appDate)}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{dateFormat(row.appStartDate)}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划归还日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{dateFormat(row.appEndDate)}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅天数</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{row.days}} 天</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">借阅事由</span></div></el-col>
                        <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto">{{row.lookupDescription }}</div></el-col>
                    </el-row>
                </ul>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        待借阅档案
                        <div class="titleSect"></div>
                        <!--<el-button class="checkWay rt" style="margin:5px 0" @click="borrowModify" v-show="modifyShow">修改</el-button>-->
                        <!--<el-button class="checkWay rt" style="margin:5px 0" @click="downloadFunc" v-show="downloadShow">下载</el-button>-->
                    </div>
                    <div class="borderTable waitTable">
                        <el-table border tooltip-effect="dark" style="width: 100%" stripe :max-height="300" :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
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
                            <el-table-column label="操作" width="80" v-if="tableHeadArrs.length>0&&row.auditStatus==='1'">
                                <template slot-scope="scope">
                                    <span class="addBtn" @click="electricDownLoad()" v-if="row.auditStatus==='1'">下载</span>
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
                                        {{item.auditUserRole}}
                                        【{{item.auditUserName}}
                                        <span v-if="item.flag&&item.auditResult===1"><i class="fa fa-check" style="color:green;font-size:15px;"></i> </span>
                                        <span v-if="item.flag&&item.auditResult===2"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>
                                        】<span v-if="index != stepMap.length-1"><img style="width:20px;height:20px;vertical-align: top;" src="../../../imgs/arrow.png"></span>
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
                            <el-table-column prop="auditDate" :formatter="dateFormat1" label="审批时间" width="160">
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
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrowDetails.service';
    import moment from 'moment';
    import treeChange from '../../../utils/treeChange';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        nameTo: string;
        nameTo1: string;
        downState: string;
        applicationNo:string;
        timer: boolean;
        stepMap:any=[];
        dataDetail : any = [];
        dataCheck: any = [];
        listLoading: boolean;
        downloadShow: boolean;
        modifyShow: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        treeParamsId: number;
        dataCompany: any = [];
        leafName: any = [];
        checkNameForm: any = {};
        row: any = {};
        filters: any = {};
        basicForm: any = {};
        pickerOptions: any = {};
        dateOptions: any = {};
        allParams:any = {};
        list: any = [];
        list1: any = [];
        data: any = [];
        dataOa: any = [];
        tableHeadArrs: any = [];
        defaultTrees: any = [];
        dataName: any = [];
        tree: any = [];
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.modifyShow = false;
            this.downloadShow = false;
            this.applicationNo = null;
            this.start = 0;
            this.nameTo = '';
            this.nameTo1 = '';
            this.downState = '';
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.listLoading = false;
            this.dataDetail = [];
            this.dataCheck = [];
            this.row = {};
            this.tableHeadArrs = [];
            this.stepMap=[];
        }

        back():void{
            this['$router'].go(-1);
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
                applicationNo:this.row.applicationNo
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

        // 全局打印
        printPage(){
            let params = {
                id:this.applicationNo,
                type:4
            };
            Service. printProcessUrl(params).then((res) =>{
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

        electricBorrowDetail(row){
            if(this.row.auditStatus===1){
                var obj = {appNo:this.applicationNo,archiveId:row.id,libId:row.libId,MJ:'1'}
                window.sessionStorage.setItem('XiangDetail',JSON.stringify(obj));
                this['$router'].push({
                    path:'/@/views/fileArrange/fileManagement/infile/XiangDetail',
                })
            }else{
                var obj = {appNo:this.applicationNo,archiveId:row.id,libId:row.libId,MJ:row.MJ}
                window.sessionStorage.setItem('searchToDetail',JSON.stringify(obj));
                this['$router'].push({
                    path:'/retrieve/searchDetail/searchDetail',
                })
            }
        }
        // 修改
        borrowModify(){

        }
        // 下载
        downloadFunc(){

        }

        created(){
            this.row =  JSON.parse(window.sessionStorage.getItem('borrowToData'));
            this.nameTo = JSON.parse(window.sessionStorage.getItem('borrowName'));
            this.downState = window.sessionStorage.getItem('downState');
            if(this.nameTo==='4'){
                this.modifyShow = true;
            }else{
                this.modifyShow = false;
            }

            if(this.downState==='right'){
                this.downloadShow = true;
            }else{
                this.downloadShow = false;
            }
            this.applicationNo =  window.sessionStorage.getItem('applicationNo');
        };

        mounted(){
            this.getHeader();
            this.borrowCheckTable();
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

            //获取审批流程
            Service.getUtilizeLookup(parame).then((res) =>{
                if(res.data.succeeded){
                    this.row = res.data.data;
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/transferDetail/transferDetail';
</style>