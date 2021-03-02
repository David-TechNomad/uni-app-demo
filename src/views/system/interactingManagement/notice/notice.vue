<template>
    <section class="wrapprSection noticeView">
        <div class="mainTitle">
           <span>公告管理</span>
        </div>
        <div class="searchKey boxshow">           
              <el-form :inline="true" >               
                <el-form-item label="标题">
                    <el-input placeholder="请输入标题" v-model="Gfilters.title" size="small"></el-input>
                </el-form-item>
                <el-form-item label="发布日期">
                      <el-date-picker type="date" placeholder="选择日期" v-model="Gfilters.prePublishTime" size="small"></el-date-picker>
                        -
                      <el-date-picker type="date" placeholder="选择日期" v-model="Gfilters.endPublishTime" size="small"></el-date-picker>
                </el-form-item>
                <el-form-item label="发布者：">
                    <el-input placeholder="请输入发布者" v-model="Gfilters.publisher" size="small"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="Gfilters.publishedStatus" clearable placeholder="请选择状态" style="width:85%" size="small">
                        <el-option v-for="ind in taskStatusList" :label="ind.displayText" :value="ind.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="defaultBtn" @click="searchList">检索</el-button>
                </el-form-item>
             </el-form>
        </div>      
        <div class="contentbox boxshow">
            <div class="searchCon" >  
                <div class="text-right">
                  <el-button class="blueBtn" @click="addNotice">新增</el-button>                                   
                  <el-button class="redBtn" @click="delNotices">删除</el-button>
                </div>                   
                                 <el-table
                                        :data="AnnouncementListData"
                                        border
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader"
                                        v-loading="loading" 
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
                                                <el-button class="tabletoolBtn" v-if="scope.row.publishedStatus === 1" @click="unPublish(scope.row.id,scope.row.publishedStatus)">取消发布</el-button>
                                                <el-button class="tabletoolBtn" v-if="scope.row.publishedStatus === 0" @click="publish(scope.row.id,scope.row.publishedStatus)">发布</el-button>
                                                <el-button class="tabletoolBtn" @click="editNotice(scope.row.id)">编辑</el-button>
                                                <el-button class="tabletoolBtn" @click="delNotice(scope.row.id)">删除</el-button>
                                                <el-button class="tabletoolBtn" v-if="scope.row.isImportant === true" @click="unImportant(scope.row.id,scope.row.isImportant)">取消置顶</el-button>
                                                <el-button class="tabletoolBtn" v-else-if="scope.row.isImportant === false" @click="important(scope.row.id,scope.row.isImportant)">置顶</el-button>
                                              </template>
                                          </el-table-column>
                                        <el-table-column  prop="name" label="附件"  width="80">
                                             <template slot-scope="scope">                                                 
                                                 <i class="fa fa-paperclip tableIcon cur-p" v-if="scope.row.originalFileName && scope.row.attachmentName" @click="downEnclosure(scope.row.attachmentName)"></i> 
                                              </template>
                                        </el-table-column>
                                        <el-table-column prop="title" label="标题">
                                        </el-table-column>
                                         <el-table-column prop="publishDepartment" label="发布部门">                                      
                                        </el-table-column>
                                        <el-table-column prop="address" label="发布状态">  
                                          <template slot-scope="scope">                                                 
                                                <span v-if="scope.row.publishedStatus === 0">未发布</span>
                                                <span v-else-if="scope.row.publishedStatus === 1">已发布</span>
                                                <span v-else-if="scope.row.publishedStatus === 2">撤销</span>
                                          </template>                                    
                                        </el-table-column>
                                        <el-table-column prop="publisher" label="发布人">                                      
                                        </el-table-column>
                                         <el-table-column prop="publishTime" :formatter="dateFormat1" label="发布时间">                                      
                                        </el-table-column>
                                        <el-table-column prop="validDate" :formatter="dateFormat1" label="有效期">                                      
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
                                        :total="AnnouncementListDataTotal">
                                        </el-pagination>
                                    </div>  
                                 
                         
                   
                </div>
        </div> 
        <!-- //新增公告-->
        <el-dialog
          :title = AddTitle
          :visible.sync="noticeAddSetVisible"
         :closeOnClickModal="false"
         :closeOnPressEscape="false"
         top="4%"
          width="50%" class="importListAddDialog">
          <el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
                  <el-form-item label="通知标题：" prop="title">
                          <el-input placeholder="单行输入" size="small" v-model="ruleForm.title"></el-input>
                      </el-form-item>
                      <el-form-item label="通知内容：" prop="content" class="basicItem" >
                        <editor ref="editorRef"  v-model="ruleForm.content"></editor>
                    </el-form-item> 
                      <el-form-item label="附件：">
                          <el-upload
                            class="upload-demo"
                            :action="uploadUrl"
                            :data="uploadType"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handleDeviceSuccess"
                            :before-remove="beforeRemove"
                            multiple
                            :file-list="fileList">
                            <el-button size="small" class="defaultBtn">选择文件</el-button>
                            <span slot="tip" class="el-upload__tip ml20">文件大小不能超过100M</span>
                          </el-upload>
                      </el-form-item>
                      <el-form-item label="是否置顶：">
                           <el-radio-group v-model="isImportant">
                              <el-radio label="是"></el-radio>
                              <el-radio label="否"></el-radio>
                            </el-radio-group>
                      </el-form-item>
                      <el-form-item label="有效期：" prop="validDate">
                          <el-date-picker size="small" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="ruleForm.validDate" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="发布部门：" prop="publishDepartment">
                          <el-input placeholder="单行输入" size="small" v-model="ruleForm.publishDepartment"></el-input>                               
                      </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveAnnouncement('ruleForm')" class="defaultBtn">保存</el-button>
            <el-button @click="noticeAddSetVisible = false" class="defaultBtn">取 消</el-button>
          </span>
        </el-dialog> 
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from './notice.service';
    import { Loading } from 'element-ui';
    import moment from 'moment';
    import Editor from './quillEditor.vue';
    import { State, Getter, Mutation, } from 'vuex-class';                             
    import superSearch from '@/components/superSearch/superSearch.vue';
   @Component({
        components: { 
            superSearch,
            Editor
        },
    })
    export default class appSuperSearch extends Vue{
        @State catNum :number;
        @Mutation('SET_CATNUM') SET_isShow: () => void;
        @Mutation('SET_formType') SET_formType: () => void;
        windowHeight: number= document.documentElement.clientHeight;
        bodyHeight: number= document.documentElement.clientHeight - 320 ;
        radio3: string = '1';
        AnnouncementListData:any = [];
        taskStatusList:any = [];
        fileList:any = [];
        isImportant: string = '是';
        Gfilters:any = {};
        chooseIdS:any = [];
        rules: any = {};
        AddTitle: string = '';
        ruleForm:any = {};
        uploadUrl: string =  process.env.upload_BASEURL + '/file/simple/upload';
        uploadType:any = {
          type:4
        };
        BASEURL: string =  process.env.upload_BASEURL;
        fromType: string = '';
        loadingInstance:any={};
        AnnouncementListDataTotal: number = 0;
        noticeAddSetVisible: Boolean= false;
        iseditNotice: Boolean= false;
        loading: Boolean= false;
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
      tableData: any =[{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
        total: number = 1;
         page: number = 0;
        pageSize: number = 25;                  
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };    
        constructor(){
            super();
            this.Gfilters = {
                title:null,
                prePublishTime:null,
                endPublishTime:null,
                publisher:null,
                publishedStatus:null,
                pageSize:this.pageSize,
                page:this.page,
            }
            this.rules = {
                title: [
                    { required: true, message: '请填写标题', trigger: 'blur' }
                ],
                content:[
                    { required: true, message: '请填写内容', trigger: 'blur' }
                ],
                validDate:[
                    { required: true, message: '请填写有效日期', trigger: 'blur' }
                ],
                publishDepartment:[
                    { required: true, message: '请填写发布部门', trigger: 'blur' }
                ],
            };
            this.ruleForm = {
                title:null,
                content:null,
                attachmentName:null,
                originalFileName:null,
                isImportant:'是',
                validDate:null,
                publishDepartment:null
            }
        };
        @Watch('$store.state.fromType')
          routechange(val) {
            if(val === 'public'){
                this.fromType = 'public';
            } else {
                this.fromType = 'management';
                this.getDictListByDictId();
            }
            // 获取公告中心列表
            this.AnnouncementList(); 
         } 
        superSearchShow(){
           this.$nextTick(() => {
             this.$refs.superSearch.superSearchVisible=true;           
           })          
        }
        handlePreview(file) {
          console.log(file);
        };
        downEnclosure(id) {
                let self = this;
                self['$confirm']('您是否要下载附件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  if(id) {
                    window.location.href = self.BASEURL + '/file/simple/download?fileId='+id+''
                  } else {
                    self.Warn('附件不存在！');
                  }
                });
        }
        handleSelectionChange(val) {
            this.chooseIdS = [];
            for(let item of val) {
                this.chooseIdS.push(item.id);
            }
        }
        // 文件上传成功回调
         handleDeviceSuccess(res, file) {
           this.ruleForm.attachmentName = res.data;
           this.ruleForm.originalFileName = file.name;
        };
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        }
        // 文件删除回调
        handleRemove(file, fileList) {
          this.loadingInstance = Loading.service(
              {
                  lock: true,
                  text: '正在删除中，请稍候',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
              }
          );
          Service.delTempUploadFile({attachmentName:this.ruleForm.attachmentName}).then(res => {
              if(res.data.succeeded){
                  this['$message']({
                      message: '删除成功',
                      type: 'success'
                  });
                  this.AnnouncementList();
              }else{
                  this['$message']({
                      message: '删除失败',
                      type: 'error'
                  });
              }
              this.$nextTick(() => { this.loadingInstance.close();});
          });
        };
        handleCurrentChange(val:number) {
            this.Gfilters.page = val;
            this.AnnouncementList();           
        };
        searchList() {
          this.AnnouncementList();
        }
        addNotice() {
            this.AddTitle = "新增公告"
            this.noticeAddSetVisible = true;
            this.$refs['ruleForm'].resetFields();
            this.fileList = [];
            this.iseditNotice = false;
            this.$refs['editorRef'].content = '';
        }
        editNotice(id) {
            let self = this;
            this.AddTitle = "编辑公告"
            this.noticeAddSetVisible = true;
            this.iseditNotice = true;
            this.fileList = [];
            let loadingInstance = Loading.service(
                  {
                      lock: true,
                      text: '正在获取数据中，请稍等',
                      // spinner: 'el-icon-loading',
                      background: 'rgba(0, 0, 0, 0.7)'
                  }
              );
            Service.showDetail({id:id}).then((res) =>{
                if(res.data.succeeded) {
                    console.log(res.data.data);
                    self.ruleForm = res.data.data;
                    this.$nextTick(() => {
                         this.$refs['editorRef'].content=this.ruleForm.content;
                    })
                    console.log(self.ruleForm);
                    if(res.data.data.isImportant === true) {
                        self.isImportant = '是'
                    } else {
                        self.isImportant = '否'
                    }
                    if(res.data.data.originalFileName && res.data.data.attachmentName) {
                      let obj = {};
                      obj.name = res.data.data.originalFileName;
                      this.fileList.push(obj);
                    } else {
                      this.fileList = [];
                    }
                    
                } else {
                    self.Warn(res.data.errorMessage);
                }
                self.$nextTick(() => { loadingInstance.close();});
            })
        }
        publish(id, publishedStatus) {
            this['$confirm']('您是否要发布所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在发布，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.publish({id:id,publishedStatus:1}).then(res => {
                        if(res.data.succeeded){
                            this['$message']({
                                message: '发布成功',
                                type: 'success'
                            });
                            this.AnnouncementList();
                        }else{
                            this['$message']({
                                message: '发布失败',
                                type: 'error'
                            });
                        }
                        this.$nextTick(() => { this.loadingInstance.close();});
                    });
                });
        }
        important(id, isImportant) {
            this['$confirm']('您是否要置顶所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在置顶，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.important({id:id,isImportant:true}).then(res => {
                        if(res.data.succeeded){
                            this['$message']({
                                message: '置顶成功',
                                type: 'success'
                            });
                            this.AnnouncementList();
                        }else{
                            this['$message']({
                                message: '置顶失败',
                                type: 'error'
                            });
                        }
                        this.$nextTick(() => { this.loadingInstance.close();});
                    });
                });
        }
        unImportant(id, isImportant) {
            this['$confirm']('您是否要取消置顶所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在取消置顶，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.important({id:id,isImportant:false}).then(res => {
                        if(res.data.succeeded){
                            this['$message']({
                                message: '取消置顶成功',
                                type: 'success'
                            });
                            this.AnnouncementList();
                        }else{
                            this['$message']({
                                message: '取消置顶失败',
                                type: 'error'
                            });
                        }
                        this.$nextTick(() => { this.loadingInstance.close();});
                    });
                });
        }
        unPublish(id, publishedStatus) {
            this['$confirm']('您是否要取消发布所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在取消发布，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.publish({id:id,publishedStatus:0}).then(res => {
                        if(res.data.succeeded){
                            this['$message']({
                                message: '取消发布成功',
                                type: 'success'
                            });
                            this.AnnouncementList();
                        }else{
                            this['$message']({
                                message: '取消发布失败',
                                type: 'error'
                            });
                        }
                        this.$nextTick(() => { this.loadingInstance.close();});
                    });
                });
        }
        delNotice(id) {
            this['$confirm']('您是否要删除所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在删除，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    let idStr = ''
                    if(toString.call(id) === '[object Array]') {
                        idStr = id.join(",");
                    } else {
                        idStr = '' + id;
                    }
                    Service.deleteAnnouncement({idStr:idStr}).then(res => {
                        if(res.data.succeeded){
                            this['$message']({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.AnnouncementList();
                        }else{
                            this['$message']({
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                        this.$nextTick(() => { this.loadingInstance.close();});
                    });
                });
        }
        delNotices() {
          if(this.chooseIdS.length === 0) {
            this.Warn("请选择要删除的数据");
          } else {
            this.delNotice(this.chooseIdS);
          }
        }
        // 保存
        saveAnnouncement(ruleForm) {
          let self = this;
          this.$refs[ruleForm].validate((valid)=>{
                if (valid) {
                  if(this.isImportant === '是') {
                      this.ruleForm.isImportant = true;
                  } else {
                      this.ruleForm.isImportant = false;
                  }
                  if(this.iseditNotice) {
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.updateAnnouncement(self.ruleForm).then((res) =>{
                        if(res.data.succeeded) {
                          this.noticeAddSetVisible = false;
                          this.AnnouncementList();
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
                    Service.saveAnnouncement(self.ruleForm).then((res) =>{
                        if(res.data.succeeded) {
                          this.noticeAddSetVisible = false;
                          this.AnnouncementList();
                        } else {
                            self.Warn(res.data.errorMessage);
                        }
                        this.$nextTick(() => { this.loadingInstance.close();});
                    })
                  }
               }
          }) 
        }
        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        };
         //获取公告中心列表
        AnnouncementList() {
            let self = this;
            this.loading = true;
            Service.getAnnouncementList(self.Gfilters).then((res) =>{
                if(res.data.succeeded) {
                    console.log(res.data.data);
                    this.loading = false;
                    self.AnnouncementListData = res.data.data;
                    self.AnnouncementListDataTotal = res.data.totalRecords;
                } else {
                    this.loading = false;
                    self.Warn(res.data.errorMessage);
                }
            })
        }
        //获取公告中心管理，获取检索下拉
        getDictListByDictId() {
            let self = this;
            Service.getDictListByDictId(7).then((res) =>{
                if(res.data.succeeded) {
                    console.log(res.data.data);
                    self.taskStatusList = res.data.data;
                } else {
                    self.Warn(res.data.errorMessage);
                }
            })
        }
        handleSizeChange(val:number) {
            this.Gfilters.pageSize = val;
            this.AnnouncementList();          
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
         //失败信息
        error(message:string){
            this['$message']({
                type: 'error',
                message
            });
        };
        created(){
          // 获取公告中心列表
          this.AnnouncementList(); 
          this.getDictListByDictId(); 
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
   @import '../../../../styles/innerPublic.scss';
   @import '../../../../styles/interacting/notice.scss';
</style>