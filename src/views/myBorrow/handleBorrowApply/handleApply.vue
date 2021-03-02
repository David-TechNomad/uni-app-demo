<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>查阅审批</span>
        </div>
        <div class="contentbox contentbox-full "> 
            <el-tabs v-model="activeName" type="card" class="erpTab"  @tab-click="handleClick">                           
                <el-tab-pane label="待审批" name="0" >
                </el-tab-pane>
                <el-tab-pane label="已审批" name="1">                                   
                </el-tab-pane>
                <!-- <el-tab-pane label="全部" name="2">                                   
                </el-tab-pane>            -->
            </el-tabs> 
            <div class="searchKey boxshow">           
                <el-form :inline="true" :model="searchFormModel" > 
                    <el-form-item label="查阅人：">
                        <el-input v-model="searchFormModel.applyUserName"   size="small"></el-input>
                    </el-form-item>              
                    <el-form-item label="申请日期：">
                        <el-date-picker v-model="searchFormModel.startDate" size="small" type="date"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName"></el-date-picker>
                        <span style="margin:0 10px">至</span>
                        <el-date-picker v-model="searchFormModel.endDate" size="small" type="date"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期"  ref="endDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="defaultBtn" @click="searchResult">检索</el-button>
                    </el-form-item>
                </el-form>
                <div class="searchBorrowCon">                                
                    <el-table  v-loading="tabeLoading"
                        :data="tableDataList"
                        border
                        :height="bodyHeight"
                        header-row-class-name="tableHeader" 
                        stripe 
                        class="defaultTable">
                        <el-table-column type="selection"  width="55">
                        </el-table-column>
                        <el-table-column  prop="name" label="操作"  width="120">
                            <template slot-scope="scope">                                                 
                              <el-button class="tabletoolBtn" @click="showDetail(scope.row)" v-if="activeName=='0'">审批</el-button>
                              <el-button class="tabletoolBtn" @click="showDetail(scope.row)" v-if="activeName=='1'">详情</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="application_no" label="查阅单号">
                        </el-table-column>
                        <el-table-column prop="file_num" label="文档数量">                                      
                        </el-table-column>
                        <el-table-column prop="app_date" label="申请日期">                                      
                        </el-table-column>
                        <el-table-column prop="app_end_date" label="查阅结束日期">                                      
                        </el-table-column>
                        <el-table-column prop="user_name" label="查阅人">                                      
                        </el-table-column>
                        <el-table-column prop="app_type_name" label="查阅目的"> 
                             <!-- <template slot-scope="scope"> 
                                <span  >giveAppTypeName(scope.row.app_date)</span>
                            </template>                                       -->
                        </el-table-column>
                        <el-table-column prop="reception_name" label="接待机构">                                      
                        </el-table-column>
                        <el-table-column prop="audit_status" label="状态"> 
                            <template slot-scope="scope"> 
                                <span v-if="scope.row.audit_status ==1">部分通过</span>
                                <span v-if="scope.row.audit_status ==2">审批中</span>
                                <span v-if="scope.row.audit_status ==4">已驳回</span>
                                <span v-if="scope.row.audit_status ==6">全部通过</span>
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
    import Service from './handleApply.service';
    @Component
    export default class handleApply extends Vue{
        bodyHeight: number = document.documentElement.clientHeight - 303 ; 
        activeName: string = '0';
        searchFormModel: any = {
            'applyUserName':'',
            'startDate':'',
            'endDate':''
        };
        tableDataList: any =[];
        tabeLoading: boolean = false;
        total: number = 0;
        page: number = 1;
        pageSize: number = 25;   
        dictDataList:   any = [];             
        
        handleClick(){
            this.searchFormModel.applyUserName = '';
            this.searchFormModel.startDate = '';
            this.searchFormModel.endDate = '';
            this.searchResult();
        };
        searchResult(){
            this.page = 1;
            this.total = 0;
            //  this.pageSize
            this.queryResult();
        };
        queryResult(){
            let params = {
                audit: this.activeName,
                page: this.page-1,
                pageSize: this.pageSize
            };
            this.tabeLoading = true;
            params  = Object.assign(params, this.searchFormModel);
            Service.queryMyAuditUtilize(params).then(res=>{
                this.tabeLoading = false;
                if(res.data.succeeded){
                    this.tableDataList = res.data.data.content;
                    this.total = res.data.data.totalElements;
                    for(let data of this.tableDataList){
                        let at = data.app_type;
                        if(at){
                            for(let dict of this.dictDataList){
                                if(dict.code == at.toString()){
                                    data.app_type_name = dict.displayText;
                                }
                            }
                        }
                    }
                }
            });
        }

        //   显示查阅单详情
        showDetail(row){
            debugger;
            window.sessionStorage.setItem("handleApply_activeName", this.activeName);
            window.sessionStorage.setItem("handleApplyDetail_appNo", row.application_no);
            window.sessionStorage.setItem("handleApplyDetail_passedAuditStatus", row.audit_status);
            window.sessionStorage.setItem("handleApplyDetail_receptionAgentName", row.reception_name);
            this['$router'].push({
                path:"/myBorrow/handleBorrowApply/handleApplyDetail",
            })
        };
        
        handleCurrentChange(val:number) {
            this.page = val;
            this.queryResult();        
        };
        handleSizeChange(val:number) {
            this.pageSize = val;
            this.queryResult();        
        };
        created(){  
            Service.getDictListByDictId(39).then((res) =>{
                this.dictDataList = res.data.data;
            });
                        
        };

        mounted(){
            if(window.sessionStorage.getItem("handleApply_activeName")){
                this.activeName = window.sessionStorage.getItem("handleApply_activeName");
            }
            this.queryResult();
            window.sessionStorage.removeItem("handleApply_activeName"); 
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