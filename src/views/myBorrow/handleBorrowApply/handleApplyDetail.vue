
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>查阅审批详情</span>
           <el-button class="defaultBtn rt mt10"  @click="Goback">返回</el-button>
        </div> 
        <div class="contentbox contentbox-full " :class="passedActiveName=='0'? 'bt50': '' "> 
            <iconProcessComponent ref="iconProcessComponentRef"></iconProcessComponent>
            <div class="TabRBtn tabRtext" style="line-height:42px;">
                <span class="rt"   >   状态：             
                    <span v-if="passedAuditStatus ==1">部分通过</span>
                    <span v-if="passedAuditStatus ==2">审批中</span>
                    <span v-if="passedAuditStatus ==4">已驳回</span>
                    <span v-if="passedAuditStatus ==6">全部通过</span>
                </span> 
            </div> 
            <el-tabs v-model="activeName" type="card" class="erpTab" >
                <el-tab-pane :label="setLabel()" name="first"> 
                    <div class="boxshow bgwhite clear disFlex" >
                            <div class="uMsg">
                                 <userMsgCom ref="userMsgComRef"></userMsgCom>
                            </div>
                            <div class="flex1">
                                <el-form ref="form"  label-width="100px" class="lt pd5 borderleft w100 " :mode="detailData" size="small"  >
                                    <div class="disFlex">
                                        <el-form-item label="接待馆：" class ="lt flex1" style="min-width: 200px;">
                                            <el-input class="checkName percentName" readonly v-model="receptionArchiveName"></el-input>
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
                                        <el-form-item label="查阅内容">{{detailData.lookupDescription}}
                                        </el-form-item>
                                    </div>
                                    <div class="disFlex">
                                        <el-form-item label="备注">{{detailData.comments}}
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </div>
                        </div>    
                </el-tab-pane>
            </el-tabs>
            <el-tabs v-model="activeName" type="card" class="erpTab mt10" v-if="passedActiveName=='0'">                      
                <el-tab-pane label="审批意见:" name="first"> 
                    <div class="pd10 boxshow bgwhite">  
                        <el-input  type="textarea"  v-model.trim="comments" :rows="3" placeholder="请输入内容" > </el-input>
                        <el-form label-width="40px" size="small"  class="mt10">
                            <el-form-item label="加签" >
                                <el-input class="checkName percentName" v-model="choosedUserName" style="width:30%;"></el-input>
                                <el-button class="defaultBtn" @click="showChooseUserDialog">选择人员</el-button>
                            </el-form-item>
                        </el-form> 
                    </div>
                </el-tab-pane>                     
            </el-tabs>
            <div class="relative mt10"> 
                <div class="TabRBtn tabRtext" >
                    <b class="lt" v-if="detailData.utilizeInfos">共{{detailData.utilizeInfos.length}}份文件</b>
                    <!-- 查阅类型 只在第一次审核时做判断，其他审批阶段不可更改，不用显示更改功能 -->
                    <span class="rt ml50" v-if="passedActiveName=='0'">                
                        批量审批：
                        <el-radio-group class="borrowRadio" v-model="batchBorrowTypeResult" @change="changeBorrowResult">
                            <el-radio :label="1"  >全部通过</el-radio>
                            <el-radio :label="2"  >全部驳回</el-radio>
                        </el-radio-group>
                    </span> 
                    <span class="rt " v-if="passedActiveName=='0' && detailData.auditStep == 1" > 
                        查阅类型：
                        <el-radio-group class="borrowRadio" v-model="batchApproveResult" @change="batchChangeBorrowType" >
                            <el-radio :label="1"  :disabled="entityDisable">实体</el-radio>
                            <el-radio :label="0"  >电子</el-radio>
                        </el-radio-group>
                    </span> 
                </div>   
                <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                    <el-tab-pane label="待查阅文档" name="first">
                        <div class="boxshow">   
                            <el-table v-loading="tableLoading"
                                :data="detailData.utilizeInfos"
                                border
                                element-loading-text="努力加载中..."
                                header-row-class-name="tableHeader" 
                                stripe 
                                class="tableInTab ">
                                <!-- <el-table-column type="selection"  width="55" v-if="passedActiveName=='0'">
                                </el-table-column> -->
                                <el-table-column  prop="name" label="操作"  width="120">
                                    <template slot-scope="scope"> 
                                        <!-- 未审批 -->
                                        <span v-if="passedActiveName=='0' "> 
                                            <el-button class="tabletoolBtn"  @click="singleApprove(scope.row)">详细审批</el-button>
                                            <!-- 借阅类型为电子，没有电子原文，需要在选择电子借阅时更改sendStatus不为true（代表可以出库）， 操作出库后将arcStatus更改为5-->
                                            <!-- arcStatus 1:未借出，2：待归还，3：已归还,4:已取消，5：待接收 -->
                                            <!-- 只有第一步审批才会有出库接收 -->
                                            <el-button v-if="detailData.auditStep == 1 && scope.row.flag==0 && !scope.row.archiveData.ATTACHED_FILE_FLAG  && scope.row.arcStatus==1" class="tabletoolBtn"  @click="borrowReceiveArchive(scope.row)">申请出库</el-button>
                                            <!-- 扫描入库后，按钮变为接收，必须接收点击后，才能提交 ，接收后更改arcStatus的值-->
                                            <!-- 操作出库后将arcStatus更改为3 -->
                                            <!-- {{detailData.auditStep == 1}}-{{scope.row.flag==0}}-{{!scope.row.archiveData.ATTACHED_FILE_FLAG}}-{{scope.row.arcStatus==5}} -->
                                            <el-button v-if="detailData.auditStep == 1 && scope.row.flag==0 && !scope.row.archiveData.ATTACHED_FILE_FLAG && scope.row.arcStatus==5" class="tabletoolBtn"  @click="borrowReceiveArchive(scope.row)">接收</el-button>
                                        </span>
                                        <!-- 已审批     -->
                                        <span v-if="passedActiveName=='1'">
                                            <el-button class="tabletoolBtn"  @click="singleApprove(scope.row)">审批详情</el-button>
                                        </span>  
                                    </template>
                                </el-table-column>
                                <el-table-column prop="archiveDH" label="档号">
                                    <template slot-scope="scope">
                                        <span v-html="scope.row.archiveDH">  </span>                                               
                                    </template>
                                </el-table-column>
                                <el-table-column  :label="setRandomTitle(title)"   v-for="title,index in detailData.utilizeProcesses" :key="index">
                                    <template slot-scope="scope">
                                        <span v-for="value in scope.row.infoProcessList" v-if="value.auditStep==title.auditStep">
                                            <span v-if="value.auditResult == 1">通过</span>
                                            <span v-else>驳回</span>
                                        </span>                                               
                                    </template>
                                </el-table-column> 
                                <el-table-column  :label="setRandomRemark(title)"   v-for="title,index in detailData.utilizeProcesses" :key="index+9">
                                        <template slot-scope="scope">
                                            <span v-for="value in scope.row.infoProcessList" v-if="value.auditStep==title.auditStep">
                                                {{value.auditRemark}}
                                            </span>                                               
                                        </template>
                                    </el-table-column> 
                                <el-table-column prop="flag" label="查阅类型" width="170px">  
                                    <template slot-scope="scope" class="borrowRadio">
                                        <el-radio-group class="borrowRadio"  v-model="scope.row.flag" :disabled="(passedActiveName=='1') || (detailData.auditStep != 1)" >
                                            <el-radio :label="1"  :disabled="entityDisable">实体</el-radio>
                                            <el-radio :label="0">电子</el-radio>
                                        </el-radio-group>
                                    </template>                                        
                                </el-table-column>
                                <el-table-column prop="result" label="快速审批" v-if="passedActiveName=='0'" width="170px"> 
                                    <template slot-scope="scope">
                                        <el-radio-group class="borrowRadio" v-model="scope.row.auditResult">
                                            <el-radio :label="1">通过</el-radio>
                                            <el-radio :label="2">驳回</el-radio>
                                        </el-radio-group>
                                    </template>                                     
                                </el-table-column>
                            </el-table>
                        </div> 
                    </el-tab-pane>                                                     
                </el-tabs>
            </div>               
        </div> 
        <div class="mt10 footerBar" v-if="passedActiveName=='0'">
            <el-button class="defaultBtn" @click="batchApprove" :disable="commitBtnDisable">提交审批结果</el-button>
            <el-button class="defaultBtn" @click="Goback">取消</el-button>
        </div> 
        <chooseUser ref="chooseUserRef" @handUserSelected="getAddUser"></chooseUser>    
    </section>
</template> 
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './handleApplyDetail.service';  
    import iconProcessComponent from '@/views/myBorrow/utils/iconProcessComponent';  
    import chooseUser from '@/views/myBorrow/handleBorrowApply/chooseUserDialog';
    import { Loading } from 'element-ui';
    import userMsgCom from '@/views/myBorrow/utils/leftUserMsgCom.vue';
    @Component({
        components:{
            iconProcessComponent,
            chooseUser,
            userMsgCom
        }
    })
    export default class handleApplyDetail extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 563 ; 
        activeName: string = 'first';
        passedAppNo: string = '';
        batchBorrowTypeResult: string = '';
        batchApproveResult: string = '';
        detailData: any = [];
        tableDataList: any =[];
        total: number = 1;
        comments: string = '';
        commitBtnDisable: boolean=false;
        passedActiveName: string = '';
        choosedUser: any = {};//加签所选的用户
        choosedUserName: string = '';
        tableLoading: boolean = false;
        receptionArchiveName: string = '';
        minArcMap: any ;
        passedAuditStatus: number;
        entityDisable: boolean = false;
        agentName: string = '';

        setLabel(){
            return `查阅单号：${this.passedAppNo}`;
        }
        batchApprove(){
            if(!this.comments){
                this['$message']({
                    message: '请填写审批意见!',
                    type: 'warning'
                });
                return;
            }
            this.commitBtnDisable = true;
            let infoArr = [];
            let applyedNum = 0;//做了审批的数据
            let entityNum = 0;//选择了实体查阅类型的数据
            let eleNum = 0;//选择了电子查阅类型的数据
            let eleAttachNum = 0;//电子查阅有原文的数量
            let rejectNum = 0;
            if(this.minArcMap.size>0){//代表操作过详细审批
                for(let ob of this.detailData.utilizeInfos){
                    let objOfStore = this.minArcMap.get(ob.id);
                    ob.auditResult = objOfStore.auditResult==null?ob.auditResult:objOfStore.auditResult ;//如果进入单个审批，没有做出判定，反而在列表中做出选择的情况
                    ob.flag = objOfStore.flag==null?ob.flag: objOfStore.flag;
                    ob.pages = objOfStore.pages;
                    let param = {
                        infoId: ob.id,
                        auditResult: ob.auditResult,
                        auditRemark: this.comments,
                        flag: ob.flag,
                        pages: ob.pages
                    }
                    //如果已经审批，并且已经选择了查阅类型（如果选择电子的需要判断arcStatus是否为3：3已经）
                    if(param.auditResult){//做了审批
                        ++applyedNum;
                        if(param.auditResult==2){//驳回
                            ++rejectNum;
                        }
                        if(param.flag == 1){//实体查阅
                            ++entityNum;
                            infoArr.push(param);
                        }else if(param.flag == 0){//电子查阅，需要判断是否有电子原文
                            ++eleNum;
                            if(ob.archiveData.ATTACHED_FILE_FLAG){
                                infoArr.push(param);
                                ++eleAttachNum;
                            }
                        }
                    }
                } 
            }else{//代表没有操作过详细审批，也就是单个审批
                for(let ob of this.detailData.utilizeInfos){
                    let param = {
                        infoId: ob.id,
                        auditResult: ob.auditResult,
                        auditRemark: this.comments,
                        flag: ob.flag,
                        pages: ob.pages
                    }
                    //如果已经审批，并且已经选择了查阅类型（如果选择电子的需要判断arcStatus是否为3：3已经）
                    if(param.auditResult){//做了审批
                        ++applyedNum;
                        if(param.auditResult==2){//驳回
                            ++rejectNum;
                        }
                        if(param.flag == 1){//实体查阅
                            ++entityNum;
                            infoArr.push(param);
                        }else if(param.flag == 0){//电子查阅，需要判断是否有电子原文
                        ++eleNum;
                            if(ob.archiveData.ATTACHED_FILE_FLAG){
                                infoArr.push(param);
                                ++eleAttachNum;
                            }
                        }
                    }
                } 
            }
            if(rejectNum != this.detailData.utilizeInfos.length){//非全部驳回
                if(applyedNum != this.detailData.utilizeInfos.length){
                    this['$message']({
                        message: '请先审批档案!',
                        type: 'warning'
                    });
                    return;
                }
                if((entityNum+eleNum) != this.detailData.utilizeInfos.length){
                    this['$message']({
                        message: '请选择档案的查阅类型!',
                        type: 'warning'
                    });
                    return;
                }
                if(eleNum != eleAttachNum){
                    this['$message']({
                        message: '电子查阅类型的档案，需要先上传电子原文!',
                        type: 'warning'
                    });
                    return;
                }
            }
            let loadingInstance = Loading.service({
                lock: true,
                text: '正在提交，请稍等',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let addPeopleRoleId = 0;
            if(this.choosedUser.userId){//加签
                addPeopleRoleId = this.choosedUser.userId;
            }
            let params = {
                applicationNo: this.detailData.applicationNo,
                addPeopleRole: addPeopleRoleId,//加签
                infoList: infoArr
            };
            Service.auditUtilize(params).then(res=>{
                loadingInstance.close();
                this.commitBtnDisable = false;
                if(res.data.succeeded){
                    this.Goback();
                     if(res.data.data.auditStatus ==1 || res.data.data.auditStatus ==6){
                        let pa = {
                            applicationNo: res.data.data.applicationNo
                        }
                        Service.auditPdfFiles(pa).then(res=>{});
                     }
                    
                }
            });
        };

        Goback(){
            window.sessionStorage.removeItem("singleApplyDetail_arcIdArr");
            window.sessionStorage.removeItem("singleApplyDetail_minArcMap");
            window.sessionStorage.removeItem("handleApplyDetail_passedAuditStatus");
            window.sessionStorage.removeItem("handleApplyDetail_receptionAgentName");
            window.sessionStorage.removeItem("handleApplyDetail_appNo");
            this['$router'].push({
                path:"/myBorrow/handleBorrowApply/handleApply",
            })
            
        };
        getAddUser(val){
            this.choosedUser = val;
            this.choosedUserName = val.fullName;
        }
        showChooseUserDialog(){
            this.$refs.chooseUserRef.tsVisible = true;
        };
        changeTableDatasFromSingle(){
            for(let data of this.detailData.utilizeInfos){
                let infoId = data.id;
                let minInfo = this.minArcMap.get(infoId);
                data.auditResult = minInfo.auditResult;
                data.flag = minInfo.flag;
                data.pages = minInfo.pages;
                data.sendStatus = minInfo.sendStatus;
                data.arcStatus = minInfo.arcStatus;
                data.archiveData.ATTACHED_FILE_FLAG = minInfo.attachedFileFlag;
            }
        }
        batchChangeBorrowType(val){
            for(let archive of this.detailData.utilizeInfos){
                archive.flag = val;
            }
        };

        changeBorrowResult(val){
            for(let archive of this.detailData.utilizeInfos){
                archive.auditResult = val;
            }
        };
        setRandomTitle(pro){
            return `审批结果${pro.auditStep}`;
        }
        setRandomRemark(pro){
            return `审批意见${pro.auditStep}`;
        };
        //显示单个审批
        singleApprove(row){
            //获得文档列表的IDArr
            let idArr = [];
            if(this.passedActiveName=='0'){//待审批
                let map = new Map();
                for(let data of this.detailData.utilizeInfos){
                    idArr.push(data.id);
                    map.set(data.id, {
                        auditResult: data.auditResult,//审批结果
                        flag: data.flag,//查阅类型
                        pages: data.pages, //查阅的页码范围
                        attachedFileFlag: data.archiveData.ATTACHED_FILE_FLAG?1:0, //是否有电子原文
                        arcStatus: data.arcStatus,  //1:未借出，2：待归还，3：已归还,4:已取消，5：待接收
                        sendStatus: data.sendStatus  //选择电子借阅时，需要更改此状态为1：可以出库
                    })
                }
                window.sessionStorage.setItem("singleApplyDetail_arcIdArr", JSON.stringify(idArr));
                window.sessionStorage.setItem("singleApplyDetail_minArcMap", JSON.stringify(map));
            }
            window.sessionStorage.setItem("singleApplyDetail_passedObj", JSON.stringify(row));
            window.sessionStorage.setItem("singleApplyDetail_applyUserName", this.detailData.userName);
            window.sessionStorage.setItem("singleApplyDetail_utilizeProcesses", JSON.stringify(this.detailData.utilizeProcesses));
            this.$router.push({
                path: '/myBorrow/handleBorrowApply/singleApplyDetail'
            });
        };

        borrowReceiveArchive(row){
            this.tableLoading = true;
            let status = 1;//真正的传参，实际执行【申请出库】，并未修改arcStatus，依然是1未借出
            if(row.arcStatus == 1){
                status = 1; //当点击申请出库时，当出入库管理员操作借出之后，才由1未借出变成5待接收，审核才可以【接收】
                let ids = [];
                ids.push(row.id);
                // let params = {
                //     ids: ids
                // }
                Service.updateInfoSendStatusByIdList(ids).then(res => {
                    this.tableLoading = false;
                    if(res.data.succeeded){
                        row.arcStatus =5;//为了让界面显示【接收】按钮
                    }else{
                        this['$message']({
                            message: '申请出库失败!',
                            type: 'warning'
                        });
                    }
                });
            }else if(row.arcStatus ==5){//待接收：出入库管理时，【借出】 由1未借出-->5待接收
                // 无论出入库管理员是否【借出】，此界面已经显示了【接收】，操作接收时，需判断ARCStatus的状态
                // case1: 1未借出  直接显示【接收】，并提示“请出入库管理员进行档案借出操作！”（如果接待员没有【接收】，出入库管理员直接【归还】，没有审核状态，arcStatus变为了1未借出，而不是3已归还） 
                // case2：5待接收  可以操作【接收】，同时更改状态为2待归还，隐藏【接收】
                Service.queryUtilizeInfoById({id: row.id}).then(res =>{
                    if(res.data.succeeded){
                        let result = res.data.data;
                        
                        if(result.arcStatus==5){//表明已经执行【借出】//1:未借出，2：待归还，3：已归还,4:已取消，5：待接收
                            let params = {
                                arcStatus: 2,//待归还（传什么状态，后台更改为什么状态）
                                id: row.id
                            }
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
                        }else if(result.arcStatus==1){//表明已经执行【归还】，但是没有经过【接收】。如果档案没有接收，就直接归还(档案未审批)时，状态更改为未借出，而不是已归还了
                            this.tableLoading = false;
                            row.arcStatus ==5;//为了让界面显示【接收】按钮
                            this['$message']({
                                message: '请出入库管理员进行档案借出操作！',
                                type: 'warning'
                            });
                        }else if(result.arcStatus==2){//表明已经执行【接收】
                            this.tableLoading = false;
                            row.arcStatus = 2;
                        }else{
                            this.tableLoading = false;
                            this['$message']({
                                message: '已归还已取消的档案不允许操作!',
                                type: 'warning'
                            });   
                        }
                    }
                });
            }
        };
        updateUtilizeInfoById(params){

        }
        checkAgentSameOrNot(){
            let sessionAgentCode = window.sessionStorage.archiveAgentCode;
            let _this = this;
            Service.getArchivesInfo({archiveAgentCode:sessionAgentCode}).then(res =>{
               if(res.data.succeeded){
                   if(res.data.data.archiveAgentName == this.receptionArchiveName){
                       this.entityDisable = false;
                   }else{
                       this.entityDisable = true;
                   }
               }
           });
        }
        
        created(){  
            this.passedAppNo = window.sessionStorage.getItem("handleApplyDetail_appNo");    
            this.passedActiveName = window.sessionStorage.getItem("handleApply_activeName");  //0待审批 1已审批
            this.passedAuditStatus = Number(window.sessionStorage.getItem("handleApplyDetail_passedAuditStatus"));
            this.receptionArchiveName = window.sessionStorage.getItem("handleApplyDetail_receptionAgentName");
            //如果是接待馆和审批人员所在的档案馆不一致，只能借阅电子类型
            this.checkAgentSameOrNot();
        };

        getBorrowDetail(){
            let params = {
                appNo: this.passedAppNo
            }
            let _this = this;

            this.minArcMap = JSON.parse(window.sessionStorage.getItem("singleApplyDetail_minArcMap"));
            this.minArcMap = new Map(this.minArcMap);

            this.tableLoading = true;
            Service.queryUtilizeLookupByAppnum(params).then(res=>{
                this.tableLoading = false;
                //debugger
                if(res.data.succeeded){
                    _this.detailData = res.data.data;
                    for(let detail of res.data.data.utilizeInfos){
                        let archiveData = detail.archiveData;
                        detail.archiveData = JSON.parse(detail.archiveData);
                    }
                    _this.detailData.appType = res.data.data.appType==null? '':res.data.data.appType.toString();
                    let user = res.data.data.user;
                    let publicUser = res.data.data.publicUser; 
                    let agentCode = '';
                    debugger;
                    if((user==null) && publicUser){
                        agentCode = publicUser.company;
                         _this.agentName = agentCode;
                        _this.$refs.iconProcessComponentRef.processList = res.data.data.utilizeProcesses;
                        _this.$refs.iconProcessComponentRef.applyFullName = user==null? publicUser.fullName: user.fullName;
                        _this.$refs.iconProcessComponentRef.applyDeptName = agentCode;
                        //debugger

                        // 查阅信息中左侧的用户信息
                        this.$refs.userMsgComRef.fromPageType = "2";
                        this.$refs.userMsgComRef.passedFullName = publicUser.fullName;
                        this.$refs.userMsgComRef.passedCredentialsNumber = publicUser.credentialsNumber;
                        this.$refs.userMsgComRef.passedCredentialsType = publicUser.credentialsType;
                        this.$refs.userMsgComRef.passedCompany = agentCode; 
                        
                    }else if(user && (publicUser==null)){
                        agentCode = user.archiveAgentCode;
                        Service.getArchivesInfo({archiveAgentCode: agentCode}).then(res1 =>{
                            if(res.data.succeeded){
                                _this.agentName = res1.data.data.archiveAgentName;//查阅审批 待审批tab 已审批tab
                                _this.$refs.iconProcessComponentRef.processList = res.data.data.utilizeProcesses;
                                _this.$refs.iconProcessComponentRef.applyFullName = user==null? publicUser.fullName: user.fullName;
                                _this.$refs.iconProcessComponentRef.applyDeptName = _this.agentName;

                                // 查阅信息中左侧的用户信息
                                this.$refs.userMsgComRef.fromPageType = "2";
                                this.$refs.userMsgComRef.passedFullName = user.fullName;
                                this.$refs.userMsgComRef.passedCredentialsNumber = user.credentialsNumber;
                                this.$refs.userMsgComRef.passedCompany = _this.agentName; 
                            }
                        });
                    }
                     
                    if(_this.minArcMap.size>0){
                        _this.changeTableDatasFromSingle();
                    }
                }
            });
        };
        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 563;
                })()
            };
            this.getBorrowDetail();
            
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../styles/myBorrow/borrow.scss';
</style>