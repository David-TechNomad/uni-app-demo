<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>公共意见</span>
        </div>
         
        <div class="contentbox contentbox-full ">             
                    <!-- <div class="TabRBtn">
                        <el-button class="defaultBtn"><i class="fa fa-plus-square" aria-hidden="true"></i> 新增意见</el-button>
                    </div> -->
                      <el-tabs v-model="activeName" type="card" class="erpTab" @tab-click="handleClick">
                            <el-tab-pane label="公共意见" name="first">
                              <div class="searchKey boxshow">           
                                      <el-form :inline="true" >
                                      <el-form-item label="标题">
                                            <el-input placeholder="请输入标题" size="small" v-model="searchKey.postTitle"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button class="defaultBtn" @click="searchList">检索</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div> 
                                <div class="searchCon boxshow mt10 boxshow">  
                                  <div class="text-right">
                                    <el-button class="blueBtn" @click="addNotice">新增意见</el-button>
                                  </div>   
                                   <el-table
                                        :data="tableData"
                                        border
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader" 
                                        stripe 
                                        class="defaultTable">
                                        <el-table-column type="index" width="50" label="序号">
                                        </el-table-column>
                                        <el-table-column  prop="name" label="附件"  width="80">
                                             <template slot-scope="scope">                                                 
                                                 <i class="fa fa-paperclip tableIcon cur-p" v-show="scope.row.serverSaveFilename" @click="downEnclosure(scope.row.serverSaveFilename)"></i>
                                              </template>
                                        </el-table-column>
                                        <el-table-column prop="postTitle" label="主题">
                                            <template slot-scope="scope">
                                                <span @click="showEidt(scope.row)" style="cursor:pointer">{{scope.row.postTitle}}</span>
                                            </template>
                                        </el-table-column>
                                         <el-table-column prop="postTime" label="创建时间" :formatter="dateFormat">
                                        </el-table-column>
                                         <el-table-column prop="postStatus" label="意见状态">
                                             <template slot-scope="scope">
                                                 <span v-show="scope.row.postStatus == 0">未回复</span>
                                                 <span v-show="scope.row.postStatus == 1">已回复</span>
                                                 <span v-show="scope.row.postStatus == 2">已完结</span>
                                             </template>
                                        </el-table-column>
                                         <el-table-column prop="updateDate" label="最新修改时间" :formatter="dateFormat">
                                        </el-table-column>                                                                 
                                    </el-table>  
                                    <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :page-sizes="[10, 20, 30, 40]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev,pager, next, jumper"
                                        :total="total">
                                        </el-pagination>
                                    </div> 
                                   </div>                       
                            </el-tab-pane>
                            <el-tab-pane label="我的意见" name="second">  
                                <div class="searchKey boxshow">           
                                      <el-form :inline="true" >
                                      <el-form-item label="标题：">
                                            <el-input placeholder="请输入标题" size="small" v-model="searchKey.postTitle"></el-input>
                                        </el-form-item>
                                        <el-form-item label="意见状态：">
                                            <el-select  placeholder="请选择意见状态：" size="small" style="width:100%;" v-model="searchKey.postStatus" clearable>
                                                <el-option :label="itme.displayText" :value="itme.code" v-for="itme in selecData"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button class="defaultBtn" @click="searchList">检索</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div> 
                                <div class="searchCon boxshow mt10 boxshow">  
                                  <div class="text-right">
                                    <el-button class="blueBtn" @click="addComments">新增意见</el-button>
                                    <!--<el-button class="redBtn" @click="delCommentsAll">删除意见</el-button>-->
                                    <!--<el-button class="defaultBtn" @click="importantComments">置已完结</el-button>-->
                                  </div>   
                                   <el-table
                                        :data="tableData"
                                        border
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader"
                                        @selection-change="handleSelectionChange"
                                        stripe 
                                        class="defaultTable">
                                        <el-table-column
                                            type="selection"
                                            width="55">
                                        </el-table-column>
                                           <el-table-column type="index" width="50" label="序号">
                                          </el-table-column>
                                          <el-table-column  prop="name" label="操作"  width="280">
                                              <template slot-scope="scope">  
                                                <el-button class="tabletoolBtn" @click="showEidt(scope.row)">查看</el-button>
                                                <el-button class="tabletoolBtn" v-show="scope.row.postStatus == 0" @click="delComments(scope.row.id)">删除</el-button>
                                                <!--<el-button class="tabletoolBtn" v-show="scope.row.postStatus != 2" @click="importantSuccess(scope.row)">置已完结</el-button>-->
                                              </template>
                                          </el-table-column>
                                       <el-table-column  prop="name" label="附件"  width="80">
                                           <template slot-scope="scope">
                                               <i class="fa fa-paperclip tableIcon cur-p" v-show="scope.row.serverSaveFilename" @click="downEnclosure(scope.row.serverSaveFilename)"></i>
                                           </template>
                                       </el-table-column>
                                       <el-table-column prop="postTitle" label="主题">
                                       </el-table-column>
                                       <el-table-column prop="postTime" label="创建时间" :formatter="dateFormat">
                                       </el-table-column>
                                       <el-table-column prop="postStatus" label="意见状态">
                                           <template slot-scope="scope">
                                               <span v-show="scope.row.postStatus == 0">未回复</span>
                                               <span v-show="scope.row.postStatus == 1">已回复</span>
                                               <span v-show="scope.row.postStatus == 2">已完结</span>
                                           </template>
                                       </el-table-column>
                                       <el-table-column prop="updateDate" label="最新修改时间" :formatter="dateFormat">
                                       </el-table-column>
                                   </el-table>
                                    <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :page-sizes="[10, 20, 30, 40]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev,pager, next, jumper"
                                        :total="total">
                                        </el-pagination>
                                    </div> 
                                   </div>                                                   
                            </el-tab-pane>                           
                       </el-tabs> 
                                 
                         
                   
               
        </div> 
        <!-- //新增意见-->
        <el-dialog
          title = "添加意见"
          :visible.sync="commentsAddSetVisible"
         :closeOnClickModal="false"
         :closeOnPressEscape="false"
          width="30%" class="importListAddDialog">
          <el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
                  <el-form-item label="标题：" prop="postTitle">
                          <el-input placeholder="单行输入" size="small" v-model="ruleForm.postTitle"></el-input>
                      </el-form-item>
                      <el-form-item label="内容：" prop="postContent">
                          <el-input type="textarea" v-model="ruleForm.postContent"></el-input>
                      </el-form-item>
                      <el-form-item label="附件：" prop="serverSaveFilename">
                          <el-input placeholder="单行输入" size="small" readonly v-model="ruleForm.originalFileName" style="width:88%;"></el-input>
                          <el-upload
                            class="upload-demo d-ib"
                            :action="uploadUrl"
                            :on-preview="handlePreview"
                            :data="uploadType"
                            :on-remove="handleRemove"
                            :on-success="handleDeviceSuccess"
                            :before-remove="beforeRemove"
                            :before-upload="beforeAvatarUpload"
                            :show-file-list = "false"
                            :file-list="fileList">
                            <el-button size="small" class="defaultBtn">选择文件</el-button>
                            <!-- <span slot="tip" class="el-upload__tip ml20">文件大小不能超过100M</span> -->
                          </el-upload>
                      </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveAnnouncement('ruleForm')" class="defaultBtn">确 定</el-button>
            <el-button @click="commentsAddSetVisible = false" class="defaultBtn">取 消</el-button>
          </span>
        </el-dialog> 
        <eidt ref="edit"></eidt>
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from './comments.service';
    import { State, Getter, Mutation, } from 'vuex-class';   
    import eidt from './eidt.vue';                          
    import superSearch from '@/components/superSearch/superSearch.vue';
   import { Loading } from 'element-ui';
   import moment from 'moment';
   @Component({
        components: { 
            eidt
        },
    })
    export default class appSuperSearch extends Vue{
        @State catNum :number;
        @Mutation('SET_CATNUM') SET_isShow: () => void;
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 370 ; 
        commentsAddSetVisible: Boolean= false;
        radio3: string = '1';
       rules: any = {};
        ruleForm:any = {};
       selecData: any =[];
       multipleSelection:any = [];
      activeName:string = 'first';
      tableData: any =[];
        total: number = 0;
         page: number = 0;
        pageSize: number = 25;
       uploadUrl: string =  process.env.upload_BASEURL + '/file/simple/upload';
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };
       uploadType:any = {
           type:4
       };
       searchKey:any = {};
       loadingInstance:any;
        constructor(){
            super();
            this.ruleForm = {
                parentId:0,
                postTitle:'',
                postContent:'',
                originalFileName:'',
                serverSaveFilename:''
            };
            this.rules = {
                postTitle:[
                    { required: true, message: '请填写标题', trigger: 'blur' }
                ],
                postContent:[
                    { required: true, message: '请填写内容', trigger: 'blur' }
                ]
            };
            this.searchKey = {
                postTitle:'',
                postStatus:''
            };
            this.multipleSelection = [];
        };
        superSearchShow(){
           this.$nextTick(() => {
             this.$refs.superSearch.superSearchVisible=true;           
           })          
        }
        showEidt(val){
            this.$refs.edit.eidtVisible=true;
            this.$refs.edit.id=val.id
            this.$refs.edit.getContent()
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.getList();
        };
        addComments() {
          this.commentsAddSetVisible = true;
        }
        delComments(id) {
            Service.systemdelete({
                "idStr":id.toString()
            }).then((res) =>{
                if(res.data.succeeded){
                    this.Suces("删除成功");
                    this.getList();
                }else{
                    this['$message']({
                        message: '获取列表失败',
                        type: 'error'
                    });
                }
            });
        }

       delCommentsAll(){
           if(this.multipleSelection.length == 0 ){
               this.Warn("请先选择数据");
               return;
           }
           let idAttr = [];
           for(let child of this.multipleSelection){
               idAttr.push(child.id);
           }
           Service.systemdelete({
               "idStr":idAttr.join(",")
           }).then((res) =>{
               if(res.data.succeeded){
                   this.Suces("删除成功");
                   this.getList();
               }else{
                   this['$message']({
                       message: '获取列表失败',
                       type: 'error'
                   });
               }
           });
       }

       importantComments(){
           if(this.multipleSelection.length == 0 ){
               this.Warn("请先选择数据");
               return;
           }
           let idAttr = [];
           for(let child of this.multipleSelection){
               idAttr.push(child.id);
           }
           Service.setover({
               "idStr":idAttr.join(",")
           }).then((res) =>{
               if(res.data.succeeded){
                   this.Suces("操作成功");
                   this.getList();
               }else{
                   this['$message']({
                       message: '获取列表失败',
                       type: 'error'
                   });
               }
           });
       }

        importantSuccess(row){
            Service.setover({
                "idStr":row.id.toString()
            }).then((res) =>{
                if(res.data.succeeded){
                    this.Suces("操作成功");
                    this.getList();
                }else{
                    this['$message']({
                        message: '获取列表失败',
                        type: 'error'
                    });
                }
            });
        }
        handleSizeChange(val:number) {
            this.pageSize = val;
            this.getList();
        };

       getSelect(){
           Service.getDictlistsurl(83).then((res) =>{
               if (res.data.succeeded) {
                   this.selecData= res.data.data
               }else{
                   this['$message']({
                       message: '获取状态失败',
                       type: 'error'
                   });
               }
           })
       };

       getList(){
           //window.sessionStorage.getItem('userId')
           let  parmes = {
               "postTitle":this.searchKey.postTitle,
               "postStatus":this.activeName == 'first'?1:this.searchKey.postStatus,
               "posterId":this.activeName == 'first'?'':window.sessionStorage.getItem('userId'),
               "page":this.page,
               "pageSize":this.pageSize
           }
           Service.getFeedbackList(parmes).then((res) =>{
               if(res.data.succeeded){
                   this.tableData = res.data.data;
                   this.total = res.data.totalRecords;
               }else{
                   this['$message']({
                       message: '获取列表失败',
                       type: 'error'
                   });
               }
           });
       };

       addNotice(){
           this.commentsAddSetVisible = true;
       }

       // 文件上传成功回调
       handleDeviceSuccess(res, file) {
           this.ruleForm.serverSaveFilename = res.data;
           this.$nextTick(() => {
               this.loadingInstance.close();
           });
       };

       handlePreview(file) {

       };

       beforeAvatarUpload(file){
           this.loadingInstance = Loading.service(
               {
                   lock: true,
                   text: '上传中，请稍候',
                   spinner: 'el-icon-loading',
                   background: 'rgba(0, 0, 0, 0.7)'
               }
           );
           this.ruleForm.originalFileName = file.name;
       }

       // 保存
       saveAnnouncement(ruleForm) {
           let self = this;
           this.$refs[ruleForm].validate((valid)=>{
               if (valid) {
                   this.loadingInstance = Loading.service(
                       {
                           lock: true,
                           text: '正在保存，请稍候',
                           spinner: 'el-icon-loading',
                           background: 'rgba(0, 0, 0, 0.7)'
                       }
                   );
                   Service.add(self.ruleForm).then((res) =>{
                       if(res.data.succeeded) {
                           this.Suces("新增成功");
                           this.commentsAddSetVisible = false;
                           this.getList();
                       } else {
                           self.Warn(res.data.errorMessage);
                       }
                       this.$nextTick(() => { this.loadingInstance.close();});
                   })
               }
           })
       }

       dateFormat(row, column) {
           var date = row[column.property];
           if (date == undefined) {
               return "";
           }
           return moment(date).format("YYYY-MM-DD HH:mm:ss");
       }

       handleClick(){
           this.getList();
       }

       searchList(){
           this.getList();
       }

       downEnclosure(id) {
           let self = this;
           self['$confirm']('您是否要下载附件?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
           }).then(() => {
               if(id) {
                   window.location.href = process.env.upload_BASEURL+'/file/simple/download?fileId='+id
               } else {
                   self.Warn('附件不存在！');
               }
           });
       }

       created(){
            this.getSelect();
            this.getList();
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 370;
                })()
            };
        };

       handleSelectionChange(val) {
           this.multipleSelection = val;
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
       //失败信息
       error(message:string){
           this['$message']({
               type: 'error',
               message
           });
       };
    }
</script>

<style lang="scss" scoped>  
   @import '../../../styles/innerPublic.scss';
    .TabRBtn{
        top: 5px;
      }
    .el-form-item{
      margin-bottom: 10px;
    }
</style>