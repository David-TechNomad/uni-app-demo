<template>
	<section class="header_container">
		<el-row>
			<el-col :span="24" class="header">
				<div class="logoImg">
					<img src="../../imgs/logo-3.png" width="100%">
				</div>
				<div class="userinfo">
						<span class="userinfo-fa">
							<i class="fa fa-user"></i>
							<el-dropdown>
								<span class="el-dropdown-link">
									{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown" class="headerDropdownView">
									<el-dropdown-item @click.native="linktopage">个人信息</el-dropdown-item>
									<el-dropdown-item @click.native="linktopassword">修改密码</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</span>
						<span class="userinfo-fa"  @click.slef="logout">
							<i class="fa fa-share-square-o"></i>退出
						</span>
				</div>
			</el-col>
		</el-row>
	</section>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Service from './header.service';
    @Component
	export default class appHead extends Vue{       
        username: string; 
        constructor(){
            super(); 
		};
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
		linktopage(val){			
			this.$router.push({ path:'/system/userManagement/logoUserMes'});
		}
		linktopassword(){			
			this.$router.push({ path:'/system/userManagement/setPassword'});
		}
		getKey(){           
                Service.getKey({}).then((res) =>{                
                        if(res.data.succeeded){                                
                                 window.sessionStorage.setItem('loginkey',res.data.data);    
                        }else{                         
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }                    
                })
        };
        mounted(){
			this.getKey()
          
		};
        created(){
			this.username =  window.sessionStorage.getItem('username');
		};

	}
</script>

<style lang="scss" scoped>
	@import '../../styles/header.scss';
</style>