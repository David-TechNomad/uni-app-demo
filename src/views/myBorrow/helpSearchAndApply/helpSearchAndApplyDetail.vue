<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>协查办理详情</span>
           <el-button class="defaultBtn rt mt10"  @click="Goback">返回</el-button>
        </div> 
        <div class="contentbox contentbox-full" :class="passedActiveName=='0'? 'bt50': ''">      
            <el-tabs v-model="activeName" type="card" class="erpTab">
                <el-tab-pane label="查阅信息" name="first">   
                    <div class="boxshow bgwhite clear">
                        <div class="list lt" style="border-right: 1px solid #ccc;">
                            <!-- 协查办理可以【查看】 -->
                            <userMsgCom ref="userMsgComRef"></userMsgCom>
                        </div> 
                        <el-form ref="form"  label-width="150px" class="lt pd10"  size="small" :model="passedObj"  >
                            <tr>
                                <td>
                                    <el-form-item label="接待馆" class ="lt">
                                         <el-input class="checkName percentName" readonly v-model="passedObj.firstReceptionName"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="查阅目的"  class ="lt diabledSelect">
                                        <dictSelect :dictId="39" :dictModel="passedObj.applyType" :dictDisabled="true" @dictChange="val => {this.detailData.applyType = val;}"></dictSelect>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <el-form-item label="查阅开始日期" class ="lt"   > 
                                        <el-date-picker type="date" style="width: 172px;" v-model="passedObj.applyDate" readonly placeholder="选择日期" size="small"></el-date-picker>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="查阅结束日期" class ="lt" > 
                                        <el-date-picker type="date" style="width: 187px;" v-model="passedObj.endDate" readonly placeholder="选择日期" size="small"></el-date-picker>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <el-form-item label="检索关键词"><b>{{passedObj.keyWord}}</b></el-form-item>
                                </td>
                            </tr>
                        </el-form> 
                    </div>            
                </el-tab-pane>
            </el-tabs>
            <div class="relative" style="padding-top:10px"> 
                <div class="TabRBtn" v-if="passedActiveName=='0'">
                    <!-- 本馆受控档案 -->
                    <el-button class="defaultBtn rt" @click="qwAddSelfControlFiles"><i class="fa fa-plus-square" aria-hidden="true"></i> 全文检索受控档案</el-button>
                    <el-button class="defaultBtn rt" @click="mlAddSelfControlFiles"><i class="fa fa-plus-square" aria-hidden="true"></i> 目录检索受控档案</el-button>
                </div>                                    
                <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                    <el-tab-pane label="待查阅文档" name="first">
                        <div class="boxshow bgwhite">   
                        <el-table v-if="passedActiveName=='0'"
                            :data="tableDataList"
                            border stripe 
                            :height="bodyHeight"
                            element-loading-text="努力加载中..."
                            header-row-class-name="tableHeader" 
                            class="tableInTab">
                            <el-table-column type="index" label="序号" width="50">
                            </el-table-column>
                            <el-table-column  prop="name" label="操作"  width="120" >
                                <template slot-scope="scope">                                                 
                                    <el-button class="tabletoolBtn" @click="deleteArchive(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ATTACHED_FILE_FLAG" label="原文"  width="55">
                                <template slot-scope="scope">  
                                    <span > <i class="fa fa-paperclip tableIcon" v-if="scope.row.ATTACHED_FILE_FLAG=='true'"></i> </span> 
                                </template>   
                            </el-table-column>
                            <el-table-column prop="ARCHIVAL_CODE" label="档号">
                                <template slot-scope="scope">                                                 
                                    <span v-html="scope.row.ARCHIVAL_CODE"></span>                         
                                </template>
                            </el-table-column>
                            <el-table-column prop="FONDS_CODE" label="全宗号">  
                                    <template slot-scope="scope">                                                 
                                    <span v-html="scope.row.FONDS_CODE"></span>                         
                                </template>                                    
                            </el-table-column>
                            <el-table-column prop="YEAR" label="年度">  
                                <template slot-scope="scope">                                                 
                                    <span v-html="scope.row.YEAR"></span>                         
                                </template>                                    
                            </el-table-column>
                            <el-table-column prop="TITLE" label="题名">    
                                 <template slot-scope="scope">                                                 
                                    <span v-html="scope.row.TITLE"></span>                         
                                </template>                                   
                            </el-table-column>
                            <el-table-column prop="kindName" label="门类">                                      
                            </el-table-column>
                            <el-table-column prop="CONTROL_ID" label="控制标识">  
                                <template slot-scope="scope">  
                                        <span>{{BorrowUtils.renderControlId(scope.row.CONTROL_ID)}}</span>                                               
                                </template>                                     
                            </el-table-column>
                            <el-table-column prop="archiveAgentName" label="档案馆">                                      
                            </el-table-column>
                        </el-table>
                        <el-table v-if="passedActiveName=='1'"
                            :data="tableDataList"
                            border stripe 
                            :height="bodyHeight"
                            element-loading-text="努力加载中..."
                            header-row-class-name="tableHeader" 
                            class="tableInTab">
                            <el-table-column   prop="applicationNo" label="查阅单号"  :key="Math.random()">
                            </el-table-column>
                            <el-table-column   prop="receptionName" label="接待机构"  :key="Math.random()">                                      
                            </el-table-column>
                            <el-table-column   prop="appTypeDict.displayText" label="查阅方式"  :key="Math.random()">                                      
                            </el-table-column>
                            <el-table-column   prop="fileNum" label="文档数量"  :key="Math.random()">                                      
                            </el-table-column>
                            <el-table-column   prop="appDate" label="申请日期" :formatter="BorrowUtils.dateFormat"  :key="Math.random()">                                      
                            </el-table-column>
                            <el-table-column    prop="appEndDate" label="查阅结束日期"  :formatter="BorrowUtils.dateFormat"  :key="Math.random()">                                      
                            </el-table-column>
                            <el-table-column   prop="auditStatus" label="状态"  :key="Math.random()">  
                                <template slot-scope="scope"> 
                                    <span v-if="scope.row.auditStatus ==1">部分通过</span>
                                    <span v-if="scope.row.auditStatus ==2">审批中</span>
                                    <span v-if="scope.row.auditStatus ==4">已驳回</span>
                                    <span v-if="scope.row.auditStatus ==6">全部通过</span>
                                </template>                                           
                            </el-table-column>  
                        </el-table>
                    </div> 
                </el-tab-pane>                                                       
                </el-tabs> 
            </div>               
        </div>
        <div class="mt10 footerBar" v-if="passedActiveName=='0'">
            <el-button class="defaultBtn" @click="submitApply('form')">提交查阅申请</el-button>
            <el-button class="defaultBtn" @click="showCancelDialog" >驳回</el-button>
            <el-button class="defaultBtn"  @click="Goback">取消</el-button> 
        </div> 
        <el-dialog
            title="填写驳回理由"
            :visible.sync="dialogVisible"
            top="10%"
            class="myDialogCenter" :append-to-body='true'>        
            <el-form ref="form"  label-width="70px" class="lt pd10"   size="small"  style="width:100%;">
                <el-form-item label="驳回理由：">
                    <el-input type="textarea" maxlength="200"  rows="10"  v-model="cancelMsg"></el-input>
                </el-form-item>
            </el-form>  
            <span slot="footer" class="dialog-footer">
                <el-button class="defaultBtn" @click="submitCancel">提交</el-button>
                <el-button class="defaultBtn" @click="dialogVisible= false;">取消</el-button>
            </span>          
        </el-dialog>    
    </section>
</template>     
<script lang="ts">
    import { Component, Vue, Watch ,Prop} from 'vue-property-decorator';   
    import Service from './helpSearchAndApplyDetail.service';
    import { Loading } from 'element-ui';
    import moment from 'moment';
    import userMsgCom from '@/views/myBorrow/utils/leftUserMsgCom.vue';
    import BorrowUtils from '@/views/myBorrow/utils/borrowUtilsApi.js';
    Vue.prototype.BorrowUtils = BorrowUtils;
    @Component({
        components: {
            userMsgCom
        }
    })
    export default class loanSlip extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 453 ; 
        activeName: string = 'first';
        passedObj: any = {};
        passedActiveName: string = '';
        tableDataList: any =[];
        total: number = 1;
        dialogVisible: boolean = false;
        cancelMsg: string = '';

        Goback(){
            //可能返回 我的协查 或者 协查办理界面
            let path =  window.sessionStorage.getItem("helpSearchAndApplyDetail_returnPath");
            window.sessionStorage.removeItem("helpSearchAndApplyDetail_passedObj");
            window.sessionStorage.removeItem("helpSearchAndApplyDetail_returnPath");
            window.sessionStorage.removeItem("comTableDataList");
            this['$router'].push({
                path: path
            })
        };
        
        deleteArchive(row){
            this.tableDataList.splice(this.tableDataList.indexOf(row), 1);
        };
        mlAddSelfControlFiles(){
            // 将待查阅文档列表保存到session 
            window.sessionStorage.setItem("comTableDataList", JSON.stringify(this.tableDataList));
            this['$router'].push({
                path:'/retrieve/superSearch/superSearch',
                name:'高级检索',
                params:{ 
                        assistId: this.passedObj.id,
                        word: this.passedObj.keyWord}
            });
        };
        qwAddSelfControlFiles(){
            window.sessionStorage.setItem("comTableDataList", JSON.stringify(this.tableDataList));
            this['$router'].push({
                path:'/retrieve/search/search',
                name:'关键字检索',
                params:{ 
                        assistId: this.passedObj.id,
                        searchkeyword: this.passedObj.keyWord}
            });
        }
        utilizeRequestReceive(){
            let fileArr = [];
            if(this.tableDataList.length == 0){
                return null;
            }
            fileArr = this.BorrowUtils.setPropertyArchivesOfSubmitDatas(this.tableDataList);
            let params = {
                asistSelectAppno: this.passedObj.applicationNo,
                userId: this.passedObj.applyUserId,
                userName: this.passedObj.applyUserName,
                archives: fileArr
            }
            let formData = {
                org: '',
                appType: this.passedObj.applyType,
                // appStartDate: this.passedObj.applyDate,
                appEndDate: this.passedObj.endDate,
                lookupDescription: '',
                comments: ''
            };
            params = Object.assign(params, formData);
            return Service.utilizeRequestReceive(params);
        }
        showCancelDialog(){
            this.dialogVisible = true;
            
        }
        submitCancel(){
            if(this.cancelMsg){
                let loadingInstance = Loading.service({
                    lock: true,
                    text: '正在提交，请稍等',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let params = {
                    appNo: this.passedObj.applicationNo,
                    rejectMess: this.cancelMsg
                };
                Service.rejectAsistSelectByAppno(params).then(res => {
                    loadingInstance.close();
                    if(res.data.succeeded){
                        this.Goback();
                    }else{
                        this['$message']({
                            message: '驳回失败',
                            type: 'error'
                        });
                    }
                });

            }else{
                this['$message']({
                    message: '请填写驳回理由!',
                    type: 'warning'
                });
            }

        }
        async submitApply(formName){//和查阅申请是一个方法，只是传递了asistSelectAppno
            
            if(this.tableDataList.length ==0) {
                this['$message']({
                    message: '没有可以提交的文档数据!',
                    type: 'warning'
                });
                return;
            }
            let flag = true;
            this.$refs[formName].validate((valid)=>{
                if(!valid){
                    flag = false;
                }
            });
            if(flag){
                let loadingInstance = Loading.service({
                    lock: true,
                    text: '正在提交，请稍等',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let result = await this.utilizeRequestReceive();//待借阅列表数据申请借阅单
                let utilizeLookupList = result==null? []: result.data.data.utilizeLookupList;
                let processList = result==null? []: result.data.data.processList;
                let infoList = result==null? []: result.data.data.infoList;

                // //debugger;
                utilizeLookupList = this.BorrowUtils.getLookUpObj(utilizeLookupList, processList, infoList);
                let formData = {
                    org: this.passedObj.firstReceptionName,
                    appType: this.passedObj.applyType,
                    appEndDate: this.passedObj.endDate,
                    keyWord: this.passedObj.keyWord
                };

                let passParam = {
                    basicForm: formData,
                    lookUpList: utilizeLookupList,
                    assistList: [],
                }
                loadingInstance.close();
                // //debugger;
                window.sessionStorage.setItem("splitApply_passedObj", JSON.stringify(passParam));
                // 拆单后，【协查办理】的跳转
                window.sessionStorage.setItem("splitApply_toHandleList", "/myBorrow/myHelpSearchAndApply/myHelpSearchAndApply");
                let user = {
                    fullName: this.passedObj.applyUserName,
                    address: this.$refs.userMsgComRef.passedCompany
                }
                window.sessionStorage.setItem("helpBorrowApply_user", JSON.stringify(user));
                window.sessionStorage.removeItem("comTableDataList");// 清除待查阅文档列表session

                this['$router'].push({
                    path: '/myBorrow/borrowApply/splitApply',
                })
            }
        }
        getReceptionArchive(){
            Service.getReceptionArchive({}).then(res => {
                this.passedObj.receptionName = res.data.data.archiveAgentName;
            });
        }
        created(){  
            this.getReceptionArchive();//查询接待馆
        };

        findApplyLists(){
            let params = {
                asistSelectAppno:  this.passedObj.applicationNo
            };
            Service.findUtilizeLookUpByAsistSelectNum(params).then(res => {
                if(res.data.succeeded){
                    this.tableDataList = res.data.data;
                }else{
                    this['$message']({
                        message: '查询档案列表失败',
                        type: 'error'
                    });
                }
            });
        }

        mounted(){
            this.passedObj = JSON.parse(window.sessionStorage.getItem("helpSearchAndApplyDetail_passedObj"));; 
            this.passedActiveName = window.sessionStorage.getItem("myHelpSearchAndApply_activeName");
            if(this.passedActiveName=='0'){
                let jsonComTableList = window.sessionStorage.getItem("comTableDataList");
                window.sessionStorage.removeItem("comTableDataList");
                if(jsonComTableList!=null ){//如果session有值，表明点击了添加检索按钮
                    this.tableDataList = jsonComTableList==null?[]: JSON.parse(jsonComTableList);
                    this.tableDataList = this.BorrowUtils.pushDiffApplyDatas(0, this.tableDataList);//加上目录非协查数据
                    this.tableDataList = this.BorrowUtils.pushDiffApplyDatas(1, this.tableDataList);//加上全文非协查数据
                }
            }else{
                //如果是已办理状态需要查找协查单对应的档案列表
                this.findApplyLists();
            }
            
            this.$refs.userMsgComRef.fromPageType = "1";
            this.$refs.userMsgComRef.passedUserType = this.passedObj.applyUserType==1? "System": "Public";
            this.$refs.userMsgComRef.passedUserId = Number(this.passedObj.applyUserId);
            this.$refs.userMsgComRef.showBtn = this.passedObj.applyUserType==1?false: true;  

            if(this.passedActiveName=='0'){ //待办0   已办1
                this.bodyHeight = document.documentElement.clientHeight - 493;
            }else{
                this.bodyHeight = document.documentElement.clientHeight - 453;
            }
            window.onresize = () => {
                return (() => {
                    if(this.passedActiveName=='0'){
                        this.bodyHeight = document.documentElement.clientHeight - 493;
                    }else{
                        this.bodyHeight = document.documentElement.clientHeight - 453;
                    }
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/myBorrow/borrow.scss';
</style>