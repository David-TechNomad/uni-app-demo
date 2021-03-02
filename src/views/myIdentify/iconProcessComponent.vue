<template>
	<div class="SPsteps">
		<div class="el-steps el-steps--horizontal" style="overflow-x: auto;">
			<div class="el-step is-horizontal" style="flex-basis: 260px; margin-right: 0px;">
				<div class="el-step__head is-success">
					<div class="el-step__line" style="margin-right: 0px;">
						<i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; width: 0%;"></i>
					</div>
					<div class="el-step__icon is-text">申请</div>
				</div>
				<div class="el-step__main">
					<div class="el-step__title is-success">申请人：<span v-if="applyFullName">{{applyFullName}}</span></div>
					<div class="el-step__description is-success">部门：<span v-if="applyDeptName">{{applyDeptName}}</span></div>
				</div>
			</div>
			<div class="el-step is-horizontal" style="flex-basis: 260px; margin-right: 0px;" v-for="itme in processList">
				<div v-if="itme.isAudit==3">
					<div class="el-step__head is-success">
						<div class="el-step__line" style="margin-right: 0px;">
							<i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; width: 0%;"></i>
						</div>
						<div class="el-step__icon is-text">已鉴定</div>
					</div>
					<div class="el-step__main" >
						<div class="el-step__title is-success">鉴定人：<span v-if="itme.auditUserName!=null">{{itme.auditUserName}}</span></div>
						<div class="el-step__description is-success" style="padding-top: 5px;">部门：<span v-if="itme.user">{{itme.user.department}}</span></div>
					</div>
				</div>
				<div v-if="itme.isAudit==2">
					<div class="el-step__head is-finish ">
						<div class="el-step__line" style="margin-right: 0px;">
							<i class="el-step__line-inner" style="transition-delay: -300ms; border-width: 0px; width: 0%;"></i>
						</div>
						<div class="el-step__icon is-text">
							待鉴定
						</div>
					</div>
					<div class="el-step__main" style="padding-top: 10px;">
						<div class="el-step__description is-process ">鉴定人：<span v-if="itme.user"> {{itme.user.fullName}}</span></div>
						<div class="el-step__description is-success" style="padding-top: 5px;">部门：<span v-if="itme.user">{{itme.user.department}}</span></div>
					</div>
				</div>
				<div v-if="itme.isAudit==1">
					<div class="el-step__head is-wait">
						<div class="el-step__line">
							<i class="el-step__line-inner"></i>
						</div>
						<div class="el-step__icon is-text">
							未鉴定
						</div>
					</div>
					<div class="el-step__main" style="padding-top: 10px;">
						<div class="el-step__description is-wait">鉴定人：<span v-if="itme.user"> {{itme.user.fullName}}</span></div>
						<div class="el-step__description is-success" style="padding-top: 5px;">部门：<span v-if="itme.user">{{itme.user.department}}</span></div>
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
	@Component
	export default class iconProcessComponent extends Vue {
		dataCheck: any = [];
		applyFullName: string = ''; //申请人
		applyDeptName: string = ''; //申请人单位名称
		processList: any = [];
		// @Watch('applyFullName')
		// getF(){
		// 	debugger;
		// }

	}
</script>

<!-- <style lang="scss" scoped>
	@import '../../../styles/transferDetail/transferDetail';
</style> -->
