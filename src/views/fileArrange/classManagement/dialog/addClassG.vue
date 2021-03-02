
<template>
    <section>
        <el-dialog
            title="新增门类组"
            :visible.sync="addClassGVisible"
            class="myDialog" :close-on-click-modal="false" :append-to-body='true'>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="pd10">
                        <el-form-item label="门类组名称：" prop="name" size="small">
                            <el-input v-model="ruleForm.name" placeholder="请输入" size="small"></el-input>
                        </el-form-item>                      
                        <el-form-item label="备注：" prop="text" size="small">
                           <el-input type="textarea" v-model="ruleForm.text"></el-input>
                        </el-form-item> 
                    </el-form>
            <span slot="footer" class="dialog-footer"> 
                 <el-button  class="defaultBtn" @click="saveGroup('ruleForm')">确定</el-button>
                 <el-button  class="defaultBtn" @click="addClassGVisible=false">取消</el-button>
          </span>
       </el-dialog>   
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from '../classManagement.service';  
    @Component
    export default class addClassG extends Vue{
        bodyHeight: number = document.documentElement.clientHeight - 230 ; 
        addClassGVisible: boolean = false ;
        ruleForm:any = {
                  id: '',
                  name: '',                 
                  text: '',                   
        };      
        rules:any = {
              name: [
                  { required: true, message: '请填写新增分类组的名称', trigger: 'blur' }                    
              ]
             
          };      
        constructor(){ 
            super();
            
        }; 
         saveGroup(formName){            
           this.$refs[formName].validate((valid) => {
                    if (valid) {          
                        let val={
                                    name:this.ruleForm.name
                                    comment:this.ruleForm.text
                              }             
                            Service.ArckindSave(val).then(res=>{
                                if(res.data.succeeded){
                                    this.$parent.getOneTree()
                                    this['$message']({
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    this.addClassGVisible=false
                                }else{
                                    this['$message']({
                                        message: res.data.errorMessage,
                                        type: 'error'
                                    });
                                }
                            })
                        }
           })
        };
        created(){          
           
                          
        };
         mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 163 - this.$refs.searchFromRef.$el.clientHeight;
                })()
            };   
        };
    }
</script>

<style lang="scss" scoped>  
</style>