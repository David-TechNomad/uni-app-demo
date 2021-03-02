M<template>
    <section  class="wrapprSection">
         <div class="mainTitle">
           <span>修改密码</span>
        </div>
        <div class="contentbox contentbox-full"> 
             <div class="searchCon">
                <el-tabs v-model="activeName" type="card" class="erpTab">                           
                    <el-tab-pane label="修改密码" name="1">
                          <el-form ref="form" :model="form" label-width="180px" class="mt20"  style="max-width:600px">
                                    <el-form-item label="原密码" class="mt20" prop="oldpassword" :rules="[{ required: true, message: '原密码不能为空', trigger: 'blur' },{ validator: oldpasswordchck, trigger: 'blur' }]">
                                        <el-input size="small" v-model="form.oldpassword" type="password"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码：" class="mt20" prop="password" :rules="[{ required: true, message: '请填写密码', trigger: 'blur' },
                                    {validator: validateNewPass, trigger: 'blur'}]">
                                      <el-input  size="small" v-model="form.password" type="password"></el-input>
                                    </el-form-item>                       
                                    <el-form-item label="确认密码：" class="mt20" prop="rePassword" :rules="[
                                    { required: true, message: '请填写确认密码', trigger: 'blur' },
                                    { validator: passwordchck, trigger: 'blur' }]">
                                        <el-input  size="small" v-model="form.rePassword" type="password"></el-input>
                                    </el-form-item>
                                    <el-form-item  class="mt10">
                                        <el-button class="defaultBtn" @click="savepass">保存</el-button>
                                        <el-button class="defaultBtn" @click="resetForm('form')">重置</el-button>                                        
                                    </el-form-item>
                            </el-form>     
                    </el-tab-pane>                   
                </el-tabs> 
                </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './setpassword.service'; 
    import {JSEncrypt} from 'jsencrypt';  
    @Component
    export default class setpassword extends Vue{
        activeName: string = '1'; 
        userType: string;
        form: any ={
          "oldpassword":'',
          "password":"",
          "rePassword":"",        
        };  

         constructor(){
            super();
            this.userType =  window.sessionStorage.getItem('userType');
            };
            resetForm(formName) {
                this.$refs[formName].resetFields();
            };
          validateNewPass(rule, value, callback){
            if (value === '') {
              callback(new Error('请输入新密码'));
            } 
            if(value!='') {
                if(value.length<10){
                    callback(new Error('密码长度必须大于等于10位'));
                };
                var pattern = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
                if(!pattern.test(value)){
                    callback(new Error('密码复杂性要求数字字母'));
                };               
                callback();
            }
        };
        passwordchck(rule,value,callback){        
            if(value!==this.form.password){                
                callback(new Error('两次密码不一致'))
            }else{
                callback()
            }
      };
      oldpasswordchck(rule,value,callback){
            let encrypt = new JSEncrypt();                   
            encrypt.setPublicKey(window.sessionStorage.getItem('loginkey'));
            let oldPassword = encrypt.encrypt(value); 
            if(this.userType === 'System') {
                let parmse={
                    userId:parseInt(window.sessionStorage.getItem('userId')),
                    oldPassword:oldPassword
                };  
                Service.checkPass(parmse).then((res) =>{                     
                        if(res.data.succeeded) {
                            callback();
                        } else {
                            callback(new Error('原密码错误'));
                        }
                })
            } else if(this.userType === 'Public') {
                let parmse2={
                    userId:parseInt(window.sessionStorage.getItem('userId')),
                    password:oldPassword
                };  
                Service.checkPublicUserPassword(parmse2).then((res) =>{                     
                        if(res.data.succeeded) {
                            callback();
                        } else {
                            callback(new Error('原密码错误'));
                        }
                })
            }
      };
      savepass(){    
                this.$refs['form'].validate((valid)=>{
                        if (valid) {                   
                            let encrypt = new JSEncrypt();                   
                            encrypt.setPublicKey(window.sessionStorage.getItem('loginkey'));
                            let pass = encrypt.encrypt(this.form.password);
                            let parmse={
                                userId:parseInt(window.sessionStorage.getItem('userId')),
                                password:pass
                            };
                            if(this.userType === 'System') {
                                Service.updatePwd(parmse).then((res) =>{
                                   if(res.data.succeeded){                                
                                            this['$message']({
                                            message:"修改成功",
                                            type: 'success'
                                        });   
                                    }else{                         
                                        this['$message']({
                                            message: res.data.errorMessage,
                                            type: 'error'
                                        });
                                    }      
                                })    
                            } else if(this.userType === 'Public') {
                                Service.updatePublicUserPassword(parmse).then((res) =>{
                                   if(res.data.succeeded){                                
                                            this['$message']({
                                            message:"修改成功",
                                            type: 'success'
                                        });   
                                    }else{                         
                                        this['$message']({
                                            message: res.data.errorMessage,
                                            type: 'error'
                                        });
                                    }      
                                })   
                            }                       
                        } else {
                            return false;
                        }
               });
       }; 
        mounted(){            
              window.onresize = () => {
                  return (() => {
                      this.bodyHeight = document.documentElement.clientHeight-260;
                  })()
              };    
        };

    };
</script>

<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';
</style>