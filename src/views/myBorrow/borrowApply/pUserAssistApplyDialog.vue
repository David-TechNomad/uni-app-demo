<template>
    <el-dialog title="请填写"  
        :visible.sync="dialogVisible"  class="myDialogCenter " :close-on-click-modal='false' :show-close="true" width="300px" >
        <div style="height: 130px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="查阅目的：" prop="appType">
                    <dictSelect :dictId="39"  style="width: 220px;" :dictModel="ruleForm.appType" :dictDisabled="false" @dictChange="val => {this.ruleForm.appType = val;}" size="small"></dictSelect>
                </el-form-item>
                <el-form-item label="查阅结束时间：" required>
                    <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" size="small" format="yyyy-MM-dd"  value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-form-item>
            </el-form>
        </div>
        <div class="mt10 footerBar">
            <el-button class="defaultBtn" @click="submitForm('ruleForm')">提交协查</el-button>
            <el-button class="defaultBtn" @click="dialogVisible=false;">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './borrowApply.service';
    @Component({})
    export default class pUserAssistApplyDialog extends Vue{		
        dialogVisible:boolean = false;
        passedArchiveAgentCode: string ="";
        passedLibId: number =-1;
        passedArchiveId: number =-1;
        ruleForm: any =  {
          appType: '',
          date: '',
        };
        rules: any = {
          appType: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          date: [
            {  required: true, message: ' ', trigger: 'blur' }
          ],
        };
        @Watch('dialogVisible')
        showDialog(){
            if(this.dialogVisible){
                this.ruleForm.appType = '';
                this.ruleForm.date = '';
                this.$refs.ruleForm.resetFields();
            }
        };
        submitForm(formName){
             this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.$emit("applyAssist", this.ruleForm);
                    // flag = false;
                }
            });
        }
        created(){            
        };    
        mounted(){ 
        };
      }
 </script>
 <style lang="scss" scoped>
</style>