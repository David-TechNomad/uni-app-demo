<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            <span>档案跨全宗移交申请</span>
            <el-button class="checkWay rt" v-if="!closeTrue && fanhui" @click="back">返回</el-button>
            <el-button class="checkWay rt" v-if="closeTrue && fanhui" @click="Tofile">关闭</el-button>
            <el-button class="checkWay rt" @click="dayin">打印</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号：{{totalData.applicationNo}}
                    <span style="color:red">  审批到线下移交归档节点时，需将实体档案进行线下移交</span>
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                     <el-row>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题：</span></div></el-col>
                  <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{totalData.title}}</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{totalData.applyPerson}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{totalData.applyDept}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1" >申请时间：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{totalData.applyDate}}</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{totalData.acceptOrg}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">接收部门：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" ><span class="span2">{{totalData.acceptDept}}</span></div></el-col>
                </el-row>
                <el-row>
                  <!-- <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{totalData.acceptOrg}}</span></div></el-col>
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">接收部门：</span></div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{totalData.acceptDept}}</span></div></el-col> -->
                  <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">移交数量：</span></div></el-col>
                  <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{totalData.transferCount}}</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">移交说明：</span></div></el-col>
                  <el-col :span="21"><div class="grid-content1 bg-purple-light" style="line-height:30px;padding-left:10px;overflow-y:scroll">{{totalData.transferMemo}}</div></el-col>
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
                    <el-table border style="width: 100%" stripe max-height='300' :data="listData" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                        <!-- <el-table-column width="55" fixed>
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="year" label="档号">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="displayName" label="案卷号">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="案卷提名">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="项目名称">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="项目编号">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="起止日期">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="所属部门">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="卷内文件数">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="总页数">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="分类号">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="年度">
                        </el-table-column> -->
                        <el-table-column  :key="item.fieldName" :prop="item.fieldName" :label="item.caption" v-for='item in tableList'>
                        </el-table-column>
                        
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="electricBorrowDetail(scope.$index, scope.row)">详情</span>
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
                             <span class="span1" style="font-size:2px">
                                 <span v-for="(item,index) in dataMap" style="line-height:35px;font-size:14px">
                                     {{item.stepName}}【{{item.userName}} 
                                     <span v-if="item.stepType == 1"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span>
                                     <span v-if="item.stepType == 2"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>
                                     】<span v-if ="index != dataMap.length-1" ><img style="width:20px;height:20px;vertical-align: middle;" src="../../../imgs/arrow.png"></span>
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
                            <el-table-column prop="ApprovalContext" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="stepUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate"  label="审批时间" :formatter="dateFormat" width="200">
                            </el-table-column>
                            <el-table-column prop="auditOperate" label="操作" width="120">
                            </el-table-column>
                            <el-table-column prop="nextAduitPerson" label="接收人" width="120">
                            </el-table-column>
                        </el-table>
                </div>
                </div>
            </div>
        </div>
        <!-- 打印弹框 -->
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
    import Service from './kuaQuanZongDetails.service';
    import treeChange from '../../../utils/treeChange';
    import moment from 'moment';
    import base from '@/scrollLoad';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        timer: boolean;
        dataDetail : any = []
        tableList : any = [];
        listLoading: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        treeParamsId: number;
        processId:number;
        parameOne:number;
        marginSize:number;
        fanhui:boolean;
        dataCompany: any = [];
        leafName: any = [];
        checkNameForm: any = {};
        filters: any = {};
        basicForm: any = {};
        pickerOptions: any = {};
        dateOptions: any = {};
        dataMap : any = {};
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
        totalData : any = {};
        listData :  any = [];
        SrcRank:number;
        SrcLib:number;
        SrcFond:number;
        SrcKind:number;
        closeTrue:boolean;
        dialogVisible:boolean;
        row:any = {};
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
            this.parameOne = 0;
            this.marginSize = 0;
            this.fanhui = false;
            this.listLoading = false;
            this.dataDetail = [];
            this.closeTrue = false;
            this.dialogVisible = false;
        }
         //打印
        dayin(){     //rank=3 案卷  rank=4 文件  this.detailData.transferLookup.tranferType=1 文件移交  this.detailData.transferLookup.tranferType=2  跨全宗移交
            if(this.SrcRank == 3){
                this.dialogVisible = true;
            }else{
                this.print(this.totalData.tranferType);
            }
        }

        dayinYes(){
            if(this.totalData.tranferType == '1'){//文件移交
                this.print(11);
            }else{//跨全宗移交
                this.print(22);
            }
            this.dialogVisible = false;
        }

        dayinNo(){
            this.print(this.totalData.tranferType);
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
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
        back():void{
            // this['$router'].go(-1);
              this['$router'].push({
                    path:'/selfTip/transfer',
              })
        };
        Tofile(){
            this['$router'].push({
                path:'/fileArrange/archivesManagent',
            })
        }
        electricBorrowDetail(index,row){
            if(this.SrcRank==3){
                var obj={
                    libId:this.SrcLib,
                    fondId:this.SrcFond,
                    kindId:this.SrcKind,
                    SrcId:row.id,
                    type:2
                };
                window.sessionStorage.setItem('Tofiledetail',JSON.stringify(obj))
                this['$router'].push({
                    path:'/selfTip/filedetail',
                    name:'移交详情',
                });
            }else if(this.SrcRank==4){
                var objs = {
                    Srclib:this.SrcLib,
                    SrcId:row.id,
                    type:2
                }
                window.sessionStorage.setItem('ToWjDetail',JSON.stringify(objs));
                this['$router'].push({
                    path:'/selfTip/WjDetail'
                });
            }
              // this['$router'].push({
              //           path:'/selfTip/eleTransforDetail/eleTransferDetail',
              //           name:'单个档案详情',
              //           })
        }
        created(){
            this.row = JSON.parse(window.sessionStorage.getItem('KQkuaQuanZongDetails')); 
            let url = window.location.href;
            if(url.indexOf("transferId") > 0){
                this.processId = 1;
                if(url.split('?')[2]){
                    let bb = (url.split('?')[2]);
                    let pb = bb.substr(bb.indexOf("=")+1);
                    let b = base['base64'].decode(
                        JSON.stringify(pb)
                    );
                    this.parameOne = parseInt(b);//参数1
                }
                this.marginSize = -50;
            }else{
                this.processId = 0;
                this.fanhui = true;
            }
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                    this.oaHeight = (document.documentElement.clientHeight-100)/2-50;
                })()
            };

            let kuaquan;
            let id;
            if(this.processId == 0){
                kuaquan = JSON.parse(window.sessionStorage.getItem('KQkuaQuanZongDetails'));
                id = kuaquan.id;
            }else{
                id = this.parameOne;
            }

            if(kuaquan != undefined && kuaquan.type){
                this.closeTrue = true;
            };
            Service.fileTransfer({"transferId":id}).then(res=>{
                this.dataMap = res.data.data.stepMap;
                this.totalData = res.data.data.transferLookup;
                this.tableList = res.data.data.listColumns;
                this.listData = res.data.data.archives;
                this.dataDetail = res.data.data.Approval;
                this.SrcRank = res.data.data.rank;
                this.SrcLib = res.data.data.libId;
                this.SrcFond = res.data.data.fondId;
                this.SrcKind = res.data.data.kindId;
            })

        };
    }
</script>

<style lang="scss" scoped>
     @import '../../../styles/transferDetail/transferDetail';
</style>