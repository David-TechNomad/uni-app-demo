
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>鉴定审批详情</span>
           <el-button class="defaultBtn rt mt10" @click="Goback">返回</el-button>
        </div> 
        <div class="contentbox contentbox-full " :class="passedIdentifyObj.taskStatus==2? 'bt50':''"> 
            <iconProcess ref="iconProcessRef"></iconProcess>
            <div class="0 tabRtext">
                <span class="rt" style="line-height:42px;" v-if="passedIdentifyObj.taskStatusDict">鉴定状态：{{passedIdentifyObj.taskStatusDict.displayText}}</span>
            </div> 
            <el-tabs v-model="activeName" type="card" class="erpTab ">                      
                <el-tab-pane label="基本信息" name="first">
                    <div class="boxshow bgwhite ">
                        <div class="basicMsg">
                            <el-row>
                                <el-col :span="6">[鉴定任务名称]<span>{{passedIdentifyObj.taskName}}</span></el-col>
                                <el-col :span="6">[鉴定类型]<span v-if="passedIdentifyObj.taskTypeDict">{{passedIdentifyObj.taskTypeDict.displayText}}</span></el-col>
                                <el-col :span="12">[开始时间]<span>{{passedIdentifyObj.taskBeginDate.substring(0,10)}}</span></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">[创建者]<span>{{passedIdentifyObj.createPerson}}</span></el-col>
                                <el-col :span="6">[计划鉴定数量]<span>{{passedIdentifyObj.planNum}}</span></el-col>
                                <el-col :span="12">[结束时间]<span>{{passedIdentifyObj.taskEndDate.substring(0,10)}}</span></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">[申请说明]<span>{{passedIdentifyObj.comment}}</span></el-col>
                            </el-row> 
                        </div>
                    </div>
                </el-tab-pane>                     
            </el-tabs>
            <el-tabs v-model="activeName" type="card" class="erpTab mt10" v-if="passedIdentifyObj.taskStatus==2">                      
                <el-tab-pane label="鉴定理由：" name="first"> 
                    <div class="pd10 boxshow bgwhite">  
                        <el-input  v-model="comment" type="textarea"   :rows="3" placeholder="请输入内容" > </el-input>
                    </div>
                </el-tab-pane>                     
            </el-tabs>
            <div class="relative mt10"> 
                <div class="TabRBtn tabRtext">
                    <b class="lt mlr10">共{{tableDataList.length}}份文档</b>   
                    <el-input class="lt h40 mr10" style="width:200px;"  placeholder="请输入档号或者题名" v-model="searchValue" size="small"></el-input>
                    <!-- <el-button class="defaultBtn" @click="searchArchive">检索</el-button>  -->
                    <span style="float:right;margin-right:10px;">批量鉴定：
                        <el-radio v-for="ind in dictDataList" v-model="batchApproveRadio" :label="ind.code" @change="changeBatchValue">{{ind.displayText}}</el-radio>
                    </span> 
                </div>                                          
                <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                    <el-tab-pane label="需要鉴定的文档" name="first">
                        <div class="boxshow">  
                            <el-table ref="shiftTableRef"
                                :data="tableDataList.filter(data => (data.TITLE!=null && data.TITLE.includes(this.searchValue)) || (data.ARCHIVAL_CODE!=null && data.ARCHIVAL_CODE.includes(this.searchValue)))" 
                                border v-loading="tableLoading"
                                header-row-class-name="tableHeader" 
                                stripe  @selection-change="selsArchiveChange"
                                class="defaultTable mt0">
                                <el-table-column type="selection"  width="55">
                                </el-table-column>
                                <el-table-column  prop="name" label="操作"  width="120">
                                    <template slot-scope="scope">                                                 
                                        <!-- <el-button class="tabletoolBtn" @click="showArchiveDetail(scope.row)">详情</el-button> -->
                                        <el-button class="tabletoolBtn" v-if="passedIdentifyObj.taskStatus==2" @click="singleApprove(scope.row)">鉴定</el-button>
                                        <el-button class="tabletoolBtn" v-if="passedIdentifyObj.taskStatus==3" @click="singleApprove(scope.row)">鉴定详情</el-button>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="name" label="原文">
                                </el-table-column> -->
                                <el-table-column prop="ARCHIVAL_CODE" label="档号">
                                </el-table-column>
                                <el-table-column prop="TITLE" label="题名">                                      
                                </el-table-column>
                                <el-table-column prop="YEAR" label="年度">                                      
                                </el-table-column>
                                <el-table-column prop="RETENTION_PERIOD_Text" label="保管期限">                                      
                                </el-table-column>
                                <el-table-column prop="SECURITY_LEVEL_Text" label="密级">                                      
                                </el-table-column>
                                <!-- <el-table-column prop="appraisalUpNode" label="上节点鉴定值">                                      
                                </el-table-column> -->
                                <el-table-column  :label="setRandomTitle(title)"   v-for="title,index in randomColumns" :key="index">
                                    <template slot-scope="scope">
                                        <span v-for="value in scope.row.appraisalInfoProcessList" v-if="value.auditStep==title.auditStep">
                                                {{value.auditReason}}
                                        </span>                                               
                                     </template>
                               </el-table-column> 
                                <el-table-column prop="date" label="我的鉴定值" > 
                                    <template slot-scope="scope" >   
                                        <span class="borrowRadio">
                                            <el-radio v-for="ind in dictDataList" v-model="scope.row.appraisalInfo.auditReason" :label="ind.code" >
                                                {{ind.displayText}}
                                            </el-radio>
                                        </span>                                              
                                    </template>                                     
                                </el-table-column>                                                                             
                            </el-table>
                        </div> 
                    </el-tab-pane>                                                     
                </el-tabs> 
            </div> 
        </div>  
        <div class="mt10 footerBar" v-if="passedIdentifyObj.taskStatus==2">
            <el-button class="defaultBtn" @click="batchApprove">提交鉴定结果</el-button>
            <el-button class="defaultBtn" @click="Goback" >取消</el-button>
        </div> 
    </section>
</template> 
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './handleMyIdentifyDetail.service'; 
    import iconProcess from '@/views/myIdentify/iconProcessComponent.vue'; 
    import { Loading } from 'element-ui';
    Component.registerHooks([
		'beforeRouteEnter',
	]);
    @Component({
        components:{
            iconProcess
        }
    })
    export default class appraisal extends Vue{
        bodyHeight: number = document.documentElement.clientHeight - 465 ; 
        activeName: string = 'first';
        passedIdentifyObj: any = {};
        tableDataList: any = [];
        batchApproveRadio: string = "1";
        archiveNum: number = 1;
        dictDataList: any = [];
        comment: string = '';
        archiveIdArr: any = [];   
        selection: any = [];  
        isShift:boolean = false; 
        btnVisible: boolean = true;
        searchValue: string = '';
        randomColumns: any = [];
        tableLoading: boolean = false;
        
        Goback(){
            this.$store.commit('INIT_MININFOMAP', new Map()); 
            this.$store.commit('SET_INFOIDARR', []);
            this['$router'].push({
                path:"/myIdentify/handleMyIdentify/handleMyIdentify",
            })
            window.sessionStorage.removeItem("handleMyIdentifyDetail_passedIdentify");
        };
        //回传的参数
		beforeRouteEnter(to, from, next) {
			next(vm => {
                // 如果从单页面回传，需要判断vuex中存储的infoIdArr个数是否和table表格中的一致，
                // 因为如果删除档案的话，表格的数据是已经改变的
				if(from.name == '单个鉴定审批') {
                    //debugger;
                    vm.passedIdentifyObj = JSON.parse(window.sessionStorage.getItem("handleMyIdentifyDetail_passedIdentify"));
                    // vm.getIdentifyDetail();
                    let params = {
                        taskId: vm.passedIdentifyObj.id,
                        fondCode: 0,
                        phase: 2,
                        taskType: vm.passedIdentifyObj.taskType
                    }
                    Service.getIdentifyDetail(params).then(res=>{
                        if(res.data.succeeded){
                            vm.tableDataList = res.data.data.InfoDetail;
                            vm.$refs.iconProcessRef.applyFullName = vm.passedIdentifyObj.createPerson;
                            vm.$refs.iconProcessRef.applyDeptName = vm.passedIdentifyObj.taskSubmitPerson.department;
                            // this.$refs.iconProcessRef.applyFullName = this.passedIdentifyObj.createPerson;
                            // this.$refs.iconProcessRef.applyDeptName = (null!=this.passedIdentifyObj.taskSubmitPerson)?this.passedIdentifyObj.taskSubmitPerson.department:"";
                            vm.$refs.iconProcessRef.processList = vm.passedIdentifyObj.appraisalProcessList;
                            
                            vm.archiveIdArr = res.data.data.idList;
                            vm.changeTableDatasFromSingle();
                        }
                    });
				}
			})
        };
        
        showArchiveDetail(row){

        };
        selsArchiveChange(sel){
            if(this.isshift){        
                this.selection = this.shiftSelect(this.tableDataList, sel, this.$refs.shiftTableRef );
            }else{
                this.selection = sel;
            }
        };
        searchArchive(){

        }
        singleApprove(row){
            this.$store.commit('SET_INFOIDARR', this.archiveIdArr);
            let passObj = {
                taskInfoId: row.appraisalInfo.id,//当前条数据的
                singleApproveRadio: row.appraisalInfo.auditReason,//当前条的鉴定值需要传入后台，用于初始化
                singleApproveRemark: row.appraisalInfo.auditRemark,
                // createPersonName: this.passedIdentifyObj.createPerson,//流程起始点
                // createPersonDept: this.passedIdentifyObj.taskSubmitPerson.unitname,//流程起始点
                processArr: this.passedIdentifyObj.appraisalProcessList,//流程

                taskTypeName: this.passedIdentifyObj.taskTypeDict.displayText,//鉴定类型文字
                dictList: this.dictDataList,//子数据字典
                taskName: this.passedIdentifyObj.taskName,
                taskType: this.passedIdentifyObj.taskTypeDict.displayText,
                TM: row.TITLE,
                taskId: this.passedIdentifyObj.id
            }
            //循环所有的档案列表，将鉴定值存储传递
            let map = new Map();
						//debugger;
            for(let data of this.tableDataList){
                map.set(data.appraisalInfo.id, {
                    singleRemark: data.appraisalInfo.auditRemark,
                    singleReason: data.appraisalInfo.auditReason,
                    archiveTitle: data.TITLE
                })
            }
            this.$store.commit('INIT_MININFOMAP', map);
            window.sessionStorage.setItem("singleApproveIdentify_passedObj", JSON.stringify(passObj));
            this.$router.push({path:'/myIdentify/singleApproveIdentify/singleApproveIdentify'});
        };
        batchApprove(){
            let loadingInstance = Loading.service({
                        lock: true,
                        text: '正在提交，请稍等',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
            let minInfoMap = this.$store.state.minInfoMap;
            let infoArr = [];

            if(minInfoMap.size>0){
                for(let ob of this.tableDataList){
                    //如果单条有值的话，以单条的值为准。 
                    if(ob.appraisalInfo.auditRemark==null || ob.appraisalInfo.auditRemark=="" ){
                        ob.appraisalInfo.auditRemark = this.comment;
                    }
                    infoArr.push(ob.appraisalInfo);
                } 
            }else{
                for(let ob of this.tableDataList){
                    ob.appraisalInfo.auditRemark = this.comment;
                    infoArr.push(ob.appraisalInfo);
                } 
            }
            
            if(infoArr.length!=this.tableDataList.length){ //提交时做判断 如果有没有填写鉴定值的、总评价内容的，提示
                this['$message']({
                    message: '还有未鉴定的档案，不能提交!',
                    type: 'warning'
                });
                return;
            }
            // this.tableLoading = true;
            let pro = this.setProcessParam();
            let params = {
                appraisalInfoList: infoArr,
                taskId: this.passedIdentifyObj.id,
                process: pro
            }
            Service.batchCommitApprove(params).then(res=>{
                loadingInstance.close()
                // this.tableLoading = false;
                if(res.data.succeeded){
                    this.Goback();
                }
            });
        };
        setProcessParam(){
            let list = this.passedIdentifyObj.appraisalProcessList;
            for(let pro of list){
                if(pro.isAudit ==2){
                    pro.isAudit = 3;
                    return pro;
                }
            }
        }
        changeBatchValue(val){
            if(this.selection.length==0){
                for(let ob of this.tableDataList){
                    ob.appraisalInfo.auditReason = val;
                }
            }else{
                for(let ob of this.selection){
                    ob.appraisalInfo.auditReason = val;
                }
            }
        }
        changeTableDatasFromSingle(){
            let minInfoMap = this.$store.state.minInfoMap;
            for(let data of this.tableDataList){
                let infoId = data.appraisalInfo.id;
                let minInfo = minInfoMap.get(infoId);
                data.appraisalInfo.auditReason = minInfo.singleReason;
                data.appraisalInfo.auditRemark = minInfo.singleRemark;
            }
        }
        getIdentifyDetail(){
            let params = {
                taskId: this.passedIdentifyObj.id,
                fondCode: 0,
                phase: 2,
                taskType: this.passedIdentifyObj.taskType,
                searchValue: this.searchValue
            }
            Service.getIdentifyDetail(params).then(res=>{
                if(res.data.succeeded){
                    this.tableDataList = res.data.data.InfoDetail;
                    this.$refs.iconProcessRef.applyFullName = this.passedIdentifyObj.createPerson;
                    this.$refs.iconProcessRef.applyDeptName = (null!=this.passedIdentifyObj.taskSubmitPerson)?this.passedIdentifyObj.taskSubmitPerson.department:"";
                    this.$refs.iconProcessRef.processList = this.passedIdentifyObj.appraisalProcessList;
                    this.archiveIdArr = res.data.data.idList;
                }
            });
        }
        // 通过鉴定类型值查找对应的数据字典
        getTypeDictDatas(){
            let dictId = this.passedIdentifyObj.taskType;
            if(dictId == 1){
                dictId = 2; //保管期限 2
            }else if(dictId == 2){ 
                dictId = 206; //销毁鉴定 206
            }else if(dictId == 3){ 
                dictId = 3; //密级 3
            }else if(dictId == 4){ 
                dictId = 6; //开放鉴定 6
            }
            Service.getTypeData(dictId).then((res) =>{
                this.dictDataList = res.data.data;
            });
        }
        keyevent(){
            var that =this;   
            document.onkeydown = function(e) {        //按下键盘      
                switch (e.keyCode) {        
                    case 16:           
                        that.isshift = true;     
                        break;         
                }     
            };    
            document.onkeyup = function(e) {        //放弃键盘   
                switch (e.keyCode) {      
                    case 16:           
                        that.isshift = false;      
                        break;        
                }     
            }; 
        };
        setRandomTitle(pro){
            return `鉴定值${pro.auditStep}`;
        };
        setRandomColumns(){
            this.randomColumns = [];
            for(let pro of this.passedIdentifyObj.appraisalProcessList){
                if(pro.isAudit == 3){
                    this.randomColumns.push(pro);
                }
            }
        };

        created(){ 
            this.passedIdentifyObj = JSON.parse(window.sessionStorage.getItem("handleMyIdentifyDetail_passedIdentify"));
            this.setRandomColumns();
            this.getIdentifyDetail();       
            this.getTypeDictDatas(); 
            this.keyevent();  
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 465;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/myBorrow/borrow.scss';
</style>