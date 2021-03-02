<template>
    <section>
      <section>
        <div class="mainTitle">
            <span v-if="clickedRow.parentAppNo">档案续借申请</span>
            <span v-else>档案借阅申请</span>
            <el-button class="checkWay rt" @click="back">返回</el-button>
            <!--<el-button class="checkWay rt" v-if="type!='history'" @click="clickJCBtn">借出</el-button>-->
            <!-- <el-button class="checkWay rt" @click="">确定</el-button> -->
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    借阅单号：{{clickedRow.applicationNo}}
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                     <el-row>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题</span></div></el-col>
                  <el-col :span="21"><div class="grid-content bg-purple-light">
                      <span class="span2" v-if="typeOld==='oneLeft'">{{clickedRow.title}}</span>
                      <span class="span2" v-if="typeOld==='oneRight'">{{clickedRow.up.title}}</span>
                  </div></el-col>
                  <!--<el-col :span="3"><div class="grid-content bg-purple"><span class="span1">借阅方式</span></div></el-col>-->
                  <!--<el-col :span="5"><div class="grid-content bg-purple-light">-->
                      <!--<span v-if="clickedRow.appType == 1" class="span2">电子</span>-->
                      <!--<span v-else class="span2">实体</span></div>-->
                  <!--</el-col>-->
                </el-row>
                <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="typeOld==='oneLeft'">{{clickedRow.userName}}</span>
                            <span class="span2" v-if="typeOld==='oneRight'">{{clickedRow.up.userName}}</span>
                        </div>
                        </el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="typeOld==='oneLeft'">{{clickedRow.userDept}}</span>
                            <span class="span2" v-if="typeOld==='oneRight'">{{clickedRow.up.userDept}}</span>
                        </div>
                        </el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请时间</span></div></el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple-light">
                             <span class="span2" v-if="typeOld==='oneLeft'">{{dateFormat(clickedRow.appDate)}}</span>
                             <span class="span2" v-if="typeOld==='oneRight'">{{dateFormat(clickedRow.up.appDate)}}</span>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1"><span v-if="clickedRow.parentAppNo">原</span>计划借阅日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="typeOld==='oneLeft'&&clickedRow.parentAppNo">
                                {{dateFormat(detailData1.appStartDate)}}
                            </span>
                            <span class="span2" v-if="typeOld==='oneLeft'&&!clickedRow.parentAppNo">
                                {{dateFormat(clickedRow.appStartDate)}}
                            </span>
                            <span class="span2" v-if="typeOld==='oneRight'&&clickedRow.parentAppNo">
                                {{dateFormat(detailData1.up.appStartDate)}}
                            </span>
                            <span class="span2" v-if="typeOld==='oneRight'&&!clickedRow.parentAppNo">
                                {{dateFormat(clickedRow.up.appStartDate)}}
                            </span>
                        </div>
                        </el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1"><span v-if="clickedRow.parentAppNo">原</span>计划归还日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="typeOld==='oneLeft'">
                                 <span v-if="clickedRow.parentAppNo">{{dateFormat(detailData1.appEndDate)}}</span>
                                 <span v-else>{{dateFormat(clickedRow.appEndDate)}}</span>
                            </span>
                            <span class="span2" v-if="typeOld==='oneRight'">
                                  <span  v-if="clickedRow.parentAppNo">{{dateFormat(detailData1.up.appEndDate)}}</span>
                                  <span  v-else>{{dateFormat(clickedRow.up.appEndDate)}}</span>
                            </span>
                        </div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1"><span v-if="clickedRow.parentAppNo">原</span>计划借阅天数</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light">
                            <span class="span2" v-if="typeOld==='oneLeft'">
                                 <span  v-if="clickedRow.parentAppNo">{{detailData1.days}} 天</span>
                                 <span  v-else>{{clickedRow.days}} 天</span>
                            </span>
                            <span class="span2" v-if="typeOld==='oneRight'">
                                  <span v-if="clickedRow.parentAppNo">{{detailData1.up.days}} 天</span>
                                  <span v-else>{{clickedRow.up.days}} 天</span>
                            </span>
                        </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="clickedRow.parentAppNo">
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">续借天数</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;"><span>{{clickedRow.days-detailData1.days}} 天</span></div></el-col>
                    </el-row>
                    <el-row v-if="clickedRow.parentAppNo">
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">原流程</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;"><span class="superTarget" style="cursor:pointer;" @click="backBorrowDetails">{{detailData1.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0;"><span class="span1">借阅事由</span></div></el-col>
                        <el-col :span="21" >
                            <div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto" v-if="typeOld==='oneLeft'">
                                {{clickedRow.lookupDescription }}
                             </div>
                            <div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto" v-if="typeOld==='oneRight'">
                                {{clickedRow.up.lookupDescription }}
                            </div>
                        </el-col>
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
                    <el-table border tooltip-effect="dark" style="width: 100%" stripe :data="processDataList" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{processDataList.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="auditUserRole" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="auditRemark" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="auditUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate" :formatter="timeFormat" label="审批时间" width="200">
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
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrowHistoryLen.service';
    import treeChange from '../../../utils/treeChange';
    import moment from 'moment';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        bodyHeight1: number;
        oaHeight: number;
        nameHeight: number;
        textAtext : string;
        applicationNo: string;
        typeOld : string;
        timer: boolean;
        stepMap:any=[];
        dataDetail : any = [];
        listLoading: boolean;
        start: number;
        titleName : string;
        titleDanwei : string;
        titleBumen : string;
        titleCount : string;
        total: number;
        page: number;
        limit: number;
        treeParamsId: number;
        dataCompany: any = [];
        leafName: any = [];
        checkNameForm: any = {};
        filters: any = {};
        basicForm: any = {};
        pickerOptions: any = {};
        dateOptions: any = {};
        allParams:any = {};
        list: any = [];
        list1: any = [];
        processDataList: any = [];
        data: any = [];
        dataOa: any = [];
        tableHeadArrs: any = [];
        defaultTrees: any = [];
        dataName: any = [];
        tree: any = [];
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        clickedRow: any = {};
        detailData1: any = [];
        clickedRow1: any = {};
        type: string;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.bodyHeight1 = 300;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.applicationNo = null;
            this.detailData1 = [];
            this.stepMap=[];
            this.typeOld = null;
            this.timer = false;
            this.clickedRow = {};
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.titleName ="关于xxx的标题"
            this.titleDanwei = "投资部门"
            this.titleBumen = "行政部门"
            this.titleCount = "7"
            this.treeParamsId = 0;
            this.textAtext = "投资部门投资部门投资部门投资部门"
            this.listLoading = false;
            this.type = '';
            this.dataDetail = [{
                year: '2016-05-01',
                planName: '345543',
                displayName: '项目立项批文',
                fondsCode: '京发改[2013]425号',
                auther: '北京万方置业有限公司',
                otherAuther: '北京市发展和改革委员会',
                attachment: '北京市住房和城乡',
                projectName: '北京通州万达广场',
            }]
        }
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
                applicationNo: this.clickedRow.applicationNo
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
            if(this.clickedRow){
                let params = {
                    applicationNo:this.clickedRow.applicationNo
                };
                Service.borrowCheckTable(params).then((res) =>{
                    if(res.data.succeeded){
                        this.processDataList = res.data.data;
                    }else{
                        this['$message']({
                            message: '加载审批列表失败！',
                            type: 'error'
                        });
                    }
                })
            }
        }
             //时间格式化
        dateFormat(date) {
            if(date){
                return moment(date).format("YYYY-MM-DD");
            }else{
                return '';
            }
        }
        timeFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
        clickJCBtn(){
            this['$router'].push({
                name:'借出档案管理借出页面'
            });
        }
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
            window.sessionStorage.removeItem('clickedRow');
            window.sessionStorage.removeItem('_type');
            if(window.sessionStorage.getItem('backHis')==='1'){
                this['$router'].go(-1);
                window.sessionStorage.removeItem('backHis');
            }else{
                this['$router'].push({
                    path:'/selfTip/borrowHistory',
                })
            }
        };
        electricBorrowDetail(row){
            var obj = {appNo:this.applicationNo,archiveId:row.id,libId:row.libId,MJ:'1'}
            window.sessionStorage.setItem('XiangDetail',JSON.stringify(obj));
            this['$router'].push({
                path:'/@/views/fileArrange/fileManagement/infile/XiangDetail',
            })
        }
        created(){
            this.applicationNo =  window.sessionStorage.getItem('applicationNo');
            //获取审批流程
            let parame = {applicationNo:this.applicationNo};
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
            this.typeOld = window.sessionStorage.getItem('type');
            if(this.typeOld==='oneLeft'){
                this.clickedRow = JSON.parse(window.sessionStorage.getItem('clickedRow'));// this['$route'].params.clickedRow;
            }else{
                this.clickedRow  = JSON.parse(window.sessionStorage.getItem('clickedRow'));
            }
            if(this.typeOld==='oneLeft'&& window.sessionStorage.getItem('typeOnly')==='only'){
                let parame = {applicationNo:this.applicationNo};
                Service.getUtilizeLookup(parame).then((res) =>{
                    if(res.data.succeeded){
                        this.clickedRow = res.data.data;
                        console.log(this.clickedRow);
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
            }
            this.type = window.sessionStorage.getItem('_type');
            this.getHeader();
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                    this.oaHeight = (document.documentElement.clientHeight-100)/2-50;
                })()
            };
            //获取原审批详情
            if(this.clickedRow.parentAppNo){
                let parame = {applicationNo:this.clickedRow.parentAppNo};
                Service.getUtilizeLookup(parame).then((res) =>{
                    if(res.data.succeeded){
                        this.detailData1 = res.data.data;
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
            }
            this.borrowCheckTable();

        };
    }
</script>

<style lang="scss" scoped>
     @import '../../../styles/selfTip/borrowerHistoryLen';
</style>