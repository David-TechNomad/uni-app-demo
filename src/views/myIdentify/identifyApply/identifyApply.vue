
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>鉴定申请</span>
           <el-button class="defaultBtn rt mt10" @click="Goback">返回</el-button>
        </div> 
        <div class="contentbox contentbox-full bt50"> 
            <el-tabs v-model="activeName" type="card" class="erpTab ">                      
                <el-tab-pane label="鉴定申请信息" name="first">
                    <div class="boxshow bgwhite borrowForm ">
                        <el-form label-width="130px" size="small" :model="basicForm" ref="formRef"  :rules="basicFormRules" class="mb10">
                            <table class="defaultTable">
                                <tr>
                                    <td>
                                        <el-form-item label="鉴定任务名称：" prop="taskName">
                                            <el-input class="checkName percentName" v-model="basicForm.taskName"></el-input>
                                        </el-form-item> 
                                    </td>
                                    <td>
                                        <el-form-item label="鉴定类型：" prop="taskType">
                                            <dictSelect :dictId="55" :dictModel="basicForm.taskType" :dictDisabled="false" style="width:220px;" @dictChange="val => {this.basicForm.taskType = val;}"></dictSelect>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label="鉴定创建人："  ref="applyUserName" >
                                            <el-input class="checkName percentName" readonly  v-model="basicForm.applyUserName"></el-input>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <el-form-item label="鉴定开始日期：" class="leftTimePicker" ref="applyUserName">
                                            <el-date-picker v-model="basicForm.taskBeginDate"  type="date" readonly  format="yyyy-MM-dd"  value-format="yyyy-MM-dd"  placeholder="开始日期"  ></el-date-picker>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label="鉴定结束日期：" class="rightTimePicker" prop="taskEndDate">
                                            <el-date-picker v-model="basicForm.taskEndDate"  type="date"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd"  placeholder="结束日期"   ></el-date-picker>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr >
                                    <td  colspan="3">
                                        <el-form-item   label="申请说明："  >
                                            <el-input type="textarea" maxlength="200" placeholder="最多填写200个字符"   v-model="basicForm.comments"></el-input>
                                        </el-form-item>
                                    </td>
                                </tr>
                            </table>                            
                        </el-form>  
                    </div>
                </el-tab-pane>                     
            </el-tabs>
            <div class="relative mt10 "> 
                <div class="TabRBtn ">
                    <b class="lt">共{{passedArchiveList.length}}份文件</b>                         
                </div>                                          
                <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                    <el-tab-pane label="待鉴定文档" name="first">
                          <div class="boxshow">   
                            <el-table
                                :data="passedArchiveList"
                                border
                                element-loading-text="努力加载中..."
                                header-row-class-name="tableHeader" 
                                stripe 
                                class="defaultTable " style="margin-top:-2px;">
                                <el-table-column  prop="name" label="操作"  width="120">
                                      <template slot-scope="scope">                                                 
                                          <!-- <el-button class="tabletoolBtn">详情</el-button> -->
                                          <el-button class="tabletoolBtn"  @click="deleteArchive(scope.row)">删除</el-button>
                                      </template>
                                </el-table-column>
                                <el-table-column prop="CATEGORY_CODE_Text" label="门类代码">
                                </el-table-column>
                                  <el-table-column prop="ARCHIVAL_CODE" label="档号">                                      
                                </el-table-column>
                                  <el-table-column prop="TITLE" label="题名">                                      
                                </el-table-column>
                                <el-table-column prop="FONDS_NAME" label="全宗名称">                                      
                                </el-table-column>
                                <el-table-column prop="RETENTION_PERIOD_Text" label="保管期限">                                      
                                </el-table-column>
                                <el-table-column prop="CONTROL_ID_Text" label="控制标识">                                      
                                </el-table-column>
                                <el-table-column prop="SECURITY_LEVEL_Text" label="密级">                                      
                                </el-table-column>
                            </el-table>
                        </div> 
                    </el-tab-pane>                                                     
                </el-tabs> 
            </div>               
        </div>  
        <div class="mt10 footerBar">
            <el-button class="defaultBtn" @click="saveResult('formRef')">保存</el-button>
            <el-button class="defaultBtn" @click="submitResult('formRef')">提交鉴定申请</el-button>
            <el-button class="defaultBtn" @click="Goback" >取消</el-button>
        </div>
    </section>
</template> 
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './identifyApply.service';  
    import { Loading } from 'element-ui'; 
    @Component
    export default class identifyApply extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 470 ; 
        activeName:string = 'first';
        tableDataList: any = [];
        passedArchiveList: any = [];
        passedLibId: number = -1;
        archiveParams: any = [];
        basicForm: any = {
            "taskName": '',
            "taskType": '',
            "taskBeginDate": new Date(),
            "taskEndDate": '',
            "comments": '',
            applyUserName: window.sessionStorage.username
        };
        ruleForm: any = {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        }
        basicFormRules:any  = {
            taskName: [{
                required: true,
                message: ' ',
                trigger: 'blur'
            }],
            taskType: [{
                required: true,
                message: ' ',
                trigger: 'blur'
            }],
            taskEndDate: [{
                required: true,
                message: ' ',
                trigger: 'blur'
            }]
        };
      
        total: number = 1;
        page: number = 0;
        pageSize: number = 25;     
        applyUserName: string = '';//window.sessionStorage.userName;             
        
        Goback(){
            this['$router'].go(-1);
        };
        handleCheckedType(val){

        };
        deleteArchive(row){
            this.passedArchiveList.splice(this.passedArchiveList.indexOf(row),1);
        }
        setArchiveParams(){
            this.archiveParams = [];
            for(let archive of this.passedArchiveList){

                let data =   {
                    libId: this.passedLibId,
                    objectId: archive.id,
                    appraisalFont: this.basicForm.taskType=='1'?archive.RETENTION_PERIOD: (this.basicForm.taskType=='2'?archive.SECURITY_LEVEL:            (this.basicForm.taskType=='3'?archive.CONTROL_ID: archive.RECORD_STATUS)), 
                    mj: archive.SECURITY_LEVEL,
                    bgqx: archive.RETENTION_PERIOD,
                    nd: archive.YEAR,
                    tm: archive.TITLE,
                    dh: archive.ARCHIVAL_CODE,
                }
                this.archiveParams.push(data);
            }
        }
        saveResult(formName){
             this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.setArchiveParams();
                    let params = {
                        appraisalInfoList: this.archiveParams,
                        fondCode: 0
                    };
                    Service.saveIdentify(Object.assign(params, this.basicForm)).then((res) =>{
                        if(res.data.statusCodeValue == 200){
                            //debugger;
                            this['$router'].push({
                                path:"/myIdentify/myIdentifyMgnt",
                            })
                        }
                    });
                }
            });
        };
        submitResult(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    let loadingInstance = Loading.service({
                        lock: true,
                        text: '正在提交，请稍等',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.setArchiveParams();
                    let params = {
                        appraisalInfoList: this.archiveParams,
                    };
                    Service.submitIdentify(Object.assign(params, this.basicForm)).then((res) =>{
                        loadingInstance.close();
                        if(res.data.statusCodeValue == 200){
                            this['$router'].push({
                                path:"/myIdentify/myIdentifyMgnt",
                            })
                        }
                    });
                }
            });
        };
        created(){ 
        };

        mounted(){
            this.applyUserName  = window.sessionStorage.userName;
            let params = JSON.parse(window.sessionStorage.getItem("identifyApply_passedParams"));  
            this.passedArchiveList = params.archiveList;
            this.passedLibId = params.libId
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 470;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/myBorrow/borrow.scss';
</style>