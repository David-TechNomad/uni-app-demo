<template>
    <section class="wrapprSection classLevelDescriptionView">
        <div class="mainTitle">
           <span>检测与入库日志</span>
        </div>
        <div class="searchKey boxshow contentbox-full">           
              <el-form :inline="true" >
                <el-form-item label="入库审核者：">
                    <el-input placeholder="单行输入" v-model="Gfilters.reviewer" size="small"></el-input>
                </el-form-item> 
                <el-form-item class="" label="入库日期" ref="year">
                    <el-date-picker size="small" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="Gfilters.storageDateStart"></el-date-picker>
                    <span style="margin:0 10px">至</span>
                    <el-date-picker size="small" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="Gfilters.storageDateEnd" ref="endDate" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>            
                <el-form-item>
                    <el-button class="defaultBtn" @click="findList">查询</el-button> 
                </el-form-item>
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
                                        <el-table-column prop="taskWorkId" label="任务单号" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="archivesAgentName" label="档案馆代码" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="archivesAgentName" label="档案馆名称" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="taskType" label="任务类型" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="totalCount" label="上传数量" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="fondCode" label="全宗号" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="categoryCode" label="门类号" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="rank" label="级别" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="reviewer" label="入库审核者" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="storageDate" label="入库时间" align="left">
                                            <template slot-scope="scope">
                                                {{datatime(scope.row.storageDate)}}
                                            </template>                                            
                                        </el-table-column>
                                       <el-table-column label="操作" align="left">
                                           <template slot-scope="scope">
                                               <el-button class="tabletoolBtn" @click="detail(scope.row)">详细</el-button>
                                           </template>
                                       </el-table-column>
                                    </el-table>  
                                    <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="Gfilters.pageSize"
                                        layout="total, sizes,prev,pager, next, jumper"
                                        :total="total">
                                        </el-pagination>
                                    </div>     
                                 
                         
                   
                </div>
        </div>

        <el-dialog title="标准化检测与入库日志详细信息"
                   :visible.sync="fileVisible"
                   class="myDialogCenter"
                   :close-on-click-modal="false"
                   :show-close="true" width="80%" top="1%">

            <el-table
                    :data="tableDataDetail"
                    border
                    :height="bodyHeight"
                    @selection-change="handleSelectionChange"
                    element-loading-text="努力加载中..."
                    header-row-class-name="tableHeader"
                    stripe
                    class="defaultTable mt10">
                <el-table-column prop="archivesAgentCode" label="档案馆代码" align="left">
                </el-table-column>
                <el-table-column prop="taskWorkId" label="任务单号" align="left">
                </el-table-column>
                <el-table-column prop="fondCode" label="全宗号" align="left">
                </el-table-column>
                <el-table-column prop="categoryCode" label="门类号" align="left">
                </el-table-column>
                <el-table-column prop="checkObjectType" label="任务类型" align="left">
                    <template slot-scope="scope">
                        <span v-show="scope.row.checkObjectType == 1">目录</span>
                        <span v-show="scope.row.checkObjectType == 2">目录数据+数字副本</span>
                        <span v-show="scope.row.checkObjectType == 3">电子档案及其元数据</span>
                    </template>
                </el-table-column>
                <el-table-column prop="checkFaultNumber" label="检测错误数" align="left">
                </el-table-column>
                <el-table-column prop="errorTypes" label="错误类型" align="left">
                </el-table-column>
                <el-table-column prop="uploadTotalCount" label="上传总条目数" align="left">
                </el-table-column>
                <el-table-column prop="checkStartTime" label="检测开始事时间" align="left">
                    <template slot-scope="scope">
                        {{datatime(scope.row.checkStartTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="checkEndTime" label="检测完成时间" align="left">
                    <template slot-scope="scope">
                        {{datatime(scope.row.checkEndTime)}}
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <div class="clear" style="margin-top:10px;text-align: left;margin-left: 20px">
                    <el-pagination
                            @size-change="handleSizeChangeDetail"
                            @current-change="handleCurrentChangeDetail"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="total, sizes,prev,pager, next, jumper"
                            :total="totalDetail">
                    </el-pagination>
                </div>
            </div>
        </el-dialog>
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';
   import noPicIcon from '@/imgs/noPic.jpg';   
  import Service from './monitoringWarehousing.service';
   @Component
    export default class appSuperSearch extends Vue{  
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 320 ; 
        radio3: string = '1';
        fileVisible: boolean;
       tableDataDetail:any = [];
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
      activeName:string = 'first';
      tableData: any =[];
      detailObj:any = {};
        total: number = 0;
         page: number = 0;
        pageSize: number = 20;
       totalDetail:number;
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
            this.tableDataDetail = [];
            this.chooseIdS = [];
            this.detailObj = {};
            this.Gfilters = {
                reviewer:"",
                storageDateStart:null,
                storageDateEnd:null,
                page: 0,
                pageSize: 20,
            }
            this.totalDetail = 0;
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
            return time.getTime() < this.Gfilters.storageDateStart 
        };
        handleCurrentChange(val:number) {
            this.Gfilters.page = val - 1;
            this.findList();
        };
        handleSizeChange(val:number) {
            this.Gfilters.pageSize = val;
            this.findList();
        };

       handleCurrentChangeDetail(val:number) {
           this.page = val - 1;
           this.getDetail();
       };
       handleSizeChangeDetail(val:number) {
           this.pageSize = val;
           this.getDetail();
       };

        findList(){
            Service.getPlanInfoDataStorageLogList(this.Gfilters).then((res)=>{
                if(res.data.succeeded){
                    this.tableData=res.data.data.data;
                    this.total = res.data.data.totalRecords;
                }
            })
        };
        datatime(time){
            var d = new Date(time);
            var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            return times
        };
        exportData(){
            Service.taskExport({
                "idStr":this.chooseIdS.join(","),
                "reviewer":this.Gfilters.reviewer,
                "storageDateStart":this.Gfilters.storageDateStart ,
                "storageDateEnd":this.Gfilters.storageDateEnd ,
                "page":this.Gfilters.page ,
                "pageSize":this.Gfilters.pageSize
            }).then((res)=>{
                let blob = new Blob([res], { type: 'application/vnd.ms-excel' });
                let url = window.URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', '检测与入库日志.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
        };
        handleSelectionChange(val) {
            this.chooseIdS = [];
            for(let item of val) {
                this.chooseIdS.push(item.taskWorkId);
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

       detail(row){
           this.detailObj = row;
           this.getDetail();
       }

       getDetail(){
           Service.getDataLogStandardCheckLogList({
               taskWorkId:this.detailObj.taskWorkId,
               page:this.page,
               pageSize:this.pageSize
           }).then((res)=>{
               this.tableDataDetail = res.data.data.data;
               this.totalDetail = res.data.data.totalRecords;
           })
           this.fileVisible = true;
       }

        created(){
            this.findList();
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