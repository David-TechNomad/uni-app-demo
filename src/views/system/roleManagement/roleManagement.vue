<template>
     <section class="wrapprSection">
        <div class="mainTitle">
           <span>角色管理</span>
        </div>
       <div class="contentbox boxshow">
            <div class="searchCon">
                        <div class="roleTitle textBlue">
                            <h4 class="lt">角色列表</h4>
                            <div class="rt">
                                 <el-button class="defaultBtn"  @click="AddRole()">添加</el-button>
                                 <el-button class="defaultBtn"  @click="ChangeRole()">编辑</el-button> 
                                 <el-button class="defaultBtn"  @click="delRole()">删除</el-button>                                                           
                            </div> 
                        </div>
                       <el-alert title="在表格中点击可选中角色"  type="error" :closable="false" style="margin-bottom:-10px" class="mt10"> </el-alert>
                       <el-table 
                           element-loading-text="努力加载中..."
                            :height="bodyHeight"
                            header-row-class-name="tableHeader" 
                            stripe 
                            border
                            class="defaultTable" 
                            :data="roleData"
                            highlight-current-row  
                            @current-change="handleCurrentChange">
                            <el-table-column  type="index" label="序号" width="90px">
                            </el-table-column>
                            <el-table-column  prop="roleName" label="角色">
                            </el-table-column>
                            <el-table-column prop="displayText" label="查看范围">                       
                            </el-table-column>
                            <el-table-column prop="description" label="备注">                       
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div> 
         <div class="treeOne tree ">
            <div class="treeTitle boxshow textBlue">              
                 权限列表    
                 <el-button  class="defaultBtn rt" @click="resetChecked" >清空</el-button>
                 <el-button  class="defaultBtn rt" @click="getCheckedKeys" :disabled="currentRow&&currentRow.roleType==1">保存</el-button>            
            </div>           
            <div class="treeCon boxshow">
                    <el-tree :data="pageData" 
                    show-checkbox
                    default-expand-all
                    node-key="functionCode"
                    ref="tree"
                    highlight-current
                    :props="defaultProps">
                </el-tree> 
            </div>
        </div> 
       <el-dialog
            :title="addTitle"
            :visible.sync="addVisible"
            class="myDialogCenter">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="wtfrom">
                        <el-form-item label="角色名称：" prop="name" >
                            <el-input v-model="ruleForm.name" placeholder="请输入" size="small"></el-input>
                        </el-form-item> 
                        <el-form-item label="范围：" prop="region"  class="mt10">
                            <el-select v-model="ruleForm.region" placeholder="请选择"  size="small">
                                <el-option v-for="itme in distData" :label="itme.displayText" :value="itme.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注：" prop="bz" class="mt10">
                            <el-input type="textarea" v-model="ruleForm.bz"  size="small"></el-input>
                        </el-form-item>
                        </el-form>

            <span slot="footer" class="dialog-footer">
                 <el-button  class="defaultBtn" @click="setsaveRole('ruleForm')">确定</el-button>                
                 <el-button  class="defaultBtn" @click="addVisible=false">取消</el-button>
          </span>
       </el-dialog>
        
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './roleManagement.service';    
    @Component
    export default class approleManagement extends Vue{  
         windowHeight: number;
        bodyHeight: number; 
        addVisible : boolean;
        addTitle:string = '';   
        roleData: any = [];
        pageData: any = [];
        distData: any = [];  
        ruleForm: any = [];
        defaultProps: any = {};
        currentRow: any = {};
        constructor(){
            super();         
            this.roleData = [];
            this.pageData= [];
            this.formInline = {
                functionCode:'',
                type:[],
            };
            this.addVisible= false;           
            this.ruleForm= {
                id:'';
                name: '',
                region: '0', 
                roleType: 0,
                bz: ''
            };
            this.currentRow={};
            this.distData=[];
            this.rules= {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }                    
                ],
                region: [
                    { required: true, message: '请选择范围', trigger: 'change' }
                ]
            };
            this.pageData=[];
            this.defaultProps= {
                children: 'pageList',
                label: 'name'
            };
           this.windowHeight = document.documentElement.clientHeight;
           this.bodyHeight = document.documentElement.clientHeight - 280 ; 
        }
        handleCurrentChange(val) {           
            this.currentRow = val;
            this.getPermissions(val.id)
        }
        getCellClass(data){
           if(data.columnIndex==0)
           return 'gtd'
        };
        //新增角色
        AddRole(){          
            this.addVisible = true;
            this.addTitle = "新增角色";
            this.ruleForm= {
                id:'',
                name: '',
                region: '0', 
                roleType: 0,
                bz: ''
            };
            this.$nextTick(()=>{
                if(this.$refs.ruleForm.resetFields){
                        this.$refs.ruleForm.resetFields()  
                }
            })
                  
        }
        
        ChangeRole(){            
            if(this.currentRow.id != undefined){
                this.addVisible = true; 
                this.$nextTick(()=>{
                    this.$refs.ruleForm.resetFields() ;
                    this.addTitle = "编辑角色";          
                    this.ruleForm={
                        id:this.currentRow.id,
                        name:this.currentRow.roleName,
                        region:this.currentRow.scope.toString(),
                        bz:this.currentRow.description
                    }  
                });  
            }else{
                this['$message']({
                    message: '请选择您要编辑的角色',
                    type: 'warning'
                });
            }
        };
        getPermissions(id){           
            Service.getRoleFunction(id).then((res) =>{
              if(res.data.succeeded){ 
                  let setkey=[]
                  if(res.data.data.length!=0){
                        for(let i in res.data.data){
                             setkey.push(res.data.data[i].functionCode)
                        }
                  }
                 this.$refs.tree.setCheckedKeys(setkey);
              }else{
                  this['$message']({
                            message: '获取角色权限失败',
                            type: 'error'
                        });
              }
            });
        }
        getPageData(){
            Service.getPageList({}).then((res) =>{//获取菜单页面权限
                if(res.data.succeeded){ 
                     this.pageData = res.data.data;
                     console.info(this.pageData)  
                }else{
                  this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                 }             
            });
        }
        getFiles(){
            Service.getRoleList({}).then((res) =>{//角色列表
               if(res.data.succeeded){ 
                this.roleData = res.data.data;
                }else{
                  this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                 }
            });
            
        }
        delRole(){           
            if(this.currentRow.id){
                this['$confirm']('您是否要删除选中的数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
				}).then(() => {
                    Service.delRole(this.currentRow.id).then((res) =>{
                        if(res.data.succeeded){ 
                            this['$message']({
                                message: '角色删除成功',
                                type: 'success'
                            });   
                            this.getFiles();
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    });
                }).catch(() => {

				});
            }else{
                this['$message']({
                        message: '请选择您要删除的角色',
                        type: 'warning'
                    });
                
            }
                      
        }
        getdict(){
            Service.getdictList(87).then((res) =>{
              if(res.data.succeeded){ 
                this.distData = res.data.data;
              }else{
                  this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
              }
            });
            
        }
        setsaveRole(formName){    
            this.$refs[formName].validate((valid) => {               
            if (valid) {        
                let parmes={
                    id:this.ruleForm.id,
                    roleName:this.ruleForm.name,
                    scope:this.ruleForm.region,
                    description:this.ruleForm.bz,
                    roleType: 0,
                }
                Service.saveRole(parmes).then((res) =>{
                    if(res.data.succeeded){ 
                         this['$message']({
                                message: res.data.data,
                                type: 'success'
                         });     
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                    this.addVisible = false;
                    this.getFiles();
                });
            }
            })
        };          
        getCheckedKeys() {
            if(this.$refs.tree.getCheckedKeys().length!=0){
                let checkedKeys = this.$refs.tree.getCheckedKeys()
                let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()              
                let keys=[...checkedKeys,...halfCheckedKeys];
                if(this.currentRow.id != undefined){
                    let parmes={
                        roleId: this.currentRow.id,
                        functionCodes: keys
                    }
                    Service.savePermiss(parmes).then((res) =>{
                        if(res.data.succeeded){ 
                            this.getFiles();
                            this['$message']({
                                message: '权限保存成功',
                                type: 'success'
                            }); 
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    });
                }else{
                    this['$message']({
                            message: '请选择角色',
                            type: 'warning'
                        });
                    
                }   
            }else{
                this['$message']({
                    message: '请选择权限',
                    type: 'warning'
                });
            }         
        }
       resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
       }
        
        mounted(){
             window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                })()
            }; 
            this.getFiles();
            this.getPageData();
            this.getdict();
        };
    };
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/roleManagement/roleManagement.scss';
</style>