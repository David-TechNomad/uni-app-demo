<template>
    <section>
        <el-dialog
            title="新增门类"
            :visible.sync="addClassVisible"
            class="myDialog" :close-on-click-modal="false" :append-to-body='true'>
              
               <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="pd10">
                        <el-form-item label="门类组名称：" prop="name" size="small">
                            <el-input v-model="ruleForm.name" placeholder="请输入" size="small"></el-input>
                        </el-form-item>                      
                        <el-form-item label="选择模板" prop="dict" size="small">
                           <el-select placeholder="选择模板" v-model="ruleForm.dict">
                                <el-option v-for="item in templateList"  :label="item.name" :value="item.id" :key="item.id"></el-option>                              
                           </el-select>
                        </el-form-item> 
                        <el-form-item label="备注：" prop="text" size="small"  v-model="ruleForm.text">
                           <el-input type="textarea" v-model="ruleForm.text"></el-input>
                        </el-form-item> 
                    </el-form>
            <span slot="footer" class="dialog-footer"> 
                  <el-button  class="defaultBtn" @click="issave('ruleForm')">确定</el-button>
                  <el-button  class="defaultBtn" @click="close('ruleForm')">取消</el-button>
          </span>
       </el-dialog>   
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'; 
    import Service from '../classManagement.service';    
    @Component
    export default class addClass extends Vue{
        bodyHeight: number = document.documentElement.clientHeight - 230 ; 
        addClassVisible: boolean = false ;
        ruleForm:any = {
                  id: '',
                  name: '',
                  dict: '',
                  text: ''                
        };  
        templateList:any=[];  
        rules:any = {
              name: [
                  { required: true, message: '请填写新分类的名称', trigger: 'blur' }                    
              ],
              dict: [
                  { required: true, message: '请填使用的模板', trigger: 'change' }
              ]
          };      
        constructor(){ 
            super();
            
        }; 
        close(formName){
            this.$refs[formName].resetFields();
            this.addClassVisible=false
        };
         getTemplateList(){             
            Service.templateList({}).then(res=>{
                if(res.data.succeeded){
                    this.templateList = res.data.data;
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            })
        };
        issave(formName){
           this.$refs[formName].validate((valid) => {
                if (valid) {   
                    if (this.ruleForm.id=="") {
                        this.saveClass(formName)
                    }else{
                        this.eidtClass(formName)
                    }
                }
           }) 
        };
         saveClass(formName){          
                    let val={
                        name:this.ruleForm.name
                        templateId:this.ruleForm.dict
                        comments:this.ruleForm.text
                        }   
                    Service.ArckindCreate(val).then(res=>{
                        if(res.data.succeeded){
                            this.$parent.getOneTree()
                            this['$message']({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.$refs[formName].resetFields();
                            this.addClassVisible=false
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    })
          
        };
         eidtClass(formName){          
                    let val={
                        id:this.ruleForm.id
                        name:this.ruleForm.name
                        templateId:this.ruleForm.dict
                        comments:this.ruleForm.text
                        }   
                    Service.arckindmodify(val).then(res=>{
                        if(res.data.succeeded){
                            this.$parent.getOneTree()
                            this['$message']({
                                message: '编辑成功',
                                type: 'success'
                            });
                             this.$refs[formName].resetFields();
                            this.addClassVisible=false
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    })
          
        };
        
        created(){          
            this.getTemplateList()
                          
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