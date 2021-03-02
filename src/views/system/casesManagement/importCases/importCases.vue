<template>
	<div>
		<el-dialog
          title="导入全宗"
          :visible.sync="importListAddSetVisible"
         :closeOnClickModal="false"
         :closeOnPressEscape="false"
         top="4%"
          width="35%"
          class="importFondAddDialog">
          
          <div class="dataSource">
                <!-- <p style="line-height:30px;padding-left:5px;background: rgb(126, 143, 174);color: #fff;">数据源（必填）</p> -->
                <el-form :model="ruleForm" ref="ruleForm" class="el-form--inline">
                        <el-form-item label="数据源：">
                            <el-input placeholder="单行输入" v-model="file.name" size="small"></el-input>
                            <!-- <span class="uploadTips">注意：上传的文件必须为excel</span> -->
                        </el-form-item>
                        <el-upload class="d-ib"
                                   action="http://172.25.66.194:9090/archive/exporter/fondImport"
                                   :on-preview="handlePreview"
                                   :data="uploadParame"
                                   :on-remove="handleRemove"
                                   :on-success="handleSuccess"
                                   :before-remove="beforeRemove"
                                   :on-exceed="handleExceed"
                                   :on-error="handleError"
                                   :before-upload="beforeUpload"
                                   :show-file-list = "false"
                                   :file-list="fileList"
                        >
						    <el-button class="tabletoolBtn">选择文件</el-button>
					    </el-upload>
                        <!--<el-button class="tabletoolBtn">解析文件</el-button>-->
                </el-form>
                
          </div>
          <!--<div class="matchingResults mt10">
              <div class="lt wp-40">
                   <p style="line-height:30px;padding-left:5px;background: rgb(126, 143, 174);color: #fff;">匹配列表</p>
                         <el-table border stripe :height="250" :data="mockList.mackDataObj.res" highlight-current-row class="defaultTable" header-row-class-name="tableHeader">                      
                            <el-table-column prop="id" label="目标列名">
                            </el-table-column>
                            <el-table-column  prop="name" label="数据源列名">
                            </el-table-column>
                        </el-table>
                        &lt;!&ndash;工具条分页&ndash;&gt;
                        &lt;!&ndash; <div class="clear" style="margin-top:10px">
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="100"
                                        layout="total, sizes, prev, next, jumper"
                                        :total="mockList.mackDataObj.total">
                                        </el-pagination>
                         </div>          &ndash;&gt;
              </div>
              <div class="lt wp-29 ml10">
                   <p style="line-height:30px;padding-left:5px;background: rgb(126, 143, 174);color: #fff;">匹配结果</p>
                    <el-table border stripe :height="250" :data="mockList.mackDataObj.res" highlight-current-row class="defaultTable" header-row-class-name="tableHeader">
                        
                    </el-table>
                    &lt;!&ndash;工具条分页&ndash;&gt;
                    &lt;!&ndash; <div class="clear" style="margin-top:10px">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, next, jumper"
                        :total="mockList.mackDataObj.total">
                        </el-pagination>
                    </div>  &ndash;&gt;
              </div> 
              <div class="rt wp-29">
                   <p style="line-height:30px;padding-left:5px;background: rgb(126, 143, 174);color: #fff;">数据监测结果</p>
                    <el-table border stripe :height="250" :data="mockList.mackDataObj.res" highlight-current-row class="defaultTable" header-row-class-name="tableHeader">
                        
                    </el-table>
                    &lt;!&ndash;工具条分页&ndash;&gt;
                    &lt;!&ndash; <div class="clear" style="margin-top:10px">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, next, jumper"
                        :total="mockList.mackDataObj.total">
                        </el-pagination>
                    </div>  &ndash;&gt;
              </div> 
              <div class="clear"></div>
          </div>-->
          <span slot="footer" class="dialog-footer">
            <!--<el-button type="primary" class="defaultBtn" @click="daoRu">导 入</el-button>
            <el-button @click="importListAddSetVisible = false" class="defaultBtn">取 消</el-button>-->
          </span>
        </el-dialog> 
	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import mockData from '@/mock/data/mockData';
    import Service from './importCases.service';
        import { Loading } from 'element-ui';
    @Component
    export default class addFilesDialog extends Vue{
        importListAddSetVisible: boolean = false;
        isbatchEditloading: boolean = false;
        libId:number;
        mockList: any = [];
        loadingInstance:any;
		tree:any = {};
		form:any={};
		formArr: any = [];
		Addrform:any={};
		addArr: any = [];
		combineform:any={};
        @Prop({})
        archivesAgentCode:string;
        uploadParame:any = {
            archivesAgentCode:""
        };
		combineArr: any = [];
		selectionIDs: any = [];
		batchEditfile: any = {};
		ElSelectTrue:boolean;//控制按内容替换的输入项的显隐
        batchEditArray: any = [];
        bxdqData: any = [];
        ruleForm: any = {};
        daqzhData: any = [];
		selection: any = [];
		addArray : any = [];
		formSelectArr:any = [];//按内容替换的下拉列表
		addArrayPositon: any = [];
		addfile:any={};
		replaceName:string = 'content';
		// @Prop({}) 
        // func: Function;
		formStyle: any = {
            "height": '400px' ,
			"overflow-y": 'auto',
			"padding":'20px 10px 0 15px'
        };
		file:any = {};
		constructor(){
			super();
			this.addArray = [];
			this.addArrayPositon = [];
			this.addfile = {};
			this.form={
                region:null,
                replaceValue:null,
                replaceTo:''
            };
			this.file = {};
			this.formArr=[];
            this.formSelectArr = [];
            this.mockList = mockData;
			this.ElSelectTrue = true;
            this.Addrform={
                region:null,
                startNumber:null,
                endNumber:null,
                replaceTo:''
            };
            this.addArr=[];
            this.combineform={
                itemA:null,
                connectSign:null,
                itemB:null,
                concatTo:null
            };
            this.combineArr=[];
        }
        showDialog () {
            if(this.batchEditVisible){
				this.getdaqzhData();
                this.getTable()
            }
        }
        beforeCloseReset() {
			this.batchEditVisible = false;
		};
        // 加载表格
        getTable(){
        	this.isbatchEditloading = true;
			Service.getEditDeploy({
				libId: this.libId,
				conditionId: this.tree.conditionId,
				phase: 4,
				treeId: this.tree.id
			}).then(res => {
				if(res.data.succeeded) {
					this.$nextTick(()=>{
						this.addArray = res.data.data;
						this.batchEdit = {};
						for(var item of res.data.data) {
							this['$set'](this.batchEdit, item.fieldName, item.defaultValue ? item.defaultValue : null);
						};
						this.batchEdit.DAQZH = this.tree.fondCode;
						this.isbatchEditloading = false;
						this.$refs.batchEdit.$el.scrollTop = 0;
					});

				} else {
					this.getError(res.data.errorMessage)
				}
			})   
        }
        setUseValue(fieldName,setFieldName,dictDatas){
            let value = this.batchEdit[fieldName];
            for(let i in dictDatas){
                if(value == dictDatas[i].code){
                    this.batchEdit[setFieldName] = dictDatas[i].useValue;
                    break;
                }
            }

        }
        //获取单位数据
		getBXDWData() {
			Service.getListByParentId(1).then(res => {
				if(res.data.succeeded) {
					this.bxdqData = res.data.data;

				} else {
					this.getError(res.data.errorMessage)
				}
			})

		}
		changeSHBM(node) {
			if(this.addfile.BXDW != undefined) {
				this.addfile["SHBM"] = node.id
			}
		}

		//获取部门数据
		getBMData(parentId, isEmpty) {
			if(isEmpty) {
				this.batchEdit["BM"] = null;
				this.batchEdit["SHBM"] = null;
			}
			this.bmData = [];
			//给全宗赋值
			for(let i in this.daqzhData) {
				if(this.daqzhData[i].orgId == parentId) {
					this.$set(this.batchEdit, "DAQZH", this.daqzhData[i].fondCode)
					break;
				}
			}
			Service.findOrgTreeByParentId(parentId).then(res => {
				if(res.data.succeeded) {
					this.bmData = res.data.data;
				} else {
					this.getError(res.data.errorMessage)
				}
			})
		}
		//按内容替换著录项发生改变
        elSelectChange(data){
            this.form.replaceValue = null;
            this.form.replaceTo = '';
            for(var item of this.addArray){
                if(item.fieldName==data){
                    if(item.dictData && item.dictData.length !== 0){
                        this.formSelectArr=[];
                        this.formSelectArr = item.dictData;
                        this.ElSelectTrue=false;
                    }else{
                        this.ElSelectTrue=true;
                    }
                };
            };
        };
		//获取档案所属全宗号数据
		getdaqzhData() {
			this.daqzhData = [];
			Service.findFondsAll().then(res => {
				if(res.data.succeeded) {
					this.daqzhData = res.data.data;
				} else {
					this.getError(res.data.errorMessage)
				}
			})
		}
        //成功
        Suces(message) {
            this['$message']({
                type: 'success',
                message
            })
        };
        //请求失败
        getError(message) {
            this["$message"]({
                message,
                type: 'error'
            });
        };
        //警告信息
        Warn(message) {
            this['$message']({
                type: 'warning',
                message
            });
		};
		//取得可批量修改的字段
        getBatchModifiableFields(params){
			let self = this;
            // this.form={region:null,replaceValue:null,replaceTo:''};
            // this.Addrform={region:null,startNumber:null,endNumber:null,replaceTo:''};
            // this.combineform={itemA:null,connectSign:null,itemB:null,concatTo:null};
            // if(this.selection.length>0&&this.activeName=='first'||this.selection2.length>0&&this.activeName=='second'||this.selection3.length>0&&this.activeName=='third') {
                Service.getBatchModifiableFields(params).then(res => {
					console.log(res);
                    if (res.data.succeeded) {
                        // var data = JSON.stringify(res.data.data)
                        // this.formArr = JSON.parse(data);
						self.addArray=res.data.data;
						self.addArrayPositon = self.addArray.filter(function(item,index,array){
                                if(item.type !== 3) {
                                    return item;
                                }
                            });
						this.addfile={};
						for(var item of res.data.data){
							//this.addfile[item.fieldName]='';
							this['$set'](this.addfile,item.fieldName,null)
						};
                        // this.repalceMany = true;
                    } else {
                        self.getError(res.data.errorMessage)
                    }
                })
            // }else{
            //     this.Warn("请选择要修改的文件。")
            // }
        };

        daoRu(){
            Service.fondImport(this.file).then((res) =>{
                if(res.data.succeeded){

                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
        }

        handleError(err, file, fileList){
            this.$nextTick(() => {
                this.loadingInstance.close();
            });
            this['$message']({
                message: "导入失败",
                type: 'error'
            });
        }

        handleSuccess(response, file, fileList){
            if(response.data){
                this['$message']({
                    message: "导入成功",
                    type: 'success'
                });
            }else if(!response.succeeded){
                this['$message']({
                    message: "导入失败",
                    type: 'error'
                });
            }
            this.$parent.searchFond();
            this.$parent.$refs['importCasesDialogRef'].importListAddSetVisible = false;
            this.$nextTick(() => {
                this.loadingInstance.close();
            });
            this.file = {};
        }

        beforeUpload(file){
            this.loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '导入中，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            this.file = file;
            this.uploadParame.archivesAgentCode = this.archivesAgentCode
        }

 		created(){ 
                //取得可批量修改的字段
            //    this.getBatchModifiableFields({"libId":1});

        };
		mounted(){
            window.onresize = () => {
                return (() => {
                    this.formStyle = {
                        "height": Number(document.documentElement.clientHeight - 112)+'px' ,
						"overflow-y": 'auto',
						"padding":'20px 10px 0 15px'
                    };
                })()
            }; 
        };
}
</script>
<style lang="scss" scoped>
    .batchEditDialogView{
		.btnView {
			margin-top: 10px;
		}
		.el-form-item{
			margin-top: 20px;
			.el-select {
				width: 100%;
			}
		}
	}
</style>