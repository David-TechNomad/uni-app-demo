<template>
    <div>
        <el-dialog :title="dialogTitle" class="winDialog"  
        :visible.sync="setPasswordVisible" 
        :top="bodyHeight" width="40%" 
        :close-on-click-modal="false" :before-close="beforeClose"
        append-to-body
        >
            <div class=" mainCon mainBorrow" style="padding: 10px 10px;">
                <div class="formData setPasswordForm">                   
                    <el-form status-icon :model="userInfoForm" :rules="userInfoRules" ref="userInfoForm" class="demo-ruleForm" style="background-color:white; margin-top:-15px" label-width="100px">
                        <el-form-item  label="登录名：">
                            <el-input class="checkName" style="width:80%" v-model="userInfoForm.loginAccount" readonly></el-input>
                        </el-form-item>
                        <el-form-item  label="旧密码：" prop="oldPass" >
                            <el-input type="password" class="checkName" style="width:80%" v-model="userInfoForm.oldPass" clearable placeholder="请输入旧密码"></el-input>
                        </el-form-item>
                        <el-form-item  label="新密码：" prop="newPass" >
                            <el-input type="password" class="checkName" style="width:80%" v-model="userInfoForm.newPass" clearable placeholder="请输入新密码" auto-complete="off"></el-input>
                            <!-- <span>*密码长度10位以上、复杂性要求数字字母</span> -->
                        </el-form-item>
                        <el-form-item label="确认密码：" prop="checkPass" >
                            <el-input type="password" class="checkName" style="width:80%" v-model="userInfoForm.checkPass" clearable placeholder="请再次输入密码" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
               </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button class="checkDefault"  @click="beforeClose">关闭</el-button>
                <el-button class="checkWay" @click="updatePwd">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './Login.service';
    @Component({})
    export default class SetPasswordDialog extends Vue{
        setPasswordVisible: boolean = false;
        userInfoForm:any = {
            oldPass:'',
            newPass:'',
            checkPass:'',
            loginAccount:'',
        };
        bodyHeight:string = '0px';
        userInfoRules:any = {
            oldPass: [
                { required: true,validator: this.checkOldPass, trigger: 'blur' }
            ],
            newPass: [
                { required: true,validator: this.validateNewPass, trigger: 'blur' }
            ],
            checkPass: [
                { required: true,validator: this.validateCheckPass, trigger: 'blur' }
            ],
            
        };
        dialogTitle:string = '';
        validateNewPass(rule, value, callback){
            if (value === '') {
              callback(new Error('请输入密码'));
            } 
            if(value!='') {
                if(value.length<10){
                    callback(new Error('密码长度必须大于10位以上'));
                };
                var pattern = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
                if(!pattern.test(value)){
                    callback(new Error('密码复杂性要求数字字母'));
                };
                if (this.userInfoForm.checkPass !== '') {
                  this.$refs.userInfoForm.validateField('checkPass');
                }
                callback();
            }
        };
        validateCheckPass(rule, value, callback) {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.userInfoForm.newPass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
        };
        checkOldPass(rule, value, callback){
            if (value === '') {
              callback(new Error('请输入旧密码'));
            } 
            if(value!=null){
                this.matchPwd(callback);
            }
        };
        async matchPwd(callback){
            let param = {
                'username':this.userInfoForm.loginAccount,
                'password':this.userInfoForm.oldPass
            };
            var res = await Service.matchPwd(param).then();
            if(res.data.succeeded){
                callback();
            }else{
                callback(new Error('旧密码不正确'));
            }
        };
        @Watch('setPasswordVisible')
        showDialog () {
        };
        updatePwd(){
            this.$refs['userInfoForm'].validate((valid) => {
                if (valid) { 
                    let param = {
                        'username':this.userInfoForm.loginAccount,
                        'password':this.userInfoForm.newPass
                    };
                    Service.updatePwd(param).then((res) =>{
                       if(res.data.succeeded){
                            this['$message']({
                                message: '修改密码成功',
                                type: 'success'
                            });
                            Service.login(param).then((res) =>{
                                if(res.data.succeeded){
                                    window.sessionStorage.setItem('token',res.data.data);                       
                                    window.sessionStorage.setItem('username',this.userInfoForm.loginAccount);
                                    if(this.dialogTitle =='设置密码'){
                                         this.$router.options.routes[0].meta.requireAuth= false; 
                                         window.location.href=""; 
                                    }
                                    this.$refs['userInfoForm'].resetFields();
                                    this.setPasswordVisible = false;
                                              
                                }
                            });
                        }else{
                            this['$message']({
                                message: '修改密码失败',
                                type: 'error'
                            });
                        }
                    });
                    
                }
            })
        };
        constructor(){
            super();
            this.bodyHeight = document.documentElement.clientHeight-500+"px";
        };
       
        beforeClose(){
            this.$refs['userInfoForm'].resetFields();
            this.setPasswordVisible = false;
        };
    }
 </script>