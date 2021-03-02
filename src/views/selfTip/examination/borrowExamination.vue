<template>
    <section>
        <div v-show="state==='1'">
            <el-table border :height="bodyHeight" :data="documentTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                <el-table-column  prop="title" label="标题">
                    <template slot-scope="scope">
                        <span v-if="scope.row.color==='false'&&state==='1'&&(scope.row.auditType===0||scope.row.auditType===5)" class="superChange" @click="modifyRow(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='true'&&state==='1'&&(scope.row.auditType===0||scope.row.auditType===5)" class="superTarget" @click="modifyRow(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='false'&&state==='1'&&scope.row.auditType===8" class="superChange" @click="borrowModify(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='true'&&state==='1'&&scope.row.auditType===8" class="superTarget" @click="borrowModify(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='false'&&state==='1'&&scope.row.auditType!==0&&scope.row.auditType!==5&&scope.row.auditType!==8" class="superChange" @click="transter(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='true'&&state==='1'&&scope.row.auditType!==0&&scope.row.auditType!==5&&scope.row.auditType!==8" class="superTarget" @click="transter(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='false'&&state==='2'" class="superChange" @click="toDetails(scope.row)">{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="userName" label="申请人" width="200">
                </el-table-column>
                <el-table-column  prop="receiveDate" label="接收时间" width="200" :formatter="dateFormat">
                </el-table-column>
            </el-table>
            <!--工具条分页-->
            <el-col :span="24" class="pager">
                <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit1" :total="total1" style="float:right;">
                </el-pagination>
            </el-col>
        </div>
        <div v-show="state==='2'">
            <el-table border :height="bodyHeight" :data="documentTableData1" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                <el-table-column  prop="title" label="标题">
                    <template slot-scope="scope">
                        <span v-if="scope.row.color==='false'&&state==='1'&&(scope.row.auditType===0||scope.row.auditType===5)" class="superChange" @click="modifyRow(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='true'&&state==='1'&&(scope.row.auditType===0||scope.row.auditType===5)" class="superTarget" @click="modifyRow(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='false'&&state==='1'&&scope.row.auditType===8" class="superChange" @click="borrowModify(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='true'&&state==='1'&&scope.row.auditType===8" class="superTarget" @click="borrowModify(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='false'&&state==='1'&&scope.row.auditType!==0&&scope.row.auditType!==5&&scope.row.auditType!==8" class="superChange" @click="transter(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='true'&&state==='1'&&scope.row.auditType!==0&&scope.row.auditType!==5&&scope.row.auditType!==8" class="superTarget" @click="transter(scope.row)">{{scope.row.title}}</span>
                        <span v-if="scope.row.color==='false'&&state==='2'" class="superChange" @click="toDetails(scope.row)">{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="userName" label="申请人" width="200">
                </el-table-column>
                <el-table-column  prop="receiveDate" label="接收时间" width="200" :formatter="dateFormat">
                </el-table-column>
            </el-table>
            <!--工具条分页-->
            <el-col :span="24" class="pager">
                <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit2" :total="total2" style="float:right;">
                </el-pagination>
            </el-col>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator'
    import Service from './borrowExamination.service';
    import moment from 'moment';
    @Component
    export default class appBorrowExamination extends Vue{
        @Prop({ default: {} })
        filters: any;
        @Prop({ default: null })
        state: string;
        @Prop({ default: null })
        bodyHeight:number ;
        start1: number;
        start2: number;
        windowHeight: number;
        listLoading: boolean;
        total1: number;
        limit1: number;
        total2: number;
        limit2: number;
        color: string;
        documentTableData: any = [];
        documentTableData1: any = [];
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.start1 = 0;
            this.start2 = 0;
            this.total1 = 0;
            this.limit1 = 25;
            this.total2 = 0;
            this.limit2 = 25;
            this.listLoading = false;
            this.color = 'false';
            this.documentTableData = [];
            this.documentTableData1 = [];
        };
        handleCurrentChange1(val) {
            this.start1 = val-1;
            this.getFiles();
        };
        handleSizeChange1(val) {
            this.limit1 = val;
            this.getFiles();
        };
        handleCurrentChange2(val) {
            this.start2 = val-1;
            this.geProptFiles();
        };
        handleSizeChange2(val) {
            this.limit2 = val;
            this.geProptFiles();
        };
        // 表格内时间格式化
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }

        // 表格初始化
        getFiles(){
            let param = {
                start:this.start1,
                limit:this.limit1,
            };
            let params =  Object.assign({},this.filters,param);
            this.listLoading = true;
            Service.getExamSearch(params).then((res) =>{
                if(res.data.succeeded){
                    res.data.data.forEach(function(item){
                        item.color = 'false';
                    });
                    let dataAll = JSON.parse(window.sessionStorage.getItem('examCheckArr'));
                    if(dataAll){
                        res.data.data.forEach(function(item){
                            dataAll.forEach(function(item1){
                                if(item.applicationNo==item1.applicationNo){
                                    item.color = item1.color
                                }
                            });
                        })
                    }
                    this.documentTableData = res.data.data;
                    this.total1 = res.data.totalRecords;
                    this.listLoading = false;
                }else{
                    this.listLoading = false;
                    this['$message']({
                        message: '待审核列表加载失败！',
                        type: 'error'
                    });
                }
            })
        };

        geProptFiles(){
            let param = {
                start:this.start2,
                limit:this.limit2,
            };
            let params =  Object.assign({},this.filters,param);
            this.listLoading = true;
            Service.getProperSearch(params).then((res) =>{
                if(res.data.succeeded){
                    res.data.data.forEach(function(item){
                        item.color = 'false';
                    });
                    this.documentTableData1 = res.data.data;
                    this.total2 = res.data.totalRecords;
                    this.listLoading = false;
                }else{
                    this.listLoading = false;
                    this['$message']({
                        message: '已审核列表加载失败！',
                        type: 'error'
                    });
                }
            })
        };

        // 审批
        modifyRow(row){
            row.color = 'true';
            this.documentTableData.forEach(function(item){
                if(item.applicationNo==row.applicationNo){
                    item.color = row.color
                }
            });
            window.sessionStorage.setItem('examCheckArr', JSON.stringify(this.documentTableData));
            window.sessionStorage.setItem('examCheckData', JSON.stringify(row));
            this['$router'].push({
                path:'/selfTip/examCheck/examCheck',
            });
        };

        // 签收
        transter(row){
            row.color = 'true';
            this.documentTableData.forEach(function(item){
                if(item.applicationNo==row.applicationNo){
                    item.color = row.color
                }
            });
            window.sessionStorage.setItem('examCheckArr', JSON.stringify(this.documentTableData));
            window.sessionStorage.setItem('examCheckData', JSON.stringify(row));
            this['$router'].push({
                path:'/selfTip/examCheck/borrowExaminationTranster/borrowExaminationTranster',
            });
        };

        // 修改
        borrowModify(row){
            row.color = 'true';
            this.documentTableData.forEach(function(item){
                if(item.applicationNo==row.applicationNo){
                    item.color = row.color
                }
            });
            window.sessionStorage.setItem('examCheckArr', JSON.stringify(this.documentTableData));
            window.sessionStorage.setItem('examCheckData', JSON.stringify(row));
            this['$router'].push({
                path:'/selfTip/borrowModify/borrowModify',
            });
        }

        // 详情
        toDetails(row){
            window.sessionStorage.setItem('examCheckData1', JSON.stringify(row));
            window.sessionStorage.setItem('auditIdIf','1');
            this['$router'].push({
                path:'/selfTip/examination/borrowExaminationDetail/borrowExaminationDetail',
            });
        };

        created(){

        };

        mounted(){
            if(this.state==='1'){
                this.getFiles();
            }else if(this.state==='2'){
                this.geProptFiles();
            }
        };

        computed(){};
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/selfTip/borrow.scss';
</style>