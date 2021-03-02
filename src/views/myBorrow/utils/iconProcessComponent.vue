<template>
	<div class="SPsteps">
		<div class="el-steps el-steps--horizontal" style="overflow-x: auto;">
			<div class="el-step is-horizontal"  style="flex-basis: 250px; margin-right: 0px;">
				<div class="el-step__head is-success">
					<div class="el-step__line" style="margin-right: 0px;">
						<i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; width: 0%;"></i>
					</div>
					<div class="el-step__icon is-text">申请</div>
				</div>
				<div class="el-step__main">
					<div class="el-step__title is-success">申请人:<span v-if="applyFullName">{{applyFullName}}</span></div>
					<div class="el-step__description is-success"><span v-if="applyDeptName">{{applyDeptName}}</span></div>
				</div>
			</div>
			<div class="el-step is-horizontal" style="flex-basis: 250px; margin-right: 0px;" v-for="itme in processList" >
				<div v-if="itme.auditResult==1">
					<div class="el-step__head is-success">
						<div class="el-step__line" style="margin-right: 0px;">
							<i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; width: 0%;"></i>
						</div>
						<div class="el-step__icon is-text">同意</div>
					</div>
					<div class="el-step__main">
						<div class="el-step__title is-success">审批人:<span v-if="itme.auditUserName!=null">{{itme.auditUserName}}</span></div>
						<div class="el-step__description is-success"><span  >{{itme.roleName}}</span></div>
					</div>
				</div>
				<div v-if="itme.auditResult==2">
					<div class="el-step__head is-error">
						<div class="el-step__line" style="margin-right: 0px;">
							<i class="el-step__line-inner" style="transition-delay: -150ms; border-width: 0px; width: 0%;"></i>
						</div>
						<div class="el-step__icon is-text">
							驳回
						</div>
					</div>
					<div class="el-step__main">
						<div class="el-step__title is-error">审批人:<span v-if="itme.auditUserName!=null">{{itme.auditUserName}}</span></div>
						<div class="el-step__description is-error"><span >{{itme.roleName}}</span></div>
					</div>
				</div>
				<div  v-if="itme.auditResult==null">
					<div class="el-step__head is-finish ">
						<div class="el-step__line" style="margin-right: 0px;">
							<i class="el-step__line-inner" style="transition-delay: -300ms; border-width: 0px; width: 0%;"></i>
						</div>
						<div class="el-step__icon is-text">
							待审批
						</div>
					</div>
					<div class="el-step__main">
						<div class="el-step__title is-process ">审批人:<span v-if="itme.auditUserName!=null">{{itme.auditUserName}}</span></div>
						<div class="el-step__description is-process "><span v-if="itme.roleName">{{itme.roleName}}</span></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Prop,
		Vue,
		Watch
	} from 'vue-property-decorator';
	// import Component from 'vue-class-component';
	@Component
	export default class iconProcessComponent extends Vue {
		processList: any = [];
		applyFullName: string = '';//申请人
		applyDeptName: string = '';//申请人单位名称
		// @Watch('applyFullName')
		// getF(){
		// 	debugger;
		// }
	}
</script>

<!-- <style lang="scss" scoped>
	@import '../../../styles/transferDetail/transferDetail';
</style> -->