<template>
	<div>
		<el-dialog title="赋予角色" 
    :visible.sync="userPermissionsV" 
    class="myDialogCenter" 
    :close-on-click-modal="false" 
    :show-close="true" width="80%"
    @close="closeclear">
        <el-table
                        :data="tableData"
                        border
                        :height="400"
                        element-loading-text="努力加载中..."
                        header-row-class-name="tableHeader" 
                        stripe 
                        class="defaultTable"
                        @selection-change="handleSelectionChange"                       
                        ref="multipleTable">
                        <el-table-column type="selection"  width="55">
                        </el-table-column>                                        
                        <el-table-column prop="roleName" label="角色名称" align="left">
                        </el-table-column>
                        <el-table-column prop="displayText" label="查看范围" align="left">
                        </el-table-column>                     
                        <el-table-column prop="description" label="说明" align="left">
                        </el-table-column>
                    </el-table>  
			<div slot="footer" class="dialog-footer">
				<el-button class="defaultBtn" @click="save">保存</el-button>
				<el-button class="defaultBtn" @click="userPermissionsV=false; ">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './sysuser.service';
   

    @Component({
		components: {
		}
	})
    export default class userpermis extends Vue{
        userPermissionsV: boolean = false;       
        tableData:any = [];
        multipleSelection:string='';
        userId:string=''
        // 加载表格
        getTable(){
           Service.getsysRoleList({}).then((res) =>{
               if(res.data.succeeded){ 
                 this.tableData = [];
                 let tableData= res.data.data
                 if(tableData.length>0){
                         for( let key in tableData){
                              if(tableData[key].roleName!='系统管理员' && tableData[key].roleName!='安全管理员' && tableData[key].roleName!='安全审计员' ){
                                      this.tableData.push(tableData[key])
                              }
                         }
                 }
                }else{
                  this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                 }
            });
        };
        getActiveRole(userId){           
           Service.getRoleById(userId).then((res) =>{
               if(res.data.succeeded){        
                  let rows = res.data.data                
                   rows.forEach(row => {
                     for (let val in this.tableData){
                            if(this.tableData[val].id === row.id){
                              this.$refs.multipleTable.toggleRowSelection(this.tableData[val]);
                            }
                     }                      
                   });
                }else{
                  this['$message']({
                            message: '获取已选角色失败',
                            type: 'error'
                        });
                 }
            });
        };
        handleSelectionChange(val) {
            this.multipleSelection = '';     
            for(let item of val) {
              if(this.multipleSelection==''){
                 this.multipleSelection=item.id+''
              }else{
                 this.multipleSelection=this.multipleSelection + ',' + item.id
              }               
            }
        }
        save(){
          let val={
                userId:this.userId,
                roleIds:this.multipleSelection
          }
          Service.updateUserRole(val).then((res) =>{
               if(res.data.succeeded){                
                 this['$message']({
                            message: '保存成功',
                            type: 'success'
                  }); 
                  this.$parent.getUserList();
                  this.userPermissionsV=false;                  
                }else{
                  this['$message']({
                            message: '保存失败',
                            type: 'error'
                        });
                 }
            });
        
        }
        closeclear(){
           this.$refs.multipleTable.clearSelection();
        }
        mounted(){
           this.getTable();
            
        };
}
</script>
<style>

</style>