<template>
    <section>
    <div class="mainTitle">通知管理</div>
    <div class="mainDoc">
        <div class="mainCon mainBorrow">
         <div class="formData">
         	<el-form :inline="true" :model="filters" class="doneForm topParamsForm">
                 <el-form-item v-for="" class="company" label="通知标题：" ref="fullName">
                     <el-input class="checkName" v-model="filters.title" placeholder="通知标题" clearable></el-input>
                 </el-form-item>
                 <el-form-item>
                     <el-button class="checkWay" @click="getFiles">检索</el-button>
                 </el-form-item>
             </el-form>
             <div class="btnDiv">
                <el-button class="checkWay" @click="toUp" @dbclick.native='toUp1'>上移</el-button>
             	<el-button class="checkWay" @click="toDown" @dbclick.native='toDown1'>下移</el-button>
             	<el-button class="checkWay" @click="addReport">新增</el-button>
             	<el-button class="checkWay" @click="BatchDelete">删除</el-button>
             </div>
         </div>
           <div class="borderTable">
               <el-table tooltip-effect="dark" :height="bodyHeight" :data="tableData" @selection-change="selectionChange" highlight-current-row class="indexTable containTable">
                    <el-table-column type="selection" width="30" label="#">
                    </el-table-column>
                    <el-table-column prop="userId" label="userId" v-if="false">
                    </el-table-column>
                    <el-table-column prop="title" label="通知标题">
                    </el-table-column>
                    <!-- <el-table-column prop="content" label="通知内容">
                    </el-table-column> -->
                    <el-table-column prop="fileName" label="附件">
                        <template slot-scope="scope">
                            <a href= "javascript:void(0);" class="" @click="downLoad(scope.row.fileId,scope.row.fileName)">{{scope.row.fileName}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isSend" label="发布状态">
                    	<template slot-scope="scope">
							<div v-if="scope.row.isSend">
								<span>已发布</span>
							</div>	
							<div v-if="!scope.row.isSend">
								<span>未发布</span>
							</div>
						</template>
                    </el-table-column>
                    <el-table-column prop="sendUserName" label="发布人">
                    </el-table-column>
                    <el-table-column prop="sendDate" label="发布时间">
                    </el-table-column>
                    <el-table-column prop="createUserName" label="上传人">
                    </el-table-column>
                    <el-table-column prop="createDate" label="上传时间">
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                        	<span v-if="scope.row.isSend">
                        		<el-button class="checkBtn" @click="cancelReport(scope.row)">取消发布</el-button>
                        	</span>	
                        	<span v-else>
                        		<el-button class="checkBtn" @click="publishReport(scope.row)">发布</el-button>
                        		<el-button class="checkBtn" @click="deleteReport(scope.row)">删除</el-button>
                        	</span>
                        	<el-button class="checkBtn" @click="updateReport(scope.row)">编辑</el-button>
                        	<!-- <span v-if="scope.row.isTop">
                        		<el-button class="checkBtn" @click="unStickReport(scope.row)">取消置顶</el-button>
                        	</span>	 -->
                        	<!-- <span v-else>
                        		<el-button class="checkBtn" @click="stickReport(scope.row)">置顶</el-button>
                        	</span> -->
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
    <el-dialog class="fixModal" :title="dailogTitleType+'通知'" :visible.sync="fileVisible" :before-close= "beforeClose" :model="ruleForm">
        <div class="scrollCon formDiv">
            <div class="tableCon">
                <el-form :model="fileForm" label-width="85px" :rules="ruleForm" ref="fileForm" class="addfiled">
                    <el-form-item label="userId：" class="basicItem" ref="id" prop="id" v-show="false">
                        <el-input class="checkName percentName" v-model="fileForm.id"></el-input>
                        <el-input class="checkName percentName" v-model="fileForm.fileId"></el-input>
                    </el-form-item><br>
                    <el-form-item label="通知标题：" class="basicItem" prop="title">
                        <el-input class="checkName percentName" v-model="fileForm.title"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="通知内容：" class="basicItem" prop="content">
                        <el-input type="textarea" :rows="3" class="checkName percentName" v-model="fileForm.content"></el-input>
                    </el-form-item><br><br><br> -->
                    <el-form-item label="附件："  ref='iploads' class="basicItem" prop= "upLists" style="margin-top:10px">
                    	<el-input class="aaaaa"  readOnly v-model='fileForm.upLists'></el-input>
                        <el-upload 
                    		class="upload-demo" 
                    		action="111" 
                    		:http-request="BeforeUpload" 
                    		:limit="limitNumber" 
                    		:on-exceed="Onexceed" 
                    		:file-list="upList"
                            :on-success="handleAvatarSuccess"
                            :show-file-list = "false"
                    		:on-remove="handleRemove">
                            <el-button  style="position:absolute;right:0;top:5px" size="small" class="checkWay" type="primary">选取文件</el-button>
                		</el-upload>
                    </el-form-item>
                    <!-- <el-form-item label="是否置顶：" class="basicItem" >
                    	<el-radio-group v-model="fileForm.isTop" >
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item> -->
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
    import Service from './notice.service';
    import { Loading } from 'element-ui';
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
        title:'';
        $refs: { resetFields: HTMLFormElement };
        unitname:'';
        limitNumber:number;//上传文件的个数控制
        upList:any = [];//上传的数组
        listData:any = [];
        loadingInstance:any = {};
        constructor(){
            super();
            this.bodyHeight = document.documentElement.clientHeight-240;
            this.fileVisible = false;
            this.fileForm = {
                reportName: '',
                repType:'',
                isTop: false,
                upLists:'',
                title:''
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
                type: 1
            };
            this.c = {
            	id:'',
            	actionType:'',
            };
            this.ruleForm = {
                title: [
                    { required: true, message: '请填写标题', trigger: ['blur','change'] }
                ],
                content: [
                    { required: true, message: '请填写通知内容', trigger: ['blur','change']  }
                ],
                upLists: [{
                	required: true, 
                    // validator: this.upListvalidator,
                    message: '请上传文档',
                	trigger: ['blur','change']
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
            this.listData = [];
            this.loadingInstance = null;
            this.total = 0;
        };
        handleAvatarSuccess(res,file){
           
        }
        handleCurrentChange(val) {
            this.b.page = val-1;
            this.getFiles();
        };
        handleSizeChange(val) {
            this.b.pageSize = val;
            this.getFiles();
        };
		beforeClose(){
			this.$refs['fileForm'].resetFields();
        	this.fileVisible = false;
        };
        // 初始化表格
        getFiles():void{
        	this.b.title = this.filters.title;
            Service.getNoticeList(this.b).then((res) =>{
                this.tableData = res.data.data;
                this.total = res.data.totalRecords;
                this.listData = res.data.data;
			})
        };

        // 新增弹出框
        addReport(obj):void{
           this.fileForm.repType= '';
           this.upList = [];
           this.fileForm.id = '';
           this.fileForm.fileId = '';
        //    this.fileForm.isTop = false;
		   this.dailogTitleType = "新增";
           this.fileVisible = true;
           this.fileForm.title = '';
           this.fileForm.content = '';
        };
        //编辑报表的弹框页面
        updateReport(obj):void{
           this.upList = [];
           this.dailogTitleType = "编辑";
           this.fileVisible = true;
           this.fileForm.id = obj.id;
           this.fileForm.title = obj.title;
        //    this.fileForm.content = obj.content;
        //    this.fileForm.isTop = obj.isTop;
           this.fileForm.fileId = obj.fileId;
           // if(obj.fileName && obj.fileId){
           // 	this.upList.push({
			// 	name: obj.fileName,
			// 	url: '',
			// 	id:  obj.fileId
			// })
           // }
           // this.fileForm.upLists = this.upList[0].name
            this.fileForm.upLists = obj.fileName
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
        	this['$confirm']('您是否要删除'+ obj.title +'数据?', '提示', {
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
            console.log(this.selection)
            var num =0;
            var arr=[];
            var brr = [];
        	if(this.selection.length>0){
                    for(var item of this.selection){
                        arr.push(item.id)
                        brr.push(item.isSend)
                    };
                    for(var i=0;i<brr.length;i++){
                        if(brr[i] == true){
                            num++
                        }
                     }
                        if(num>0){
                            this['$message']({
                            type: 'warning',
                            message: '已发布的数据不可以删除。'
                        });
                        }else{
                                var str = arr.join(",");                   
                                this['$confirm']('您是否要删除所选数据?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    Service.BatchDelNotice(str).then(res=>{
                                        if(res.data.succeeded){
                                            this.Suces("删除成功。");
                                            this.b.page = 0;
                                            this.getFiles();
                                        }else{
                                            this.getError(res.data.errorMessage)
                                        }
                                    })
                                }).catch(() => {
                                    this['$message']({
                                        type: 'info',
                                        message: '已取消删除。'
                                    });
                                });
                        }
                   
                }else{
                    this.Warn('请选择要删除的文件。')
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
            this.upList = [];
            var Form = new FormData();
            Form.append('file',params.file)
            Form.append('type', '5')   // 通知的文件类型是 5 
            this.fileForm.upLists = params.file.name;
            this.loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '文件正在提交，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
            );
            Service.reportFileImport(Form).then(res=>{
                if(res.data.succeeded == true){
                    setTimeout(()=>{
                        this['$notify']({
                            title: '文件导入成功',
                            position: 'top-right',
                            type: 'success',
                            message: '文件已经成功导入'
                        });
                    },1000)
                }else{
                    this.getError('文件上传失败。')
                }
//             this.a.file.id = res.data.data
               this.fileForm.fileId = res.data.data;
               this.$nextTick(() => { this.loadingInstance.close();});
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
         	if(!this.fileForm.fileId){
		        this.a.file = null
		    }else{
		    	this.a.file={}
		    	this.a.file.id = this.fileForm.fileId;
		    }
         	this['$refs'][formName]['validate']((valid)=>{
                if(valid){
		            this.a.title = this.fileForm.title;
		            // this.a.content = this.fileForm.content;
		            this.a.id = this.fileForm.id;
		            // this.a.isTop = this.fileForm.isTop;
		            this.a.type = '1';  // 1是通知
		            Service.updateNotice(this.a).then((res) =>{
                        if(res.data.succeeded == true){
                            this.fileVisible = false;
                            this.getFiles();
                            this.fileForm.upLists = '';
                            this.Suces('保存成功。')
                        }
		               
		            })
		        }
            });    
         };
         //table表格选中项
        selectionChange(selection){
            this.selection=selection;
            console.log(this.selection)
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
        //上移
        toUp(){
            var brotherId;
            var data = [];
            console.log(this.selection)
            if(this.selection.length == 0){
                this.Warn('请选择要上移的数据。')
            }else if(this.selection.length == 1){
                data = this.selection[0];
                var ind= null;
                for(var i = 0; i<this.listData.length;i++){
                    console.log(this.listData)
                    if(this.selection[0].id == this.listData[i].id){
                        if(i==0){
                            this.Warn('所选数据已经是第一条。')
                        }else{
                             ind = i;
                             brotherId = this.listData[i-1].id
                             Service.updateSeq({
                                 "id":this.selection[0].id,
	                             "brotherId":brotherId
                             }).then(res=>{
                                 if(res.data.succeeded == true){
                                    this.tableData.splice(ind, 1);
                                    this.tableData.splice(ind - 1, 0, data);
                                 }else{
                                     this['$message']({
                                        message: res.data.errorMessage,
                                        type: 'error'
                                    });
                                 }
                             })
                        }
                       
                    }
                }

                console.log(brotherId)
            }else{
                this.Warn('每次只能移动一条数据。')
            }
        }
        //下移
        toDown(){
            var brotherId;
            var data = [];
            console.log(this.selection)
            if(this.selection.length == 0){
                this.Warn('请选择要下移的数据。')
            }else if(this.selection.length == 1){
                data = this.selection[0];
                var ind = null;
                for(var i = 0; i<this.listData.length;i++){
                    console.log(this.listData)
                    if(this.selection[0].id == this.listData[i].id){
                        if(i==this.listData.length-1){
                            this.Warn('所选数据已经是最后一条。')
                        }else{
                             ind = i;
                             brotherId = this.listData[i+1].id
                             Service.updateSeq({
                                 "id":this.selection[0].id,
	                             "brotherId":brotherId
                             }).then(res=>{
                                 if(res.data.succeeded == true){
                                    this.tableData.splice(ind / 1, 1);
                                    this.tableData.splice(ind / 1 + 1, 0, data);
                                 }else{
                                     this['$message']({
                                        message: res.data.errorMessage,
                                        type: 'error'
                                    });
                                 }
                             })
                        }
                       
                    }
                }

                console.log(brotherId)
            }else{
                this.Warn('每次只能移动一条数据。')
            }
        }
        toUp1(){
            return false;
        }
        toDown1(){
            return false;
        }
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
         mounted(){
              this.getFiles();
         };
    };


</script>

<style lang="scss" scoped>
    @import '../../../styles/system/notice/notice.scss';
</style>