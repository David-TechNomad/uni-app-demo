<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>协查办理</span>
        </div>
        <div class="contentbox contentbox-full "> 
            <el-tabs v-model="activeName" type="card" class="erpTab"  @tab-click="handleClick">                           
                <el-tab-pane label="未处理" name="0">                                   
                </el-tab-pane>
                <el-tab-pane label="已处理" name="1">                                   
                </el-tab-pane>
                <el-tab-pane label="已驳回" name="2">                                   
                </el-tab-pane>
            </el-tabs> 
            <div class="searchKey boxshow">           
                <el-form :inline="true" :model="formModel"  size="small"> 
                    <el-form-item label="查阅人姓名">
                        <el-input v-model="formModel.applyUserName"></el-input>
                    </el-form-item>              
                    <el-form-item label="接待机构">
                        <el-input v-model="formModel.receptionName" placeholder=" "  size="small" > </el-input>
                    </el-form-item>
                    <el-form-item label="查阅目的" class="diabledSelect">
                        <dictSelect :dictId="39" :dictModel="formModel.applyType"  :dictDisabled="false" @dictChange="val => (this.formModel.applyType =val)" style="width:100%;"></dictSelect>
                    </el-form-item>  
                    <el-form-item>
                        <el-button class="defaultBtn" @click="searchDataList">检索</el-button>
                    </el-form-item>
                </el-form>
                <div class="searchBorrowCon">                                
                    <el-table v-loading="tabeLoading"
                        :data="tableData"
                        border
                        :height="bodyHeight"
                        header-row-class-name="tableHeader" 
                        stripe 
                        class="defaultTable">
                        <el-table-column type="selection"  width="55">
                        </el-table-column>
                        <el-table-column  prop="name" label="操作"  width="120" v-if="activeName != '2'">
                            <template slot-scope="scope">
                                <el-button v-if="activeName=='0'" class="tabletoolBtn"  @click="handleAssistAndShowDetail(scope.row)">协查办理</el-button>
                                <el-button v-if="activeName=='1'" class="tabletoolBtn"  @click="handleAssistAndShowDetail(scope.row)">协查详情</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="applicationNo" label="协查单号">
                        </el-table-column>
                        <el-table-column prop="firstReceptionName" label="接待机构名称">                                      
                        </el-table-column>
                        <el-table-column prop="applyDate" label="申请日期" :formatter="BorrowUtils.dateFormat" width="90">                                      
                        </el-table-column>
                        <el-table-column prop="keyWord" label="关键字">                                      
                        </el-table-column>
                        <el-table-column prop="applyUserName" label="查阅人姓名">                                      
                        </el-table-column>
                        <el-table-column prop="appTypeDict.displayText" label="查阅目的">                                      
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
    import Service from './myHelpSearchAndApply.service';
    import BorrowUtils from '@/views/myBorrow/utils/borrowUtilsApi.js';
    Vue.prototype.BorrowUtils = BorrowUtils;
    @Component
    export default class appBorrow extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 303 ; 
        activeName: string = '0';
        tableData: any =[];
        total: number = 1;
        page: number = 1;
        pageSize: number = 25; 
        dictDataList: any = [];
        formModel: any = {
            applyUserName: '',
            receptionName: '',
            applyType: ''
        };
        tabeLoading: boolean = false;

        constructor(){
            super();
        };
        handleAssistAndShowDetail(row){
            window.sessionStorage.setItem("myHelpSearchAndApply_activeName", this.activeName);
            window.sessionStorage.setItem("helpSearchAndApplyDetail_passedObj", JSON.stringify(row));
            window.sessionStorage.setItem("helpSearchAndApplyDetail_returnPath", "/myBorrow/myHelpSearchAndApply/myHelpSearchAndApply");
            window.sessionStorage.removeItem("fromSp_comFiles");
            window.sessionStorage.removeItem("fromQw_assistFiles");
            window.sessionStorage.removeItem("comTableDataList");
            window.sessionStorage.removeItem("assistTableDataList");
            this['$router'].push({
                path: '/myBorrow/helpSearchAndApply/helpSearchAndApplyDetail'
            })
        };
        searchDataList(){
            this.page = 1;
            this.total = 0;
            this.queryMyAsistSelect();
        };
        queryMyAsistSelect(){
            let params = {
                page: this.page-1,
                pageSize: this.pageSize,
                status: Number(this.activeName)
            }
            this.tabeLoading = true;
            params = Object.assign(params, this.formModel);
            Service.queryMyAsistSelect(params).then(res => {
                this.tabeLoading = false;
                if(res.data.succeeded){
                    this.tableData = res.data.data.content;
                    this.total = res.data.data.totalElements;
                }
            });
        };
        
        handleClick(){
            this.page = 1;
            this.total = 0;
            this.queryMyAsistSelect();
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.queryMyAsistSelect();
        };
        handleSizeChange(val:number) {
            this.pageSize = val;
            this.queryMyAsistSelect();
        };
        created(){            
        };

        mounted(){
            this.activeName = window.sessionStorage.getItem("myHelpSearchAndApply_activeName") || '0';
            window.sessionStorage.removeItem("myHelpSearchAndApply_activeName");
            this.queryMyAsistSelect();
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