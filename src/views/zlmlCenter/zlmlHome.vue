<template>
	<section class="mainCon">
		<div class="mainPanel">                
            <el-form :model= "wordFilters"  class="keywordForm">
                <el-form-item>   
                    <div class="searchTitle">快速检索</div>
                </el-form-item>
                <el-form-item  ref="word">  
                    <el-input placeholder="请输入关键字" class="indexInput lt" style="right:205px;" v-model="wordFilters.word" @keyup.enter.native="getKeyword()"></el-input>                      
                    <div class="rt">
                        <el-button class="defaultBtn indexSearchBtn" @click="getKeyword()">目录检索</el-button>	
                        <el-button class="defaultBtn indexSearchBtn" @click="authoritySetting()">权限设置</el-button>							
                    </div>
                </el-form-item>				
            </el-form>
		</div>         
	</section>
</template>

<script lang="ts">
	import Vue from 'vue'
    import Component from 'vue-class-component'
    import Service from './zlmlHome.service' ;
    import moment from 'moment';
    @Component
    export default class AppHome extends Vue {		
        bodyHeight: number = (document.documentElement.clientHeight-105)*0.45-76; ;       
        wordFilters: any = { word:'' };
        query:string =''; 
        settingBtnVisible: boolean = false;
		constructor(){
            super();                
		}       

        // 跳转关键字检索
        getKeyword():void{            
            if(this.wordFilters.word){
                this.query = this.wordFilters.word
			};          
            this['$router'].push({
                path:'/zlmlCenter/superSearch/zlmlSuperSearch',
                params:{ word: this.query}
            });
        };
        //权限设置
        authoritySetting(){
            this['$router'].push({
                path:'/zlmlCenter/authoritySetting/authoritySetting',
                params:{ word: this.query}
            });
        }
        getRolesByUserId(){
            Service.getRoleById(window.sessionStorage.userId).then(res => {
                if(res.data.succeeded){
                    let data = res.data.data;
                    for(let role of data){
                        if(role.roleName == "系统管理员"){
                            this.settingBtnVisible = true;
                            return;
                        }
                    }
                }
            });
        };

        mounted(){
            //  this.getRolesByUserId();//去判断是否有系统管理员角色，此角色有设置权限的功能
        };
        created(){
            
        };
    }
</script>

<style lang="scss" scoped>
	@import '../../styles/home/home.scss';
</style>