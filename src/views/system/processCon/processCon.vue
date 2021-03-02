<template>
	<section class="wrapprSection">
		<div class="mainTitle">
           <span>流程管理</span>
        </div>
		<div class="contentbox contentbox-full">
			<div class="left boxshow">
				<div class="left bottom">
					<el-table ref="processTypeDataTable" stripe tooltip-effect="dark" :data="processTypeData" highlight-current-row
					 	  @row-click="clickLeftTableRow" :show-header="false" class="defaultTable">
						<el-table-column :show-overflow-tooltip="true" prop="displayText" label="流程类型名称">
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class=" right boxshow">
				<div class="top">
					<span class="ml10">流程列表</span>
					<el-button  class="defaultBtn rt m10" @click="showAddProcess()" >新增流程</el-button>
				</div>
				<div class="right bottom ">
					<div  class=" m10">
						<el-table stripe  :height="bodyHeight" v-if="clickedLeftRow" :data="tableData" border
						 	highlight-current-row   class="defaultTable" v-loading="listLoading" header-row-class-name="tableHeader" >
							<el-table-column type="index" label="序号" width="50px">
							</el-table-column>
							<el-table-column label="操作" class="columnRight" width="150px">
								<template slot-scope="scope">
									<el-button class="tabletoolBtn" @click="showEditProcess(scope.row)">修改</el-button>
									<el-button class="tabletoolBtn" @click="deleteProcess(scope.row)">删除</el-button>
								</template>
							</el-table-column>
							<el-table-column prop="processName"  label="流程名称" width="180px">
							</el-table-column>
							<el-table-column prop="arcLevelDict.displayText" v-if="clickedLeftRow!=null && clickedLeftRow.code=='3'" label="鉴定类型" width="100px">
							</el-table-column>
							<el-table-column prop="archiveAgentName" label="所属档案馆" width="150px">
							</el-table-column>
							<el-table-column  prop="flow" label="流程">
								<template slot-scope="scope">
									<span v-if="scope.row.settings.length!=0">
										<span v-for="(setting,index) in scope.row.settings" :key="index">
											<span v-if="index+1!=scope.row.settings.length">
												{{setting.name}}—>
											</span>
											<span v-else>
												{{setting.name}}
											</span>
										</span>
									</span>
									<span v-else>暂无流程</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>
		<addEditProcessDialog ref="addEditProcessDialogRef" @refresh="clickLeftTableRow"></addEditProcessDialog>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Service from './processCon.service';
	import addEditProcessDialog from './addAndEditProcess.vue';
	import dictSelect from '@/views/common/dictEtc/dictSelect.vue';
	@Component({
		components:{
			addEditProcessDialog,
			dictSelect
		}
	})
	export default class appprocessCon extends Vue {
		tableData: any = null;
		listLoading: boolean = false;
		processTypeData: any = [];
		clickedLeftRow: any = null;
		bodyHeight: number = document.documentElement.clientHeight - 223;
		archiveAgentOption: any = {};
		
		getProcessTypeData() {
			let dictId = 230;
			Service.getProcessTypeData(dictId).then((res) => {
				this.processTypeData = res.data.data;
			});
		};

		clickLeftTableRow(row) {
			this.listLoading = true;
			this.clickedLeftRow = row;
			let params = {
				processType: row.code
			}
			Service.getProcessTypeByList(params).then((res) => {
				this.tableData = res.data.data;
				this.listLoading = false;
			});
		};
		//所属档案馆
		findAgenterCode() {
			Service.findAgenterCode({}).then((res) => {
				this.archiveAgentOption = res.data.data;
			});
		}
		showEditProcess(row) {
			this.$refs.addEditProcessDialogRef.processVisible = true;
			this.$refs.addEditProcessDialogRef.processTitle = '修改流程配置';
			this.$refs.addEditProcessDialogRef.clickedLeftRow = this.clickedLeftRow;
			this.$refs.addEditProcessDialogRef.typeFlag = 0;
			this.$refs.addEditProcessDialogRef.editRow = row;
		};
		showAddProcess() {
			if (this.clickedLeftRow == null) {
				this['$message']({
					message: '请先选择流程类型',
					type: 'warning'
				});
				return;
			}
			this.$refs.addEditProcessDialogRef.processVisible = true;
			this.$refs.addEditProcessDialogRef.processTitle = '新增流程配置';
			this.$refs.addEditProcessDialogRef.clickedLeftRow = this.clickedLeftRow;
			this.$refs.addEditProcessDialogRef.typeFlag = 1;
		};

		deleteProcess(row) {
			this['$confirm']('您确认删除此流程吗？', {
				type: 'warning'
			}).then(() => {
				Service.deleteProcess({
					'processId': row.id
				}).then((res) => {
					if (res.data) {
						this['$message']({
							message: '删除成功',
							type: 'success'
						});
						this.clickLeftTableRow(this.clickedLeftRow);
					} else {
						this['$message']({
							message: '删除失败',
							type: 'error'
						});
					}
				})
			});
		};
		created() {
			this.getProcessTypeData();
			this.findAgenterCode();
		};

		mounted(): void {
			window.onresize = () => {
				return (() => {
					this.bodyHeight = document.documentElement.clientHeight - 223;
				})()
			};
		};
	}
</script>

<style lang="scss" scoped> 
	@import '../../../styles/processCon/processCon.scss';
</style>
