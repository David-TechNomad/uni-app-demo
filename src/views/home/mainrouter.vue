<template>
	<section >
         <div class="header_container">
                <el-row>
                    <el-col :span="24" class="header">				
                        <div class="userinfo">
                                <span class="userinfo-fa">
                                    <i class="fa fa-user"></i>{{username}}
                                </span>
                                <span class="userinfo-fa"  @click.slef="logout">
                                    <i class="fa fa-share-square-o"></i>退出
                                </span>
                        </div>
                    </el-col>
                </el-row>
            </div>		               
            <div class=" mainRouter">                
                <div class="mainRouterCon">                     
                         <div class="routerCard">                              
                                <div class="routerCardCon">
                                    <img src="../../imgs/logoicon.png" class="routerLogin">
                                    <h1 class="routerCardtitle">全省区域性数字档案集成管理与共享利用平台</h1>
                                    <!-- <p>
                                        平台内容功能简介，平台内容功能简介，平台内容功能简介，平台内容功能简介，平台内容功能简介，
                                    </p> -->
                                </div>
                                <div class="routerCardBtn" @click="goHome('erp')">前往 ></div>
                          </div>
                          <div class="routerCard" v-if="userType === 'System'">                              
                                <div class="routerCardCon">
                                    <img src="../../imgs/logoicon.png" class="routerLogin">
                                    <h1 class="routerCardtitle">全省档案资料目录中心</h1>
                                    <!-- <p>
                                        平台内容功能简介，平台内容功能简介，平台内容功能简介，平台内容功能简介，平台内容功能简介，
                                    </p> -->
                                </div>
                                <div class="routerCardBtn" @click="goHome('zlml')">前往 ></div>
                          </div>
                          <div class="routerCard">                              
                                <div class="routerCardCon">
                                    <img src="../../imgs/logoicon.png" class="routerLogin">
                                    <h1 class="routerCardtitle">全省民生档案远程共享利用平台</h1>
                                    <!-- <p>
                                        平台内容功能简介，平台内容功能简介，平台内容功能简介，平台内容功能简介，平台内容功能简介，
                                    </p> -->
                                </div>
                                <div class="routerCardBtn" @click="goHome('mspt')">前往 ></div>
                          </div>
                           <div class="logobg"></div>
                           <div class="copyright">版权所有 ©️江西省档案馆</div>
                </div>
            </div> 
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
    import Component from 'vue-class-component';	
    import Service from './home.service';  
    @Component
    export default class AppHome extends Vue {
        username:string='';
        userType:string='';
        archiveAgentCode:string='';
        roleIds:string='';
        userId:string='';
        token:string='';
		constructor(){
            super();
            this.userType = window.sessionStorage.getItem('userType');
            this.token = window.sessionStorage.getItem('token');
            this.archiveAgentCode = window.sessionStorage.getItem('archiveAgentCode');
            this.roleIds = window.sessionStorage.getItem('roleIds');
            this.userId = window.sessionStorage.getItem('userId');
        }
         //退出登录
        logout(){ 
            this['$confirm']('确认退出吗?', {
                type: 'warning'
            }).then(() => {
                Service.logout({}).then((res) =>{
                    if(res.data.succeeded) {
                        window.sessionStorage.clear(); 
                        this.$router.options.routes[0].meta.requireAuth= true;
                        this['$router'].push("/Login/Login") 
                    }
                });
               
            }).catch(() => {

            });
        };
        goHome(path){
            window.sessionStorage.removeItem("fromMenu");
            if(path=='erp'){
            //    window.location.href="";
                window.open("#/home/home");
            }
            if(path == "zlml"){
                // window.location.href="#/zlmlCenter/zlmlHome";
                window.sessionStorage.setItem("fromMenu","2");  
                window.open("#/zlmlCenter/zlmlHome");
            }if(path == "mspt"){
                window.open("https://17.1.86.121/easp/#/home/home" + '?token=' + this.token + '&' + 'username=' + this.username + '&' + 'userType=' + this.userType + '&' + 'archiveAgentCode=' + this.archiveAgentCode + '&' + 'roleIds=' + this.roleIds + '&' + 'userId=' + this.userId);
            }
        };
        mounted(){
        };
        created(){
            this.username =  window.sessionStorage.getItem('username');              
			let userType  = window.sessionStorage.getItem('userType');;
			if(this.requireOA){
                 this.$router.push({
                     path:'/login/login'
                  });
			}else if(userType==='Guest'){
				window.location.href=""; 
			}
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../styles/home/home.scss';
    @import '../../styles/header.scss';
</style>