<template>
    <section class="wrapprSection classLevelDescriptionView">
        <div class="mainTitle">
           <span>印章管理</span>
        </div>
        <div class="searchKey boxshow contentbox-full">           
              <el-form :inline="true" >
                <el-form-item label="档案馆代码：">
                    <el-input placeholder="单行输入" size="small" v-model="Gfilters.archivesAgentCode"></el-input>
                </el-form-item> 
                <!-- <el-form-item label="激活状态：">
                    <el-select  placeholder="全部" size="small">
                        <el-option label="激活" value="0"></el-option>
                        <el-option label="未激活" value="1"></el-option>
                    </el-select>
                </el-form-item>                -->
                <el-form-item>
                    <el-button class="defaultBtn" @click="searchStamp()">查询</el-button> 
                </el-form-item>
             </el-form>
        </div>
        <div class="contentbox boxshow">
            
            <div class="searchCon"> 
                <div class="ta-r">     
                    <el-button class="blueBtn" @click="addStamp()">新增</el-button> 
                    <el-button class="redBtn">删除</el-button>
                </div>
                                   <el-table
                                        :data="stampData"
                                        border
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader"
                                        v-loading="loading"  
                                        stripe 
                                        class="defaultTable mt10">
                                        <el-table-column type="selection"  width="55">
                                        </el-table-column>  
                                        <el-table-column  prop="name" label="操作"  width="150">
                                             <template slot-scope="scope">                                                 
                                                 <el-button class="tabletoolBtn" @click="editStamp(scope.row)">编辑</el-button>
                                                <el-button class="tabletoolBtn" @click="delStamp()">删除</el-button>
                                              </template>
                                        </el-table-column>
                                        <!-- <el-table-column prop="name" label="印章编号" align="left">                                            -->
                                        <!-- </el-table-column> -->
                                        <el-table-column prop="archivesAgentCode" label="档案馆代码" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="archivesAgentName" label="档案馆名称" align="left">                                           
                                        </el-table-column>
                                        <!-- <el-table-column prop="stamp_type" label="印章类型" align="left">
                                            <template slot-scope="scope">                                                 
                                               <span v-if="scope.row.stamp_type ===0">公章</span>
                                               <span v-else-if="scope.row.stamp_type ===1">方章</span>
                                               <span v-else-if="scope.row.stamp_type ===2">用党章</span>
                                            </template>                                           
                                        </el-table-column> -->
                                        <!-- <el-table-column prop="name" label="印章版本" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="name" label="激活状态" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="name" label="生效日期" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="name" label="废止日期" align="left">                                           
                                        </el-table-column> -->
                                        <el-table-column prop="height" label="高度" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="width" label="宽度" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="upLoadPerson" label="上传责任人" align="left">                                           
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
                                        :total="stampDataTotal">
                                        </el-pagination>
                                    </div>     
                                 
                         
                   
                </div>
        </div> 
        <el-dialog class="myDialogCenter" width='30%' :closeOnClickModal="false" :closeOnPressEscape="false" :title="dialogText" :visible.sync="fileVisible" :close-on-click-modal="true">
                <div class="scrollCon formDiv">
                    <div class="tableCon addLevelDescriptionDialog">
                        <div class="sealInformationView">
                            <h4>印章详情</h4>
                            <div class="mt20 ml20">
                                <img :src="fileForm1.seal || noPic" class='lt' alt="" style="width:150px;height:150px;border-radius:50%;">
                                <img :src="fileForm1.seal || noPic" class='lt cur-p imgDragViewTZ' alt="" style="position: absolute;top: 219px;z-index: 2;" v-show="showImgPopoverT" @click="showImgPopoverT = false">
                                <div class='lt wp-40 ml20 mt20'>
                                    <el-upload
                                        class="upload-demo d-ib"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :on-change="getFile"
                                        :before-upload="beforeAvatarUpload"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        >
                                        <el-button size="small" class="defaultBtn">点击上传</el-button>
                                    </el-upload>
                                    <el-button class="defaultBtn" @click="showImgPopover">查看原图</el-button> 
                                    <div class="mt20 imgInformation">
                                        <p>图片信息</p>
                                        <p>图片大小：
                                            <span v-if="fileForm1.size && fileForm1.size > 1024">{{(fileForm1.size / 1024).toFixed(2)}} kb</span>
                                            <span v-else-if="fileForm1.size && fileForm1.size > 1024 * 1024">{{(fileForm1.size / (1024 * 1024)).toFixed(2)}} M </span>
                                            <span v-else>{{ fileForm1.size || 0 }} b </span>
                                        </p>
                                        <p>图片尺寸：{{fileForm1.width || 0 }} px X {{fileForm1.height || 0}} px</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-form :model="fileForm1" :rules="ruleForm1" ref="fileForm1" label-width="120px">
                            <table class="el-table defaultTable">
                                <tbody  class="el-table__body">
                                    <tr class="el-table__row archivesAgentCodeView"> 
                                        <td colspan="2" >                
                                            <el-form-item label="所属档案馆：">
                                               <treeselect v-model="fileForm1.archivesAgentCode" @select="selectFunc" :clearable="false" placeholder="请选择" :searchable="true" :options="options" :normalizer="normalizer"></treeselect>
                                            </el-form-item>
                                        </td>
                                        <!-- <td colspan="2">                 
                                            <el-form-item label="印章类型：">
                                                <el-select  placeholder="全部" size="small" style="width:100%" v-model="fileForm1.stamp_type">
                                                    <el-option label="公章" value="0"></el-option>
                                                    <el-option label="方章" value="1"></el-option>
                                                    <el-option label="用档章" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </td>           -->
                                    </tr>
                                    <!-- <tr class="el-table__row archivesAgentCodeView"> 
                                        <td colspan="2" >                
                                            <el-form-item label="生效日期：">
                                                <el-date-picker type="date" size="small" placeholder="选择日期" v-model="fileForm1.fondPeriod" style="width: 100%;"></el-date-picker>
                                            </el-form-item>
                                        </td>
                                        <td colspan="2">                 
                                            <el-form-item label="废止日期：">
                                                <el-date-picker type="date" size="small" placeholder="选择日期" v-model="fileForm1.fondPeriod" style="width: 100%;"></el-date-picker>
                                            </el-form-item>
                                        </td>          
                                    </tr>  -->
                                    <!-- <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="激活状态：">
                                                <el-radio-group style="width:100%;text-align: left;" v-model="fileForm1.status">
                                                    <el-radio label="激活"></el-radio>
                                                    <el-radio label="未激活"></el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </td>       
                                    </tr>  -->
                                    <!-- <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="印章版本号：" class="SelectItem checkName">
                                                <el-input class="checkName percentName" size="small" readonly></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr>  -->
                                </tbody>
                            </table>
                        </el-form>
                        <!-- <div class="mt10 border-c8c8cb pd10" v-if="isEditStamp">
                            <h4>印章版本列表</h4>
                            <div class="searchCon">
                                <el-table
                                    :data="stampData"
                                    border
                                    height="200px"
                                    element-loading-text="努力加载中..."
                                    header-row-class-name="tableHeader" 
                                    stripe 
                                    class="defaultTable mt10"> -->
                                    <!-- <el-table-column prop="name" label="印章编号" align="left">                                           
                                    </el-table-column> -->
                                    <!-- <el-table-column prop="archivesAgentCode" label="档案馆代码" align="left">                                           
                                    </el-table-column>
                                    <el-table-column prop="archivesAgentName" label="档案馆名称" align="left" >                                           
                                    </el-table-column>
                                    <el-table-column prop="name" label="印章类型" align="left">  
                                        <template slot-scope="scope">                                                 
                                            <span v-if="scope.row.stamp_type ===0">公章</span>
                                            <span v-else-if="scope.row.stamp_type ===1">方章</span>
                                            <span v-else-if="scope.row.stamp_type ===2">用党章</span>
                                        </template>                                          
                                    </el-table-column> -->
                                    <!-- <el-table-column prop="name" label="激活状态" align="left">                                           
                                    </el-table-column>
                                    <el-table-column prop="name" label="生效日期" align="left">                                           
                                    </el-table-column>
                                    <el-table-column prop="name" label="废止日期" align="left">                                           
                                    </el-table-column> -->
                                <!-- </el-table>  -->
                            <!-- </div> -->
                        <!-- </div> -->
                    </div>
                </div>
                <div slot="footer" class="dialog-footer diaFoot">
                    <el-button type="primary" class="defaultBtn" @click="saveStamp('fileForm1')">保存</el-button>
                    <el-button class="defaultBtn" @click="fileVisible = false">取消</el-button>
                </div>
            </el-dialog>
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';
   import noPicIcon from '@/imgs/noPic.jpg';   
   import Treeselect from '@riophae/vue-treeselect'
   import '@riophae/vue-treeselect/dist/vue-treeselect.css'
   import { Loading } from 'element-ui';
  import Service from './sealManagement.service';
   @Component({
       components:{
           Treeselect
       }
   })
    export default class appSuperSearch extends Vue{  
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 321 ; 
        radio3: string = '1';
        fileVisible: boolean;
        imgSize: string = '0';
        options:any = [];
        imgWidth : string = '0';
        imgHeight: string = '0';
        stampDataTotal: number= 0 ;
        isEditStamp: Boolean= false;
        loading: Boolean= false;
        ruleForm1: any = {};
        fileList: any = [];
        loadingInstance:any={};
        stampData: any = [];
        showImgPopoverT: Boolean= false;
        noPic: string = noPicIcon;
        dialogText: string = '';
        Gfilters:any = {};
        fileForm1: any = {};
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
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 4,
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
            this.fileVisible = false;
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
             this.fileForm1 = {
                    archivesAgentCode:window.sessionStorage.getItem('archiveAgentCode'),
                    height:0,
                    width:0,
                    archivesAgentName:'',
                    seal:this.noPic,
                    size:0
                };
                this.stampData = [];
                this.Gfilters = {
                    pageSize:this.pageSize,
                    pageNumber:this.page,
                    archivesAgentCode:""
                }
                this.ruleForm1 = {
                    fondName:[
                        { required: true, message: '请填写全宗名称', trigger: 'blur' }
                    ],
                    fondCode:[
                        { required: true, message: '请填写全宗号', trigger: 'blur' }
                    ],
                };
        };
 
        handleCurrentChange(val:number) {
            this.Gfilters.pageNumber = val - 1;
            this.findAllStamp();          
        };
        handleSizeChange(val:number) {
            this.Gfilters.pageSize = val;
            this.findAllStamp();    
        };
        normalizer(node) {
            return {
                id: node.archiveAgentCode,
                label: node.archiveAgentName,
                children: node.children
            }
        }
        searchStamp() {
            this.findAllStamp();
        };
        showImgPopover() {
            this.showImgPopoverT = true;
        }
        diGuiTree(item) {  //递归档案馆树结构
            item.forEach(item => {
                item.children.length == 0 ?
                    delete item.children : this.diGuiTree(item.children);
            })
        }
        getArchiveAgenterTree () {
            //获取档案馆
            Service.archiveAgenterTree({}).then((res) =>{
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
        }
        //查询当前档案馆所有印章
        findStampByArchivesAgentCode() {
            let self =this;
            this.loading = true;
            Service.findStampByArchivesAgentCode({}).then((res) =>{
                if(res.data.succeeded) {
                    console.log(res.data.data);
                } else {
                    this.loading = false;
                    self.Warn(res.data.errorMessage);
                }
            })
        }
        //查询所有印章
        findAllStamp() {
            let self =this;
            this.loading = true;
            Service.findAllStamp(this.Gfilters).then((res) =>{
                if(res.data.succeeded) {
                    this.loading = false;
                    this.stampData = res.data.data.content;
                    this.stampDataTotal = res.data.data.totalElements
                } else {
                    this.loading = false;
                    self.Warn(res.data.errorMessage);
                }
            })
        }
        selectFunc(val) {
            this.fileForm1.archivesAgentName = val.archiveAgentName;
        }
        saveStamp() {
            let self =this;
            this.loadingInstance = Loading.service(
              {
                  lock: true,
                  text: '正在保存中，请稍候',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
              }
            );
            if(this.isEditStamp) {
                Service.updateStamp(this.fileForm1).then((res) =>{
                    if(res.data.succeeded) {
                        self.Suces('保存成功。');
                        this.fileVisible = false;
                        this.findAllStamp();
                    } else {
                        this.fileVisible = false;
                        self.Warn(res.data.errorMessage);
                    }
                    this.$nextTick(() => { this.loadingInstance.close();});
                })
            } else {
                Service.saveStamp(this.fileForm1).then((res) =>{
                    if(res.data.succeeded) {
                        self.Suces('保存成功。');
                        this.fileVisible = false;
                        this.findAllStamp();
                    } else {
                        this.fileVisible = false;
                        self.Warn(res.data.errorMessage);
                    }
                    this.$nextTick(() => { this.loadingInstance.close();});
                })
            }
            
        }
        handleAvatarSuccess(res, file) {
            let self = this;
            this.fileForm1.size = file.size;
            this.noPic = URL.createObjectURL(file.raw);
            //读取图片数据
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                //加载图片获取图片真实宽度和高度
                var image = new Image();
                image.onload=function(){
                    self.fileForm1.width = image.width;
                    self.fileForm1.height = image.height;
                };
                image.src= data;
            };
            reader.readAsDataURL(file.raw);
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
        // 获取上传的文件
        getFile(file, fileList) {
            let self = this;
            if(file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png' || file.raw.type === 'image/gif' || file.raw.type === 'image/bmp') {
                this.getBase64(file.raw).then(res => {
                    self.fileForm1.seal = res;
                });
            }
        }
        beforeAvatarUpload(file) {
          // ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
            const isImage= file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isImage) {
                this.$message.warning('上传头像只能是 图片 格式!');
                return false;
            }
            if (!isLt2M) {
                this.$message.warning('上传头像图片大小不能超过 2MB!');
                return false;
            }
                return isImage && isLt2M;
      }
        addStamp(obj){
            this.dialogText = '新增印章信息'
            this.isEditStamp = false;
            this.fileVisible = true;
            this.$refs['fileForm1'].resetFields();
            this.fileForm1 = {
                archivesAgentCode:window.sessionStorage.getItem('archiveAgentCode'),
                height:0,
                width:0,
                xpoint:'',
                ypoint:'',
                seal:this.noPic,
                stamp_type:'',
                archivesAgentName:''
            };
        };
        editStamp(obj){
            this.dialogText = '编辑印章信息'
            this.isEditStamp = true;
            this.fileVisible = true;
            this.fileForm1 = obj;
            // for(let item in obj) {
            //     this.fileForm1.item = '' + obj[item];
            // }
        };
        handleRemove(file, fileList) {
            console.log(file, fileList);
        };
        handlePreview(file) {
            console.log(file);
        }
        delStamp() {
                this['$confirm']('您是否要删除所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                     
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
            //查询所有印章
            this.findAllStamp();
            //查询当前档案馆所有印章
            this.findStampByArchivesAgentCode(); 
            //获取档案馆
            this.getArchiveAgenterTree();         
        };
        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 321;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
@import '../../../styles/innerPublic.scss';
@import '../../../styles/system/classLevelDescription/classLevelDescription.scss';
  .addLevelDescriptionDialog{
        // max-height: 750px;
        // overflow-y: auto;
        padding: 5px;
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
    .sealInformationView {
        .imgInformation {
            p {
                margin-top: 10px;
            }
        }
    }
    .archivesAgentCodeView {
        .vue-treeselect {
            line-height: 1;
            .vue-treeselect__single-value {
                line-height: 30px;
            }
        }
    }
</style>