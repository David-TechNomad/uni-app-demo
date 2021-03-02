<template>
    <section>
        <div class="mainTitle"><span>借阅人变更申请</span></div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow">
                <div class="formData">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="全部" name="null">
                        </el-tab-pane>
                        <el-tab-pane label="已通过" name="1">
                        </el-tab-pane>
                        <el-tab-pane label="审批中" name="2">
                        </el-tab-pane>
                        <el-tab-pane label="已驳回" name="3">
                        </el-tab-pane>
                        <el-tab-pane label="已结束" name="4">
                        </el-tab-pane>
                    </el-tabs>
                    <el-form :inline="true" :model="filters" class="doneForm topParamsForm">
                        <el-form-item v-for="" class="people" label="借阅人：" ref="people">
                            <el-input class="checkName" v-model="filters.createUserName" clearable placeholder="单行输入"></el-input>
                        </el-form-item>
                        <el-form-item v-for="" class="fondName" label="标题：" ref="fondName">
                            <el-input class="checkName" v-model="filters.title" clearable placeholder="单行输入"></el-input>
                        </el-form-item>
                        <el-form-item class="year" label="申请日期：" ref="year">
                            <el-date-picker type="date" @change="changeDate" :picker-options="dateOptionsA" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="filters.startCreateDate"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker type="date" @change="changeDate1" :picker-options="dateOptions" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filters.endCreateDate" ref="endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="getList">检索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!--列表(移交申请)-->
                <div class="borderTable" v-show="documentShow">
                    <el-table tooltip-effect="dark" :height="bodyHeight" :data="documentTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column width="200px" prop="processNo" label="申请单号">
                        </el-table-column>
                        <el-table-column prop="title" label="标题">
                            <template slot-scope="scope">
                                <a href="javascript:void(0)" class="" @click="changePeople(scope.row)">{{scope.row.title}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="appType" label="借阅方式">
                            <template slot-scope="scope">
                                <div v-if="scope.row.appType===1">电子借阅</div>
                                <div v-if="scope.row.appType===2">实体借阅</div>
                            </template>
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="auditStatus" label="状态" >
                            <template slot-scope="scope">
                                <span v-if="scope.row.auditStatus === 4">已结束</span>
                                <span v-if="scope.row.auditStatus === 1">已通过</span>
                                <span v-if="scope.row.auditStatus === 2">审核中</span>
                                <span v-if="scope.row.auditStatus === 3">已驳回</span>
                            </template>
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="security" label="密级" >
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="appStartDate" :formatter="dateFormat" label="计划借阅日期">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="appEndDate" :formatter="dateFormat" label="计划归还日期">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="oldBorrowUserName" label="原借阅人">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="borrowUserName" label="新借阅人">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="createDate" :formatter="dateFormat" label="申请日期" >
                        </el-table-column>
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
                        </el-pagination>
                    </el-col>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import moment from 'moment';
    import Component from 'vue-class-component';
    import Service from './borrowerApply.service';
    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
    @Component
    export default class appBorrowerApply extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        timer: boolean;
        listLoading: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        activeName: string;
        filters: any = {};
        documentTableData: any = [];
        borrowTableData: any = [];
        data: any = [];
        dateOptions: any = {};
        dateOptionsA: any = {};
        documentShow: boolean;
        borrowShow: boolean;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 340 ;
            this.nameHeight = null;
            this.timer = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.activeName = "null";
            this.listLoading = false;
            this.documentShow = true;
            this.borrowShow = false;
            this.data = [];
            this.filters = {
                "status":'null',
                "title":"",
                "createUserName":"",
                "startCreateDate":"",
                "endCreateDate":"",
                "page":0,
                "pageSize":25
            };
            this. documentTableData = [

            ];
            this.dateOptions = {

            };
            this.dateOptionsA = {

            };
        };
        handleCurrentChange(val) {
            this.filters.page = val-1;
            this.getFiles();
        };
        handleSizeChange(val) {
            this.filters.pageSize = val;
            this.getFiles();
        };

        // 表格初始化
        getFiles(){
            let params =  Object.assign({},this.filters);
            this.listLoading = true;
            Service.getCreateList(params).then((res) =>{
                this.documentTableData = res.data.data;
                this.listLoading = false;
                this.total = res.data.totalRecords
            })
        };

        handleClick(){
            this.page = 1;
            this.start = 0;
            if(this.activeName == ""){
                this.filters.status = null;
            }else{
                this.filters.status = this.activeName;
            }
            this.filters.title = '';
            this.filters.createUserName = '';
            this.filters.startCreateDate = '';
            this.filters.endCreateDate = '';
            this.getFiles();
        };

        // 关闭
        deleteRow(row){
            let processId = row.processId;
            this['$confirm']('确认关闭吗？', {
                type: 'warning'
            }).then(() => {
                Service.closeProcess(processId).then((res) =>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '关闭成功！',
                            type: 'success'
                        });
                        this.getFiles();
                    }else{
                        this['$message']({
                            message: '关闭失败！',
                            type: 'error'
                        });
                    }
                })
            });
        };

        changePeople(row){
            window.sessionStorage.setItem('backFile','6');
            if(row.auditStatus===3){
                window.sessionStorage.setItem('examCheckData', JSON.stringify(row));
                window.sessionStorage.setItem('node', '1');
                window.sessionStorage.setItem('processId', row.processId);
                window.sessionStorage.setItem('routerType', 'r2');
                 this['$router'].push({
                     path:'/selfTip/examCheck/peopleRefuseCheck',
                 });
            }else{
                window.sessionStorage.setItem('examCheckData', JSON.stringify(row));
                window.sessionStorage.setItem('node', '2');
                window.sessionStorage.setItem('processId', row.processId);
                window.sessionStorage.setItem('routerType', 'r1');
                this['$router'].push({
                    path:'/selfTip/examCheck/peopleRefuseCheck',
                });
            }
        }

        //检索
        getList(){
            this.filters.status = this.activeName;
            this.getFiles();
        }

        // 表格内时间格式化
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        }

        // 档案审批刷新
        beforeRouteEnter(to, from, next) {
            next(vm =>{
                window.sessionStorage.setItem('_type', 'history');
                let state = window.sessionStorage.getItem('examState');
                if(state&&state==='3'){
                    vm.getFiles();
                }
            });
            next();
        };

        // 同步借阅日期开始
        changeDate(){
            this.anaDate();
        };

        anaDate(){
            let date = new Date(this.filters.startCreateDate);
            this.dateOptions = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600)
                    let timer =  time.getTime();
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer< date;
                }
            };
        }
        // 同步借阅日期结束
        changeDate1(){
            if(!this.filters.endCreateDate){
                this.dateOptionsA = {
                    disabledDate() {
                        return null
                    }
                };
            }else{
                let date = new Date(this.filters.endCreateDate);
                this.dateOptionsA = {
                    disabledDate(time) {
                        date.setTime(date.getTime() - 3600)
                        let timer =  time.getTime();
                        // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                        return timer > date;
                    }
                };
            }
        }


        created(){

        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 340;
                })()
            };
            this.getFiles();
        };
        computed(){};
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/selfTip/borrow.scss';
</style>