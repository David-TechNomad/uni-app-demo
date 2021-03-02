<template>
    <section>
    <div class="mainTitle">报表管理</div>
    <div class="mainDoc">
        <div class="mainCon mainBorrow">
         <div class="formData">
             <div class="btnDiv">
             	<el-button class="checkWay" @click="addReport">新增</el-button>
             	<el-button class="checkWay" @click="BatchDelete">删除</el-button>
             </div>
         </div>
           <div class="borderTable">
               <el-table tooltip-effect="dark" :height="bodyHeight" :data="tableData" @selection-change="selectionChange" highlight-current-row class="indexTable containTable">
                    <el-table-column type="selection" width="30" label="#">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="userId" label="userId" v-if="false">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="reportName" label="报表名称">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fileName" label="报表模板">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" label="报表类型">
						<template slot-scope="scope">
							<div v-if="scope.row.reportType === 2">
								<span>卷内</span>
							</div>	
							<div v-if="scope.row.reportType === 1">
								<span>案卷</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column :show-overflow-tooltip="true" label="模版类型">
                        <template slot-scope="scope">
                            <div v-if="scope.row.isEngineering === true">
                                <span>工程档案模版</span>
                            </div>
                            <div v-if="scope.row.isEngineering === false">
                                <span>非工程档案模版</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                           <el-button class="checkBtn" @click="updateReport(scope.row)">编辑</el-button>
                           <el-button class="checkBtn" @click="deleteReport(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
               </el-table>
               <!--工具条分页-->
               <el-col :span="24" class="pager">
                   <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="pageSize" :total="total" style="float:right;">
                   </el-pagination>
               </el-col>
            </div>
        </div>
    </div>
    <el-dialog class="fixModal" :title="dailogTitleType+'报表'" :visible.sync="fileVisible" :before-close= "beforeClose">
        <div class="scrollCon formDiv">
            <div class="tableCon">
                <el-form :model="fileForm" label-width="100px" :rules="ruleForm" ref="fileForm" class="addfile">
                    <el-form-item label="userId：" class="basicItem" ref="id" prop="id" v-show="false">
                        <el-input class="checkName percentName" v-model="fileForm.id"></el-input>
                        <el-input class="checkName percentName" v-model="fileForm.fileId"></el-input>
                    </el-form-item><br>
                    <el-form-item label="报表名称：" class="basicItem" prop="reportName">
                        <el-input class="checkName percentName" v-model="fileForm.reportName"></el-input>
                    </el-form-item>
                    <el-form-item label="报表类型：" class="basicItem" ref="reportType" prop="repType">
                        <el-select placeholder="报表类型" v-model="fileForm.repType">
                        	<el-option v-for="item in reportType" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                      	</el-select>
                    </el-form-item>
                    <el-form-item label="模版类型：" class="basicItem" ref="muBanType" prop="muType">
                        <el-select placeholder="模版类型" v-model="fileForm.muType">
                            <el-option v-for="item in muBanType" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="报表模板：" class="basicItem" prop="upList">
                    	<el-upload 
                    		class="upload-demo" 
                    		action="111" 
                    		:http-request="BeforeUpload" 
                    		:limit="limitNumber" 
                    		:on-exceed="Onexceed" 
                    		:file-list="upList"
                    		:on-remove="handleRemove"
                    		:before-remove="beforeRemove"
                    		>
                    <el-button slot="trigger" size="small" class="checkWay" type="primary">选取文件</el-button>
                </el-upload>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div slot="footer" class="dialog-footer diaFoot">
            <el-button type="primary" class="checkWay" @click="submitForm('fileForm')">确定</el-button>
        </div>
    </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './reportManagement.service';
    @Component
    export default class appborrow extends Vue{
        fileVisible: boolean;
        dailogTitleType:string = '';
        bodyHeight: number;
//      reportFileType: number;
//      rankId_one:number;
        start: number;
        total: number;
        page: number;
        pageSize: number;
        a: any = {};
        b: any = {};
        selection:any=[];//被选中的项
        fileForm: any = {};
        ruleForm: any = {};
        openForm: any = {};
        filters: any = {};
        tableData: any = [];
		reportType: any = [];
		muBanType: any = [];
        roleSelect: any = [];
        error: any = {};
        tableParams: any = {};
        title:'';
        unitname:'';
        $refs: { resetFields: HTMLFormElement };
        limitNumber:number;//上传文件的个数控制
        upList:any = [];//上传的数组
        constructor(){
            super();
            this.bodyHeight = document.documentElement.clientHeight-240;
            this.fileVisible = false;
            this.fileForm = {
                reportName: '',
                repType:'',
                muBanType:false,
                muType:'',
            };
            this.openForm = {

            };
            this.a = {
                file: {
                	id: '',
                },
            };
            this.b = {
                page: 0,
                pageSize: 10
            };
            this.ruleForm = {
                reportName: [{
                	required: true, 
                	validator: this.reportNamevalidator,
                	trigger: 'blur' 
                }],
                repType: [{
                	required: true, 
                	validator: this.repTypevalidator,
                	trigger: 'change'
                }],
                muType: [{
                    required: true,
                    //validator: this.muTypevalidator,
                    trigger: 'change'
                }],
                upList: [{
                	required: true, 
                	validator: this.upListvalidator,
                	trigger: 'change'
                }]
            };
			 this.reportType = [
                {
                    "id":1,
                    "typeName":'案卷'
                },
                 {
                    "id":2,
                    "typeName":'卷内'
                }
            ];
            this.muBanType = [
                {
                    "id":true,
                    "typeName":'工程档案模版'
                },
                 {
                    "id":false,
                    "typeName":'非工程档案模版'
                }
            ]
            this.tableData = [];
            this.roleSelect = [];
            this.tableParams = {
                  userId:'',
                  roleIds:'',
            };
            this.limitNumber = 1;
//          this.reportFileType =6;
            this.upList = [];
            this.selection=[];
        };

        handleCurrentChange(val) {
            this.b.page = val-1;
            this.getFiles();
        };
        handleSizeChange(val) {
            this.b.pageSize = val;
            this.getFiles();
        };
        beforeClose(){
        	this.fileVisible = false;
        	this.$refs['fileForm'].resetFields();
        };
		reportNamevalidator(rule,value,callback){
			if (!value) {
	          return callback(new Error('报表名称不能为空'));
	        }
	        setTimeout(() => {
	          if (value.length<3) {
	            callback(new Error('报表名称需要大于 3 个字符'));
	          } else {
	              callback();
	          }
	        }, 1000);
        };
        repTypevalidator(rule,value,callback){
			if (!this.fileForm.repType) {
	          return callback(new Error('报表类型不能为空'));
	        }
	        setTimeout(() => {
	          if (!this.fileForm.repType) {
	            callback(new Error('报表类型不能为空'));
	          } else {
	            callback();
	          }
	        }, 1);
        };
        muTypevalidator(rule,value,callback){
            if (!this.fileForm.muType) {
              return callback(new Error('模板类型不能为空'));
            }
            setTimeout(() => {
              if (!this.fileForm.muType) {
                callback(new Error('模板类型不能为空'));
              } else {
                callback();
              }
            }, 1);
        };
        upListvalidator(rule,value,callback){
			if (!this.fileForm.fileId) {
	          return callback(new Error('请上传报表模板'));
	        }
	        setTimeout(() => {
	          if (!this.fileForm.fileId) {
	            callback(new Error('请上传报表模板'));
	          } else {
	              callback();
	          }
	        }, 1);
        };
        // 初始化表格
        getFiles():void{
            Service.getReportTemplateList(this.b).then((res) =>{
                this.tableData = res.data.data;
                this.total = res.data.totalRecords
			})
        };

        // 新增弹出框
        addReport(obj):void{
           this.fileForm.repType= '';
           this.upList = [];
           this.fileForm.id = '';
           this.fileForm.fileId = '';
		   this.dailogTitleType = "新增";
           this.fileVisible = true;
           this.fileForm.reportName = obj.reportName;
        };
        //编辑报表的弹框页面
        updateReport(obj):void{
        	this.upList = [];
           this.dailogTitleType = "编辑";
           this.fileVisible = true;
           this.fileForm.id = obj.id;
           this.fileForm.reportName = obj.reportName;
           this.fileForm.repType = obj.reportType;
           this.fileForm.muType = obj.isEngineering;
           this.fileForm.fileId = obj.fileId;
           this.upList.push({
				name: obj.fileName,
				url: '',
				id:  obj.fileId
			})
        };
         //删除报表
        deleteReport(obj):void{
        	var str = obj.id;  
        	this['$confirm']('您是否要删除'+ obj.reportName +'报表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Service.BatchDelReportTemplate(str).then(res=>{
                    if(res.data.succeeded){
                        this.Suces("删除成功");
                        this.b.page = 0;
                        this.getFiles();
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }).catch(() => {
                this['$message']({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        };
        BatchDelete():void{
        	if(this.selection.length>0){
                    var arr=[];
                    for(var item of this.selection){
                        arr.push(item.id)
                    };
                    var str = arr.join(",");                   
                    this['$confirm']('您是否要删除所选报表?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        Service.BatchDelReportTemplate(str).then(res=>{
                            if(res.data.succeeded){
                                this.Suces("删除成功");
                                this.b.page = 0;
                                this.getFiles();
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.Warn('请选择要删除的文件')
                }
        }	
        // 上传文件的钩子
        Onexceed(files, fileList){
            console.log(files, fileList)
            this.Warn("你每次只能上传一个文件")
        }
        handleRemove(file, fileList){
        	this.fileForm.fileId = '';
        	this.upList = [];
        	this.Suces("删除成功");
        }
        //导入数据选定文件
        BeforeUpload(params){
            var Form = new FormData();
            Form.append('file',params.file)
            Form.append('type', '6')
            Service.reportFileImport(Form).then(res=>{
               setTimeout(()=>{
                   this['$notify']({
                       title: '文件导入成功',
                       position: 'top-right',
                       type: 'success',
                       message: '文件已经成功导入'
                   });
               },1000)
               this.fileForm.fileId = res.data.data
            });

        }
        //警告
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };
        //成功
        Suces(message){
            this['$message']({
                type: 'success',
                message
            })
        };
        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };
        //提交表单
        submitForm(formName) {
         	this['$refs'][formName]['validate']((valid)=>{
                if(valid){
                	this.a.reportName = this.fileForm.reportName;
		            this.a.reportType = this.fileForm.repType;
		            this.a.id = this.fileForm.id;
		            this.a.file.id = this.fileForm.fileId;
		            this.a.isEngineering = this.fileForm.muType;
		            Service.updateReportTemplate(this.a).then((res) =>{
		                this.fileVisible = false;
		                this.getFiles();
		            })
                }
            });    
        };
         //table表格选中项
        selectionChange(selection){
            this.selection=selection;
        };
	     mounted(){
	          this.getFiles();
	     };

    };


</script>

<style lang="scss" scoped>
    @import '../../../styles/system/reportManagement/reportManagement.scss';
</style>