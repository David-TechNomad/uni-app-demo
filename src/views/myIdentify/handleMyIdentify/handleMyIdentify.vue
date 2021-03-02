<template>
    <section class="wrapprSection">
        <div class="mainTitle">
            <span>鉴定审批</span>
        </div>
        <div class="contentbox contentbox-full "> 
            <el-tabs v-model="activeName" type="card" class="erpTab" @tab-click="searchHandleIdentifyList">                           
                <el-tab-pane label="待审批" name="2">
                </el-tab-pane>                        
                <el-tab-pane label="已审批" name="3">                                   
                </el-tab-pane>                           
            </el-tabs>  
            <div class="searchKey boxshow">           
                <el-form :inline="true"  > 
                    <el-form-item label="任务名称：">
                            <el-input class="checkName" clearable v-model="searchTaskName" size="small"></el-input>
                    </el-form-item>              
                    <el-form-item label="鉴定类型：" >
                        <dictSelect :dictId="55" :dictModel="searchTaskType"  :dictDisabled="false" @dictChange="val => (this.searchTaskType =val)" style="width:100%;"></dictSelect>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="defaultBtn" @click="searchHandleIdentifyList">检索</el-button>
                    </el-form-item>
                </el-form>
                <div class="searchBorrowCon ">                                
                    <el-table
                        :data="tableDataList"
                        border
                        :height="bodyHeight"
                        v-loading="tableLoading"
                        element-loading-text="努力加载中..."
                        header-row-class-name="tableHeader" 
                        stripe 
                        class="defaultTable">
                        <el-table-column  prop="name" label="操作"  width="120">
                            <template slot-scope="scope">                                                 
                                <el-button class="tabletoolBtn" v-if="activeName=='2'" @click="toHandleIdentifyDetails(scope.row)">审批</el-button>
                                <el-button class="tabletoolBtn" v-if="activeName=='3'"  @click="toHandleIdentifyDetails(scope.row)">详情</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="taskTypeDict.displayText" label="鉴定类型">                                      
                        </el-table-column>
                        <el-table-column prop="taskName" label="鉴定任务">                                      
                        </el-table-column>
                        <el-table-column prop="planNum" label="计划鉴定数量">                                      
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
    import Service from './handleMyIdentify.service';
    import moment from 'moment';
    @Component
    export default class identificationTask extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 303 ; 
        activeName:string = '2';
        searchTaskName: string = '';
        searchTaskType: string = '';
        tableDataList: any = [];
        tableLoading: boolean = false;
        
        total: number = 0;
        page: number = 1;
        pageSize: number = 100;                  
        
        //检索
        searchHandleIdentifyList(){
            this.page = 1;
            this.pageSize = 100;
            this.getHandleIdentifyList();
        }
        getHandleIdentifyList(){
            let params = {
                taskStatus: this.activeName,
                taskType: this.searchTaskType,
                taskName: this.searchTaskName,
                page: this.page,
                pageSize: this.pageSize
            }
            this.tableLoading = true;
            Service.getHandleIdentifyList(params).then(res => {
                this.tableLoading = false;
                if(res.data.succeeded){
                    this.tableDataList = res.data.data;
                    this.total = res.data.total;
                }
            });
        }
        toHandleIdentifyDetails(row){
            //debugger
            if(row.taskStatus=='2'){
                window.sessionStorage.setItem("handleMyIdentifyDetail_passedIdentify", JSON.stringify(row));
                this.$router.push({path:'/myIdentify/handleMyIdentify/handleMyIdentifyDetail'});
            }else{
                window.sessionStorage.setItem("myIdentifyDetail_returnPath", '/myIdentify/handleMyIdentify/handleMyIdentify');
                window.sessionStorage.setItem("myIdentifyDetail_passedIdentify", JSON.stringify(row));
                this.$router.push({path:'/myIdentify/myIdentifyDetail/myIdentifyDetail'});
            }
        };
        handleCurrentChange(val) {
            this.page = val;
            this.getHandleIdentifyList();
        };
        handleSizeChange(val) {
            this.pageSize = val;
            this.getHandleIdentifyList();
        };
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYYMMDD");
        };
        created(){  
            this.getHandleIdentifyList();    
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
    @import '../../../styles/myBorrow/borrow.scss';
</style>