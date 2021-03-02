<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>填写查阅单</span>
        </div> 
        <div class="contentbox contentbox-full bt50">      
            <el-tabs v-model="activeName" type="card" class="erpTab">
                <el-tab-pane label="查阅信息" name="first">   
                    <div class="boxshow bgwhite clear">
                        <div class="list lt m0" >
                            <userMsgCom ref="userMsgComRef"></userMsgCom>
                        </div> 
                        <el-form label-width="130px" size="small" ref="formRef"  :model="basicForm" :rules="basicFormRules">
                            <table class="mt10" style="border-left: 1px solid #ccc;" >
                                <tr>
                                    <td>
                                        <el-form-item label="接待馆：" >
                                            <el-input class="checkName percentName" readonly v-model="basicForm.org"></el-input>
                                        </el-form-item> 
                                    </td>
                                    <td>
                                        <el-form-item label="查阅目的：" prop="appType"  class="diabledSelect">
                                            <dictSelect :dictId="39" :dictModel="basicForm.appType" :dictDisabled="false" @dictChange="val => {this.basicForm.appType = val;}"></dictSelect>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label="查阅结束时间：" prop="appEndDate"  >
                                            <el-date-picker type="date" placeholder="选择日期" size="small" v-model="basicForm.appEndDate" format="yyyy-MM-dd"  value-format="yyyy-MM-dd"></el-date-picker>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colspan="3">
                                        <el-form-item   label="查阅内容："  >
                                            <el-input type="textarea" maxlength="100" placeholder="最多填写200个字符"  v-model="basicForm.lookupDescription"></el-input>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colspan="3">
                                        <el-form-item   label="备注："  >
                                            <el-input type="textarea" maxlength="100" placeholder="最多填写200个字符"   v-model="basicForm.comments"></el-input>
                                        </el-form-item>
                                    </td>
                                </tr>
                            </table>                            
                        </el-form> 
                    </div>            
                </el-tab-pane>
            </el-tabs>
            <div class="relative" style="padding-top:10px"  v-if="assistDataList.length>0"> 
                <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                    <el-tab-pane label="待协查档案馆一览" name="first">
                        <div class="boxshow bgwhite">   
                            <el-table
                                :data="assistDataList"
                                border stripe 
                                element-loading-text="努力加载中..."
                                header-row-class-name="tableHeader" 
                                class="tableInTab">
                                <el-table-column  prop="name" label="操作"  width="120">
                                    <template slot-scope="scope">                                                 
                                        <el-button class="tabletoolBtn" @click="deleteHelpOrg(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="archiveAgentName" label="档案馆名称">
                                </el-table-column>
                                <el-table-column prop="keyWord" label="检索关键字">
                                </el-table-column>
                                <el-table-column prop="count" label="文档数量">
                                </el-table-column>
                            </el-table>
                        </div> 
                    </el-tab-pane>                                                     
                </el-tabs> 
            </div>
            <div class="relative" style="padding-top:10px"> 
                <div class="TabRBtn">
                    <el-button class="defaultBtn rt" v-if="session.userType=='System'" @click="qwAddFile"><i class="fa fa-plus-square" aria-hidden="true"></i> 全文检索新增文件</el-button>
                    <el-button class="defaultBtn rt" @click="mlAddFiles"><i class="fa fa-plus-square" aria-hidden="true"></i> 目录检索新增文件</el-button>
                </div>                                    
                <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                    <el-tab-pane label="待查阅文档" name="first">
                        <div class="boxshow bgwhite">   
                            <el-table
                                :data="tableDataList"
                                border stripe 
                                element-loading-text="努力加载中..."
                                header-row-class-name="tableHeader" 
                                class="tableInTab">
                                <el-table-column type="index" label="序号" width="50">
                                </el-table-column>
                                <el-table-column  prop="name" label="操作"  width="120">
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
                        </div> 
                    </el-tab-pane>                                                     
                </el-tabs> 
            </div>
        </div>
        <div class="mt10 footerBar">
             <el-button class="defaultBtn" @click="submitApply('formRef')">提交查阅申请</el-button>
             <el-button class="defaultBtn" @click="returnSuperSearch">取消</el-button>
        </div>
    </section>
</template>     
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrowApply.service';
    import { Loading } from 'element-ui';
    import userMsgCom from '@/views/myBorrow/utils/leftUserMsgCom.vue';
    // import applyTabCom from '@/views/myBorrow/utils/applyTabs/applyTabCom.vue';
    import BorrowUtils from '@/views/myBorrow/utils/borrowUtilsApi.js';
    Vue.prototype.BorrowUtils = BorrowUtils;
    @Component({
        components: {
            userMsgCom,
            // applyTabCom
        }
    })
    export default class borrowApply extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 493 ; 
        activeName: string = 'first';
        assistDataList: any = [];//待协查档案馆一览,如果有协查数据，则显示
        tableDataList: any =[];
        choosedUser: any = {};//加签人员
        session: any = {};
        basicForm: any = {
            org: '',
            appType: '',
            appEndDate: '',
            lookupDescription: '',
            comments: ''
        };
        basicFormRules:any = {
            'appType': [
                { required: true, message: ' ', trigger: 'blur' }                    
            ],
            'appEndDate': [
                { required: true, message: ' ', trigger: 'blur' }
            ]
        };
        
        showArchiveDetail(row){

        };
        // 删除协查馆
        deleteHelpOrg(row){
            this.assistDataList.splice(this.assistDataList.indexOf(row), 1);
        }
        deleteArchive(row){
            this.tableDataList.splice(this.tableDataList.indexOf(row), 1);
        };
        returnSuperSearch(){
            this.tableDataList = [];
            this.assistDataList = [];
            
            this['$router'].push({
                path:'/retrieve/superSearch/superSearch',
                name:'高级检索',
            });
        };
        async submitApply(formName){
            if(this.tableDataList.length==0 && this.assistDataList.length==0){
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
                utilizeLookupList = this.BorrowUtils.getLookUpObj(utilizeLookupList, processList, infoList);
                let assist = await this.assistApply();//协查申请
                loadingInstance.close();
                let assistList = assist==null?[]: assist.data.data;
                //组合协查单表格的[]
                
                for(let ass of assistList){
                    let arr = [];
                    arr.push({
                        receptionName: ass.receptionName,
                        keyWord: ass.keyWord,
                        count: ass.count
                    });
                    ass.tableList = arr;
                }
                let passParam = {
                    basicForm: this.basicForm,
                    lookUpList: utilizeLookupList,
                    assistList: assistList,
                }
                window.sessionStorage.setItem("splitApply_passedObj", JSON.stringify(passParam));
                let user = {
                    fullName: window.sessionStorage.getItem("username"),
                    address: this.$refs.userMsgComRef.passedCompany
                }
                window.sessionStorage.setItem("helpBorrowApply_user", JSON.stringify(user));

                this['$router'].push({
                    path: '/myBorrow/borrowApply/splitApply',
                })
            }
        }
        assistApply(){
            if(this.assistDataList.length ==0){
                return null;
            }
            let params = {
               "applyUserId": Number(window.sessionStorage.userId),
               "applyUserNo": "",
               "applyUserName": window.sessionStorage.username,
               "applyUserType": window.sessionStorage.userType=="System"? 1: 0,
               "type": window.sessionStorage.userType=="System"? 1: 0, //0代表公众用户提交，1代表馆内用户提交
               "applyType": this.basicForm.appType,//查阅目的
               "endDate": this.basicForm.appEndDate,
               "messageList": this.assistDataList,//馆外用户
            }
            //此处只能是馆内用户
            return Service.applyAsistSelect(params);
        }
        utilizeRequestReceive(){//待借阅列表数据申请借阅单
            let fileArr = [];
            if(this.tableDataList.length == 0){
                return null;
            }
            fileArr = this.BorrowUtils.setPropertyArchivesOfSubmitDatas(this.tableDataList);
            let params = {
                userId: Number(window.sessionStorage.userId),
                userName: window.sessionStorage.username,
                archives: fileArr
            }
            params = Object.assign(params, this.basicForm);
            return Service.utilizeRequestReceive(params);
        };
        mlAddFiles(){ //目录添加文件
            // 将待查阅文档列表保存到session 待协查档案列表页保存到session
            window.sessionStorage.setItem("comTableDataList", JSON.stringify(this.tableDataList));
            window.sessionStorage.setItem("assistTableDataList", JSON.stringify(this.assistDataList));
            this['$router'].push({
                path:'/retrieve/superSearch/superSearch',
                name:'高级检索',
                params:{ name: 'keep'}
            });
        };
        
        qwAddFile(){ //全文检索新增文件
            window.sessionStorage.setItem("comTableDataList", JSON.stringify(this.tableDataList));
            window.sessionStorage.setItem("assistTableDataList", JSON.stringify(this.assistDataList));
            this['$router'].push({
                path:'/retrieve/search/search',
                params:{ name: 'keep'}
            });
        };
        getReceptionArchive(){
            Service.getReceptionArchive({}).then(res => {
                this.basicForm.org = res.data.data.archiveAgentName;
            });
        }
        created(){   
            this.session = window.sessionStorage;   
            this.getReceptionArchive();  
        };

        mounted(){
            // 刷新时，可以不保留数据，因为是申请界面
            // 查阅信息中左侧的用户信息
            this.$refs.userMsgComRef.fromPageType = "1";
            this.$refs.userMsgComRef.passedUserType = this.session.userType;
            this.$refs.userMsgComRef.passedUserId = Number(this.session.userId);
            this.$refs.userMsgComRef.showBtn = this.session.userType=="System"?false: true;  

            //获得待借阅和协查列表的session数据,
            let jsonComTableList = window.sessionStorage.getItem("comTableDataList");
            let jsonAssistTableList = window.sessionStorage.getItem("assistTableDataList");
            window.sessionStorage.removeItem("comTableDataList");
            window.sessionStorage.removeItem("assistTableDataList");
            //如果直接从检索加数据到借阅单，列表session都为null，如果是从借阅单点击添加检索，session至少为“[]”
            // if((jsonComTableList!=null) || (jsonAssistTableList!=null)){//如果session有值，表明点击了添加检索按钮
                this.tableDataList = jsonComTableList==null?[]: JSON.parse(jsonComTableList);
                this.assistDataList = jsonAssistTableList==null?[]: JSON.parse(jsonAssistTableList);
                this.assistDataList =  this.BorrowUtils.pushDiffAssistDatas(0, this.assistDataList);//加上目录协查数据
                this.assistDataList =  this.BorrowUtils.pushDiffAssistDatas(1, this.assistDataList);//加上全文协查数据
                this.tableDataList = this.BorrowUtils.pushDiffApplyDatas(0, this.tableDataList);//加上目录非协查数据
                this.tableDataList = this.BorrowUtils.pushDiffApplyDatas(1, this.tableDataList);//加上全文非协查数据
            // }
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 493;
                })()
            };
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../styles/myBorrow/borrow.scss';
</style>