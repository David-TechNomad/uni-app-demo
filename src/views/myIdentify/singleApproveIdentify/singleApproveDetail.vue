<template>
    <section class="wrapprSection">
        <div class="mainTitle">
            <span>鉴定详情</span>
            <el-button class="defaultBtn rt mt10" @click="toHandleMyIdentifyDetail" >返回</el-button>   
        </div> 
        <div class="contentbox contentbox-full "> 
            <el-tabs v-model="activeName" type="card" class="erpTab ">                      
                <el-tab-pane label="基本信息" name="first">
                    <div class="boxshow bgwhite ">
                        <div class="basicMsg">
                            <el-row>
                                <el-col :span="4">[鉴定任务名称]<span>{{passedObj.taskName}}</span></el-col>
                                <el-col :span="4">[鉴定类型]<span >{{passedObj.taskTypeName}}</span></el-col>
                                <el-col :span="16">[文档题名]<span >{{passedObj.TM}}</span></el-col>
                            </el-row>
                        </div>
                    </div>
                </el-tab-pane>                     
            </el-tabs>
            <el-tabs v-model="activeName" type="card" class="erpTab mt10">
                <el-tab-pane label="鉴定流程及意见" name="first"  >  
                    <div class="boxshow bgwhite "> 
                        <el-steps   :active="activeNum" :space="400" finish-status="success" class="mt10 ml10  pd10" style="margin:0 auto;width: 70%;"  v-if="processDataList.length>0" >
                            <el-step v-for="step in processDataList" :title="setTitle(step)" :description="setDescription(step)"></el-step>
                        </el-steps>    
                        <div v-else class="mt10 ml10 pd10">暂无流程</div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </section>
</template> 
    <script lang="ts">
        import Vue from 'vue';
        import Component from 'vue-class-component';
        import Service from './singleApproveIdentify.service';  
        import iconProcess from '@/views/myIdentify/iconProcessComponent.vue'; 
        @Component({
            components:{
                iconProcess
            }
        })
        export default class singleApproveDetail extends Vue{
            bodyHeight: number= document.documentElement.clientHeight - 563 ; 
            activeName: string = 'first';
            passedObj: any = {};
            processDataList: any = [];
            appInfoProcessList: any = [];
            activeNum: number = 1;
            returnPath: string = '';

            //返回
            toHandleMyIdentifyDetail(){
                // this.$router.push({path:'/myIdentify/myIdentifyDetail/myIdentifyDetail'});
                this.$router.push({path: this.returnPath});
                window.sessionStorage.removeItem("singleApproveDetail_Obj");
                window.sessionStorage.removeItem("singleApproveDetail_returnPath");
            };

            setTitle(step){
                if(step.isAudit == 3){
                    return `步骤${step.auditStep}: 已审批` ;
                }else if(step.isAudit == 2){
                    return `步骤${step.auditStep}: 待审批` ;
                }else if(step.isAudit == 1){
                    return `步骤${step.auditStep}: 未审批` ;
                }
            }
            setDescription(step){
                //debugger;
                let auditStep = step.auditStep;
                let obj = {};
                for(let infoPro of this.appInfoProcessList){
                    if(infoPro.auditStep == auditStep){
                        obj = infoPro;
                    }
                }
                debugger;
                if(obj.auditReason || obj.auditRemark){
                    return `[鉴定意见]：${obj.auditReason}。
                            [鉴定理由]：${obj.auditRemark}。`;
                }else{
                    return ` `;
                }
            }
            getFileProcess(){
                let params = {
                    "taskId": this.passedObj.taskId,
                    "taskInfoId": this.passedObj.taskInfoId,
                    "taskType": this.passedObj.taskType
                };
                Service.getTaskInfoProcessDetail(params).then(res=>{
                    if(res.data.succeeded){
                        
                        this.processDataList = res.data.data.appProcessList;
                        this.appInfoProcessList = res.data.data.appInfoProcessList; 
                        //debugger;
                        this.activeNum = 0;
                        for(let pro of this.processDataList){
                            if(pro.isAudit == 3){
                                this.activeNum += 1;
                            }
                        }
                    }
                });
            }
            created(){    
                this.passedObj  = JSON.parse(window.sessionStorage.getItem("singleApproveDetail_Obj"));
                this.returnPath =  window.sessionStorage.getItem("singleApproveDetail_returnPath");
                this.getFileProcess();
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