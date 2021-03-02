<template>
	<div >
		<el-dialog title="选择人员"
            :visible.sync="tsVisible"  class="windowDialog " :close-on-click-modal='false' :show-close="true"  >
            <el-form :rules="selectrules" ref="selectForm" label-width="100px" class="wtfrom" :inline="true">
                <el-form-item label="用户：" prop="user">   
                    <el-input v-model="selectUserName" placeholder="请输入"  size="small" clear></el-input>
                </el-form-item>  
                <el-form-item > 
                    <el-button  class="defaultBtn"  @click="getUserMsgList()" size="small" >检索</el-button>  
                </el-form-item>          
            </el-form>                                               
            <el-alert
                title="在表格中勾选用户" type="error" :closable="false">
            </el-alert>
            <el-table :data="userList" v-loading="listLoading"  
                :height="150" element-loading-text="努力加载中..." ref="multipleTable"
                stripe class="borderTable indexTable containTable selectTable"  
                @select="handleCurrentChange" >
                <el-table-column type="selection" width="55" > </el-table-column>
                <el-table-column label="序号" prop="index" width="90"></el-table-column>
                <el-table-column label="用户" prop="fullName"></el-table-column>
                <el-table-column label="所属单位" prop="unitname"></el-table-column>
                <el-table-column  label="所属部门" prop="archiveAgentCode"></el-table-column>
            </el-table> 
            <span slot="footer" class="dialog-footer">   
                <el-button type="primary" @click="submit" class="defaultBtn" >确 定</el-button>   
                <el-button @click="handSelectedQX" class="defaultBtn">取 消</el-button>          
            </span>
       </el-dialog>
    </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './handleApplyDetail.service';
    // import InfiniteLoading from 'vue-infinite-loading';
     @Component({
        components: {
        //    InfiniteLoading
        },
    })
    export default class chooseUserDialog extends Vue{		
        tsVisible:boolean;
        userList:any=[];
        listLoading:boolean = false;
        currentRow:any=[];
        selectUserName: string = '';
        constructor(){ 
            super();
            this.tsVisible = false;
            this.selectrules= { };
        };
        @Watch('tsVisible')
        showSelectUser(){
            if (this.tsVisible) {
                this.currentRow = [];
                this.userList = [];
            }
        }
        handleCurrentChange(val){
            this.currentRow = val;
        };
        getUserMsgList(){
            if(!this.selectUserName){
                this['$message']({
                    message: '请输入用户名',
                    type: 'warning'
                });
                return;
            } 
            if(this.selectUserName == window.sessionStorage.username){
                this['$message']({
                    message: '加签不能选择自己！',
                    type: 'warning'
                });
                return;
            }

            this.userList = [];
            let params={
                name: this.selectUserName,
                page: 0,
                pageSize: 10
            }
            this.listLoading = true;
            Service.findSystemUserByFullName(params).then((res) =>{
                this.listLoading = false;  
                if(res.data.succeeded){  
                    this.userList= res.data.data.content;
                    debugger;
                    // this.$nextTick(()=>{
                        
                    // });          
                }else{            
                    this['$message']({
                        message: '获取列表失败',
                        type: 'error'
                    });
                }
            }); 
        };
        submit(){
            if(this.currentRow.length==0){
                 this['$message']({
                        message: '请选择用户',
                        type: 'warning'
                    });
            }else{       
                 this.$emit('handUserSelected', this.currentRow[0])
                 this.tsVisible = false;
                 this.currentRow = [];
                 this.$refs['selectForm'].resetFields();
            } 
        }; 
        handSelectedQX(){
            this.tsVisible = false;
            this.currentRow = [];
            this.$refs.multipleTable.clearSelection();
        };
        created(){            
        };    
        mounted(){ 
        };
      }
    
    
    
 </script>