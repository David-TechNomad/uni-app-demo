
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>查阅详情</span>
           <el-button class="defaultBtn rt mt10" @click="Goback">返回</el-button>
        </div> 
        <div class="contentbox contentbox-full "> 
            <iconProcessComponent ref="iconProcessComponentRef"></iconProcessComponent>
            <div class="relative mt10"> 
                <div class="0 tabRtext" style="line-height:42px;">
                    <span class="rt" v-if="detailData.auditStatus==1">状态：部分通过</span>
                    <span class="rt" v-if="detailData.auditStatus==2">状态：审核中</span>
                    <span class="rt" v-if="detailData.auditStatus==4">状态：已驳回</span>
                    <span class="rt" v-if="detailData.auditStatus==5">状态：已结束</span>
                    <span class="rt" v-if="detailData.auditStatus==6">状态：全部通过</span>
                </div>                     
                <el-tabs v-model="activeName" type="card" class="erpTab">
                    <el-tab-pane :label="setLabel()" name="first">   
                        <div class="boxshow bgwhite clear disFlex" >
                            <div class="uMsg">
                                <!-- 受理登记查询 详情可以【查看】 -->
                                <userMsgCom ref="userMsgComRef"></userMsgCom>
                            </div>
                            <div class="flex1">
                                <el-form ref="form"  label-width="100px" class="lt pd5 borderleft w100 " :mode="detailData" size="small"  >
                                    <div class="disFlex">
                                        <el-form-item label="接待馆：" class ="lt flex1" style="min-width: 200px;">
                                            <el-input class="checkName percentName" readonly v-model="detailData.receptionName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="查阅目的：" class ="lt diabledSelect flex1">
                                            <dictSelect :dictId="39" :dictModel="detailData.appType" :dictDisabled="true" @dictChange="val => {this.detailData.appType = val;}"></dictSelect>
                                        </el-form-item>
                                        <el-form-item label="查阅开始日期：" class ="lt flex1" label-width="120px"> 
                                            <el-date-picker type="date" v-model="detailData.appDate" readonly placeholder="选择日期" size="small"></el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="查阅结束日期：" class ="lt flex1" label-width="120px"> 
                                            <el-date-picker type="date" v-model="detailData.appEndDate" readonly placeholder="选择日期" size="small"></el-date-picker>
                                        </el-form-item>
                                    </div>
                                     <div class="disFlex">
                                        <el-form-item label="查阅内容："  class ="flex1">{{detailData.lookupDescription}}
                                        </el-form-item>
                                    </div>
                                    <div class="disFlex">
                                        <el-form-item label="备注：" class ="flex1">{{detailData.comments}}
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </div>
                        </div>            
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="relative mt10"> 
                <div class="TabRBtn tabRtext">
                    <b class="lt" v-if="detailData.utilizeInfos">共{{detailData.utilizeInfos.length}}份文件</b>
                </div>                                          
                <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                    <el-tab-pane label="待查阅文档" name="first">
                        <div class="boxshow bgwhite clear">   
                            <el-table  v-loading="tableLoading"
                                :data="detailData.utilizeInfos"
                                border
                                header-row-class-name="tableHeader" 
                                stripe 
                                class="tableInTab">  
                                <!-- 如果是 出入库管理过来的，操作列显示 借出、归还                                   -->
                                 <el-table-column v-if="fromCrkgl"  prop="name" label="操作"  width="120">
                                    <template slot-scope="scope">  
                                        <!-- 查看借阅单详情，多条档案借出归还状态是不一致的  --> 
                                        <!-- 1:未借出，2：待归还，3：已归还,4:已取消，5：待接收 -->
                                        <el-button v-if="scope.row.auditResult==1 && scope.row.arcStatus==1" class="tabletoolBtn"  @click="lendFn(scope.row)">借出</el-button>
                                        <el-button v-if="scope.row.arcStatus==2 || scope.row.arcStatus==5" class="tabletoolBtn" @click="returnFn(scope.row)">归还</el-button>
                                    </template>
                                </el-table-column>
                                <!-- 如果是受理登记过来的 -->
                                <el-table-column v-if="fromSldj&&canShow"  prop="name" label="操作"  width="120">
                                    <template slot-scope="scope">    
                                        <!-- 如果endDate超期，也不能阅览  ,                                            -->
                                        <el-button v-if="(scope.row.auditResult==1) && (scope.row.flag==0)"  class="tabletoolBtn" @click="toPreview(scope.row)">阅览</el-button>
                                        <!-- 如果实体借阅，通过审核，显示【接收】 -->
                                        <el-button v-if="scope.row.auditResult==1 && scope.row.flag==1 && scope.row.arcStatus==5"  class="tabletoolBtn" @click="receiveEntity(scope.row)">接收</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="kindName" label="门类名称">
                                </el-table-column>
                                <el-table-column prop="archiveDH" label="文档代码">
                                    <template slot-scope="scope">                                                 
                                        <span v-html="scope.row.archiveDH"></span>                         
                                    </template>                                         
                                </el-table-column>
                                <el-table-column prop="archiveTM" label="文档题名">  
                                </el-table-column>
                                <el-table-column prop="archiveXMMCNEW" label="馆藏馆名称">                                      
                                </el-table-column>
                                <el-table-column prop="controlId" label="控制标识">                                      
                                </el-table-column>
                                <el-table-column v-if="fromSldj" prop="flag" label="借阅类型">  
                                    <template slot-scope="scope">                                                 
                                        <span v-if="scope.row.flag==0">电子</span> 
                                        <span v-if="scope.row.flag==1">实体</span>                         
                                    </template>                                    
                                </el-table-column>
                                <el-table-column prop="auditResult" label="审核结果">
                                    <!-- null:未审核 1 通过 2驳回                                       -->
                                    <template slot-scope="scope">                                                 
                                        <span v-if="scope.row.auditResult==1" >通过</span>  
                                        <span v-else-if="scope.row.auditResult==2" >驳回</span>  
                                        <span v-else >未审核</span>                          
                                    </template> 
                                </el-table-column> 
                            </el-table>
                        </div> 
                    </el-tab-pane>                                                     
                </el-tabs> 
            </div>               
        </div>  
        <reading ref="readingRef"></reading>  
    </section>
</template> 
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrowDetails.service'; 
    import reading from './readingDialog.vue' 
    import iconProcessComponent from '@/views/myBorrow/utils/iconProcessComponent';  
    import userMsgCom from '@/views/myBorrow/utils/leftUserMsgCom.vue';
    @Component({
        components:{
            iconProcessComponent,
            reading,
            userMsgCom
        }
    })
    export default class examCheck extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 563 ;
        passedAppNo: string = ''; 
        returnPath: string = '';
        activeName:string = 'first';
        tableData: any =[];
        total: number = 1;
        detailData: any = {};
        fromSldj: boolean = false;
        fromCrkgl: boolean = false;
        canShow: boolean = false;
        agentName: string = '';
        tableLoading: boolean = false;
        toPreview(row){ 
            this.$refs.readingRef.passedWatermarkFilePath = row.watermarkFilePath;
            this.$refs.readingRef.dialogVisible = true;
        };
        Goback(){
            this.$router.push(this.returnPath);
            window.sessionStorage.removeItem('borrowDetail_applicationNo');
            window.sessionStorage.removeItem('borrowDetail_returnPath');  
        };
        receiveEntity(row){
            // case2：5待接收  可以操作【接收】，同时更改状态为2待归还，隐藏【接收】
            let params = {
                arcStatus: 2,//待归还（传什么状态，后台更改为什么状态）
                id: row.id
            }
            this.tableLoading = true;
            Service.updateUtilizeInfoById(params).then(res => {
                this.tableLoading = false;
                if(res.data.succeeded){
                    row.arcStatus = 2;
                }else{
                    this['$message']({
                        message: '接收失败!',
                        type: 'warning'
                    });
                }
            });
        }
        getBorrowDetail(){
            let params = {
                appNo: this.passedAppNo
            }
            let _this = this;
            Service.queryUtilizeLookupByAppnum(params).then(res=>{
                if(res.data.succeeded){
                    this.detailData = res.data.data;
                    
                    //截止日期是否超期，整个借阅单是通过或者全部通过的状态
                    if(new Date(res.data.data.appEndDate)>=new Date() && (res.data.data.auditStatus==1 || res.data.data.auditStatus==6)){
                        this.canShow = true;
                    }else{
                        this.canShow = false;
                    }
                    
                    this.detailData.appType = res.data.data.appType==null? '':res.data.data.appType.toString();
                    // if(this.fromCrkgl){//出入库管理详情界面，只显示实体档案 flag==1
                    //     let arr = [];
                    //     for(let item  of res.data.data.utilizeInfos){
                    //     }
                    //     res.data.data.utilizeInfos = arr;
                    // }
                    for(let detail of res.data.data.utilizeInfos){
                        let archiveData = detail.archiveData;
                        detail.archiveData = JSON.parse(detail.archiveData);
                    }
                    let user = res.data.data.user;
                    let publicUser = res.data.data.publicUser; 
                    _this.detailData.appType = res.data.data.appType==null? '':res.data.data.appType.toString();
                    let agentCode = '';
                    if((user==null) && publicUser){
                        agentCode = publicUser.company;
                        _this.agentName = agentCode;
                        _this.$refs.iconProcessComponentRef.processList = res.data.data.utilizeProcesses;
                        _this.$refs.iconProcessComponentRef.applyFullName = user==null? publicUser.fullName: user.fullName;
                        _this.$refs.iconProcessComponentRef.applyDeptName = agentCode;

                        // 查阅信息中左侧的用户信息
                        _this.$refs.userMsgComRef.fromPageType = "2";
                        _this.$refs.userMsgComRef.passedFullName = publicUser.fullName;
                        _this.$refs.userMsgComRef.passedCredentialsNumber = publicUser.credentialsNumber;
                        _this.$refs.userMsgComRef.passedCredentialsType = publicUser.credentialsType;
                        
                        _this.$refs.userMsgComRef.passedCompany = agentCode; 
                        if(_this.fromSldj){//受理登记查询 详情 可以【查看】
                            _this.$refs.userMsgComRef.showBtn = true; 
                        }
                        
                    }else if(user && (publicUser==null)){
                        agentCode = user.archiveAgentCode;
                        Service.getArchivesInfo({archiveAgentCode: agentCode}).then(res1 =>{
                            if(res.data.succeeded){
                                _this.agentName = res1.data.data.archiveAgentName;
                                _this.$refs.iconProcessComponentRef.processList = res.data.data.utilizeProcesses;
                                _this.$refs.iconProcessComponentRef.applyFullName = user==null? publicUser.fullName: user.fullName;
                                _this.$refs.iconProcessComponentRef.applyDeptName = _this.agentName;

                                // 查阅信息中左侧的用户信息
                                _this.$refs.userMsgComRef.fromPageType = "2";
                                _this.$refs.userMsgComRef.passedFullName = user.fullName;
                                _this.$refs.userMsgComRef.passedCredentialsNumber = user.credentialsNumber;
                                _this.$refs.userMsgComRef.passedCompany = _this.agentName; 
                            }
                        });
                    }
                }
            });
        };
        returnFn(row) {
            let self = this;
            let ids = [];
            ids.push(row.id);
            self['$confirm']('您是否要归还?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                    let params = {
                        arcStatus: 3,//接收改为3
                        ids: ids
                    };
                    Service.updateUtilizeInfoArcstatus(params).then(res => {
                        if(res.data.succeeded){
                            this['$message']({
                                message: '归还成功！',
                                type: 'success'
                            });
                            this.Goback();
                        }else{
                            this['$message']({
                                message: '归还失败！',
                                type: 'error'
                            });
                        }
                    });
                });
            };
            lendFn(row) {
                let self = this;
                let ids = [];
                ids.push(row.id);
                self['$confirm']('您是否要借出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        arcStatus: 5,// 1:未借出，2：待归还，3：已归还,4:已取消，5：待接收
                        ids: ids
                    };
                    Service.updateUtilizeInfoArcstatus(params).then(res => {
                        if(res.data.succeeded){
                            this['$message']({
                                message: '借出成功！',
                                type: 'success'
                            });
                            this.Goback();
                        }else{
                            this['$message']({
                                message: '借出失败！',
                                type: 'error'
                            });
                        }
                    });
                });
            };
        setLabel(){
            return `查阅单号：${this.detailData.applicationNo}`;
        }
        showIdentifyDialog(){
            alert('显示公证文件对话框');
        }
        created(){    
            this.passedAppNo = window.sessionStorage.getItem('borrowDetail_applicationNo'); 
            this.returnPath = window.sessionStorage.getItem('borrowDetail_returnPath');
            if(this.returnPath.includes("helpBorrowMgnt")){
                this.fromSldj = true;//受理登记
            }
            if(this.returnPath.includes("borrowBackMgnt")){ 
                this.fromCrkgl = true;//出入库管理
            }
            this.getBorrowDetail();  
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 563;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/myBorrow/borrow.scss';
</style>