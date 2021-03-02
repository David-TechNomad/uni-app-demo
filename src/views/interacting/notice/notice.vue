<template>
    <section class="wrapprSection noticeView">
        <div class="mainTitle">
           <span>公告中心</span>
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
                <el-form-item>
                    <el-button class="defaultBtn" @click="searchList">检索</el-button>
                </el-form-item>
             </el-form>
        </div>   
        <div class="contentbox boxshow">
            <div class="searchCon" >    
                                 <el-table
                                        :data="AnnouncementListData"
                                        border
                                        :height="bodyHeight2"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader"
                                        v-loading="loading" 
                                        @selection-change="handleSelectionChange"
                                        stripe 
                                        @row-dblclick="handleRowDblclick"
                                        class="defaultTable">
                                         <el-table-column type="index" width="50" label="序号">
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
                                         <el-table-column prop="publishTime" :formatter="dateFormat1" label="发布时间">                                      
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
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from './notice.service';
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
        @Mutation('SET_formType') SET_formType: () => void;
        windowHeight: number= document.documentElement.clientHeight;
        bodyHeight2: number= document.documentElement.clientHeight - 300 ; 
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
                publishedStatus:1,
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
        handleRowDblclick(row, event){
            this.$router.push({
                path:'/interacting/notice/noticeDetail',
                name:'公告中心详情',
                params: {
                  id:row.id
                }
            });
        };
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
        };
        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight2 = document.documentElement.clientHeight - 300;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>  
   @import '../../../styles/innerPublic.scss';
   @import '../../../styles/interacting/notice.scss';
</style>