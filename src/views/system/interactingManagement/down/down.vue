<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>下载中心管理</span>
        </div>
        <div class="searchKey boxshow">           
              <el-form :inline="true" >               
                <el-form-item label="标题">
                    <el-input placeholder="请输入标题" size="small" v-model="Gfilters.downloadFileName"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                     <el-select v-model="Gfilters.fileCategory" placeholder="请选择类别" style="width:85%" size="small">
                        <el-option label="请选择类别" value="0"></el-option>
                        <el-option v-for="ind in fileCategoryData" :label="ind.displayText" :value="ind.code"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="状态" v-model="Gfilters.publishStatus">
                     <el-select v-model="Gfilters.publishStatus" placeholder="请选择状态" style="width:85%" size="small" clearable>
                        <el-option v-for="ind in publishStatusData" :label="ind.displayText" :value="ind.code"></el-option>
                    </el-select>
                </el-form-item>                 
                <el-form-item>
                    <el-button class="defaultBtn" @click="searchList">检索</el-button>
                </el-form-item>
             </el-form>
        </div>   
         <div class="contentbox boxshow">
            <div class="searchCon">    
                <div class="text-right">
                    <el-button class="blueBtn" @click="addDown">新增</el-button>                                   
                    <el-button class="redBtn" @click="delDowns">删除</el-button>
                  </div>                 
                                 <el-table
                                        :data="downData"
                                        border
                                        :height="bodyHeight2"
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
                                                <el-button class="tabletoolBtn" @click="editDown(scope.row)">编辑</el-button>
                                                <el-button class="tabletoolBtn" @click="delDown(scope.row.id)">删除</el-button>
                                                 <el-button class="tabletoolBtn" v-show="scope.row.publishStatus == 0" @click="publish(scope.row)">发布</el-button>
                                                 <el-button class="tabletoolBtn" v-show="scope.row.publishStatus == 1" @click="publish(scope.row)">取消发布</el-button>
                                              </template>
                                        </el-table-column>
                                        <el-table-column prop="downloadFileName" label="标题">
                                        </el-table-column>
                                         <el-table-column prop="description" label="文件描述">                                      
                                        </el-table-column>
                                         <el-table-column prop="fileSize" label="文件大小">
                                             <template slot-scope="scope">
                                                <span v-if="scope.row.fileSize > 1024 ">
                                                  {{(scope.row.fileSize / 1024).toFixed(2) + 'kb'}}
                                                </span>
                                                 <span v-else-if="scope.row.fileSize > 1024 * 1024 ">
                                                  {{(scope.row.fileSize / (1024*1024)).toFixed(2) + 'M'}}
                                                </span>
                                                 <span v-else>
                                                  {{scope.row.fileSize.toFixed(2) + 'kb'}}
                                                </span>
                                             </template>
                                         </el-table-column>
                                         <el-table-column prop="uploadPerson" label="上传者">                                      
                                        </el-table-column>
                                         <el-table-column prop="createDate" label="上传时间" :formatter="dateFormat1">                                      
                                        </el-table-column>
                                         <el-table-column prop="downloadTimes" label="下载次数">                                      
                                        </el-table-column>
                                    </el-table>  
                                    <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[25, 50, 100, 200]"
                                        :page-size="25"
                                        layout="total, sizes, prev,pager, next, jumper"
                                        :total="downDataTotal">
                                        </el-pagination>
                                    </div>  
                </div>
        </div> 
        <!-- //新增下载-->
        <el-dialog
          :title = AddTitle
          :visible.sync="downAddSetVisible"
         :closeOnClickModal="false"
         :closeOnPressEscape="false"
         top="4%"
          width="50%" class="importListAddDialog">
          <el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
                      <el-form-item label="上传文件：" prop="serverSaveFilename">
                          <el-upload
                            class="upload-demo"
                            :action="uploadUrl"
                            :data="uploadType"
                            v-model="ruleForm.serverSaveFilename"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handleDeviceSuccess"
                            :before-remove="beforeRemove"
                            :on-change="handleChange"
                            :file-list="fileList">
                            <el-button size="small" class="defaultBtn">选择文件</el-button>
                            <span slot="tip" class="el-upload__tip ml20">文件大小不能超过100M</span>
                          </el-upload>
                      </el-form-item>
                      <el-form-item label="类别：" prop="fileCategory">
                           <el-select v-model="ruleForm.fileCategory"  placeholder="请选择类别" size="small" style="width:100%;">
                              <!--<el-option label="未发布" value="0"></el-option>
                              <el-option label="已发布" value="1"></el-option>
                              <el-option label="撤销" value="2"></el-option>-->
                               <el-option v-for="ind in fileCategoryData" :label="ind.displayText" :value="ind.code"></el-option>
                          </el-select>
                      </el-form-item>
                     <el-form-item label="文件描述：" prop="description">
                          <el-input type="textarea" v-model="ruleForm.description"></el-input>
                      </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveAnnouncement('ruleForm')" class="defaultBtn">保存</el-button>
            <el-button @click="downAddSetVisible = false" class="defaultBtn">取 消</el-button>
          </span>
        </el-dialog>
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from './down.service';
    import { Loading } from 'element-ui';
    import moment from 'moment';
    import { State, Getter, Mutation, } from 'vuex-class';                             
    import superSearch from '@/components/superSearch/superSearch.vue';
   @Component({
        components: { 
            superSearch
        },
    })
    export default class appSuperSearch extends Vue{
        @State catNum :number;
        @Mutation('SET_CATNUM') SET_isShow: () => void;
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight2: number= document.documentElement.clientHeight - 320 ; 
        radio3: string = '1';
        ruleForm:any = {};
        downData:any = [];
        fileList:any = [];
        uploadType:any = {
          type:4
        };
        rules: any = {};
        uploadUrl: string =  process.env.upload_BASEURL + '/file/simple/upload';
        downAddSetVisible: Boolean= false;
        iseditdown: Boolean= false;
        publishStatusData:any = [];
        loading: Boolean= false;
        downDataTotal: number= 0; 
        fileCategoryData:any = [];
        Gfilters:any = {};
        fromType: string = '';
        AddTitle: string = '';
        treedata001: any = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      activeName:string = 'first';
        total: number = 1;
         page: number = 0;
        pageSize: number = 25;                  
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };
       multipleSelection:any = [];
       fileObj:any = {};
        constructor(){
            super();
            this.ruleForm = {
                serverSaveFilename:'',
                fileCategory:'',
                description:'',
                downloadFileName:'',
                fileSize:''
            };
            this.multipleSelection = [];
            this.rules = {
                serverSaveFilename:[
                    { required: true, message: '请上传文件', trigger: 'change' }
                ],
                fileCategory:[
                    { required: true, message: '请选择类别', trigger: 'blur' }
                ],
                description:[
                    { required: true, message: '请填写描述', trigger: 'blur' }
                ],
            };
            this.Gfilters = {
                downloadFileName:'',
                fileCategory:'0',
                publishStatus:'1',
                pageSize:this.pageSize,
                page:this.page,
            }
            this.fileObj = {};
        };
        @Watch('$store.state.fromType')
          routechange(val) {
            if(val === 'public'){
                this.fromType = 'public';
            } else {
                this.fromType = 'management';
            }
         } 
          handlePreview(file) {
          console.log(file);
        };
        searchList() {
          this.getDownloadInfoList();
        }
        dicgetDictListByDictId() {
          Service.dicgetDictListByDictId(82).then(res => {
              if(res.data.succeeded){
                  this.fileCategoryData = res.data.data;
              }else{
                  this.error(res.data.errorMessage);
              }
          });
        }
        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        };
        dicgetDictListByDictId2() {
          Service.dicgetDictListByDictId(7).then(res => {
              if(res.data.succeeded){
                  this.publishStatusData = res.data.data;
              }else{
                  this.error(res.data.errorMessage);
              }
          });
        }
         // 文件删除回调
        handleRemove(file, fileList) {
            this.ruleForm.serverSaveFilename = '';
        };
        superSearchShow(){
          //  this.$nextTick(() => {
          //    this.$refs.superSearch.superSearchVisible=true;           
          //  })          
        }
        // 文件上传成功回调
         handleDeviceSuccess(res, file) {
          //  this.ruleForm.attachmentName = res.data;
             this.fileObj = file;
             this.ruleForm.downloadFileName = file.name;
             this.ruleForm.serverSaveFilename = res.data;
             this.ruleForm.fileSize = file.size;
        };
        beforeRemove(file, fileList) {
          // return this.$confirm(`确定移除 ${ file.name }？`);
        }
        // 保存
        saveAnnouncement(ruleForm) {
          let self = this;
          this.$refs[ruleForm].validate((valid)=>{
                if (valid) {
                  if(this.iseditdown) {
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.updateDownload(self.ruleForm).then((res) =>{
                        if(res.data.succeeded) {
                          this.downAddSetVisible = false;
                            this.getDownloadInfoList();
                        } else {
                            self.Warn(res.data.errorMessage);
                        }
                        this.$nextTick(() => { this.loadingInstance.close();});
                    })
                  } else {
                    this.loadingInstance = Loading.service(
                          {
                              lock: true,
                              text: '正在保存，请稍候',
                              spinner: 'el-icon-loading',
                              background: 'rgba(0, 0, 0, 0.7)'
                          }
                      );
                    Service.saveDownload(self.ruleForm).then((res) =>{
                        if(res.data.succeeded) {
                          this.downAddSetVisible = false;
                          this.getDownloadInfoList();
                        } else {
                            self.Warn(res.data.errorMessage);
                        }
                        this.$nextTick(() => { this.loadingInstance.close();});
                    })
                  }
               }
          }) 
        }
        getDownloadInfoList() {
            this.loading = true;
            Service.getDownloadInfoList(this.Gfilters).then(res => {
              if(res.data.succeeded){
                  this.loading = false;
                  this.downData = res.data.data;
                  this.downDataTotal = res.data.totalRecords;
              }else{
                  this.loading = false;
                  this.error(res.data.errorMessage);
              }
          });
        }
        delDown(id){
            Service.deleteDownload({
                "idStr":id.toString()
            }).then(res => {
                if(res.data.succeeded){
                    this.Suces("删除成功！");
                    this.getDownloadInfoList();
                }else{
                    this.error(res.data.errorMessage);
                }
            });
        }
        delDowns(){
            if(this.multipleSelection.length == 0 ){
                this.Warn("请先选择数据");
                return;
            }
            let idAttr = [];
            for(let child of this.multipleSelection){
                idAttr.push(child.id);
            }
            Service.deleteDownload({
                "idStr":idAttr.join(",")
            }).then(res => {
                if(res.data.succeeded){
                    this.Suces("删除成功！");
                    this.getDownloadInfoList();
                }else{
                    this.error(res.data.errorMessage);
                }
            });
        }
        addDown() {
            this.fileList = [];
            this.ruleForm.fileCategory = '';
            this.ruleForm.description = '';
            if(this.$refs['ruleForm']){
                this.$refs['ruleForm'].resetFields();
            }
            this.AddTitle = "新增下载文件"
            this.downAddSetVisible = true;
            this.iseditdown = false;
        }
        editDown(row) {
            this.fileList = [];
            if(row.serverSaveFilename){
                this.fileList.push({
                    "name":row.downloadFileName
                });
                this.ruleForm.serverSaveFilename = row.serverSaveFilename;
            }
            this.ruleForm.fileCategory = row.fileCategory.toString() == '0'?'':row.fileCategory.toString();
            this.ruleForm.description = row.description;
            this.ruleForm.downloadFileName = row.downloadFileName;
            this.ruleForm.fileSize = row.fileSize;
            this.ruleForm.id = row.id;
            this.AddTitle = "编辑下载文件"
            this.downAddSetVisible = true;
            this.iseditdown = true;
        }
        handleCurrentChange(val:number) {
            this.page = val;
            this.getDownloadInfoList();        
        };
        handleSizeChange(val:number) {
            this.pageSize = val;
            this.getDownloadInfoList();        
        };

       handleChange(file, fileList) {
           if (fileList.length > 0) {
               this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的文件
           }
       };

       handleSelectionChange(val) {
           this.multipleSelection = val;
       }

       publish(row){
           Service.downloadInfoPublish({
               "id":row.id,
               "publishedStatus":row.publishStatus == 1?0:1
           }).then(res => {
               if(res.data.succeeded){
                   this.Suces("操作成功！");
                   this.getDownloadInfoList();
               }else{
                   this.error(res.data.errorMessage);
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
         //失败信息
        error(message:string){
            this['$message']({
                type: 'error',
                message
            });
        };
        created(){ 
          this.getDownloadInfoList();
          this.dicgetDictListByDictId();
          this.dicgetDictListByDictId2();     
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight2 = document.documentElement.clientHeight - 320 ; 
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>  
   @import '../../../../styles/innerPublic.scss';
   @import '../../../../styles/interacting/notice.scss'
</style>