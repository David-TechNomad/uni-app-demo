<template>
    <section>
        <el-table :height="bodyHeight" border :data="powerTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
            <el-table-column  prop="0" label="id" v-if="false">
            </el-table-column>
            <el-table-column  prop="1" label="标题">
                <template slot-scope="scope">
                    <span v-if="scope.row[8] == 'true' && dealttype == '1'" class="superTarget" @click="approveFond(scope.row)">{{scope.row[1]}}</span>
                    <span v-if="scope.row[8] == 'false' && dealttype == '1'" class="superChange" @click="approveFond(scope.row)">{{scope.row[1]}}</span>
                    <span v-if="dealttype == '2'" class="superChange" @click="approveFond(scope.row)">{{scope.row[1]}}</span>
                </template>
            </el-table-column>
            <el-table-column  prop="2" label="申请人" width="200">
            </el-table-column>
            <el-table-column  prop="4"  width="200" label="接收时间" :formatter="dateFormat1">
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
    import Service from './fondsExamination.service';
    import moment from 'moment';
    Component.registerHooks([
        'beforeRouteEnter',
    ]);
    @Component
    export default class appFondsExamination extends Vue{
        @Prop({ default: {} })
        filters: any;
        @Prop({ default: null })
        bodyHeight:number ;
        windowHeight: number;
        listLoading: boolean;
        color: boolean;
        node:String;
        dealttype:string;
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
            this.dealttype = '';
            this.node = '';
            this.powerTableData = [];
            this.colorAttr = [];
        };
        handleCurrentChange(val) {
            this.filters.start = (val-1)*(this.filters.limit);
            this.getFiles();
        };
        handleSizeChange(val) {
            this.filters.limit = val;
            this.getFiles();
        };

        // 表格初始化
        getFiles(){
            this.listLoading = true;
            this.dealttype = this.filters.dealttype;
            let params =  Object.assign({},this.filters);
            Service.findFondApprovalColumn(params).then((res) =>{
                if(res.data.succeeded){
                    if(this.colorAttr.length != 0 && this.dealttype == '1'){
                        for(let child of res.data.data.resultList){
                            //let index = res.data.data.resultList.indexOf(child);
                            //child.push(this.colorAttr[index][8]);
                            for(let child1 of this.colorAttr){
                                if(child[6] == child1[6]){
                                    child.push(child1[8]);
                                }
                            }
                        }
                        for(let child of res.data.data.resultList){
                            if(child.length == 8){
                                child.push('false');
                            }
                        }
                    }else{
                        let a = 'false';
                        res.data.data.resultList.forEach(function(item){
                            item.push(a);
                        });
                    }
                    this.powerTableData = res.data.data.resultList;
                    this.listLoading = false;
                }else{
                    this.listLoading = false;
                    this['$message']({
                        message: '全宗创建审批列表加载失败！',
                        type: 'error'
                    });
                }
                this.total = res.data.data.count;
            });
        };

        // 审批
        approveFond(row){
            row[8] = 'true';
            if(this.filters.dealttype == '1'){
                this.colorAttr = this.powerTableData;
            }
            window.sessionStorage.setItem('fondCheckData', JSON.stringify(row));
            if(this.filters.dealttype == 1 && row[5] === 3 && row[7] === 1){
                window.sessionStorage.setItem('QchangQuanTransDetail',JSON.stringify(row[0]));
                this['$router'].push({
                    path:'/selfTip/transferDetail/changQuanTransDetail',
                    name:'档案全宗申请修改',
                    params:{
                        id:row[0],
                        routerType:'r1'
                    }
                });
            }else if(this.filters.dealttype == 1 && row[5] === 3 && row[7] === 2){
                 this['$router'].push({
                     path:'/selfTip/examCheck/fondCheck',
                     name:'全宗创建审批',
                 });
            }else if(this.filters.dealttype == 2 && row[5] === 3){
                window.sessionStorage.setItem('QDchangQuanTransDetail',JSON.stringify(row[0]));
                 this['$router'].push({
                     path:'/selfTip/transferDetail/quanTransDatil',
                     name:'档案全宗详情',
                     params:{
                         id:row[0],
                         stepId:row[6].toString(),
                         routerType:'r1'
                     }
                 });
            }else if(this.filters.dealttype == 2 && row[5] === 1){
                window.sessionStorage.setItem('QDchangQuanTransDetail',JSON.stringify(row[0]));
               this['$router'].push({
                   path:'/selfTip/transferDetail/quanTransDatil',
                   name:'档案全宗详情',
                   params:{
                       id:row[0],
                       stepId:row[6].toString(),
                       routerType:'r1'
                   }
               });
            }else if(this.filters.dealttype == 1 && row[5] === 1){
                 this['$router'].push({
                     path:'/selfTip/examCheck/fondCheck',
                     name:'全宗创建审批',
                 });
            }else if(this.filters.dealttype == 1 && row[5] === 2){
                  this['$router'].push({
                      path:'/selfTip/examCheck/fondCheck',
                      name:'全宗创建审批',
                  });
            }else{
                window.sessionStorage.setItem('QDchangQuanTransDetail',JSON.stringify(row[0]));
                this['$router'].push({
                    path:'/selfTip/transferDetail/quanTransDatil',
                    name:'档案全宗详情',
                    params:{
                        id:row[0],
                        stepId:row[6].toString(),
                        routerType:'r1'
                    }
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