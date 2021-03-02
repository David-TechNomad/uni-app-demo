<template>
    <section>
        <div class="titleBlue">
            <b></b>
            <span>归还档案</span>
        </div>
        <div class="doubleBox">
            <div class="borderTable">
                <div style="width:100%;height:50px;background:#fff">
                    <p style="padding:5px 12px;float:left"><span style="line-height:40px"></span>待归还 <span style="line-height:40px" >共{{toBackSize}}份</span></p>
                <el-form style="float:right;margin-top:5px;margin-right:20px;">
                    <el-form-item>
                        <el-select class="checkName" v-model="toBack_condition">
                            <el-option label="未借出" value="1"></el-option>
                            <el-option label="待归还" value="2"></el-option>
                            <el-option label="已归还" value="3"></el-option>
                            <el-option label="已取消" value="4"></el-option>
                        </el-select>
                        <el-button class="checkWay" @click="searchToBackData">搜索</el-button>
                    </el-form-item>
                </el-form>
                </div>
            <el-table tooltip-effect="dark" border v-if="type!= 'batch'" style="width: 100%" :height="bodyHeight" :data="toBackTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable"  @selection-change="selsChangeLeft">
                <el-table-column  type="selection" :selectable="checkSelect" width="55" label="#" fixed>
                </el-table-column> 
                <el-table-column width="250"  label="档号" >
                    <template slot-scope="scope">{{scope.row.archiveDH}}
                    </template>
                </el-table-column> 
                <el-table-column width="300"  label="文件标题" >
                    <template slot-scope="scope">
                       <!-- <span class="superTarget" @click="electricBorrowDetail(scope.row)">{{scope.row.archiveTM}}</span>-->
                        <span>{{scope.row.archiveTM}}</span>
                    </template>
                </el-table-column> 
                <el-table-column width="300"  label="项目名称" >
                    <template slot-scope="scope">{{scope.row.archiveXMMCNEW}}
                    </template>
                </el-table-column> 
                <el-table-column  label="状态" >
                    <template slot-scope="scope">
                        <!-- 1:未借出，2：待归还，3：已归还,4:已取消,5:部分借出，6：部分归还 -->
                        <span v-if="scope.row.arcStatus == 1">未借出</span> 
                        <span v-if="scope.row.arcStatus == 2">待归还</span>
                        <span v-if="scope.row.arcStatus == 3">已归还</span>
                        <span v-if="scope.row.arcStatus == 4">已取消</span> 
                    </template>
                </el-table-column>
            </el-table>
             <el-table tooltip-effect="dark" border v-if="type== 'batch'" style="width: 100%" :height="bodyHeight" :data="toBackTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable"  @selection-change="selsChangeLeft">
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
            </el-table>
        </div>
    </div>
    <div class="foot" style="float:right;margin:10px;">
        <el-button type="primary" class="checkWay" @click="saveBackDatas">确定</el-button>   
        <el-button type="primary" class="checkWay" @click="goBack">取消</el-button>   
    </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
     import Service from './backListDetailWin.service';
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
        toBackTableData: any = [];
        toBackTableDataBak: any = [];
        toBackTableDataBak1: any = [];
        toBackSize: number;
        backedSize: number;
        backedTableData : any = [];
        backedTableDataBak : any = []
        backedTableDataBak1 : any = []
        tableHeadArrs: any;
        tableDetailData: any;
        selLeft: any = [];
        selRight: any = [];
        type: string;
        toBack_condition: string;
        backed_condition: string;
        clickedRow: any= {};
         showBatchSelection: any = [];
        applicationNo: string;
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
            this.backedSize = 0;
            this.toBackSize = 0;
            this.type = '';
            this.toBack_condition = '';
            this.backed_condition = '';
            this.applicationNo = null;
        };
        selsChangeLeft(sel){
            this.selLeft = sel;
        }
        checkSelect(row){
            return row.arcStatus==2
        };
        searchToBackData(){
            var con = this.toBack_condition;
            if(con){
                this.toBackTableData = this.toBackTableDataBak.filter(item => item.arcStatus==Number(con));
                this.toBackTableDataBak = this.toBackTableDataBak1.slice(0) ;
            }else{
                this.toBackTableData = this.toBackTableDataBak1.slice(0) ;
            }
        };
        goBack(){
            //  this['$router'].go(-1);
            if(this.type == 'detail' ){
                this['$router'].push({
                    // path:'/selfTip/borrowerHistory/borrowHistoryLen',
                    name:'借出档案管理详情页面'
                });
            }else if(this.type == 'batch'){
                window.sessionStorage.setItem('selectionsByArchiveNo','');
                window.sessionStorage.setItem('_type', '');
                this['$router'].go(-1);
            }else{
                window.sessionStorage.setItem('clickedRow', '');
                window.sessionStorage.setItem('_type', '');
                this['$router'].go(-1);
            }
        };
        electricBorrowDetail(row){
            var obj = {appNo:this.applicationNo,archiveId:row.id,libId:row.libId,MJ:'1'}
            window.sessionStorage.setItem('XiangDetail',JSON.stringify(obj));
            this['$router'].push({
                path:'/@/views/fileArrange/fileManagement/infile/XiangDetail',
            })
        }
        returnBorrowHom(){
            window.sessionStorage.setItem('clickedRow', '');
            window.sessionStorage.setItem('_type', '');
            this['$router'].push({
                path:'/selfTip/borrowHistory'
            });
        }
        saveBackDatas(){
            var me = this;
            var backedDatas =  this.selLeft;
            if(backedDatas.length==0){
                this['$message']({
                    message: '请先选择数据！',
                    type: 'warning'
                });
                return;
            }
            var params = [];
            if(this.type=='single' || this.type == 'detail'){
                for(var da of backedDatas){
                    var param = {
                        applicationNo: da.applicationNo,
                         libId: da.libId,
                        objectId: da.objectId
                    };
                    params.push(param);
                }
            }else if(this.type == 'batch'){
                 for(var da of backedDatas){
                    var param = {
                        applicationNo: da.applicationNo,
                        objectId: da.objectId,
                        libId: da.libId
                    };
                    params.push(param);
                }
            }

            Service.saveBackDatas(params).then((res) =>{
                if(res.data.succeeded){
                    this['$message']({
                        message: '归还成功！',
                        type: 'success'
                    });
                    me.returnBorrowHom();
                }else{
                    this['$message']({
                        message: '归还失败！',
                        type: 'error'
                    });
                }
            });
        };
        getToBackDatas(){
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
                        me.toBackTableData = res.data.data;
                        me.toBackTableDataBak = me.toBackTableData.slice(0);
                        me.toBackTableDataBak1 = me.toBackTableData.slice(0);
                        me.toBackSize = me.toBackTableData.length;
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
                    if(archiveIds.indexOf(sel.objectId) == -1){
                        archiveIds.push(sel.objectId);
                        realSels.push(sel);
                    }
                }
                this.showBatchSelection = realSels;
                me.toBackTableData = realSels;
                me.toBackTableDataBak = me.toBackTableData.slice(0);
                me.toBackTableDataBak1 = me.toBackTableData.slice(0);
                me.toBackSize = me.toBackTableData.length;
                // Service.getToBackFilesListByArchivesMsg(realSels).then((res) =>{
                //     if(res && res.data && res.data.succeeded){
                //         me.toBackTableData = res.data.data;
                //         me.toBackTableDataBak = me.toBackTableData.slice(0);
                //         me.toBackTableDataBak1 = me.toBackTableData.slice(0);
                //         me.toBackSize = me.toBackTableData.length;
                //     }else{
                //         this.listLoading = false;
                //         this['$message']({
                //             message: '查询列表失败！',
                //             type: 'error'
                //         });
                //     }
                // });

            }
        
        };
        created(){
            this.applicationNo =  window.sessionStorage.getItem('applicationNo');
            this.type = window.sessionStorage.getItem('_type');
            if(this.type=='single' || this.type == 'detail'){
                this.clickedRow = JSON.parse(window.sessionStorage.getItem('clickedRow'));// this['$route'].params.clickedRow;
            }
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                })()
            };
            this.getToBackDatas();
        };
        computed(){};
    }
</script>

<style lang="scss" scoped>
   @import '../../../styles/selfTip/borrowHistoryJun';
</style>