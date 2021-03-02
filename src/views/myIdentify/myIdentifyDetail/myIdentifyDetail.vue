
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>鉴定详情</span>
           <el-button class="defaultBtn rt mt10" @click="Goback">返回</el-button>
        </div> 
        <div class="contentbox contentbox-full " :class="[passedIdentifyObj.taskStatus==1?'bt50':'']"> 
            <iconProcess ref="iconProcessRef" v-if="returnPath.includes('handleMyIdentify')"></iconProcess>
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
                                <el-col :span="12">[开始日期]<span>{{passedIdentifyObj.taskBeginDate.substring(0,10)}}</span></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">[创建者]<span>{{passedIdentifyObj.createPerson}}</span></el-col>
                                <el-col :span="6">[鉴定数量]<span>{{passedIdentifyObj.planNum}}</span></el-col>
                                <el-col :span="12">[结束日期]<span>{{passedIdentifyObj.taskEndDate.substring(0,10)}}</span></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">[申请说明]<span>{{passedIdentifyObj.comment}}</span></el-col>
                            </el-row> 
                        </div>
                    </div>
                </el-tab-pane>                     
            </el-tabs>
            <div class="relative mt10"> 
                <div class="TabRBtn tabRtext">
                        <b class="lt mlr10">共{{tableDataList.length}}份文档</b>   
                </div>                                          
                <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                    <el-tab-pane label="需要鉴定的文档" name="first">
                        <div class="boxshow">   
                            <el-table
                                :data="tableDataList"
                                border
                                element-loading-text="努力加载中..."
                                header-row-class-name="tableHeader" 
                                stripe 
                                class="defaultTable mt0">
                                <!-- <el-table-column type="selection"  width="55">
                                </el-table-column> -->
                                <el-table-column  prop="name" label="操作"  width="200">
                                    <template slot-scope="scope">                                                 
                                        <!-- <el-button class="tabletoolBtn" @click="showArchiveDetail(scope.row)">详情</el-button> -->
                                        <el-button class="tabletoolBtn" v-if="passedIdentifyObj.taskStatus==1"  @click="deleteArchive(scope.row)">删除</el-button>
                                        <!-- 未审批状态不给查看详情 -->
                                        <el-button class="tabletoolBtn" v-if="passedIdentifyObj.taskStatus!=1" @click="showArchiveIdentifyProcess(scope.row)">鉴定详情</el-button>
                                    </template>
                                </el-table-column>
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
                                <el-table-column prop="appraisalFont" label="鉴定前值">                                      
                                </el-table-column>
                                <el-table-column prop="appraisalBehind" label="鉴定后值">                                      
                                </el-table-column>    
                            </el-table>
                        </div> 
                    </el-tab-pane>                                                     
                </el-tabs> 
            </div> 
        </div>  
        <!-- 未提交状态需要提交按钮 -->
        <div class="mt10 footerBar" v-if="passedIdentifyObj.taskStatus==1">
            <el-button class="defaultBtn" @click="submitResult">提交鉴定申请</el-button>
        </div>  
    </section>
</template> 
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './myIdentifyDetail.service';  
    import iconProcess from '@/views/myIdentify/iconProcessComponent.vue';  
    import { Loading } from 'element-ui';
    @Component({
        components:{
            iconProcess
        }
    })
    export default class appraisal extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 430 ; 
        activeName:string = 'first';
        passedIdentifyObj: any = {};
        archiveNum: number = 1;
        tableDataList: any = [];
        archiveParams: any = [];
        returnPath: stirng = '';

        Goback(){
            this.$router.push({path: this.returnPath});
            window.sessionStorage.removeItem("myIdentifyDetail_passedIdentify");
            window.sessionStorage.removeItem("myIdentifyDetail_returnPath");
        };
        getIdentifyDetail(){
            let params = {
                taskId: this.passedIdentifyObj.id,
                taskType: this.passedIdentifyObj.taskType,
            }
            Service.getIdentifyDetail(params).then(res=>{
                if(res.data.succeeded){
                    this.tableDataList = res.data.data.InfoDetail;
                    if(this.returnPath.includes('handleMyIdentify')){
                        this.$refs.iconProcessRef.applyFullName = this.passedIdentifyObj.createPerson;
                        this.$refs.iconProcessRef.applyDeptName = this.passedIdentifyObj.taskSubmitPerson.department;
                        this.$refs.iconProcessRef.processList = this.passedIdentifyObj.appraisalProcessList;
                    }
                    
                }
            });
        }
        showArchiveDetail(row){

        };
        showArchiveIdentifyProcess(row){
            let passObj = {
                // processArr: this.passedIdentifyObj.appraisalProcessList,//流程
                taskTypeName: this.passedIdentifyObj.taskTypeDict.displayText,//鉴定类型文字
                taskName: this.passedIdentifyObj.taskName,
                taskType: this.passedIdentifyObj.taskType,
                TM: row.TITLE,
                taskInfoId: row.appraisalInfo.id,//当前条数据的
                taskId: this.passedIdentifyObj.id
            }
            //debugger;
            window.sessionStorage.setItem("singleApproveDetail_Obj", JSON.stringify(passObj));
            window.sessionStorage.setItem("singleApproveDetail_returnPath", '/myIdentify/myIdentifyDetail/myIdentifyDetail');
            this.$router.push({path:'/myIdentify/singleApproveIdentify/singleApproveDetail'});
        }
        deleteArchive(row){
            this.tableDataList.splice(this.tableDataList.indexOf(row),1);
        }

        setArchiveParams(){
            this.archiveParams = [];
            for(let archive of this.tableDataList){
                debugger;
                    let data =   {
                        libId: archive.libId,
                        objectId: archive.id,
                        appraisalFont: this.passedIdentifyObj.taskType=='1'?archive.RETENTION_PERIOD: (this.passedIdentifyObj.taskType=='2'?archive.SECURITY_LEVEL:(this.passedIdentifyObj.taskType=='3'?archive.CONTROL_ID: archive.RECORD_STATUS)), 
                        mj: archive.SECURITY_LEVEL,
                        bgqx: archive.RETENTION_PERIOD,
                        nd: archive.YEAR,
                        tm: archive.TITLE,
                        dh: archive.ARCHIVAL_CODE,
                    }
                    this.archiveParams.push(data);
                }
        }
        submitResult(){
            let loadingInstance = Loading.service({
                lock: true,
                text: '正在提交，请稍等',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.setArchiveParams();
            let params = {
                appraisalInfoList: this.archiveParams
            };
            this.passedIdentifyObj.taskBeginDate = this.passedIdentifyObj.taskBeginDate!=null? new Date(this.passedIdentifyObj.taskBeginDate):this.passedIdentifyObj.taskBeginDate;
            this.passedIdentifyObj.taskEndDate = this.passedIdentifyObj.taskEndDate!=null? new Date(this.passedIdentifyObj.taskEndDate):this.passedIdentifyObj.taskEndDate;
            this.passedIdentifyObj.taskId = this.passedIdentifyObj.id;
            Service.submitIdentify(Object.assign(params, this.passedIdentifyObj)).then((res) =>{
                loadingInstance.close();
                if(res.data.statusCodeValue == 200){
                    //debugger; 
                    this['$router'].push({
                        path:"/myIdentify/myIdentifyMgnt",
                    })
                }
            });
        };
        
        created(){  
            this.passedIdentifyObj = JSON.parse(window.sessionStorage.getItem("myIdentifyDetail_passedIdentify"));
            this.returnPath = window.sessionStorage.getItem("myIdentifyDetail_returnPath");
        };

        mounted(){
            this.getIdentifyDetail();
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 430;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/myBorrow/borrow.scss';
</style>