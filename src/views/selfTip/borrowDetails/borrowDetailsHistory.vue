<template>
    <section>
        <div class="mainTitle">
            <span v-if="row.parentAppNo">档案续借申请</span>
            <span v-else>档案借阅申请</span>
            <el-button class="checkWay rt" @click="back">返回</el-button>
            <!--<el-button class="checkWay rt" v-if="type!='history'" @click="clickJCBtn">借出</el-button>-->
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    借阅单号：{{detailData.applicationNo}}
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{detailData.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.userName}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.userDept}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请时间</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{dateFormat(detailData.appDate)}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1"><span v-if="row.parentAppNo">原</span>计划借阅日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="row.parentAppNo">{{dateFormat(detailData1.appStartDate)}}</span>
                            <span class="span2" v-else>{{dateFormat(detailData.appStartDate)}}</span>
                        </div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">
                            <span v-if="row.parentAppNo">原</span>计划归还日期</span>
                        </div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="row.parentAppNo">{{dateFormat(detailData1.appEndDate)}}</span>
                            <span class="span2" v-else>{{dateFormat(detailData.appEndDate)}}</span>
                        </div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1"><span v-if="row.parentAppNo">原</span>计划借阅天数</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light">
                            <span class="span2" v-if="row.parentAppNo">{{detailData1.days}} 天</span>
                            <span class="span2" v-else>{{detailData.days}} 天</span>
                        </div></el-col>
                    </el-row>
                    <el-row v-if="row.parentAppNo">
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">续借天数</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;"><span>{{detailData.days-detailData1.days}} 天</span></div></el-col>
                    </el-row>
                    <el-row v-if="row.parentAppNo">
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">原流程</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;"><span class="superTarget" style="cursor:pointer;" @click="backBorrowDetails">{{detailData1.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">借阅事由</span></div></el-col>
                        <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto">{{detailData.lookupDescription }}</div></el-col>
                    </el-row>
                </ul>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        待借阅档案
                        <div class="titleSect"></div>
                        <!--<el-button class="checkWay rt" style="margin:5px 0" @click="toAgine" v-show="allShow">续借</el-button>-->
                        <!--<el-button class="checkWay rt" style="margin:5px 10px" @click="changePeople" v-show="allShow">变更借阅人</el-button>-->
                    </div>
                    <div class="borderTable waitTable">
                        <el-table border style="width: 100%" @selection-change="selsChange" stripe :max-height="300" :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
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
                            <el-table-column  prop="isAgained" label="是否续借" width="80">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.isAgained">是</span>
                                    <span v-else>否</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="isUpdate" label="是否变更借阅人" width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.isUpdate">是</span>
                                    <span v-else>否</span>
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
                            <el-table-column prop="auditDate" :formatter="dateFormat1" label="审批时间" width="200">
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
        timer: boolean;
        allShow:boolean;
        nameTo1:string;
        dataDetail : any = [];
        stepMap:any=[];
        detailData:any = [];
        dataCheck: any = [];
        listLoading: boolean;//选择抄送人
        start: number;
        total: number;
        page: number;
        limit: number;
        treeParamsId: number;
        applicationNo:string;
        applicationNo1:string;
        typeOld : string;
        type:string;
        dataCompany: any = [];
        leafName: any = [];
        checkNameForm: any = {};
        row: any = {};
        row1: any = {};
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
        detailData1:any = [];
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
            this.allShow = false;
            this.typeOld = '';
            this.type = '';
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.nameTo1 = '';
            this.limit = 25;
            this.treeParamsId = 0;
            this.listLoading = false;
            this.dataDetail = [];
            this.dataCheck = [];
            this.row = {};
            this.row1 = {};
            this.tableHeadArrs = [];
            this.stepMap=[];
            this.detailData = [];
            this.detailData1 = [];
        }

        back():void{
            window.sessionStorage.removeItem('clickedRow');
            window.sessionStorage.removeItem('_type');
            this['$router'].go(-1);
        };

        // 选择数目
        selsChange(list:any = {}){
            this.list = list;
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

        // 跳转借阅详情
        backBorrowDetails(){
            //获取现流程
            let parame = {applicationNo:this.row.applicationNo};
            window.sessionStorage.setItem('applicationNo',this.detailData1.applicationNo);
            window.sessionStorage.setItem('applicationNo1',this.applicationNo1);
            window.sessionStorage.setItem('borrowToData',JSON.stringify(this.detailData1));
            window.sessionStorage.setItem('borrowToData1',JSON.stringify(this.row1));
            this['$router'].push({
                path:'/selfTip/borrowDetails/borrowDetailsTo',
            });
            // Service.getUtilizeLookup(parame).then((res) =>{
            //     if(res.data.succeeded){
            //         this.detailData = res.data.data;
            //         this.allShow = false;
            //         //获取审批流程
            //         let param = {applicationNo:this.applicationNo};
            //         Service.getFondsApprovalInfo(param).then((res) =>{
            //             if(res.data.succeeded){
            //                 this.stepMap = res.data.data;
            //                 // 获取原流程
            //                 if(this.row.parentAppNo){
            //                     let parame = {applicationNo:this.row.parentAppNo};
            //                     Service.getUtilizeLookup(parame).then((res) =>{
            //                         if(res.data.succeeded){
            //                             this.detailData1 = res.data.data;
            //                             this.row = res.data.data;
            //                             this.applicationNo = this.row.parentAppNo;
            //                         }else{
            //                             this['$message']({
            //                                 message: res.data.errorMessage,
            //                                 type: 'error'
            //                             });
            //                         }
            //                     });
            //                 }
            //
            //             }else{
            //                 this['$message']({
            //                     message: res.data.errorMessage,
            //                     type: 'error'
            //                 });
            //             }
            //         });
            //     }else{
            //         this['$message']({
            //             message: res.data.errorMessage,
            //             type: 'error'
            //         });
            //     }
            // });
        };

        clickJCBtn(){
            // window.sessionStorage.setItem('_type', '');
            this['$router'].push({
                name:'借出档案管理借出页面'
            });
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
                applicationNo:this.applicationNo
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
                applicationNo:this.applicationNo
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

        electricBorrowDetail(row){
            var obj = {appNo:this.applicationNo,archiveId:row.id,libId:row.libId,MJ:'1'}
            window.sessionStorage.setItem('XiangDetail',JSON.stringify(obj));
            this['$router'].push({
                path:'/@/views/fileArrange/fileManagement/infile/XiangDetail',
            })
        }

        // 续借
        toAgine(){
            if( this.list.length===0){
                this.list = this.dataDetail
            }
            window.sessionStorage.setItem('borrowAgineTable', JSON.stringify(this.list));
            this['$router'].push({
                path:'/selfTip/borrowAgine/borrowAgine',
            });
        }

        // 变更借阅人
        changePeople(){
            window.sessionStorage.setItem('borrowPeopleData', JSON.stringify(this.row));
            if(this.list.length == 0){
                this.list = this.dataDetail;
            }
            window.sessionStorage.setItem('list', JSON.stringify(this.list));
            this['$router'].push({
                path:'/selfTip/borrowAgine/changeBorrowPeople',
            });
        }

        // 全局打印
        printPage(){
            let params = {
                id:this.applicationNo,
                type:4
            };
            Service.printProcessUrl(params).then((res) =>{
                if (res) {
                    let url = window["URL"].createObjectURL(new Blob([res],{type: 'application/pdf'}));
                    window.open(url)
                }else{
                    this['$message']({
                        message: '打印失败！',
                        type: 'error'
                    });
                }
            });
        }

        created(){
            this.typeOld = window.sessionStorage.getItem('type');
            this.type = window.sessionStorage.getItem('_type');
            this.nameTo1 = window.sessionStorage.getItem('borrowName1');
            this.row = JSON.parse(window.sessionStorage.getItem('borrowToData'));
            this.row1 = JSON.parse(window.sessionStorage.getItem('borrowToData'));
            this.applicationNo =  window.sessionStorage.getItem('applicationNo');
            this.applicationNo1 = window.sessionStorage.getItem('applicationNo');
            let rect = window.sessionStorage.getItem('rectState');
            //获取现流程
            let parame = {applicationNo:this.applicationNo};
            Service.getUtilizeLookup(parame).then((res) =>{
                if(res.data.succeeded){
                    this.detailData = res.data.data;
                    this.allShow = false;
                    //获取审批流程
                    let param = {applicationNo:this.applicationNo};
                    Service.getFondsApprovalInfo(param).then((res) =>{
                        if(res.data.succeeded){
                            this.stepMap = res.data.data;
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    });
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
        };

        mounted(){
            this.getHeader();
            this.borrowCheckTable();

            // 获取原流程
            if(this.row.parentAppNo){
                let parame = {applicationNo:this.row.parentAppNo};
                Service.getUtilizeLookup(parame).then((res) =>{
                    if(res.data.succeeded){
                        this.detailData1 = res.data.data;
                        //this.applicationNo = this.row.parentAppNo;
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
            }
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/transferDetail/transferDetail';
</style>