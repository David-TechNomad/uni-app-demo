<template>
        <section class="wrapprSection">
            <div class="mainTitle">
               <span>单个鉴定审批</span>
               <el-button class="defaultBtn rt mt10" @click="toHandleMyIdentifyDetail" >返回</el-button>   
            </div> 
            <div class="contentbox contentbox-full bt50"> 
                <!-- <iconProcess ref="iconProcessRef"></iconProcess> -->
                <el-tabs v-model="activeName" type="card" class="erpTab ">                      
                    <el-tab-pane label="基本信息" name="first">
                        <div class="boxshow bgwhite ">
                            <div class="basicMsg">
                                <el-row>
                                    <el-col :span="4">[鉴定任务名称]<span>{{passedObj.taskName}}</span></el-col>
                                    <el-col :span="4">[鉴定类型]<span >{{passedObj.taskType}}</span></el-col>
                                    <el-col :span="16">[文档题名]<span >{{archiveTitle}}</span></el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-tab-pane>                     
                </el-tabs>
                <el-tabs v-model="activeName" type="card" class="erpTab mt10">
                    <el-tab-pane label="鉴定流程及意见" name="first" style="margin-top: -9px;">   
                        <div class="boxshow bgwhite ">
                            <el-steps  :active="activeNum" :space="400" finish-status="success" class="mt10 ml10 pd10" style="margin:0 auto;width: 70%;" v-if="processDataList.length>0">
                                <el-step v-for="step in processDataList" :title="setTitle(step)" :description="setDescription(step)"></el-step>
                            </el-steps> 
                            <div v-else class="mt10 ml10 bgwhite boxshow pd10">暂无流程</div>
                        </div>     
                    </el-tab-pane>
                </el-tabs>
                <el-tabs v-model="activeName" type="card" class="erpTab mt10">                      
                    <el-tab-pane label="我的鉴定意见" name="first"> 
                        <div class="pd10 boxshow bgwhite">  
                            <el-input  type="textarea" v-model="singleAuditRemark" :rows="3" placeholder="请输入内容" > </el-input>
                            <div style="line-height: 40px;">{{passedObj.taskTypeName}}：
                                <el-radio v-for="ind in passedObj.dictList" v-model="singleApproveRadio" :label="ind.code" >{{ind.displayText}}</el-radio>
                            </div> 
                        </div>
                    </el-tab-pane>                     
                </el-tabs>
            </div>
            <div class="mt10 footerBar">
                    <el-button class="defaultBtn" v-if="upBtnVisible" @click="approveLast">上一条</el-button>
                    <el-button class="defaultBtn" @click="saveSingleApprove">保存</el-button>
                    <el-button class="defaultBtn" v-if="nextBtnVisible" @click="approveNext">下一条</el-button>
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
        export default class singleApproveIdentify extends Vue{
            bodyHeight: number= document.documentElement.clientHeight - 563 ; 
            activeName: string = 'first';
            passedObj: any = {};
            passedInfoIdArr: any = [];
            processDataList: any = [];
            activeNum: number = 0;
            singleAuditRemark: string = '';
            singleApproveRadio: string = '';
            archiveTitle: string = '';
            oriAuditRemark: string = '';
            oriApproveRadio: string = '';
            currentTaskId: number = -1;
            upBtnVisible: boolean = true;
            nextBtnVisible: boolean = true;

            //返回
            toHandleMyIdentifyDetail(){
                this.$router.push({path:'/myIdentify/handleMyIdentify/handleMyIdentifyDetail'});
                window.sessionStorage.removeItem("singleApproveIdentify_passedObj");
            };
            saveSingleApprove(){ // 保存时存储
                this.$store.commit('SET_TASKINFOID', this.currentTaskId);
                this.$store.commit('SET_TASKTYPE', this.singleApproveRadio);
                this.$store.commit('SET_TASKCOMMENT', this.singleAuditRemark);
                this.$store.commit('CHANGE_MININFOMAP');
                this['$message']({
                    message: '保存成功!',
                    type: 'success'
                });
            };
            giveUserMsgTip(type){
                let msg = type==1?"上一条": "下一条";
                this.$confirm('您做了修改，是否保存?', '提示', {
                    confirmButtonText: `保存并继续${msg}`,
                    cancelButtonText: `不保存并继续${msg}`,
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.saveSingleApprove();
                    this.getLastOrNextInfo(type);
                }).catch(() => {
                    this.getLastOrNextInfo(type);
                })
            }
            getLastOrNextInfo(type){//1上一条 2下一条
                let currentIndex = this.passedInfoIdArr.indexOf(this.currentTaskId);
                let length = this.passedInfoIdArr.length;
                if(type ==1){
                    currentIndex = currentIndex -1;
                }else{
                    currentIndex = currentIndex +1;
                }
                this.setBtnVisible(currentIndex);
                this.getInfoByCurrentInfoId(currentIndex);
            }
            getInfoByCurrentInfoId(currentIndex){
                //重新赋值currentTaskId
                this.currentTaskId = this.passedInfoIdArr[currentIndex];
                let minInfoMap = this.$store.state.minInfoMap;
                let info = minInfoMap.get(this.currentTaskId);
                this.singleApproveRadio = info.singleReason;
                this.singleAuditRemark = info.singleRemark;
                this.archiveTitle = info.archiveTitle;
                this.oriApproveRadio = this.singleApproveRadio;  
                this.oriAuditRemark = this.singleAuditRemark; 
            };
            checkCurrentRemarkOrReasonIsChanged(type){
                //判断保存的列表数据是否存储的新值
                let minInfoMap = this.$store.state.minInfoMap;
                let info = minInfoMap.get(this.currentTaskId);
                
                let remarkIsSameFlag = true;
                if(info.singleRemark==null){
                    if(this.singleAuditRemark==null || (this.singleAuditRemark!=null && this.singleAuditRemark!=undefined && this.singleAuditRemark.trim()=='')){
                        remarkIsSameFlag = true;
                    }else{
                        remarkIsSameFlag = false;
                    }
                }else{
                    if(info.singleRemark!=this.singleAuditRemark){
                        remarkIsSameFlag = false;
                    }
                }

                if(info.singleReason!=this.singleApproveRadio || !remarkIsSameFlag){
                    //提示是否保存
                    this.giveUserMsgTip(type);
                }else{
                    this.getLastOrNextInfo(type);  
                }
            }
            approveLast(){
                this.checkCurrentRemarkOrReasonIsChanged(1);
            };
            approveNext(){
                this.checkCurrentRemarkOrReasonIsChanged(2);
            }
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
                debugger;
                if(step.auditRemark || step.auditReason){
                    // return `鉴定意见及理由：${step.auditRemark} 
                    // <p>鉴定结果：${step.auditReason}</p>`;
                    return `[鉴定意见]：${step.auditReason}。
                            [鉴定理由]：${step.auditRemark}。`;
                }else{
                    return ` `;
                }
            }
            setBtnVisible(currentIndex){
                let length = this.passedInfoIdArr.length;
                if(currentIndex==0){
                    if((currentIndex == length-1)  && (currentIndex==0)){//一共一条档案，不用显示上一条 下一条按钮
                        this.upBtnVisible = false;
                        this.nextBtnVisible = false;
                    }else{
                        this.upBtnVisible = false;
                        this.nextBtnVisible = true;
                    }
                }else if(currentIndex == length-1){
                    this.upBtnVisible = true;
                    this.nextBtnVisible = false;
                }else{
                    this.upBtnVisible = true;
                    this.nextBtnVisible = true;
                }
            };
            created(){   
                this.passedObj  = JSON.parse(window.sessionStorage.getItem("singleApproveIdentify_passedObj"));
                this.passedInfoIdArr = this.$store.state.infoIdArr;
                this.currentTaskId = this.passedObj.taskInfoId; 
                //第一次进入单个审批界面，初始鉴定值
                this.singleAuditRemark = this.passedObj.singleApproveRemark
                this.singleApproveRadio = this.passedObj.singleApproveRadio;
                this.archiveTitle = this.passedObj.TM;
                //记录原始值，为了变化的时候提示保存
                this.oriApproveRadio = this.singleApproveRadio;  
                this.oriAuditRemark = this.singleAuditRemark; 
                // 上一条下一条按钮的显隐
                let currentIndex = this.passedInfoIdArr.indexOf(this.currentTaskId);
                this.setBtnVisible(currentIndex);
            };
            mounted(){
                //流程
                this.processDataList = this.passedObj.processArr; 
                debugger;
                // this.$refs.iconProcessRef.applyFullName = this.passedObj.createPersonName;
                // this.$refs.iconProcessRef.applyDeptName = this.passedObj.createPersonDept;
                // this.$refs.iconProcessRef.processList = this.passedObj.processArr;
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