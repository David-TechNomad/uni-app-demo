<template>
    <section>
        <el-table :height="bodyHeight" border :data="powerTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
            <el-table-column  prop="title" label="标题">
                <template slot-scope="scope">
                    <span v-if="scope.row.color == 'true' && status == '5'" class="superTarget" @click="approvePower(scope.row)">{{scope.row.title}}</span>
                    <span v-if="scope.row.color == 'false' && status == '5'" class="superChange " @click="approvePower(scope.row)">{{scope.row.title}}</span>
                    <span v-if="status == '0'" class="superChange" @click="approvePower(scope.row)">{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column  prop="apply_user_name" label="申请人" width="200">
            </el-table-column>
            <el-table-column  prop="process_receive_time" label="接收时间" width="200" :formatter="dateFormat1">
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
    import { Prop,Model } from 'vue-property-decorator'
    import Service from './powerExamination.service';
    import moment from 'moment';
    Component.registerHooks([
        'beforeRouteEnter',
    ]);
    @Component
    export default class appPowerExamination extends Vue{
        @Prop({ default: {} })
        filters: any;
        @Prop({ default: null })
        bodyHeight:number ;
        windowHeight: number;
        listLoading: boolean;
        node:String;
        status:string;
        color:boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        powerTableData:any = [];
        colorAttr:any = [];
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.listLoading = false;
            this.status = '';
            this.color = false;
            this.powerTableData = [];
            this.colorAttr = [];
        };
        handleCurrentChange(val) {
            this.filters.page = val;
            this.getFiles();
        };
        handleSizeChange(val) {
            this.filters.pageSize = val;
            this.getFiles();
        };

        // 表格初始化
        getFiles(){
            this.listLoading = true;
            this.status = this.filters.status;
            let params =  Object.assign({},this.filters);
            Service.getAgency(params).then((res) =>{
                if(res.data.succeeded){
                    if(this.colorAttr.length != 0 && this.status == '5'){
                        for(let child of res.data.data.content){
                            for(let child1 of this.colorAttr){
                                if(child.apply_num == child1.apply_num){
                                    child.color = child1.color;
                                }
                            }
                        }
                        for(let child of res.data.data.content){
                            if(child.color == undefined){
                                child.color = 'false';
                            }
                        }
                    }else{
                        for(let child of res.data.data.content){
                            this.$set(child,'color','false');
                        }
                    }
                    this.powerTableData = res.data.data.content;
                    this.total = res.data.data.totalPages;
                    this.listLoading = false;
                }else{
                    this.listLoading = false;
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            })
        };

        isEmptyObject(obj){
            for(let key in obj){
                return false;
            }
            return true;
        }

        // 审批
        approvePower(row){
            row.color = 'true';
            if(this.filters.status == '5'){
                this.colorAttr = this.powerTableData;
            }
            if(row.type == 8 && row.archivist_type == 0){
                window.sessionStorage.setItem('SchaneShenTransDetail',JSON.stringify(row.archivistId));
                this['$router'].push({
                    path:'/selfTip/shenTransDetail/chaneShenTransDetail',
                    name:'档案员权限开通修改',
                });
            }else if(row.type == 8 && row.archivist_type == 1){
                window.sessionStorage.setItem('PchangPersonTransDetail',JSON.stringify(row.archivistId));
                this['$router'].push({
                    path:'/selfTip/shenTransDetail/changPersonTransDetail',
                    name:'档案员变更申请修改',
                });
            }else if(this.filters.status == 0 || (row.audit_result != '' && row.audit_result != null)){
                window.sessionStorage.setItem('archivistId', JSON.stringify(row.archivistId));
                window.sessionStorage.setItem('processId', JSON.stringify(row.processId));
                this['$router'].push({
                    path:'/selfTip/examCheck/powerCheckDetail',
                    name:'档案员权限已审批详情',
                });
            }else{
                window.sessionStorage.setItem('archivistId', JSON.stringify(row.archivistId));
                //window.sessionStorage.setItem('type', JSON.stringify(row.type));
                window.sessionStorage.setItem('processId', JSON.stringify(row.processId));
                this['$router'].push({
                    path:'/selfTip/examCheck/powerCheck',
                    name:'档案员权限审批',
                });
            }
        };

        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
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