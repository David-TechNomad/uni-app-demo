<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>协查办理任务</span>
        </div>
        <div class="contentbox contentbox-full "> 
            <el-tabs v-model="activeName" type="card" class="erpTab"  @tab-click="handleClick">                           
                <el-tab-pane label="代办任务" name="0">                                   
                </el-tab-pane>
                <el-tab-pane label="已办任务" name="1">                                   
                </el-tab-pane>
            </el-tabs> 
            <div class="searchKey boxshow">           
                <el-form :inline="true" :model="formModel"> 
                    <el-form-item label="查阅人姓名">
                        <el-input v-model="formModel.applyUserName" size="small"></el-input>
                    </el-form-item>              
                    <el-form-item label="接待机构">
                        <el-input v-model="formModel.receptionName" placeholder=" " suffix-icon="el-icon-date" size="small" > </el-input>
                    </el-form-item>
                    <el-form-item label="查阅目的" class="diabledSelect">
                        <dictSelect :dictId="39" :dictModel="formModel.applyType"  :dictDisabled="false" @dictChange="val => (this.formModel.applyType =val)" style="width:100%;"></dictSelect>
                    </el-form-item>  
                    <el-form-item>
                        <el-button class="defaultBtn" @click="searchDataList">检索</el-button>
                        <el-button class="defaultBtn" @click="applyAssist">申请协查</el-button>
                    </el-form-item>
                </el-form>
                <div class="searchBorrowCon">                                
                    <el-table
                        :data="tableData"
                        border
                        :height="bodyHeight"
                        element-loading-text="努力加载中..."
                        header-row-class-name="tableHeader" 
                        stripe 
                        class="defaultTable">
                        <el-table-column type="selection"  width="55">
                        </el-table-column>
                        <el-table-column  prop="name" label="操作"  width="120">
                            <template slot-scope="scope">                                                 
                                <el-button class="tabletoolBtn" v-if="activeName=='0'" @click="showDetail(scope.row)">协查办理</el-button>
                                <el-button class="tabletoolBtn" v-if="activeName=='1'" @click="showDetail(scope.row)">协查详情</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="applicationNo" label="申请单号">
                        </el-table-column>
                        <el-table-column prop="applyDate" label="申请日期" :formatter="BorrowUtils.dateFormat" width="90">                                      
                        </el-table-column>
                        <el-table-column prop="endDate" label="结束日期" :formatter="BorrowUtils.dateFormat" width="90">                                      
                        </el-table-column>
                        <el-table-column prop="applyUserName" label="查阅人姓名">                                      
                        </el-table-column>
                        <el-table-column prop="applyType" label="查阅目的">                                      
                        </el-table-column>
                        <el-table-column prop="receptionName" label="接待机构名称">                                      
                        </el-table-column>
                        <el-table-column prop="receiveUserName" label="受理人">                                      
                        </el-table-column>
                        <el-table-column prop="date" label="审批状态">                                      
                        </el-table-column>                                                                     
                    </el-table>  
                    <div class="clear" style="margin-top:10px">                         
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>  
                </div> 
              </div>
                    
        </div>    
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './helpSearchAndApplyMgnt.service';
    import BorrowUtils from '@/views/myBorrow/utils/borrowUtilsApi.js';
    Vue.prototype.BorrowUtils = BorrowUtils;
    @Component
    export default class appBorrow extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 303 ; 
        activeName: string = '0';
        tableData: any =[];
        total: number = 1;
        page: number = 0;
        pageSize: number = 25; 
        dictDataList: any = [];
        formModel: any = {
            applyUserName: '',
            receptionName: '',
            applyType: ''
        };

        constructor(){
            super();
        };

        showDetail(row){
            window.sessionStorage.setItem("helpSearchAndApplyMgnt_activeName", this.activeName);
            window.sessionStorage.setItem("helpSearchAndApplyDetail_passedObj", JSON.stringify(row));
            window.sessionStorage.setItem("helpSearchAndApplyDetail_returnPath", "/myBorrow/helpSearchAndApply/helpSearchAndApplyMgnt");
            this['$router'].push({
                path: '/myBorrow/helpSearchAndApply/helpSearchAndApplyDetail'
            })
        };
        applyAssist(){
            //debugger;
            let param = {
                applyUserId: window.sessionStorage.userId,
                applyUserNo: 0,
                applyUserName: window.sessionStorage.username,
                applyUserType: window.sessionStorage.userType=="System"? 1: 0,
                type: 0,//0代表公众用户提交，1代表馆内用户提交
                // applyType: 0,
                archiveAgentCode: window.sessionStorage.archiveAgentCode,
                publicUserKeyWord: 'keyWork'
            }
            Service.ApplyAsistSelect(param).then(res => {
                //debugger;
                if(res.data.succeeded){ }
            });
        };
        searchDataList(){
            this.page = 0;
            this.total = 0;
            this.queryMyAsistSelect();
        };
        queryMyAsistSelect(){
            let params = {
                pageNumber: this.page,
                pageSize: this.pageSize,
                status: Number(this.activeName)
            }
            params = Object.assign(params, this.formModel);
            Service.queryMyAsistSelect(params).then(res => {
                if(res.data.succeeded){
                    this.tableData = res.data.data.content;
                    this.total = res.data.data.totalElements;
                }
            });
        };
        
        handleClick(){
            this.page = 0;
            this.total = 0;
            this.queryMyAsistSelect();
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);           
        };
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);         
        };
        getDictDataList(){
            Service.getTypeData(39).then((res) =>{
                this.dictDataList = res.data.data;
            });
        }
        created(){            
        };

        mounted(){
            this.activeName = window.sessionStorage.getItem("helpSearchAndApplyMgnt_activeName") || '0';
            this.getDictDataList();
            this.queryMyAsistSelect();
            window.sessionStorage.removeItem("helpSearchAndApplyMgnt_activeName");
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 303;
                })()
            };
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../styles/myBorrow/borrow.scss';
</style>