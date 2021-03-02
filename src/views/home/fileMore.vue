<template>
    <section>
    <div class="mainTitle">常见文件</div>
    <div class="mainDoc">
        <div class="mainCon mainBorrow">
         <div class="formData">
         	<el-form :inline="true" :model="filters" class="doneForm topParamsForm">
                 <el-form-item v-for="" class="company" label="文档标题：" ref="fullName">
                     <el-input class="checkName" v-model="filters.title" placeholder="文档标题" clearable></el-input>
                 </el-form-item>
                 <el-form-item>
                     <el-button class="checkWay" @click="getFiles">检索</el-button>
                 </el-form-item>
             </el-form>
             <!-- <div class="btnDiv">
             	<el-button class="checkWay" @click="addReport">新增</el-button>
             	<el-button class="checkWay" @click="BatchDelete">删除</el-button>
             </div> -->
         </div>
           <div class="borderTable">
               <el-table tooltip-effect="dark" :height="bodyHeight" :data="tableData" @selection-change="selectionChange" highlight-current-row class="indexTable containTable">
                    <!-- <el-table-column type="selection" width="30" label="#">
                    </el-table-column> -->
                    <el-table-column prop="userId" label="userId" v-if="false">
                    </el-table-column>
                    <el-table-column prop="title" label="文档标题">
                    </el-table-column>
                    <el-table-column prop="fileName" label="附件">
                         <template slot-scope="scope">
                            <a href= "javascript:void(0);" class="" @click="downLoad(scope.row.fileId,scope.row.fileName)">{{scope.row.fileName}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="content" label="备注">
                    </el-table-column>
                    <el-table-column prop="sendUserName" label="上传人">
                    </el-table-column>
                    <el-table-column prop="sendDate" label="上传时间" width="200">
                    </el-table-column>
                    <!-- <el-table-column label="操作" width="350">
                        <template slot-scope="scope">
                        	<span v-if="scope.row.isSend">
                        		<el-button class="checkBtn" @click="cancelReport(scope.row)">取消发布</el-button>
                        	</span>	
                        	<span v-else>
                        		<el-button class="checkBtn" @click="publishReport(scope.row)">发布</el-button>
                        		<el-button class="checkBtn" @click="deleteReport(scope.row)">删除</el-button>
                        	</span>
                        	<el-button class="checkBtn" @click="updateReport(scope.row)">编辑</el-button>
                        	<span v-if="scope.row.isTop">
                        		<el-button class="checkBtn" @click="unStickReport(scope.row)">取消置顶</el-button>
                        	</span>	
                        	<span v-else>
                        		<el-button class="checkBtn" @click="stickReport(scope.row)">置顶</el-button>
                        	</span>
	                    </template>
                    </el-table-column> -->
               </el-table>
               <!--工具条分页-->
               <el-col :span="24" class="pager">
                   <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="pageSize" :total="total" style="float:right;">
                   </el-pagination>
               </el-col>
            </div>
        </div>
    </div>
    <el-dialog class="fixModal" :title="dailogTitleType+'文档'" :visible.sync="fileVisible" :before-close= "beforeClose" :model="ruleForm">
        <div class="scrollCon formDiv">
            <div class="tableCon">
                <el-form :model="fileForm" label-width="85px" :rules="ruleForm" ref="fileForm" class="addfile">
                    <el-form-item label="userId：" class="basicItem" ref="id" prop="id" v-show="false">
                        <el-input class="checkName percentName" v-model="fileForm.id"></el-input>
                        <el-input class="checkName percentName" v-model="fileForm.fileId"></el-input>
                    </el-form-item><br>
                    <el-form-item label="选择文档：" class="basicItem" prop= "upList">
                    	<el-upload 
                    		class="upload-demo" 
                    		action="111" 
                    		:http-request="BeforeUpload" 
                    		:limit="limitNumber" 
                    		:on-exceed="Onexceed" 
                    		:file-list="upList"
                    		:on-remove="handleRemove">
                    		<el-button slot="trigger" size="small" class="checkWay" type="primary">选取文件</el-button>
                		</el-upload>
                    </el-form-item>
                    <el-form-item label="文档标题：" class="basicItem" prop="title">
                        <el-input class="checkName percentName" v-model="fileForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="是否置顶：" class="basicItem" >
                    	<el-radio-group v-model="fileForm.isTop" >
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注：" class="basicItem" prop="content">
                        <el-input type="textarea" :rows="3" class="checkName percentName" v-model="fileForm.content"></el-input>
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
    import Service from './fileMore.service';
    @Component
    export default class appborrow extends Vue{
        fileVisible: boolean;
        dailogTitleType:string = '';
        bodyHeight: number;
        start: number;
        total: number;
        page: number;
        pageSize: number;
        a: any = {};
        b: any = {};
        c: any = {}; //定义发布、取消发布、置顶、取消置顶
        selection:any=[];//被选中的项
        fileForm: any = {};
        ruleForm: any = {};
        openForm: any = {};
        filters: any = {};
        tableData: any = [];
		reportType: any = [];
        roleSelect: any = [];
        error: any = {};
        tableParams: any = {};
        $refs: { resetFields: HTMLFormElement };
        title:'';
        unitname:'';
        limitNumber:number;//上传文件的个数控制
        upList:any = [];//上传的数组
        constructor(){
            super();
            this.bodyHeight = document.documentElement.clientHeight-240;
            this.fileVisible = false;
            this.fileForm = {
                reportName: '',
                repType:'',
                isTop: false,
            };
            this.openForm = {

            };
            this.a = {
                file: {
                	id: '',
                },
            };
            this.b = {
                page:'0',
                pageSize:'25',
                title:'',
                type: 2,
                isSend:true
            };
            this.c = {
            	id:'',
            	actionType:'',
            };
            this.ruleForm = {
                title: [
                    { required: true, message: '请填写文档标题', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请填写备注', trigger: 'blur' }
                ],
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
            ]
            this.tableData = [];
            this.roleSelect = [];
            this.tableParams = {
                  userId:'',
                  roleIds:'',
            };
            this.limitNumber = 1;
            this.upList = [];
            this.selection=[];
            this.pageSize = 25;
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
		upListvalidator(rule,value,callback){
			if (!this.fileForm.fileId) {
	          return callback(new Error('请上传文档'));
	        }
	        setTimeout(() => {
	          if (!this.fileForm.fileId) {
	            callback(new Error('请上传文档'));
	          } else {
	              callback();
	          }
	        }, 1);
        };
        // 初始化表格
        getFiles():void{
            this.b.title = this.filters.title;
            Service.getNoticeList(this.b).then((res) =>{
                this.tableData = res.data.data;
                this.total = res.data.totalRecords
			})
        };

        // 新增弹出框
        addReport(obj):void{
           this.fileForm.repType= '';
           this.upList = [];
           this.fileForm.id = obj.id;
           this.fileForm.fileId = '';
           this.fileForm.isTop = false;
		   this.dailogTitleType = "新增";
           this.fileVisible = true;
           this.fileForm.title = obj.title;
           this.fileForm.content = obj.content;
        };
        //编辑报表的弹框页面
        updateReport(obj):void{
           this.upList = [];
           this.dailogTitleType = "编辑";
           this.fileVisible = true;
           this.fileForm.id = obj.id;
           this.fileForm.title = obj.title;
           this.fileForm.content = obj.content;
           this.fileForm.isTop = obj.isTop;
           this.fileForm.fileId = obj.fileId;
           this.upList.push({
				name: obj.fileName,
				url: '',
				id:  obj.fileId
			})
        };
        // 发布 
        publishReport(obj):void{
        	this.c.id = obj.id;
        	this.c.actionType = 1
        	Service.handleNotice(this.c).then(res=>{
                if(res.data.succeeded){
                    this.Suces("发布成功");
                    this.getFiles();
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        // 取消发布 
        cancelReport(obj):void{
        	this.c.id = obj.id;
        	this.c.actionType = 2
        	Service.handleNotice(this.c).then(res=>{
                if(res.data.succeeded){
                    this.Suces("取消成功");
                    this.getFiles();
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        // 置顶
        stickReport(obj):void{
        	this.c.id = obj.id;
        	this.c.actionType = 4
        	Service.handleNotice(this.c).then(res=>{
                if(res.data.succeeded){
                    this.Suces("置顶成功");
                    this.getFiles();
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        // 取消置顶
        unStickReport(obj):void{
        	this.c.id = obj.id;
        	this.c.actionType = 5
        	Service.handleNotice(this.c).then(res=>{
                if(res.data.succeeded){
                    this.Suces("取消成功");
                    this.getFiles();
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
         //删除报表
        deleteReport(obj):void{
        	this.c.id = obj.id;
        	this.c.actionType = 3
        	this['$confirm']('您是否要删除'+ obj.title +'报表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Service.handleNotice(this.c).then(res=>{
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
                        Service.BatchDelNotice(str).then(res=>{
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
            Form.append('type', '5')   // 通知的文件类型是 5 
            Service.reportFileImport(Form).then(res=>{
               setTimeout(()=>{
                   this['$notify']({
                       title: '文件导入成功',
                       position: 'top-right',
                       type: 'success',
                       message: '文件已经成功导入'
                   });
               },1000)
//             this.a.file.id = res.data.data
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
		            this.a.title = this.fileForm.title;
		            this.a.content = this.fileForm.content;
		            this.a.id = this.fileForm.id;
		            this.a.file.id = this.fileForm.fileId;
		            this.a.isTop = this.fileForm.isTop;
		            this.a.type = '2';  // 2是文档
		            this.a.file.id = this.fileForm.fileId;
		            Service.updateNotice(this.a).then((res) =>{
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
        //下载
        // downLoad(id,title){
        //       Service.downloadFile({ fileId:id }).then((res) =>{
        //         if (res) {
        //             if(res instanceof Object && !res['succeeded']){
        //                 this['$message']({
        //                     message: res['errorMessage'],
        //                     type: 'error'
        //                 });
        //             }else {
        //                 let csvData = new Blob([res]);
        //                 if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //                     window.navigator.msSaveBlob(csvData,title);
        //                 }else{
        //                     let url = window["URL"].createObjectURL(new Blob([res]));
        //                     let link = document.createElement('a');
        //                     link.style.display = 'none';
        //                     link["href"] = url;
        //                     link.setAttribute('download',title);
        //                     document.body.appendChild(link);
        //                     link.click();;
        //                     document.body.removeChild(link);
        //                 }
        //             }
        //         }else{
        //             this['$message']({
        //                 message: '下载文件失败',
        //                 type: 'error'
        //             });
		// 		}
        //     })
        // }
        downLoad(id,title){
            Service.downloadFile({ fileId:id }).then((res) =>{
                if (res) {
                    // if(res instanceof Object && !res['succeeded']){
                    //     this['$message']({
                    //         message: res['errorMessage'],
                    //         type: 'error'
                    //     });
                    // }else {
                        let csvData = new Blob([res]);
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveBlob(csvData,title);
                        }else{
                            let url = window["URL"].createObjectURL(new Blob([res]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link["href"] = url;
                            link.setAttribute('download',title);
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }
                    // }
                }else{
                        this['$message']({
                            message: '下载文件失败',
                            type: 'error'
                        });
                    }
                })
        };
         mounted(){
              this.getFiles();
         };

    };


</script>

<style lang="scss" scoped>
    @import '../../styles/system/notice/notice.scss';
</style>