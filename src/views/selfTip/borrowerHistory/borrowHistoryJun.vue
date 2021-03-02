<template>
    <section>
         <div class="titleBlue">
            <b></b>
            <span>借出档案</span>
        </div>
        <div class="doubleBox">
            <div class="borderTable">
                <div style="width:100%;height:50px;background:#fff">
                    <p style="padding:5px 12px;float:left"><span style="line-height:40px"></span>待借出 <span style="line-height:40px">共{{toBorrowTableData.length}}份</span></p>
                <el-form style="float:right;margin-top:5px;margin-right:20px;">
                    <el-form-item>
                        <!-- <el-input class="checkName"  v-model="toBorrow_condition" style="width:153px;" clearable placeholder=""></el-input> -->
                        <el-select class="checkName" v-model="toBorrow_condition">
                            <el-option label="未借出" value="1"></el-option>
                            <el-option label="待归还" value="2"></el-option>
                            <el-option label="已归还" value="3"></el-option>
                            <el-option label="已取消" value="4"></el-option>
                        </el-select>
                        <el-button class="checkWay" @click="searchToBorrowData"  placeholder="请输入原文名称">搜索</el-button>
                    </el-form-item>
                </el-form>
                </div>
            <el-table border tooltip-effect="dark"  v-if="type!= 'batch'&&type!='batch1'" style="width: 100%" :height="bodyHeight" :data="toBorrowTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable"  @selection-change="selsChangeLeft">
                    <el-table-column  type="selection" :selectable="checkSelect" width="55" label="#" fixed>
                    </el-table-column> 
                    <el-table-column width="250"  label="档号" >
                        <template slot-scope="scope">{{scope.row.archiveDH}}
                        </template>
                    </el-table-column> 
                    <el-table-column width="300"  label="文件标题" >
                        <template slot-scope="scope">{{scope.row.archiveTM}}
                        </template>
                    </el-table-column> 
                    <el-table-column width="300"  label="项目名称" >
                        <template slot-scope="scope">{{scope.row.archiveXMMCNEW}}
                        </template>
                    </el-table-column> 
                    <el-table-column    label="状态" >
                        <template slot-scope="scope">
                            <!-- 1:未借出，2：待归还，3：已归还,4:已取消,5:部分借出，6：部分归还 -->
                            <span v-if="scope.row.arcStatus == 1">未借出</span>
                            <span v-if="scope.row.arcStatus == 2">待归还</span>
                            <span v-if="scope.row.arcStatus == 3">已归还</span>
                            <span v-if="scope.row.arcStatus == 4">已取消</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="130">
                        <template slot-scope="scope">
                            <span class="addBtn" v-if="scope.row.arcStatus == 1" @click="cancelArchiveOfToBorrow(scope.row,scope.$index)">取消</span>
                        </template>
                    </el-table-column>
            </el-table>
                <el-table border tooltip-effect="dark"  v-if="type=='batch1'" style="width: 100%" :height="bodyHeight" :data="toBorrowTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable"  @selection-change="selsChangeLeft">
                    <el-table-column  type="selection" :selectable="checkSelect" width="55" label="#" fixed>
                    </el-table-column>
                    <el-table-column width="250"  label="档号" >
                        <template slot-scope="scope">{{scope.row.archiveDH}}
                        </template>
                    </el-table-column>
                    <el-table-column width="300"  label="文件标题" >
                        <template slot-scope="scope">{{scope.row.archiveTM}}
                        </template>
                    </el-table-column>
                    <el-table-column width="300"  label="项目名称" >
                        <template slot-scope="scope">{{scope.row.archiveXMMCNEW}}
                        </template>
                    </el-table-column>
                    <el-table-column    label="状态" >
                        <template slot-scope="scope">
                            <!-- 1:未借出，2：待归还，3：已归还,4:已取消,5:部分借出，6：部分归还 -->
                            <span v-if="scope.row.arcStatus == 1">未借出</span>
                            <span v-if="scope.row.arcStatus == 2">待归还</span>
                            <span v-if="scope.row.arcStatus == 3">已归还</span>
                            <span v-if="scope.row.arcStatus == 4">已取消</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="130">
                        <template slot-scope="scope">
                            <span class="addBtn" v-if="scope.row.arcStatus == 1" @click="cancelArchiveOfToBorrow(scope.row,scope.$index)">取消</span>
                        </template>
                    </el-table-column>
                </el-table>
            <el-table border tooltip-effect="dark"  v-if="type=='batch'" style="width: 100%" :height="bodyHeight" :data="toBorrowTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable"  @selection-change="selsChangeLeft">
                    <el-table-column  type="selection" :selectable="checkSelect" width="55" label="#" fixed>
                    </el-table-column> 
                    <el-table-column width="250"  label="档号" >
                        <template slot-scope="scope">{{scope.row.archiveDH}}
                        </template>
                    </el-table-column> 
                    <el-table-column width="300"  label="文件标题" >
                        <template slot-scope="scope">{{scope.row.archiveTM}}
                        </template>
                    </el-table-column> 
                    <el-table-column width="300"  label="项目名称" >
                        <template slot-scope="scope">{{scope.row.archiveXMMCNEW}}
                        </template>
                    </el-table-column> 
                    <el-table-column    label="状态" >
                        <template slot-scope="scope">
                            <!-- 1:未借出，2：待归还，3：已归还,4:已取消,5:部分借出，6：部分归还 -->
                            <span v-if="scope.row.arcStatus == 1">未借出</span>
                            <span v-if="scope.row.arcStatus == 2">待归还</span>
                            <span v-if="scope.row.arcStatus == 3">已归还</span>
                            <span v-if="scope.row.arcStatus == 4">已取消</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="130">
                        <template slot-scope="scope">
                            <span class="addBtn" v-if="scope.row.arcStatus == 1" @click="cancelArchiveOfToBorrow(scope.row,scope.$index)">取消</span>
                        </template>
                    </el-table-column>
            </el-table>
        </div>
    </div>
    <div class="foot" style="float:right;margin:10px;">
        <el-button type="primary" class="checkWay" @click="saveBorrowDatas">确定</el-button>
        <el-button type="primary" class="checkWay" @click="goBack">取消</el-button>   
    </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrowHistoryJun.service';
    @Component
    export default class appBorrowHistory extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        timer: boolean;
        listLoading: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        toBorrowTableDataBak: any = [];
        toBorrowTableDataBak1: any = [];
        toBorrowTableData: any = [];
        toBorrowTotal: number;
        borrowedTableData : any = [];
        borrowedTableDataBak: any = [];
        borrowedTableDataBak1: any = [];
        borrowedTotal: number;
        tableHeadArrs: any = [];
        tableDetailData: any;
        selLeft: any = [];
        selRight: any = [];
        type: string;
        clickedRow: any= {};
        toBorrow_condition: string;
        borrowed_condition: string;
        showBatchSelection: any = [];

        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight -230 ;
            this.nameHeight = null;
            this.timer = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.listLoading = false;
            this.toBorrowTotal = 0;
            this.borrowedTotal = 0;
            this.type = '';
            this.selLeft = [];
            this.toBorrow_condition = '';
            this.borrowed_condition = '';
        };

        selsChangeLeft(sel){
            this.selLeft = sel;
        }
        checkSelect(row){
            if(row){
                return row.arcStatus==1
            }
        };
        searchToBorrowData(){
            var con = this.toBorrow_condition;
            if(con){
                this.toBorrowTableData = this.toBorrowTableDataBak.filter(item => item.arcStatus==Number(con));
                this.toBorrowTableDataBak = this.toBorrowTableDataBak1.slice(0) ;
            }else{
                this.toBorrowTableData = this.toBorrowTableDataBak1.slice(0) ;
            }
        };
        goBack(){
             if(this.type == 'detail' ){
                 this['$router'].go(-1);
             }else if(this.type == 'batch'){
                window.sessionStorage.setItem('selectionsByArchiveNo','');
                window.sessionStorage.setItem('_type', '');
                this['$router'].go(-1);
            }else{
                window.sessionStorage.setItem('clickedRow', '');
                window.sessionStorage.setItem('_type', '');
                this['$router'].go(-1);
            }
        }
        returnBorrowHom(){
            window.sessionStorage.setItem('clickedRow', '');
            window.sessionStorage.setItem('_type', '');
            this['$router'].push({
                path:'/selfTip/borrowHistory'
            });
        }
        saveBorrowDatas(){
            var me = this;
            var params = [];
            if( this.selLeft.length == 0){
                this['$message']({
                    message: '请选择借阅数据！',
                    type: 'warning'
                });
                return;
            }else{
                    this.selLeft.forEach(function(item){
                        let param = {
                            applicationNo:'',
                            libId:null,
                            objectId:null
                        };
                        param.applicationNo = item.applicationNo;
                        param.libId = item.libId;
                        param.objectId = item.objectId;
                        params.push(param);
                    });
                Service.saveBorrowDatas(params).then((res) =>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '借出成功！',
                            type: 'success'
                        });
                        me.returnBorrowHom();
                    }else{
                        this['$message']({
                            message: '借出失败！',
                            type: 'error'
                        });
                    }
                });
            }
        };
        cancelArchiveOfToBorrow(row){
            var me =  this;
            var params = {};

            params.applicationNo = row.applicationNo;
            params.objectId = row.objectId;
            params.libId = row.libId;

            Service.cancelOriFileOfToBorrow(params).then((res) =>{
                if(res.data.succeeded){
                    this['$message']({
                        message: '取消成功！',
                        type: 'success'
                    });
                    me.getToBorrowDatas();
                    if(me.type=='single'||me.type=='detail'){
                        me.getToBorrowDatas();
                    }else if(me.type=='batch'){
                        me.showBatchSelection[me.showBatchSelection.indexOf(row)].arcStatus=4;
                    }
                }else{
                    this['$message']({
                        message: '取消失败！',
                        type: 'error'
                    });
                }
            });
        };
        // 待借阅列表初始化
        getToBorrowDatas(){
            var type = window.sessionStorage.getItem('_type');
            this.type = type;
            var me = this;
            if(type == 'single' || type == 'detail' ){
                let params = {
                    applicationNo: this.clickedRow.applicationNo,
                    processNo:this.clickedRow.processNo
                };
                Service.borrowFileTable(params).then((res) =>{
                    if(res.data.succeeded){
                        me.toBorrowTableData = res.data.data;
                        me.toBorrowTableDataBak = me.toBorrowTableData.slice(0);
                        me.toBorrowTableDataBak1 = me.toBorrowTableData.slice(0);
                        me.toBorrowTotal = this.toBorrowTableData.length;
                        me.listLoading = false;
                    }else{
                        me['$message']({
                            message: '加载档案列表失败！',
                            type: 'error'
                        });
                    }
                })
            }else if(type == 'batch'){
                var selection = JSON.parse(window.sessionStorage.getItem('selectionsByArchiveNo'));//this['$route'].params.selectionsByArchiveNo;
                var realSels = [];
                var archiveIds= [];
                // 按照档号Id过滤数据
                for(var sel of selection){
                    if(archiveIds.indexOf(sel.id) == -1){
                        archiveIds.push(sel.id);
                        realSels.push(sel);
                    }
                }
                me.listLoading = true;
                Service.getToBorrowFilesListByArchivesMsg(realSels).then((res) =>{
                    if(res && res.data && res.data.succeeded){
                        var returnResult = [];
                        var result = res.data.data;//数据中有空
                        for(var da of result){
                            if(da){
                                returnResult.push(da);
                            }
                        }

                        me.toBorrowTableData = returnResult;
                        me.toBorrowTableDataBak = me.toBorrowTableData.slice(0); 
                        me.toBorrowTableDataBak1 = me.toBorrowTableData.slice(0); 
                        this.toBorrowTotal = this.toBorrowTableData.length;
                        me.listLoading = false;
                    }else{
                        this.listLoading = false;
                        this['$message']({
                            message: '查询列表失败！',
                            type: 'error'
                        });
                    }
                });
            }else if(type == 'batch1'){
                let selection = JSON.parse(window.sessionStorage.getItem('selectionsByArchiveNo'));
                me.toBorrowTableData = selection
            }
        };
        getHeader():void {
            Service.borrowFileHead({}).then((res) => {
                if (res.data.succeeded) {
                    this.tableHeadArrs = res.data.data;
                    //this.getToBorrowDatas();
                } else {
                    this['$message']({
                        message: '加载表格列配置失败！',
                        type: 'error'
                    });
                }
            })
        }
        created(){
            this.type = window.sessionStorage.getItem('_type');
            if(this.type=='single' || this.type == 'detail'){
                this.clickedRow = JSON.parse(window.sessionStorage.getItem('clickedRow'));// this['$route'].params.clickedRow;
            }
            this.getToBorrowDatas();
//            processNo
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                })()
            };
            // this.getToBorrowDatas();
        };
    }
</script>

<style lang="scss" scoped>
   @import '../../../styles/selfTip/borrowHistoryJun.scss';
</style>