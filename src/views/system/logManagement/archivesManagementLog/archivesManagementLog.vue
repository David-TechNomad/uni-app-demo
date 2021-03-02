<template>
    <section class="wrapprSection classLevelDescriptionView">
        <div class="mainTitle">
           <span>档案资源管理行为采集日志</span>
        </div>
        <div class="searchKey boxshow contentbox-full">           
              <el-form :inline="true" class="demo-form-inline">
                  <!-- <table class="">
                    <tbody  class="el-table__body">
                        <tr class="el-table__row"> 
                            <td colspan="1" >                 -->
                                 <el-form-item label="操作用户名：">
                                    <el-input placeholder="单行输入" size="small" v-model="Gfilters.userName"></el-input>
                                </el-form-item>
                            <!-- </td> -->
                            <!-- <td colspan="1">                  -->
                                
                            <!-- </td>  -->
                            <!-- <td colspan="2" class="text-left" v-if="publicUserType !== 'editPublicUser'">                  -->
                                <el-form-item class="" label="操作时间：" ref="year">
                                    <el-date-picker size="small" type="date" format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="Gfilters.actionDateStart"></el-date-picker>
                                    <span style="margin:0 10px">至</span>
                                    <el-date-picker size="small" type="date" format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="Gfilters.actionDateEnd" ref="endDate" :picker-options="pickerOptions"></el-date-picker>
                                </el-form-item>
                            <!-- </td>   -->
                            <!-- <td colspan="1">                  -->
                                <el-form-item label="操作类型："  class="SelectItem checkName">
                                    <el-select v-model="Gfilters.actionId" placeholder="请选择操作类型：" style="width:85%" size="small">
                                        <el-option label="增加" value="1"></el-option>
                                        <el-option label="修改" value="2"></el-option>
                                        <el-option label="删除" value="3"></el-option>
                                        <el-option label="查询" value="4"></el-option>
                                        <el-option label="电子文件阅览" value="5"></el-option>
                                        <el-option label="原文下载" value="6"></el-option>
                                        <el-option label="鉴定" value="7"></el-option>
                                    </el-select>
                                </el-form-item>  
                            <!-- </td>  -->
                            <!-- <td colspan="1">                  -->
                                <el-form-item>
                                    <el-button class="defaultBtn" @click="collectionfind">查询</el-button> 
                                </el-form-item>
                            <!-- </td>               -->
                        <!-- </tr>  -->
                    <!-- </tbody> -->
                <!-- </table> -->
             </el-form>
        </div>
        <div class="contentbox boxshow">
            
            <div class="searchCon"> 
                <div class="ta-r">     
                    <el-button class="defaultBtn" @click="exportData()">导出</el-button>
                </div>
                                   <el-table
                                        :data="tableData"
                                        border
                                        :height="bodyHeight"
                                        @selection-change="handleSelectionChange"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader" 
                                        stripe 
                                        class="defaultTable mt10">
                                        <el-table-column type="selection"  width="55">
                                        </el-table-column> 
                                        <el-table-column prop="archivesAgentCode" label="档案馆代码" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="userName" label="登录用户名" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="categoryName" label="档案门类" align="left">                                           
                                        </el-table-column>
                                       <el-table-column prop="actionId" label="操作类型" align="left">
                                           <template slot-scope="scope">
                                               <span v-show="scope.row.actionId == 1">增加</span>
                                               <span v-show="scope.row.actionId == 2">修改</span>
                                               <span v-show="scope.row.actionId == 3">删除</span>
                                               <span v-show="scope.row.actionId == 4">查询</span>
                                               <span v-show="scope.row.actionId == 5">电子文件阅览</span>
                                               <span v-show="scope.row.actionId == 6">原文下载</span>
                                               <span v-show="scope.row.actionId == 7">鉴定</span>
                                           </template>
                                       </el-table-column>
                                        <el-table-column prop="actionContent" label="操作内容" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="manageProcess" label="档案日志管理过程" align="left">
                                            <template slot-scope="scope">
                                                <span v-show="scope.row.manageProcess == 1">数据增删改</span>
                                                <span v-show="scope.row.manageProcess == 2">著录</span>
                                                <span v-show="scope.row.manageProcess == 3">数据批量上传</span>
                                                <span v-show="scope.row.manageProcess == 4">格式转换</span>
                                                <span v-show="scope.row.manageProcess == 5">封装</span>
                                                <span v-show="scope.row.manageProcess == 6">鉴定</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="actionDateTime" label="操作时间" align="left">
                                            <template slot-scope="scope">
                                                {{datatime(scope.row.actionDateTime)}}
                                            </template>                                           
                                        </el-table-column>
                                    </el-table>  
                                    <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="Gfilters.pageSize"
                                        layout="total, sizes, prev,pager, next, jumper"
                                        :total="total">
                                        </el-pagination>
                                    </div>     
                                 
                         
                   
                </div>
        </div> 
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';
   import noPicIcon from '@/imgs/noPic.jpg';   
  import Service from './archivesManagementLog.service';
   @Component
    export default class appSuperSearch extends Vue{  
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 320 ; 
        radio3: string = '1';
        fileVisible: boolean;
        imgSize: string = '0';
        imgWidth : string = '0';
        imgHeight: string = '0';
        ruleForm1: any = {};
        chooseIdS: any = [];
        fileList: any = [];
        Gfilters:any = {};
        noPic: string = noPicIcon;
        dialogText: string = '';
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
      tableData: any =[];
        total: number = 0;
         page: number = 0;
        pageSize: number = 25;                  
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };
        pickerOptions: any={
            disabledDate: (time) => {
                return this.dealDisabledDate(time)
            }
        };    
        constructor(){
            super();
            this.fileVisible = false;
            this.chooseIdS = [];
            this.Gfilters = {
                userName:null,
                actionId:null,
                actionDateStart:null,
                actionDateEnd:null,
                page:this.page,
                pageSize:this.pageSize
            }
            
             this.fileForm1 = {
                    isEscrow:'true',
                    parentName:'',
                    isProjectCompany:'',
                    regionName:'',
                    escrowFonds:'',
                    id:'',
                    comments:'',
                    date1:'',
                    status:'',
                    orgShortName:'',
                    photo:''
                };
                this.ruleForm1 = {
                    fondName:[
                        { required: true, message: '请填写全宗名称', trigger: 'blur' }
                    ],
                    fondCode:[
                        { required: true, message: '请填写全宗号', trigger: 'blur' }
                    ],
                };
        };
        dealDisabledDate (time) {
            return time.getTime() < this.Gfilters.actionDateStart 
        };
        handleCurrentChange(val:number) {
            this.Gfilters.page = val -1;
            this.collectionfind();
        };
        handleSizeChange(val:number) {
            this.Gfilters.pageSize = val;
            this.collectionfind();
        };
        collectionfind(){
            Service.getArchiveActionLogList(this.Gfilters).then((res)=>{
                if(res.data.succeeded){
                    this.tableData=res.data.data;
                    this.total = res.data.totalRecords;
                }
            })
        }
        datatime(time){
            var d = new Date(time);
            var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            return times
        };
        exportData(){
            Service.archiveActionExport({
                "idStr":this.chooseIdS.join(","),
                "userName":this.Gfilters.userName,
                "actionId":this.Gfilters.actionId,
                "actionDateStart":this.Gfilters.actionDateStart,
                "actionDateEnd":this.Gfilters.actionDateEnd,
                "page":this.Gfilters.page,
                "pageSize":this.Gfilters.pageSize
            }).then((res)=>{
                let blob = new Blob([res], { type: 'application/vnd.ms-excel' });
                let url = window.URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', '档案资源管理行为采集日志.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
        };
        handleSelectionChange(val) {
            this.chooseIdS = [];
            for(let item of val) {
                this.chooseIdS.push(item.id);
            }
        }
        handleAvatarSuccess(res, file) {
            let self = this;
            this.imgSize = (file.size / 1024).toFixed(2);
            this.noPic = URL.createObjectURL(file.raw);
            //读取图片数据
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                //加载图片获取图片真实宽度和高度
                var image = new Image();
                image.onload=function(){
                    self.imgWidth = image.width;
                    self.imgHeight = image.height;
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
        this.getBase64(file.raw).then(res => {
            console.log(res)
            self.fileForm1.photo = res;
        });
        }
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
        addClassLevel(obj){
            this.dialogText = '新增印章信息'
            this.fileVisible = true;
        };
        editClassLevel(obj){
            this.dialogText = '编辑印章信息'
            this.fileVisible = true;
        };
        handleRemove(file, fileList) {
            console.log(file, fileList);
        };
        handlePreview(file) {
            console.log(file);
        }
        delClassLevel() {
                this['$confirm']('您是否要删除所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                     
                });
            }
        created(){
            this.collectionfind();
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
@import '../../../../styles/system/logManagement/logManagement.scss';
  .addLevelDescriptionDialog{
        max-height: 750px;
        overflow-y: auto;
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
</style>