 <template>
	<section>
		<el-row class="container">
			<el-col :span="24" class="main">
                <page-header v-if="!this.requireOA"></page-header>
				<nav-menu v-if="!this.requireOA"></nav-menu>
				<section class="content-container">					
					<div class="grid-content">
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<!--需要缓存的页面-->
								<keep-alive>
									<router-view v-if="$route.meta.keepAlive"></router-view>
								</keep-alive>
							</transition>
							<transition name="fade" mode="out-in">
								<!--不需要缓存的页面-->
								<router-view v-if="!$route.meta.keepAlive"></router-view>
							</transition>
						</el-col>
					</div>
					<!--全局监听浮动窗口-->
					<div class="fixUploadWindow" id="fixUploadWindow" v-show="isShow">
						<div class="auditBtn" @click="toUpload()">
							{{process}}%
						</div>
					</div>
				</section>
			</el-col>			
		</el-row>
	</section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import pageHeader from '../components/head/header.vue';
	import navMenu from '../components/nav/navMenu.vue';
	import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
    @Component({
        components:{
            pageHeader,
            navMenu
        }
    })
    export default class appMain extends Vue{  
		requireOA:any= null; 
		@State isShowLoad: number;
		@State isShow :boolean;
		@Getter GET_isShowLoad: boolean;
		@State process :number;
		@Mutation('SET_isShow') SET_isShow: () => void;
        constructor(){
            super();           
		};
		toUpload() {
            window.sessionStorage.setItem('uploadWay', '1');
            this['$router'].push({path: '/fileArrange/newCloudManagement/cloudList/cloudList'});
        };
        created() {		     
			this.requireOA = this.$router.options.routes[0].meta.requireAuth;
			if(this.requireOA){
                 this.$router.push({
                     path:'/login/login'
                  });
			}
        };
        mounted(){

        };
        computed(){ 
			if(this.process>=100){
				this['$store'].commit('SET_isShow', false)
			}           
		};
    }
</script>

<style lang="scss" scoped>
	@import '../styles/index.scss';
</style>