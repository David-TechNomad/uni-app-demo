<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>受理登记查询</span>
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
                    <el-form-item label="单号:">
                         <el-input v-model="searchFormModel.appNo" placeholder="请输入单号" size="small"></el-input>
                    </el-form-item>              
                    <el-form-item label="申请日期:">
                        <el-date-picker v-model="searchFormModel.startDate" size="small" type="date"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName"></el-date-picker>
                        <span style="margin:0 10px">至</span>
                        <el-date-picker v-model="searchFormModel.endDate" size="small" type="date"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期"  ref="endDate"></el-date-picker>
                    </el-form-item>
                     <el-form-item label="状态：" >
                        <el-select v-model="searchFormModel.auditStatus" size="small" v-if="activeName=='1'">
                            <el-option v-for="dict of helpBorrowStatus" :label="dict.value" :value="dict.key" :key="dict.key"> </el-option>
                        </el-select>
                        <el-select v-model="searchFormModel.auditStatus" size="small" v-if="activeName=='2'">
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
                        header-row-class-name="tableHeader" 
                        stripe 
                        class="defaultTable">
                        <el-table-column  prop="name" label="操作" v-if="activeName=='1'" width="120"  :key="Math.random()">
                            <template slot-scope="scope">                                                 
                                <el-button  class="tabletoolBtn" @click="showDetail(scope.row)">详情</el-button>
                                <el-button v-if="(scope.row.auditStatus==6 || scope.row.auditStatus==1)&& (!scope.row.returnMessage)" class="tabletoolBtn" @click="showFeedBack(scope.row)">填写利用效果</el-button>
                                <!-- 借阅外馆受控档案，并且通过审批，显示远程利用报表 -->
                                <el-button  v-if="(scope.row.auditStatus==6 || scope.row.auditStatus==1) && (scope.row.code!=scope.row.receptionCode)"  class="tabletoolBtn" @click="printUseMsg(scope.row)">远程利用单</el-button>
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
                        <el-table-column v-if="activeName=='1'" prop="appTypeDict.displayText" label="查阅目的"  :key="Math.random()">                                      
                        </el-table-column>
                        <el-table-column  v-if="activeName=='1'" prop="appDate" label="申请日期" :formatter="BorrowUtils.dateFormat"  :key="Math.random()">                                      
                        </el-table-column>
                        <el-table-column  v-if="activeName=='2'" prop="applyDate" label="申请日期" :formatter="BorrowUtils.dateFormat"  :key="Math.random()">                                      
                        </el-table-column>
                        <el-table-column v-if="activeName=='1'" prop="auditStatus" label="状态"  :key="Math.random()">  
                            <template slot-scope="scope">   
                                <span  v-if="scope.row.auditStatus==1">部分通过</span>
                                <span  v-if="scope.row.auditStatus==2">审核中</span>
                                <span  v-if="scope.row.auditStatus==4">已驳回</span>
                                <span  v-if="scope.row.auditStatus==5">已结束</span>
                                <span  v-if="scope.row.auditStatus==6">全部通过</span>                                                  
                            </template>
                        </el-table-column>  
                        <el-table-column v-if="activeName=='2'" prop="status" label="状态"  :key="Math.random()">  
                            <template slot-scope="scope">   
                                 <span v-if="scope.row.status ==0">未审核</span>
                                <span v-if="scope.row.status ==1">通过</span>
                                <span v-if="scope.row.status ==2">已驳回</span>
                            </template>                                  
                        </el-table-column>                                                                        
                    </el-table>  
                    <div class="clear" style="margin-top:10px">                         
                        <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                    </div>  
                </div> 
              </div>
        </div> 
        <el-dialog
            title="填写利用效果"
            :visible.sync="dialogVisible"
            top="10%"
            class="myDialogCenter" :append-to-body='true'>        
            <el-form ref="form"  label-width="90px" class="lt pd10"   size="small"  style="width:100%;">
                <el-form-item label="利用效果：">
                    <el-input type="textarea" maxlength="200"  rows="10"  v-model.trim="feedbackMsg"></el-input>
                </el-form-item>
            </el-form>  
            <span slot="footer" class="dialog-footer">
                <el-button class="defaultBtn" @click="submitFeedBack">提交</el-button>
                <el-button class="defaultBtn" @click="dialogVisible= false;">取消</el-button>
            </span>          
        </el-dialog>    
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './helpBorrowMgnt.service';
    import dictDatas from '@/views/myBorrow/utils/dictDatas.js';
    import { Loading } from 'element-ui';
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
        tabeLoading: boolean = false;
        total: number = 1;
        page: number = 1;
        pageSize: number = 25;  
        helpBorrowStatus: any = [];  
        dialogVisible: boolean = false;
        feedbackMsg: string = '';   
        clickedApplicationNo : string = '';             

        searchResult(){
            this.page = 1;
            this.total = 0;
            this.queryResult();
        };
        queryResult(){
            if(this.activeName == "1"){
                this.queryAppyList();
            }else{
                this.queryAssistList();
            }
        };
        queryAppyList(){
            let params = {
                page: this.page-1,
                pageSize: this.pageSize,
            };
            this.tabeLoading = true;
            let form = Object.assign({}, this.searchFormModel);
            form.auditStatus = form.auditStatus==""? 0: form.auditStatus;
            params = Object.assign(params, form);
            Service.queryUtilizeLookupByReceptionCode(params).then(res=>{
                this.tabeLoading = false;
                if(res.data.succeeded){
                    //debugger;
                    this.tableDataList = res.data.data.content;
                    this.total = res.data.data.totalElements;
                }
            });
        }
        queryAssistList(){
            let param = {
                "page": this.page-1,
                "pageSize": this.pageSize,
                "status": this.searchFormModel.auditStatus==""?0: Number(this.searchFormModel.auditStatus)
            }
            this.tabeLoading = true;
            param = Object.assign(param, this.searchFormModel);
            Service.queryApplyAssistSelectByFirstReceptionCode(param).then(res=>{
                this.tabeLoading = false;
                if(res.data.succeeded){
                    this.tableDataList = res.data.data.content;
                    this.total = res.data.data.totalElements;
                }
            });
        }

        //   显示查阅单详情
        showDetail(row){
                // this['$router'].push({
                //     path:"/myBorrow/helpBorrow/helpBorrowApplyDetail",
                // })
            if(this.activeName=='1'){//查阅
                window.sessionStorage.setItem("helpBorrowMgnt_activeName", this.activeName);
                window.sessionStorage.setItem('borrowDetail_applicationNo', row.applicationNo);
                window.sessionStorage.setItem('borrowDetail_returnPath', "/myBorrow/helpBorrow/helpBorrowMgnt");
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
        showFeedBack(row){
            this.dialogVisible = true;
            this.clickedApplicationNo = row.applicationNo;
        };
        submitFeedBack(){
            if(this.feedbackMsg){
                let loadingInstance = Loading.service({
                    lock: true,
                    text: '正在提交，请稍等',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let params = {
                    appNo: this.clickedApplicationNo,
                    message: this.feedbackMsg
                };
                Service.updateReturnMessage(params).then(res => {
                    loadingInstance.close();
                    if(res.data.succeeded){
                        this.dialogVisible = false;
                        this.queryResult();
                    }else{
                        this['$message']({
                            message: '填写利用效果失败',
                            type: 'error'
                        });
                    }
                });

            }else{
                this['$message']({
                    message: '请填写利用效果!',
                    type: 'warning'
                });
            }
        }
        printUseMsg(row){
            Service.workPrint({
                "classNo": "08",
                "applicationNo": row.applicationNo
            }).then((res) =>{
                //debugger;
                if(res.type=='application/json') {
                    let that = this;
                    let reader = new FileReader();
                    reader.readAsText(res);
                    reader.onload = function(event) {
                        // 文件里的文本会在这里被打印出来
                        let str = JSON.parse(event.target.result)
                        that.Warn(str.errorMessage);
                    };
                } else {
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        let csvData = new Blob([res],{type: 'application/pdf'});
                        window.navigator.msSaveOrOpenBlob(csvData,'document.pdf');
                    }else{
                        let url = window["URL"].createObjectURL(new Blob([res],{type: 'application/pdf'}));
                        window.open(url);
                    }
                }
            });
        };
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
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
            this.activeName = window.sessionStorage.getItem("helpBorrowMgnt_activeName") || '1';
            this.queryResult();         
            window.sessionStorage.removeItem("helpBorrowMgnt_activeName");            
        };

        mounted(){
            this.helpBorrowStatus = dictDatas.helpBorrowStatus;
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 303;
                })()
            };
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';   
    @import '../../../styles/selfTip/borrow.scss';
</style>