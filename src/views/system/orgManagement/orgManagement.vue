<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>机构管理</span>
        </div>
        <div class="contentbox boxshow">
            <div class="searchCon"> 
                <div class="ta-r">     
                    <el-button class="blueBtn" @click="updateFondsAndUser()">新增机构</el-button>
                    <el-button class="defaultBtn" @click="showthreeMemberManagement">三员设置</el-button>
                    <el-button class="redBtn" @click="shanChu">删除</el-button>
                </div>
                       <el-table
                            :data="tableData"
                            border
                            :max-height="bodyHeight"
                            element-loading-text="努力加载中..."
                            header-row-class-name="tableHeader"
                            row-key="archiveAgentCode"
                            @selection-change="handleSelectionChange"
                            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                            class="defaultTable">
                            <el-table-column type="selection"  width="55">
                            </el-table-column>
                            <el-table-column  prop="name" label="操作"  width="150">
                                 <template slot-scope="scope">
                                     <el-button class="tabletoolBtn" @click="editFondsAndUser(scope.row)">编辑</el-button>
                                  </template>
                            </el-table-column>
                            <el-table-column prop="archiveAgentName" label="机构名称" align="left">
                            </el-table-column>
                            <el-table-column prop="archiveAgentCode" label="机构代码" align="left">
                            </el-table-column>
                            <el-table-column prop="parentArchiveAgentCode" label="所属档案馆代码" align="left">
                            </el-table-column>
                            <el-table-column prop="name" label="机构类别" align="left">
                                <template slot-scope="scope">
                                    <span v-show="item.code == scope.row.organizationType" v-for="item in leiBieAttr">{{item.displayText}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="机构地址" align="left">
                            </el-table-column>
                            <el-table-column prop="roleFlag" label="三员是否设置" align="left">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.roleFlag">是</span>
                                    <span v-show="!scope.row.roleFlag">否</span>
                                </template>
                            </el-table-column>


                        </el-table>
                        <!--<div class="clear" style="margin-top:10px">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, next, jumper"
                            :total="400">
                            </el-pagination>
                        </div>     -->
            </div>
        </div> 
        <el-dialog class="myDialogCenter" :title="dialogText" :visible.sync="fileVisible" :close-on-click-modal="true" :before-close="handleClose">
                <div class="scrollCon formDiv">
                    <div class="tableCon">
                        <el-form :model="fileForm1" :rules="ruleForm1" ref="fileForm1" label-width="155px">
                            <el-form-item label="机构代码：" class="basicItem" ref="archiveAgentCode" prop="archiveAgentCode">
                                <el-input class="checkName percentName" :readonly="dialogText == '编辑机构信息'" v-model="fileForm1.archiveAgentCode" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="机构名称：" class="basicItem" ref="archiveAgentName" prop="archiveAgentName">
                                <el-input class="checkName percentName" v-model="fileForm1.archiveAgentName" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="机构类别：" prop="organizationType" class="SelectItem checkName">
                                <el-select v-model="fileForm1.organizationType" placeholder="请选择档案馆" style="width:100%" size="small">
                                    <el-option :label="item.displayText" :value="item.code" :ket="item.code" v-for="item in leiBieAttr"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属档案馆：" class="basicItem" ref="parentArchiveAgentCode" prop="parentArchiveAgentCode">
                                <treeselect
                                        v-model="fileForm1.parentArchiveAgentCode"
                                         :clearable="false"
                                        placeholder="请选择" :searchable="false" :options="options"
                                        :normalizer="normalizer" />
                                </treeselect>
                                <!--<el-input class="checkName percentName" v-model="fileForm1.fondName" size="small"></el-input>-->
                            </el-form-item>
                            <el-form-item label="机构地址：" class="basicItem" ref="address" prop="address">
                               <el-input class="checkName percentName" v-model="fileForm1.address" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人：" class="basicItem" ref="contact" prop="contact">
                                <!-- <span v-show="!updateOrg">{{fileForm1.orgShortName}}</span> -->
                                <el-input class="checkName percentName"  size="small" v-model="fileForm1.contact"></el-input>
                            </el-form-item>
                            <el-form-item label="电话号码：" class="basicItem" ref="phoneNumber" prop="phoneNumber">
                                <el-input class="checkName percentName" size="small" v-model="fileForm1.phoneNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人email：" class="basicItem" ref="contactEmail" prop="contactEmail">
                                <el-input class="checkName percentName" size="small" v-model="fileForm1.contactEmail"></el-input>
                            </el-form-item>
                            <el-form-item label="传真：" class="basicItem" ref="fax" prop="fax">
                                <el-input class="checkName percentName" size="small" v-model="fileForm1.fax"></el-input>
                            </el-form-item>
                            <el-form-item label="邮编：" class="basicItem" ref="zipCode" prop="zipCode">
                                <el-input class="checkName percentName" size="small" v-model="fileForm1.zipCode"></el-input>
                            </el-form-item>
                            <el-form-item label="关联IP：" class="basicItem" ref="tcpIp" prop="tcpIp" style="margin-top:10px">
                                <el-input type="textarea" class="checkName percentName" size="small" v-model="fileForm1.tcpIp"></el-input>
                            </el-form-item>
                            <el-form-item label="备注：" class="basicItem" ref="comments" prop="comments" style="margin-top:10px">
                                <el-input type="textarea" class="checkName percentName" size="small" v-model="fileForm1.comments"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer diaFoot">
                    <el-button type="primary" class="defaultBtn" @click="sureFondsAndUser('fileForm1')">保存</el-button>
                    <el-button class="defaultBtn" @click="fileVisible = false">取消</el-button>
                </div>
            </el-dialog>
            <threeMemberManagementDialog ref="threeMemberManagementDialogRef" :mulSelect = "multipleSelection"></threeMemberManagementDialog>
            <surperUserManagement ref="showsurperUserManagementDialogRef" ></surperUserManagement>
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';
   import Component from 'vue-class-component';
   import surperUserManagement from '../operateDialog/surperUserManagement/surperUserManagement.vue'; 
   import threeMemberManagementDialog from '../operateDialog/threeMemberManagement/threeMemberManagement.vue';     
   import Service from './orgManagement.service';
   import Treeselect from '@riophae/vue-treeselect'
   import '@riophae/vue-treeselect/dist/vue-treeselect.css'
   @Component({
        components: {
            threeMemberManagementDialog,
            surperUserManagement,
            Treeselect
        },
    })
    export default class appSuperSearch extends Vue{  
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 220 ;
        radio3: string = '1';
        fileVisible: boolean;
        dialogText: string = '';
        fileForm1: any = {};
      activeName:string = 'first';
      tableData: any =[];
       leiBieAttr:any = [];
       multipleSelection:any = [];
        total: number = 1;
         page: number = 0;
        pageSize: number = 25;                  
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };
       ruleForm1: any = {};
       options:any = [];
        constructor(){
            super();
            this.fileVisible = false;
             this.fileForm1 = {
                 archiveAgentCode:'',
                 archiveAgentName:'',
                 organizationType:'',
                 parentArchiveAgentCode:null,
                 address:'',
                 contact:'',
                 phoneNumber:'',
                 contactEmail:'',
                 fax:'',
                 zipCode:'',
                 tcpIp:'',
                 comments:''
             };
            this.ruleForm1 = {
                archiveAgentCode: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                archiveAgentName: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                organizationType: [
                    { required: true, message: '请选择', trigger: 'change' }
                ]
            };
            this.multipleSelection = [];
             this.leiBieAttr = [];
            this.options = [
                {
                    key: 'archiveAgentCode',
                    name: 'archiveAgentName',
                    children: [ {
                        key: 'archiveAgentCode',
                        name: 'archiveAgentName',
                    } ],
                }
            ];
        };
 
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);           
        };
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);         
        };
        updateFondsAndUser(obj){
            for(let child in this.fileForm1){
                child == 'parentArchiveAgentCode'?this.fileForm1[child] = null:this.fileForm1[child] = "";
            }
            this.dialogText = '新增机构信息'
            this.fileVisible = true;
        };
        showthreeMemberManagement(){
            if(this.multipleSelection.length != 1){
                this['$message']({
                    message: "请选择一条数据",
                    type: 'warning'
                });
                return;
            }
            this.$nextTick(() => {
                //this.$refs['threeMemberManagementDialogRef'].getUserList();
                this.$refs['threeMemberManagementDialogRef'].getRolesByAgentCode();
                this.$refs['threeMemberManagementDialogRef'].threeMemberManagementVisible = true;
            });
        };
        showsurperUserManagement(){
            this.$nextTick(() => {
              this.$refs['showsurperUserManagementDialogRef'].showsurperUserManagementVisible = true;           
            });
        };
        editFondsAndUser(obj){
            Service.fondOne(obj.archiveAgentCode).then(res=>{
                if(res.data.succeeded == true){
                    for(let child in res.data.data){
                        for(let child1 in this.fileForm1){
                            if(child == child1){
                                if(child == 'organizationType'){
                                    this.fileForm1[child1] = res.data.data[child].toString();
                                }else if(child == 'parentArchiveAgentCode' && !res.data.data[child]){
                                    this.fileForm1[child1] = null;
                                }else{
                                    this.fileForm1[child1] = res.data.data[child];
                                }
                            }
                        }
                    }
                }else{
                    this.getError(res.data.errorMessage);
                }
            });
            this.dialogText = '编辑机构信息'
            this.fileVisible = true;
        };

       shanChu(){
           if(this.multipleSelection.length == 0){
               this['$message']({
                   message: "请先选择数据",
                   type: 'warning'
               });
               return;
           }
           this['$confirm']('您是否要删除所选数据?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
           }).then(() => {
               let attr = [];
               for(let child of this.multipleSelection){
                   attr.push(child.archiveAgentCode);
               }
               Service.deleteAgenter({
                   "idStr":attr.join(",")
               }).then((res) =>{
                   if(res.data.succeeded){
                       this['$message']({
                           message: "删除成功",
                           type: 'success'
                       });
                       this.getList();
                   }else{
                       this['$message']({
                           message: res.data.errorMessage,
                           type: 'error'
                       });
                   }
               });
           });
       }

       getList(){
           Service.agenterTreelist({}).then(res=>{
               if(res.data.succeeded == true){
                    this.tableData = res.data.data;
               }else{
                   this.getError(res.data.errorMessage);
               }
           });
       }

       diGuiTree(item) {  //递归档案馆树结构
           item.forEach(item => {
               item.children.length == 0 ?
                   delete item.children : this.diGuiTree(item.children);
           })
       }

       normalizer(node) {
           return {
               id: node.archiveAgentCode,
               label: node.archiveAgentName,
               children: node.children
           }
       }

       sureFondsAndUser(form){
           if(this.dialogText == '新增机构信息'){
               this.saveAgenter(form);
           }else if(this.dialogText == '编辑机构信息'){
               this.updateAgenter(form);
           }
       }

       updateAgenter(form){
           this['$refs'][form]['validate']((valid)=>{
               if (valid) {
                   Service.updateAgenter(this.fileForm1).then(res=>{
                       if(res.data.succeeded){
                           this.fileVisible = false;
                           this.getList();
                           this.Suces("修改成功");
                       }else{
                           this.getError(res.data.errorMessage);
                       }
                   });
               }
           });
       }

       saveAgenter(form){
           this['$refs'][form]['validate']((valid)=>{
               if (valid) {
                   Service.addAgenter(this.fileForm1).then(res=>{
                       if(res.data.succeeded){
                           this.fileVisible = false;
                           this.getList();
                           this.Suces("新增成功");
                       }else{
                           this.getError(res.data.errorMessage);
                       }
                   });
               }
           });
       }

       handleSelectionChange(val){
           this.multipleSelection = val;
       }

        created(){
            this.getList();
            Service.dicgetDictListByDictId(91).then(res=>{//获取机构类别
                if(res.data.succeeded == true){
                    this.leiBieAttr = res.data.data;
                }else{
                    this.getError(res.data.errorMessage);
                }
            });
            Service.archiveAgenterTree({}).then((res) =>{//获取档案馆树
                if(res.data.succeeded){
                    this.options = res.data.data;
                    this.diGuiTree(this.options);
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 320;
                })()
            };
        };

       //警告
       Warn(message:string){
           this['$message']({
               type: 'warning',
               message
           });
       };
       //成功
       Suces(message){
           this['$message']({
               type: 'success',
               message
           })
       };
       //请求失败
       getError(message:string){
           this["$message"]({
               message,
               type: 'error'
           });
       };
    }
</script>

<style lang="scss" scoped>
  @import '../../../styles/innerPublic.scss';
    @import '../../../styles/system/orgManagement/orgManagement';
    .wrapprSection {
        .big{
            position: absolute;
            right: 1%;
            top:30%;
        }
    }
    
</style>