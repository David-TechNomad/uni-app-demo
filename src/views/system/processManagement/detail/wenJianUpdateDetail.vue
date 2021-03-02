<template>
    <section>
        <div class="mainTitle">
            <span>流程实例修改</span>
            <el-button class="checkWay rt" @click="back">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号：{{detailData.transferLookup.applicationNo}}
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">标题</span></div></el-col>
                        <el-col :span="21"><div class="grid-content bg-purple-light"><span class="span2">{{detailData.transferLookup.title}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-bottom:1px solid #ccc"><span class="span1">申请人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;border-bottom:1px solid #ccc"><span class="span2">{{detailData.transferLookup.applyPerson}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-right:0;border-bottom:1px solid #ccc;"><span class="span1">申请人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;border-bottom:1px solid #ccc;"><span class="span2">{{detailData.transferLookup.applyDept}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-right:0;border-bottom:1px solid #ccc;"><span class="span1">申请时间</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:1px solid #ccc;border-bottom:1px solid #ccc;"><span class="span2">{{detailData.transferLookup.applyDate}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <div v-show="tranferType">
                            <el-col :span="3"><div class="grid-content bg-purple" style="border-top:0"><span class="span1">接收单位</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;border-top:0"><span class="span2">{{detailData.transferLookup.acceptOrg}}</span></div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple" style="border-top:0"><span class="span1">接收部门</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0;border-top:0"><span class="span2">{{detailData.transferLookup.acceptDept}}</span></div></el-col>
                        </div>
                        <el-col :span="3"><div class="grid-content bg-purple" style="border-top:0"><span class="span1">移交数量</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-top:0"><span class="span2">{{detailData.transferLookup.transferCount}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">移交说明</span></div></el-col>
                        <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto;">{{detailData.transferLookup.transferMemo}}</div></el-col>
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
                        <el-table tooltip-effect="dark" style="width: 100%" stripe max-height="300" :data="data" highlight-current-row class="indexTable containTable">
                            <template v-for="file in tableHeadArrs">
                                <el-table-column :width="file.width" :prop="file.fieldName" :label="file.caption">
                                </el-table-column>
                            </template>
                            <el-table-column v-if="tableHeadArrs.length>0" label="操作" width="120">
                                <template slot-scope="scope">
                                    <span class="addBtn" @click="electricBorrowDetail(scope.row)">详情</span>
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
                                <span class="span3">
                                    <span v-for="(item,index) in stepMap">
                                        {{item.stepName}}【{{item.userName}}<span v-if="item.stepType==1"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span><span v-if="item.stepType==2"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>】<span v-if="index != stepMap.length-1"><img style="width:20px;height:20px;vertical-align: top;" src="../../../../imgs/arrow.png"></span>
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
                    <el-table tooltip-effect="dark" style="width: 100%" stripe :data="recordData" highlight-current-row class="indexTable containTable">
                        <el-table-column label="序号" width="70px">
                            <template slot-scope="scope">
                                {{recordData.length-scope.$index}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="stepName" label="审批节点">
                        </el-table-column>
                        <el-table-column prop="ApprovalContext" label="签字意见" width="350px">
                        </el-table-column>
                        <el-table-column prop="stepUserName" label="审批人">
                        </el-table-column>
                        <el-table-column prop="auditDate" :formatter="dateFormat1" label="审批时间" width="200">
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
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from '../processManagement.service';
    import moment from 'moment';
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
        tranferType:boolean;
        treeParamsId: number;
        oaHeight: number;
        i: number;
        hangData: any = {};
        tableHangData: any = {};
        yijianInput: boolean;
        flagObj: any = {};
        basicForm: any = {};
        stepData: any = [];
        rank: number;
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
            this.fileVisible = false;
            this.peopleVisible = false;
            this.tranferType = false;
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
            this.stepData = [];
            this.treeLoading = false;
            this.comLoading = false;
            this.treeParamsId = 0;
            this.i = 0;
            this.hangData = {};
            this.tableHangData = {};
            this.yijianInput = false;
            this.flagObj = {};
            this.rank = 0;
            this.basicForm = {
                title:'',
                createDateStart:'',
                createDateEnd:'',
                day:'',
                things:'',
                name:'',
                company:'',
                date:''
            };
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

        getInfo(){
            let parames = {transferId:this.row.id,transferStatus:this.row.status}
            Service.queryFileTransferTaskDetail(parames).then((res) =>{
                this.detailData = res.data.data;
                this.recordData = res.data.data.Approval;
                this.stepMap = res.data.data.stepMap;
                this.tableHeadArrs = res.data.data.listColumns;
                this.data = res.data.data.archives;
                this.rank = res.data.data.rank;
                for(let child of res.data.data.stepMap){
                    let obj = {
                        processId:child.processId,
                        stepName:child.stepName,
                        stepType:child.stepType,
                        userId:child.userId,
                        userName:child.userName
                    };
                    this.stepData.push(obj);
                }
                if(this.detailData.transferLookup.tranferType === '1'){
                    this.tranferType = false;
                }else if(this.detailData.transferLookup.tranferType === '2'){
                    this.tranferType = true;
                }
            })
        }

        submitForm(roleFrom){
            this.stepMap = [];
            for(let child of this.stepData){
                let obj = {
                    processId:child.processId,
                    stepName:child.stepName,
                    stepType:child.stepType,
                    userId:child.userId,
                    userName:child.userName
                };
                this.stepMap.push(obj);
            }
            this.fileVisible = false;
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

        bianji(obj){
            this.$set(this.flagObj,'check'+obj.id,true);
        }
        baocun(obj){
            this.$set(this.flagObj,'check'+obj.id,false);
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


        // 详情
        electricBorrowDetail(row){
            //案卷
            if(this.rank == 3){
                let obj={
                    libId:this.detailData.libId,
                    fondId:this.detailData.fondId,
                    kindId:this.detailData.kindId,
                    SrcId:row.id,
                    type:this.detailData.transferLookup.tranferType
                };
                window.sessionStorage.setItem('Tofiledetail',JSON.stringify(obj));
                 this['$router'].push({
                     path:'/selfTip/fileDetail',
                 })
            }else if(this.rank == 4){//文件
                let obj={
                    Srclib:this.detailData.libId,
                    SrcId:row.id,
                    type:this.detailData.transferLookup.tranferType
                };
                window.sessionStorage.setItem('ToWjDetail',JSON.stringify(obj));
                this['$router'].push({
                     path:'/selfTip/WjDetail',
                 })
            }


        }

        created(){
            this.row = JSON.parse(window.sessionStorage.getItem('zYiJiaoData'));
        }
        mounted(){
            this.getInfo();
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../../styles/system/processManagement/processManagementUpdate';
</style>