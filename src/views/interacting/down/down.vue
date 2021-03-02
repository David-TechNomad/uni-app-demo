<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>下载中心</span>
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
                <el-form-item>
                    <el-button class="defaultBtn" @click="searchList">检索</el-button>
                </el-form-item>
             </el-form>
        </div>      
        <div class="contentbox boxshow">
            <div class="searchCon">                     
                                 <el-table
                                        :data="downData"
                                        border
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        v-loading="loading"
                                        header-row-class-name="tableHeader" 
                                        stripe 
                                        class="defaultTable">
                                         <el-table-column type="index" width="50" label="序号">
                                          </el-table-column>
                                        <el-table-column  prop="name" label="操作"  width="80">
                                             <template slot-scope="scope">
                                                <el-button class="tabletoolBtn" @click="downEnclosure(scope.row.serverSaveFilename,scope.row.id)">下载</el-button>
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
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from './down.service';
    import { Loading } from 'element-ui';
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
        bodyHeight: number= document.documentElement.clientHeight - 300; 
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
        BASEURL: string =  process.env.API_BASEURL;
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
            this.ruleForm = {
                title:null,
                content:null,
                attachmentName:null,
                originalFileName:null,
                isImportant:'是',
                validDate:null,
                publishDepartment:null
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
            this.Gfilters = {
                downloadFileName:'',
                fileCategory:'0',
                publishStatus:1,
                pageSize:this.pageSize,
                page:this.page,
            }
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
        downEnclosure(fileId,id) {
              let self = this;
              self['$confirm']('您是否要下载文件?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                if(id) {
                  window.location.href = self.BASEURL + '/downloadInfo/download?fileId='+fileId+'&id='+id
                } else {
                  self.Warn('文件不存在！');
                }
              });
        }
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
         
        };
        superSearchShow(){
          //  this.$nextTick(() => {
          //    this.$refs.superSearch.superSearchVisible=true;           
          //  })          
        }
        // 文件上传成功回调
         handleDeviceSuccess(res, file) {
          //  this.ruleForm.attachmentName = res.data;
          //  this.ruleForm.originalFileName = file.name;
        };
        beforeRemove(file, fileList) {
          // return this.$confirm(`确定移除 ${ file.name }？`);
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
          
        }
        delDowns(id){
          
        }
        handleCurrentChange(val:number) {
            this.page = val;
            this.getDownloadInfoList();        
        };
        handleSizeChange(val:number) {
            this.pageSize = val;
            this.getDownloadInfoList();        
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
          this.getDownloadInfoList();
          this.dicgetDictListByDictId();
          this.dicgetDictListByDictId2();     
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 300;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>  
   @import '../../../styles/innerPublic.scss';
   @import '../../../styles/interacting/notice.scss'
</style>