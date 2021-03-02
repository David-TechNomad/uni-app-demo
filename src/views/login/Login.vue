<template>
	<div class="container">
		<div class="bgHeader">
              <div class="logintitle"><img src="../../imgs/login/logo-login.png"></div>
              <!-- <a href="javascript:;" style="position: absolute; bottom: 10px; right:10px; color:blue;text-decoration:underline;z-index: 100;" 
              @click="guestLogin">以游客身份登录</a> -->
        </div>
        <div class="bgBody">
          <div class="loginForm" >           
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="80">
                <!-- <p>管理员登录</p><br/> -->
               <el-form-item prop="account" ref="account">  
                    <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号" @keyup.enter.native="submitForm('loginForm')">
                         <template slot="prepend"><i class="fa fa-user"></i>用户名</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" ref="password">
                    <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" @keyup.enter.native="submitForm('loginForm')">
                         <template slot="prepend"><i class="fa fa-lock"></i>&nbsp;密 码&nbsp;&nbsp;</template>
                    </el-input>
                </el-form-item>
                  <el-form-item prop="yzm" ref="yzm">
                    <el-input type="text" v-model="loginForm.yzm" auto-complete="off" placeholder="验证码" @keyup.enter.native="submitForm('loginForm')">
                         <template slot="prepend"><i class="fa fa-barcode"></i>验证码</template>
                            <template slot="append" >
                                <div @click="getCaptcha">
                                    <img :src="urs" width="100" height="40" id="getCaptcha">
                                </div> 
                            </template>
                    </el-input>
                </el-form-item>                        
                <el-form-item class="loginArea">                   
                     <el-button class="btn" style="width:100%;" :loading="loading" @click="submitForm('loginForm')">登 录</el-button>
                </el-form-item>
                </el-form>
            </div>
        </div>     
	</div>
    
</template>

<script lang="ts">
	import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './Login.service';
    import {JSEncrypt} from 'jsencrypt';
    @Component
    export default class login extends Vue{
        loginForm: any=[];
        rules: any={};
        dialogVisible:boolean = false;
        key:any;
        loading:boolean =  false;
        urs: string =  process.env.API_BASEURL + '/auth/captcha';
        constructor(){
            super();
            this.loginForm = {
               account:'',
               password:'',
               yzm:''
            };
            this.rules= {
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },                  
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                yzm: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }         
        };
        getCaptcha(){
            this.urs = this.urs + '?1'
        }; 
        getKey(){           
                Service.getKey({}).then((res) =>{                
                        if(res.data.succeeded){
                                 this.key=res.data.data
                                 window.sessionStorage.setItem('loginkey',this.key);    
                        }else{                         
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }                    
                })
        };
        guestLogin(){
             Service.guestLogin({}).then((res) =>{                
                if(res.data.succeeded){
                    //debugger;                  
                    window.sessionStorage.setItem('token',res.data.data.token);                       
                    window.sessionStorage.setItem('username',res.data.data.user.fullName);
                    window.sessionStorage.setItem('archiveAgentCode',res.data.data.user.archiveAgentCode);
                    window.sessionStorage.setItem('roleIds',res.data.data.user.roleIds);
                    window.sessionStorage.setItem('userId',res.data.data.user.userId);
                    window.sessionStorage.setItem('userType',res.data.data.user.userType);
                    this.$router.options.routes[0].meta.requireAuth= false; 
                    this.$router.push({
                            path:'/home/mainrouter',
                            name:'mainrouter'
                    });           
                }else{               
                        this['$message']({
                            message: res.errorMessage,
                            type: 'error'
                        });                        
                }
            });
        };
        submitForm(formName) { 
            let self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {   
                    self.loading = true;   
                    let encrypt = new JSEncrypt();
                    encrypt.setPublicKey(this.key);
                    let pass = encrypt.encrypt(this.loginForm.password); 
                    let params={
                            username:this.loginForm.account,
                            password:pass,
                            captcha:this.loginForm.yzm
                    };      

                    Service.login(params).then((res) =>{                            
                        if(typeof(res)!="object"){
                            res=JSON.parse(res)
                        }                               
                        //debugger;
                        console.log(typeof(res));
                        if(res.succeeded){
                            window.sessionStorage.setItem('token',res.data.token);                       
                            window.sessionStorage.setItem('username',res.data.user.fullName);
                            window.sessionStorage.setItem('archiveAgentCode',res.data.user.archiveAgentCode);
                            window.sessionStorage.setItem('archiveAgentName',res.data.user.archiveAgentName);
                            window.sessionStorage.setItem('roleIds',res.data.user.roleIds);
                            window.sessionStorage.setItem('userId',res.data.user.userId);
                            window.sessionStorage.setItem('userType',res.data.user.userType);
                            this.$router.options.routes[0].meta.requireAuth= false;
                            this.$router.push({
                                path:'/home/mainrouter',
                                name:'mainrouter'
                            });  
                        }else{     
                                this.getCaptcha()              
                                this['$message']({
                                    message: res.errorMessage,
                                    type: 'error'
                                });                        
                        }
                        self.loading = false;
                    });
                    
                } else {
                    return false;
                }
            });
        };  
         
        created(){  
            this.getKey();
                 
        };
        mounted(){   
                  
        };
        
    }
</script>
<style lang="scss" scoped>
    @import '../../styles/login.scss'; 
   
</style>