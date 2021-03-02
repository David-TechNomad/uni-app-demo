<template>
    <section>
        <el-table :height="bodyHeight" border :data="powerTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
            <el-table-column  prop="title" label="标题">
                <template slot-scope="scope">
                    <span v-if="scope.row.color == 'true' && status == '1'" class="superTarget" @click="approveFile(scope.row)">{{scope.row.title}}</span>
                    <span v-if="scope.row.color == 'false' && status == '1'" class="superChange" @click="approveFile(scope.row)">{{scope.row.title}}</span>
                    <span v-if="status == '2'" class="superChange" @click="approveFile(scope.row)">{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column  prop="user.fullName" label="申请人" width="200">
            </el-table-column>
            <el-table-column  prop="acceptDate" width="200" label="接收时间" :formatter="dateFormat1">
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
    import Service from './fileExamination.service';
    import moment from 'moment';
    Component.registerHooks([
        'beforeRouteEnter',
    ]);
    @Component
    export default class appFileExamination extends Vue{
        @Prop({ default: {} })
        filters: any;
        @Prop({ default: null })
        bodyHeight:number ;
        windowHeight: number;
        listLoading: boolean;
        color: boolean
        status:string;
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
            this.color = false;
            this.status = '';
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
            Service.queryFileTransferTask(params).then((res) =>{
                if(res.data.succeeded){
                    if(res.data.data != null){
                       if(this.colorAttr.length != 0 && this.status == '1'){
                            for(let child of res.data.data.content){
                                for(let child1 of this.colorAttr){
                                    if(child.id == child1.id){
                                        child.color = child1.color;
                                    }
                                }
                            }
                            for(let child of res.data.data.content){
                                if(child.color == undefined){
                                    child.color = 'false';
                                }
                            }
                            console.log(res.data.data.content)
                       }else{
                           for(let child of res.data.data.content){
                               this.$set(child,'color','false');
                           }
                       }
                        this.powerTableData = res.data.data.content;
                    }else{
                        this.powerTableData = [];
                    }
                    this.listLoading = false;
                }else{
                    this.listLoading = false;
                    this['$message']({
                        message: '档案移交审批列表加载失败！',
                        type: 'error'
                    });
                }
                this.total = res.data.data.totalElements;
            })
        };

        // 审批
        approveFile(row){
            row.color = 'true';
            if(this.filters.status == '1'){
                this.colorAttr = this.powerTableData;
            }
            if(this.filters.status == 1 && row.transferStatus == 3 && row.transferType == 1 && row.stepType == 1){
                window.sessionStorage.setItem('YchangeTransforDetail',JSON.stringify(row));
                this['$router'].push({
                    path:'/selfTip/transferDetail/changeTransforDetail',
                    params:{
                        id:row.id,
                        routerType:'r1'
                    },
                    name:'档案移交申请修改',
                });
            }else if(this.filters.status == 1 && row.transferStatus == 3 && row.transferType == 2 && row.stepType == 1){
                window.sessionStorage.setItem('kuaChangeDetails',JSON.stringify(row.id));
                window.sessionStorage.setItem('kuaChangeTransFortype',JSON.stringify(row.transferType));
                window.sessionStorage.setItem('z_sRouterType',"r1");
                this['$router'].push({
                    path:'/selfTip/kuaChangeDetails/kuaChangeDetails',
                    name:'相关档案的跨全宗修改',
                });
            }else{
                window.sessionStorage.setItem('fileCheckData', JSON.stringify(row));
                window.sessionStorage.setItem('transferStatus',this.filters.status);
                this['$router'].push({
                    path:'/selfTip/examCheck/fileCheck',
                    name:'档案移交审批',
                });
            }

        };

        isEmptyObject(obj){
            for(let key in obj){
                return false;
            }
            return true;
        }

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