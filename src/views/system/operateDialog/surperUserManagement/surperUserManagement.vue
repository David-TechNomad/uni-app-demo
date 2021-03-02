<template>
	<div>
		<el-dialog title="超级用户" :visible.sync="showsurperUserManagementVisible" class="myDialogCenter" :close-on-click-modal="false" :show-close="true">
			<div class="systemManagement mt10">
                <div class="ManagementItem">
                    <div class="dialogMainTitleView">
                        <p class="">注意事项：</p>
                        <p class="">1，操作此功能前，请先保证已给该档案馆进行下级赋权。</p>
                        <p class="">2，该档案馆中的超级用户拥有下级赋权中选中的全部功能，如果不设置，将拥有本系统的最高功能权限。</p>
                    </div>
                    <div class="d-ib">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            <p>王小二</p>
                        </el-dialog>
                    </div>
                </div>
            </div>
			<div slot="footer" class="dialog-footer">
				<el-button class="defaultBtn" @click="saveYijuan">保存</el-button>
                <el-button class="defaultBtn" @click="showsurperUserManagementVisible=false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
   

    @Component({
		components: {
		}
	})
    export default class yijuanDialog extends Vue{
        showsurperUserManagementVisible: boolean = false;
        keyword1: string = '';
        dialogImageUrl: string = '';
        dialogVisible: boolean = false;
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
        handleRemove(file, fileList) {
        console.log(file, fileList);
      };
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        };
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
<style lang="scss" scoped>
   .ManagementItem{
       >div {
           padding: 10px;
       }
       .dialogMainTitleView{
            height: 110px;
            background-color: rgb(249, 249, 249);
            font-size: 14px;
            padding: 5px;
            border: 1px solid #f1f1f1;
            text-align: left;
            line-height: 26px;
       }
   }
       .dialogMainTitle{
        padding-left: 5px;
        background: #2b87c6; 
       color: #ffffff;
        font-weight: 600;
        font-size: 15px;
        height: 30px;
        line-height: 30px;
        text-align: left;
    }
   
</style>