<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>系统用户管理</span>
        </div>
        <div class="searchKey boxshow contentbox-full">           
              <el-form :inline="true"> 
                  <el-form-item label="姓名：">
                    <el-input placeholder="请输入" size="small" v-model="searchKey.fullName"></el-input>
                </el-form-item>             
                <el-form-item label="用户名：">
                    <el-input placeholder="请输入" size="small" v-model="searchKey.loginName"></el-input>
                </el-form-item>
                <el-form-item label="所属档案馆：">
                    <el-select v-model="searchKey.archiveAgentCode" clearable size="small" placeholder="请选择所属档案馆" style="width:220px" ref="selectReport" @clear="clearSelect">
                        <el-option style="overflow-y: auto;height: 220px;background-color:#fff" :label="archiveAgentName" :value="searchKey.archiveAgentCode" :key="searchKey.archiveAgentCode">
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
                 <el-form-item label="全宗名称：">
                    <el-input placeholder="请输入" size="small" v-model="searchKey.fondName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="defaultBtn" @click="searchData">检索</el-button>
                </el-form-item>
             </el-form>
        </div>
        <div class="contentbox boxshow">
            <div class="searchCon"> 
                    <div class="clear">                        
                        <el-button class="redBtn rt ml10" @click="delSysUserS"> 删除</el-button> 
                        <el-button class="blueBtn rt" @click="addSysUserShow"> 新增</el-button>                         
                    </div>
                    <el-table
                        :data="tableData"
                        border
                        :height="bodyHeight"
                        element-loading-text="努力加载中..."
                        header-row-class-name="tableHeader" 
                        v-loading="loading"
                        @selection-change="handleSelectionChange"
                        stripe 
                        class="defaultTable">
                        <el-table-column type="selection"  width="55">
                        </el-table-column>                                        
                        <el-table-column prop="fullName" label="姓名" align="left">
                        </el-table-column>
                        <el-table-column prop="name" label="性别" align="left">
                            <template slot-scope="scope">                                                 
                                <span v-if="scope.row.sex === 0">男</span> 
                                <span v-else-if="scope.row.sex === 1">女</span>                         
                            </template>
                        </el-table-column>
                        <el-table-column prop="loginName" label="用户名" align="left">
                        </el-table-column>
                        <el-table-column prop="roleName" label="所属角色" align="left">
                        </el-table-column>
                        <el-table-column prop="userState" label="用户状态" align="left">
                            <template slot-scope="scope">                                                 
                                <span v-if="scope.row.userState === 0">有效</span> 
                                <span v-else-if="scope.row.userState === 1">无效</span>                        
                            </template>
                        </el-table-column>
                        <el-table-column prop="telephone" label="手机" align="left">
                        </el-table-column>
                        <el-table-column prop="archiveAgentName" label="所属档案馆" align="left">
                             <!--<template slot-scope="scope">  
                                <span v-if="scope.row.archiveAgentCode == 1">原文</span> 
                                <span v-else-if="scope.row.archiveAgentCode == 2">附件</span>
                             </template>-->
                        </el-table-column>
                        <el-table-column prop="userType" label="用户类型" align="left">
                            <template slot-scope="scope">                                                 
                                <span v-if="scope.row.userType === '1'">局管用户</span> 
                                <span v-else-if="scope.row.userType === '2'">单位用户</span>                        
                            </template>
                        </el-table-column>
                        <el-table-column prop="fondCode" label="全宗号" align="left">
                        </el-table-column>
                        <el-table-column prop="fondName" label="全宗名称" align="left">
                        </el-table-column>
                        <el-table-column  prop="name" label="操作"  width="280">
                                <template slot-scope="scope">                                                 
                                    <el-button class="tabletoolBtn" @click="editSysUser(scope.row)">编辑</el-button> 
                                    <el-button class="tabletoolBtn" @click="delSysUser(scope.row.userId)">删除</el-button>
                                    <el-button class="tabletoolBtn" @click="userPermissionsShow(scope.row.userId)"> 赋予角色</el-button> 
                                    <el-button class="tabletoolBtn" @click="restSysUserPassword(scope.row.userId,scope.row.password)">重置密码</el-button>
                                </template>
                        </el-table-column>
                    </el-table>  
                    <div class="clear" style="margin-top:10px">                         
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[25, 50, 100, 200]"
                        :page-size="25"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalRecords">
                        </el-pagination>
                    </div> 
                   
                </div>
        </div> 
        <addSysUser ref="addSysUser"></addSysUser> 
         <userPermissions ref="userPermissions"></userPermissions> 
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
   import Service from './sysuser.service';
   import addSysUser from './addsysuser.vue';
   import { Loading } from 'element-ui';
   import userPermissions from './userPermissions.vue';
   import {JSEncrypt} from 'jsencrypt';
   @Component({
        components: { 
            addSysUser,
            userPermissions
        },
    })
    export default class sysuser extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 320 ; 
        searchKey: any = {}
        archiveAgentCode: any = [{}]; 
        tableData: any =[];
        chooseIdS: any =[];
        treedata001: any =[];
        total: number = 1;
        archiveAgentName: string = '';
        loadingInstance:any={};
         page: number = 0;
         totalRecords: number = 0;
         loading: Boolean= false;
         defaultProps: any = {};
        pageSize: number = 25;
        constructor(){
            super();
            this.defaultProps = {
                    children: 'children',
                    label: 'archiveAgentName',
                    id:'archiveAgentCode'
                };
            this.searchKey= {
              "fullName":"",  //姓名
              "loginName":"",  //登录名
              "fondName":"",  //用户状态
              "archiveAgentCode":""  //用户所属档案馆
            }
        };
        getUserList(){
                let self = this;
                let parmes = {
                        "notPaging":0,  
                        "fullName":this.searchKey.fullName,  
                        "loginName":this.searchKey.loginName,
                        "archiveAgentCode":this.searchKey.archiveAgentCode,
                        "fondName":this.searchKey.fondName,
                        "page":this.page,
                        "pageSize":this.pageSize
                }
                this.loading = true;
                Service.getUserList(parmes).then((res) =>{
                if(res.data.succeeded){ 
                    this.loading = false;
                    this.tableData = res.data.data;
                    this.totalRecords = res.data.totalRecords
                }else{
                    this.loading = false;
                    this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                    }
                });
        };
        clearSelect() {
            this.archiveAgentName = '';
            this.searchKey.archiveAgentCode = '';
        }
        getUserInfoMaster(){
          let  parmes =  window.sessionStorage.getItem('archiveAgentCode');
             Service.findByUserInfoMaster(parmes).then((res) =>{
               if(res.data.succeeded){ 
                 this.archiveAgentCode = res.data.data;
                }else{
                  this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                 }
            });
        };
        handleSelectionChange(val) {
            this.chooseIdS = [];
            for(let item of val) {
                this.chooseIdS.push(item.userId);
            }
        }
        // 检索用户
        searchData() {
            this.page = 1;
            this.pageSize = 25;
            this.getUserList();
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
         handleNodeClick1(data){
            this.archiveAgentName = data.archiveAgentName;
            this.searchKey.archiveAgentCode = data.archiveAgentCode;
            if(data.children.length > 0){
 
            }else{
                this.$refs.selectReport.blur()
            }
        }
        // 编辑用户
        editSysUser(id) {
            console.log(id);
            this.$nextTick(() => {
                this.$refs.addSysUser.addSysUserV=true;   
                this.$refs.addSysUser.SysUserTitle='编辑用户';
                // 编辑用户
                this.$refs.addSysUser.isEditSysUser = true;
                this.$refs.addSysUser.archiveAgentCodeName = id.archiveAgentCode + ' ' + id.archiveAgentName;
                for(let item in id) {
                    if(item === 'consultantType' || item === 'credentialsType' || item === 'nationality' || item === 'sex') {
                        if(id[item] !== null) {
                            this['$set'](this.$refs.addSysUser.form, item, '' + id[item]);
                        }
                    } else {
                        this['$set'](this.$refs.addSysUser.form, item, id[item]);
                    }
                }
           })
        }
        // 批量删除用户
        delSysUserS() {
            this.delSysUser(this.chooseIdS);
        }
        // 删除用户
        delSysUser(id) {
            let self = this;
            let ids = [];
            if(toString.call(id) === '[object Array]') {
                ids = id;
            } else {
                ids.push(id);
            }
            if(ids.length !== 0) {
                self['$confirm']('您是否要删除用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在删除中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.updateLocked({userIds:ids}).then(res=>{               
                        if(res.data.succeeded){                     
                            self.Suces("删除成功");
                            self.getUserList();
                        }else{
                                self['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                })
                            }
                        });
                        self.$nextTick(() => { loadingInstance.close();});
                });
                
            } else {
                self.Warn("请选择要删除的用户！");
            }
        }
        // 重置用户密码
        restSysUserPassword(id,password) {
            let self = this;
            self['$confirm']('您是否要重置密码?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在重置中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                     let encrypt = new JSEncrypt();                   
                    encrypt.setPublicKey(window.sessionStorage.getItem('loginkey'));
                    let pass = encrypt.encrypt("123456");
                    Service.updatePwd({userId:id,password:pass}).then(res=>{               
                        if(res.data.succeeded){                     
                            self.Suces("重置成功,密码为123456");
                            self.getUserList();
                        }else{
                                self['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                })
                            }
                        });
                        self.$nextTick(() => { loadingInstance.close();});
                });
        }
        addSysUserShow(){
           this.$nextTick(() => {
             this.$refs.addSysUser.addSysUserV=true; 
             this.$refs.addSysUser.SysUserTitle='新增用户';
             this.$refs.addSysUser.getArchiveAgenterTree();
             // 新增用户
                this.$refs.addSysUser.isEditSysUser = false;
                this.$refs.addSysUser.archiveAgentCodeName = '';
             for(let item in this.$refs.addSysUser.form) {
                 this.$refs.addSysUser.form[item] = null;
             }       
           })          
        }        
        userPermissionsShow(id){                
                 this.$refs.userPermissions.userPermissionsV=true; 
                 this.$refs.userPermissions.getActiveRole(id);
                 this.$refs.userPermissions.userId=id
        }
        handleCurrentChange(val:number) {
            this.page = val;
            this.getUserList();        
        };
        handleSizeChange(val:number) {
            this.pageSize = val;
            this.getUserList();           
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

        created(){ 
          this.getUserInfoMaster();
          this.getUserList();
          this.getArchiveAgenterTree();       
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 320;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
  @import '../../../styles/innerPublic.scss';
    @import '../../../styles/retrieve/search';
</style>