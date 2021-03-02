<template>
    <section class="wrapprSection">
        <div class="mainTitle">
            <span>鉴定管理</span>
        </div>
        <div class="contentbox contentbox-full "> 
            <el-tabs v-model="activeName" type="card" class="erpTab" @tab-click="tabClick"> 
                <el-tab-pane label="未提交" name="1">                                   
                </el-tab-pane>                           
                <el-tab-pane label="鉴定中" name="2">
                </el-tab-pane>                        
                <el-tab-pane label="已鉴定" name="3">                                   
                </el-tab-pane>                           
            </el-tabs>  
            <div class="searchKey boxshow">           
                <el-form :inline="true" > 
                    <el-form-item label="任务名称：">
                        <el-input placeholder="请输入申请单号" clearable v-model="searchTaskName" size="small"></el-input>
                    </el-form-item>              
                    <el-form-item label="鉴定类型：">
                        <dictSelect :dictId="55" :dictModel="searchTaskType"  :dictDisabled="false" @dictChange="val => (this.searchTaskType =val)" style="width:100%;"></dictSelect>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="defaultBtn"  @click="searchIdentifyDatas">检索</el-button>
                    </el-form-item>
                </el-form>
                <div class="searchBorrowCon ">                                
                    <el-table ref="tableRef"
                        :data="tableDataList"
                        border
                        :height="bodyHeight"
                        element-loading-text="努力加载中..."
                        v-loading="tableLoading"
                        header-row-class-name="tableHeader" 
                        stripe 
                        class="defaultTable">
                            <el-table-column  prop="name" label="操作"  width="120">
                                <template slot-scope="scope">                                                 
                                    <el-button class="tabletoolBtn" @click="toIdentifyDetails(scope.row)">详情</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taskTypeDict.displayText" label="鉴定类型">                                      
                            </el-table-column>
                            <el-table-column prop="taskName" label="鉴定任务">                                      
                            </el-table-column>
                            <el-table-column prop="planNum" label="鉴定数量">                                      
                            </el-table-column>
                            <el-table-column prop="taskBeginDate" label="鉴定开始日期" :formatter="dateFormat">                                      
                            </el-table-column> 
                            <el-table-column prop="taskEndDate" label="预计完成日期" :formatter="dateFormat">                                      
                            </el-table-column>
                            <el-table-column prop="createPerson" label="鉴定创建人">                                      
                            </el-table-column> 
                            <el-table-column prop="taskStatusDict.displayText" label="状态">                                      
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
    import Service from './myIdentifyMgnt.service';
    import moment from 'moment';

    @Component
    export default class identificationTask extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 303 ; 
        activeName: string = '1';
        searchTaskName: string = "";
        searchTaskType: string = "";
        tableLoading: boolean = false;
        tableDataList : any = [];
        total: number = 1;
        page: number = 1;
        pageSize: number = 25;  
        
        tabClick(){
            this.searchTaskName = '';
            this.searchTaskType = '';
            this.page = 1;
            this.pageSize = 25;
            this.queryIdentifyDatas();
        };
        searchIdentifyDatas(){
            this.total = 0;
            this.queryIdentifyDatas();
        }
        // 检索
        queryIdentifyDatas(){
            let params = {
                taskName: this.searchTaskName,
                taskType: this.searchTaskType,
                taskStatus: this.activeName,
                page: this.page,
                pageSize: this.pageSize
            };
            this.tableLoading = true; 
            Service.getAppraisalByUserList(params).then((res) =>{
                this.tableLoading = false; 
                if(res.data.succeeded){ 
                    this.total =  res.data.totalRecords;                         
                    this.tableDataList = res.data.data;                    
                }else{
                    this['$message']({
                        message: '查询文档列表失败！',
                        type: 'error'
                    });
                }
            });  
        };
        toIdentifyDetails(row){
            window.sessionStorage.setItem("myIdentifyMgnt_activeName", this.activeName);
            window.sessionStorage.setItem("myIdentifyDetail_passedIdentify", JSON.stringify(row));
            window.sessionStorage.setItem("myIdentifyDetail_returnPath", '/myIdentify/myIdentifyMgnt');
            this.$router.push({path:'/myIdentify/myIdentifyDetail/myIdentifyDetail'});
        };
        handleCurrentChange(val) {
            this.page = val;
            this.searchIdentifyDatas();
        };
        handleSizeChange(val) {
            this.pageSize = val;
            this.searchIdentifyDatas();
        };
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYYMMDD");
        };
        created(){ 
            this.activeName =  window.sessionStorage.getItem("myIdentifyMgnt_activeName") || '1';
            window.sessionStorage.removeItem("myIdentifyMgnt_activeName"); 
            this.queryIdentifyDatas();    
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
    @import '../../styles/myBorrow/borrow.scss';
</style>