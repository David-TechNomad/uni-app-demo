<template>
	<div>
		<el-dialog title="移卷" :visible.sync="yijuanVisible" class="myDialog" :close-on-click-modal="false" :show-close="true">
			<el-form :inline="true">
				<el-form-item class="fondName" ref="fondName" label="">
					<el-input class="checkName" v-model="keyword1" placeholder="输入案卷名称进行过滤"  size="small"></el-input>
				</el-form-item>
			</el-form><!--v-loading="yijuanLoading"-->
			<el-table ref="tableRef" 
			:height="dialogTableHeight" 
			 element-loading-text="努力加载中..." 
			 :data="tableData.filter(data => !keyword1 || data.TM.toLowerCase().includes(keyword1.toLowerCase()))" 
			 @row-click="radioSelect" 
			 class="defaultTable "
			  header-row-class-name="tableHeader" >
				<el-table-column label='' width='50'>
					<template scope="scope">
						<el-radio class="radio" name="" v-model="currentRow" :label="scope.row">{{null}}</el-radio>
					</template>
				</el-table-column>
				<el-table-column label="案卷号" prop="AJH" width="80">
				</el-table-column>
				<el-table-column label="案卷名称" prop="TM">
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				
				<el-button class="defaultBtn" @click="yijuanVisible=false">关闭</el-button>
				<el-button class="defaultBtn" @click="saveYijuan">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from '@/views/fileArrange/fileManagement/fileManagement.service';
   

    @Component({
		components: {
		}
	})
    export default class yijuanDialog extends Vue{
        yijuanVisible: boolean = false;
        keyword1: string = '';
        currentRow:any = {};
        selection:any = [];
        tableData:any = [];
        yijuanLoading:boolean = false;
        tree:any = {};
		libId:number = 0;
		dialogTableHeight: number = document.documentElement.clientHeight-159;
        @Watch('yijuanVisible')
        showDialog () {
            if(this.yijuanVisible){
				this.currentRow = {};
            	this.keyword1 = '';
                this.getTable();
            }
        }
        radioSelect(row) {
            this.currentRow = row;
        }
        // 加载表格
        getTable(){
            this.yijuanLoading = true;  
            let params = {
					kindId: this.tree.kindId,
					phase: 4,
					conditionId: this.tree.conditionId,
					daqzh: this.tree.fondCode
			}
			Service.notModel(params).then(res => {
				if(res.data.succeeded) {
					// this.fileslibId = res.data.libId;
					this.tableData = res.data.data.data;
					this.$refs.tableRef.bodyWrapper.scrollTop = 0
				} else {
					this.getError(res.data.errorMessage)
				}
				this.yijuanLoading = false;
			})  
        }
        
		//批量修改保存替换
		saveYijuan(){
			if(!this.currentRow.hasOwnProperty("libId")) {
				this.Warn("请选择案卷");
				return false;
			}
			this.yijuanLoading = true;
   			let ids = [];
   			let anjuanIds = [];
   			for(let item of this.selection){
   				ids.push(item.id);
   				if(item.parentId!=null && item.parentId!=0){
   					if(anjuanIds.indexOf(item.parentId) == -1){
   						anjuanIds.push(item.parentId);
   					}
   				}
   			}
			var params = {
				ids: ids,
				anJuanLibId: this.currentRow.libId,
				libId: this.libId,
				anJuanId: this.currentRow.id,
				anjuanIds: anjuanIds,
			};
			
			Service.movePaper(params).then((res) => {
				if(res.data.succeeded) {
					
					this.Suces('移卷成功');
					this.yijuanVisible = false;
					this.$emit('refreshList');
					
				} else {
					this.getError('移卷失败');
				}
				this.yijuanLoading = false;
			})
		}
        //成功
        Suces(message) {
            this['$message']({
                type: 'success',
                message
            })
        };
        //请求失败
        getError(message) {
            this["$message"]({
                message,
                type: 'error'
            });
        };
        //警告信息
        Warn(message) {
            this['$message']({
                type: 'warning',
                message
            });
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.dialogTableHeight = document.documentElement.clientHeight-159;
                })()
            }; 
        };
}
</script>