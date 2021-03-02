<template>
    <section>
      <section>
        <div class="mainTitle">
            <span>档案借阅申请</span>
            <el-button class="checkWay rt" @click="back">返回</el-button>
            <!--<el-button class="checkWay rt" @click="clickGHBtn">归还</el-button>-->
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
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light">
                      <span class="span2" v-if="typeOld==='twoLeft'">{{clickedRow.title}}</span>
                      <span class="span2" v-if="typeOld==='twoRight'">{{clickedRow.up.title}}</span>
                  </div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">借阅方式：</span></div></el-col>
                  <el-col :span="5">
                      <div class="grid-content bg-purple-light">
                      <span v-if="clickedRow.appType == 1" class="span2">电子</span>
                      <span v-else class="span2">实体</span></div>
                </el-col>
                </el-row>
                <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="typeOld==='twoLeft'">{{clickedRow.userName}}</span>
                            <span class="span2" v-if="typeOld==='twoRight'">{{clickedRow.up.userName}}</span>
                        </div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="typeOld==='twoLeft'">{{clickedRow.userDept}}</span>
                            <span class="span2" v-if="typeOld==='twoRight'">{{clickedRow.up.userDept}}</span>
                        </div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请时间</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light">
                            <span class="span2" v-if="typeOld==='twoLeft'">{{dateFormat(clickedRow.appDate)}}</span>
                            <span class="span2" v-if="typeOld==='twoRight'">{{dateFormat(clickedRow.up.appDate)}}</span>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="typeOld==='twoLeft'">{{dateFormat(clickedRow.appStartDate)}}</span>
                            <span class="span2" v-if="typeOld==='twoRight'">{{dateFormat(clickedRow.up.appStartDate)}}</span>
                        </div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划归还日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0">
                            <span class="span2" v-if="typeOld==='twoLeft'">{{dateFormat(clickedRow.appEndDate)}}</span>
                            <span class="span2" v-if="typeOld==='twoRight'">{{dateFormat(clickedRow.up.appEndDate)}}</span>
                        </div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅天数</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light">
                            <span class="span2" v-if="typeOld==='twoLeft'">{{clickedRow.days}} 天</span>
                            <span class="span2" v-if="typeOld==='twoRight'">{{clickedRow.up.days}} 天</span>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">借阅事由</span></div></el-col>
                        <el-col :span="21">
                            <div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;" v-if="typeOld==='twoLeft'">
                                {{clickedRow.lookupDescription }}
                            </div>
                            <div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;" v-if="typeOld==='twoRight'">
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
                        <el-table style="width: 100%" border @selection-change="selsChange" stripe :max-height="300" :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
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
    import Service from './backListWin.service';
    import treeChange from '../../../utils/treeChange';
    import moment from 'moment';
    @Component
    export default class appbackListWin extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        textAtext : string;
        typeOld : string;
        timer: boolean;
        dataDetail : any = [];
        stepMap:any=[];
        listLoading: boolean;
        start: number;
        titleName : string;
        applicationNo: string;
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
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.applicationNo = null;
            this.nameHeight = null;
            this.typeOld = null;
            this.stepMap=[];
            this.timer = false;
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
            let params = {
                applicationNo: this.clickedRow.applicationNo
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
        clickGHBtn(){
            this['$router'].push({
                name:'归还档案管理详细页面'
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
        applySubmit(){

        }
        back():void{
            // this['$router'].go(-1);
            window.sessionStorage.setItem('clickedRow','');
            window.sessionStorage.setItem('_type', '');
            this['$router'].push({
                path:'/selfTip/borrowHistory'
            });
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
            this.typeOld = window.sessionStorage.getItem('type');
            this.clickedRow =  JSON.parse(window.sessionStorage.getItem('clickedRow'));//this['$route'].params.clickedRow;
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
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                    this.oaHeight = (document.documentElement.clientHeight-100)/2-50;
                })()
            };
            this.getHeader();
            this.borrowCheckTable();
        
        };
    }
</script>

<style lang="scss" scoped>
     @import '../../../styles/selfTip/borrowerHistoryLen';
</style>