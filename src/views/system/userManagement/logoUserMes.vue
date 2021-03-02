<template>
    <section  class="wrapprSection">
         <div class="mainTitle">
           <span>个人信息</span>
        </div>
        <div class="contentbox contentbox-full"> 
             <div class="searchCon">              
                <el-tabs v-model="activeName" type="card" class="erpTab" >                           
                    <el-tab-pane label="用户信息" name="1">
                        <div v-if="userType === 'System'">
                            <el-form  :model="form" ref="form" label-width="180px" class="mt20"  style="max-width:600px">
                                <el-form-item label="用户名：" class="mt10" prop="loginName" 
                                    :rules="[{ required: true, message: '用户名不能为空', trigger: 'change' }]">
                                    <el-input v-model="form.loginName"></el-input>
                                </el-form-item>
                                    <el-form-item label="所属档案馆："  class="mt10">
                                    {{form.archiveAgentName}}
                                </el-form-item>
                                    <el-form-item label="职务："  class="mt10">
                                    {{form.business}}
                                </el-form-item>
                                    <el-form-item label="姓名："  class="mt10" prop="fullName"
                                    :rules="[{ required: true, message: '姓名不能为空', trigger: 'change' },
                                    { validator: fullName, trigger: 'blur' }]">
                                    <el-input v-model="form.fullName"></el-input>
                                    </el-form-item>
                                <el-form-item label="性别："  class="mt10"  prop="sex" :rules="[
                                    {required: true, message: '请至少选择性别', trigger: 'change' }]">
                                    <el-radio-group v-model="form.sex+''">
                                        <el-radio label="0">男</el-radio>
                                        <el-radio label="1">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="出生年月日："  class="mt10" prop="birthday">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                                    
                                </el-form-item>
                                    <el-form-item label="固定电话：" class="mt10"  prop="fixedTelephone"
                                    :rules="[{ required: true, message: '请填写活动形式', trigger: 'blur' },
                                        { validator: fixedTelephone, trigger: 'blur' }]">
                                    <el-input v-model="form.fixedTelephone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机："  class="mt10" prop="telephone"  
                                    :rules=" [ { required: true, message: '请填写活动形式', trigger: 'blur' },
                                            { validator: telephone, trigger: 'blur' } ]">
                                    <el-input v-model="form.telephone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="通讯地址："  class="mt10" prop="name">
                                    <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱："  class="mt10" prop="email"
                                    :rules="[ { required: true, message: '请输入邮箱', trigger: 'change' },
                                        { validator: email, trigger: 'blur' } ]">
                                    <el-input v-model="form.email"></el-input>
                                    </el-form-item>
                                <el-form-item  class="mt10">
                                    <el-button class="defaultBtn" @click="saveForm()">保存</el-button>
                                    <el-button class="defaultBtn" @click="resetForm()">重置</el-button>                                        
                                </el-form-item>
                            </el-form>  
                        </div>
                        <div v-else-if="userType === 'Public'">
                            <!--公众用户信息-->
		                    <userInformationView ref="userInformationView" :Gfilters="Gfilters" :publicUserType="publicUserType"></userInformationView>
                            <div class="ta-c mt20">
                                <el-button class="defaultBtn" @click="submitForm2('ruleForm1')">保存</el-button>
                                <el-button class="defaultBtn" @click="restForm2">重置</el-button>
                            </div>
                        </div>
                    </el-tab-pane>                   
                </el-tabs> 
                </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './logoUserMes.service'; 
    import { Loading } from 'element-ui'; 
    import userInformationView from '../../common/userInformationView/userInformationView.vue'; 
    @Component({
        components: { 
            userInformationView,
        }
    })
    export default class logoUserMes extends Vue{
        activeName: string = '1'; 
        userType: string;
        Gfilters: any ={};
        loadingInstance:any={};
        imageUrl: string ='';
        rules: any = {};
        publicUserType: string;
        form: any ={
            archiveAgentName: "",
            birthday: "",
            business: null,
            email: "",
            fixedTelephone: "",
            fullName: "",
            loginName: "",
            mailingAddress: "",
            sex: 0,
            telephone: null
        };
        constructor(){
            super();
            this.userType =  window.sessionStorage.getItem('userType');
            this.loadingInstance = null;
            this.publicUserType = 'editPublicUser';
            this.Gfilters = {
                fullName: '',
                consultantCount: '',
                sex:'',
                Integer:'',
                consultantType:'',
                birthday:'',
                nationality:'',
                hasAttatched:'',
                credentialsType:'',
                credentialsNumber:'',
                company:'',
                email:'',
                address:'',
                password:'',
                mailingAddress:'',
                photo:'',
                purpose:'',
                receptionist:'',
                reviewer:'',
                telephone:'',
                userNo:'',
                fixedTelephone:'',
                archivesAgentCode:'',
                zipCode:'',
            };
        }; 
        //成功
        Suces(message){
            this['$message']({
                type: 'success',
                message
            })
        };
        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };
        submitForm2(fileForm1) {//修改表单保存
            this.$refs['userInformationView'].$refs[fileForm1].validate((valid)=>{
                if (valid) {
                    this.Gfilters.userId = parseInt(window.sessionStorage.getItem('userId'));
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.updatePublicUser(this.Gfilters).then((res) =>{
                        console.log(res);
                        if(res.status === 200) {
                            this.Suces('保存成功!');
                        } else {
                            this.Warn('保存失败!');
                        }
                        this.$nextTick(() => { loadingInstance.close();});
                    })
                } else {
                    return false;
                }
            });
        };
        resetForm() {
            this.getList();
        };
        restForm2() {
            this.findPublicUserById();
        };
        saveForm(){
             let self = this;
                this.$refs['form'].validate((valid)=>{
                        if (valid) {                            
                            Service.updateUser(this.form).then((res) =>{
                                if(res.data.succeeded){  
                                          this['$message']({
                                                message: '保存成功',
                                                type: 'success'
                                            });
                                    }else{
                                          this['$message']({
                                                message: '保存失败',
                                                type: 'error'
                                            });
                                    }
                                });
                            
                        } else {
                            return false;
                        }
               });                        
             
        };
        getList(){           
          let  parmes = {
                    "userId":parseInt(window.sessionStorage.getItem('userId')),
                }               
             Service.findUser(parmes).then((res) =>{
               if(res.data.succeeded){                      
                  this.form = res.data.data;
                }else{
                  this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                 }
            });
        };
        findPublicUserById(){           
          let parmes = {
                    "userId":parseInt(window.sessionStorage.getItem('userId')),
                }               
             Service.findPublicUserById(parmes).then((res) =>{
               if(res.data.succeeded){                      
                  for(let item in res.data.data) {
                    if(res.data.data.photo) {
                        if(res.data.data.photo.indexOf('data:image/jpeg;base64') !== -1) {
                            this.Gfilters.photo = res.data.data.photo;
                        } else {
                            this.Gfilters.photo = 'data:image/jpeg;base64,' + res.data.data.photo;
                        }
                    }
                    // this.publicUserId = res.data.data[0].userId
                    for(let itme2 in this.Gfilters) {
                        if(res.data.data[item] !==null && item === itme2) {
                            this.Gfilters[itme2] = '' + res.data.data[item];

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
        // 把图片转为base64
        getBase64(file) {
            return new Promise(function(resolve, reject) {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function() {
                    imgResult = reader.result;
                };
                reader.onerror = function(error) {
                    reject(error);
                };
                reader.onloadend = function() {
                    resolve(imgResult);
                };
            });
        }
        
        beforeAvatarUpload(file) {
          // ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
            const isImage= file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isImage) {
            this.$message.error('上传头像只能是 图片 格式!');
            return false;
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            return false;
            }
            return isImage && isLt2M;
            
        }
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        };
        // 获取上传的文件
        getFile(file, fileList) {
            let self = this;
            this.getBase64(file.raw).then(res => {
                console.log(res)
                self.imageUrl = res;
                self.Gfilters.photo = res;
            });
        }
        mounted(){
            if(this.userType === 'System') {
                this.getList();
            } else if(this.userType === 'Public') {
                this.findPublicUserById();
            }
              
              window.onresize = () => {
                  return (() => {
                      this.bodyHeight = document.documentElement.clientHeight-260;
                  })()
              };
        };

    };
</script>

<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';
</style>