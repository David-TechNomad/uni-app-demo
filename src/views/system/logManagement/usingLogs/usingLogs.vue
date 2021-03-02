<template>
    <section class="wrapprSection classLevelDescriptionView">
        <div class="mainTitle">
           <span>利用日志</span>
        </div>
        <div class="searchKey boxshow contentbox-full">           
              <el-form :inline="true" class="demo-form-inline">
                  <!-- <table class="">
                    <tbody  class="el-table__body">
                        <tr class="el-table__row"> 
                            <td colspan="1" >                 -->
                                 <el-form-item label="档案馆代码：">
                                    <el-input placeholder="单行输入" size="small" v-model="Gfilters.archiveAgentCode"></el-input>
                                </el-form-item>
                            <!-- </td> -->
                            <!-- <td colspan="1">                  -->
                                <el-form-item label="档号：">
                                    <el-input placeholder="单行输入" size="small" v-model="Gfilters.archiveCode"></el-input>
                                </el-form-item> 
                            <!-- </td>  -->
                            <!-- <td colspan="2" class="text-left" v-if="publicUserType !== 'editPublicUser'">                  -->
                                <el-form-item class="" label="利用时间" ref="year">
                                    <el-date-picker size="small" type="date" format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="Gfilters.startTime"></el-date-picker>
                                    <span style="margin:0 10px">至</span>
                                    <el-date-picker size="small" type="date" format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="Gfilters.endTime" ref="endDate" :picker-options="pickerOptions"></el-date-picker>
                                </el-form-item>
                            <!-- </td>   -->
                            <!-- <td colspan="1">                  -->
                                <el-form-item label="利用途径：" prop="type" class="SelectItem checkName">
                                    <el-select v-model="Gfilters.utilizationWays" placeholder="请选择利用途径：" style="width:85%" size="small">
                                        <el-option label="本地" value="0"></el-option>
                                        <el-option label="远程" value="1"></el-option>
                                    </el-select>
                                </el-form-item>  
                            <!-- </td>  -->
                            <!-- <td colspan="1">                  -->
                                <el-form-item>
                                    <el-button class="defaultBtn" @click="loglistfind">查询</el-button> 
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
                                        <el-table-column prop="applicationNo" label="申请单号" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="archivesAgentCode" label="档案馆代码" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="archiveCode" label="档号" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="searchPerson" label="查档人" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="receptionAttn" label="接待馆经办人" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="collectionAttn" label="馆藏馆经办人" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="collectionReviewer" label="馆藏馆审批人" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="utilizeTime" label="利用时间" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="stampUsedTime" label="用章时间" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="outDate" label="出证时间" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="utilizationWays" label="利用途径" align="left">  
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.utilizationWays=='0'">本地</span>
                                                <span v-if="scope.row.utilizationWays=='1'">远程</span>
                                            </template>                                    
                                        </el-table-column>
                                        <el-table-column prop="applicantType" label="查阅者类型" align="left">                                           
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.applicantType=='0'">正式用户</span>
                                                <span v-if="scope.row.applicantType=='1'">公众用户</span>
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
  import Service from './usingLogs.service';
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
        pickerOptions: any={
            disabledDate: (time) => {
                return this.dealDisabledDate(time)
            }
        };
        activeName:string = 'first';
        tableData: any =[];
        total: number = 0;
        page: number = 0;
        pageSize: number = 25;                  
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };    
        constructor(){
            super();
            this.fileVisible = false;
            this.chooseIdS = [];
            this.Gfilters = {
                archiveAgentCode:null,
                archiveCode:null,
                utilizationWays:null,
                startTime:null,
                endTime:null,
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
            return time.getTime() < this.Gfilters.startTime 
        };
        handleCurrentChange(val:number) {
            this.Gfilters.page = val - 1;
            this.loglistfind();
        };
        handleSizeChange(val:number) {
            this.Gfilters.pageSize = val;
            this.loglistfind();
        };
        loglistfind(){
                Service.utilizeLoglist(this.Gfilters).then((res)=>{
                    if(res.data.succeeded){
                        this.tableData=res.data.data;
                        this.total = res.data.totalRecords;
                    }
                })
        };
        exportData(){
            Service.utilizeExport({
                "idStr":this.chooseIdS.join(","),
                "archiveAgentCode":this.Gfilters.archiveAgentCode,
                "archiveCode":this.Gfilters.archiveCode,
                "utilizationWays":this.Gfilters.utilizationWays,
                "startTime":this.Gfilters.startTime,
                "endTime":this.Gfilters.endTime,
                "page":this.Gfilters.page,
                "pageSize":this.Gfilters.pageSize
            }).then((res)=>{
                let blob = new Blob([res], { type: 'application/vnd.ms-excel' });
                let url = window.URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', '利用日志.xlsx');
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
            debugger;
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
            this.loglistfind();
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