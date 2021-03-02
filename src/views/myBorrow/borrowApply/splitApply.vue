
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>查看查阅单</span>
        </div> 
        <div class="boxshow clear pd10 loanAppertext">           
            根据您查阅文档的所属档案馆和控制标识拆分成以下 <span class="textBlue" v-if="passedObj.lookUpList && passedObj.assistList">{{passedObj.lookUpList.length + passedObj.assistList.length}}</span> 条查阅单。
            <p class="rt">
                <!-- 查阅申请、协查代办、受理登记，提交后都到此拆带界面 -->
                <el-button class="defaultBtn" @click="showMyHandledList">{{btnText}}</el-button>
            </p>
        </div>
        <div class="contentbox contentbox-full "> 
            <div class="tipPlanwrappr" v-for="(lookup,index) in passedObj.lookUpList" :class="index==0?'':'mt10'" >
                <div  class="tipPlan">
                    <div class="tipPlanTitle">
                        <div class="tip">{{index+1}}</div>
                    </div>
                    <div class="tipPlanbody">
                        <el-tabs v-model="activeName" type="card" class="erpTab">
                            <el-tab-pane :label="setLabel(lookup)" name="first">   
                                 <div class="boxshow bgwhite clear">
                                    <div class="list lt m0" style="width:300px;padding:10px;">
                                        <ul class="ulList clear">
                                            <li style="width: 300px;padding: 10px;">[查阅用户]：<b>{{passedUser.fullName}}</b></li>
                                            <li style="width: 300px;padding: 10px;">[工作单位]：<b>{{passedUser.address}}</b></li> 
                                            <!-- <li v-if="session.userType =='System'">[部门]：<b>{{department}}</b></li>  -->
                                        </ul>  
                                    </div> 
                                    <el-form label-width="130px" size="small" ref="formRef"  style="float: left; width: 75%;border-left: 1px solid #ccc;">
                                        <table class="mt10">
                                            <tr>
                                                <td>
                                                    <el-form-item label="接待馆：" >
                                                        <el-input class="checkName percentName" readonly v-model="passedObj.basicForm.org"></el-input>
                                                    </el-form-item> 
                                                </td>
                                                <td>
                                                    <el-form-item label="查阅目的："  class="diabledSelect" >
                                                        <dictSelect :dictId="39" :dictModel="passedAppType" :dictDisabled="true" size="small" ></dictSelect> 
                                                    </el-form-item>
                                                </td>
                                                <td>
                                                    <el-form-item label="查阅结束时间："   >
                                                        <el-date-picker type="date" v-model="passedObj.basicForm.appEndDate" readonly   size="small"></el-date-picker>
                                                    </el-form-item>
                                                </td>
                                            </tr>
                                            <!-- 协查显示关键字，如果是普通的查阅单需显示 查阅内容和备注 -->
                                            <tr v-if="passedObj.basicForm.keyWord!=undefined">
                                                <td  colspan="3">
                                                    <el-form-item   label="检索关键词："  > {{passedObj.basicForm.keyWord}}</el-form-item>
                                                </td>
                                            </tr>
                                            <tr v-if="passedObj.basicForm.keyWord==undefined">
                                                <td  colspan="3">
                                                    <el-form-item   label="查阅内容："  > {{passedObj.basicForm.lookupDescription}}</el-form-item>
                                                </td>
                                            </tr>
                                            <tr v-if="passedObj.basicForm.keyWord==undefined">
                                                <td  colspan="3">
                                                    <el-form-item   label="备注："  >  {{passedObj.basicForm.comments}}</el-form-item>
                                                </td>
                                            </tr>
                                        </table>                            
                                    </el-form> 
                                </div>            
                            </el-tab-pane>
                        </el-tabs>
                        <el-tabs v-model="activeName" type="card" class="erpTab mt10">
                            <el-tab-pane label="审批流程" name="first">   
                                <div class="boxshow bgwhite pd10">
                                    <p>
                                        申请人【<b>{{passedUser.fullName}}</b>】  
                                        <span v-for="pro of lookup.utilizeProcesses">
                                                ➜ {{pro.roleName}}  
                                        </span>
                                    </p>                 
                                </div>            
                            </el-tab-pane>
                        </el-tabs>
                        <div class="relative mt10"> 
                            <div class="TabRBtn tabRtext" style="line-height: 42px;">
                                <b class="lt">共{{lookup.utilizeInfos.length}}份文件</b>
                            </div>                                          
                            <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                                <el-tab-pane label="待查阅文档" name="first">
                                    <div class="boxshow">   
                                    <el-table
                                            :data="lookup.utilizeInfos"
                                            border
                                            height="200"
                                            element-loading-text="努力加载中..."
                                            header-row-class-name="tableHeader" 
                                            stripe 
                                            class="tableInTab">                                                               
                                            <el-table-column prop="archiveDH" label="档号">
                                                <template slot-scope="scope">                                                 
                                                    <span v-html="scope.row.archiveDH"></span>                         
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="fondCode" label="全宗号">                                      
                                            </el-table-column>
                                            <el-table-column prop="year" label="年度">                                      
                                            </el-table-column>
                                            <el-table-column prop="archiveTM" label="题名">                                      
                                            </el-table-column>
                                            <el-table-column prop="kindName" label="门类">                                      
                                            </el-table-column>
                                            <el-table-column prop="controlId" label="控制标识"> 
                                                <template slot-scope="scope">  
                                                    <span>{{BorrowUtils.renderControlId(scope.row.controlId)}}</span>                                               
                                                </template>                                      
                                            </el-table-column>
                                            <el-table-column prop="archiveXMMCNEW" label="档案馆">                                      
                                            </el-table-column>
                                        </el-table>
                                    </div> 
                                </el-tab-pane>                                                     
                            </el-tabs> 
                        </div>              
                    </div>
                </div>
            </div>
            <div class="tipPlanwrappr mt10" v-show="passedObj!=null"  v-for="(lookup,index) in passedObj.assistList" :key="index">
                <div  class="tipPlan">
                    <div class="tipPlanTitle">
                        <div class="tip">{{index+1+passedObj.lookUpList.length}}</div>
                    </div>
                    <div class="tipPlanbody">
                        <el-tabs v-model="activeName" type="card" class="erpTab">
                            <el-tab-pane :label="setLabel(lookup)" name="first"> 
                                <div class="boxshow bgwhite clear disFlex" >
                                    <div class="uMsg" style="padding:10px;">
                                        <ul class="ulList clear">
                                            <li style="width: 300px;padding: 10px;">[查阅用户]：<b>{{passedUser.fullName}}</b></li>
                                            <li style="width: 300px;padding: 10px;">[工作单位]：<b>{{passedUser.address}}</b></li> 
                                        </ul>  
                                    </div>
                                    <div class="flex1">
                                        <el-form ref="form"  label-width="100px" class="lt pd5 borderleft w100 "  size="small"  >
                                            <div class="disFlex">
                                                <el-form-item label="接待馆：" class ="lt flex1" >
                                                    <el-input class="checkName percentName" readonly style="width: 150px;" v-model="passedObj.basicForm.org"></el-input>
                                                </el-form-item>
                                                <el-form-item label="查阅目的：" class ="lt diabledSelect flex1">
                                                    <dictSelect :dictId="39" :dictModel="passedAppType" :dictDisabled="true" ></dictSelect>
                                                </el-form-item>
                                                <el-form-item label="查阅结束日期：" class ="lt flex1" label-width="120px"> 
                                                    <el-date-picker type="date" v-model="passedObj.basicForm.appEndDate" readonly  size="small"></el-date-picker>
                                                </el-form-item>
                                            </div>
                                            <div class="disFlex">
                                                <el-form-item label="检索关键词："  class ="flex1">{{lookup.keyWord}}
                                                </el-form-item>
                                            </div>
                                        </el-form>
                                    </div>
                                </div>    
                            </el-tab-pane>
                        </el-tabs>
                        <div class="relative mt10"> 
                            <div class="TabRBtn tabRtext">
                                <b class="lt"></b>
                            </div>                                          
                            <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                                <el-tab-pane label="待协查文档" name="first">
                                    <div class="boxshow">   
                                        <el-table
                                            :data="lookup.tableList"
                                            border
                                            height="100"
                                            element-loading-text="努力加载中..."
                                            header-row-class-name="tableHeader" 
                                            stripe 
                                            class="defaultTable mt0">                                                               
                                            <el-table-column prop="receptionName" label="馆藏馆名称">                                      
                                            </el-table-column>
                                            <el-table-column prop="keyWord" label="关键字">                                      
                                            </el-table-column>
                                            <el-table-column prop="count" label="档案数量">                                      
                                            </el-table-column>
                                        </el-table>
                                    </div> 
                                </el-tab-pane>                                                     
                            </el-tabs> 
                        </div>              
                    </div>
                </div>
            </div>
        </div>    
    </section>
</template>  
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrowApply.service';   
    import BorrowUtils from '@/views/myBorrow/utils/borrowUtilsApi.js';
    Vue.prototype.BorrowUtils = BorrowUtils;
    @Component
    export default class appLoanAppear extends Vue{ 
        bodyHeight: number= document.documentElement.clientHeight - 363 ; 
        activeName:string = 'first';
        tableData: any =[];
        passedObj: any = {};
        total: number = 1;
        passedUser: any = {};
        passedAppType: string = '';
        btnText: string = '';
        returnPath: string = '';

        xiechaTableData(lookup){
            let arr = [];
            if(lookup){
                return arr.push(lookup);
            }
            return [];
        }
        setLabel(lookup){
            return `查阅单号：${lookup.applicationNo}`
        }
        setAssistData(lookup){
            let arr = [];
            return arr.push(lookup);
        }
        showMyHandledList(){
            //普通借阅单 ---> 我的查阅单
            //受理登记 --->  受理登记
            //协查办理 --->  协查办理
            window.sessionStorage.removeItem("helpBorrowApply_user");
            window.sessionStorage.removeItem("splitApply_passedObj");
            window.sessionStorage.removeItem("splitApply_toHandleList");
            this['$router'].push({
                path: this.returnPath,
            });
            
        }
        created(){ 
            this.passedObj = JSON.parse(window.sessionStorage.getItem("splitApply_passedObj")) ; 
            if(this.passedObj && this.passedObj.lookUpList){
                this.passedObj.lookUpList.reverse();
            }
        };
        mounted(){
            this.returnPath = window.sessionStorage.getItem("splitApply_toHandleList"); 
            if(this.returnPath){
                if(this.returnPath.includes("myHelpSearchAndApply")){
                    this.btnText = "协查办理";
                }else{
                    this.btnText = "受理登记";
                }
            }else{
                this.returnPath = '/myBorrow/borrow';
                this.btnText = "查看我的借阅单";
            }
            this.passedUser = JSON.parse(window.sessionStorage.getItem("helpBorrowApply_user")) ; 
            this.passedAppType = this.passedObj.basicForm.appType;
             
            if(!this.passedUser.fullName){
                this.passedUser.fullName = window.sessionStorage.getItem("username");
            }  
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 363;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
     @import '../../../styles/innerPublic.scss';
     @import '../../../styles/retrieve/loanAppear';
    
</style>