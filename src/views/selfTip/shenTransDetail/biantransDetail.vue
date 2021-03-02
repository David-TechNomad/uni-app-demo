<template>
    <section>
        <div class="mainTitle">
            <span>档案员变更申请</span>
            <el-button class="checkWay rt" @click="back">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号：<b>{{allData.archivist.applyNum}}</b>
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                <el-row>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题</span></div></el-col>
                  <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{allData.archivist.title}}</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{allData.archivist.applyUserName}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{allData.archivist.applyPartName}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请时间</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{dateFormat1(allData.archivist.applyTime)}}</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">变更后档案员</span></div></el-col>
                  <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{allData.archivist.changeUserName}}</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">变更事由</span></div></el-col>
                  <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding-left:10px;line-height:30px">{{allData.archivist.applyReason}}</div></el-col>
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
                             <!-- <span class="span1" style="font-size:2px">
                                   <span v-for="(item,index) in allData.processList" style="line-height:35px;font-size:14px">
                                     {{item.stepName}}【{{item.auditUserName}} 
                                     <span v-if="item.auditResult == 1"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span>】<span v-if ="index != allData.processList.length-1" ><img style="width:20px;vertical-align: middle;" src="../../../imgs/arrow.png"></span>
                                </span>
                             </span> -->
                             <span class="span1" style="font-size:2px">
                                   <span v-for="(item,index) in allData.processList" style="line-height:35px;font-size:14px">
                                     {{item.stepName}}【{{item.auditUserName}} 
                                     <span v-if="item.auditResult == 1"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span>
                                     <span v-if="item.auditResult == 2"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>
                                     】<span v-if ="index != allData.processList.length-1" ><img style="width:20px;height:20px;vertical-align: top;" src="../../../imgs/arrow.png"></span>
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
                    <el-table border tooltip-effect="dark" style="width: 100%" stripe :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{dataDetail.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="stepName" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="auditRemark" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="auditUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate"  label="审批时间" :formatter="dateFormat" width="200">
                            </el-table-column>
                            <el-table-column prop="businessType" label="操作" width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.businessType === '0'">审批</span>
                                    <span v-if="scope.row.businessType === '1'">转发</span>
                                    <span v-if="scope.row.businessType === '2'">申请</span>
                                    <span v-if="scope.row.businessType === '3'">加签</span>
                                    <span v-if="scope.row.businesstype === '4'">批注</span>
                                    <span v-if="scope.row.businesstype === '5'">加签审核</span>
                                    <span v-if="scope.row.businessType === '6'">抄送</span>
                                    <span v-if="scope.row.businesstype === '7'">重新提交</span>
                                    <span v-if="scope.row.businessType === '8'">驳回</span>
                                    <span v-if="scope.row.businessType === '10'">关闭</span>
                                </template> 
                            </el-table-column>
                            <el-table-column prop="receiveUserName" label="接收人" width="120">
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
    import Service from './shenTransDetail.service';
    import treeChange from '../../../utils/treeChange';
    import moment from 'moment';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        timer: boolean;
        dataDetail : any = []
        listLoading: boolean;
        start: number;
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
        data: any = [];
        dataOa: any = [];
        tableHeadArrs: any = [];
        defaultTrees: any = [];
        dataName: any = [];
        tree: any = [];
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        allData : any = {};
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
            this.listLoading = false;
            this.allData = {}
            this.dataDetail = []
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
             this['$router'].go(-1);
            // this['$router'].push({
            //    path:'/selfTip/transfer',
            // })
        };
        created(){
        };
         dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
         dateFormat1(data) {
            if (data == undefined) {
                return "";
            }
            return moment(data).format("YYYY-MM-DD");
        }
        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                    this.oaHeight = (document.documentElement.clientHeight-100)/2-50;
                })()
            };
            Service.getRecordById({
                id: JSON.parse(window.sessionStorage.getItem('BDbiantransDetail')).toString()
            }).then(res=>{
                if(res.data.succeeded == true ){
                    console.log(res.data.data)
                    this.allData = res.data.data;
                    this.dataDetail = res.data.data.allProcessList;


                }
            })
        
        };
    }
</script>

<style lang="scss" scoped>
     @import '../../../styles/transferDetail/transferDetail';
</style>