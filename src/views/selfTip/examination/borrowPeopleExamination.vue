<template>
    <section>
        <el-table tooltip-effect="dark" border :height="bodyHeight" :data="documentTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
            <el-table-column  prop="title" label="标题">
                <template slot-scope="scope">
                    <span v-if="scope.row.color == 'true' && status == '0'" class="superTarget" @click="modifyRow(scope.row)">{{scope.row.title}}</span>
                    <span v-if="scope.row.color == 'false' && status == '0'" class="superChange" @click="modifyRow(scope.row)">{{scope.row.title}}</span>
                    <span v-if="status == '1'" class="superChange" @click="modifyRow(scope.row)">{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column  prop="createUserName" label="申请人" width="200">
            </el-table-column>
            <el-table-column  prop="receiveDate" :formatter="dateFormat" label="接收时间" width="200">
            </el-table-column>
        </el-table>
        <!--工具条分页-->
        <el-col :span="24" class="pager">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator'
    import Service from './borrowPeopleExamination.service';
    import moment from 'moment';
    @Component
    export default class appBorrowPeopleExamination extends Vue{
        @Prop({ default: {} })
        filters: any;
        @Prop({ default: null })
        state: string;
        @Prop({ default: null })
        bodyHeight:number ;
        windowHeight: number;
        listLoading: boolean;
        start: number;
        total: number;
        pageSize: number;
        status:string;
        limit: number;
        documentTableData: any = [];
        colorAttr:any = [];
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.start = 0;
            this.total = 0;
            this.pageSize = 25;
            this.limit = 25;
            this.listLoading = false;
            this.status = '';
            this.documentTableData = [];
            this.colorAttr = [];
        };
        handleCurrentChange(val) {
            this.filters.page = val-1;
            this.getFiles();
        };
        handleSizeChange(val) {
            this.filters.pageSize = val;
            this.getFiles();
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
            this.status = this.filters.status;
            let params = Object.assign({},this.filters );
            this.listLoading = true;
            Service.getApprovalList(params).then((res) =>{
                if(res.data.succeeded){

                    //let flag = this.isEmptyObject(this.colorAttr);
                    if(this.colorAttr.length != 0 && this.status == '0'){
                        for(let child of res.data.data){
                            for(let child1 of this.colorAttr){
                                if(child.processNo == child1.processNo){
                                    child.color = child1.color;
                                }
                            }
                        }
                        for(let child of res.data.data){
                            if(child.color == undefined){
                                child.color = 'false';
                            }
                        }
                    }else{
                        for(let child of res.data.data){
                            this.$set(child,'color','false');
                        }
                    }
                    this.documentTableData = res.data.data;
                    this.total = res.data.totalRecords
                    this.listLoading = false;
                }else{
                    this.listLoading = false;
                    this['$message']({
                        message: '借阅人变更审批列表加载失败！',
                        type: 'error'
                    });
                }
            })
        };

        // 审批
        modifyRow(row){
            row.color = 'true';
            if(this.filters.status == '0'){
                this.colorAttr = this.documentTableData;
            }
            window.sessionStorage.setItem('examCheckData', JSON.stringify(row));
            if((row.type === 5 || row.type === 8) && row.isApprovalNode === true){
                window.sessionStorage.setItem('node', '0');
                window.sessionStorage.setItem('routerType', 'r1');
                window.sessionStorage.setItem('backFile','7');
                this['$router'].push({
                    path:'/selfTip/examCheck/peopleRefuseCheck',
                });
            }else{
                this['$router'].push({
                    path:'/selfTip/examCheck/peopleCheck',
                });
            }
        };

        isEmptyObject(obj){
            for(let key in obj){
                return false;
            }
            return true;
        }

        created(){

        };

        mounted(){
            this.getFiles();
        };

        computed(){};
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/selfTip/borrow.scss';
</style>