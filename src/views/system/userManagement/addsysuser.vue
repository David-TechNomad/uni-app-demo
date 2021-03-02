<template>
	<div>
		<el-dialog :title="SysUserTitle" 
    :visible.sync="addSysUserV" 
    class="myDialogCenter" 
    :close-on-click-modal="false" 
    :show-close="true" width="80%" top="1%">
  <div class="addUserbody">
        <el-form :model="form" ref="form" label-width="110px" :rules="rules">
            <table class="el-table defaultTable">
                <thead class="el-table__header">
                  <tr class="tableHeader">               
                      <th colspan="4"  >
                        <div class="text-left wp-100" style="height:25px;line-height:25px;">基本信息内容(必填)</div>
                      </th>
                  </tr>
                  </thead>
                  <tbody  class="el-table__body">            
                        <tr class="el-table__row">               
                            <td colspan="2">
                              <div class=" ">
                                <el-form-item label="用户名：" prop="loginName" :rules="[{ required: true, message: '请填写用户名', trigger: 'blur' },{ validator: userName, trigger: 'blur' }]">
                                    <el-input size="small" v-model="form.loginName"></el-input>
                                </el-form-item>
                                </div>
                            </td> 
                             <td colspan="4">
                               <div class="textTips text-left">
                                  用户名由字母、数字组成
                               </div>
                            </td>                       
                        </tr>
                      <!--  <tr class="el-table__row" v-if="SysUserTitle=='编辑用户'"> 
                            <td colspan="2"  >
                              <div class=" ">
                                  <el-form-item label="原密码：" prop="oldpassword" :rules="[{ required: true, message: '原密码不能为空', trigger: 'blur' },{ validator: oldpasswordchck, trigger: 'blur' }]">
                                    <el-input  size="small" v-model="form.oldpassword" type="password"></el-input>
                                  </el-form-item>
                              </div>
                            </td>  
                            <td colspan="2">
                             
                            </td>               
                        </tr>-->
                        <tr class="el-table__row" v-if="SysUserTitle!='编辑用户'"> 
                            <td colspan="2"  >
                              <div class=" ">
                                  <el-form-item label="密码：" prop="password" :rules="[{ required: true, message: '请填写密码', trigger: 'blur' },
                                  {pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码至少包含 数字和英文，长度6-20'}]">
                                    <el-input  size="small" v-model="form.password" type="password"></el-input>
                                  </el-form-item>
                              </div>
                            </td>  
                            <td colspan="2">
                               <div class="textTips text-left">
                                 密码至少包含 数字和英文，长度6-20
                                </div>
                            </td>               
                        </tr>
                        <tr class="el-table__row" v-if="SysUserTitle!='编辑用户'"> 
                            <td colspan="2" >
                              <div class=" ">
                                <el-form-item label="确认密码：" prop="rePassword" :rules="[{ required: true, message: '请填写确认密码', trigger: 'blur' },{ validator: passwordchck, trigger: 'blur' }]">
                                    <el-input  size="small" v-model="form.rePassword" type="password"></el-input>
                                </el-form-item>
                              </div>
                            </td>
                              <td colspan="2">
                              <div class="textTips text-left">
                                再次输入密码
                                </div>
                            </td> 
                        </tr>
                        <tr class="el-table__row">               
                            <td colspan="2">
                              <div class="">
                                <el-form-item label="姓名：" prop="fullName" :rules="[{ required: true, message: '请填写姓名', trigger: 'blur' },{ validator: fullName, trigger: 'blur' }]">
                                    <el-input  size="small" v-model="form.fullName"></el-input>
                                </el-form-item>
                              </div>
                            </td>
                            <td colspan="2">
                              <div class="">
                                <el-form-item label="国家地区：" prop="nationality">
                                    <el-select v-model="form.nationality" placeholder="请选择国家地区" style="width:100%" size="small">
                                        <el-option label="内地公民" value="0"></el-option>
                                        <el-option label="台港澳同胞" value="1"></el-option>
                                        <el-option label="外国人" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                              </div>
                            </td>                           
                        </tr>
                        <tr class="el-table__row"> 
                            <td colspan="2" >
                                <el-form-item label="证件类型：" prop="credentialsType">
                                    <el-select v-model="form.credentialsType" placeholder="请选择证件类型" style="width:100%" size="small">
                                        <el-option label="身份证" value="1"></el-option>
                                        <el-option label="护照" value="2"></el-option>
                                        <el-option label="军官证" value="3"></el-option>
                                        <el-option label="其他" value="4"></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td colspan="2">
                              <el-form-item label="证件号码：" prop="credentialsNumber" :rules="[{ required: true, message: '请填写证件号码', trigger: 'blur' },{ validator: credentialsNumber, trigger: 'blur' }]">
                                    <el-input  size="small" v-model="form.credentialsNumber"></el-input>
                                </el-form-item>
                            </td>               
                        </tr>
                        <tr class="el-table__row"> 
                            <td colspan="2" >
                                <el-form-item label="所属档案馆：" prop="archiveAgentCodeName" ref="archiveAgentCode">
                                     <el-input v-if="isEditSysUser" readonly class="checkName percentName" size="small" v-model="archiveAgentCodeName"></el-input>
                                      <el-select v-else v-model="archiveAgentCodeName" size="small" placeholder="请选择所属档案馆" style="width:100%" ref="selectReport">
                                          <el-option style="overflow-y: auto;height: 220px;background-color:#fff" :label="archiveAgentName" :value="form.archiveAgentCode" :key="form.archiveAgentCode">
                                              <el-tree class="filter-tree"
                                                        default-expand-all
                                                        :data="treedata001"
                                                        node-key="id"
                                                        @node-click="handleNodeClick1"
                                                        :props="defaultProps"
                                                        ref="tree">
                                              </el-tree>
                                          </el-option>
                                      </el-select>
                                </el-form-item>
                            </td>
                            <td colspan="2">
                              <el-form-item label="查阅者类型：" prop="consultantType">
                                    <el-select v-model="form.consultantType" placeholder="请选择查阅者类型" style="width:100%" size="small">
                                        <el-option label="个人" value="0"></el-option>
                                        <el-option label="单位" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>               
                        </tr>
                        <tr class="el-table__row"> 
                            <td colspan="2" >
                                <el-form-item label="用户类型：" prop="userType">
                                    <el-select v-model="form.userType" placeholder="请选择用户类型" style="width:100%" size="small">
                                        <el-option label="局管用户" value="1"></el-option>
                                        <el-option label="单位用户" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td colspan="2">
                              <el-form-item label="用户状态：" prop="userState">
                                    <el-select v-model="form.userState" placeholder="请选择用户状态" style="width:100%" size="small">
                                        <el-option label="有效" value="0"></el-option>
                                        <el-option label="无效" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>               
                        </tr>
                        <tr class="el-table__row"> 
                            <td colspan="2" >                
                                <el-form-item label="部门：" prop="department" :rules="[{ required: true, message: '请填写部门', trigger: 'blur' }]">
                                    <el-input  size="small" v-model="form.department"></el-input>
                                </el-form-item>
                            </td>
                            <td colspan="2">                 
                                <el-form-item label="单位电话：" prop="fixedTelephone" :rules="[{ required: true, message: '请填写单位电话', trigger: 'blur' },{ validator: fixedTelephone, trigger: 'blur' }]">
                                    <el-input  size="small" v-model="form.fixedTelephone"></el-input>
                                </el-form-item>
                            </td>               
                        </tr>
                </tbody>
              </table>
              <table cellspacing="0" cellpadding="0" border="0" class="el-table defaultTable mt20">
                <thead class="el-table__header">
                  <tr class="tableHeader">               
                      <th colspan="6">
                        <div class="text-left wp-100" style="height:25px;line-height:25px;">其他信息(非必填)</div>
                      </th>
                  </tr>
                  </thead>
                  <tbody  class="el-table__body">
                  <tr class="el-table__row">               
                      <td colspan="2">
                        <div class=" ">
                            <el-form-item label="性别：" class="mt8">
                              <el-select v-model="form.sex" placeholder="请选择性别" style="width:100%" size="small">
                                    <el-option label="男" value="0"></el-option>
                                    <el-option label="女" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                      </td>  
                      <td colspan="2"  >
                        <div class=" ">
                            <el-form-item label="出生年月：">
                              <el-date-picker size="small" type="date" v-model="form.birthday" style="width:100%" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" ref="startDate" placeholder="年/月/日" class="checkName"></el-date-picker>
                            </el-form-item>
                        </div>
                      </td> 
                      <td colspan="2"  rowspan="5">
                        <div class=" ">
                          <el-upload
                              class="avatar-uploader"
                              action="111"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :on-change="getFile"
                              :before-upload="beforeAvatarUpload" v-model="form.photo">
                              <img v-if="form.photo" :src="form.photo" class="avatar" style="width: 150px; height: 150px;">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                          <p class="textCenter mt10">点击图片上传照片</p>
                        </div>
                      </td>                
                  </tr>            
                  <tr class="el-table__row">  
                    <tr class="el-table__row"> 
                        <td colspan="2" >
                          <div class=" ">
                            <el-form-item label="手机：">
                              <el-input size="small" v-model="form.telephone"></el-input>
                            </el-form-item>
                          </div>
                        </td>    
                      <td colspan="2">
                        <div class=" ">
                            <el-form-item label="职务：">
                              <el-input size="small" v-model="form.business"></el-input>
                            </el-form-item>
                        </div>
                      </td>                 
                  </tr>
                  <tr class="el-table__row"> 
                      <td colspan="4" >
                        <div class=" ">
                            <el-form-item label="通讯地址：">
                              <el-input size="small" v-model="form.mailingAddress"></el-input>
                            </el-form-item>
                        </div>
                        
                      </td>    
                  </tr>
                  <tr class="el-table__row"> 
                      <td colspan="2">
                        <div class=" ">
                            <el-form-item label="电子邮件：">
                              <el-input size="small" v-model="form.email"></el-input>
                            </el-form-item>
                        </div>
                          
                      </td>    
                      <td colspan="2">
                        <div class=" ">
                            <el-form-item label="邮政编码：">
                              <el-input size="small" v-model="form.zipCode"></el-input>
                            </el-form-item>
                        </div>
                      </td>               
                  </tr>
                </tbody>
              </table>
            </el-form>
      </div>
			<div slot="footer" class="dialog-footer">
        <el-button class="defaultBtn" @click="saveSysUser">保存</el-button>
				<el-button class="defaultBtn" @click="colse">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './sysuser.service';
    import { Loading } from 'element-ui';
     import {JSEncrypt} from 'jsencrypt';
    @Component({
		components: {
		}
	})
    export default class addsysuser extends Vue{
        addSysUserV: boolean = false;       
        tableData:any = [];
        uploadUrl: string =  process.env.upload_BASEURL + '/file/simple/upload';
        imageUrl: string ='';
        archiveAgentCodeName: string ='';
        SysUserTitle: string ='';
        loadingInstance:any={};
        uploadType:any = {
          type:4
        };
        form:any = {};
        defaultTreeOpen:any = [];
        archiveAgentName: string ='';
        treedata001: any = [];
        isEditSysUser: boolean = false;  
        rules: any = {};
        defaultProps: any = {};
        constructor(){
            super();
            this.form = {
                "loginName":"",
                "password":"",
                "rePassword":"",
                "fullName":"",
                "sex":'',
                "birthday":"",
                "telephone":"",
                "email":"",
                "mailingAddress":"",
                "zipCode":"",
                "userType":null,
                "userState":null,
                "archiveAgentCode":"",
                "fondCode":"",
                "fondName":"",
                "department":"",
                "credentialsType":"",
                "credentialsNumber":"",
                "nationality":"",
                "consultantType":"",
                "photo":"",
                "fixedTelephone":"",
                "business":""
              };  
              this.defaultProps = {
                    children: 'children',
                    label: 'archiveAgentName',
                    id:'archiveAgentCode'
                };
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
                credentialsType: [
                    { required: true, message: '请选择证件类型', trigger: 'change' }
                ],
                archiveAgentCode: [
                    { required: true, message: '请选择档案馆', trigger: 'change' }
                ],
                userState: [
                    { required: true, message: '请选择用户状态', trigger: 'change' }
                ],
                userType: [
                    { required: true, message: '请选择用户类型', trigger: 'change' }
                ],
                consultantType: [
                    { required: true, message: '请填写查阅者类型', trigger: ['change'] }
                ],
                archivesAgentCode: [
                    { required: true, message: '请填写接待管及代码', trigger: ['blur'] }
                ]
            };
        }; 
        saveSystemUser(){
          let  parmes = {
             
            }
             Service.saveSystemUser(parmes).then((res) =>{
               if(res.data.succeeded){ 
                this.tableData = res.data.data;
                }else{
                  this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                 }
            });
        };
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
        };
        // 用户名验证
        userName(rule,value,callback){
            var reg = new RegExp('^[a-zA-Z][a-zA-Z0-9]*$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('用户名只能是字母和数字组合，且字母开头'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        };
        handleNodeClick1(data){
            this.archiveAgentName = data.archiveAgentName;
            this.archiveAgentCodeName = data.archiveAgentCode + ' ' + data.archiveAgentName;
            this.form.archiveAgentCode = data.archiveAgentCode;
            if(data.children.length > 0){
 
            }else{
                this.$refs.selectReport.blur()
            }
        }
        // 获取档案馆代码
        getArchiveAgenterTree(){
                Service.archiveAgenterTree({"scope":"4"}).then((res) =>{
                    if(res.data.succeeded){
                        this.treedata001 = res.data.data;
                        // this.defaultTreeOpen.push(res.data.data[0].archiveAgentCode);
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
            }
        colse(){
          this.addSysUserV=false;
          this.$refs.form.resetFields();
        };
        //证件号码验证
        credentialsNumber(rule,value,callback){
            var reg = new RegExp('^[0-9][0-9]{17}$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的证件号码'))
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
          // self.imageUrl = res;
          self.form.photo = res;
        });
    }
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
        
      };
      passwordchck(rule,value,callback){        
            if(value!==this.form.password){                
                callback(new Error('两次密码不一致'))
            }else{
                callback()
            }
      };
      oldpasswordchck(rule,value,callback){
            let encrypt = new JSEncrypt();                   
            encrypt.setPublicKey(window.sessionStorage.getItem('loginkey'));
            let oldPassword = encrypt.encrypt(value); 
            let parmse={
                userId:parseInt(this.form.userId),
                oldPassword:oldPassword
            }    
             Service.checkPass(parmse).then((res) =>{                     
                        if(res.data.succeeded) {
                            callback();
                        } else {
                            callback(new Error('原密码错误'));
                        }
             }
           
      };
      // 保存系统用户
      saveSysUser() {
        let self = this;
        this.$refs['form'].validate((valid)=>{
                if (valid) {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    if(self.isEditSysUser){
                        Service.updateSystemUser(this.form).then((res) =>{
                            console.log(res);
                            if(res.data.succeeded) {
                                this.Suces('保存成功!');
                                this.$parent.getUserList();
                                this.$refs.form.resetFields();
                                this.addSysUserV = false;   
                            } else {
                                this.error('保存失败!');
                            }
                            this.$nextTick(() => { loadingInstance.close();});
                        })
                    } else {
                        let encrypt = new JSEncrypt();                   
                        encrypt.setPublicKey(window.sessionStorage.getItem('loginkey'));
                        let pass = encrypt.encrypt(this.form.password); 
                        this.form.password = pass;
                        Service.saveSystemUser(this.form).then((res) =>{
                            console.log(res);
                            if(res.data.succeeded) {
                                this.Suces('保存成功!');
                                this.$parent.getUserList();
                                this.$refs.form.resetFields();
                                this.addSysUserV = false;   
                            } else {
                                this.error('保存失败!');
                            }
                            this.$nextTick(() => { loadingInstance.close();});
                      })
                    }
                    
                } else {
                    return false;
                }
            });
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
        //错误信息
        error(message:string){
            this['$message']({
                type: 'error',
                message
            });
        };
        created(){ 
          console.log(this.imageUrl);       
        };
        mounted(){
            
        };
}
</script>
<style lang="scss" scoped>
.addUserbody{
  max-height: 750px;
  overflow-y: auto;
  padding: 5px;
  .textTips{
    width: 100%;
    height: 40px;
    line-height: 50px;
    margin-left: 10px;
  }
  .el-table {
    width: 99%;
    overflow: inherit !important;
    td{
      border: none;
    }
  }
  .el-table::before{
      height: 0px;
  }
  .el-form-item {
    margin-top: 8px;
  }
}
</style>