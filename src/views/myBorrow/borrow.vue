<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>我的查阅</span>
        </div>
        <div class="contentbox "> 
            <el-tabs v-model="activeName" type="card" class="erpTab"  @tab-click="handleClick">                           
                <el-tab-pane label="查阅单" name="1" >
                </el-tab-pane>
                <el-tab-pane label="协查单" name="2">                                   
                </el-tab-pane>
            </el-tabs> 
            <div class="searchKey boxshow">           
                <el-form :inline="true" :model="searchFormModel" > 
                    <el-form-item label="申请单号：">
                        <el-input v-model="searchFormModel.appNo" placeholder="请输入申请单号" size="small"></el-input>
                    </el-form-item>              
                    <el-form-item label="申请日期：">
                        <el-date-picker v-model="searchFormModel.startDate" size="small" type="date"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName"></el-date-picker>
                        <span style="margin:0 10px">至</span>
                        <el-date-picker v-model="searchFormModel.endDate" size="small" type="date"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期"  ref="endDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态：" v-if="activeName=='1'">
                        <el-select v-model="searchFormModel.auditStatus" size="small">
                            <el-option label="审批通过" :value="1"> </el-option>
                            <el-option label="审批中" :value="2"> </el-option>
                            <el-option label="已驳回" :value="4"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：" v-if="activeName=='2'">
                        <el-select v-model="searchFormModel.auditStatus" size="small">
                            <el-option label="未审批" :value="0"> </el-option>
                            <el-option label="通过" :value="1"> </el-option>
                            <el-option label="已驳回" :value="2"> </el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item>
                        <el-button class="defaultBtn" @click="searchResult">检索</el-button>
                    </el-form-item>
                </el-form>
                <div class="searchBorrowCon">                                
                    <el-table v-loading="tabeLoading"
                        :data="tableDataList"
                        border
                        :height="bodyHeight"
                        element-loading-text="努力加载中..."
                        header-row-class-name="tableHeader" 
                        stripe 
                        class="defaultTable">
                        <!-- <el-table-column type="index"  width="55" label="序号">
                        </el-table-column> -->
                        <el-table-column  prop="name" label="操作" v-if="activeName=='1'"  width="120"  :key="Math.random()">
                            <template slot-scope="scope">                                                 
                              <el-button  class="tabletoolBtn" @click="showDetail(scope.row)">详情</el-button>
                              <!-- 协查单未办理状态：不用显示操作按钮，如果已经办理，可以在详情界面看到办理的查阅单的列表信息 -->
                            </template>
                        </el-table-column>
                        <el-table-column v-if="activeName=='1'" prop="applicationNo" label="查阅单号"  :key="Math.random()">
                        </el-table-column>
                        <el-table-column v-if="activeName=='2'" prop="applicationNo" label="协查单号"  :key="Math.random()">
                        </el-table-column>
                        <el-table-column v-if="activeName=='1'" prop="receptionName" label="接待机构"  :key="Math.random()">                                      
                        </el-table-column>
                        <el-table-column v-if="activeName=='2'" prop="firstReceptionName" label="接待机构"  :key="Math.random()">                                      
                        </el-table-column>
                        <el-table-column v-if="activeName=='2'" prop="receptionName" label="处理机构"  :key="Math.random()">
                        </el-table-column>
                        <el-table-column v-if="activeName=='1'" prop="appTypeDict.displayText" label="查阅方式"  :key="Math.random()">                                      
                        </el-table-column>
                        <el-table-column v-if="activeName=='1'" prop="fileNum" label="文档数量"  :key="Math.random()">                                      
                        </el-table-column>
                        <el-table-column v-if="activeName=='1'" prop="appDate" label="申请日期" :formatter="BorrowUtils.dateFormat"  :key="Math.random()">                                      
                        </el-table-column>
                        <el-table-column v-if="activeName=='1'"  prop="appEndDate" label="查阅结束日期"  :formatter="BorrowUtils.dateFormat"  :key="Math.random()">                                      
                        </el-table-column>
                        <el-table-column v-if="activeName=='2'" prop="applyDate" label="申请日期" :formatter="BorrowUtils.dateFormat"  :key="Math.random()">                                      
                        </el-table-column>
                        <el-table-column v-if="activeName=='1'" prop="auditStatus" label="状态"  :key="Math.random()">  
                            <template slot-scope="scope"> 
                                <span v-if="scope.row.auditStatus ==1">部分通过</span>
                                <span v-if="scope.row.auditStatus ==2">审批中</span>
                                <span v-if="scope.row.auditStatus ==4">已驳回</span>
                                <span v-if="scope.row.auditStatus ==6">全部通过</span>
                            </template>                                           
                        </el-table-column>  
                        <el-table-column v-if="activeName=='2'" prop="status" label="状态"  :key="Math.random()"> 
                            <template slot-scope="scope"> 
                                <!-- status，0代表未处理，1代表已处理 2已驳回-->
                                <span v-if="scope.row.status ==0">未审核</span>
                                <span v-if="scope.row.status ==1">通过</span>
                                <span v-if="scope.row.status ==2">已驳回</span>
                                <!-- <span v-if="scope.row.status ==4">已驳回</span> -->
                            </template>                                       
                        </el-table-column>  
                    </el-table>  
                    <div class="clear" style="margin-top:10px">                         
                        <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                    </div>  
                </div> 
            </div>
        </div>    
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrow.service';
    import moment from 'moment';
    import BorrowUtils from '@/views/myBorrow/utils/borrowUtilsApi.js';
    Vue.prototype.BorrowUtils = BorrowUtils;
    @Component 
    export default class appBorrow extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 303 ; 
        activeName: string = '1';
        searchFormModel: any = {
            'appNo':'',
            'startDate':'',
            'endDate':'',
            "auditStatus":''
        };
        tableDataList: any =[];
        total: number = 1;
        page: number = 1;
        pageSize: number = 25;  
        tabeLoading: boolean = false;

        searchResult(){
            this.page = 1;
            this.total = 0;
            this.queryResult();
        };
        queryResult(){
            this.tableDataList = [];
            if(this.activeName == "1"){
                this.queryAppyList();
            }else{
                this.queryAssistList();
            }
        };
        queryAppyList(){
            let params = {
                "page": this.page-1,
                "pageSize": this.pageSize,
            };
            let form = Object.assign({}, this.searchFormModel);
            form.auditStatus = form.auditStatus==""? 0: form.auditStatus;
            params = Object.assign(params, form);
            this.tabeLoading = true;
            Service.queryMyUtilize(params).then(res=>{
                this.tabeLoading = false;
                if(res.data.succeeded){
                    this.tableDataList = res.data.data.content;
                    this.total = res.data.data.totalElements;
                }
            });
        }
        queryAssistList(){
            let params = {
                page: this.page-1,
                pageSize: this.pageSize,
                status: this.searchFormModel.auditStatus===""?null: this.searchFormModel.auditStatus
            }
            params = Object.assign(params, this.searchFormModel);
            //debugger;
            this.tabeLoading = true;
            Service.queryMyApplyAssistSelect(params).then(res=>{
                this.tabeLoading = false;
                if(res.data.succeeded){
                    this.tableDataList = res.data.data.content;
                    this.total = res.data.data.totalElements;
                }
            });
        }

        //   显示查阅单详情
        showDetail(row){
            if(this.activeName=='1'){//查阅
                window.sessionStorage.setItem("borrow_activeName", this.activeName);
                window.sessionStorage.setItem('borrowDetail_applicationNo', row.applicationNo);
                window.sessionStorage.setItem('borrowDetail_returnPath', "/myBorrow/borrow");
                this['$router'].push({
                    path:"/myBorrow/borrowDetail/borrowDetail",
                })
            }else{
                // window.sessionStorage.setItem("borrow_activeName", this.activeName);
                // window.sessionStorage.setItem("helpSearchAndApplyDetail_passedObj", JSON.stringify(row));
                // window.sessionStorage.setItem("helpSearchAndApplyDetail_returnPath", "/myBorrow/borrow");
                // this['$router'].push({
                //     path: '/myBorrow/helpSearchAndApply/helpSearchAndApplyDetail'
                // })
            }
        };
        handleClick(){
            this.searchFormModel.appNo = '';
            this.searchFormModel.startDate = '';
            this.searchFormModel.endDate = '';
            this.searchFormModel.auditStatus = '';
            this.searchResult();
        };
        handleCurrentChange(val) {
            this.page = val;
            this.queryResult();
        };
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryResult();
        };
        created(){  
            this.activeName = window.sessionStorage.getItem("borrow_activeName") || '1';
            this.queryResult();         
            window.sessionStorage.removeItem("borrow_activeName"); 
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 303;
                })()
            };
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../styles/innerPublic.scss';   
    @import '../../styles/selfTip/borrow.scss';
</style>