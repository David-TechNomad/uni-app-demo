<template>
    <section class="wrapprSection dataCollection">
        <div class="mainTitle">
           <span>数据采集</span>
        </div>   
        <div class=""> 
                          <div class="searchKey boxshow">           
                              <el-form :inline="true" >                                   
                                  <el-form-item label="任务单号：">
                                      <el-input placeholder="单行输入" v-model="Gfilters.taskNumber" size="small"></el-input>
                                  </el-form-item>
                                <el-form-item class="" label="提交日期：" ref="year">
                                    <el-date-picker size="small" type="date" @change="PchangeDate" format="yyyyMMdd"  value-format="yyyyMMdd" ref="startDate" placeholder="开始日期" class="checkName" v-model="Gfilters.startCreateDate"></el-date-picker>
                                    <span style="margin:0 10px">至</span>
                                <!-- <el-date-picker type="date" @change="changeDate1" :picker-options="dateOptions" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filters.appEndDate" ref="endDate"></el-date-picker>  -->
                                    <el-date-picker size="small" type="date" @change="PchangeDate1" format="yyyyMMdd"  value-format="yyyyMMdd" class="checkName" placeholder="结束日期" v-model="Gfilters.endCreateDate" ref="endDate"></el-date-picker>
                                </el-form-item>
                                  <el-form-item label="状态：" prop="fondName" class="SelectItem checkName">
                                        <el-select v-model="Gfilters.taskStatus" clearable placeholder="请选择任务状态" @change="selectGet" style="width:85%" size="small">
                                            <el-option v-for="ind in taskStatusList" :label="ind.value" :value="ind.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                      <el-button class="defaultBtn" @click="searchImportList">查询</el-button>
                                  </el-form-item>
                              </el-form>
                          </div>
                          <div class="pd10 boxshow bgwhite">
                              <div class="text-right">
                                <el-button class="blueBtn" @click="showImportList">新建任务</el-button>                                   
                                <el-button class="redBtn" @click="delTaskS">删除任务</el-button>  
                                <el-button class="defaultBtn" @click="revokeTaskS">撤销任务</el-button>
                                <el-button class="defaultBtn" @click="showBatchMount">批量挂接</el-button>
                              </div>
                              <el-table border stripe :height="bodyHeight" :data="importTaskListData" class="defaultTable" header-row-class-name="tableHeader" @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column type="index" width="50" label="序号"></el-table-column>
                            <el-table-column  label="操作"  width="320">
                                <template slot-scope="scope">
                                   <el-button class="tabletoolBtn" v-if="(scope.row.status_text === '部分导入成功' || scope.row.status_text === '导入成功' || scope.row.status === 4 || scope.row.status_text === '全部导入成功') && !scope.row.finishStorage" @click="continueImportFun(scope.row.id)">继续导入</el-button>
                                   <el-button class="tabletoolBtn" v-if="(scope.row.status === 3 || scope.row.status === 4 || scope.row.status_text !== '部分导入成功') && !scope.row.finishStorage && scope.row.status !== 5" @click="revokeTask(scope.row.id)">撤销</el-button>
                                   <el-button class="tabletoolBtn" @click="toImportDetail(scope.row.id, scope.row.libId, scope.row.phase)">查看</el-button>
                                   <el-button class="tabletoolBtn" v-if="(scope.row.status === 3 || scope.row.status === 4) && !scope.row.finishStorage" @click="warehousing(scope.row.id)">入库</el-button>
                                   <el-button class="tabletoolBtn" v-if="scope.row.status === 4 || scope.row.status === 5" @click="delTask(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taskNumber"  width="200" label="任务单号">
                            </el-table-column>
                            <el-table-column  prop="createDate" :formatter="dateFormat1" label="提交日期">
                            </el-table-column>
                            <el-table-column  prop="createPerson" label="提交人">
                            </el-table-column>                           
                            <el-table-column  prop="type_text" label="级别">
                            </el-table-column>
                            <el-table-column   prop="kindName" label="门类">
                            </el-table-column>
                            <el-table-column   prop="totalCount" label="导入数量">
                            </el-table-column>
                            <el-table-column   prop="documentFlag" label="工作文档标识">
                            </el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <span>{{scope.row.status_text}}</span>
                                    <i class="fa fa-eye cur-p" v-if="scope.row.status !== '5'" @click="taskStatusFun(scope.row.id,scope.row.taskNumber,scope.row.finishCount,scope.row.hasErrorFlag,scope.row.status)" style="color:rgb(110, 120, 130);font-size:15px;"></i>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否有错误数据">
                                <template slot-scope="scope">
                                    <span>{{scope.row.hasErrorFlag_text}}</span>
                                    <i class="el-icon-download cur-p" v-if="scope.row.hasErrorFlag === true" @click="downloadErorData(scope.row.id)" style="color:rgb(110, 120, 130);font-size:15px;font-weight: 600;"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--工具条分页-->
                        <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[20, 50, 100, 200]"
                                        :page-size="20"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="importTaskListDataTotal">
                                        </el-pagination>
                                    </div>  
                         </div>                
        </div> 

        <!-- //新增 数据采集任务弹框-->
        <el-dialog
          title="新增 数据采集任务"
          :visible.sync="importListAddSetVisible"
         :closeOnClickModal="false"
         :closeOnPressEscape="false"
         top="4%"
          width="50%" class="importListAddDialog">
          <div class="taskDetail">
                <p style="line-height:30px;padding-left:5px;background: rgb(126, 143, 174);color: #fff;">任务详情（必填）</p>
                <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" style="padding-left:20px" class="el-form--inline">
                        <el-form-item label="档案馆：" prop="archiveAgentCode" :rules="[{ required: true, message: '请填写档案馆代码', trigger: 'blur' },{ validator: integerNum, trigger: 'blur' }]">
                                <el-input placeholder="单行输入" size="small" readonly v-model="ruleForm.archiveAgentCode"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="全宗号：" prop="fondCode" :rules="[{ required: true, message: '请填写全宗号', trigger: 'blur' },{ validator: integerNum, trigger: 'blur' }]">
                                <el-input placeholder="单行输入" size="small" v-model="ruleForm.fondCode"></el-input>
                            </el-form-item>-->
                            <el-form-item label="门类：" prop="kindId">
                                <el-input placeholder="单行输入" size="small"  @focus="changecategoryFun()" v-model="categoryName2"></el-input>                               
                            </el-form-item>
                            <el-form-item label="级别：" prop="type" class="SelectItem checkName">
                                <el-select v-model="ruleForm.type" placeholder="请选择级别" @change="selectGet" style="width:85%" size="small">
                                    <el-option label="案卷级" value="0" v-if="ontainsAnJuan"></el-option>
                                    <el-option label="文件级" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                </el-form>
          </div>
          <div class="standardizedTesting">
                <p style="line-height:30px;padding-left:5px;background: rgb(126, 143, 174);color: #fff;margin-top:10px;">标准化检测设置</p>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm3" style="padding-left:20px">
                        <el-form-item prop="checkedType" class="superSearchChecked">
                            <el-checkbox v-model="ruleForm.emptyValueCheck" label="元数据必填项检测" name="type"></el-checkbox>
                            <el-checkbox v-model="ruleForm.categoryCodeCheck" label="档号中档案门类代码检测" name="type"></el-checkbox>
                            <el-checkbox v-model="ruleForm.dateFormatCheck" label="时间格式检测" name="type"></el-checkbox>
                            <el-checkbox v-model="ruleForm.duplicateArchiveCodeCheck" label="档号与系统内已有档号重复" name="type"></el-checkbox>  
                        </el-form-item>
                </el-form>
          </div>
          <div class="dataSource importExcelView">
                <p style="line-height:30px;padding-left:5px;background: rgb(126, 143, 174);color: #fff;">数据源（必填）</p>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" class="el-form--inline" style="padding-left:20px">
                        <el-form-item label="文件名：" prop="uploadFileName" :rules="[{ required: true, message: '请选择文件', trigger: 'change' }]">
                            <el-input placeholder="单行输入" size="small" v-model="ruleForm.uploadFileName" readonly></el-input>
                            <span class="uploadTips">注意：上传的文件必须为excel</span>
                        </el-form-item>
                        <el-upload
                                class="upload-demo d-ib"
                                ref="upload"
                                action=""
                                accept=".xls,.xlsx"
                                :on-remove="uploadOnRemove"
                                :on-change="excelChange"
                                :show-file-list="false"
                                :auto-upload="false">
                            <el-button slot="trigger" size="small" class="tabletoolBtn">选择文件</el-button>
                        </el-upload>
                        <!-- <uploader
                            ref="uploader"
                            :autoStart="false"
                            @file-added="onFileAdded"
                            @files-submitted="onFileSubmit"
                            accept=".xls,.xlsx"
                            class="uploader-app d-ib">
                            <uploader-unsupport></uploader-unsupport>
                            <uploader-btn @click="clickFiles" id="global-uploader-btn" :single="true" class="el-button tabletoolBtn" style="left:20px;" ref="uploadBtn">选择文件</uploader-btn>
                        </uploader> -->
                        <el-button class="tabletoolBtn" @click="parsinFile">解析文件</el-button>
                </el-form>
                
          </div>
          <div class="matchingResults">
              <div class="lt wp-56">
                   <p style="line-height:30px;padding-left:5px;background: rgb(126, 143, 174);color: #fff;">匹配列表</p>
                         <el-table border stripe :height="250" :data="matchingResultData" highlight-current-row class="defaultTable" header-row-class-name="tableHeader">                      
                            <el-table-column prop="value2" label="目标列名">
                            </el-table-column>
                            <el-table-column  prop="name" label="数据源列名">
                                <template slot-scope="scope">                                                 
                                    <el-select class="checkName" v-model="scope.row.selectCode" size="small" placeholder="无">
                                        <el-option v-for="(item, index) in scope.row.selectData" :key="index" :label="item" :value=" '' + index">
                                        </el-option>
                                    </el-select>                         
                                </template>
                            </el-table-column>
                        </el-table>
              </div>
              <div class="rt wp-40">
                   <p style="line-height:30px;padding-left:5px;background: rgb(126, 143, 174);color: #fff;">匹配结果</p>
                    <div style="height:250px;border:1px solid #EBEEF5;padding: 10px;line-height: 1.4;" class="mt10">
                        <div v-if="matchingErrorData.length>1" >
                            <p>excel中下述列未匹配到系统中对应字段：</p>
                            <p>
                                <span v-for="item in matchingErrorData">
                                    {{item}}
                                </span>
                            </p>
                            <p>请确认是否继续导入！</p>
                        </div>
                    </div>
              </div> 
              <div class="clear"></div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="importData" class="defaultBtn">导 入</el-button>
            <el-button @click="importListAddSetVisible = false" class="defaultBtn">取 消</el-button>
          </span>
        </el-dialog> 

        <!-- /继续采集任务弹框-->
        <el-dialog
          title="继续导入采集任务"
          :visible.sync="continueImportSetVisible"
         :closeOnClickModal="false"
         :closeOnPressEscape="false"
          width="35%" class="continueImportListAddDialog">
          <div class="dataSource">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="el-form--inline" style="padding-left:20px">
                        <el-form-item label="文件名：" prop="uploadFileName2">
                            <el-input placeholder="单行输入" size="small" v-model="uploadFileName2" readonly></el-input>
                            <span class="uploadTips">注意：上传的文件必须为excel</span>
                        </el-form-item>
                        <el-upload
                                class="upload-demo d-ib"
                                ref="upload"
                                :on-change="changeUpload"
                                action=""
                                :limit="limitNumber"
                                accept=".xls,.xlsx"
                                :show-file-list="false"
                                :auto-upload="false">
                            <el-button slot="trigger" size="small" class="tabletoolBtn">选择文件</el-button>
                        </el-upload>
                </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="continueImport" class="defaultBtn">导 入</el-button>
            <el-button @click="continueImportSetVisible = false" class="defaultBtn">取 消</el-button>
          </span>
        </el-dialog> 
        <!-- //门类选择弹框-->
        <el-dialog
          title="门类选择"
          :visible.sync="categoryChooseSetVisible"
         :closeOnClickModal="false"
         :closeOnPressEscape="false"
          width="50%" class="categoryChooseDialog">
            <div class="treeCon boxshow icontree">
                <el-tree class="filter-tree" 
                        :data="treedata"                                                 
                        node-key="id"
                        :props="defaultProps" 
                        :default-expanded-keys="defaultTreeOpen"                        
                        @node-click="handleNodeClick" 
                        ref="tree"
                        :load="gettreeNum"
                        lazy>
                        <span slot-scope="{node,data}" style="width: 100%;white-space: normal;">                             
                            <span>{{ node.label }}</span>
                            <!-- <span style="color:red" v-if="data.nodeType==2">[{{ data | filtertreeNum}}]</span>                        -->
                        </span>
                        </el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="categorySure" class="defaultBtn">确 定</el-button>
                <el-button @click="categoryChooseSetVisible = false" class="defaultBtn">取 消</el-button>
            </span>
        </el-dialog> 
        <!-- //数据采集任务状态弹框-->
        <el-dialog
          title="数据采集任务状态"
          :visible.sync="taskStatusSetVisible"
         :closeOnClickModal="false"
         :closeOnPressEscape="false"
          width="50%" class="taskStatusDialog">
            <p style="line-height:30px;padding-left:5px;">任务单号：{{taskNumber}}</p>
            <div style="padding: 10px 0 0 50px;">
                <!-- <div class="mt10">
                    <span>文件转换</span>
                    <div class="d-ib wp-88 pdl-10">
                        <el-progress :text-inside="true" :stroke-width="24" :percentage="30" status="success"></el-progress>
                    </div>
                </div>
                <div class="mt10">
                    <span>数据校验</span>
                    <div class="d-ib  wp-88 pdl-10">
                        <el-progress :text-inside="true" :stroke-width="24" :percentage="30" status="success"></el-progress>
                    </div>
                </div> -->
                <div class="mt10">
                    <span>数据导入</span>
                    <div class="d-ib  wp-88 pdl-10">
                        <el-progress :text-inside="true" :stroke-width="24" :percentage="taskProgress" status="success"></el-progress>
                    </div>
                </div>
                <p class="mt20">成功导入{{importFinishCountNum}}条，有{{checkFailedCount}}条校验没通过，请下载错误数据查看</p>
                <el-button v-show="hasErrorFlag" class="tabletoolBtn" @click="downloadErorData(taskId)">下载错误数据</el-button>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="taskStatusSetVisible = false" class="defaultBtn">关 闭</el-button>
            </span>
        </el-dialog> 
        <batchMountDialog ref="batchMountDialogRef" ></batchMountDialog>
     </section>
</template>
<script lang="ts">
   	import { Vue, Component } from 'vue-property-decorator'
    import Service from './importList.service' 
    import batchMountDialog from '@/views/common/bathMountDialog/batchMountDialog.vue' 
    import mockData from '@/mock/data/mockData';
    import { Loading } from 'element-ui';
    import moment from 'moment';
    import XLSX from 'xlsx';
    var treeNum = []
    const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));
    @Component({
        components: { 
            batchMountDialog
        },
        filters: {          
            filtertreeNum(value: any) {                             
              for(let item in treeNum){
                 if(treeNum[item].kindId === value.kindId)
                      return  treeNum[item].anJuanCount
              }
            }
        }
    })
    export default class arrange extends Vue{ 
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 325 ; 
        defaultProps: any = {
            children: 'children',
            label: 'nodeName',
            isLeaf:function(data, node){
              return data.children!=null ?false:true
            }
        }; 
        matchingHeaderdata: any = [];
        BASEURL: string =  process.env.API_BASEURL;
        importTaskListData: any = [];
        importTaskListDataTotal: number = 0;
        IsMatchingResult: boolean = false;
        importListAddSetVisible: boolean = false;
        categoryChooseSetVisible: boolean = false;
        taskStatusSetVisible: boolean = false;
        continueImportSetVisible: boolean = false;
        ontainsAnJuan: boolean = true;
        radio3: string = '1';
        fromBatchMount: string = 'dataImport';
        taskStatusList:any = [];
        formValidates=['ruleForm','ruleForm2']//form表单的ref
        formValidatesResultArr:any = [];//用来接受返回结果的数组
        defaultTreeOpen:any = [];
        mockList: any = [];
        hasErrorFlag: boolean = false;//是否有错误数据
        categoryName: string = '';
        taskId: string = '';
        categoryName2: string = '';
        matchingType: string = '';
        taskNumber: string = '';
        matchingResultData: any = [];
        matchingErrorData: any = [];
        loadingInstance:any={};
        treedata: any = [];
        chooseIdS: any = [];
        appendImportFile:any={};
        uploadFileName: string = '';
        uploadFileName2: string = '';
        taskProgress: number = 0;//数据正在导入的进度
        checkFailedCount: number = 0;//数据校验没通过
        importFinishCountNum: number = 0;//数据导入成功
        limitNumber: number;//上传文件的个数控制
        UpLoadfileList:any=[];
        sheetAll:any=[];
        ruleForm:any = {};
        ruleForm2:any = {};
        ruleForm3:any = {};
        rules: any = {};
        Gfilters:any = {};
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
      activeName:string = 'file';
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
        constructor(){
            super();
            this.Gfilters = {
                taskNumber: null,
                taskStatus:null,
                startCreateDate:null,
                endCreateDate:null,
                pageCondition: {
                    page: 1,
                    pageSize: 20,
                    sort: ""
                }
            }
            this.loadingInstance = null;
            this.UpLoadfileList = [];
            this.sheetAll=[];
            this.matchingHeaderdata = ["SheetJS".split(""), "1234567".split("")];
            this.limitNumber = 1;
            this.matchingResultData = [];
            this.taskStatusList = [];
            this.chooseIdS = [];
            this.matchingErrorData = [];
            this.treedata = [];
            this.importTaskListData = [];
            this.ruleForm = {
                archiveAgentCode: window.sessionStorage.getItem('archiveAgentCode'),
                kindId:'',
                type:'',
                anJuanId:'',
                phase:2,
                fondCode:'',
                uploadFileName:'',
                emptyValueCheck:true,
                categoryCodeCheck:true,
                dateFormatCheck:true,
                duplicateArchiveCodeCheck:true,
                fieldsMapping:{}
            }
            this.rules = {
                type: [
                    { required: true, message: '请选择级别', trigger: 'change' }
                ],
                kindId:[
                    { required: true, message: '请选择门类', trigger: 'change' }
                ],
            };
            this.mockList = mockData;
        };
        handleCurrentChange(val:number) {
            this.Gfilters.pageCondition.page = val;
            this.importTaskList();

        };
        handleSizeChange(val:number) {
            this.Gfilters.pageCondition.pageSize = val;
            this.importTaskList();
        };
         selectGet(value){

        }
        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        };
        handleSelectionChange(val) {
            this.chooseIdS = [];
            for(let item of val) {
                this.chooseIdS.push(item);
            }
        }
        // 下载错误数据
        downloadErorData(taskId) {
            let self = this;
                self['$confirm']('您是否要下载错误数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.location.href = self.BASEURL + '/archive/import/task/downloadErrorFile?importTaskId='+taskId+''
                    // Service.downloadErrorFile({importTaskId:taskId}).then(res=>{               
                    //     if(res.data.succeeded){                     
                    //         self.Suces("下载成功");
                    //         this.taskStatusSetVisible = false;
                    //     }else{
                    //             self['$message']({
                    //                 message: res.data.errorMessage,
                    //                 type: 'error'
                    //             })
                    //         }
                    //     });
                    //     self.$nextTick(() => { loadingInstance.close();});
                });
        }
        // 检索任务列表
        searchImportList() {
            this.importTaskList();
        }
        // 检索任务状态下拉选项
        importTaskStatusCandidates() {
            Service.importTaskStatusCandidates({}).then(res=>{               
                    if(res.data.succeeded){                     
                        this.taskStatusList = res.data.data;
                    }else{
                            this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        })
                    }
            });
        }
        // 数据采集任务状态弹框
        taskStatusFun(id,taskNumber,importFinishCount,hasErrorFlag,taskStatus) {
            this.taskStatusSetVisible = true;
            this.taskId = id;
            this.taskNumber = taskNumber;
            this.hasErrorFlag = hasErrorFlag;
            this.taskProgress = 0;
            this.checkFailedCount = 0;
            this.importFinishCountNum = 0
            // if(taskStatus === 2 || taskStatus === 3) {
                this.getTaskProgress();
            // }
        }
        getTaskProgress() {
            Service.getTaskStatus({importTaskId:this.taskId}).then(res=>{ 
                    if(res.data.succeeded){ 
                        this.taskProgress = 0;
                        this.importFinishCountNum = res.data.data.finishCount;  
                        this.checkFailedCount = res.data.data.checkFailedCount;
                        if(res.data.data.totalCount !==0) {
                            this.taskProgress = Number(((res.data.data.finishCount / res.data.data.totalCount)*100).toFixed(0));
                        }    
                        if(res.data.data.status === 2){
                            setTimeout(this.getTaskProgress, 3000);
                        }
                        // if(res.data.data.status === 4){
                        //     this.importTaskList();
                        // }
                    }else{
                            this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        })
                    }
            });
        }
        continueImportFun(id) {
            this.taskId = id;
            this.continueImportSetVisible = true;
        }
        // 继续导入
        continueImport(id) {
            let self = this;
            if(this.uploadFileName2) {
                self['$confirm']('您是否要继续导入任务?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let formData = new FormData();
                    formData.append("file", self.appendImportFile);
                    formData.append("importTaskId", self.taskId);
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在导入中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.appendImport(formData).then(res=>{               
                        if(res.data.succeeded){                     
                            self.Suces("导入成功");
                            self.importTaskList();
                            this.continueImportSetVisible = false;
                        }else{
                                self['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                })
                            }
                        });
                        self.$nextTick(() => { loadingInstance.close();});
                });
                
            } else {
                self.Warn("请选择文件！");
            }
        }
        //撤销任务
        revokeTask(id) {
            let self = this;
            let ids = [];
            if(toString.call(id) === '[object Array]') {
                 for(let item of id) {
                    if(item.finishStorage) {
                        self.Warn("已入库的数据不能撤销！");
                        return false;
                    } else {
                        ids.push(item.id);
                    } 
                }
            } else {
                ids.push(id);
            }
            if(ids.length !== 0) {
                self['$confirm']('您是否要撤销任务?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在撤销中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.withdrawTask({importTaskIds:ids}).then(res=>{               
                        if(res.data.succeeded){                     
                            self.Suces("撤销成功");
                            self.importTaskList();
                        }else{
                                self['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                })
                            }
                        });
                        self.$nextTick(() => { loadingInstance.close();});
                });
                
            } else {
                self.Warn("请选择要撤销的任务数据！");
            }
        }
        //批量撤销任务
        revokeTaskS() {
            this.revokeTask(this.chooseIdS);
        }
        //导入详情
        toImportDetail(id, libId, phase) {
            this['$router'].push({
                path:"/fileArrange/dataCollection/dataImport/importDetail",
                name:'数据导入详情',
                params: {
                    importTaskId: id,
                    libId:libId,
                    phase:phase
                }
            })
        }
        //入库
        warehousing(id) {
            let self = this;
            let ids = [];
            ids.push(id);
            if(ids.length !== 0) {
                self['$confirm']('您是否要入库任务?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在入库中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.enterStorage({importTaskIds:ids}).then(res=>{               
                        if(res.data.succeeded){                     
                            self.Suces("入库成功");
                            self.importTaskList();
                        }else{
                                self['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                })
                            }
                        });
                        self.$nextTick(() => { loadingInstance.close();});
                });
                
            } else {
                self.Warn("请选择要入库的任务数据！");
            }
        }
        //删除 
        delTask(id) {
            let self = this;
            let ids = [];
            if(toString.call(id) === '[object Array]') {
                for(let item of id) {
                    if(item.finishStorage) {
                        self.Warn("已入库的数据不能删除！");
                        return false;
                    } else {
                        ids.push(item.id);
                    } 
                }
            } else {
                ids.push(id);
            }
            if(ids.length !== 0) {
                self['$confirm']('您是否要删除任务?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在删除中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.deleteTask({importTaskIds:ids}).then(res=>{               
                        if(res.data.succeeded){                     
                            self.Suces("删除成功");
                            self.importTaskList();
                        }else{
                                self['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                })
                            }
                        });
                        self.$nextTick(() => { loadingInstance.close();});
                });
                
            } else {
                self.Warn("请选择要删除的任务数据！");
            }
        }
        //批量删除任务
        delTaskS() {
            this.delTask(this.chooseIdS);
        }
        // 门类选择弹框
        changecategoryFun() {
            this.categoryChooseSetVisible = true;
            this.getTree();
        }
        // 门类选择确认
        categorySure() {
            this.categoryChooseSetVisible = false;
            this.categoryName2 = this.categoryName;
            Service.containsAnJuan({kindId:this.ruleForm.kindId}).then(res=>{               
                if(res.data.succeeded){  
                    if(res.data.data) {
                        this.ontainsAnJuan = true;
                    } else {
                        this.ontainsAnJuan = false;
                    }
                }else{
                        self['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        })
                    }
                });
        }
        //读取文件
        excelChange(file){
                this.ruleForm.file = file;
                this.ruleForm.uploadFileName = file.name;
                var that = this;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const data = ev.target['result'];
                        if(window.navigator&&window.navigator.msSaveOrOpenBlob){
                            var exceltype = 'buffer';
                        }else{
                            var exceltype = 'binary';
                        }
                        const workbook = XLSX.read(data, {
                            type: exceltype
                        });
                        console.log(workbook);
                        const wsname = workbook.SheetNames[0];
                        const ws = workbook.Sheets[wsname];
                        /* Convert array of arrays */
                        const headerData = XLSX.utils.sheet_to_json(ws, {header:1});
                        /* Update state */
                        that.matchingHeaderdata = headerData[0];
                        // that.cols = make_cols(ws['!ref']);
                        console.log(that.matchingHeaderdata);
                        // const sheetarr = workbook.SheetNames;
                        // for(var key in sheetarr){
                        //     that.sheetAll.push({value:sheetarr[key],key:key/1});
                        // }
                        // console.log(that.sheetAll);
                    } catch (e) {
                        return false;
                    }
                };
             if(window.navigator&&window.navigator.msSaveOrOpenBlob){
                 reader.readAsArrayBuffer(file.raw);
             }else{
                reader.readAsBinaryString(file.raw);
            }
        }
        //选取的文件超出个数时的钩子
        // Onexceed(files, fileList) {
        //     this.Warn("你每次只能上传一个文件。")
        // }
        //移除文件的钩子
        uploadOnRemove(){

        }
        //导入数据选定文件
        changeUpload(file) {
            this.uploadFileName2 = file.name;
            this.appendImportFile = file.raw;
        }
        // 正整数验证
        integerNum(rule,value,callback){
            var reg = new RegExp('^[0-9][0-9]*$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正整数'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        //获取左侧列表数量
        gettreeNum(node, resolve){             
            let data = node.data 
            if(data.length<0) 
              return false;                 
            if(data.isgetnum)      
              return false;  
            let arr=[];
            if(data.children && data.children.length>0){
               for(let child in data.children){
                  if(data.children[child].nodeType==2){
                      arr.push(data.children[child].kindId)
                  }
               }
            };
            if(arr.length==0){
                setTimeout(() => {  
                         data.isgetnum=true;       
                         resolve(data.children);
                }, 500);
               return false;
            };         
              let params={ 
                  "archiveAgentCode":  window.sessionStorage.getItem('archiveAgentCode');
                  "kindIds":arr
                  };
               Service.getTreeNum(params).then(res=>{               
                     if(res.data.succeeded){                     
                          data.isgetnum=true;                        
                          for( let i in res.data.data){
                             treeNum.push((res.data.data)[i]);
                          }
                     }else{
                       this['$message']({
                        message: '查询数量失败！',
                        type: 'error'
                       })
                     }
                      resolve(data.children);
               });
        };
        // 选择文件按钮
        clickFiles(){
            // 重置文件队列
            this.$refs.uploader.uploader.cancel();
        };
        handSelected() {

        }
        //获取数据采集任务列表
        importTaskList() {
            let self = this;
            let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在获取数据，请稍等',
                    // spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            Service.importTaskList(self.Gfilters).then((res) =>{
                if(res.data.succeeded) {
                    console.log(res.data.data);
                    self.importTaskListData = res.data.data;
                    self.importTaskListDataTotal = res.data.totalRecords;
                } else {
                    self.Warn(res.data.message);
                }
                self.$nextTick(() => { loadingInstance.close();});
            })
        }
        parsinFile() {
            var self =this;
            if(self.ruleForm.kindId && self.ruleForm.type && self.ruleForm.uploadFileName) {
                let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在解析中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.archiveFields({kindId:self.ruleForm.kindId,type:parseInt(self.ruleForm.type)}).then((res) =>{
                        console.log(res);
                        if(res.data.succeeded) {
                            self.matchingResultData = res.data.data;
                            self.matchingErrorData = JSON.parse(JSON.stringify(self.matchingHeaderdata));
                            for(let item of self.matchingResultData) {
                                item.selectData = self.matchingHeaderdata;
                                for(let item2 in self.matchingHeaderdata) {
                                    if(item.value2 === self.matchingHeaderdata[item2]) {
                                        let name = item.value1
                                        item.selectCode = '' + item2;
                                        self['$set'](self.ruleForm.fieldsMapping,item.value2,item.value1);
                                        for(let item3 in self.matchingErrorData) {
                                            if(self.matchingErrorData[item3] === self.matchingHeaderdata[item2]) {
                                                self.matchingErrorData.splice(item3, 1);
                                            }
                                        }
                                    } 
                                }
                            }
                            console.log(self.matchingResultData);
                            console.log(self.matchingErrorData);
                            console.log(self.ruleForm.fieldsMapping);
                            self.Suces('解析成功!');
                            this.IsMatchingResult = true; 
                        } else {
                            self.Warn('解析失败!');
                        }
                        self.$nextTick(() => { loadingInstance.close();});
                    })
            }else {
                self.Warn('必填项不能为空!');
                return false;
            }
        }
        checkForm(formName) { //封装验证多表单的函数
            let _self = this;
            var result = new Promise(function(resolve, reject) {
                _self.$refs[formName].validate((valid) => {
                if (valid) {
                    resolve();
                } else { reject() }
                })
            })
            _self.formValidatesResultArr.push(result) //push 得到promise的结果
        }
       importData(fileForm1) {//新增表单保存
            this.formValidatesResultArr = [];
            this.formValidates.forEach(item => { //根据表单的ref校验
                this.checkForm(item)
            })
            let self = this;
            Promise.all(this.formValidatesResultArr).then(function() { //都通过了
                    if(self.IsMatchingResult) {
                        let formData = new FormData();
                        formData.append("file", self.ruleForm.file.raw);
                        formData.append("archiveAgentCode", self.ruleForm.archiveAgentCode);
                        formData.append("kindId", self.ruleForm.kindId);
                        formData.append("type", self.ruleForm.type);
                        formData.append("anJuanId", self.ruleForm.anJuanId);
                        formData.append("phase", self.ruleForm.phase);
                        formData.append("fondCode", self.ruleForm.fondCode);
                        formData.append("emptyValueCheck", self.ruleForm.emptyValueCheck);
                        formData.append("categoryCodeCheck", self.ruleForm.categoryCodeCheck);
                        formData.append("dateFormatCheck", self.ruleForm.dateFormatCheck);
                        formData.append("duplicateArchiveCodeCheck", self.ruleForm.duplicateArchiveCodeCheck);
                        formData.append("fieldsMapping", JSON.stringify(self.ruleForm.fieldsMapping));
                        console.log(formData.get("file"));
                        console.log(formData.get("kindId"));
                        console.log(typeof(self.ruleForm.anJuanId));
                        console.log(typeof(formData.get("anJuanId")));
                        self.ruleForm.file = formData;
                        let loadingInstance = Loading.service(
                            {
                                lock: true,
                                text: '正在导入，请稍等',
                                // spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            }
                        );
                        Service.importArchive(formData).then((res) =>{
                            console.log(res);
                            if(res.data.succeeded) {
                                self.Suces('导入成功!');
                                self.importListAddSetVisible = false;
                                self.importTaskList();
                                self.IsMatchingResult = false;
                                self.$refs.upload.clearFiles();;
                                self.$refs.ruleForm.resetFields();
                                self.$refs.ruleForm2.resetFields();
                            } else {
                                self.Warn('导入失败!');
                            }
                            self.$nextTick(() => { loadingInstance.close();});
                        })
                    } else {
                        self.Warn('请解析文件!');
                    }
                    
            }).catch(function() {
                return false;
            });
        };
        // 导入数据
        // importData() {
        //     var self = this;
        //     self.$refs['ruleForm'].validate((valid)=>{
        //         if (valid) {
        //             let formData = new FormData();
        //             formData.append("file", self.ruleForm.file.raw);
        //             formData.append("archiveAgentCode", self.ruleForm.archiveAgentCode);
        //             formData.append("kindId", self.ruleForm.kindId);
        //             formData.append("type", self.ruleForm.type);
        //             formData.append("anJuanId", self.ruleForm.anJuanId);
        //             formData.append("phase", self.ruleForm.phase);
        //             formData.append("fondCode", self.ruleForm.fondCode);
        //             formData.append("emptyValueCheck", self.ruleForm.emptyValueCheck);
        //             formData.append("categoryCodeCheck", self.ruleForm.categoryCodeCheck);
        //             formData.append("dateFormatCheck", self.ruleForm.dateFormatCheck);
        //             formData.append("duplicateArchiveCodeCheck", self.ruleForm.duplicateArchiveCodeCheck);
        //             formData.append("fieldsMapping", JSON.stringify(self.ruleForm.fieldsMapping));
        //             console.log(formData.get("file"));
        //             console.log(formData.get("kindId"));
        //             console.log(typeof(self.ruleForm.anJuanId));
        //             console.log(typeof(formData.get("anJuanId")));
        //             self.ruleForm.file = formData;
        //             let loadingInstance = Loading.service(
        //                 {
        //                     lock: true,
        //                     text: '正在导入，请稍等',
        //                     // spinner: 'el-icon-loading',
        //                     background: 'rgba(0, 0, 0, 0.7)'
        //                 }
        //             );
        //             Service.importArchive(formData).then((res) =>{
        //                 console.log(res);
        //                 if(res.data.succeeded) {
        //                     self.Suces('导入成功!');
        //                     this.importListAddSetVisible = false;
        //                     self.importTaskList();
        //                 } else {
        //                     self.Warn('导入失败!');
        //                     this.importListAddSetVisible = false;
        //                 }
        //                 self.$nextTick(() => { loadingInstance.close();});
        //             })
        //         }
        //     });
        // }
        handleNodeClick (data){ 
             let kindId = data;
             if(kindId.nodeType!=1){
                 this.ruleForm.kindId = kindId.kindId;
                 this.categoryName = kindId.nodeName;
             } 
          };
        //获取左侧列表
        getTree(){         
               let params={ "archiveAgentCode": '0' }
               Service.getTree(params).then(res=>{               
                     if(res){
                        this.treedata =  res.data.data;
                        this.defaultTreeOpen.push(res.data.data[0].id);
                     }else{
                       this['$message']({
                        message: '查询案卷库失败！',
                        type: 'error'
                       })
                     }
               });
        };
        // 预备上传
        onFileAdded(file) {
        };
        // 收集全部可上传文件
        onFileSubmit(file){
            this.ruleForm.file = file[0];
            this.uploadFileName = this.ruleForm.file.name;
        }
        //批量挂接 日期开始
     PchangeDate(){
            // this.PanaDate();
        };
    PanaDate(){
            let date = new Date(this.Gfilters.createDateStart);
            this.PdateOptions = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600)
                    let timer =  time.getTime();
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer< date;
                }
            };
        }
    // 日期结束
    PchangeDate1(){
            // if(!this.Gfilters.createDateEnd){
            //     this.PdateOptionsA = {
            //         disabledDate() {
            //             return null
            //         }
            //     };
            // }else{
            //     let date = new Date(this.Gfilters.createDateEnd);
            //     this.PdateOptionsA = {
            //         disabledDate(time) {
            //             date.setTime(date.getTime() - 3600)
            //             let timer =  time.getTime();
            //             // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
            //             return timer > date;
            //         }
            //     };
            // }
        }
        
        gotopage(page){            
            this.$router.push({path:'/fileArrange/arrange/'+page});
        }; 
        showMgroup(){ 
          this.$nextTick(() => {
            this.$refs['yijuanDialogRef'].yijuanVisible = true;           
          });
        };      
        showAddFiles(){ 
          this.$nextTick(() => {
            this.$refs['addFilesDialogRef'].addFilesVisible = true;           
          });
        };
        showBatchEdit(){
            this.$nextTick(() => {
              this.$refs['batchEditDialogRef'].batchEditVisible = true;           
            });
        };
        showBatchMount(){
            if(this.chooseIdS.length === 0) {
                this.Warn('请选择要挂接的任务!');
                return false;
            }
            if(this.chooseIdS.length > 1) {
                this.Warn('请选择一个任务挂接!');
                return false;
            }
            // 准备采集任务的批量挂接
            Service.prepareBatchAttach({importTaskId:this.chooseIdS[0].id}).then((res) =>{
                if(res.data.succeeded) {
                    this.$nextTick(() => {
                        this.$refs['batchMountDialogRef'].batchMountVisible = true;
                        this.$refs['batchMountDialogRef'].getMatchRules(res.data.data);
                        this.$refs['batchMountDialogRef'].autoMatchParams.mode = 4;
                        this.$refs['batchMountDialogRef'].autoMatchParams.importTaskId = this.chooseIdS[0].id;
                        this.$refs['batchMountDialogRef'].getLounTile();           
                    });
                } else {
                    this.Warn(res.data.errorMessage);
                }
            })
            
        };
        showImportList() {
            this.uploadFileName = '';
            this.categoryName2 = '';
            this.matchingResultData = [];
            this.matchingErrorData = [];
            // this.$nextTick(() => {
            //    // 重置文件队列
            //     this.$refs.upload.uploader.cancel();
            // });
            this.importListAddSetVisible = true;
        }
        fileSelected(row){         
           this.activeName='Ingroupfile';
           
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
         DataImporterExport(params){
            Service.DataImporterExport(params).then(res=>{
                console.log(res)
                if(res){
                    if(res['type']=='application/json'){
                        this.getError('所选文件无电子原文！');
                    }else{
                        let data = res;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var csvData =  new Blob([data]);
                            if(params['isAtta']=='2'){
                                window.navigator.msSaveOrOpenBlob(csvData,params['nodeName']+'.zip');
                            }else{
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName=excelName+"_案卷目录";
                                        break;
                                    case 3:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                    case 4:
                                        excelName=excelName+"_未整理目录";
                                        break;
                                    case 5:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                }
                                window.navigator.msSaveOrOpenBlob(csvData,excelName+'.'+params['type']);
                            };
                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            if(params['isAtta']=='2'){
                                link.setAttribute('download',params['nodeName']+'.zip');
                            }else{
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName=excelName+"_案卷目录";
                                        break;
                                    case 3:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                    case 4:
                                        excelName=excelName+"_未整理目录";
                                        break;
                                    case 5:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                }
                                link.setAttribute('download',excelName+'.'+params['type']);
                            };
                            document.body.appendChild(link);
                            link.click();
                         }

                    }
                }
            });
        }    
        created(){  
            //获取数据采集任务列表
            this.importTaskList(); 
            // 检索任务状态下拉选项
            this.importTaskStatusCandidates();       
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 325;
                })()
            };
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../../styles/innerPublic.scss';
    @import '../../../../styles/fileManage/dataCollection.scss';
    .importExcelView .el-form-item__error{
        top: 42%;
    }
</style>
