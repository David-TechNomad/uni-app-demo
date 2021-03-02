<template>
<div>
    <div class="userInformationView mt20">
        <div class="InformationOne InformationItem">
            <el-form :model="Gfilters" :rules="rules" label-width="125px" ref="ruleForm1">
                <table class="el-table defaultTable">
                    <tbody  class="el-table__body">
                        <tr class="el-table__row"> 
                            <td colspan="2" >                
                                <el-form-item label="证件类型：">
                                        <el-select v-model="Gfilters.credentialsType" style="width:100%" placeholder="请选择任务状态" size="small">
                                            <el-option label="身份证" value="1"></el-option>
                                            <el-option label="护照" value="2"></el-option>
                                            <el-option label="军官证" value="3"></el-option>
                                            <el-option label="其他" value="4"></el-option>
                                        </el-select>
                                </el-form-item>
                            </td>
                            <td colspan="2">                 
                                <el-form-item label="证件号码：" prop="credentialsNumber" :rules="[{ validator: credentialsNumber, trigger: 'blur' }]">
                                        <el-input placeholder="单行输入" v-model="Gfilters.credentialsNumber" size="small"></el-input>
                                </el-form-item>
                            </td> 
                            <td colspan="1" class="text-left" v-if="publicUserType !== 'editPublicUser'">                 
                                <el-form-item class="BtnGroup">
                                    <el-button class="defaultBtn" @click="searchUser2()">检索</el-button>
                                    <!-- <el-button class="defaultBtn" >读卡</el-button> -->
                                </el-form-item>
                            </td>               
                        </tr> 
                    </tbody>
                </table>

                <table class="el-table defaultTable mt20">
                        <thead class="el-table__header">
                            <tr class="tableHeader">               
                                <th colspan="6">
                                    <div class="text-left wp-100" style="height:25px;line-height:25px;">基本信息（必填）</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody  class="el-table__body">
                            <tr class="el-table__row"> 
                                    <!-- <td colspan="2" >
                                        <div class=" ">
                                        <el-form-item label="用户注册编号：" prop="userNo">
                                                <el-input placeholder="单行输入" v-model="Gfilters.userNo" size="small"></el-input>
                                            </el-form-item>
                                        </div>
                                    </td>     -->
                                    <td colspan="2">
                                        <div class=" ">
                                        <el-form-item label="姓名：" prop="fullName" :rules="[{ required: true, message: '请填写姓名', trigger: 'blur' },{ validator: fullName, trigger: 'blur' }]">
                                                <el-input placeholder="单行输入" v-model="Gfilters.fullName" size="small"></el-input>
                                            </el-form-item>
                                        </div>
                                    </td>  
                                    <td colspan="2" >
                                        <div class=" ">
                                            <el-form-item label="性别：" prop="sex">
                                                <el-select v-model="Gfilters.sex" placeholder="请选择任务状态" style="width:100%" size="small">
                                                    <el-option label="男" value="0"></el-option>
                                                    <el-option label="女" value="1"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                    </td>                
                            </tr>
                            <tr class="el-table__row"> 
                                       
                                <td colspan="2">
                                    <div class=" ">
                                    <el-form-item label="国家地区：" prop="nationality">
                                            <el-select v-model="Gfilters.nationality" placeholder="请选择任务状态" style="width:100%" size="small">
                                                <el-option label="内地公民" value="0"></el-option>
                                                <el-option label="台港澳同胞" value="1"></el-option>
                                                <el-option label="外国人" value="2"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </td> 
                                 <td colspan="2" >
                                        <div class=" ">
                                            <el-form-item label="查阅者人数：" prop="consultantCount" :rules="[{ required: true, message: '请填写查阅者人数', trigger: 'blur' },{ validator: consultantCountvalidator, trigger: 'blur' }]">
                                                <el-input placeholder="单行输入" v-model="Gfilters.consultantCount" size="small"></el-input>
                                            </el-form-item>
                                        </div>
                                    </td>                  
                            </tr>
                            <tr class="el-table__row"> 
                                     
                                <td colspan="2">
                                    <div class=" ">
                                    <el-form-item label="查阅者类型：" prop="consultantType">
                                                <el-select v-model="Gfilters.consultantType" placeholder="请选择任务状态" style="width:100%" size="small">
                                                    <el-option label="个人" value="0"></el-option>
                                                    <el-option label="单位" value="1"></el-option>
                                                </el-select>
                                        </el-form-item>
                                    </div>
                                </td>  
                                <td colspan="2">
                                    <div class=" ">
                                        <el-form-item label="接待馆及代码：" prop="archivesAgentCode">
                                            <el-input placeholder="单行输入" v-model="Gfilters.archivesAgentCode" size="small"></el-input>
                                        </el-form-item>
                                    </div>
                                </td>                
                            </tr>
                            <!-- <tr class="el-table__row">               
                                        
                            </tr> -->
                    </tbody>
                </table>
                <table class="el-table defaultTable mt20">
                        <thead class="el-table__header">
                            <tr class="tableHeader">               
                                <th colspan="6">
                                    <div class="text-left wp-100" style="height:25px;line-height:25px;">其他信息（非必填）</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody  class="el-table__body">
                            <tr class="el-table__row">
                                    <td colspan="2" >
                                        <div class=" ">
                                            <el-form-item label="出生日期：">
                                                <el-date-picker size="small" style="width:100%" type="date" v-model="Gfilters.birthday" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" ref="startDate" placeholder="年/月/日" class="checkName"></el-date-picker>
                                            </el-form-item>
                                        </div>
                                    </td>    
                                <td colspan="2">
                                    <div class=" ">
                                    <el-form-item label="查档目的：">
                                            <el-select v-model="Gfilters.purpose" placeholder="请选择任务状态" style="width:100%" size="small">
                                                <el-option label="补办证件" value="0"></el-option>
                                                <el-option label="申办户口" value="1"></el-option>
                                                <el-option label="办理退休" value="2"></el-option>
                                                <el-option label="公证" value="3"></el-option>
                                                <el-option label="购商品住房" value="4"></el-option>
                                                <el-option label="申请廉租房" value="5"></el-option>
                                                <el-option label="经适房" value="6"></el-option>
                                                <el-option label="资料查考" value="7"></el-option>
                                                <el-option label="出证" value="8"></el-option>
                                                <el-option label="编史修志" value="9"></el-option>
                                                <el-option label="研究" value="10"></el-option>
                                                <el-option label="其他" value="11"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </td>   
                                    <td colspan="2" rowspan="6">
                                    <div class=" ">
                                    <el-upload
                                            class="avatar-uploader"
                                            action="111"
                                            :show-file-list="false"
                                            :on-success="handleAvatarSuccess"
                                            :on-change="getFile"
                                            :before-upload="beforeAvatarUpload" v-model="Gfilters.photo">
                                            <img v-if="Gfilters.photo" :src="Gfilters.photo" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <p class="textCenter mt10">点击图片上传照片</p>
                                    </div>
                                </td>                     
                            </tr>
                            <tr class="el-table__row"> 
                                    <td colspan="4" >
                                        <div class=" ">
                                            <el-form-item label="工作单位：">
                                                    <el-input placeholder="单行输入" v-model="Gfilters.company" size="small"></el-input>
                                            </el-form-item>
                                        </div>
                                    </td>         
                            </tr>
                            <tr class="el-table__row"> 
                                    <td colspan="4" >
                                        <div class=" ">
                                            <el-form-item label="家庭地址：">
                                                    <el-input placeholder="单行输入" v-model="Gfilters.address" size="small"></el-input>
                                            </el-form-item>
                                        </div>
                                    </td>      
                            </tr>
                            <tr class="el-table__row">               
                                <td colspan="4">
                                    <div class=" ">
                                        <el-form-item label="通信地址：">
                                                <el-input placeholder="单行输入" v-model="Gfilters.mailingAddress" size="small"></el-input>
                                        </el-form-item>
                                    </div>
                                </td>         
                            </tr>
                            <tr class="el-table__row"> 
                                    <td colspan="2" >
                                        <div class=" ">
                                            <el-form-item label="手机：" prop="telephone" :rules="[{ validator: telephone, trigger: 'blur' }]">
                                                    <el-input placeholder="单行输入" v-model="Gfilters.telephone" size="small"></el-input>
                                            </el-form-item>
                                        </div>
                                    </td>    
                                <td colspan="2">
                                    <div class=" ">
                                    <el-form-item label="固定电话：" prop="fixedTelephone" :rules="[{ validator: fixedTelephone, trigger: 'blur' }]">
                                                <el-input placeholder="单行输入" v-model="Gfilters.fixedTelephone" size="small"></el-input>
                                        </el-form-item>
                                    </div>
                                </td>                 
                            </tr>
                            <tr class="el-table__row"> 
                                    <td colspan="2" >
                                        <div class=" ">
                                            <el-form-item label="电子邮件：" prop="email" :rules="[{ validator: email, trigger: 'blur' }]">
                                                    <el-input placeholder="单行输入" v-model="Gfilters.email" size="small"></el-input>
                                            </el-form-item>
                                        </div>
                                    </td>    
                                <td colspan="2">
                                    <div class=" ">
                                    <el-form-item label="邮政编码：" prop="zipCode" :rules="[{ validator: zipCode, trigger: 'blur' }]">
                                                <el-input placeholder="单行输入" v-model="Gfilters.zipCode" size="small"></el-input>
                                        </el-form-item>
                                    </div>
                                </td>        
                            </tr>
                    </tbody>
                </table>
            </el-form>
        </div>
    </div>
</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './userInformationView.service';
    import { Loading } from 'element-ui';
    @Component({})
    export default class userInformationView extends Vue{
        @Prop({}) 
        Gfilters: object;
        @Prop({}) 
        publicUserType: string;
        rules: any = {};
        loadingInstance:any={};
        publicUserId: string = '';
        serachInformation:any = {};
        constructor(){
            super();
            this.serachInformation = {
                userName:'',
                cardNo:''
            }
            this.loadingInstance = null;
            this.rules = {
                userNo: [
                    { required: true, message: '请填写用户注册编码', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                nationality: [
                    { required: true, message: '请选择国家地区', trigger: 'change' }
                ],
                consultantType: [
                    { required: true, message: '请填写查阅者类型', trigger: ['change'] }
                ],
                archivesAgentCode: [
                    { required: true, message: '请填写接待管及代码', trigger: ['blur'] }
                ]
            };
        };
        // 正整数验证
        consultantCountvalidator(rule,value,callback){
            var reg = new RegExp('^[0-9][0-9]*$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正整数'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        // 姓名验证
        fullName(rule,value,callback){
            var reg = new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的姓名'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
       //证件号码验证
        credentialsNumber(rule,value,callback){
            if(this.Gfilters.credentialsType === '1') {
                // 身份证校验
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(value){
                    var str = reg.test(value);
                    if(!str){
                        callback(new Error('请输入正确的身份证号码'))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }
            if(this.Gfilters.credentialsType === '2') {
                // 护照校验
                var reg = /^([a-zA-z]|[0-9]){5,17}$/;
                if(value){
                    var str = reg.test(value);
                    if(!str){
                        callback(new Error('请输入正确的护照号码'))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }
            if(this.Gfilters.credentialsType === '3') {
                // 军官证校验
                var reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
                if(value){
                    var str = reg.test(value);
                    if(!str){
                        callback(new Error('请输入正确的军官证号码'))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }
            
        }
        //手机号码验证
        telephone(rule,value,callback){
            var reg = new RegExp('^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的手机号码'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        //固定电话验证
        fixedTelephone(rule,value,callback){
            var reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的固定电话'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        //电子邮件验证
        email(rule,value,callback){
            var reg = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的固定电话'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        //邮政编码验证
        zipCode(rule,value,callback){
            var reg = new RegExp('^[0-9][0-9]{5}$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的固定电话'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
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
      searchUser2() {
            if(this.Gfilters.credentialsNumber === ''){
                this.Warn("请填写证件号码");
                return false;
            }
            if(this.Gfilters.credentialsType === '') {
                this.Warn("请选择证件类型");
                return false;
            }
            if(this.Gfilters.credentialsType === '1') {
                // 身份证校验
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                var str = reg.test(this.Gfilters.credentialsNumber);
                if(!str){
                    this.Warn("请输入正确的身份证号码");
                    return false;
                }
            }
            if(this.Gfilters.credentialsType === '2') {
                // 护照校验
                var reg = /^([a-zA-z]|[0-9]){5,17}$/;
                var str = reg.test(this.Gfilters.credentialsNumber);
                if(!str){
                    this.Warn("请输入正确的护照号码");
                    return false;
                }
            }
            if(this.Gfilters.credentialsType === '3') {
                // 军官证校验
                var reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
                var str = reg.test(this.Gfilters.credentialsNumber);
                if(!str){
                    this.Warn("请输入正确的军官证号码");
                    return false;
                }
            }
            this.searchUser();
      }
      //检索公众用户
      searchUser() {
            let self = this;
            let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在检索中，请稍等',
                    // spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            Service.findPublicUserByName({cardNo:this.Gfilters.credentialsNumber}).then((res) =>{
                if(res.data.succeeded && res.data.data.length !==0) {
                    for(let item in res.data.data[0]) {
                        if(res.data.data[0].photo) {
                            if(res.data.data[0].photo.indexOf('data:image/jpeg;base64') !== -1) {
                                this.Gfilters.photo = res.data.data[0].photo;
                            } else {
                                this.Gfilters.photo = 'data:image/jpeg;base64,' + res.data.data[0].photo;
                            }
                        }
                        this.publicUserId = res.data.data[0].userId
                        for(let itme2 in this.Gfilters) {
                            if(res.data.data[0][item] !==null && item === itme2) {
                                this.Gfilters[itme2] = '' + res.data.data[0][item];

                            }
                        }
                    }
                } else {
                    self.Warn('查询无结果，请先注册新用户!');
                    // for(let itme2 in this.Gfilters) {
                    //     this.Gfilters[itme2] = null;
                    // }
                    // this.imageUrl = '';
                }
                this.$nextTick(() => { loadingInstance.close();});
            })
        }
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
    // 获取上传的文件
    getFile(file, fileList) {
        let self = this;
      this.getBase64(file.raw).then(res => {
        console.log(res)
        self.Gfilters.photo = res;
      });
    }
    // 获取上传的文件
    getFile2(file, fileList) {
        console.log(file)
        console.log(fileList)
        // this.publicUserFileList.push(file.raw);
    }
      handleAvatarSuccess(res, file) {
        this.Gfilters.photo = URL.createObjectURL(file.raw);
      };
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
         back():void{
            this['$router'].go(-1);
        };
        created(){

        };
        mounted(){
              window.onresize = () => {
                  return (() => {
                    //   this.bodyHeight = document.documentElement.clientHeight-260;
                  })()
              };
        };

    };
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/userManagement/addUser.scss';
</style>
 